import { useCallback, useMemo } from 'react';
import { useRouter } from 'expo-router';
import { StepShell } from '@/src/components/training/StepShell';
import { QuestionBlock } from '@/src/components/training/QuestionBlock';
import { SingleSelectQuestion } from '@/src/components/training/SingleSelectQuestion';
import { MultiSelectQuestion } from '@/src/components/training/MultiSelectQuestion';
import { useTraining } from '@/src/stores/trainingStore';
import { useAutosave } from '@/src/hooks/useAutosave';
import { scoreStep } from '@/src/lib/scoring';

export default function ComplexityScreen() {
  const router = useRouter();
  const { state, dispatch } = useTraining();
  useAutosave();

  const step = state.problem?.training_flow?.complexity;
  const answers = state.stepAnswers.complexity ?? {};

  const toggleMulti = useCallback(
    (field: string, value: string) => {
      const current: string[] = (answers as any)[field] ?? [];
      const next = current.includes(value)
        ? current.filter((v: string) => v !== value)
        : [...current, value];
      dispatch({ type: 'SET_ANSWER', step: 'complexity', field, value: next });
    },
    [answers, dispatch],
  );

  const canProceed = useMemo(() => {
    return !!(answers.time && answers.space);
  }, [answers]);

  const handleNext = useCallback(() => {
    if (!state.problem) return;
    const score = scoreStep('complexity', state.problem.training_flow, answers);
    dispatch({ type: 'COMPLETE_STEP', step: 'complexity', score });
    dispatch({ type: 'NEXT_STEP' });
    router.push('/training/comparison');
  }, [state.problem, answers, dispatch, router]);

  if (!step) return null;

  return (
    <StepShell
      stepNumber={6}
      stepLabel="복잡도"
      onNext={handleNext}
      canProceed={canProceed}
      nextLabel="비교 검토 →"
    >
      <QuestionBlock index={0} question={step.time.question}>
        <SingleSelectQuestion
          options={step.time.options}
          selected={answers.time}
          onSelect={(v) =>
            dispatch({ type: 'SET_ANSWER', step: 'complexity', field: 'time', value: v })
          }
        />
      </QuestionBlock>

      <QuestionBlock index={1} question={step.space.question}>
        <SingleSelectQuestion
          options={step.space.options}
          selected={answers.space}
          onSelect={(v) =>
            dispatch({ type: 'SET_ANSWER', step: 'complexity', field: 'space', value: v })
          }
        />
      </QuestionBlock>

      <QuestionBlock index={2} question={step.reason_tags.question}>
        <MultiSelectQuestion
          options={step.reason_tags.options}
          selected={answers.reason_tags ?? []}
          onToggle={(v) => toggleMulti('reason_tags', v)}
        />
      </QuestionBlock>
    </StepShell>
  );
}
