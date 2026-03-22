/**
 * Common mistake condition evaluator
 *
 * 유저 응답 vs 문제의 common_mistakes.conditions 비교
 * 모든 conditions가 AND로 매치되면 해당 mistake가 trigger됨
 */

import type { CommonMistake, Condition, StepAnswers } from '@/src/types';

function evaluateCondition(
  condition: Condition,
  stepAnswers: StepAnswers,
): boolean {
  const stepData = (stepAnswers as Record<string, any>)[condition.step];
  if (!stepData) return false;

  const fieldValue = stepData[condition.field];
  if (fieldValue === undefined || fieldValue === null) return false;

  switch (condition.operator) {
    case 'equals':
      // string equality
      return fieldValue === condition.value;

    case 'not_equals':
      return fieldValue !== condition.value;

    case 'includes':
      // array.includes(value)
      if (Array.isArray(fieldValue)) {
        return fieldValue.includes(condition.value);
      }
      return fieldValue === condition.value;

    case 'not_includes':
      if (Array.isArray(fieldValue)) {
        return !fieldValue.includes(condition.value);
      }
      return fieldValue !== condition.value;

    default:
      return false;
  }
}

/**
 * 모든 common_mistakes 중 유저 응답에 매칭되는 것들의 tag 반환
 */
export function evaluateMistakes(
  mistakes: CommonMistake[],
  stepAnswers: StepAnswers,
): string[] {
  const triggered: string[] = [];

  for (const mistake of mistakes) {
    if (!mistake.conditions || mistake.conditions.length === 0) continue;

    // 모든 조건이 AND로 만족해야 trigger
    const allMatch = mistake.conditions.every((c) =>
      evaluateCondition(c, stepAnswers),
    );

    if (allMatch) {
      triggered.push(mistake.tag);
    }
  }

  return triggered;
}

/**
 * triggered된 mistake tag로부터 feedback 메시지 가져오기
 */
export function getMistakeFeedbacks(
  mistakes: CommonMistake[],
  triggeredTags: string[],
): Array<{ tag: string; feedback: string }> {
  const tagSet = new Set(triggeredTags);
  return mistakes
    .filter((m) => tagSet.has(m.tag))
    .map((m) => ({ tag: m.tag, feedback: m.feedback }));
}
