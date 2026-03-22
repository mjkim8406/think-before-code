/**
 * Scoring logic for each question type
 *
 * Score scale: 1.0 (perfect) | 0.5 (partial) | 0.0 (wrong)
 */

import type {
  TrainingFlow,
  SingleSelect,
  MultiSelect,
  TagSelect,
  EdgeCasesStep,
  OrderedSteps,
  StepAnswers,
  StepName,
} from '@/src/types';

// ── Per-question scoring ──

/** single_select: exact match = 1.0, else 0.0 */
export function scoreSingleSelect(
  question: SingleSelect,
  answer: string | undefined,
): number {
  if (!answer) return 0;
  return question.accepted_answers.includes(answer) ? 1.0 : 0.0;
}

/** multi_select: overlap ratio → 1.0 / 0.5 / 0.0 */
export function scoreMultiSelect(
  question: MultiSelect,
  answers: string[] | undefined,
): number {
  if (!answers || answers.length === 0) return 0;
  const accepted = new Set(question.accepted_answers);
  const selected = new Set(answers);

  const hits = answers.filter((a) => accepted.has(a)).length;
  const misses = answers.filter((a) => !accepted.has(a)).length;
  const missed = question.accepted_answers.filter((a) => !selected.has(a)).length;

  // Perfect match
  if (hits === accepted.size && misses === 0) return 1.0;

  // Partial: at least half of accepted + not too many wrong
  const hitRatio = hits / accepted.size;
  const missRatio = misses / Math.max(selected.size, 1);

  if (hitRatio >= 0.6 && missRatio <= 0.4) return 0.5;
  return 0.0;
}

/** tag_select: any accepted tag selected = 1.0 */
export function scoreTagSelect(
  question: TagSelect,
  answers: string[] | undefined,
): number {
  if (!answers || answers.length === 0) return 0;
  const accepted = new Set(question.accepted_answers);
  return answers.some((a) => accepted.has(a)) ? 1.0 : 0.5; // tag_select는 관대하게
}

/** ordered_steps: LCS-based scoring */
export function scoreOrderedSteps(
  question: OrderedSteps,
  userOrder: string[] | undefined,
): number {
  if (!userOrder || userOrder.length === 0) return 0;
  const correct = question.correct_order;

  if (JSON.stringify(userOrder) === JSON.stringify(correct)) return 1.0;

  // LCS length
  const lcs = longestCommonSubsequence(userOrder, correct);
  const ratio = lcs / correct.length;

  if (ratio >= 0.8) return 0.5;
  return 0.0;
}

/** edge_cases: tiered scoring (required 70% + recommended 20% + optional 10%) */
export function scoreEdgeCases(
  question: EdgeCasesStep,
  selected: string[] | undefined,
): number {
  if (!selected || selected.length === 0) return 0;
  const sel = new Set(selected);

  const reqTotal = question.required_answers.length;
  const reqHits = question.required_answers.filter((a) => sel.has(a)).length;

  const recTotal = question.recommended_answers?.length || 0;
  const recHits = (question.recommended_answers || []).filter((a) => sel.has(a)).length;

  const optHits = (question.optional_answers || []).filter((a) => sel.has(a)).length;

  const reqScore = reqTotal > 0 ? (reqHits / reqTotal) * 0.7 : 0.7;
  const recScore = recTotal > 0 ? (recHits / recTotal) * 0.2 : 0.2;
  const optScore = optHits > 0 ? 0.1 : 0;

  const raw = reqScore + recScore + optScore;
  if (raw >= 0.85) return 1.0;
  if (raw >= 0.5) return 0.5;
  return 0.0;
}

// ── Per-step scoring ──

export function scoreStep(
  stepName: StepName,
  trainingFlow: TrainingFlow,
  stepAnswer: Record<string, any> | undefined,
): number {
  if (!stepAnswer || stepName === 'comparison') return 0;

  const scores: number[] = [];

  if (stepName === 'reading') {
    const step = trainingFlow.reading;
    scores.push(scoreSingleSelect(step.goal_type, stepAnswer.goal_type));
    scores.push(scoreMultiSelect(step.input_summary, stepAnswer.input_summary));
    scores.push(scoreTagSelect(step.one_line_summary, stepAnswer.one_line_summary));
  }

  if (stepName === 'pattern_analysis') {
    const step = trainingFlow.pattern_analysis;
    scores.push(scoreSingleSelect(step.primary_pattern, stepAnswer.primary_pattern));
    scores.push(scoreMultiSelect(step.reason_tags, stepAnswer.reason_tags));
    scores.push(scoreMultiSelect(step.secondary_patterns, stepAnswer.secondary_patterns));
  }

  if (stepName === 'strategy_design') {
    const step = trainingFlow.strategy_design;
    // data_structures는 항상 있음
    scores.push(scoreMultiSelect(step.data_structures, stepAnswer.data_structures));
    // 나머지 동적 필드
    for (const [field, question] of Object.entries(step)) {
      if (field === 'data_structures') continue;
      if (typeof question !== 'object' || !question.type) continue;
      if (question.type === 'single_select') {
        scores.push(scoreSingleSelect(question, stepAnswer[field]));
      } else if (question.type === 'multi_select') {
        scores.push(scoreMultiSelect(question, stepAnswer[field]));
      }
    }
  }

  if (stepName === 'solution_flow') {
    scores.push(scoreOrderedSteps(trainingFlow.solution_flow, stepAnswer.order));
  }

  if (stepName === 'edge_cases') {
    scores.push(scoreEdgeCases(trainingFlow.edge_cases, stepAnswer.selected_options));
  }

  if (stepName === 'complexity') {
    const step = trainingFlow.complexity;
    scores.push(scoreSingleSelect(step.time, stepAnswer.time));
    scores.push(scoreSingleSelect(step.space, stepAnswer.space));
    scores.push(scoreMultiSelect(step.reason_tags, stepAnswer.reason_tags));
  }

  if (scores.length === 0) return 0;
  return scores.reduce((a, b) => a + b, 0) / scores.length;
}

/** Calculate total session score (0~100) */
export function calcTotalScore(stepScores: Record<string, number>): number {
  const scorableSteps = Object.entries(stepScores).filter(([k]) => k !== 'comparison');
  if (scorableSteps.length === 0) return 0;
  const avg = scorableSteps.reduce((s, [, v]) => s + v, 0) / scorableSteps.length;
  return Math.round(avg * 100);
}

// ── Helpers ──

function longestCommonSubsequence(a: string[], b: string[]): number {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1] + 1
        : Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
  return dp[m][n];
}
