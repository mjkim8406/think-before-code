/**
 * Problem Detail Screen — Preview problem before starting training
 */

import { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Feather, Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING } from '@/src/lib/constants';
import { getTagLabel, getConstraintLabel } from '@/src/lib/tagLabels';
import { useBookmarks } from '@/src/hooks/useBookmarks';
import { supabase } from '@/src/lib/supabase';
import { getCurrentUserId } from '@/src/services/trainingService';

interface ProblemDetail {
  id: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  domain: string;
  summary: string;
  tags: string[];
  constraints: Record<string, any>;
  source_url: string | null;
  description: string | null;
}

interface SessionHistory {
  id: string;
  totalScore: number | null;
  completedAt: string;
}

export default function ProblemDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { isBookmarked, toggle: toggleBookmark } = useBookmarks();

  const [problem, setProblem] = useState<ProblemDetail | null>(null);
  const [history, setHistory] = useState<SessionHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!id) return;
    try {
      setIsLoading(true);
      setError(null);

      const [problemRes, historyRes] = await Promise.all([
        supabase
          .from('problems')
          .select('id, title, difficulty, domain, summary, tags, constraints, source_url, description')
          .eq('id', id)
          .single(),
        (async () => {
          const userId = await getCurrentUserId();
          return supabase
            .from('training_sessions')
            .select('id, total_score, completed_at')
            .eq('user_id', userId)
            .eq('problem_id', id)
            .eq('status', 'completed')
            .order('completed_at', { ascending: false })
            .limit(5);
        })(),
      ]);

      if (problemRes.error) throw new Error(problemRes.error.message);
      setProblem(problemRes.data as ProblemDetail);

      if (!historyRes.error && historyRes.data) {
        setHistory(
          historyRes.data.map((r) => ({
            id: r.id,
            totalScore: r.total_score,
            completedAt: r.completed_at,
          })),
        );
      }
    } catch (err: any) {
      setError(err.message ?? 'Failed to load problem');
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => { load(); }, [load]);

  function handleStartTraining() {
    router.push(`/training/reading?problemId=${id}` as any);
  }

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.safe, styles.center]}>
        <ActivityIndicator size="large" color={COLORS.green800} />
      </SafeAreaView>
    );
  }

  if (error || !problem) {
    return (
      <SafeAreaView style={[styles.safe, styles.center]}>
        <Text style={styles.errorText}>{error ?? '문제를 찾을 수 없습니다'}</Text>
        <Pressable onPress={() => router.back()} style={styles.backLink}>
          <Text style={styles.backLinkText}>돌아가기</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  const diffConfig = {
    easy: { bg: COLORS.figmaEasyBg, text: COLORS.figmaEasyText, label: 'Easy' },
    medium: { bg: COLORS.figmaMediumBg, text: COLORS.figmaMediumText, label: 'Medium' },
    hard: { bg: COLORS.figmaHardBg, text: COLORS.figmaHardText, label: 'Hard' },
  }[problem.difficulty];

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <View style={styles.screen}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} hitSlop={12}>
            <Feather name="arrow-left" size={24} color={COLORS.text} />
          </Pressable>
          <Pressable onPress={() => toggleBookmark(problem.id)} hitSlop={12}>
            <Ionicons
              name={isBookmarked(problem.id) ? 'bookmark' : 'bookmark-outline'}
              size={22}
              color={isBookmarked(problem.id) ? COLORS.green800 : COLORS.sand300}
            />
          </Pressable>
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
        {/* Difficulty + Domain */}
        <View style={styles.topRow}>
          <View style={[styles.diffBadge, { backgroundColor: diffConfig.bg }]}>
            <Text style={[styles.diffText, { color: diffConfig.text }]}>{diffConfig.label}</Text>
          </View>
          <Text style={styles.domain}>{problem.domain}</Text>
        </View>

        {/* Title */}
        <Text style={styles.title}>{problem.title}</Text>

        {/* Summary */}
        <Text style={styles.summary}>{problem.summary}</Text>

        {/* Tags */}
        <View style={styles.tagRow}>
          {problem.tags.map((tag) => (
            <View key={tag} style={styles.tagChip}>
              <Text style={styles.tagChipText}>{getTagLabel(tag)}</Text>
            </View>
          ))}
        </View>

        {/* Constraints */}
        {problem.constraints && Object.keys(problem.constraints).length > 0 && (
          <View style={styles.constraintsCard}>
            <Text style={styles.constraintsLabel}>제약 조건</Text>
            {Object.entries(problem.constraints).map(([key, val]) => (
              <Text key={key} style={styles.constraintItem}>
                • {getConstraintLabel(key)}{typeof val === 'string' ? `: ${val}` : ''}
              </Text>
            ))}
          </View>
        )}

        {/* BOJ link */}
        {problem.source_url && (
          <Pressable
            onPress={() => Linking.openURL(problem.source_url!)}
            style={styles.sourceLink}
          >
            <Feather name="external-link" size={14} color={COLORS.green800} />
            <Text style={styles.sourceLinkText}>원문 보기</Text>
          </Pressable>
        )}

        {/* Previous attempts */}
        {history.length > 0 && (
          <View style={styles.historySection}>
            <Text style={styles.historySectionTitle}>이전 풀이 기록</Text>
            {history.map((session) => {
              const score = session.totalScore ?? 0;
              const scoreColor = score >= 80 ? COLORS.green800 : score >= 50 ? '#D97706' : COLORS.error;
              const date = new Date(session.completedAt);
              const dateStr = `${date.getMonth() + 1}/${date.getDate()}`;
              return (
                <View key={session.id} style={styles.historyRow}>
                  <Text style={styles.historyDate}>{dateStr}</Text>
                  <View style={[styles.historyScoreBadge, { backgroundColor: `${scoreColor}15` }]}>
                    <Text style={[styles.historyScore, { color: scoreColor }]}>{score}점</Text>
                  </View>
                </View>
              );
            })}
          </View>
        )}
      </ScrollView>

        {/* Footer — StepShell과 동일 구조 */}
        <View style={styles.footer}>
          <Pressable
            style={({ pressed }) => [styles.startBtn, pressed && { opacity: 0.85 }]}
            onPress={handleStartTraining}
          >
            <Text style={styles.startBtnText}>학습 시작</Text>
            <Feather name="arrow-right" size={16} color={COLORS.white} />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  screen: { flex: 1 },
  center: { justifyContent: 'center', alignItems: 'center' },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 24, paddingBottom: 24 },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
  },

  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
    marginTop: 8,
  },
  diffBadge: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 8,
  },
  diffText: {
    fontSize: 12,
    fontFamily: FONTS.semiBold,
    letterSpacing: 0.3,
  },
  domain: {
    fontSize: 12,
    fontFamily: FONTS.medium,
    color: COLORS.figmaSubtext,
  },

  title: {
    fontSize: 28,
    fontFamily: FONTS.bold,
    color: COLORS.text,
    letterSpacing: -0.7,
    marginBottom: 12,
  },
  summary: {
    fontSize: 15,
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
    lineHeight: 24,
    marginBottom: 20,
  },

  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 20,
  },
  tagChip: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    backgroundColor: COLORS.sand100,
    borderWidth: 1,
    borderColor: COLORS.sand200,
  },
  tagChipText: {
    fontSize: 12,
    fontFamily: FONTS.semiBold,
    color: COLORS.textSecondary,
  },

  constraintsCard: {
    backgroundColor: COLORS.sand100,
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
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
    marginBottom: 8,
  },
  constraintItem: {
    fontSize: 13,
    fontFamily: FONTS.mono,
    color: COLORS.textTertiary,
    lineHeight: 22,
  },

  sourceLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: COLORS.green50,
    borderRadius: 10,
    marginBottom: 24,
  },
  sourceLinkText: {
    fontSize: 13,
    fontFamily: FONTS.semiBold,
    color: COLORS.green800,
  },

  historySection: {
    marginTop: 8,
  },
  historySectionTitle: {
    fontSize: 13,
    fontFamily: FONTS.bold,
    color: COLORS.textTertiary,
    letterSpacing: 0.5,
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  historyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.sand100,
  },
  historyDate: {
    fontSize: 14,
    fontFamily: FONTS.medium,
    color: COLORS.textSecondary,
  },
  historyScoreBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
  historyScore: {
    fontSize: 13,
    fontFamily: FONTS.bold,
  },

  footer: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    paddingBottom: 36,
  },
  startBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 52,
    borderRadius: 14,
    backgroundColor: COLORS.green800,
    shadowColor: 'rgba(1, 45, 29, 0.4)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 5,
  },
  startBtnText: {
    fontSize: 16,
    fontFamily: FONTS.bold,
    color: COLORS.white,
  },

  errorText: {
    fontSize: 14,
    fontFamily: FONTS.medium,
    color: COLORS.error,
    marginBottom: 12,
  },
  backLink: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  backLinkText: {
    fontSize: 14,
    fontFamily: FONTS.semiBold,
    color: COLORS.green800,
  },
});
