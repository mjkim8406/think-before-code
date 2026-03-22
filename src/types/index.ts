// ── Re-export V2 types from data schema ──
export type {
  ProblemV2,
  TrainingFlow,
  ReadingStep,
  PatternAnalysisStep,
  StrategyDesignStep,
  ComplexityStep,
  EdgeCasesStep,
  OrderedSteps,
  SingleSelect,
  MultiSelect,
  TagSelect,
  PairMatch,
  StepItem,
  Condition,
  CommonMistake,
  AcceptedStrategy,
  ReviewNotes,
} from '../../scripts/data/types';

// ── Step config ──

export type StepName =
  | 'reading'
  | 'pattern_analysis'
  | 'strategy_design'
  | 'solution_flow'
  | 'edge_cases'
  | 'complexity'
  | 'comparison';

export type SessionStatus = 'in_progress' | 'completed' | 'abandoned';

export type Difficulty = 'easy' | 'medium' | 'hard';

// ── Legacy types (Home/Stats/Settings에서 사용 중, 추후 제거) ──

export interface Problem {
  id: string;
  title: string;
  description: string;
  constraints: string | null;
  difficulty: Difficulty;
  conceptTags: string[];
  secondaryConceptTags: string[] | null;
  intentDescription: string;
  keyObservation: string;
  wrongApproaches: string[];
  liveCodingFlow: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface UserWeakConcept {
  id: string;
  userId: string;
  conceptTag: string;
  missCount: number;
  lastMissedAt: string;
}

export interface UserStreak {
  userId: string;
  currentStreak: number;
  longestStreak: number;
  lastTrainedDate: string | null;
}

// ── Training session (mirrors DB row) ──

export interface TrainingSessionRow {
  id: string;
  user_id: string;
  problem_id: string;
  current_step: number;
  status: SessionStatus;
  step_answers: Record<string, Record<string, any>>;
  step_scores: Record<string, number>;
  triggered_mistakes: string[];
  total_score: number | null;
  started_at: string;
  completed_at: string | null;
  last_saved_at: string;
}

// ── Step answer shapes ──

export interface StepAnswers {
  reading?: { goal_type?: string; input_summary?: string[]; one_line_summary?: string[] };
  pattern_analysis?: { primary_pattern?: string; reason_tags?: string[]; secondary_patterns?: string[] };
  strategy_design?: Record<string, string | string[]>;
  solution_flow?: { order?: string[] };
  edge_cases?: { selected_options?: string[] };
  complexity?: { time?: string; space?: string; reason_tags?: string[] };
  comparison?: Record<string, never>;
}
