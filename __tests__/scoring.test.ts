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

describe('scoreMultiSelect (continuous)', () => {
  const q = {
    type: 'multi_select' as const,
    question: 'Q?',
    options: ['a', 'b', 'c', 'd'],
    accepted_answers: ['a', 'b', 'c'],
  };

  it('returns 1.0 for perfect match', () => {
    expect(scoreMultiSelect(q, ['a', 'b', 'c'])).toBe(1.0);
  });

  it('returns ~0.67 for 2/3 correct, no wrong', () => {
    const score = scoreMultiSelect(q, ['a', 'b']);
    expect(score).toBeCloseTo(0.67, 1);
  });

  it('returns ~0.52 for 2/3 correct + 1 wrong (penalty)', () => {
    const score = scoreMultiSelect(q, ['a', 'b', 'd']);
    // hitRatio = 2/3 = 0.667, penalty = 1 * 0.15 = 0.15, result = 0.517
    expect(score).toBeCloseTo(0.52, 1);
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

  it('returns 1/3 for 1/3 correct, no wrong', () => {
    const score = scoreMultiSelect(q, ['a']);
    expect(score).toBeCloseTo(0.33, 1);
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

  it('returns 0.0 when no accepted tag selected', () => {
    expect(scoreTagSelect(q, ['x'])).toBe(0.0);
  });

  it('returns 0 for empty/undefined', () => {
    expect(scoreTagSelect(q, undefined)).toBe(0);
    expect(scoreTagSelect(q, [])).toBe(0);
  });
});

describe('scoreOrderedSteps (continuous)', () => {
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

  it('returns 0.75 for 3/4 LCS', () => {
    // [a, c, b, d] vs [a, b, c, d] → LCS = 3 → 3/4 = 0.75
    expect(scoreOrderedSteps(q, ['a', 'c', 'b', 'd'])).toBe(0.75);
  });

  it('returns 0.25 for reversed (LCS = 1)', () => {
    // [d, c, b, a] vs [a, b, c, d] → LCS = 1 → 1/4 = 0.25
    expect(scoreOrderedSteps(q, ['d', 'c', 'b', 'a'])).toBe(0.25);
  });

  it('returns 0 for empty', () => {
    expect(scoreOrderedSteps(q, undefined)).toBe(0);
    expect(scoreOrderedSteps(q, [])).toBe(0);
  });
});

describe('scoreEdgeCases (continuous)', () => {
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

  it('returns ~0.85 for required + recommended only', () => {
    const score = scoreEdgeCases(q, ['a', 'b', 'c']);
    // req: 2/2 * 0.6 = 0.6, rec: 1/1 * 0.25 = 0.25, opt: 0/1 * 0.15 = 0
    expect(score).toBeCloseTo(0.85, 2);
  });

  it('returns 0.6 for required only', () => {
    const score = scoreEdgeCases(q, ['a', 'b']);
    // req: 2/2 * 0.6 = 0.6, rec: 0/1 * 0.25 = 0, opt: 0/1 * 0.15 = 0
    expect(score).toBe(0.6);
  });

  it('penalizes trap selection', () => {
    const score = scoreEdgeCases(q, ['a', 'b', 'e']);
    // req: 0.6, rec: 0, opt: 0, trap: -0.1 = 0.5
    expect(score).toBe(0.5);
  });

  it('returns 0.3 for 1/2 required only', () => {
    const score = scoreEdgeCases(q, ['a']);
    // req: 1/2 * 0.6 = 0.3, rec: 0, opt: 0
    expect(score).toBe(0.3);
  });

  it('returns 0 for nothing selected', () => {
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
