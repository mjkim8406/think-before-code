/**
 * Think Before Code — 7단계 Training Flow 문제 스키마 v2
 *
 * 모든 정답 필드는 accepted_answers (배열)로 통일
 * UI 컴포넌트는 question의 `type` 필드로 자동 매핑
 */

// ─── Question Types ────────────────────────────────────────────────────────

export interface SingleSelect {
  type: 'single_select';
  question: string;
  options: string[];
  accepted_answers: string[];   // 단일 정답이어도 배열
}

export interface MultiSelect {
  type: 'multi_select';
  question: string;
  options: string[];
  accepted_answers: string[];
}

export interface TagSelect {
  type: 'tag_select';
  question: string;
  accepted_answers: string[];
}

export interface PairMatch {
  type: 'pair_match';
  question: string;
  accepted_answers: Record<string, string>;
}

export interface StepItem {
  id: string;
  label: string;              // 유저에게 보여줄 한글 설명
}

export interface OrderedSteps {
  type: 'ordered_steps';
  question: string;
  steps_catalog: StepItem[];  // 셔플해서 보여줄 전체 스텝 (id + label)
  correct_order: string[];    // 정답 순서 (id 배열)
}

// ─── Edge Cases (3단계 레벨) ───────────────────────────────────────────────

export interface EdgeCasesStep {
  type: 'multi_select';
  question: string;
  options: string[];
  required_answers: string[];      // 필수 — 누락 시 🔴
  recommended_answers: string[];   // 권장 — 누락 시 🟡
  optional_answers: string[];      // 추가 고려 — 선택 시 보너스
  trap_answers?: string[];         // 함정 — 선택 시 감점
}

// ─── Training Flow Steps ───────────────────────────────────────────────────

export interface ReadingStep {
  goal_type: SingleSelect;
  input_summary: MultiSelect;
  one_line_summary: TagSelect;
}

export interface PatternAnalysisStep {
  primary_pattern: SingleSelect;
  reason_tags: MultiSelect;
  secondary_patterns: MultiSelect;
}

export interface StrategyDesignStep {
  data_structures: MultiSelect;
  [key: string]: SingleSelect | MultiSelect | PairMatch;  // sorting_rule, map_key_value 등 문제별 추가 질문
}

export interface ComplexityStep {
  time: SingleSelect;
  space: SingleSelect;
  reason_tags: MultiSelect;
}

export interface TrainingFlow {
  reading: ReadingStep;
  pattern_analysis: PatternAnalysisStep;
  strategy_design: StrategyDesignStep;
  solution_flow: OrderedSteps;
  edge_cases: EdgeCasesStep;
  complexity: ComplexityStep;
}

// ─── Conditions (common_mistakes용) ────────────────────────────────────────

export interface Condition {
  step: string;                    // "strategy_design", "pattern_analysis", "complexity", "edge_cases"
  field: string;                   // "approach_tags", "primary_pattern", "time", "selected_options"
  operator: 'equals' | 'not_equals' | 'includes' | 'not_includes';
  value: string;
}

// ─── Feedback & Meta ───────────────────────────────────────────────────────

export interface CommonMistake {
  tag: string;
  conditions: Condition[];         // 복수 조건 AND
  feedback: string;
}

export interface AcceptedStrategy {
  strategy_id: string;
  label: string;
  pattern_analysis_answer: string;
  required_strategy_tags: string[];  // strategy_design에서 필수 선택
}

export interface ReviewNotes {
  core_takeaway: string;           // 핵심 요약
  mentor_hint: string;             // 실전 팁
  pattern_trigger: string;         // "이런 조건이 보이면 이 패턴을 떠올려라"
  why_it_works: string;            // 왜 이 접근이 최적인지
}

// ─── Problem V2 ────────────────────────────────────────────────────────────

export interface ProblemV2 {
  id: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  domain: string;
  summary: string;
  tags: string[];
  input_type: string;
  output_type: string;
  constraints: Record<string, boolean | string>;

  training_flow: TrainingFlow;

  accepted_strategies: AcceptedStrategy[];
  common_mistakes: CommonMistake[];
  review_notes: ReviewNotes;

  // 기존 ProblemSeed 호환 (migration용)
  legacy?: {
    description: string;
    constraints_text: string | null;
    concept_tags: string[];
    secondary_concept_tags: string[];
    intent_description: string;
    key_observation: string;
    wrong_approaches: string[];
    live_coding_flow: Record<string, any>;
    source?: { platform: string; id: string | number };
  };
}
