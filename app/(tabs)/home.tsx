import React, { useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { COLORS, FONTS } from '@/src/lib/constants';
import { useHomeData } from '@/src/hooks/useHomeData';
import { useProfileData } from '@/src/hooks/useProfileData';
import { useDailyGoal } from '@/src/hooks/useDailyGoal';
import type { ActivityDay } from '@/src/services/homeService';
import { getTagLabel } from '@/src/lib/tagLabels';
import type { RecommendationResult } from '@/src/lib/recommendation';
import { COURSE_LEVEL_LABELS, MAIN_PATH } from '@/src/data/coursePaths';

// ─── Logo ──────────────────────────────────────────────────────────────────
function LogoIcon() {
  return (
    <View style={logoStyles.wrap}>
      <Text style={[logoStyles.ch, { color: COLORS.green800 }]}>&lt;</Text>
      <Text style={[logoStyles.ch, { color: COLORS.green600 }]}>&gt;</Text>
      <Text style={[logoStyles.ch, { color: COLORS.green500 }]}>&gt;</Text>
      <Text style={[logoStyles.ch, { color: COLORS.green400 }]}>&gt;</Text>
    </View>
  );
}
const logoStyles = StyleSheet.create({
  wrap: { flexDirection: 'row', alignItems: 'center' },
  ch: {
    fontSize: 26,
    fontFamily: FONTS.black,
    letterSpacing: -1,
    lineHeight: 30,
    marginRight: -2,
  },
});

// ─── Difficulty Badge ────────────────────────────────────────────────────
function DiffBadge({ difficulty }: { difficulty: 'easy' | 'medium' | 'hard' }) {
  const config = {
    easy: { bg: COLORS.figmaEasyBg, text: COLORS.figmaEasyText, label: 'Easy' },
    medium: { bg: COLORS.figmaMediumBg, text: COLORS.figmaMediumText, label: 'Medium' },
    hard: { bg: COLORS.figmaHardBg, text: COLORS.figmaHardText, label: 'Hard' },
  }[difficulty];
  return (
    <View style={[styles.easyBadge, { backgroundColor: config.bg }]}>
      <Text style={[styles.easyBadgeText, { color: config.text }]}>{config.label}</Text>
    </View>
  );
}

// ─── Activity Grid (실제 데이터 기반) ────────────────────────────────────
function buildGridFromActivity(activityDays: ActivityDay[]): string[][] {
  const today = new Date();
  const dayMap = new Map<string, number>();
  activityDays.forEach((d) => dayMap.set(d.date, d.count));

  // 20주 x 7일 그리드
  const weeks: string[][] = [];
  for (let w = 0; w < 20; w++) {
    const week: string[] = [];
    for (let d = 0; d < 7; d++) {
      const date = new Date(today);
      date.setDate(today.getDate() - (19 - w) * 7 - (6 - d));
      const dateStr = date.toISOString().split('T')[0];

      if (date > today) {
        week.push('future');
      } else if (dateStr === today.toISOString().split('T')[0]) {
        const count = dayMap.get(dateStr) ?? 0;
        week.push(count > 0 ? 'today_done' : 'today');
      } else {
        const count = dayMap.get(dateStr) ?? 0;
        if (count === 0) week.push('empty');
        else if (count === 1) week.push('done');
        else week.push('strong');
      }
    }
    weeks.push(week);
  }
  return weeks;
}

function DotCell({ type, size = 11 }: { type: string; size?: number }) {
  const r = Math.max(2, Math.floor(size * 0.25));
  const base: any = { width: size, height: size, borderRadius: r };
  switch (type) {
    case 'strong':     return <View style={[base, { backgroundColor: COLORS.green800 }]} />;
    case 'done':       return <View style={[base, { backgroundColor: COLORS.green400 }]} />;
    case 'today_done': return <View style={[base, { backgroundColor: COLORS.green500, borderWidth: 1.5, borderColor: COLORS.green800 }]} />;
    case 'today':      return <View style={[base, { backgroundColor: COLORS.green100, borderWidth: 1.5, borderColor: COLORS.green500 }]} />;
    case 'future':     return <View style={[base, { backgroundColor: COLORS.sand50, borderWidth: 1, borderColor: COLORS.sand200 }]} />;
    default:           return <View style={[base, { backgroundColor: COLORS.sand100 }]} />;
  }
}

function ActivityGrid({ activityDays }: { activityDays: ActivityDay[] }) {
  const scrollRef = React.useRef<ScrollView>(null);
  const dayLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const CELL_SIZE = 11;
  const CELL_GAP = 3;
  const DAY_LABEL_WIDTH = 10;
  const LABEL_GAP = 8;

  const gridData = useMemo(() => buildGridFromActivity(activityDays), [activityDays]);

  return (
    <View style={{ flexDirection: 'row', gap: LABEL_GAP, alignItems: 'flex-start' }}>
      <View style={{ gap: CELL_GAP }}>
        {dayLabels.map((label, i) => (
          <Text
            key={i}
            style={{
              fontSize: 7,
              fontFamily: FONTS.semiBold,
              color: COLORS.sand300,
              width: DAY_LABEL_WIDTH,
              height: CELL_SIZE,
              lineHeight: CELL_SIZE,
              letterSpacing: 0.3,
            }}
          >
            {label}
          </Text>
        ))}
      </View>
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: false })}
      >
        <View style={{ flexDirection: 'row', gap: CELL_GAP }}>
          {gridData.map((week, wIdx) => (
            <View key={wIdx} style={{ gap: CELL_GAP }}>
              {week.map((cell, dIdx) => (
                <DotCell key={`${wIdx}-${dIdx}`} type={cell} size={CELL_SIZE} />
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────
export default function HomeScreen() {
  const router = useRouter();
  const { todaysProblem, streak, activityGrid, totalSolved, learningPath, recommendation, isLoading, error, refresh } = useHomeData();
  const { profile, refresh: refreshProfile } = useProfileData();
  const { goal: dailyGoal, enabled: goalEnabled, reload: reloadGoal } = useDailyGoal();

  // 탭 전환 시 데이터 새로고침
  useFocusEffect(
    React.useCallback(() => {
      refresh();
      refreshProfile();
      reloadGoal();
    }, [])
  );

  function handleStartTraining() {
    if (!todaysProblem) return;
    router.push(`/training/reading?problemId=${todaysProblem.id}` as any);
  }

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

        {/* Hero */}
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>
            Think<Text style={styles.heroDot}>.</Text>
          </Text>
          <Text style={styles.heroSubtitle}> before you code</Text>
        </View>

        {/* Today's Problem Card */}
        {todaysProblem ? (
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>
              TODAY'S PROBLEM{goalEnabled ? ` · 목표 ${dailyGoal}문제` : ''}
            </Text>
            <View style={styles.problemCard}>
              <View style={styles.cardTopRow}>
                <DiffBadge difficulty={todaysProblem.difficulty} />
                <Text style={styles.platformText}>{todaysProblem.domain}</Text>
              </View>
              <Text style={styles.problemTitle}>{todaysProblem.title}</Text>
              <Text style={styles.problemDesc}>{todaysProblem.summary}</Text>
              <View style={styles.tagRow}>
                {todaysProblem.tags.map((tag) => (
                  <View key={tag} style={styles.tagChip}>
                    <Text style={styles.tagChipText}>{getTagLabel(tag)}</Text>
                  </View>
                ))}
              </View>
              {todaysProblem.completedToday ? (
                <View style={styles.completedBanner}>
                  <Feather name="check-circle" size={16} color={COLORS.green800} />
                  <Text style={styles.completedText}>오늘의 문제 완료!</Text>
                </View>
              ) : (
                <Pressable
                  style={({ pressed }) => [styles.startBtn, pressed && { opacity: 0.85 }]}
                  onPress={handleStartTraining}
                >
                  <Text style={styles.startBtnText}>Start Learning</Text>
                  <Feather name="arrow-right" size={16} color={COLORS.white} />
                </Pressable>
              )}
            </View>
          </View>
        ) : (
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>TODAY'S PROBLEM</Text>
            <View style={styles.problemCard}>
              <Text style={styles.problemTitle}>🎉 모든 문제 완료!</Text>
              <Text style={styles.problemDesc}>
                모든 문제를 풀었습니다. 라이브러리에서 다시 풀어볼 문제를 선택하세요.
              </Text>
            </View>
          </View>
        )}

        {/* Recommendation Card — 코스 경로 기반 추천 */}
        {recommendation && (
          <View style={[styles.section, { marginBottom: 8 }]}>
            <Text style={styles.sectionLabel}>COURSE PATH</Text>

            {/* 코스 경로 진행률 바 (10 topics — compact 2-row) */}
            <View style={styles.coursePathWrap}>
              {(() => {
                const currentOrder = MAIN_PATH.find(t => t.id === recommendation.courseProgress.currentTopic)?.order ?? 0;
                const rowSize = Math.ceil(MAIN_PATH.length / 2);
                return [0, rowSize].map((rowStart) => (
                <View key={rowStart} style={styles.coursePathRow}>
                  {MAIN_PATH.slice(rowStart, rowStart + rowSize).map((topic, idx) => {
                    const globalIdx = rowStart + idx;
                    const isCurrent = topic.id === recommendation.courseProgress.currentTopic;
                    const isDone = topic.order < currentOrder;
                    return (
                      <View key={topic.id} style={styles.coursePathStep}>
                        <View style={[
                          styles.coursePathDot,
                          isDone && styles.coursePathDotDone,
                          isCurrent && styles.coursePathDotCurrent,
                        ]}>
                          {isDone && <Feather name="check" size={8} color={COLORS.white} />}
                          {isCurrent && <Text style={styles.coursePathDotText}>{topic.emoji}</Text>}
                          {!isDone && !isCurrent && <Text style={styles.coursePathDotTextDim}>{globalIdx + 1}</Text>}
                        </View>
                        <Text style={[
                          styles.coursePathLabel,
                          isDone && styles.coursePathLabelDone,
                          isCurrent && styles.coursePathLabelCurrent,
                        ]} numberOfLines={1}>{topic.label}</Text>
                        {idx < rowSize - 1 && (
                          <View style={[styles.coursePathLine, isDone && styles.coursePathLineDone]} />
                        )}
                      </View>
                    );
                  })}
                </View>
                ));
              })()}
            </View>

            <Pressable
              style={({ pressed }) => [styles.learningCard, pressed && { opacity: 0.9 }]}
              onPress={() => {
                router.push(`/(tabs)/library?category=${recommendation.primary.topic}` as any);
              }}
            >
              <View style={styles.learningTop}>
                <Text style={styles.learningBadge}>
                  {COURSE_LEVEL_LABELS[recommendation.primary.level].toUpperCase()}
                </Text>
                <Feather name="compass" size={16} color="rgba(255,255,255,0.6)" />
              </View>
              <Text style={styles.learningTitle}>
                {recommendation.primary.title}
              </Text>
              <Text style={styles.learningDesc}>
                {recommendation.primary.reason}
              </Text>
              <View style={styles.courseStartBtn}>
                <Text style={styles.courseStartBtnText}>Start Course</Text>
                <Feather name="arrow-right" size={14} color={COLORS.green800} />
              </View>
            </Pressable>

            {/* 추가 추천 카드들 */}
            {recommendation.secondary.length > 0 && (
              <View style={styles.secondaryRecs}>
                {recommendation.secondary.map((rec, idx) => (
                  <Pressable
                    key={`rec-${idx}`}
                    style={({ pressed }) => [styles.secondaryRecCard, pressed && { opacity: 0.8 }]}
                    onPress={() => router.push(`/(tabs)/library?category=${rec.topic}` as any)}
                  >
                    <View style={styles.secondaryRecTop}>
                      <Text style={styles.secondaryRecLevel}>
                        {COURSE_LEVEL_LABELS[rec.level]}
                      </Text>
                      <Feather name="chevron-right" size={14} color={COLORS.textTertiary} />
                    </View>
                    <Text style={styles.secondaryRecTitle}>{rec.title}</Text>
                    <Text style={styles.secondaryRecReason} numberOfLines={2}>
                      {rec.reason}
                    </Text>
                  </Pressable>
                ))}
              </View>
            )}
          </View>
        )}

        {/* Learning Path Card (fallback — 추천이 없을 때) */}
        {!recommendation && (
          <View style={[styles.section, { marginBottom: 8 }]}>
            <Text style={styles.sectionLabel}>LEARNING PATH</Text>
            <Pressable
              style={({ pressed }) => [styles.learningCard, pressed && { opacity: 0.9 }]}
              onPress={() => {
                const tag = learningPath?.conceptTag;
                if (tag) {
                  router.push(`/(tabs)/library?category=${tag}` as any);
                } else {
                  router.push('/(tabs)/library' as any);
                }
              }}
            >
              <View style={styles.learningTop}>
                <Text style={styles.learningBadge}>
                  {learningPath && learningPath.problemsSolved > 0 ? 'IN PROGRESS' : 'RECOMMENDED'}
                </Text>
                <Feather name="book" size={16} color="rgba(255,255,255,0.6)" />
              </View>
              <Text style={styles.learningTitle}>
                {learningPath?.label ?? 'Dynamic Programming'}
              </Text>
              <Text style={styles.learningDesc}>
                {learningPath
                  ? `${learningPath.problemsSolved} / ${learningPath.totalProblems} problems solved${learningPath.averageScore > 0 ? ` · Avg ${learningPath.averageScore}pts` : ''}`
                  : '라이브러리에서 문제를 풀어보세요'}
              </Text>
              <View style={styles.learningProgressBg}>
                <View
                  style={[
                    styles.learningProgressFill,
                    {
                      width: learningPath && learningPath.totalProblems > 0
                        ? `${Math.round((learningPath.problemsSolved / learningPath.totalProblems) * 100)}%`
                        : '0%',
                    },
                  ]}
                />
              </View>
              <View style={styles.learningFooter}>
                <Text style={styles.learningProgress}>
                  {learningPath && learningPath.totalProblems > 0
                    ? `${Math.round((learningPath.problemsSolved / learningPath.totalProblems) * 100)}% complete`
                    : 'Start learning'}
                </Text>
                <View style={styles.resumeBtn}>
                  <Text style={styles.resumeBtnText}>
                    {learningPath && learningPath.problemsSolved > 0 ? 'Resume Path' : 'Start Path'}
                  </Text>
                  <Feather name="arrow-right" size={12} color={COLORS.green800} />
                </View>
              </View>
            </Pressable>
          </View>
        )}

        {/* Current Streak Card */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>CURRENT STREAK</Text>
          <Pressable
            style={({ pressed }) => [styles.streakCard, pressed && { opacity: 0.85 }]}
            onPress={() => router.push('/(tabs)/stats' as any)}
          >
            <View style={styles.streakHeader}>
              <View>
                <Text style={styles.streakNumber}>{streak.currentStreak}</Text>
                <Text style={styles.streakUnit}>Days</Text>
              </View>
              <Text style={styles.streakBest}>Best: {streak.longestStreak} days</Text>
            </View>
            <View style={styles.dayRow}>
              {(() => {
                const labels = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
                const now = new Date();
                // JS getDay: 0=Sun. 월요일 기준 인덱스로 변환
                const todayIdx = (now.getDay() + 6) % 7; // 0=Mon ... 6=Sun

                // 이번 주 활동일 Set 만들기 (activityGrid에서)
                const weekStart = new Date(now);
                weekStart.setDate(now.getDate() - todayIdx);
                weekStart.setHours(0, 0, 0, 0);

                const activeDays = new Set<number>();
                for (const day of activityGrid) {
                  const d = new Date(day.date + 'T00:00:00');
                  if (d >= weekStart && d <= now && day.count > 0) {
                    activeDays.add((d.getDay() + 6) % 7);
                  }
                }

                return labels.map((label, i) => {
                  const done = activeDays.has(i);
                  const isToday = i === todayIdx;
                  return (
                    <View key={label} style={styles.dayItem}>
                      <View style={[
                        styles.dayDot,
                        done && styles.dayDotDone,
                        isToday && !done && styles.dayDotToday,
                      ]}>
                        {done && <Feather name="check" size={10} color={COLORS.white} />}
                      </View>
                      <Text style={[styles.dayLabel, done && styles.dayLabelDone]}>{label}</Text>
                    </View>
                  );
                });
              })()}
            </View>
          </Pressable>
        </View>

        {/* Problem History / Activity Grid */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>PROBLEM HISTORY</Text>
          <Pressable
            style={({ pressed }) => [styles.activityCard, pressed && { opacity: 0.85 }]}
            onPress={() => router.push('/(tabs)/stats?scrollTo=activity' as any)}
          >
            <View style={styles.activityHeader}>
              <Text style={styles.activityCount}>{totalSolved}</Text>
              <Text style={styles.activityCountLabel}> problems solved</Text>
            </View>
            <ActivityGrid activityDays={activityGrid} />
            <View style={styles.legend}>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: COLORS.sand100 }]} />
                <Text style={styles.legendText}>None</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: COLORS.green400 }]} />
                <Text style={styles.legendText}>Solved</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: COLORS.green800 }]} />
                <Text style={styles.legendText}>Strong</Text>
              </View>
            </View>
          </Pressable>
        </View>

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  scroll: { flex: 1 },
  content: { paddingBottom: 24 },

  // Nav
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
  avatarImg: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  avatarText: {
    fontSize: 14,
    fontFamily: FONTS.bold,
    color: COLORS.white,
  },

  // Hero
  hero: {
    paddingHorizontal: 24,
    paddingTop: 18,
    paddingBottom: 24,
  },
  heroTitle: {
    fontSize: 72,
    fontFamily: FONTS.black,
    color: COLORS.green800,
    letterSpacing: -3.6,
    lineHeight: 72,
  },
  heroDot: {
    color: COLORS.green500,
  },
  heroSubtitle: {
    fontSize: 24,
    fontFamily: FONTS.regular,
    color: COLORS.figmaSubtext,
    letterSpacing: -0.6,
    marginTop: 4,
  },

  // Section
  section: {
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 11,
    fontFamily: FONTS.bold,
    color: COLORS.textTertiary,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 12,
  },

  // Problem Card
  problemCard: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.06)',
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  easyBadge: {
    backgroundColor: COLORS.figmaEasyBg,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 8,
  },
  easyBadgeText: {
    fontSize: 12,
    fontFamily: FONTS.semiBold,
    color: COLORS.figmaEasyText,
  },
  platformText: {
    fontSize: 12,
    fontFamily: FONTS.medium,
    color: COLORS.figmaSubtext,
  },
  problemTitle: {
    fontSize: 32,
    fontFamily: FONTS.bold,
    color: COLORS.text,
    letterSpacing: -0.8,
    marginBottom: 10,
  },
  problemDesc: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: COLORS.figmaSubtext,
    lineHeight: 21,
    marginBottom: 14,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 18,
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
  startBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 52,
    borderRadius: 14,
    backgroundColor: COLORS.green800,
    boxShadow: '0px 4px 12px rgba(1, 45, 29, 0.4)',
  },
  startBtnText: {
    fontSize: 16,
    fontFamily: FONTS.bold,
    color: COLORS.white,
    letterSpacing: -0.3,
  },
  completedBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 48,
    borderRadius: 14,
    backgroundColor: COLORS.green50,
    borderWidth: 1,
    borderColor: COLORS.green100,
  },
  completedText: {
    fontSize: 15,
    fontFamily: FONTS.bold,
    color: COLORS.green800,
  },

  // Streak Card
  streakCard: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
  },
  streakHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  streakNumber: {
    fontSize: 52,
    fontFamily: FONTS.black,
    color: COLORS.figmaDarkGreen,
    letterSpacing: -2,
    lineHeight: 52,
  },
  streakUnit: {
    fontSize: 18,
    fontFamily: FONTS.semiBold,
    color: COLORS.figmaSubtext,
    marginTop: 4,
  },
  streakBest: {
    fontSize: 13,
    fontFamily: FONTS.medium,
    color: COLORS.figmaSubtext,
    marginBottom: 6,
  },
  dayRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayItem: {
    alignItems: 'center',
    gap: 4,
  },
  dayDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.sand100,
    borderWidth: 1.5,
    borderColor: COLORS.sand200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayDotDone: {
    backgroundColor: COLORS.green400,
    borderColor: COLORS.green400,
  },
  dayDotToday: {
    backgroundColor: COLORS.green100,
    borderColor: COLORS.green500,
  },
  dayLabel: {
    fontSize: 9,
    fontFamily: FONTS.semiBold,
    color: COLORS.sand300,
    letterSpacing: 0.3,
  },
  dayLabelDone: {
    color: COLORS.green800,
  },

  // Activity Grid Card
  activityCard: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
  },
  activityHeader: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 16,
  },
  activityCount: {
    fontSize: 28,
    fontFamily: FONTS.black,
    color: COLORS.figmaDarkGreen,
    letterSpacing: -1,
  },
  activityCountLabel: {
    fontSize: 14,
    fontFamily: FONTS.medium,
    color: COLORS.figmaSubtext,
  },
  legend: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  legendDot: {
    width: 9,
    height: 9,
    borderRadius: 2,
  },
  legendText: {
    fontSize: 11,
    fontFamily: FONTS.medium,
    color: COLORS.figmaSubtext,
  },

  // Learning Path Card
  learningCard: {
    backgroundColor: COLORS.figmaDarkGreen,
    borderRadius: 20,
    padding: 22,
  },
  learningTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  learningBadge: {
    fontSize: 10,
    fontFamily: FONTS.bold,
    color: COLORS.figmaEasyBg,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  learningTitle: {
    fontSize: 22,
    fontFamily: FONTS.bold,
    color: COLORS.white,
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  learningDesc: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: 'rgba(255,255,255,0.65)',
    lineHeight: 20,
    marginBottom: 16,
  },
  learningProgressBg: {
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.15)',
    marginBottom: 12,
    overflow: 'hidden',
  },
  learningProgressFill: {
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.figmaEasyBg,
  },
  learningFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  learningProgress: {
    fontSize: 12,
    fontFamily: FONTS.medium,
    color: 'rgba(255,255,255,0.5)',
  },
  resumeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: COLORS.figmaEasyBg,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
  },
  resumeBtnText: {
    fontSize: 12,
    fontFamily: FONTS.semiBold,
    color: COLORS.green800,
  },

  // Course Start Button (full-width)
  courseStartBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 16,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: COLORS.figmaEasyBg,
  },
  courseStartBtnText: {
    fontSize: 14,
    fontFamily: FONTS.bold,
    color: COLORS.green800,
  },

  // Course Path Progress Bar (2-row × 5 compact layout)
  coursePathWrap: {
    marginBottom: 14,
    gap: 8,
  },
  coursePathRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 2,
  },
  coursePathStep: {
    alignItems: 'center',
    flex: 1,
    position: 'relative',
  },
  coursePathDot: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: COLORS.sand100,
    borderWidth: 1.5,
    borderColor: COLORS.sand200,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  coursePathDotDone: {
    backgroundColor: COLORS.green500,
    borderColor: COLORS.green500,
  },
  coursePathDotCurrent: {
    backgroundColor: COLORS.green800,
    borderColor: COLORS.green800,
  },
  coursePathDotText: {
    fontSize: 10,
    lineHeight: 14,
  },
  coursePathDotTextDim: {
    fontSize: 9,
    fontFamily: FONTS.bold,
    color: COLORS.textTertiary,
  },
  coursePathLabel: {
    fontSize: 8,
    fontFamily: FONTS.medium,
    color: COLORS.textTertiary,
    marginTop: 3,
    letterSpacing: -0.3,
    textAlign: 'center',
  },
  coursePathLabelDone: {
    color: COLORS.green600,
    fontFamily: FONTS.semiBold,
  },
  coursePathLabelCurrent: {
    color: COLORS.green800,
    fontFamily: FONTS.bold,
    fontSize: 9,
  },
  coursePathLine: {
    position: 'absolute',
    top: 10,
    left: '60%',
    right: '-40%',
    height: 1.5,
    backgroundColor: COLORS.sand200,
    zIndex: 0,
  },
  coursePathLineDone: {
    backgroundColor: COLORS.green400,
  },

  // Secondary Recommendation Cards
  secondaryRecs: {
    gap: 10,
    marginTop: 12,
  },
  secondaryRecCard: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
  },
  secondaryRecTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  secondaryRecLevel: {
    fontSize: 10,
    fontFamily: FONTS.bold,
    color: COLORS.green600,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  secondaryRecTitle: {
    fontSize: 16,
    fontFamily: FONTS.bold,
    color: COLORS.text,
    letterSpacing: -0.3,
    marginBottom: 4,
  },
  secondaryRecReason: {
    fontSize: 13,
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },
});
