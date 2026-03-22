import { createContext, useContext, useReducer, ReactNode } from 'react';
import type { ProblemV2, StepName, StepAnswers } from '@/src/types';

// ── State ──

export interface TrainingFlowState {
  sessionId: string | null;
  problemId: string;
  problem: ProblemV2 | null;
  currentStep: number;       // 1-7
  status: 'idle' | 'in_progress' | 'completed';
  stepAnswers: StepAnswers;
  stepScores: Record<string, number>;
  triggeredMistakes: string[];
  totalScore: number | null;
  isDirty: boolean;
  lastSavedAt: string | null;
}

const INITIAL_STATE: TrainingFlowState = {
  sessionId: null,
  problemId: '',
  problem: null,
  currentStep: 1,
  status: 'idle',
  stepAnswers: {},
  stepScores: {},
  triggeredMistakes: [],
  totalScore: null,
  isDirty: false,
  lastSavedAt: null,
};

// ── Actions ──

type Action =
  | {
      type: 'INIT_SESSION';
      sessionId: string;
      problemId: string;
      problem: ProblemV2;
      resumeData?: {
        currentStep?: number;
        stepAnswers?: StepAnswers;
        stepScores?: Record<string, number>;
        triggeredMistakes?: string[];
      };
    }
  | { type: 'SET_ANSWER'; step: StepName; field: string; value: any }
  | { type: 'COMPLETE_STEP'; step: StepName; score: number }
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'SET_TRIGGERED_MISTAKES'; tags: string[] }
  | { type: 'MARK_SAVED'; timestamp: string }
  | { type: 'COMPLETE_SESSION'; totalScore: number }
  | { type: 'RESET' };

// ── Reducer ──

function reducer(state: TrainingFlowState, action: Action): TrainingFlowState {
  switch (action.type) {
    case 'INIT_SESSION':
      return {
        ...INITIAL_STATE,
        sessionId: action.sessionId,
        problemId: action.problemId,
        problem: action.problem,
        status: 'in_progress',
        currentStep: action.resumeData?.currentStep ?? 1,
        stepAnswers: action.resumeData?.stepAnswers ?? {},
        stepScores: action.resumeData?.stepScores ?? {},
        triggeredMistakes: action.resumeData?.triggeredMistakes ?? [],
      };

    case 'SET_ANSWER': {
      const prev = (state.stepAnswers as Record<string, any>)[action.step] ?? {};
      return {
        ...state,
        stepAnswers: {
          ...state.stepAnswers,
          [action.step]: { ...prev, [action.field]: action.value },
        },
        isDirty: true,
      };
    }

    case 'COMPLETE_STEP':
      return {
        ...state,
        stepScores: { ...state.stepScores, [action.step]: action.score },
        isDirty: true,
      };

    case 'NEXT_STEP':
      return {
        ...state,
        currentStep: Math.min(state.currentStep + 1, 7),
        isDirty: true,
      };

    case 'PREV_STEP':
      return {
        ...state,
        currentStep: Math.max(state.currentStep - 1, 1),
      };

    case 'SET_TRIGGERED_MISTAKES':
      return {
        ...state,
        triggeredMistakes: action.tags,
      };

    case 'MARK_SAVED':
      return {
        ...state,
        isDirty: false,
        lastSavedAt: action.timestamp,
      };

    case 'COMPLETE_SESSION':
      return {
        ...state,
        status: 'completed',
        totalScore: action.totalScore,
      };

    case 'RESET':
      return INITIAL_STATE;

    default:
      return state;
  }
}

// ── Context ──

const TrainingContext = createContext<{
  state: TrainingFlowState;
  dispatch: React.Dispatch<Action>;
} | null>(null);

export function TrainingProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  return (
    <TrainingContext.Provider value={{ state, dispatch }}>
      {children}
    </TrainingContext.Provider>
  );
}

export function useTraining() {
  const context = useContext(TrainingContext);
  if (!context) {
    throw new Error('useTraining must be used within TrainingProvider');
  }
  return context;
}
