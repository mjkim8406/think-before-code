/**
 * Step 7: 비교 검토 — display-only
 *
 * review_notes 표시 + triggered common_mistakes 피드백
 * 점수 계산 → 세션 완료 → result 화면으로 이동
 */

import { useCallback, useMemo } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { StepShell } from '@/src/components/training/StepShell';
import { useTraining } from '@/src/stores/trainingStore';
import { useAutosave } from '@/src/hooks/useAutosave';
import { evaluateMistakes, getMistakeFeedbacks } from '@/src/lib/mistakes';
import { calcTotalScore } from '@/src/lib/scoring';
import { completeSession } from '@/src/services/trainingService';
import { COLORS, FONTS } from '@/src/lib/constants';

export default function ComparisonScreen() {
  const router = useRouter();
  const { state, dispatch } = useTraining();
  const { flush } = useAutosave();

  const problem = state.problem;
  const review = problem?.review_notes;

  // Common mistakes 평가
  const triggeredTags = useMemo(() => {
    if (!problem) return [];
    return evaluateMistakes(problem.common_mistakes, state.stepAnswers);
  }, [problem, state.stepAnswers]);

  const mistakeFeedbacks = useMemo(() => {
    if (!problem) return [];
    return getMistakeFeedbacks(problem.common_mistakes, triggeredTags);
  }, [problem, triggeredTags]);

  const handleFinish = useCallback(async () => {
    if (!state.sessionId || !problem) return;

    dispatch({ type: 'SET_TRIGGERED_MISTAKES', tags: triggeredTags });

    const totalScore = calcTotalScore(state.stepScores);
    dispatch({ type: 'COMPLETE_SESSION', totalScore });

    // DB에 세션 완료 저장
    try {
      await completeSession(
        state.sessionId,
        totalScore,
        state.stepScores,
        triggeredTags,
      );
    } catch (err) {
      console.warn('[Comparison] complete failed:', err);
    }

    router.push('/training/result');
  }, [state, problem, triggeredTags, dispatch, router]);

  if (!review) return null;

  return (
    <StepShell
      stepNumber={7}
      stepLabel="비교 검토"
      onNext={handleFinish}
      nextLabel="결과 보기 →"
    >
      {/* 핵심 요약 */}
      <View style={styles.card}>
        <Text style={styles.cardLabel}>핵심 요약</Text>
        <Text style={styles.cardText}>{review.core_takeaway}</Text>
      </View>

      {/* 패턴 트리거 */}
      <View style={styles.card}>
        <Text style={styles.cardLabel}>이런 조건이 보이면</Text>
        <Text style={styles.triggerText}>{review.pattern_trigger}</Text>
      </View>

      {/* 왜 이 접근이 최적인지 */}
      <View style={styles.card}>
        <Text style={styles.cardLabel}>왜 이 접근이 최적인가</Text>
        <Text style={styles.cardText}>{review.why_it_works}</Text>
      </View>

      {/* 멘토 힌트 */}
      <View style={styles.hintCard}>
        <Text style={styles.hintIcon}>💡</Text>
        <Text style={styles.hintText}>{review.mentor_hint}</Text>
      </View>

      {/* Triggered mistakes */}
      {mistakeFeedbacks.length > 0 && (
        <View style={styles.mistakesSection}>
          <Text style={styles.mistakesTitle}>⚠️ 주의할 점</Text>
          {mistakeFeedbacks.map((m) => (
            <View key={m.tag} style={styles.mistakeCard}>
              <Text style={styles.mistakeTag}>{m.tag}</Text>
              <Text style={styles.mistakeText}>{m.feedback}</Text>
            </View>
          ))}
        </View>
      )}
    </StepShell>
  );
}

const styles = StyleSheet.create({
  card: {
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
  cardLabel: {
    fontSize: 11,
    fontWeight: '700',
    fontFamily: FONTS.bold,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: COLORS.green800,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
    lineHeight: 22,
  },
  triggerText: {
    fontSize: 15,
    fontFamily: FONTS.semiBold,
    fontWeight: '600',
    color: COLORS.text,
    lineHeight: 24,
  },
  hintCard: {
    backgroundColor: COLORS.green50,
    borderWidth: 1,
    borderColor: COLORS.green100,
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    gap: 10,
    marginBottom: 24,
  },
  hintIcon: {
    fontSize: 18,
    marginTop: -1,
  },
  hintText: {
    flex: 1,
    fontSize: 13,
    fontFamily: FONTS.medium,
    color: COLORS.green800,
    lineHeight: 20,
  },
  mistakesSection: {
    marginBottom: 16,
  },
  mistakesTitle: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: FONTS.bold,
    color: COLORS.text,
    marginBottom: 12,
  },
  mistakeCard: {
    backgroundColor: COLORS.errorDim,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.15)',
    borderRadius: 14,
    padding: 16,
    marginBottom: 10,
  },
  mistakeTag: {
    fontSize: 11,
    fontWeight: '700',
    fontFamily: FONTS.bold,
    color: COLORS.error,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  mistakeText: {
    fontSize: 13,
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
});
