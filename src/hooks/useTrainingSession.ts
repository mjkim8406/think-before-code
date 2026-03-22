/**
 * Orchestrates: load problem → create/resume session → init store
 *
 * Usage in training entry point:
 *   const { isLoading, error } = useTrainingSession(problemId);
 */

import { useEffect, useState, useRef } from 'react';
import { useTraining } from '@/src/stores/trainingStore';
import {
  getCurrentUserId,
  fetchProblem,
  getInProgressSession,
  createSession,
} from '@/src/services/trainingService';

export function useTrainingSession(problemId: string | undefined) {
  const { state, dispatch } = useTraining();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const initRef = useRef(false);

  useEffect(() => {
    if (!problemId || initRef.current) return;
    initRef.current = true;

    (async () => {
      try {
        setIsLoading(true);

        // 1) Auth
        const userId = await getCurrentUserId();

        // 2) Fetch problem
        const problem = await fetchProblem(problemId);

        // 3) Check for existing in-progress session
        const existing = await getInProgressSession(userId, problemId);

        let sessionId: string;
        let resumeData: any = undefined;

        if (existing) {
          // Resume
          sessionId = existing.id;
          resumeData = {
            currentStep: existing.current_step,
            stepAnswers: existing.step_answers ?? {},
            stepScores: existing.step_scores ?? {},
            triggeredMistakes: existing.triggered_mistakes ?? [],
          };
        } else {
          // New session
          sessionId = await createSession(userId, problemId);
        }

        // 4) Init store
        dispatch({
          type: 'INIT_SESSION',
          sessionId,
          problemId,
          problem,
          resumeData,
        });
      } catch (err: any) {
        console.error('[useTrainingSession]', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [problemId, dispatch]);

  return { isLoading, error, state };
}
