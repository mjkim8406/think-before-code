/**
 * Library screen data — Supabase queries
 */

import { supabase } from '@/src/lib/supabase';
import { getCurrentUserId } from './trainingService';

export interface LibraryProblemRow {
  id: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  domain: string;
  summary: string;
  tags: string[];
}

/**
 * 문제 목록 조회 (필터/검색 지원)
 */
export async function fetchProblems(opts?: {
  search?: string;
  tag?: string;      // category filter by tag name
  limit?: number;
  offset?: number;
}): Promise<LibraryProblemRow[]> {
  let query = supabase
    .from('problems')
    .select('id, title, difficulty, domain, summary, tags')
    .eq('is_active', true)
    .order('title', { ascending: true });

  if (opts?.search) {
    query = query.or(`title.ilike.%${opts.search}%,summary.ilike.%${opts.search}%,domain.ilike.%${opts.search}%`);
  }

  if (opts?.tag) {
    query = query.contains('tags', [opts.tag.toLowerCase()]);
  }

  const limit = opts?.limit ?? 50;
  const offset = opts?.offset ?? 0;
  query = query.range(offset, offset + limit - 1);

  const { data, error } = await query;
  if (error) throw new Error(`Problems fetch failed: ${error.message}`);
  return (data ?? []) as LibraryProblemRow[];
}

/**
 * 유저가 완료한 문제 ID 세트
 */
export async function fetchSolvedProblemIds(): Promise<Set<string>> {
  const userId = await getCurrentUserId();
  const { data, error } = await supabase
    .from('training_sessions')
    .select('problem_id')
    .eq('user_id', userId)
    .eq('status', 'completed');

  if (error) throw new Error(`Solved IDs fetch failed: ${error.message}`);
  return new Set((data ?? []).map((r) => r.problem_id));
}

/**
 * 전체 활성 문제 수
 */
export async function fetchTotalProblemCount(): Promise<number> {
  const { count, error } = await supabase
    .from('problems')
    .select('id', { count: 'exact', head: true })
    .eq('is_active', true);

  if (error) throw new Error(`Problem count failed: ${error.message}`);
  return count ?? 0;
}

/**
 * 모든 고유 태그 목록 (카테고리 탭용)
 */
export async function fetchAllTags(): Promise<string[]> {
  const { data, error } = await supabase
    .from('problems')
    .select('tags')
    .eq('is_active', true);

  if (error) throw new Error(`Tags fetch failed: ${error.message}`);

  const tagSet = new Set<string>();
  (data ?? []).forEach((row) => {
    (row.tags as string[]).forEach((t) => tagSet.add(t));
  });

  return Array.from(tagSet).sort();
}
