/**
 * Stats/Performance screen data hook
 */

import { useState, useEffect, useCallback } from 'react';
import {
  fetchStatsSummary,
  fetchConceptMastery,
  fetchMonthlyActivity,
  fetchDifficultyDistribution,
  type StatsSummary,
  type ConceptMasteryItem,
  type WeeklyActivity,
  type DifficultyCount,
} from '@/src/services/statsService';

interface StatsData {
  summary: StatsSummary;
  conceptMastery: ConceptMasteryItem[];
  monthlyActivity: WeeklyActivity[];
  difficultyDist: DifficultyCount;
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
  const [conceptMastery, setConceptMastery] = useState<ConceptMasteryItem[]>([]);
  const [monthlyActivity, setMonthlyActivity] = useState<WeeklyActivity[]>([]);
  const [difficultyDist, setDifficultyDist] = useState<DifficultyCount>({ easy: 0, medium: 0, hard: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const [sum, mastery, activity, dist] = await Promise.all([
        fetchStatsSummary(),
        fetchConceptMastery(),
        fetchMonthlyActivity(),
        fetchDifficultyDistribution(),
      ]);

      setSummary(sum);
      setConceptMastery(mastery);
      setMonthlyActivity(activity);
      setDifficultyDist(dist);
    } catch (err: any) {
      setError(err.message ?? 'Failed to load stats');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  return { summary, conceptMastery, monthlyActivity, difficultyDist, isLoading, error, refresh: load };
}
