/**
 * Library screen data hook
 * - 서버에서 전체 문제 1회 로드
 * - 카테고리/난이도/검색은 클라이언트 필터링
 * - 검색은 submitSearch() 호출 시에만 반영
 */

import { useState, useCallback, useMemo, useEffect } from 'react';
import {
  fetchAllProblems,
  fetchSolvedProblemIds,
  filterProblems,
  extractCategories,
  type LibraryProblemRow,
} from '@/src/services/libraryService';

interface LibraryData {
  problems: LibraryProblemRow[];
  solvedIds: Set<string>;
  totalCount: number;
  solvedCount: number;
  categories: { key: string; count: number }[];
  isLoading: boolean;
  error: string | null;
  search: string;
  setSearch: (s: string) => void;
  submitSearch: () => void;
  activeCategory: string | null;
  setActiveCategory: (c: string | null) => void;
  activeCourseLevel: string | null;
  setActiveCourseLevel: (d: string | null) => void;
  refresh: () => void;
}

export function useLibraryData(): LibraryData {
  const [allProblems, setAllProblems] = useState<LibraryProblemRow[]>([]);
  const [solvedIds, setSolvedIds] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 필터 상태
  const [search, setSearch] = useState('');
  const [committedSearch, setCommittedSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeCourseLevel, setActiveCourseLevel] = useState<string | null>(null);

  // 검색 실행 (enter/버튼 누를 때만)
  const submitSearch = useCallback(() => {
    setCommittedSearch(search.trim());
  }, [search]);

  // search가 비워지면 committedSearch도 리셋 (X 버튼)
  useEffect(() => {
    if (search === '') setCommittedSearch('');
  }, [search]);

  // 서버 데이터 로드 (1회)
  const load = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const [probs, solved] = await Promise.all([
        fetchAllProblems(),
        fetchSolvedProblemIds(),
      ]);

      setAllProblems(probs);
      setSolvedIds(solved);
    } catch (err: any) {
      setError(err.message ?? 'Failed to load library data');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 클라이언트 필터링
  const problems = useMemo(
    () =>
      filterProblems(allProblems, {
        search: committedSearch || undefined,
        category: activeCategory ?? undefined,
        courseLevel: activeCourseLevel ?? undefined,
      }),
    [allProblems, committedSearch, activeCategory, activeCourseLevel],
  );

  const categories = useMemo(() => extractCategories(allProblems), [allProblems]);

  return {
    problems,
    solvedIds,
    totalCount: allProblems.length,
    solvedCount: solvedIds.size,
    categories,
    isLoading,
    error,
    search,
    setSearch,
    submitSearch,
    activeCategory,
    setActiveCategory,
    activeCourseLevel,
    setActiveCourseLevel,
    refresh: load,
  };
}
