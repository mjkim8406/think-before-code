/**
 * 실력 분석 엔진
 *
 * DB에 저장된 user_concept_stats, user_step_stats, training_sessions를 기반으로
 * 사용자의 현재 실력을 "설명 가능한 형태"로 분석한다.
 */

import type { CourseLevel } from '@/src/data/coursePaths';

// ─── 타입 ─────────────────────────────────────────────────────

export type StepName =
  | 'reading'
  | 'pattern_analysis'
  | 'strategy_design'
  | 'solution_flow'
  | 'edge_cases'
  | 'complexity';

export type Trend = 'up' | 'flat' | 'down';

export interface PatternAnalysis {
  /** 카테고리 (DB category) */
  category: string;
  /** 0~100 점수 */
  score: number;
  /** 입문/기초/중급/실전 */
  level: CourseLevel;
  /** 약한 step 목록 */
  weakSteps: StepName[];
  /** 최근 추세 */
  trend: Trend;
  /** 풀이 수 */
  attempts: number;
  /** 평균 점수 */
  averageScore: number;
}

export interface StepWeakness {
  step: StepName;
  /** 0~100 평균 점수 */
  averageScore: number;
  /** 총 시도 수 */
  totalAttempts: number;
  /** 완벽 (1.0) 비율 */
  perfectRate: number;
  /** 실수 (0.0) 비율 */
  missRate: number;
}

/** DB에서 가져오는 원시 데이터 형태 */
export interface ConceptStatRow {
  concept_tag: string;
  problems_solved: number;
  total_score: number;
  last_solved_at: string;
}

export interface StepStatRow {
  step_name: string;
  total_attempts: number;
  total_score: number;
  perfect_count: number;
  miss_count: number;
}

export interface SessionHistoryRow {
  problem_id: string;
  category: string;
  step_scores: Record<string, number>;
  total_score: number;
  completed_at: string;
}

// ─── 점수 → 레벨 변환 ────────────────────────────────────────

export function scoreToLevel(score: number): CourseLevel {
  if (score >= 85) return 'advanced';
  if (score >= 70) return 'intermediate';
  if (score >= 40) return 'basic';
  return 'beginner';
}

// Re-export from coursePaths to avoid duplication
export { COURSE_LEVEL_LABELS as LEVEL_LABELS } from '@/src/data/coursePaths';

// ─── 패턴(카테고리)별 숙련도 분석 ─────────────────────────────

/**
 * DB concept_stats + recent sessions → 카테고리별 분석
 */
export function analyzePatternSkills(
  conceptStats: ConceptStatRow[],
  recentSessions: SessionHistoryRow[],
): PatternAnalysis[] {
  // 1. concept_stats → 카테고리별 누적 (concept_tag ≈ category 매핑 필요)
  //    현재 concept_tag는 'greedy', 'graph' 등이 포함됨
  //    카테고리와 1:1이 아닐 수 있으므로 sessions의 category를 우선 사용

  const categoryMap = new Map<string, {
    totalScore: number;
    count: number;
    sessions: SessionHistoryRow[];
  }>();

  // 최근 세션 기준으로 카테고리별 통계
  for (const session of recentSessions) {
    const cat = session.category;
    if (!cat) continue;
    const entry = categoryMap.get(cat) ?? { totalScore: 0, count: 0, sessions: [] };
    entry.totalScore += session.total_score;
    entry.count += 1;
    entry.sessions.push(session);
    categoryMap.set(cat, entry);
  }

  // concept_stats에서 추가 데이터 보강 (세션이 없는 카테고리용)
  for (const cs of conceptStats) {
    // concept_tag를 카테고리로 매핑 (tag → category)
    const cat = tagToCategory(cs.concept_tag);
    if (!cat) continue;
    if (!categoryMap.has(cat)) {
      categoryMap.set(cat, {
        totalScore: cs.total_score,
        count: cs.problems_solved,
        sessions: [],
      });
    }
  }

  const results: PatternAnalysis[] = [];

  for (const [category, data] of categoryMap.entries()) {
    const avgScore = data.count > 0 ? Math.round(data.totalScore / data.count) : 0;
    const level = scoreToLevel(avgScore);

    // Step 약점 분석 (이 카테고리의 세션들에서)
    const weakSteps = findWeakSteps(data.sessions);

    // 최근 추세 (최근 5개)
    const trend = calculateTrend(
      data.sessions
        .sort((a, b) => a.completed_at.localeCompare(b.completed_at))
        .slice(-5)
        .map((s) => s.total_score),
    );

    results.push({
      category,
      score: avgScore,
      level,
      weakSteps,
      trend,
      attempts: data.count,
      averageScore: avgScore,
    });
  }

  // 점수 오름차순 (약한 것부터)
  results.sort((a, b) => a.score - b.score);

  return results;
}

// ─── Step별 약점 분석 ─────────────────────────────────────────

/**
 * 전체 step_stats 기준 약점 분석
 */
export function analyzeStepWeaknesses(stepStats: StepStatRow[]): StepWeakness[] {
  return stepStats
    .map((s) => {
      const avg = s.total_attempts > 0
        ? Math.round((s.total_score / s.total_attempts) * 100)
        : 0;
      const perfectRate = s.total_attempts > 0
        ? Math.round((s.perfect_count / s.total_attempts) * 100)
        : 0;
      const missRate = s.total_attempts > 0
        ? Math.round((s.miss_count / s.total_attempts) * 100)
        : 0;

      return {
        step: s.step_name as StepName,
        averageScore: avg,
        totalAttempts: s.total_attempts,
        perfectRate,
        missRate,
      };
    })
    .sort((a, b) => a.averageScore - b.averageScore); // 약한 것부터
}

// ─── 내부 유틸리티 ────────────────────────────────────────────

/** 카테고리 내 세션들에서 약한 step 추출 */
function findWeakSteps(sessions: SessionHistoryRow[]): StepName[] {
  if (sessions.length === 0) return [];

  const stepTotals: Record<string, { sum: number; count: number }> = {};
  const STEPS: StepName[] = [
    'reading', 'pattern_analysis', 'strategy_design',
    'solution_flow', 'edge_cases', 'complexity',
  ];

  for (const s of sessions) {
    if (!s.step_scores) continue;
    for (const step of STEPS) {
      const score = s.step_scores[step];
      if (score == null) continue;
      if (!stepTotals[step]) stepTotals[step] = { sum: 0, count: 0 };
      stepTotals[step].sum += score;
      stepTotals[step].count += 1;
    }
  }

  // 평균 0.6 미만인 step을 약점으로
  const weak: StepName[] = [];
  for (const step of STEPS) {
    const data = stepTotals[step];
    if (!data || data.count === 0) continue;
    const avg = data.sum / data.count;
    if (avg < 0.6) {
      weak.push(step);
    }
  }

  return weak;
}

/** 최근 점수 배열로 추세 판단 */
function calculateTrend(scores: number[]): Trend {
  if (scores.length < 3) return 'flat';

  // 단순 선형 회귀 기울기
  const n = scores.length;
  let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;
  for (let i = 0; i < n; i++) {
    sumX += i;
    sumY += scores[i];
    sumXY += i * scores[i];
    sumXX += i * i;
  }
  const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);

  // 기울기 기준: ±3점/문제 이상이면 상승/하락
  if (slope > 3) return 'up';
  if (slope < -3) return 'down';
  return 'flat';
}

/** concept_tag → category 매핑 */
function tagToCategory(tag: string): string | null {
  const MAP: Record<string, string> = {
    'greedy': 'greedy',
    'dynamic-programming': 'dp',
    'dp': 'dp',
    'graph': 'graph',
    'bfs': 'graph',
    'dfs': 'graph',
    'union-find': 'graph',
    'topological-sort': 'graph',
    'dijkstra': 'graph',
    'hash-map': 'data-structures',
    'stack': 'data-structures',
    'queue': 'data-structures',
    'heap': 'data-structures',
    'linked-list': 'data-structures',
    'trie': 'data-structures',
    'monotonic-stack': 'data-structures',
    'two-pointer': 'data-structures',
    'sliding-window': 'data-structures',
    'prefix-sum': 'data-structures',
    'sorting': 'sorting',
    'binary-search': 'search',
    'tree': 'tree',
    'binary-tree': 'tree',
    'bst': 'tree',
    'backtracking': 'combinatorics',
    'recursion': 'combinatorics',
    'math': 'number-theory',
    'bit-manipulation': 'number-theory',
    'divide-and-conquer': 'sorting',
    'array': 'data-structures',
    'string': 'data-structures',
    'interval': 'greedy',
  };
  return MAP[tag] ?? null;
}

// ─── 종합 분석 요약 ──────────────────────────────────────────

export interface SkillSummary {
  /** 패턴별 분석 (약한 것 먼저) */
  patterns: PatternAnalysis[];
  /** Step별 약점 */
  stepWeaknesses: StepWeakness[];
  /** 가장 약한 카테고리 */
  weakestCategory: string | null;
  /** 가장 강한 카테고리 */
  strongestCategory: string | null;
  /** 전체 평균 점수 */
  overallScore: number;
  /** 전체 풀이 수 */
  totalAttempts: number;
}

export function buildSkillSummary(
  conceptStats: ConceptStatRow[],
  stepStats: StepStatRow[],
  recentSessions: SessionHistoryRow[],
): SkillSummary {
  const patterns = analyzePatternSkills(conceptStats, recentSessions);
  const stepWeaknesses = analyzeStepWeaknesses(stepStats);

  const totalAttempts = patterns.reduce((sum, p) => sum + p.attempts, 0);
  const overallScore = totalAttempts > 0
    ? Math.round(patterns.reduce((sum, p) => sum + p.averageScore * p.attempts, 0) / totalAttempts)
    : 0;

  return {
    patterns,
    stepWeaknesses,
    weakestCategory: patterns.length > 0 ? patterns[0].category : null,
    strongestCategory: patterns.length > 0 ? patterns[patterns.length - 1].category : null,
    overallScore,
    totalAttempts,
  };
}
