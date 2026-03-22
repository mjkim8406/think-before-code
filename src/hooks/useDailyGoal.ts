/**
 * Daily Goal — AsyncStorage 기반 로컬 저장
 * Settings에서 설정, Home에서 읽기
 */

import { useState, useEffect, useCallback } from 'react';
import { getStorage } from '@/src/lib/storage';

const KEY = '@daily_goal';
const KEY_ENABLED = '@daily_goal_enabled';

export function useDailyGoal() {
  const [goal, setGoal] = useState(3);
  const [enabled, setEnabled] = useState(true);
  const [loaded, setLoaded] = useState(false);

  const reload = useCallback(async () => {
    try {
      const storage = getStorage();
      const [savedGoal, savedEnabled] = await Promise.all([
        storage.getItem(KEY),
        storage.getItem(KEY_ENABLED),
      ]);
      if (savedGoal !== null) setGoal(parseInt(savedGoal, 10));
      if (savedEnabled !== null) setEnabled(savedEnabled === 'true');
    } catch {} finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => { reload(); }, [reload]);

  const updateGoal = useCallback(async (newGoal: number) => {
    setGoal(newGoal);
    try { await getStorage().setItem(KEY, String(newGoal)); } catch {}
  }, []);

  const updateEnabled = useCallback(async (newEnabled: boolean) => {
    setEnabled(newEnabled);
    try { await getStorage().setItem(KEY_ENABLED, String(newEnabled)); } catch {}
  }, []);

  return { goal, enabled, loaded, reload, updateGoal, updateEnabled };
}
