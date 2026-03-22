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
  category: string;
  summary: string;
  tags: string[];
}

/**
 * 전체 활성 문제 목록 조회 (클라이언트 필터링용)
 */
export async function fetchAllProblems(): Promise<LibraryProblemRow[]> {
  const { data, error } = await supabase
    .from('problems')
    .select('id, title, difficulty, domain, category, summary, tags')
    .eq('is_active', true)
    .order('title', { ascending: true })
    .limit(500);

  if (error) throw new Error(`Problems fetch failed: ${error.message}`);
  return (data ?? []) as LibraryProblemRow[];
}

/**
 * 클라이언트 사이드 필터링
 * - category: 파일 분류 기준 (dp, greedy, graph 등) — 카테고리 탭용
 * - difficulty: easy/medium/hard
 * - search: 제목/요약/도메인/태그 텍스트 검색
 */
export function filterProblems(
  all: LibraryProblemRow[],
  opts?: { search?: string; category?: string; difficulty?: string },
): LibraryProblemRow[] {
  let result = all;

  if (opts?.category) {
    const cat = opts.category.toLowerCase();
    result = result.filter((p) => p.category === cat);
  }

  if (opts?.difficulty) {
    result = result.filter((p) => p.difficulty === opts.difficulty);
  }

  if (opts?.search) {
    const q = opts.search.toLowerCase();
    result = result.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.domain.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)),
    );
  }

  return result;
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
 * 카테고리 목록 + 문제 수 추출
 */
export function extractCategories(problems: LibraryProblemRow[]): { key: string; count: number }[] {
  const map = new Map<string, number>();
  problems.forEach((p) => map.set(p.category, (map.get(p.category) ?? 0) + 1));
  return Array.from(map.entries())
    .map(([key, count]) => ({ key, count }))
    .sort((a, b) => b.count - a.count);
}
