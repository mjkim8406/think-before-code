import { useCallback, useMemo } from 'react';
import { useRouter } from 'expo-router';
import { StepShell } from '@/src/components/training/StepShell';
import { QuestionBlock } from '@/src/components/training/QuestionBlock';
import { SingleSelectQuestion } from '@/src/components/training/SingleSelectQuestion';
import { MultiSelectQuestion } from '@/src/components/training/MultiSelectQuestion';
import { useTraining } from '@/src/stores/trainingStore';
import { useAutosave } from '@/src/hooks/useAutosave';
import { scoreStep } from '@/src/lib/scoring';

export default function PatternAnalysisScreen() {
  const router = useRouter();
  const { state, dispatch } = useTraining();
  useAutosave();

  const step = state.problem?.training_flow?.pattern_analysis;
  const answers = state.stepAnswers.pattern_analysis ?? {};

  const toggleMulti = useCallback(
    (field: string, value: string) => {
      const current: string[] = (answers as any)[field] ?? [];
      const next = current.includes(value)
        ? current.filter((v: string) => v !== value)
        : [...current, value];
      dispatch({ type: 'SET_ANSWER', step: 'pattern_analysis', field, value: next });
    },
    [answers, dispatch],
  );

  const canProceed = useMemo(() => {
    return !!(
      answers.primary_pattern &&
      answers.reason_tags?.length
    );
  }, [answers]);

  const handleNext = useCallback(() => {
    if (!state.problem) return;
    const score = scoreStep('pattern_analysis', state.problem.training_flow, answers);
    dispatch({ type: 'COMPLETE_STEP', step: 'pattern_analysis', score });
    dispatch({ type: 'NEXT_STEP' });
    router.push('/training/strategy-design');
  }, [state.problem, answers, dispatch, router]);

  if (!step) return null;

  return (
    <StepShell
      stepNumber={2}
      stepLabel="패턴 분석"
      onNext={handleNext}
      canProceed={canProceed}
      nextLabel="전략 설계 →"
    >
      <QuestionBlock index={0} question={step.primary_pattern.question}>
        <SingleSelectQuestion
          options={step.primary_pattern.options}
          selected={answers.primary_pattern}
          onSelect={(v) =>
            dispatch({ type: 'SET_ANSWER', step: 'pattern_analysis', field: 'primary_pattern', value: v })
          }
        />
      </QuestionBlock>

      <QuestionBlock index={1} question={step.reason_tags.question}>
        <MultiSelectQuestion
          options={step.reason_tags.options}
          selected={answers.reason_tags ?? []}
          onToggle={(v) => toggleMulti('reason_tags', v)}
        />
      </QuestionBlock>

      <QuestionBlock index={2} question={step.secondary_patterns.question}>
        <MultiSelectQuestion
          options={step.secondary_patterns.options}
          selected={answers.secondary_patterns ?? []}
          onToggle={(v) => toggleMulti('secondary_patterns', v)}
        />
      </QuestionBlock>
    </StepShell>
  );
}
