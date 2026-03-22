/**
 * Training session CRUD — Supabase integration
 */

import { supabase } from '@/src/lib/supabase';
import type { ProblemV2, TrainingSessionRow, StepAnswers } from '@/src/types';

// ── Auth helper ──

export async function getCurrentUserId(): Promise<string> {
  const { data } = await supabase.auth.getSession();
  if (data.session?.user?.id) {
    return data.session.user.id;
  }
  // 익명 로그인 (MVP: auto sign-in)
  const { data: anonData, error } = await supabase.auth.signInAnonymously();
  if (error) throw new Error(`Anonymous auth failed: ${error.message}`);
  return anonData.user!.id;
}

// ── Problem ──

export async function fetchProblem(problemId: string): Promise<ProblemV2> {
  const { data, error } = await supabase
    .from('problems')
    .select('*')
    .eq('id', problemId)
    .single();

  if (error) throw new Error(`Problem fetch failed: ${error.message}`);
  return data as ProblemV2;
}

// ── Session CRUD ──

export async function getInProgressSession(
  userId: string,
  problemId: string,
): Promise<TrainingSessionRow | null> {
  const { data, error } = await supabase
    .from('training_sessions')
    .select('*')
    .eq('user_id', userId)
    .eq('problem_id', problemId)
    .eq('status', 'in_progress')
    .order('started_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) throw new Error(`Session fetch failed: ${error.message}`);
  return data as TrainingSessionRow | null;
}

export async function createSession(
  userId: string,
  problemId: string,
): Promise<string> {
  const { data, error } = await supabase
    .from('training_sessions')
    .insert({
      user_id: userId,
      problem_id: problemId,
      current_step: 1,
      status: 'in_progress',
      step_answers: {},
      step_scores: {},
      triggered_mistakes: [],
    })
    .select('id')
    .single();

  if (error) throw new Error(`Session create failed: ${error.message}`);
  return data.id;
}

export async function saveProgress(
  sessionId: string,
  stepAnswers: StepAnswers,
  stepScores: Record<string, number>,
  currentStep: number,
): Promise<void> {
  const { error } = await supabase
    .from('training_sessions')
    .update({
      step_answers: stepAnswers,
      step_scores: stepScores,
      current_step: currentStep,
      last_saved_at: new Date().toISOString(),
    })
    .eq('id', sessionId);

  if (error) throw new Error(`Save failed: ${error.message}`);
}

export async function completeSession(
  sessionId: string,
  totalScore: number,
  stepScores: Record<string, number>,
  triggeredMistakes: string[],
): Promise<void> {
  const { error } = await supabase
    .from('training_sessions')
    .update({
      status: 'completed',
      total_score: totalScore,
      step_scores: stepScores,
      triggered_mistakes: triggeredMistakes,
      completed_at: new Date().toISOString(),
      last_saved_at: new Date().toISOString(),
    })
    .eq('id', sessionId);

  if (error) throw new Error(`Complete failed: ${error.message}`);
}

// ── Daily assignment ──

export async function assignDailyProblem(): Promise<string | null> {
  const { data, error } = await supabase.rpc('assign_daily_problem');
  if (error) throw new Error(`Daily assign failed: ${error.message}`);
  return data as string | null;
}
