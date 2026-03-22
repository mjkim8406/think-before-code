/**
 * Bookmark state management hook
 */

import { useState, useEffect, useCallback } from 'react';
import { fetchBookmarkedIds, toggleBookmark } from '@/src/services/bookmarkService';

interface BookmarkState {
  bookmarkedIds: Set<string>;
  isLoading: boolean;
  toggle: (problemId: string) => Promise<void>;
  isBookmarked: (problemId: string) => boolean;
  refresh: () => void;
}

export function useBookmarks(): BookmarkState {
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      setIsLoading(true);
      const ids = await fetchBookmarkedIds();
      setBookmarkedIds(ids);
    } catch {
      // 실패 시 빈 세트 유지
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const toggle = useCallback(async (problemId: string) => {
    // Optimistic update
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(problemId)) {
        next.delete(problemId);
      } else {
        next.add(problemId);
      }
      return next;
    });

    try {
      await toggleBookmark(problemId);
    } catch {
      // Rollback on failure
      setBookmarkedIds((prev) => {
        const next = new Set(prev);
        if (next.has(problemId)) {
          next.delete(problemId);
        } else {
          next.add(problemId);
        }
        return next;
      });
    }
  }, []);

  const isBookmarked = useCallback(
    (problemId: string) => bookmarkedIds.has(problemId),
    [bookmarkedIds],
  );

  return { bookmarkedIds, isLoading, toggle, isBookmarked, refresh: load };
}
