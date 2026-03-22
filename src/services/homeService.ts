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
  // RPC 호출로 오늘의 문제 배정 (이미 있으면 기존 반환)
  const { data: problemId, error: rpcErr } = await supabase.rpc('assign_daily_problem');
  if (rpcErr) throw new Error(`Daily assign failed: ${rpcErr.message}`);
  if (!problemId) return null; // 다 풀었음

  // 문제 상세 조회
  const { data, error } = await supabase
    .from('problems')
    .select('id, title, difficulty, domain, summary, tags, source_url')
    .eq('id', problemId)
    .single();

  if (error) throw new Error(`Problem fetch failed: ${error.message}`);
  return data as TodaysProblem;
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
 * Learning Path — 유저의 concept_stats 기반 추천 카테고리
 */
export interface LearningPathData {
  conceptTag: string;
  label: string;
  problemsSolved: number;
  totalProblems: number;
  averageScore: number;
}

export async function fetchLearningPath(): Promise<LearningPathData | null> {
  const userId = await getCurrentUserId();

  // 유저가 가장 많이 푼 컨셉 태그 (또는 가장 약한 태그)
  const { data: conceptStats, error: csErr } = await supabase
    .from('user_concept_stats')
    .select('concept_tag, problems_solved, total_score')
    .eq('user_id', userId)
    .order('problems_solved', { ascending: false })
    .limit(5);

  if (csErr) throw new Error(`Concept stats failed: ${csErr.message}`);

  if (!conceptStats || conceptStats.length === 0) {
    // 아직 풀이 기록 없음 → 기본 추천
    const { count } = await supabase
      .from('problems')
      .select('id', { count: 'exact', head: true })
      .eq('is_active', true)
      .contains('tags', ['dynamic-programming']);

    return {
      conceptTag: 'dynamic-programming',
      label: 'Dynamic Programming',
      problemsSolved: 0,
      totalProblems: count ?? 0,
      averageScore: 0,
    };
  }

  // 가장 약한 컨셉 (평균 점수가 가장 낮은 것) 을 학습 추천
  let weakest = conceptStats[0];
  let lowestAvg = Infinity;
  for (const stat of conceptStats) {
    const avg = stat.problems_solved > 0
      ? Number(stat.total_score) / stat.problems_solved
      : 0;
    if (avg < lowestAvg) {
      lowestAvg = avg;
      weakest = stat;
    }
  }

  // 해당 태그의 전체 문제 수
  const { count: totalCount } = await supabase
    .from('problems')
    .select('id', { count: 'exact', head: true })
    .eq('is_active', true)
    .contains('tags', [weakest.concept_tag]);

  // 라벨 매핑
  const CONCEPT_LABELS: Record<string, string> = {
    'dynamic-programming': 'Dynamic Programming',
    greedy: 'Greedy Algorithms',
    graph: 'Graph Theory',
    tree: 'Tree Structures',
    sorting: 'Sorting & Searching',
    'binary-search': 'Binary Search',
    string: 'String Processing',
    math: 'Mathematics',
    'number-theory': 'Number Theory',
    combinatorics: 'Combinatorics',
    bfs: 'BFS Traversal',
    dfs: 'DFS Traversal',
    stack: 'Stack & Queue',
    'two-pointer': 'Two Pointers',
    'sliding-window': 'Sliding Window',
    simulation: 'Simulation',
  };

  return {
    conceptTag: weakest.concept_tag,
    label: CONCEPT_LABELS[weakest.concept_tag] ?? weakest.concept_tag,
    problemsSolved: weakest.problems_solved,
    totalProblems: totalCount ?? 0,
    averageScore: weakest.problems_solved > 0
      ? Math.round(Number(weakest.total_score) / weakest.problems_solved)
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
