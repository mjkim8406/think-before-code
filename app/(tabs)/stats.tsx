import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, Pressable, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { COLORS, FONTS } from '@/src/lib/constants';
import { useStatsData } from '@/src/hooks/useStatsData';
import { getTagLabel } from '@/src/lib/tagLabels';

function LogoIcon() {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 1 }}>
      <Text style={{ fontSize: 20, fontFamily: FONTS.black, color: COLORS.green800, letterSpacing: -1, lineHeight: 24 }}>&lt;</Text>
      <Text style={{ fontSize: 20, fontFamily: FONTS.black, color: COLORS.green500, letterSpacing: -2, lineHeight: 24 }}>&gt;&gt;&gt;</Text>
    </View>
  );
}

export default function StatsScreen() {
  const [activityTab, setActivityTab] = useState<'week' | 'month'>('month');
  const { summary, conceptMastery, monthlyActivity, difficultyDist, isLoading, error, refresh } = useStatsData();

  useFocusEffect(
    React.useCallback(() => {
      refresh();
    }, [])
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
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Nav */}
        <View style={styles.nav}>
          <LogoIcon />
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>MJ</Text>
          </View>
        </View>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Performance.</Text>
          <Text style={styles.headerSubtitle}>
            Your cognitive growth over the last 30{'\n'}days of algorithmic refinement.
          </Text>
        </View>

        {/* Bento Grid */}
        <View style={styles.bentoGrid}>
          {/* Volume */}
          <View style={styles.volumeCard}>
            <Text style={styles.metricLabel}>Volume</Text>
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
          </View>

          {/* Precision (Dark) */}
          <View style={styles.accuracyCard}>
            <Text style={styles.watermarkBracket}>{'>'}</Text>
            <Text style={styles.metricLabelLight}>Precision</Text>
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
          </View>

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

        {/* Concept Mastery */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Concept Mastery</Text>
            <Feather name="chevron-right" size={20} color="#586062" />
          </View>
          {conceptMastery.length === 0 ? (
            <View style={styles.emptySection}>
              <Text style={styles.emptyText}>문제를 풀면 패턴별 마스터리가 표시됩니다</Text>
            </View>
          ) : (
            <View style={styles.masteryList}>
              {conceptMastery.map((item) => (
                <View key={item.conceptTag} style={styles.masteryItem}>
                  <View style={styles.masteryTop}>
                    <Text style={styles.masteryName}>{getTagLabel(item.conceptTag)}</Text>
                    <Text style={styles.masteryPercent}>{Math.round(item.averageScore)}%</Text>
                  </View>
                  <View style={styles.masteryTrack}>
                    <View style={[styles.masteryFill, { width: `${Math.round(item.averageScore)}%` }]} />
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Monthly Activity */}
        <View style={styles.section}>
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
            <View style={styles.chartArea}>
              {monthlyActivity.map((week, i) => {
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
  avatarText: { fontSize: 14, fontFamily: FONTS.bold, color: COLORS.white },

  header: { paddingHorizontal: 24, paddingTop: 16, paddingBottom: 48 },
  headerTitle: { fontFamily: FONTS.black, fontSize: 48, letterSpacing: -1.2, lineHeight: 48, color: '#14532D' },
  headerSubtitle: { fontFamily: FONTS.medium, fontSize: 18, lineHeight: 28, color: '#586062', marginTop: 8 },

  bentoGrid: { paddingHorizontal: 24, gap: 24, marginBottom: 48 },

  volumeCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 24,
    padding: 33,
    borderWidth: 1,
    borderColor: 'rgba(193, 200, 194, 0.1)',
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

  masteryList: { gap: 32 },
  masteryItem: { gap: 12 },
  masteryTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  masteryName: { fontFamily: FONTS.bold, fontSize: 20, lineHeight: 28, color: '#14532D' },
  masteryPercent: { fontFamily: FONTS.bold, fontSize: 16, lineHeight: 24, color: '#586062' },
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
});
