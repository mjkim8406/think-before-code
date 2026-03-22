import React, { useRef, useState } from 'react';
import { View, StyleSheet, ScrollView, Text, Pressable, Image, ActivityIndicator, Modal, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { COLORS, FONTS } from '@/src/lib/constants';
import { useStatsData } from '@/src/hooks/useStatsData';
import { useProfileData } from '@/src/hooks/useProfileData';
import { getTagLabel } from '@/src/lib/tagLabels';

const _logoCh = { fontSize: 26, fontFamily: FONTS.black, letterSpacing: -1, lineHeight: 30, marginRight: -2 } as const;
function LogoIcon() {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Text style={[_logoCh, { color: COLORS.green800 }]}>&lt;</Text>
      <Text style={[_logoCh, { color: COLORS.green600 }]}>&gt;</Text>
      <Text style={[_logoCh, { color: COLORS.green500 }]}>&gt;</Text>
      <Text style={[_logoCh, { color: COLORS.green400 }]}>&gt;</Text>
    </View>
  );
}

export default function StatsScreen() {
  const router = useRouter();
  const [activityTab, setActivityTab] = useState<'week' | 'month'>('month');
  const { summary, categoryMastery, conceptMastery, monthlyActivity, weeklyDaily, difficultyDist, stepAccuracy, solvedProblems, isLoading, error, refresh } = useStatsData();
  const [showPrecision, setShowPrecision] = useState(false);
  const [showSolved, setShowSolved] = useState(false);
  const [showMastery, setShowMastery] = useState(false);
  const { profile, refresh: refreshProfile } = useProfileData();
  const { scrollTo } = useLocalSearchParams<{ scrollTo?: string }>();
  const scrollRef = useRef<ScrollView>(null);
  const activitySectionY = useRef(0);

  useFocusEffect(
    React.useCallback(() => {
      refresh();
      refreshProfile();
      // 홈에서 잔디 카드 눌러서 왔을 때 Monthly Activity로 스크롤
      if (scrollTo === 'activity') {
        setTimeout(() => {
          scrollRef.current?.scrollTo({ y: activitySectionY.current, animated: true });
        }, 300);
      }
    }, [scrollTo])
  );

  const maxBarCount = Math.max(...monthlyActivity.map((w) => w.count), 1);
  const totalDiffCount = difficultyDist.easy + difficultyDist.medium + difficultyDist.hard;

  const diffPercent = (count: number) =>
    totalDiffCount > 0 ? Math.round((count / totalDiffCount) * 100) : 0;

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.safe, { justifyContent: 'center', alignItems: 'center' }]} edges={['top']}>
        <ActivityIndicator size="large" color={COLORS.green800} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        ref={scrollRef}
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Nav */}
        <View style={styles.nav}>
          <LogoIcon />
          <Pressable
            onPress={() => router.push('/(tabs)/settings' as any)}
            style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
          >
            {profile?.avatarUrl ? (
              <Image source={{ uri: profile.avatarUrl }} style={styles.avatarImg} />
            ) : (
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {profile?.displayName ? profile.displayName.slice(0, 2).toUpperCase() : 'U'}
                </Text>
              </View>
            )}
          </Pressable>
        </View>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Stats.</Text>
        </View>

        {/* Bento Grid */}
        <View style={styles.bentoGrid}>
          {/* Volume — tap to see solved problems */}
          <Pressable
            style={({ pressed }) => [styles.volumeCard, pressed && { opacity: 0.85 }]}
            onPress={() => setShowSolved(true)}
          >
            <View style={styles.cardHeader}>
              <Text style={styles.metricLabel}>Volume</Text>
              <Feather name="chevron-right" size={16} color="#586062" />
            </View>
            <View style={styles.metricContent}>
              <View>
                <Text style={styles.bigNumber}>{summary.totalSolved}</Text>
                <Text style={styles.metricSubtext}>Solved</Text>
              </View>
            </View>
            {summary.totalSolved > 0 && (
              <View style={styles.badgeContainer}>
                <View style={styles.badge}>
                  <Feather name="trending-up" size={12} color="#1b4332" />
                  <Text style={styles.badgeText}>Active learner</Text>
                </View>
              </View>
            )}
          </Pressable>

          {/* Precision — tap to see step accuracy */}
          <Pressable
            style={({ pressed }) => [styles.accuracyCard, pressed && { opacity: 0.85 }]}
            onPress={() => setShowPrecision(true)}
          >
            <Text style={styles.watermarkBracket}>{'>'}</Text>
            <View style={styles.cardHeader}>
              <Text style={styles.metricLabelLight}>Precision</Text>
              <Feather name="chevron-right" size={16} color="rgba(255,255,255,0.5)" />
            </View>
            <View style={styles.metricContent}>
              <View>
                <Text style={styles.bigNumberLight}>{summary.accuracyRate}%</Text>
                <Text style={styles.metricSubtextLight}>Accuracy</Text>
              </View>
            </View>
            <View style={styles.progressBarContainer}>
              <View style={styles.progressBarTrack}>
                <View style={[styles.progressBarFill, { width: `${summary.accuracyRate}%` }]} />
              </View>
            </View>
          </Pressable>

          {/* Momentum */}
          <View style={styles.momentumCard}>
            <Text style={styles.metricLabel}>Momentum</Text>
            <View style={styles.metricContent}>
              <View>
                <Text style={styles.bigNumber}>{summary.totalStudyDays}</Text>
                <Text style={styles.metricSubtext}>Days</Text>
              </View>
            </View>
            <Text style={styles.streakNote}>
              {summary.currentStreak > 0
                ? `${summary.currentStreak}일 연속 학습 중`
                : '오늘 첫 문제를 풀어보세요'}
            </Text>
          </View>
        </View>

        {/* Concept Mastery — 카테고리 기반 */}
        <View style={styles.section}>
          <Pressable
            style={({ pressed }) => [styles.masteryCard, pressed && { opacity: 0.85 }]}
            onPress={() => setShowMastery(true)}
          >
            <View style={styles.cardHeader}>
              <Text style={styles.sectionTitle}>Concept{'\n'}Mastery</Text>
              <Feather name="chevron-right" size={20} color="#586062" />
            </View>
            {categoryMastery.length === 0 ? (
              <View style={styles.emptySection}>
                <Text style={styles.emptyText}>문제를 풀면 카테고리별 마스터리가 표시됩니다</Text>
              </View>
            ) : (
              <View style={styles.masteryList}>
                {categoryMastery.map((item) => (
                  <View key={item.category} style={styles.masteryItem}>
                    <View style={styles.masteryTop}>
                      <Text style={styles.masteryName}>{item.label}</Text>
                      <Text style={styles.masteryMeta}>{item.solved}/{item.total}</Text>
                    </View>
                    <View style={styles.masteryTrack}>
                      <View style={[styles.masteryFill, { width: `${item.averageScore}%` }]} />
                    </View>
                  </View>
                ))}
              </View>
            )}
          </Pressable>
        </View>

        {/* Monthly Activity */}
        <View
          style={styles.section}
          onLayout={(e) => { activitySectionY.current = e.nativeEvent.layout.y; }}
        >
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Monthly{'\n'}Activity</Text>
            <View style={styles.tabRow}>
              <Pressable
                style={[styles.tabPill, activityTab === 'week' && styles.tabPillActive]}
                onPress={() => setActivityTab('week')}
              >
                <Text style={[styles.tabPillText, activityTab === 'week' && styles.tabPillTextActive]}>Week</Text>
              </Pressable>
              <Pressable
                style={[styles.tabPill, activityTab === 'month' && styles.tabPillActive]}
                onPress={() => setActivityTab('month')}
              >
                <Text style={[styles.tabPillText, activityTab === 'month' && styles.tabPillTextActive]}>Month</Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.chartCard}>
            {activityTab === 'month' ? (
              <>
                <View style={styles.chartArea}>
                  {monthlyActivity.map((week) => {
                    const barHeight = maxBarCount > 0 ? (week.count / maxBarCount) * 160 : 0;
                    const isHighlight = week.count === maxBarCount && week.count > 0;
                    return (
                      <View key={week.week} style={styles.barCol}>
                        <View style={styles.barArea}>
                          <View
                            style={[
                              styles.bar,
                              {
                                height: Math.max(barHeight, 4),
                                backgroundColor: isHighlight ? '#14532D' : '#e2e2e2',
                              },
                            ]}
                          />
                        </View>
                        <Text style={[styles.barLabel, { color: isHighlight ? '#14532D' : '#586062' }]}>
                          {week.week}
                        </Text>
                      </View>
                    );
                  })}
                </View>
                <View style={styles.chartDivider} />
                <View style={styles.chartSummary}>
                  <View>
                    <Text style={styles.summaryNumber}>{summary.totalSolved}</Text>
                    <Text style={styles.summaryLabel}>Problems Total</Text>
                  </View>
                  <View style={{ alignItems: 'flex-end' }}>
                    <Text style={styles.summaryNumber}>
                      Avg. {summary.totalStudyDays > 0
                        ? (summary.totalSolved / summary.totalStudyDays).toFixed(1)
                        : '0.0'}
                    </Text>
                    <Text style={styles.summaryLabel}>Daily Velocity</Text>
                  </View>
                </View>
              </>
            ) : (
              <>
                <View style={styles.chartArea}>
                  {weeklyDaily.map((d) => {
                    const maxDaily = Math.max(...weeklyDaily.map((x) => x.count), 1);
                    const barHeight = maxDaily > 0 ? (d.count / maxDaily) * 160 : 0;
                    const isHighlight = d.count === maxDaily && d.count > 0;
                    const now = new Date();
                    const todayLabel = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'][now.getDay()];
                    const isToday = d.day === todayLabel;
                    return (
                      <View key={d.day} style={styles.barCol}>
                        <View style={styles.barArea}>
                          <View
                            style={[
                              styles.bar,
                              {
                                height: Math.max(barHeight, 4),
                                backgroundColor: isHighlight ? '#14532D' : isToday ? COLORS.green500 : '#e2e2e2',
                              },
                            ]}
                          />
                        </View>
                        <Text style={[styles.barLabel, {
                          color: isHighlight ? '#14532D' : isToday ? COLORS.green500 : '#586062',
                          fontFamily: isToday ? FONTS.black : FONTS.bold,
                        }]}>
                          {d.day}
                        </Text>
                      </View>
                    );
                  })}
                </View>
                <View style={styles.chartDivider} />
                <View style={styles.chartSummary}>
                  <View>
                    <Text style={styles.summaryNumber}>
                      {weeklyDaily.reduce((s, d) => s + d.count, 0)}
                    </Text>
                    <Text style={styles.summaryLabel}>This Week</Text>
                  </View>
                  <View style={{ alignItems: 'flex-end' }}>
                    <Text style={styles.summaryNumber}>
                      {weeklyDaily.filter((d) => d.count > 0).length}/7
                    </Text>
                    <Text style={styles.summaryLabel}>Active Days</Text>
                  </View>
                </View>
              </>
            )}
          </View>
        </View>

        {/* Intensity Distribution */}
        <View style={styles.section}>
          <Text style={styles.sectionTitleFull}>Intensity Distribution</Text>

          {/* Easy */}
          <View style={[styles.intensityCard, { backgroundColor: 'rgba(193, 236, 212, 0.8)', borderColor: 'rgba(6, 78, 59, 0.05)' }]}>
            <View>
              <Text style={[styles.intensityLabel, { color: '#274e3d' }]}>Easy</Text>
              <Text style={[styles.intensityCount, { color: '#002114' }]}>{difficultyDist.easy}</Text>
            </View>
            <View style={[styles.intensityCircle, { borderColor: 'rgba(39, 78, 61, 0.2)' }]}>
              <Text style={styles.intensityPercent}>{diffPercent(difficultyDist.easy)}%</Text>
            </View>
          </View>

          {/* Medium */}
          <View style={[styles.intensityCard, { backgroundColor: 'rgba(242, 232, 207, 0.8)', borderColor: 'rgba(139, 94, 60, 0.05)' }]}>
            <View>
              <Text style={[styles.intensityLabel, { color: '#8b5e3c' }]}>Medium</Text>
              <Text style={[styles.intensityCount, { color: '#8b5e3c' }]}>{difficultyDist.medium}</Text>
            </View>
            <View style={[styles.intensityCircle, { borderColor: 'rgba(139, 94, 60, 0.2)' }]}>
              <Text style={[styles.intensityPercent, { color: '#8b5e3c' }]}>{diffPercent(difficultyDist.medium)}%</Text>
            </View>
          </View>

          {/* Hard */}
          <View style={[styles.intensityCard, { backgroundColor: 'rgba(255, 218, 216, 0.8)', borderColor: 'rgba(103, 58, 57, 0.05)' }]}>
            <View>
              <Text style={[styles.intensityLabel, { color: '#673a39' }]}>Hard</Text>
              <Text style={[styles.intensityCount, { color: '#673a39' }]}>{difficultyDist.hard}</Text>
            </View>
            <View style={[styles.intensityCircle, { borderColor: 'rgba(103, 58, 57, 0.2)' }]}>
              <Text style={[styles.intensityPercent, { color: '#673a39' }]}>{diffPercent(difficultyDist.hard)}%</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Concept Mastery Detail Modal — 태그 기반 상세 */}
      <Modal visible={showMastery} transparent animationType="slide" onRequestClose={() => setShowMastery(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>태그별 상세 마스터리</Text>
            <Text style={styles.modalDesc}>풀이한 문제의 세부 태그별 평균 점수입니다</Text>
            {conceptMastery.length === 0 ? (
              <Text style={styles.modalEmpty}>아직 풀이 기록이 없습니다</Text>
            ) : (
              <ScrollView style={{ maxHeight: 400 }} showsVerticalScrollIndicator={false}>
                {conceptMastery.map((item) => {
                  const score = Math.round(item.averageScore);
                  const color = score >= 80 ? COLORS.green800 : score >= 50 ? '#D97706' : COLORS.error;
                  return (
                    <View key={item.conceptTag} style={styles.stepRow}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.stepLabel}>{getTagLabel(item.conceptTag)}</Text>
                        <View style={styles.stepTrack}>
                          <View style={[styles.stepFill, { width: `${score}%`, backgroundColor: color }]} />
                        </View>
                      </View>
                      <View style={{ alignItems: 'flex-end' }}>
                        <Text style={[styles.stepScore, { color }]}>{score}%</Text>
                        <Text style={styles.masteryMetaSmall}>{item.problemsSolved}문제</Text>
                      </View>
                    </View>
                  );
                })}
              </ScrollView>
            )}
            <Pressable style={styles.modalCloseBtn} onPress={() => setShowMastery(false)}>
              <Text style={styles.modalCloseBtnText}>닫기</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Precision Detail Modal */}
      <Modal visible={showPrecision} transparent animationType="slide" onRequestClose={() => setShowPrecision(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>단계별 정확도</Text>
            <Text style={styles.modalDesc}>각 학습 단계에서의 평균 점수입니다</Text>
            {stepAccuracy.length === 0 ? (
              <Text style={styles.modalEmpty}>아직 풀이 기록이 없습니다</Text>
            ) : (
              <ScrollView style={{ maxHeight: 400 }} showsVerticalScrollIndicator={false}>
                {stepAccuracy.map((s) => {
                  const color = s.avgScore >= 80 ? COLORS.green800 : s.avgScore >= 50 ? '#D97706' : COLORS.error;
                  return (
                    <View key={s.step} style={styles.stepRow}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.stepLabel}>{s.label}</Text>
                        <View style={styles.stepTrack}>
                          <View style={[styles.stepFill, { width: `${s.avgScore}%`, backgroundColor: color }]} />
                        </View>
                      </View>
                      <Text style={[styles.stepScore, { color }]}>{s.avgScore}%</Text>
                    </View>
                  );
                })}
              </ScrollView>
            )}
            <Pressable style={styles.modalCloseBtn} onPress={() => setShowPrecision(false)}>
              <Text style={styles.modalCloseBtnText}>닫기</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Solved Problems Modal */}
      <Modal visible={showSolved} transparent animationType="slide" onRequestClose={() => setShowSolved(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>풀은 문제 목록</Text>
            <Text style={styles.modalDesc}>{solvedProblems.length}개의 문제를 완료했습니다</Text>
            {solvedProblems.length === 0 ? (
              <Text style={styles.modalEmpty}>아직 풀이 기록이 없습니다</Text>
            ) : (
              <FlatList
                data={solvedProblems}
                keyExtractor={(item) => item.problemId}
                style={{ maxHeight: 400 }}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => {
                  const diffColor = {
                    easy: { bg: COLORS.figmaEasyBg, text: COLORS.figmaEasyText },
                    medium: { bg: COLORS.figmaMediumBg, text: COLORS.figmaMediumText },
                    hard: { bg: COLORS.figmaHardBg, text: COLORS.figmaHardText },
                  }[item.difficulty];
                  const scoreColor = item.score >= 80 ? COLORS.green800 : item.score >= 50 ? '#D97706' : COLORS.error;
                  const date = new Date(item.completedAt);
                  const dateStr = `${date.getMonth() + 1}/${date.getDate()}`;
                  return (
                    <Pressable
                      style={styles.solvedRow}
                      onPress={() => {
                        setShowSolved(false);
                        router.push(`/problem/${item.problemId}` as any);
                      }}
                    >
                      <View style={{ flex: 1 }}>
                        <Text style={styles.solvedTitle} numberOfLines={1}>{item.title}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 }}>
                          <View style={[styles.solvedDiffBadge, { backgroundColor: diffColor.bg }]}>
                            <Text style={[styles.solvedDiffText, { color: diffColor.text }]}>
                              {item.difficulty.charAt(0).toUpperCase() + item.difficulty.slice(1)}
                            </Text>
                          </View>
                          <Text style={styles.solvedDate}>{dateStr}</Text>
                        </View>
                      </View>
                      <Text style={[styles.solvedScore, { color: scoreColor }]}>{item.score}점</Text>
                    </Pressable>
                  );
                }}
              />
            )}
            <Pressable style={styles.modalCloseBtn} onPress={() => setShowSolved(false)}>
              <Text style={styles.modalCloseBtnText}>닫기</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  scroll: { flex: 1 },
  content: { paddingBottom: 40 },

  nav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 4,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.green800,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarImg: { width: 40, height: 40, borderRadius: 20 },
  avatarText: { fontSize: 14, fontFamily: FONTS.bold, color: COLORS.white },

  header: { paddingHorizontal: 24, paddingTop: 12, paddingBottom: 16 },
  headerTitle: { fontFamily: FONTS.black, fontSize: 36, letterSpacing: -1, lineHeight: 40, color: COLORS.figmaDarkGreen },

  bentoGrid: { paddingHorizontal: 24, gap: 24, marginBottom: 48 },

  volumeCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 24,
    padding: 33,
    borderWidth: 1,
    borderColor: 'rgba(193, 200, 194, 0.1)',
  },
  cardHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4,
  },
  metricLabel: { fontFamily: FONTS.bold, fontSize: 12, letterSpacing: 1.2, color: '#586062', textTransform: 'uppercase' },
  metricContent: { marginTop: 0 },
  bigNumber: { fontFamily: FONTS.black, fontSize: 72, letterSpacing: -3.6, lineHeight: 72, color: '#14532D' },
  metricSubtext: { fontFamily: FONTS.semiBold, fontSize: 20, lineHeight: 28, color: '#586062' },
  badgeContainer: { marginTop: 16 },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#c1ecd4',
    borderRadius: 9999,
    paddingHorizontal: 12,
    paddingVertical: 4,
    gap: 8,
  },
  badgeText: { fontFamily: FONTS.bold, fontSize: 14, lineHeight: 20, color: '#1b4332' },

  accuracyCard: { backgroundColor: '#14532D', borderRadius: 24, padding: 33, overflow: 'hidden' },
  watermarkBracket: {
    position: 'absolute',
    right: -20,
    top: -40,
    fontFamily: FONTS.black,
    fontSize: 180,
    lineHeight: 270,
    color: '#ffffff',
    opacity: 0.05,
  },
  metricLabelLight: { fontFamily: FONTS.bold, fontSize: 12, letterSpacing: 1.2, color: '#ffffff', textTransform: 'uppercase' },
  bigNumberLight: { fontFamily: FONTS.black, fontSize: 72, letterSpacing: -3.6, lineHeight: 72, color: '#ffffff' },
  metricSubtextLight: { fontFamily: FONTS.semiBold, fontSize: 20, lineHeight: 28, color: '#ffffff' },
  progressBarContainer: { marginTop: 16 },
  progressBarTrack: { height: 6, borderRadius: 9999, backgroundColor: '#1b4332' },
  progressBarFill: { height: 6, borderRadius: 9999, backgroundColor: '#86af99' },

  momentumCard: {
    backgroundColor: 'rgba(243, 243, 243, 0.8)',
    borderRadius: 24,
    padding: 33,
    borderWidth: 1,
    borderColor: 'rgba(193, 200, 194, 0.1)',
  },
  streakNote: { fontFamily: FONTS.medium, fontSize: 14, lineHeight: 20, color: '#414844', marginTop: 0 },

  section: { paddingHorizontal: 24, marginBottom: 48 },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 32,
  },
  sectionTitle: { fontFamily: FONTS.bold, fontSize: 30, letterSpacing: -0.75, lineHeight: 36, color: '#14532D' },
  sectionTitleFull: { fontFamily: FONTS.bold, fontSize: 30, letterSpacing: -0.75, lineHeight: 36, color: '#14532D', marginBottom: 32 },

  emptySection: { alignItems: 'center', paddingVertical: 24 },
  emptyText: { fontSize: 14, fontFamily: FONTS.regular, color: '#586062' },

  masteryCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 24,
    padding: 33,
    borderWidth: 1,
    borderColor: 'rgba(193, 200, 194, 0.1)',
  },
  masteryList: { gap: 32, marginTop: 24 },
  masteryItem: { gap: 12 },
  masteryTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  masteryName: { fontFamily: FONTS.bold, fontSize: 20, lineHeight: 28, color: '#14532D' },
  masteryPercent: { fontFamily: FONTS.bold, fontSize: 16, lineHeight: 24, color: '#586062' },
  masteryMeta: { fontFamily: FONTS.semiBold, fontSize: 14, lineHeight: 20, color: '#586062' },
  masteryMetaSmall: { fontFamily: FONTS.medium, fontSize: 11, color: '#586062', marginTop: 2 },
  masteryTrack: { height: 16, borderRadius: 9999, backgroundColor: '#e2e2e2' },
  masteryFill: { height: 16, borderRadius: 9999, backgroundColor: '#14532D' },

  tabRow: { flexDirection: 'row', gap: 8, marginTop: 8 },
  tabPill: { paddingHorizontal: 16, paddingVertical: 6, borderRadius: 9999, backgroundColor: '#f3f3f3' },
  tabPillActive: { backgroundColor: '#14532D' },
  tabPillText: { fontFamily: FONTS.bold, fontSize: 12, letterSpacing: 1.2, lineHeight: 16, color: '#586062', textTransform: 'uppercase' },
  tabPillTextActive: { color: '#ffffff' },

  chartCard: {
    backgroundColor: 'rgba(243, 243, 243, 0.8)',
    borderRadius: 24,
    padding: 33,
    borderWidth: 1,
    borderColor: 'rgba(193, 200, 194, 0.1)',
  },
  chartArea: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', height: 200, marginBottom: 16 },
  barCol: { flex: 1, alignItems: 'center' },
  barArea: { flex: 1, justifyContent: 'flex-end', width: '100%', alignItems: 'center' },
  bar: { width: 40, borderRadius: 8 },
  barLabel: { fontFamily: FONTS.bold, fontSize: 10, letterSpacing: -0.5, lineHeight: 15, marginTop: 8 },
  chartDivider: { height: 1, backgroundColor: 'rgba(193, 200, 194, 0.1)', marginVertical: 24 },
  chartSummary: { flexDirection: 'row', justifyContent: 'space-between' },
  summaryNumber: { fontFamily: FONTS.black, fontSize: 24, lineHeight: 32, color: '#14532D' },
  summaryLabel: { fontFamily: FONTS.bold, fontSize: 12, letterSpacing: 1.2, lineHeight: 16, color: '#586062', textTransform: 'uppercase' },

  intensityCard: {
    borderRadius: 16,
    padding: 25,
    marginBottom: 16,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  intensityLabel: { fontFamily: FONTS.bold, fontSize: 12, letterSpacing: 1.2, lineHeight: 16, textTransform: 'uppercase' },
  intensityCount: { fontFamily: FONTS.black, fontSize: 30, lineHeight: 36, marginTop: 4 },
  intensityCircle: {
    width: 48,
    height: 48,
    borderRadius: 9999,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  intensityPercent: { fontFamily: FONTS.black, fontSize: 10, lineHeight: 15, color: '#1a1c1c' },

  // Modals
  modalOverlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24,
    padding: 24, paddingBottom: 40, maxHeight: '80%',
  },
  modalHandle: {
    width: 40, height: 4, borderRadius: 2, backgroundColor: COLORS.sand200,
    alignSelf: 'center', marginBottom: 20,
  },
  modalTitle: {
    fontFamily: FONTS.bold, fontSize: 22, color: '#14532D', marginBottom: 4,
  },
  modalDesc: {
    fontFamily: FONTS.regular, fontSize: 14, color: '#586062', marginBottom: 24,
  },
  modalEmpty: {
    fontFamily: FONTS.regular, fontSize: 14, color: '#586062', textAlign: 'center', paddingVertical: 32,
  },
  modalCloseBtn: {
    marginTop: 20, height: 48, borderRadius: 14,
    backgroundColor: COLORS.sand100, alignItems: 'center', justifyContent: 'center',
  },
  modalCloseBtnText: {
    fontFamily: FONTS.bold, fontSize: 16, color: '#586062',
  },

  // Step accuracy rows
  stepRow: {
    flexDirection: 'row', alignItems: 'center', gap: 16,
    paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: COLORS.sand100,
  },
  stepLabel: {
    fontFamily: FONTS.semiBold, fontSize: 15, color: '#1a1c1c', marginBottom: 8,
  },
  stepTrack: { height: 8, borderRadius: 4, backgroundColor: '#e2e2e2' },
  stepFill: { height: 8, borderRadius: 4 },
  stepScore: { fontFamily: FONTS.black, fontSize: 18, minWidth: 48, textAlign: 'right' },

  // Solved problem rows
  solvedRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: COLORS.sand100,
  },
  solvedTitle: {
    fontFamily: FONTS.semiBold, fontSize: 15, color: '#1a1c1c',
  },
  solvedDiffBadge: {
    paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6,
  },
  solvedDiffText: {
    fontFamily: FONTS.semiBold, fontSize: 11,
  },
  solvedDate: {
    fontFamily: FONTS.medium, fontSize: 12, color: '#586062',
  },
  solvedScore: {
    fontFamily: FONTS.black, fontSize: 16,
  },
});
