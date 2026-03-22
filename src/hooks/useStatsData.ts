/**
 * Stats/Performance screen data hook
 */

import { useState, useEffect, useCallback } from 'react';
import {
  fetchStatsSummary,
  fetchCategoryMastery,
  fetchConceptMastery,
  fetchMonthlyActivity,
  fetchWeeklyDailyActivity,
  fetchDifficultyDistribution,
  fetchStepAccuracy,
  fetchSolvedProblems,
  type StatsSummary,
  type CategoryMasteryItem,
  type ConceptMasteryItem,
  type WeeklyActivity,
  type DailyActivity,
  type DifficultyCount,
  type StepAccuracy,
  type SolvedProblemItem,
} from '@/src/services/statsService';

interface StatsData {
  summary: StatsSummary;
  categoryMastery: CategoryMasteryItem[];
  conceptMastery: ConceptMasteryItem[];
  monthlyActivity: WeeklyActivity[];
  weeklyDaily: DailyActivity[];
  difficultyDist: DifficultyCount;
  stepAccuracy: StepAccuracy[];
  solvedProblems: SolvedProblemItem[];
  isLoading: boolean;
  error: string | null;
  refresh: () => void;
}

const EMPTY_SUMMARY: StatsSummary = {
  totalSolved: 0,
  accuracyRate: 0,
  totalStudyDays: 0,
  currentStreak: 0,
};

export function useStatsData(): StatsData {
  const [summary, setSummary] = useState<StatsSummary>(EMPTY_SUMMARY);
  const [categoryMastery, setCategoryMastery] = useState<CategoryMasteryItem[]>([]);
  const [conceptMastery, setConceptMastery] = useState<ConceptMasteryItem[]>([]);
  const [monthlyActivity, setMonthlyActivity] = useState<WeeklyActivity[]>([]);
  const [weeklyDaily, setWeeklyDaily] = useState<DailyActivity[]>([]);
  const [difficultyDist, setDifficultyDist] = useState<DifficultyCount>({ easy: 0, medium: 0, hard: 0 });
  const [stepAccuracy, setStepAccuracy] = useState<StepAccuracy[]>([]);
  const [solvedProblems, setSolvedProblems] = useState<SolvedProblemItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const [sum, catMastery, mastery, activity, weekly, dist, steps, solved] = await Promise.all([
        fetchStatsSummary(),
        fetchCategoryMastery(),
        fetchConceptMastery(),
        fetchMonthlyActivity(),
        fetchWeeklyDailyActivity(),
        fetchDifficultyDistribution(),
        fetchStepAccuracy(),
        fetchSolvedProblems(),
      ]);

      setSummary(sum);
      setCategoryMastery(catMastery);
      setConceptMastery(mastery);
      setMonthlyActivity(activity);
      setWeeklyDaily(weekly);
      setDifficultyDist(dist);
      setStepAccuracy(steps);
      setSolvedProblems(solved);
    } catch (err: any) {
      setError(err.message ?? 'Failed to load stats');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  return {
    summary, categoryMastery, conceptMastery, monthlyActivity, weeklyDaily,
    difficultyDist, stepAccuracy, solvedProblems,
    isLoading, error, refresh: load,
  };
}
