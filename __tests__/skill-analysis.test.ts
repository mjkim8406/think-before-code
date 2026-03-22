import {
  scoreToLevel,
  analyzePatternSkills,
  analyzeStepWeaknesses,
  buildSkillSummary,
  type ConceptStatRow,
  type StepStatRow,
  type SessionHistoryRow,
} from '../src/lib/skill-analysis';

describe('scoreToLevel', () => {
  it('returns beginner for 0-39', () => {
    expect(scoreToLevel(0)).toBe('beginner');
    expect(scoreToLevel(39)).toBe('beginner');
  });

  it('returns basic for 40-69', () => {
    expect(scoreToLevel(40)).toBe('basic');
    expect(scoreToLevel(69)).toBe('basic');
  });

  it('returns intermediate for 70-84', () => {
    expect(scoreToLevel(70)).toBe('intermediate');
    expect(scoreToLevel(84)).toBe('intermediate');
  });

  it('returns advanced for 85+', () => {
    expect(scoreToLevel(85)).toBe('advanced');
    expect(scoreToLevel(100)).toBe('advanced');
  });
});

describe('analyzePatternSkills', () => {
  it('returns empty array for no data', () => {
    expect(analyzePatternSkills([], [])).toEqual([]);
  });

  it('calculates category scores from sessions', () => {
    const sessions: SessionHistoryRow[] = [
      { problem_id: 'p1', category: 'dp', step_scores: { reading: 0.8, pattern_analysis: 0.5 }, total_score: 65, completed_at: '2026-03-01' },
      { problem_id: 'p2', category: 'dp', step_scores: { reading: 1.0, pattern_analysis: 1.0 }, total_score: 85, completed_at: '2026-03-02' },
      { problem_id: 'p3', category: 'graph', step_scores: { reading: 0.5 }, total_score: 40, completed_at: '2026-03-01' },
    ];

    const result = analyzePatternSkills([], sessions);

    expect(result.length).toBe(2);
    // Sorted by score ascending (weakest first)
    expect(result[0].category).toBe('graph');
    expect(result[0].score).toBe(40);
    expect(result[0].level).toBe('basic');

    expect(result[1].category).toBe('dp');
    expect(result[1].score).toBe(75);
    expect(result[1].level).toBe('intermediate');
  });

  it('identifies weak steps', () => {
    const sessions: SessionHistoryRow[] = [
      { problem_id: 'p1', category: 'dp', step_scores: { reading: 1.0, complexity: 0.2 }, total_score: 60, completed_at: '2026-03-01' },
      { problem_id: 'p2', category: 'dp', step_scores: { reading: 0.8, complexity: 0.3 }, total_score: 55, completed_at: '2026-03-02' },
    ];

    const result = analyzePatternSkills([], sessions);
    expect(result[0].weakSteps).toContain('complexity');
  });
});

describe('analyzeStepWeaknesses', () => {
  it('returns sorted by weakest first', () => {
    const stats: StepStatRow[] = [
      { step_name: 'reading', total_attempts: 10, total_score: 8.0, perfect_count: 6, miss_count: 1 },
      { step_name: 'complexity', total_attempts: 10, total_score: 3.0, perfect_count: 1, miss_count: 5 },
    ];

    const result = analyzeStepWeaknesses(stats);
    expect(result[0].step).toBe('complexity');
    expect(result[0].averageScore).toBe(30);
    expect(result[1].step).toBe('reading');
    expect(result[1].averageScore).toBe(80);
  });
});

describe('buildSkillSummary', () => {
  it('builds complete summary', () => {
    const conceptStats: ConceptStatRow[] = [];
    const stepStats: StepStatRow[] = [
      { step_name: 'reading', total_attempts: 5, total_score: 4.0, perfect_count: 3, miss_count: 0 },
    ];
    const sessions: SessionHistoryRow[] = [
      { problem_id: 'p1', category: 'greedy', step_scores: {}, total_score: 70, completed_at: '2026-03-01' },
    ];

    const summary = buildSkillSummary(conceptStats, stepStats, sessions);

    expect(summary.totalAttempts).toBe(1);
    expect(summary.overallScore).toBe(70);
    expect(summary.weakestCategory).toBe('greedy');
    expect(summary.strongestCategory).toBe('greedy');
    expect(summary.patterns.length).toBe(1);
    expect(summary.stepWeaknesses.length).toBe(1);
  });

  it('handles empty data gracefully', () => {
    const summary = buildSkillSummary([], [], []);
    expect(summary.totalAttempts).toBe(0);
    expect(summary.overallScore).toBe(0);
    expect(summary.weakestCategory).toBeNull();
  });
});
