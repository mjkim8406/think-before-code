/**
 * Bookmark service — Supabase CRUD for bookmarks table
 */

import { supabase } from '@/src/lib/supabase';
import { getCurrentUserId } from './trainingService';

/**
 * 유저의 북마크된 문제 ID 세트 조회
 */
export async function fetchBookmarkedIds(): Promise<Set<string>> {
  const userId = await getCurrentUserId();
  const { data, error } = await supabase
    .from('bookmarks')
    .select('problem_id')
    .eq('user_id', userId);

  if (error) throw new Error(`Bookmarks fetch failed: ${error.message}`);
  return new Set((data ?? []).map((r) => r.problem_id));
}

/**
 * 북마크 토글 (있으면 삭제, 없으면 추가)
 * @returns 토글 후 북마크 상태 (true = 북마크됨)
 */
export async function toggleBookmark(problemId: string): Promise<boolean> {
  const userId = await getCurrentUserId();

  // 현재 상태 확인
  const { data: existing } = await supabase
    .from('bookmarks')
    .select('problem_id')
    .eq('user_id', userId)
    .eq('problem_id', problemId)
    .maybeSingle();

  if (existing) {
    const { error } = await supabase
      .from('bookmarks')
      .delete()
      .eq('user_id', userId)
      .eq('problem_id', problemId);
    if (error) throw new Error(`Bookmark remove failed: ${error.message}`);
    return false;
  } else {
    const { error } = await supabase
      .from('bookmarks')
      .insert({ user_id: userId, problem_id: problemId });
    if (error) throw new Error(`Bookmark add failed: ${error.message}`);
    return true;
  }
}
