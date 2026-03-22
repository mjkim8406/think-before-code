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

export interface WeeklyActivity {
  week: string;  // '1주차', '2주차', ...
  count: number;
}

export interface DifficultyCount {
  easy: number;
  medium: number;
  hard: number;
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

/**
 * 컨셉별 마스터리 (상위 N개)
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
