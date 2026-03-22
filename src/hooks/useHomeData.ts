/**
 * Home screen data hook — fetches today's problem, streak, activity, solved count, learning path
 */

import { useState, useEffect, useCallback } from 'react';
import {
  fetchTodaysProblem,
  fetchUserStreak,
  fetchActivityGrid,
  fetchTotalSolvedCount,
  fetchLearningPath,
  type TodaysProblem,
  type StreakData,
  type ActivityDay,
  type LearningPathData,
} from '@/src/services/homeService';

interface HomeData {
  todaysProblem: TodaysProblem | null;
  streak: StreakData;
  activityGrid: ActivityDay[];
  totalSolved: number;
  learningPath: LearningPathData | null;
  isLoading: boolean;
  error: string | null;
  refresh: () => void;
}

export function useHomeData(): HomeData {
  const [todaysProblem, setTodaysProblem] = useState<TodaysProblem | null>(null);
  const [streak, setStreak] = useState<StreakData>({ currentStreak: 0, longestStreak: 0, lastTrainedDate: null });
  const [activityGrid, setActivityGrid] = useState<ActivityDay[]>([]);
  const [totalSolved, setTotalSolved] = useState(0);
  const [learningPath, setLearningPath] = useState<LearningPathData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const [problem, streakData, activity, solved, lp] = await Promise.all([
        fetchTodaysProblem(),
        fetchUserStreak(),
        fetchActivityGrid(),
        fetchTotalSolvedCount(),
        fetchLearningPath(),
      ]);

      setTodaysProblem(problem);
      setStreak(streakData);
      setActivityGrid(activity);
      setTotalSolved(solved);
      setLearningPath(lp);
    } catch (err: any) {
      setError(err.message ?? 'Failed to load home data');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  return { todaysProblem, streak, activityGrid, totalSolved, learningPath, isLoading, error, refresh: load };
}
