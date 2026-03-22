/**
 * Debounced autosave hook
 *
 * isDirty가 true가 되면 2초 후 saveProgress 호출
 * AppState가 background로 갈 때 즉시 flush
 */

import { useEffect, useRef, useCallback } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { useTraining } from '@/src/stores/trainingStore';
import { saveProgress } from '@/src/services/trainingService';

const DEBOUNCE_MS = 2000;

export function useAutosave() {
  const { state, dispatch } = useTraining();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const stateRef = useRef(state);
  stateRef.current = state;

  const flush = useCallback(async () => {
    const s = stateRef.current;
    if (!s.isDirty || !s.sessionId) return;

    try {
      await saveProgress(
        s.sessionId,
        s.stepAnswers,
        s.stepScores,
        s.currentStep,
      );
      dispatch({ type: 'MARK_SAVED', timestamp: new Date().toISOString() });
    } catch (err) {
      console.warn('[Autosave] failed:', err);
    }
  }, [dispatch]);

  // Debounced save on isDirty
  useEffect(() => {
    if (!state.isDirty) return;

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(flush, DEBOUNCE_MS);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [state.isDirty, state.stepAnswers, state.currentStep, flush]);

  // Immediate flush on app background
  useEffect(() => {
    const handleAppState = (next: AppStateStatus) => {
      if (next === 'background' || next === 'inactive') {
        flush();
      }
    };

    const sub = AppState.addEventListener('change', handleAppState);
    return () => sub.remove();
  }, [flush]);

  return { flush };
}
