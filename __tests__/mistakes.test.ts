import { evaluateMistakes, getMistakeFeedbacks } from '../src/lib/mistakes';
import type { CommonMistake, StepAnswers } from '../src/types';

const MOCK_MISTAKES: CommonMistake[] = [
  {
    tag: 'wrong_pattern',
    feedback: 'You chose the wrong pattern.',
    conditions: [
      { step: 'pattern_analysis', field: 'primary_pattern', operator: 'not_equals', value: 'greedy' },
    ],
  },
  {
    tag: 'missing_sort',
    feedback: 'You forgot to include sorting.',
    conditions: [
      { step: 'strategy_design', field: 'data_structures', operator: 'not_includes', value: 'sorted_array' },
    ],
  },
  {
    tag: 'multi_condition',
    feedback: 'Both conditions failed.',
    conditions: [
      { step: 'reading', field: 'goal_type', operator: 'equals', value: 'count' },
      { step: 'pattern_analysis', field: 'primary_pattern', operator: 'equals', value: 'dp' },
    ],
  },
];

describe('evaluateMistakes', () => {
  it('triggers mistake when condition matches', () => {
    const answers: StepAnswers = {
      pattern_analysis: { primary_pattern: 'dp' },
      strategy_design: { data_structures: ['sorted_array'] },
    } as any;

    const triggered = evaluateMistakes(MOCK_MISTAKES, answers);
    expect(triggered).toContain('wrong_pattern');
    expect(triggered).not.toContain('missing_sort');
  });

  it('triggers missing_sort when sorted_array not included', () => {
    const answers: StepAnswers = {
      pattern_analysis: { primary_pattern: 'greedy' },
      strategy_design: { data_structures: ['array'] },
    } as any;

    const triggered = evaluateMistakes(MOCK_MISTAKES, answers);
    expect(triggered).toContain('missing_sort');
    expect(triggered).not.toContain('wrong_pattern');
  });

  it('triggers multi-condition mistake only when ALL conditions match', () => {
    const answersMatch: StepAnswers = {
      reading: { goal_type: 'count' },
      pattern_analysis: { primary_pattern: 'dp' },
      strategy_design: { data_structures: ['sorted_array'] },
    } as any;

    expect(evaluateMistakes(MOCK_MISTAKES, answersMatch)).toContain('multi_condition');

    const answersMismatch: StepAnswers = {
      reading: { goal_type: 'count' },
      pattern_analysis: { primary_pattern: 'greedy' },
      strategy_design: { data_structures: ['sorted_array'] },
    } as any;

    expect(evaluateMistakes(MOCK_MISTAKES, answersMismatch)).not.toContain('multi_condition');
  });

  it('returns empty array when no mistakes match', () => {
    const answers: StepAnswers = {
      pattern_analysis: { primary_pattern: 'greedy' },
      strategy_design: { data_structures: ['sorted_array'] },
    } as any;

    const triggered = evaluateMistakes(MOCK_MISTAKES, answers);
    expect(triggered).toEqual([]);
  });
});

describe('getMistakeFeedbacks', () => {
  it('returns feedback for triggered tags', () => {
    const feedbacks = getMistakeFeedbacks(MOCK_MISTAKES, ['wrong_pattern', 'missing_sort']);
    expect(feedbacks).toHaveLength(2);
    expect(feedbacks[0].tag).toBe('wrong_pattern');
    expect(feedbacks[0].feedback).toBe('You chose the wrong pattern.');
  });

  it('returns empty array for no triggered tags', () => {
    expect(getMistakeFeedbacks(MOCK_MISTAKES, [])).toEqual([]);
  });
});
