/**
 * 추천 서비스 — Supabase에서 실력 데이터를 가져와 추천 엔진에 전달
 */

import { supabase } from '@/src/lib/supabase';
import { getCurrentUserId } from './trainingService';
import {
  buildSkillSummary,
  type ConceptStatRow,
  type StepStatRow,
  type SessionHistoryRow,
} from '@/src/lib/skill-analysis';
import { recommendNext, type RecommendationResult } from '@/src/lib/recommendation';

/**
 * 추천 데이터 패치 + 분석 + 추천 한 번에 실행
 */
export async function fetchRecommendation(): Promise<RecommendationResult> {
  const userId = await getCurrentUserId();

  // 병렬로 3종류 데이터 조회
  const [conceptRes, stepRes, sessionsRes] = await Promise.all([
    // 1) 개념별 누적 통계
    supabase
      .from('user_concept_stats')
      .select('concept_tag, problems_solved, total_score, last_solved_at')
      .eq('user_id', userId),

    // 2) Step별 누적 통계
    supabase
      .from('user_step_stats')
      .select('step_name, total_attempts, total_score, perfect_count, miss_count')
      .eq('user_id', userId),

    // 3) 최근 완료 세션 (최대 30개) — 문제의 category도 함께 조회
    supabase
      .from('training_sessions')
      .select(`
        problem_id,
        step_scores,
        total_score,
        completed_at,
        problems!inner(category)
      `)
      .eq('user_id', userId)
      .eq('status', 'completed')
      .order('completed_at', { ascending: false })
      .limit(30),
  ]);

  // 데이터 변환
  const conceptStats: ConceptStatRow[] = (conceptRes.data ?? []).map((r: any) => ({
    concept_tag: r.concept_tag,
    problems_solved: r.problems_solved,
    total_score: r.total_score,
    last_solved_at: r.last_solved_at,
  }));

  const stepStats: StepStatRow[] = (stepRes.data ?? []).map((r: any) => ({
    step_name: r.step_name,
    total_attempts: r.total_attempts,
    total_score: r.total_score,
    perfect_count: r.perfect_count,
    miss_count: r.miss_count,
  }));

  const recentSessions: SessionHistoryRow[] = (sessionsRes.data ?? []).map((r: any) => ({
    problem_id: r.problem_id,
    category: r.problems?.category ?? '',
    step_scores: r.step_scores ?? {},
    total_score: r.total_score ?? 0,
    completed_at: r.completed_at ?? '',
  }));

  // 실력 분석
  const summary = buildSkillSummary(conceptStats, stepStats, recentSessions);

  // 추천 생성
  return recommendNext(summary, recentSessions);
}

/**
 * 특정 카테고리 + 레벨의 문제 목록 조회
 */
export async function fetchCourseProblems(
  category: string,
  courseLevel: string,
): Promise<{ id: string; title: string; difficulty: string }[]> {
  const { data, error } = await supabase
    .from('problems')
    .select('id, title, difficulty')
    .eq('category', category)
    .eq('course_level', courseLevel)
    .eq('is_active', true)
    .order('difficulty', { ascending: true });

  if (error) throw new Error(`Course problems fetch failed: ${error.message}`);
  return data ?? [];
}
