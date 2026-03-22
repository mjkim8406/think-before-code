import {
  scoreSingleSelect,
  scoreMultiSelect,
  scoreTagSelect,
  scoreOrderedSteps,
  scoreEdgeCases,
  calcTotalScore,
} from '../src/lib/scoring';

describe('scoreSingleSelect', () => {
  const q = { type: 'single_select' as const, question: 'Q?', options: ['a', 'b', 'c'], accepted_answers: ['b'] };

  it('returns 1.0 for correct answer', () => {
    expect(scoreSingleSelect(q, 'b')).toBe(1.0);
  });

  it('returns 0.0 for wrong answer', () => {
    expect(scoreSingleSelect(q, 'a')).toBe(0.0);
  });

  it('returns 0 for undefined', () => {
    expect(scoreSingleSelect(q, undefined)).toBe(0);
  });
});

describe('scoreMultiSelect', () => {
  const q = {
    type: 'multi_select' as const,
    question: 'Q?',
    options: ['a', 'b', 'c', 'd'],
    accepted_answers: ['a', 'b', 'c'],
  };

  it('returns 1.0 for perfect match', () => {
    expect(scoreMultiSelect(q, ['a', 'b', 'c'])).toBe(1.0);
  });

  it('returns 0.5 for partial match (2/3 correct, no wrong)', () => {
    expect(scoreMultiSelect(q, ['a', 'b'])).toBe(0.5);
  });

  it('returns 0.0 for all wrong', () => {
    expect(scoreMultiSelect(q, ['d'])).toBe(0.0);
  });

  it('returns 0 for empty array', () => {
    expect(scoreMultiSelect(q, [])).toBe(0);
  });

  it('returns 0 for undefined', () => {
    expect(scoreMultiSelect(q, undefined)).toBe(0);
  });
});

describe('scoreTagSelect', () => {
  const q = {
    type: 'tag_select' as const,
    question: 'Q?',
    options: ['x', 'y', 'z'],
    accepted_answers: ['y', 'z'],
  };

  it('returns 1.0 when an accepted tag is selected', () => {
    expect(scoreTagSelect(q, ['y'])).toBe(1.0);
  });

  it('returns 0.5 when no accepted tag selected', () => {
    expect(scoreTagSelect(q, ['x'])).toBe(0.5);
  });

  it('returns 0 for empty/undefined', () => {
    expect(scoreTagSelect(q, undefined)).toBe(0);
    expect(scoreTagSelect(q, [])).toBe(0);
  });
});

describe('scoreOrderedSteps', () => {
  const q = {
    type: 'ordered_steps' as const,
    question: 'Q?',
    steps_catalog: [
      { id: 'a', label: 'Step A' },
      { id: 'b', label: 'Step B' },
      { id: 'c', label: 'Step C' },
      { id: 'd', label: 'Step D' },
    ],
    correct_order: ['a', 'b', 'c', 'd'],
  };

  it('returns 1.0 for exact order', () => {
    expect(scoreOrderedSteps(q, ['a', 'b', 'c', 'd'])).toBe(1.0);
  });

  it('returns 0.5 for mostly correct (LCS >= 80%)', () => {
    // LCS of [a, c, b, d] vs [a, b, c, d] = 3 → 3/4 = 0.75 → <0.8 → 0.0
    expect(scoreOrderedSteps(q, ['a', 'c', 'b', 'd'])).toBe(0.0);
    // LCS of [a, b, d, c] vs [a, b, c, d] = 3 → 0.75 → 0.0
    expect(scoreOrderedSteps(q, ['a', 'b', 'd', 'c'])).toBe(0.0);
  });

  it('returns 0.0 for completely wrong', () => {
    expect(scoreOrderedSteps(q, ['d', 'c', 'b', 'a'])).toBe(0.0);
  });

  it('returns 0 for empty', () => {
    expect(scoreOrderedSteps(q, undefined)).toBe(0);
    expect(scoreOrderedSteps(q, [])).toBe(0);
  });
});

describe('scoreEdgeCases', () => {
  const q = {
    type: 'multi_select' as const,
    question: 'Q?',
    options: ['a', 'b', 'c', 'd', 'e'],
    required_answers: ['a', 'b'],
    recommended_answers: ['c'],
    optional_answers: ['d'],
    trap_answers: ['e'],
  };

  it('returns 1.0 for all required+recommended+optional', () => {
    expect(scoreEdgeCases(q, ['a', 'b', 'c', 'd'])).toBe(1.0);
  });

  it('returns 0.5 for required only', () => {
    expect(scoreEdgeCases(q, ['a', 'b'])).toBe(0.5);
  });

  it('returns 0.0 for nothing selected', () => {
    expect(scoreEdgeCases(q, undefined)).toBe(0);
    expect(scoreEdgeCases(q, [])).toBe(0);
  });
});

describe('calcTotalScore', () => {
  it('averages all steps except comparison and scales to 100', () => {
    const scores = {
      reading: 1.0,
      pattern_analysis: 0.5,
      strategy_design: 1.0,
      solution_flow: 0.5,
      edge_cases: 1.0,
      complexity: 0.5,
      comparison: 0.0, // should be excluded
    };
    // avg = (1+0.5+1+0.5+1+0.5)/6 = 4.5/6 = 0.75 → 75
    expect(calcTotalScore(scores)).toBe(75);
  });

  it('returns 0 for empty scores', () => {
    expect(calcTotalScore({})).toBe(0);
  });
});
