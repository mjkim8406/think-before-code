import { useCallback, useMemo } from 'react';
import { useRouter } from 'expo-router';
import { StepShell } from '@/src/components/training/StepShell';
import { QuestionBlock } from '@/src/components/training/QuestionBlock';
import { SingleSelectQuestion } from '@/src/components/training/SingleSelectQuestion';
import { MultiSelectQuestion } from '@/src/components/training/MultiSelectQuestion';
import { useTraining } from '@/src/stores/trainingStore';
import { useAutosave } from '@/src/hooks/useAutosave';
import { scoreStep } from '@/src/lib/scoring';

export default function StrategyDesignScreen() {
  const router = useRouter();
  const { state, dispatch } = useTraining();
  useAutosave();

  const step = state.problem?.training_flow?.strategy_design;
  const answers = state.stepAnswers.strategy_design ?? {};

  const toggleMulti = useCallback(
    (field: string, value: string) => {
      const current: string[] = (answers[field] as string[]) ?? [];
      const next = current.includes(value)
        ? current.filter((v: string) => v !== value)
        : [...current, value];
      dispatch({ type: 'SET_ANSWER', step: 'strategy_design', field, value: next });
    },
    [answers, dispatch],
  );

  // strategy_design의 질문 필드들을 동적으로 추출
  const questionFields = useMemo(() => {
    if (!step) return [];
    return Object.entries(step)
      .filter(([, q]) => typeof q === 'object' && q !== null && 'type' in q)
      .map(([field, q]) => ({ field, question: q as any }));
  }, [step]);

  const canProceed = useMemo(() => {
    if (!step) return false;
    // data_structures는 필수
    return !!((answers.data_structures as string[])?.length);
  }, [step, answers]);

  const handleNext = useCallback(() => {
    if (!state.problem) return;
    const score = scoreStep('strategy_design', state.problem.training_flow, answers);
    dispatch({ type: 'COMPLETE_STEP', step: 'strategy_design', score });
    dispatch({ type: 'NEXT_STEP' });
    router.push('/training/solution-flow');
  }, [state.problem, answers, dispatch, router]);

  if (!step) return null;

  return (
    <StepShell
      stepNumber={3}
      stepLabel="전략 설계"
      onNext={handleNext}
      canProceed={canProceed}
      nextLabel="풀이 흐름 →"
    >
      {questionFields.map(({ field, question }, idx) => (
        <QuestionBlock key={field} index={idx} question={question.question}>
          {question.type === 'single_select' ? (
            <SingleSelectQuestion
              options={question.options}
              selected={answers[field] as string | undefined}
              onSelect={(v) =>
                dispatch({ type: 'SET_ANSWER', step: 'strategy_design', field, value: v })
              }
            />
          ) : question.type === 'multi_select' ? (
            <MultiSelectQuestion
              options={question.options}
              selected={(answers[field] as string[]) ?? []}
              onToggle={(v) => toggleMulti(field, v)}
            />
          ) : null}
        </QuestionBlock>
      ))}
    </StepShell>
  );
}
