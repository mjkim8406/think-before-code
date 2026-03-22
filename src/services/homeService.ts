/**
 * Home screen data — Supabase queries
 */

import { supabase } from '@/src/lib/supabase';
import { getCurrentUserId } from './trainingService';

export interface TodaysProblem {
  id: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  domain: string;
  summary: string;
  tags: string[];
  source_url: string | null;
  completedToday: boolean;
}

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastTrainedDate: string | null;
}

export interface ActivityDay {
  date: string; // 'YYYY-MM-DD'
  count: number;
  bestScore: number | null;
}

/**
 * 오늘의 문제 배정 + 문제 정보 조회
 * assign_daily_problem RPC → problem details fetch
 */
export async function fetchTodaysProblem(): Promise<TodaysProblem | null> {
  const userId = await getCurrentUserId();

  const { data: problemId, error: rpcErr } = await supabase.rpc('assign_daily_problem');
  if (rpcErr) throw new Error(`Daily assign failed: ${rpcErr.message}`);
  if (!problemId) return null;

  // 문제 상세 + 오늘 완료 여부 병렬 조회
  const [problemRes, completedRes] = await Promise.all([
    supabase
      .from('problems')
      .select('id, title, difficulty, domain, summary, tags, source_url')
      .eq('id', problemId)
      .single(),
    supabase
      .from('training_sessions')
      .select('id')
      .eq('user_id', userId)
      .eq('problem_id', problemId)
      .eq('status', 'completed')
      .limit(1),
  ]);

  if (problemRes.error) throw new Error(`Problem fetch failed: ${problemRes.error.message}`);

  return {
    ...(problemRes.data as Omit<TodaysProblem, 'completedToday'>),
    completedToday: (completedRes.data?.length ?? 0) > 0,
  };
}

/**
 * 유저 스트릭 조회
 */
export async function fetchUserStreak(): Promise<StreakData> {
  const userId = await getCurrentUserId();
  const { data, error } = await supabase
    .from('user_streaks')
    .select('current_streak, longest_streak, last_trained_date')
    .eq('user_id', userId)
    .maybeSingle();

  if (error) throw new Error(`Streak fetch failed: ${error.message}`);
  if (!data) return { currentStreak: 0, longestStreak: 0, lastTrainedDate: null };

  return {
    currentStreak: data.current_streak,
    longestStreak: data.longest_streak,
    lastTrainedDate: data.last_trained_date,
  };
}

/**
 * 잔디 그리드용 활동 로그 (최근 20주 = 140일)
 */
export async function fetchActivityGrid(): Promise<ActivityDay[]> {
  const userId = await getCurrentUserId();
  const since = new Date();
  since.setDate(since.getDate() - 140);

  const { data, error } = await supabase
    .from('activity_log')
    .select('active_date, sessions_completed, best_score')
    .eq('user_id', userId)
    .gte('active_date', since.toISOString().split('T')[0])
    .order('active_date', { ascending: true });

  if (error) throw new Error(`Activity fetch failed: ${error.message}`);

  return (data ?? []).map((row) => ({
    date: row.active_date,
    count: row.sessions_completed,
    bestScore: row.best_score,
  }));
}

/**
 * Learning Path — DB category 기반 추천
 * Library 카테고리와 동일한 기준 (dp, greedy, graph, tree, sorting, search, ...)
 */
export interface LearningPathData {
  conceptTag: string;   // DB category key (library 필터 연동용)
  label: string;
  problemsSolved: number;
  totalProblems: number;
  averageScore: number;
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

export async function fetchLearningPath(): Promise<LearningPathData | null> {
  const userId = await getCurrentUserId();

  // 1) 카테고리별 전체 문제 수 조회
  const { data: allProblems, error: pErr } = await supabase
    .from('problems')
    .select('id, category')
    .eq('is_active', true);

  if (pErr) throw new Error(`Problems fetch failed: ${pErr.message}`);
  if (!allProblems || allProblems.length === 0) return null;

  // 카테고리별 전체 수 집계
  const categoryTotal = new Map<string, number>();
  for (const p of allProblems) {
    categoryTotal.set(p.category, (categoryTotal.get(p.category) ?? 0) + 1);
  }

  // 2) 유저가 완료한 문제의 카테고리별 수 + 점수
  const { data: completedSessions, error: sErr } = await supabase
    .from('training_sessions')
    .select('problem_id, total_score')
    .eq('user_id', userId)
    .eq('status', 'completed');

  if (sErr) throw new Error(`Sessions fetch failed: ${sErr.message}`);

  // problem_id → category 맵
  const idToCategory = new Map<string, string>();
  for (const p of allProblems) {
    idToCategory.set(p.id, p.category);
  }

  // 카테고리별 풀이 수 & 총점 집계
  const categorySolved = new Map<string, { count: number; totalScore: number }>();
  const solvedProblemIds = new Set<string>();
  for (const s of completedSessions ?? []) {
    // 같은 문제 중복 풀이는 1회로 카운트
    if (solvedProblemIds.has(s.problem_id)) continue;
    solvedProblemIds.add(s.problem_id);

    const cat = idToCategory.get(s.problem_id);
    if (!cat) continue;
    const prev = categorySolved.get(cat) ?? { count: 0, totalScore: 0 };
    categorySolved.set(cat, {
      count: prev.count + 1,
      totalScore: prev.totalScore + (s.total_score ?? 0),
    });
  }

  // 3) 가장 추천할 카테고리 선택 (아직 안 푼 문제가 많고, 평균 점수가 낮은 것)
  let bestCategory: string | null = null;
  let bestScore = -Infinity;

  for (const [cat, total] of categoryTotal) {
    const solved = categorySolved.get(cat);
    const solvedCount = solved?.count ?? 0;
    const remaining = total - solvedCount;
    if (remaining <= 0) continue; // 다 풀었으면 스킵

    const avgScore = solvedCount > 0 ? (solved!.totalScore / solvedCount) : 0;
    // 낮은 점수 + 남은 문제 많을수록 높은 우선순위
    const priority = remaining * 10 + (100 - avgScore);
    if (priority > bestScore) {
      bestScore = priority;
      bestCategory = cat;
    }
  }

  // 4) 아직 아무것도 안 풀었으면 가장 문제가 많은 카테고리 추천
  if (!bestCategory) {
    let maxCount = 0;
    for (const [cat, total] of categoryTotal) {
      if (total > maxCount) {
        maxCount = total;
        bestCategory = cat;
      }
    }
  }

  if (!bestCategory) return null;

  const total = categoryTotal.get(bestCategory) ?? 0;
  const solved = categorySolved.get(bestCategory);

  return {
    conceptTag: bestCategory,
    label: CATEGORY_LABELS[bestCategory] ?? bestCategory,
    problemsSolved: solved?.count ?? 0,
    totalProblems: total,
    averageScore: solved && solved.count > 0
      ? Math.round(solved.totalScore / solved.count)
      : 0,
  };
}

/**
 * 총 풀이 수 (completed 세션 수)
 */
export async function fetchTotalSolvedCount(): Promise<number> {
  const userId = await getCurrentUserId();
  const { count, error } = await supabase
    .from('training_sessions')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('status', 'completed');

  if (error) throw new Error(`Solved count failed: ${error.message}`);
  return count ?? 0;
}
