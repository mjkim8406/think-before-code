/**
 * Library screen data hook
 */

import { useState, useEffect, useCallback } from 'react';
import {
  fetchProblems,
  fetchSolvedProblemIds,
  fetchTotalProblemCount,
  fetchAllTags,
  type LibraryProblemRow,
} from '@/src/services/libraryService';

interface LibraryData {
  problems: LibraryProblemRow[];
  solvedIds: Set<string>;
  totalCount: number;
  solvedCount: number;
  allTags: string[];
  isLoading: boolean;
  error: string | null;
  search: string;
  setSearch: (s: string) => void;
  activeTag: string | null;
  setActiveTag: (t: string | null) => void;
  refresh: () => void;
}

export function useLibraryData(): LibraryData {
  const [problems, setProblems] = useState<LibraryProblemRow[]>([]);
  const [solvedIds, setSolvedIds] = useState<Set<string>>(new Set());
  const [totalCount, setTotalCount] = useState(0);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const [probs, solved, count, tags] = await Promise.all([
        fetchProblems({
          search: search || undefined,
          tag: activeTag ?? undefined,
        }),
        fetchSolvedProblemIds(),
        fetchTotalProblemCount(),
        fetchAllTags(),
      ]);

      setProblems(probs);
      setSolvedIds(solved);
      setTotalCount(count);
      setAllTags(tags);
    } catch (err: any) {
      setError(err.message ?? 'Failed to load library data');
    } finally {
      setIsLoading(false);
    }
  }, [search, activeTag]);

  useEffect(() => { load(); }, [load]);

  return {
    problems,
    solvedIds,
    totalCount,
    solvedCount: solvedIds.size,
    allTags,
    isLoading,
    error,
    search,
    setSearch,
    activeTag,
    setActiveTag,
    refresh: load,
  };
}
