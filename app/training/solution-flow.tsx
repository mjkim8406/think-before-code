import { useCallback, useMemo, useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { StepShell } from '@/src/components/training/StepShell';
import { QuestionBlock } from '@/src/components/training/QuestionBlock';
import { OrderedStepsQuestion } from '@/src/components/training/OrderedStepsQuestion';
import { useTraining } from '@/src/stores/trainingStore';
import { useAutosave } from '@/src/hooks/useAutosave';
import { scoreStep } from '@/src/lib/scoring';
import type { StepItem } from '@/src/types';

// Fisher-Yates shuffle
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function SolutionFlowScreen() {
  const router = useRouter();
  const { state, dispatch } = useTraining();
  useAutosave();

  const step = state.problem?.training_flow?.solution_flow;
  const answers = state.stepAnswers.solution_flow ?? {};

  // 셔플된 카탈로그 (첫 렌더 시 한 번만)
  const [shuffledCatalog, setShuffledCatalog] = useState<StepItem[]>([]);
  useEffect(() => {
    if (step?.steps_catalog && shuffledCatalog.length === 0) {
      if (answers.order?.length) {
        setShuffledCatalog(step.steps_catalog);
      } else {
        setShuffledCatalog(shuffle(step.steps_catalog));
      }
    }
  }, [step]);

  const handleOrderChange = useCallback(
    (newOrder: string[]) => {
      dispatch({ type: 'SET_ANSWER', step: 'solution_flow', field: 'order', value: newOrder });
    },
    [dispatch],
  );

  const canProceed = useMemo(() => {
    if (!step) return false;
    return (answers.order?.length ?? 0) === step.steps_catalog.length;
  }, [step, answers]);

  const handleNext = useCallback(() => {
    if (!state.problem) return;
    const score = scoreStep('solution_flow', state.problem.training_flow, answers);
    dispatch({ type: 'COMPLETE_STEP', step: 'solution_flow', score });
    dispatch({ type: 'NEXT_STEP' });
    router.push('/training/edge-cases');
  }, [state.problem, answers, dispatch, router]);

  if (!step || shuffledCatalog.length === 0) return null;

  return (
    <StepShell
      stepNumber={4}
      stepLabel="풀이 흐름"
      onNext={handleNext}
      canProceed={canProceed}
      nextLabel="엣지 케이스 →"
    >
      <QuestionBlock index={0} question={step.question} hint="순서대로 탭하세요. 잘못 선택한 항목은 탭하여 제거할 수 있습니다.">
        <OrderedStepsQuestion
          catalog={shuffledCatalog}
          currentOrder={answers.order ?? []}
          onOrderChange={handleOrderChange}
        />
      </QuestionBlock>
    </StepShell>
  );
}
