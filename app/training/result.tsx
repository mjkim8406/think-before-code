/**
 * Result Screen — 세션 완료 후 결과 카드
 *
 * 각 단계별 점수 (색상 코딩) + 총점 + triggered mistakes
 */

import { View, StyleSheet, Text, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/src/components/ui/Button';
import { useTraining } from '@/src/stores/trainingStore';
import { useBookmarks } from '@/src/hooks/useBookmarks';
import { STEPS } from '@/src/lib/stepConfig';
import { getMistakeFeedbacks } from '@/src/lib/mistakes';
import { COLORS, FONTS, SPACING } from '@/src/lib/constants';

function ScoreBadge({ score }: { score: number }) {
  const color =
    score >= 1.0 ? COLORS.green800 :
    score >= 0.5 ? '#D97706' :
    COLORS.error;
  const bg =
    score >= 1.0 ? COLORS.green50 :
    score >= 0.5 ? COLORS.warningDim :
    COLORS.errorDim;
  const label =
    score >= 1.0 ? 'Perfect' :
    score >= 0.5 ? 'Partial' :
    'Miss';

  return (
    <View style={[styles.scoreBadge, { backgroundColor: bg }]}>
      <Text style={[styles.scoreBadgeText, { color }]}>{label}</Text>
    </View>
  );
}

export default function ResultScreen() {
  const router = useRouter();
  const { state, dispatch } = useTraining();
  const { isBookmarked, toggle: toggleBookmark } = useBookmarks();

  const problem = state.problem;
  const problemId = problem?.id;
  const totalScore = state.totalScore ?? 0;

  const mistakeFeedbacks = problem
    ? getMistakeFeedbacks(problem.common_mistakes, state.triggeredMistakes)
    : [];

  const scoreColor =
    totalScore >= 80 ? COLORS.green800 :
    totalScore >= 50 ? '#D97706' :
    COLORS.error;

  const handleGoHome = () => {
    dispatch({ type: 'RESET' });
    router.dismissAll();
  };

  const handleNextProblem = () => {
    dispatch({ type: 'RESET' });
    router.dismissAll();
    setTimeout(() => router.push('/(tabs)/library' as any), 100);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Text style={styles.title}>훈련 완료!</Text>
        <View style={styles.problemTitleRow}>
          <Text style={[styles.problemTitle, { marginBottom: 0, flex: 1 }]}>{problem?.title}</Text>
          {problemId && (
            <Pressable onPress={() => toggleBookmark(problemId)} hitSlop={8} style={styles.bookmarkBtn}>
              <Ionicons
                name={isBookmarked(problemId) ? 'bookmark' : 'bookmark-outline'}
                size={22}
                color={isBookmarked(problemId) ? COLORS.green800 : COLORS.sand300}
              />
            </Pressable>
          )}
        </View>

        {/* Total score circle */}
        <View style={styles.scoreCircle}>
          <Text style={[styles.scoreNumber, { color: scoreColor }]}>{totalScore}</Text>
          <Text style={styles.scoreLabel}>점</Text>
        </View>

        {/* Step breakdown */}
        <View style={styles.breakdownCard}>
          <Text style={styles.breakdownTitle}>단계별 결과</Text>
          {STEPS.filter((s) => s.hasQuestions).map((step) => {
            const score = state.stepScores[step.key] ?? 0;
            return (
              <View key={step.key} style={styles.breakdownRow}>
                <View style={styles.breakdownLeft}>
                  <Text style={styles.stepNum}>{step.number}</Text>
                  <Text style={styles.stepName}>{step.label}</Text>
                </View>
                <ScoreBadge score={score} />
              </View>
            );
          })}
        </View>

        {/* Triggered mistakes */}
        {mistakeFeedbacks.length > 0 && (
          <View style={styles.mistakesCard}>
            <Text style={styles.mistakesTitle}>💡 다음에는 이렇게</Text>
            {mistakeFeedbacks.map((m) => (
              <View key={m.tag} style={styles.mistakeItem}>
                <View style={styles.mistakeDot} />
                <Text style={styles.mistakeText}>{m.feedback}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Review notes */}
        {problem?.review_notes && (
          <View style={styles.reviewCard}>
            <Text style={styles.reviewTitle}>📌 기억하세요</Text>
            <Text style={styles.reviewText}>{problem.review_notes.core_takeaway}</Text>
          </View>
        )}
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <Button title="홈으로" onPress={handleGoHome} />
        <Button title="다른 문제 풀기" variant="secondary" onPress={handleNextProblem} style={styles.secondaryBtn} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: SPACING.xxl,
    paddingTop: 40,
    paddingBottom: 120,
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
    fontFamily: FONTS.bold,
    fontWeight: '700',
    color: COLORS.green800,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  problemTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 28,
    width: '100%',
  },
  problemTitle: {
    fontSize: 24,
    fontWeight: '800',
    fontFamily: FONTS.extraBold,
    color: COLORS.text,
    letterSpacing: -0.5,
    marginBottom: 28,
    textAlign: 'center',
  },
  bookmarkBtn: {
    padding: 4,
  },
  scoreCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.white,
    borderWidth: 4,
    borderColor: COLORS.sand200,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  scoreNumber: {
    fontSize: 40,
    fontWeight: '900',
    fontFamily: FONTS.black,
    letterSpacing: -2,
  },
  scoreLabel: {
    fontSize: 12,
    fontFamily: FONTS.medium,
    color: COLORS.textTertiary,
    marginTop: -4,
  },
  breakdownCard: {
    width: '100%',
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
  breakdownTitle: {
    fontSize: 13,
    fontWeight: '700',
    fontFamily: FONTS.bold,
    color: COLORS.text,
    marginBottom: 16,
  },
  breakdownRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.sand100,
  },
  breakdownLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  stepNum: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.sand100,
    textAlign: 'center',
    lineHeight: 24,
    fontSize: 12,
    fontWeight: '700',
    fontFamily: FONTS.bold,
    color: COLORS.textTertiary,
    overflow: 'hidden',
  },
  stepName: {
    fontSize: 14,
    fontFamily: FONTS.medium,
    color: COLORS.text,
  },
  scoreBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
  scoreBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    fontFamily: FONTS.bold,
    letterSpacing: 0.3,
  },
  mistakesCard: {
    width: '100%',
    backgroundColor: COLORS.warningDim,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.15)',
  },
  mistakesTitle: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: FONTS.bold,
    color: COLORS.text,
    marginBottom: 12,
  },
  mistakeItem: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  mistakeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#D97706',
    marginTop: 7,
  },
  mistakeText: {
    flex: 1,
    fontSize: 13,
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  reviewCard: {
    width: '100%',
    backgroundColor: COLORS.green50,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.green100,
  },
  reviewTitle: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: FONTS.bold,
    color: COLORS.green800,
    marginBottom: 8,
  },
  reviewText: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
    lineHeight: 22,
  },
  footer: {
    paddingVertical: 16,
    paddingHorizontal: SPACING.xxl,
    paddingBottom: 36,
    gap: 10,
  },
  secondaryBtn: {
    marginTop: 0,
  },
});
