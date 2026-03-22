/**
 * Library screen data — Supabase queries
 */

import { supabase } from '@/src/lib/supabase';
import { getCurrentUserId } from './trainingService';
import { problemToCourseTopic } from '@/src/data/coursePaths';
import type { CourseLevel } from '@/src/data/coursePaths';

export interface LibraryProblemRow {
  id: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  courseLevel: CourseLevel | null;
  domain: string;
  category: string;
  /** 코스 주제 (category + tags 기반 자동 매핑) */
  courseTopic: string | null;
  summary: string;
  tags: string[];
}

/**
 * 전체 활성 문제 목록 조회 (클라이언트 필터링용)
 */
export async function fetchAllProblems(): Promise<LibraryProblemRow[]> {
  const { data, error } = await supabase
    .from('problems')
    .select('id, title, difficulty, course_level, domain, category, summary, tags')
    .eq('is_active', true)
    .order('title', { ascending: true })
    .limit(500);

  if (error) throw new Error(`Problems fetch failed: ${error.message}`);
  return (data ?? []).map((row: any) => ({
    ...row,
    courseLevel: row.course_level ?? null,
    courseTopic: problemToCourseTopic(row.category, row.tags),
  })) as LibraryProblemRow[];
}

/**
 * 클라이언트 사이드 필터링
 * - category: courseTopic 기반 (hash, stack-queue, dp 등) 또는 DB category fallback
 * - courseLevel: beginner/basic/intermediate/advanced
 * - search: 제목/요약/도메인/태그 텍스트 검색
 */
export function filterProblems(
  all: LibraryProblemRow[],
  opts?: { search?: string; category?: string; courseLevel?: string },
): LibraryProblemRow[] {
  let result = all;

  if (opts?.category) {
    const cat = opts.category.toLowerCase();
    // courseTopic으로 먼저 매칭, 없으면 DB category로 fallback
    result = result.filter((p) => p.courseTopic === cat || p.category === cat);
  }

  if (opts?.courseLevel) {
    result = result.filter((p) => p.courseLevel === opts.courseLevel);
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
 * 카테고리 목록 + 문제 수 추출 (코스 주제 기반)
 * courseTopic이 있으면 그것으로, 없으면 DB category로 분류
 */
export function extractCategories(problems: LibraryProblemRow[]): { key: string; count: number }[] {
  const map = new Map<string, number>();
  problems.forEach((p) => {
    const key = p.courseTopic ?? p.category;
    map.set(key, (map.get(key) ?? 0) + 1);
  });
  // 코스 순서대로 정렬 (코스에 없는건 뒤로)
  const courseOrder = [
    'hash', 'stack-queue', 'sort', 'brute-force', 'dfs-bfs',
    'binary-search', 'heap', 'greedy', 'dp', 'graph',
  ];
  return Array.from(map.entries())
    .map(([key, count]) => ({ key, count }))
    .sort((a, b) => {
      const aIdx = courseOrder.indexOf(a.key);
      const bIdx = courseOrder.indexOf(b.key);
      if (aIdx >= 0 && bIdx >= 0) return aIdx - bIdx;
      if (aIdx >= 0) return -1;
      if (bIdx >= 0) return 1;
      return b.count - a.count;
    });
}
