import type { StepName } from '@/src/types';

export interface StepConfig {
  key: StepName;
  number: number;         // 1-7
  label: string;          // 한글 이름
  route: string;          // expo-router 경로
  hasQuestions: boolean;   // comparison은 display-only
}

export const STEPS: StepConfig[] = [
  { key: 'reading',          number: 1, label: '문제 읽기',   route: '/training/reading',          hasQuestions: true },
  { key: 'pattern_analysis', number: 2, label: '패턴 분석',   route: '/training/pattern-analysis',  hasQuestions: true },
  { key: 'strategy_design',  number: 3, label: '전략 설계',   route: '/training/strategy-design',   hasQuestions: true },
  { key: 'solution_flow',    number: 4, label: '풀이 흐름',   route: '/training/solution-flow',     hasQuestions: true },
  { key: 'edge_cases',       number: 5, label: '엣지 케이스', route: '/training/edge-cases',        hasQuestions: true },
  { key: 'complexity',       number: 6, label: '복잡도',      route: '/training/complexity',        hasQuestions: true },
  { key: 'comparison',       number: 7, label: '비교 검토',   route: '/training/comparison',        hasQuestions: false },
];

export const TOTAL_STEPS = STEPS.length;

export function getStepConfig(key: StepName): StepConfig {
  return STEPS.find((s) => s.key === key)!;
}

export function getNextStep(key: StepName): StepConfig | null {
  const idx = STEPS.findIndex((s) => s.key === key);
  return idx < STEPS.length - 1 ? STEPS[idx + 1] : null;
}

export function getPrevStep(key: StepName): StepConfig | null {
  const idx = STEPS.findIndex((s) => s.key === key);
  return idx > 0 ? STEPS[idx - 1] : null;
}
