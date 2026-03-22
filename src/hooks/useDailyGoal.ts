/**
 * Daily Goal — AsyncStorage 기반 로컬 저장
 * Settings에서 설정, Home에서 읽기
 */

import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = '@daily_goal';
const KEY_ENABLED = '@daily_goal_enabled';

export function useDailyGoal() {
  const [goal, setGoal] = useState(3);
  const [enabled, setEnabled] = useState(true);
  const [loaded, setLoaded] = useState(false);

  const reload = useCallback(async () => {
    try {
      const [savedGoal, savedEnabled] = await Promise.all([
        AsyncStorage.getItem(KEY),
        AsyncStorage.getItem(KEY_ENABLED),
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
    try { await AsyncStorage.setItem(KEY, String(newGoal)); } catch {}
  }, []);

  const updateEnabled = useCallback(async (newEnabled: boolean) => {
    setEnabled(newEnabled);
    try { await AsyncStorage.setItem(KEY_ENABLED, String(newEnabled)); } catch {}
  }, []);

  return { goal, enabled, loaded, reload, updateGoal, updateEnabled };
}
