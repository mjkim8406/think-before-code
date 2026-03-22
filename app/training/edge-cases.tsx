import { useCallback, useMemo } from 'react';
import { useRouter } from 'expo-router';
import { StepShell } from '@/src/components/training/StepShell';
import { QuestionBlock } from '@/src/components/training/QuestionBlock';
import { TieredMultiSelectQuestion } from '@/src/components/training/TieredMultiSelectQuestion';
import { useTraining } from '@/src/stores/trainingStore';
import { useAutosave } from '@/src/hooks/useAutosave';
import { scoreStep } from '@/src/lib/scoring';

export default function EdgeCasesScreen() {
  const router = useRouter();
  const { state, dispatch } = useTraining();
  useAutosave();

  const step = state.problem?.training_flow?.edge_cases;
  const answers = state.stepAnswers.edge_cases ?? {};

  const handleToggle = useCallback(
    (value: string) => {
      const current: string[] = answers.selected_options ?? [];
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      dispatch({ type: 'SET_ANSWER', step: 'edge_cases', field: 'selected_options', value: next });
    },
    [answers, dispatch],
  );

  const canProceed = useMemo(() => {
    return (answers.selected_options?.length ?? 0) > 0;
  }, [answers]);

  const handleNext = useCallback(() => {
    if (!state.problem) return;
    const score = scoreStep('edge_cases', state.problem.training_flow, answers);
    dispatch({ type: 'COMPLETE_STEP', step: 'edge_cases', score });
    dispatch({ type: 'NEXT_STEP' });
    router.push('/training/complexity');
  }, [state.problem, answers, dispatch, router]);

  if (!step) return null;

  return (
    <StepShell
      stepNumber={5}
      stepLabel="엣지 케이스"
      onNext={handleNext}
      canProceed={canProceed}
      nextLabel="복잡도 →"
    >
      <QuestionBlock index={0} question={step.question}>
        <TieredMultiSelectQuestion
          options={step.options}
          selected={answers.selected_options ?? []}
          onToggle={handleToggle}
        />
      </QuestionBlock>
    </StepShell>
  );
}
