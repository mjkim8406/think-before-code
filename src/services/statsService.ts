/**
 * Stats/Performance screen data — Supabase queries
 */

import { supabase } from '@/src/lib/supabase';
import { getCurrentUserId } from './trainingService';

export interface StatsSummary {
  totalSolved: number;
  accuracyRate: number;  // 0~100
  totalStudyDays: number;
  currentStreak: number;
}

export interface ConceptMasteryItem {
  conceptTag: string;
  problemsSolved: number;
  averageScore: number; // 0~100
}

export interface CategoryMasteryItem {
  category: string;
  label: string;
  solved: number;
  total: number;
  averageScore: number; // 0~100
}

export interface WeeklyActivity {
  week: string;  // '1주차', '2주차', ...
  count: number;
}

export interface DailyActivity {
  day: string;   // 'MON', 'TUE', ...
  count: number;
}

export interface DifficultyCount {
  easy: number;
  medium: number;
  hard: number;
}

export interface StepAccuracy {
  step: string;
  label: string;
  avgScore: number; // 0~100
  totalAttempts: number;
}

export interface SolvedProblemItem {
  problemId: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  score: number;
  completedAt: string;
}

/**
 * 통합 요약 통계
 */
export async function fetchStatsSummary(): Promise<StatsSummary> {
  const userId = await getCurrentUserId();

  // 병렬 쿼리
  const [sessionsRes, activityRes, streakRes] = await Promise.all([
    // 완료 세션 + 평균 점수
    supabase
      .from('training_sessions')
      .select('total_score')
      .eq('user_id', userId)
      .eq('status', 'completed'),
    // 활동 일수
    supabase
      .from('activity_log')
      .select('active_date', { count: 'exact', head: true })
      .eq('user_id', userId),
    // 스트릭
    supabase
      .from('user_streaks')
      .select('current_streak')
      .eq('user_id', userId)
      .maybeSingle(),
  ]);

  if (sessionsRes.error) throw new Error(sessionsRes.error.message);
  if (activityRes.error) throw new Error(activityRes.error.message);

  const sessions = sessionsRes.data ?? [];
  const totalSolved = sessions.length;
  const avgScore = totalSolved > 0
    ? sessions.reduce((sum, s) => sum + (s.total_score ?? 0), 0) / totalSolved
    : 0;

  return {
    totalSolved,
    accuracyRate: Math.round(avgScore),
    totalStudyDays: activityRes.count ?? 0,
    currentStreak: streakRes.data?.current_streak ?? 0,
  };
}

const CATEGORY_LABELS: Record<string, string> = {
  dp: 'Dynamic Programming',
  greedy: 'Greedy',
  graph: 'Graph',
  tree: 'Tree',
  sorting: 'Sorting',
  search: 'Search',
  'number-theory': 'Number Theory',
  combinatorics: 'Combinatorics',
  'data-structures': 'Data Structures',
  geometry: 'Geometry',
};

/**
 * 카테고리 기반 마스터리 (메인 화면용)
 */
export async function fetchCategoryMastery(): Promise<CategoryMasteryItem[]> {
  const userId = await getCurrentUserId();

  // 전체 문제 카테고리별 수
  const { data: allProblems, error: pErr } = await supabase
    .from('problems')
    .select('id, category')
    .eq('is_active', true);

  if (pErr) throw new Error(`Category mastery failed: ${pErr.message}`);

  const categoryTotal = new Map<string, { total: number; ids: Set<string> }>();
  for (const p of allProblems ?? []) {
    const prev = categoryTotal.get(p.category) ?? { total: 0, ids: new Set() };
    prev.total++;
    prev.ids.add(p.id);
    categoryTotal.set(p.category, prev);
  }

  // 유저 완료 세션
  const { data: sessions, error: sErr } = await supabase
    .from('training_sessions')
    .select('problem_id, total_score')
    .eq('user_id', userId)
    .eq('status', 'completed');

  if (sErr) throw new Error(`Category mastery sessions failed: ${sErr.message}`);

  // problem_id → category
  const idToCat = new Map<string, string>();
  for (const p of allProblems ?? []) idToCat.set(p.id, p.category);

  // 카테고리별 집계 (중복 문제는 최신만)
  const catStats = new Map<string, { solved: Set<string>; scoreSum: number; scoreCount: number }>();
  for (const s of sessions ?? []) {
    const cat = idToCat.get(s.problem_id);
    if (!cat) continue;
    const prev = catStats.get(cat) ?? { solved: new Set(), scoreSum: 0, scoreCount: 0 };
    if (!prev.solved.has(s.problem_id)) {
      prev.solved.add(s.problem_id);
      prev.scoreSum += s.total_score ?? 0;
      prev.scoreCount++;
    }
    catStats.set(cat, prev);
  }

  const results: CategoryMasteryItem[] = [];
  for (const [cat, { total }] of categoryTotal) {
    const stats = catStats.get(cat);
    if (!stats || stats.scoreCount === 0) continue; // 안 푼 카테고리는 스킵
    results.push({
      category: cat,
      label: CATEGORY_LABELS[cat] ?? cat,
      solved: stats.solved.size,
      total,
      averageScore: Math.round(stats.scoreSum / stats.scoreCount),
    });
  }

  return results.sort((a, b) => b.solved - a.solved);
}

/**
 * 컨셉별 마스터리 — 태그 기반 상세 (모달용)
 */
export async function fetchConceptMastery(limit = 6): Promise<ConceptMasteryItem[]> {
  const userId = await getCurrentUserId();
  const { data, error } = await supabase
    .from('user_concept_stats')
    .select('concept_tag, problems_solved, total_score')
    .eq('user_id', userId)
    .order('problems_solved', { ascending: false })
    .limit(limit);

  if (error) throw new Error(`Concept mastery failed: ${error.message}`);

  return (data ?? []).map((row) => ({
    conceptTag: row.concept_tag,
    problemsSolved: row.problems_solved,
    averageScore: row.problems_solved > 0
      ? Math.round((row.total_score / row.problems_solved) * 100) / 100
      : 0,
  }));
}

/**
 * 주간 활동 (최근 5주)
 */
export async function fetchMonthlyActivity(): Promise<WeeklyActivity[]> {
  const userId = await getCurrentUserId();
  const since = new Date();
  since.setDate(since.getDate() - 35); // 5주

  const { data, error } = await supabase
    .from('activity_log')
    .select('active_date, sessions_completed')
    .eq('user_id', userId)
    .gte('active_date', since.toISOString().split('T')[0])
    .order('active_date', { ascending: true });

  if (error) throw new Error(`Monthly activity failed: ${error.message}`);

  // 5주로 그룹핑
  const weeks: WeeklyActivity[] = [];
  const rows = data ?? [];

  for (let w = 0; w < 5; w++) {
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - (4 - w) * 7);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);

    const startStr = weekStart.toISOString().split('T')[0];
    const endStr = weekEnd.toISOString().split('T')[0];

    const count = rows
      .filter((r) => r.active_date >= startStr && r.active_date <= endStr)
      .reduce((sum, r) => sum + r.sessions_completed, 0);

    weeks.push({ week: `${w + 1}주차`, count });
  }

  return weeks;
}

/**
 * 이번 주 요일별 활동 (Week 탭용)
 */
export async function fetchWeeklyDailyActivity(): Promise<DailyActivity[]> {
  const userId = await getCurrentUserId();
  const now = new Date();
  const todayIdx = (now.getDay() + 6) % 7; // 0=Mon
  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - todayIdx);
  const startStr = weekStart.toISOString().split('T')[0];

  const { data, error } = await supabase
    .from('activity_log')
    .select('active_date, sessions_completed')
    .eq('user_id', userId)
    .gte('active_date', startStr)
    .order('active_date', { ascending: true });

  if (error) throw new Error(`Weekly activity failed: ${error.message}`);

  const labels = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  const result: DailyActivity[] = labels.map((day) => ({ day, count: 0 }));

  for (const row of data ?? []) {
    const d = new Date(row.active_date + 'T00:00:00');
    const idx = (d.getDay() + 6) % 7;
    result[idx].count += row.sessions_completed;
  }

  return result;
}

/**
 * 단계별 정확도 (Precision 상세용)
 */
export async function fetchStepAccuracy(): Promise<StepAccuracy[]> {
  const userId = await getCurrentUserId();

  const { data, error } = await supabase
    .from('training_sessions')
    .select('step_scores')
    .eq('user_id', userId)
    .eq('status', 'completed');

  if (error) throw new Error(`Step accuracy failed: ${error.message}`);

  const STEP_LABELS: Record<string, string> = {
    reading: '문제 읽기',
    pattern_analysis: '패턴 분석',
    strategy_design: '전략 설계',
    solution_flow: '풀이 흐름',
    complexity: '복잡도 분석',
    edge_cases: '엣지 케이스',
  };

  const stepTotals = new Map<string, { sum: number; count: number }>();

  for (const session of data ?? []) {
    const scores = session.step_scores as Record<string, number> | null;
    if (!scores) continue;
    for (const [step, score] of Object.entries(scores)) {
      const prev = stepTotals.get(step) ?? { sum: 0, count: 0 };
      stepTotals.set(step, { sum: prev.sum + (score ?? 0), count: prev.count + 1 });
    }
  }

  const steps = ['reading', 'pattern_analysis', 'strategy_design', 'solution_flow', 'complexity', 'edge_cases'];

  return steps
    .filter((s) => stepTotals.has(s))
    .map((step) => {
      const { sum, count } = stepTotals.get(step)!;
      return {
        step,
        label: STEP_LABELS[step] ?? step,
        avgScore: count > 0 ? Math.round((sum / count) * 100) : 0,
        totalAttempts: count,
      };
    });
}

/**
 * 풀은 문제 목록 (Solved 상세용)
 */
export async function fetchSolvedProblems(): Promise<SolvedProblemItem[]> {
  const userId = await getCurrentUserId();

  const { data, error } = await supabase
    .from('training_sessions')
    .select('problem_id, total_score, completed_at')
    .eq('user_id', userId)
    .eq('status', 'completed')
    .order('completed_at', { ascending: false })
    .limit(50);

  if (error) throw new Error(`Solved problems failed: ${error.message}`);
  if (!data || data.length === 0) return [];

  // 중복 제거 (같은 문제 최신 풀이만)
  const seen = new Set<string>();
  const unique = data.filter((s) => {
    if (seen.has(s.problem_id)) return false;
    seen.add(s.problem_id);
    return true;
  });

  const problemIds = unique.map((s) => s.problem_id);
  const { data: problems } = await supabase
    .from('problems')
    .select('id, title, difficulty, category')
    .in('id', problemIds);

  const problemMap = new Map<string, { title: string; difficulty: string; category: string }>();
  for (const p of problems ?? []) {
    problemMap.set(p.id, { title: p.title, difficulty: p.difficulty, category: p.category });
  }

  return unique.map((s) => {
    const p = problemMap.get(s.problem_id);
    return {
      problemId: s.problem_id,
      title: p?.title ?? 'Unknown',
      difficulty: (p?.difficulty ?? 'medium') as 'easy' | 'medium' | 'hard',
      category: p?.category ?? '',
      score: s.total_score ?? 0,
      completedAt: s.completed_at,
    };
  });
}

/**
 * 난이도 분포 (완료된 문제 기준)
 */
export async function fetchDifficultyDistribution(): Promise<DifficultyCount> {
  const userId = await getCurrentUserId();

  // 완료 세션의 problem_id 가져오기
  const { data: sessions, error: sessErr } = await supabase
    .from('training_sessions')
    .select('problem_id')
    .eq('user_id', userId)
    .eq('status', 'completed');

  if (sessErr) throw new Error(sessErr.message);

  const problemIds = [...new Set((sessions ?? []).map((s) => s.problem_id))];
  if (problemIds.length === 0) return { easy: 0, medium: 0, hard: 0 };

  const { data: problems, error: probErr } = await supabase
    .from('problems')
    .select('difficulty')
    .in('id', problemIds);

  if (probErr) throw new Error(probErr.message);

  const counts: DifficultyCount = { easy: 0, medium: 0, hard: 0 };
  (problems ?? []).forEach((p) => {
    counts[p.difficulty as keyof DifficultyCount]++;
  });

  return counts;
}
