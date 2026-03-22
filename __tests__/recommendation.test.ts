import { recommendNext, type RecommendationResult } from '../src/lib/recommendation';
import type { SkillSummary, SessionHistoryRow } from '../src/lib/skill-analysis';

describe('recommendNext', () => {
  it('returns Hash beginner when no data', () => {
    const emptySummary: SkillSummary = {
      patterns: [],
      stepWeaknesses: [],
      weakestCategory: null,
      strongestCategory: null,
      overallScore: 0,
      totalAttempts: 0,
    };

    const result = recommendNext(emptySummary, []);

    expect(result.primary).toBeDefined();
    expect(result.primary.kind).toBe('course');
    expect(result.primary.topic).toBe('hash');
    expect(result.primary.level).toBe('beginner');
    expect(result.summaryMessage).toContain('아직');
    expect(result.courseProgress.currentTopic).toBe('hash');
  });

  it('recommends current topic based on weakest score', () => {
    const summary: SkillSummary = {
      patterns: [
        {
          category: 'data-structures', // maps to 'hash' (first in path)
          score: 35,
          level: 'beginner',
          weakSteps: ['complexity'],
          trend: 'flat',
          attempts: 3,
          averageScore: 35,
        },
      ],
      stepWeaknesses: [],
      weakestCategory: 'data-structures',
      strongestCategory: 'data-structures',
      overallScore: 35,
      totalAttempts: 3,
    };

    const result = recommendNext(summary, []);

    expect(result.primary.topic).toBe('hash');
    expect(result.primary.level).toBe('beginner');
    expect(result.primary.reason).toContain('Hash');
    expect(result.courseProgress.currentTopic).toBe('hash');
  });

  it('advances to next topic when current is mastered', () => {
    const summary: SkillSummary = {
      patterns: [
        {
          category: 'data-structures', // maps to hash, stack-queue, heap
          score: 90,
          level: 'advanced',
          weakSteps: [],
          trend: 'up',
          attempts: 5,
          averageScore: 90,
        },
      ],
      stepWeaknesses: [],
      weakestCategory: 'data-structures',
      strongestCategory: 'data-structures',
      overallScore: 90,
      totalAttempts: 5,
    };

    const result = recommendNext(summary, []);

    // data-structures maps to hash, stack-queue, heap — all get score 90
    // hash (score 90 >= 70) → mastered → stack-queue (score 90 >= 70) → mastered → sort (no data) → current
    expect(result.courseProgress.currentTopic).toBe('sort');
    const allRecs = [result.primary, ...result.secondary];
    const sort = allRecs.find((r) => r.topic === 'sort');
    expect(sort).toBeDefined();
  });

  it('recommends retry for recent failures', () => {
    const summary: SkillSummary = {
      patterns: [
        {
          category: 'graph',
          score: 45,
          level: 'basic',
          weakSteps: [],
          trend: 'down',
          attempts: 3,
          averageScore: 45,
        },
      ],
      stepWeaknesses: [],
      weakestCategory: 'graph',
      strongestCategory: 'graph',
      overallScore: 45,
      totalAttempts: 3,
    };

    const sessions: SessionHistoryRow[] = [
      {
        problem_id: 'p1',
        category: 'graph',
        step_scores: {},
        total_score: 30,
        completed_at: '2026-03-20',
      },
    ];

    const result = recommendNext(summary, sessions);
    const allRecs = [result.primary, ...result.secondary];
    const retry = allRecs.find((r) => r.title.includes('재도전'));
    expect(retry).toBeDefined();
  });

  it('follows 10-topic course path with shared DB categories', () => {
    // User mastered data-structures (→ hash, stack-queue, heap) and graph (→ dfs-bfs, graph)
    // Also mastered sorting (→ sort), combinatorics (→ brute-force), search (→ binary-search)
    const summary: SkillSummary = {
      patterns: [
        {
          category: 'data-structures',
          score: 85,
          level: 'advanced',
          weakSteps: [],
          trend: 'up',
          attempts: 8,
          averageScore: 85,
        },
        {
          category: 'sorting',
          score: 80,
          level: 'intermediate',
          weakSteps: [],
          trend: 'up',
          attempts: 5,
          averageScore: 80,
        },
        {
          category: 'combinatorics',
          score: 75,
          level: 'intermediate',
          weakSteps: [],
          trend: 'up',
          attempts: 4,
          averageScore: 75,
        },
        {
          category: 'graph',
          score: 80,
          level: 'intermediate',
          weakSteps: [],
          trend: 'up',
          attempts: 6,
          averageScore: 80,
        },
        {
          category: 'search',
          score: 70,
          level: 'intermediate',
          weakSteps: [],
          trend: 'up',
          attempts: 4,
          averageScore: 70,
        },
      ],
      stepWeaknesses: [],
      weakestCategory: 'search',
      strongestCategory: 'data-structures',
      overallScore: 78,
      totalAttempts: 27,
    };

    const result = recommendNext(summary, []);

    // hash (ds 85 >= 70 ✓) → stack-queue (ds 85 >= 70 ✓) → sort (sorting 80 >= 70 ✓)
    // → brute-force (combinatorics 75 >= 70 ✓) → dfs-bfs (graph 80 >= 70 ✓)
    // → binary-search (search 70 >= 70 ✓) → heap (ds 85 >= 70 ✓)
    // → greedy (no data) → current!
    expect(result.courseProgress.currentTopic).toBe('greedy');
  });

  it('has dbCategory for library navigation', () => {
    const emptySummary: SkillSummary = {
      patterns: [],
      stepWeaknesses: [],
      weakestCategory: null,
      strongestCategory: null,
      overallScore: 0,
      totalAttempts: 0,
    };

    const result = recommendNext(emptySummary, []);
    expect(result.primary.dbCategory).toBe('data-structures');
  });

  it('stops at first unmastered topic even if later topics share same db category', () => {
    // Only sorting mastered — should stop at hash (first topic, no data-structures data)
    const summary: SkillSummary = {
      patterns: [
        {
          category: 'sorting',
          score: 90,
          level: 'advanced',
          weakSteps: [],
          trend: 'up',
          attempts: 5,
          averageScore: 90,
        },
      ],
      stepWeaknesses: [],
      weakestCategory: 'sorting',
      strongestCategory: 'sorting',
      overallScore: 90,
      totalAttempts: 5,
    };

    const result = recommendNext(summary, []);

    // hash has no data (data-structures category not in patterns) → current = hash
    expect(result.courseProgress.currentTopic).toBe('hash');
  });
});
