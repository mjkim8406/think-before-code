import { useCallback, useMemo } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, View, Text, StyleSheet, Pressable, Linking } from 'react-native';
import { StepShell } from '@/src/components/training/StepShell';
import { QuestionBlock } from '@/src/components/training/QuestionBlock';
import { SingleSelectQuestion } from '@/src/components/training/SingleSelectQuestion';
import { MultiSelectQuestion } from '@/src/components/training/MultiSelectQuestion';
import { TagSelectQuestion } from '@/src/components/training/TagSelectQuestion';
import { useTraining } from '@/src/stores/trainingStore';
import { useTrainingSession } from '@/src/hooks/useTrainingSession';
import { useAutosave } from '@/src/hooks/useAutosave';
import { scoreStep } from '@/src/lib/scoring';
import { COLORS, FONTS } from '@/src/lib/constants';
import { getConstraintLabel } from '@/src/lib/tagLabels';

export default function ReadingScreen() {
  const router = useRouter();
  const { problemId } = useLocalSearchParams<{ problemId: string }>();
  const { isLoading, error } = useTrainingSession(problemId);
  const { state, dispatch } = useTraining();
  useAutosave();

  const step = state.problem?.training_flow?.reading;
  const answers = state.stepAnswers.reading ?? {};

  const toggleMulti = useCallback(
    (field: string, value: string) => {
      const current: string[] = (answers as any)[field] ?? [];
      const next = current.includes(value)
        ? current.filter((v: string) => v !== value)
        : [...current, value];
      dispatch({ type: 'SET_ANSWER', step: 'reading', field, value: next });
    },
    [answers, dispatch],
  );

  const canProceed = useMemo(() => {
    if (!step) return false;
    return !!(
      answers.goal_type &&
      answers.input_summary?.length &&
      answers.one_line_summary?.length
    );
  }, [answers, step]);

  const handleNext = useCallback(() => {
    if (!state.problem) return;
    const score = scoreStep('reading', state.problem.training_flow, answers);
    dispatch({ type: 'COMPLETE_STEP', step: 'reading', score });
    dispatch({ type: 'NEXT_STEP' });
    router.push('/training/pattern-analysis');
  }, [state.problem, answers, dispatch, router]);

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.green800} />
      </View>
    );
  }

  if (error || (!isLoading && !step)) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error ?? '문제를 불러올 수 없습니다'}</Text>
        <Text style={[styles.error, { fontSize: 11, marginTop: 8 }]}>problemId: {problemId ?? 'undefined'}</Text>
      </View>
    );
  }

  if (!step) return null;

  return (
    <StepShell
      stepNumber={1}
      stepLabel="문제 읽기"
      onNext={handleNext}
      canProceed={canProceed}
      nextLabel="패턴 분석 →"
    >
      {/* Problem info */}
      <View style={styles.problemCard}>
        {/* Difficulty badge + title */}
        <View style={styles.problemHeader}>
          <View style={[
            styles.diffBadge,
            state.problem?.difficulty === 'easy' && styles.diffEasy,
            state.problem?.difficulty === 'medium' && styles.diffMedium,
            state.problem?.difficulty === 'hard' && styles.diffHard,
          ]}>
            <Text style={[
              styles.diffText,
              state.problem?.difficulty === 'easy' && styles.diffEasyText,
              state.problem?.difficulty === 'medium' && styles.diffMediumText,
              state.problem?.difficulty === 'hard' && styles.diffHardText,
            ]}>
              {state.problem?.difficulty?.toUpperCase()}
            </Text>
          </View>
          <View style={styles.tagRow}>
            {state.problem?.tags.slice(0, 3).map((tag) => (
              <Text key={tag} style={styles.tagChip}>{tag}</Text>
            ))}
          </View>
        </View>

        <Text style={styles.problemTitle}>{state.problem?.title}</Text>
        <Text style={styles.problemSummary}>{state.problem?.summary}</Text>

        {/* Constraints */}
        {state.problem?.constraints && (
          <View style={styles.constraintsBox}>
            <Text style={styles.constraintsLabel}>제약 조건</Text>
            {Object.entries(state.problem.constraints).map(([key, val]) => (
              <Text key={key} style={styles.constraintItem}>
                • {getConstraintLabel(key)}{typeof val === 'string' ? `: ${val}` : ''}
              </Text>
            ))}
          </View>
        )}

        {/* BOJ link */}
        {state.problem?.id.includes('boj') && (
          <Pressable
            onPress={() => {
              const bojNum = state.problem!.id.match(/b0*(\d+)/)?.[1];
              if (bojNum) Linking.openURL(`https://www.acmicpc.net/problem/${bojNum}`);
            }}
            style={styles.linkBtn}
          >
            <Text style={styles.linkText}>📎 BOJ에서 문제 보기</Text>
          </Pressable>
        )}
      </View>

      {/* Notice */}
      <View style={styles.notice}>
        <View style={styles.noticeIcon}>
          <Text style={styles.noticeIconText}>i</Text>
        </View>
        <Text style={styles.noticeText}>
          위 문제를 읽고 아래 질문에 답하세요
        </Text>
      </View>

      {/* Q1: 구해야 하는 것 */}
      <QuestionBlock index={0} question={step.goal_type.question}>
        <SingleSelectQuestion
          options={step.goal_type.options}
          selected={answers.goal_type}
          onSelect={(v) => dispatch({ type: 'SET_ANSWER', step: 'reading', field: 'goal_type', value: v })}
        />
      </QuestionBlock>

      {/* Q2: 입력 성격 */}
      <QuestionBlock index={1} question={step.input_summary.question}>
        <MultiSelectQuestion
          options={step.input_summary.options}
          selected={answers.input_summary ?? []}
          onToggle={(v) => toggleMulti('input_summary', v)}
        />
      </QuestionBlock>

      {/* Q3: 한 문장 요약 */}
      <QuestionBlock index={2} question={step.one_line_summary.question}>
        <TagSelectQuestion
          options={step.one_line_summary.accepted_answers}
          selected={answers.one_line_summary ?? []}
          onToggle={(v) => toggleMulti('one_line_summary', v)}
        />
      </QuestionBlock>
    </StepShell>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  error: {
    fontSize: 14,
    fontFamily: FONTS.medium,
    color: COLORS.error,
  },
  problemCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.03)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 2,
  },
  problemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  diffBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  diffEasy: { backgroundColor: COLORS.figmaEasyBg },
  diffMedium: { backgroundColor: COLORS.figmaMediumBg },
  diffHard: { backgroundColor: COLORS.figmaHardBg },
  diffText: {
    fontSize: 10,
    fontWeight: '700',
    fontFamily: FONTS.bold,
    letterSpacing: 0.5,
  },
  diffEasyText: { color: COLORS.figmaEasyText },
  diffMediumText: { color: COLORS.figmaMediumText },
  diffHardText: { color: COLORS.figmaHardText },
  tagRow: {
    flexDirection: 'row',
    gap: 6,
    flexWrap: 'wrap',
    flex: 1,
  },
  tagChip: {
    fontSize: 11,
    fontFamily: FONTS.medium,
    color: COLORS.textTertiary,
    backgroundColor: COLORS.sand100,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    overflow: 'hidden',
  },
  problemTitle: {
    fontSize: 22,
    fontWeight: '800',
    fontFamily: FONTS.extraBold,
    color: COLORS.text,
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  problemSummary: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
    lineHeight: 22,
  },
  constraintsBox: {
    backgroundColor: COLORS.sand100,
    borderRadius: 12,
    padding: 14,
    marginTop: 14,
    borderWidth: 1,
    borderColor: COLORS.sand200,
  },
  constraintsLabel: {
    fontSize: 11,
    fontWeight: '700',
    fontFamily: FONTS.bold,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    color: COLORS.textTertiary,
    marginBottom: 6,
  },
  constraintItem: {
    fontSize: 12,
    fontFamily: FONTS.mono,
    color: COLORS.textTertiary,
    lineHeight: 20,
  },
  linkBtn: {
    marginTop: 14,
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: COLORS.primaryDim,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  linkText: {
    fontSize: 13,
    fontFamily: FONTS.semiBold,
    fontWeight: '600',
    color: COLORS.green800,
  },
  notice: {
    backgroundColor: COLORS.green50,
    borderWidth: 1,
    borderColor: COLORS.green100,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 24,
  },
  noticeIcon: {
    width: 18,
    height: 18,
    backgroundColor: COLORS.green800,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noticeIconText: {
    fontSize: 10,
    color: COLORS.white,
    fontWeight: '700',
    fontFamily: FONTS.bold,
  },
  noticeText: {
    flex: 1,
    fontSize: 12,
    fontWeight: '600',
    fontFamily: FONTS.semiBold,
    color: COLORS.green800,
  },
});
