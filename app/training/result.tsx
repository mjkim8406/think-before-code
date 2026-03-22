/**
 * Result Screen — 세션 완료 후 결과 카드
 *
 * 각 단계별 점수 (색상 코딩) + 총점 + triggered mistakes
 */

import { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Button } from '@/src/components/ui/Button';
import { useTraining } from '@/src/stores/trainingStore';
import { useBookmarks } from '@/src/hooks/useBookmarks';
import { STEPS } from '@/src/lib/stepConfig';
import { getMistakeFeedbacks } from '@/src/lib/mistakes';
import { COLORS, FONTS, SPACING } from '@/src/lib/constants';
import { COURSE_LEVEL_LABELS } from '@/src/data/coursePaths';
import { fetchRecommendation } from '@/src/services/recommendationService';
import type { RecommendationResult } from '@/src/lib/recommendation';
import type { StepName, TrainingFlow, StepAnswers } from '@/src/types';

// ─── Review Item Types ───────────────────────────────────────────────────────

interface ReviewOption {
  label: string;
  status: 'correct' | 'wrong' | 'missed' | 'neutral';
}

interface ReviewQuestion {
  question: string;
  type: 'options' | 'order';
  options?: ReviewOption[];
  userOrder?: string[];
  correctOrder?: string[];
}

/** 스텝별 내 답 vs 정답 리뷰 데이터 생성 */
function buildStepReview(
  stepName: StepName,
  flow: TrainingFlow,
  answers: StepAnswers,
): ReviewQuestion[] {
  const items: ReviewQuestion[] = [];
  const stepAnswer = (answers as any)[stepName] ?? {};

  if (stepName === 'reading') {
    const step = flow.reading;
    // goal_type (single_select)
    items.push(buildSingleReview(step.goal_type.question, step.goal_type.options, step.goal_type.accepted_answers, stepAnswer.goal_type));
    // input_summary (multi_select)
    items.push(buildMultiReview(step.input_summary.question, step.input_summary.options, step.input_summary.accepted_answers, stepAnswer.input_summary));
    // one_line_summary (tag_select — 자유입력이므로 정답 표시만)
    items.push({
      question: step.one_line_summary.question,
      type: 'options',
      options: [
        ...(stepAnswer.one_line_summary ?? []).map((a: string) => ({
          label: a,
          status: step.one_line_summary.accepted_answers.includes(a) ? 'correct' as const : 'wrong' as const,
        })),
        ...step.one_line_summary.accepted_answers
          .filter((a: string) => !(stepAnswer.one_line_summary ?? []).includes(a))
          .map((a: string) => ({ label: a, status: 'missed' as const })),
      ],
    });
  }

  if (stepName === 'pattern_analysis') {
    const step = flow.pattern_analysis;
    items.push(buildSingleReview(step.primary_pattern.question, step.primary_pattern.options, step.primary_pattern.accepted_answers, stepAnswer.primary_pattern));
    items.push(buildMultiReview(step.reason_tags.question, step.reason_tags.options, step.reason_tags.accepted_answers, stepAnswer.reason_tags));
    items.push(buildMultiReview(step.secondary_patterns.question, step.secondary_patterns.options, step.secondary_patterns.accepted_answers, stepAnswer.secondary_patterns));
  }

  if (stepName === 'strategy_design') {
    const step = flow.strategy_design;
    items.push(buildMultiReview(step.data_structures.question, step.data_structures.options, step.data_structures.accepted_answers, stepAnswer.data_structures));
    for (const [field, question] of Object.entries(step)) {
      if (field === 'data_structures') continue;
      if (typeof question !== 'object' || !question.type) continue;
      if (question.type === 'single_select') {
        items.push(buildSingleReview(question.question, question.options, question.accepted_answers, stepAnswer[field]));
      } else if (question.type === 'multi_select') {
        items.push(buildMultiReview(question.question, question.options, question.accepted_answers, stepAnswer[field]));
      }
    }
  }

  if (stepName === 'solution_flow') {
    const step = flow.solution_flow;
    const stepsCatalog = new Map(step.steps_catalog.map((s) => [s.id, s.label]));
    items.push({
      question: step.question,
      type: 'order',
      userOrder: (stepAnswer.order ?? []).map((id: string) => stepsCatalog.get(id) ?? id),
      correctOrder: step.correct_order.map((id) => stepsCatalog.get(id) ?? id),
    });
  }

  if (stepName === 'edge_cases') {
    const step = flow.edge_cases;
    const selected = new Set(stepAnswer.selected_options ?? []);
    const reqSet = new Set(step.required_answers);
    const recSet = new Set(step.recommended_answers ?? []);
    items.push({
      question: step.question,
      type: 'options',
      options: step.options.map((opt) => {
        const picked = selected.has(opt);
        const isRequired = reqSet.has(opt);
        const isRecommended = recSet.has(opt);
        const shouldPick = isRequired || isRecommended;
        let status: ReviewOption['status'] = 'neutral';
        if (picked && shouldPick) status = 'correct';
        else if (picked && !shouldPick) status = 'wrong';
        else if (!picked && isRequired) status = 'missed';
        return { label: opt, status };
      }),
    });
  }

  if (stepName === 'complexity') {
    const step = flow.complexity;
    items.push(buildSingleReview(step.time.question, step.time.options, step.time.accepted_answers, stepAnswer.time));
    items.push(buildSingleReview(step.space.question, step.space.options, step.space.accepted_answers, stepAnswer.space));
    items.push(buildMultiReview(step.reason_tags.question, step.reason_tags.options, step.reason_tags.accepted_answers, stepAnswer.reason_tags));
  }

  return items;
}

function buildSingleReview(question: string, options: string[], accepted: string[], answer: string | undefined): ReviewQuestion {
  return {
    question,
    type: 'options',
    options: options.map((opt) => {
      const isCorrect = accepted.includes(opt);
      const isPicked = answer === opt;
      let status: ReviewOption['status'] = 'neutral';
      if (isPicked && isCorrect) status = 'correct';
      else if (isPicked && !isCorrect) status = 'wrong';
      else if (!isPicked && isCorrect) status = 'missed';
      return { label: opt, status };
    }),
  };
}

function buildMultiReview(question: string, options: string[], accepted: string[], answers: string[] | undefined): ReviewQuestion {
  const picked = new Set(answers ?? []);
  const acceptedSet = new Set(accepted);
  return {
    question,
    type: 'options',
    options: options.map((opt) => {
      const isCorrect = acceptedSet.has(opt);
      const isPicked = picked.has(opt);
      let status: ReviewOption['status'] = 'neutral';
      if (isPicked && isCorrect) status = 'correct';
      else if (isPicked && !isCorrect) status = 'wrong';
      else if (!isPicked && isCorrect) status = 'missed';
      return { label: opt, status };
    }),
  };
}

function ScoreBadge({ score }: { score: number }) {
  const pct = Math.round(score * 100);
  const color =
    score >= 0.8 ? COLORS.green800 :
    score >= 0.4 ? '#D97706' :
    COLORS.error;
  const bg =
    score >= 0.8 ? COLORS.green50 :
    score >= 0.4 ? COLORS.warningDim :
    COLORS.errorDim;
  const label =
    score >= 0.8 ? `${pct}%` :
    score >= 0.4 ? `${pct}%` :
    score > 0 ? `${pct}%` :
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

  const [recommendation, setRecommendation] = useState<RecommendationResult | null>(null);
  const [expandedStep, setExpandedStep] = useState<StepName | null>(null);

  const problem = state.problem;
  const problemId = problem?.id;
  const totalScore = state.totalScore ?? 0;

  const mistakeFeedbacks = problem
    ? getMistakeFeedbacks(problem.common_mistakes, state.triggeredMistakes)
    : [];

  // 결과 화면 진입 시 추천 로드
  useEffect(() => {
    fetchRecommendation()
      .then(setRecommendation)
      .catch(() => setRecommendation(null));
  }, []);

  const scoreColor =
    totalScore >= 80 ? COLORS.green800 :
    totalScore >= 50 ? '#D97706' :
    COLORS.error;

  const handleGoHome = () => {
    dispatch({ type: 'RESET' });
    router.navigate('/(tabs)/home' as any);
  };

  const handleNextProblem = () => {
    dispatch({ type: 'RESET' });
    router.navigate('/(tabs)/library' as any);
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

        {/* Step breakdown (accordion) */}
        <View style={styles.breakdownCard}>
          <Text style={styles.breakdownTitle}>단계별 결과</Text>
          {STEPS.filter((s) => s.hasQuestions).map((step) => {
            const score = state.stepScores[step.key] ?? 0;
            const isExpanded = expandedStep === step.key;
            const reviewItems = isExpanded && problem
              ? buildStepReview(step.key, problem.training_flow, state.stepAnswers)
              : [];
            return (
              <View key={step.key}>
                <Pressable
                  style={styles.breakdownRow}
                  onPress={() => setExpandedStep(isExpanded ? null : step.key)}
                >
                  <View style={styles.breakdownLeft}>
                    <Text style={styles.stepNum}>{step.number}</Text>
                    <Text style={styles.stepName}>{step.label}</Text>
                  </View>
                  <View style={styles.breakdownRight}>
                    <ScoreBadge score={score} />
                    <Feather
                      name={isExpanded ? 'chevron-up' : 'chevron-down'}
                      size={16}
                      color={COLORS.textTertiary}
                    />
                  </View>
                </Pressable>
                {isExpanded && reviewItems.length > 0 && (
                  <View style={styles.reviewPanel}>
                    {reviewItems.map((item, qi) => (
                      <View key={qi} style={styles.reviewQuestion}>
                        <Text style={styles.reviewQuestionText}>{item.question}</Text>
                        {item.type === 'options' && item.options?.map((opt, oi) => (
                          <View key={oi} style={styles.reviewOptionRow}>
                            <View style={[
                              styles.reviewDot,
                              opt.status === 'correct' && { backgroundColor: COLORS.green500 },
                              opt.status === 'wrong' && { backgroundColor: COLORS.error },
                              opt.status === 'missed' && { backgroundColor: '#D97706' },
                            ]} />
                            <Text style={[
                              styles.reviewOptionText,
                              opt.status === 'correct' && { color: COLORS.green800 },
                              opt.status === 'wrong' && { color: COLORS.error, textDecorationLine: 'line-through' },
                              opt.status === 'missed' && { color: '#D97706' },
                            ]}>
                              {opt.label}
                            </Text>
                            {opt.status === 'correct' && <Feather name="check" size={12} color={COLORS.green500} />}
                            {opt.status === 'wrong' && <Feather name="x" size={12} color={COLORS.error} />}
                            {opt.status === 'missed' && <Text style={styles.reviewMissedTag}>정답</Text>}
                          </View>
                        ))}
                        {item.type === 'order' && (
                          <View style={styles.reviewOrderWrap}>
                            <View style={styles.reviewOrderCol}>
                              <Text style={styles.reviewOrderHeader}>내 순서</Text>
                              {item.userOrder?.map((label, i) => {
                                const isCorrectPos = item.correctOrder?.[i] === label;
                                return (
                                  <View key={i} style={[styles.reviewOrderItem, !isCorrectPos && styles.reviewOrderItemWrong]}>
                                    <Text style={styles.reviewOrderNum}>{i + 1}</Text>
                                    <Text style={[styles.reviewOrderLabel, !isCorrectPos && { color: COLORS.error }]} numberOfLines={1}>{label}</Text>
                                  </View>
                                );
                              })}
                            </View>
                            <View style={styles.reviewOrderCol}>
                              <Text style={styles.reviewOrderHeader}>정답 순서</Text>
                              {item.correctOrder?.map((label, i) => (
                                <View key={i} style={[styles.reviewOrderItem, styles.reviewOrderItemCorrect]}>
                                  <Text style={styles.reviewOrderNum}>{i + 1}</Text>
                                  <Text style={[styles.reviewOrderLabel, { color: COLORS.green800 }]} numberOfLines={1}>{label}</Text>
                                </View>
                              ))}
                            </View>
                          </View>
                        )}
                      </View>
                    ))}
                  </View>
                )}
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

        {/* Recommendation Card */}
        {recommendation && (
          <View style={styles.recCard}>
            <View style={styles.recHeader}>
              <Text style={styles.recBadge}>
                {COURSE_LEVEL_LABELS[recommendation.primary.level]}
              </Text>
              <Feather name="compass" size={14} color={COLORS.green600} />
            </View>
            <Text style={styles.recTitle}>다음 추천: {recommendation.primary.title}</Text>
            <Text style={styles.recReason}>{recommendation.primary.reason}</Text>
            <Pressable
              style={({ pressed }) => [styles.recBtn, pressed && { opacity: 0.85 }]}
              onPress={() => {
                dispatch({ type: 'RESET' });
                router.navigate(`/(tabs)/library?category=${recommendation.primary.topic}` as any);
              }}
            >
              <Text style={styles.recBtnText}>코스 시작하기</Text>
              <Feather name="arrow-right" size={14} color={COLORS.white} />
            </Pressable>
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
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.05)',
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
    boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.03)',
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
  breakdownRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
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
  // Review accordion panel
  reviewPanel: {
    paddingHorizontal: 4,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.sand100,
  },
  reviewQuestion: {
    marginTop: 10,
  },
  reviewQuestionText: {
    fontSize: 12,
    fontFamily: FONTS.semiBold,
    color: COLORS.textSecondary,
    marginBottom: 6,
    lineHeight: 18,
  },
  reviewOptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  reviewDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: COLORS.sand200,
  },
  reviewOptionText: {
    flex: 1,
    fontSize: 13,
    fontFamily: FONTS.regular,
    color: COLORS.textTertiary,
    lineHeight: 18,
  },
  reviewMissedTag: {
    fontSize: 10,
    fontFamily: FONTS.bold,
    color: '#D97706',
    backgroundColor: COLORS.warningDim,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    overflow: 'hidden',
  },
  reviewOrderWrap: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 4,
  },
  reviewOrderCol: {
    flex: 1,
  },
  reviewOrderHeader: {
    fontSize: 10,
    fontFamily: FONTS.bold,
    color: COLORS.textTertiary,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  reviewOrderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderRadius: 6,
    marginBottom: 3,
    backgroundColor: COLORS.sand50,
  },
  reviewOrderItemWrong: {
    backgroundColor: COLORS.errorDim,
  },
  reviewOrderItemCorrect: {
    backgroundColor: COLORS.green50,
  },
  reviewOrderNum: {
    fontSize: 10,
    fontFamily: FONTS.bold,
    color: COLORS.textTertiary,
    width: 14,
  },
  reviewOrderLabel: {
    fontSize: 12,
    fontFamily: FONTS.regular,
    color: COLORS.text,
    flex: 1,
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
  // Recommendation card
  recCard: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    marginTop: 16,
    borderWidth: 1,
    borderColor: COLORS.green100,
    boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.03)',
  },
  recHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  recBadge: {
    fontSize: 10,
    fontFamily: FONTS.bold,
    color: COLORS.green600,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  recTitle: {
    fontSize: 16,
    fontFamily: FONTS.bold,
    color: COLORS.text,
    letterSpacing: -0.3,
    marginBottom: 6,
  },
  recReason: {
    fontSize: 13,
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
    lineHeight: 19,
    marginBottom: 14,
  },
  recBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    height: 40,
    borderRadius: 10,
    backgroundColor: COLORS.green800,
  },
  recBtnText: {
    fontSize: 14,
    fontFamily: FONTS.bold,
    color: COLORS.white,
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
