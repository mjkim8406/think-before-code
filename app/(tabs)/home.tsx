import React, { useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { COLORS, FONTS } from '@/src/lib/constants';
import { useHomeData } from '@/src/hooks/useHomeData';
import type { ActivityDay } from '@/src/services/homeService';

// ─── Logo ──────────────────────────────────────────────────────────────────
function LogoIcon() {
  return (
    <View style={logoStyles.wrap}>
      <Text style={logoStyles.bracket}>&lt;</Text>
      <Text style={logoStyles.arrows}>&gt;&gt;&gt;</Text>
    </View>
  );
}
const logoStyles = StyleSheet.create({
  wrap: { flexDirection: 'row', alignItems: 'center', gap: 1 },
  bracket: {
    fontSize: 26,
    fontFamily: FONTS.black,
    color: COLORS.green800,
    letterSpacing: -1,
    lineHeight: 30,
  },
  arrows: {
    fontSize: 26,
    fontFamily: FONTS.black,
    color: COLORS.green500,
    letterSpacing: -3,
    lineHeight: 30,
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
  const { todaysProblem, streak, activityGrid, totalSolved, learningPath, isLoading, error, refresh } = useHomeData();

  // 탭 전환 시 데이터 새로고침
  useFocusEffect(
    React.useCallback(() => {
      refresh();
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
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>MJ</Text>
          </View>
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
            <Text style={styles.sectionLabel}>TODAY'S PROBLEM</Text>
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
                    <Text style={styles.tagChipText}>{tag}</Text>
                  </View>
                ))}
              </View>
              <Pressable
                style={({ pressed }) => [styles.startBtn, pressed && { opacity: 0.85 }]}
                onPress={handleStartTraining}
              >
                <Text style={styles.startBtnText}>Start Learning</Text>
                <Feather name="arrow-right" size={16} color={COLORS.white} />
              </Pressable>
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

        {/* Insight Card */}
        <View style={styles.section}>
          <View style={styles.insightCard}>
            <View style={styles.insightTop}>
              <Text style={styles.insightLabel}>INSIGHT</Text>
              <Feather name="zap" size={14} color={COLORS.green500} />
            </View>
            <Text style={styles.insightTitle}>Algorithmic Patterns</Text>
            <Text style={styles.insightDesc}>
              Recognizing patterns is faster than memorizing solutions. Focus on the "why" behind each approach.
            </Text>
            <Pressable style={styles.insightArrow}>
              <Feather name="arrow-right" size={16} color={COLORS.green800} />
            </Pressable>
          </View>
        </View>

        {/* Current Streak Card */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>CURRENT STREAK</Text>
          <View style={styles.streakCard}>
            <View style={styles.streakHeader}>
              <View>
                <Text style={styles.streakNumber}>{streak.currentStreak}</Text>
                <Text style={styles.streakUnit}>Days</Text>
              </View>
              <Text style={styles.streakBest}>Best: {streak.longestStreak} days</Text>
            </View>
            <View style={styles.dayRow}>
              {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((day, i) => {
                const done = i < streak.currentStreak;
                const isToday = i === streak.currentStreak;
                return (
                  <View key={day} style={styles.dayItem}>
                    <View style={[
                      styles.dayDot,
                      done && styles.dayDotDone,
                      isToday && styles.dayDotToday,
                    ]}>
                      {done && <Feather name="check" size={10} color={COLORS.white} />}
                    </View>
                    <Text style={[styles.dayLabel, done && styles.dayLabelDone]}>{day}</Text>
                  </View>
                );
              })}
            </View>
          </View>
        </View>

        {/* Problem History / Activity Grid */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>PROBLEM HISTORY</Text>
          <View style={styles.activityCard}>
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
          </View>
        </View>

        {/* Learning Path Card */}
        {learningPath && (
          <View style={[styles.section, { marginBottom: 8 }]}>
            <Text style={styles.sectionLabel}>LEARNING PATH</Text>
            <View style={styles.learningCard}>
              <View style={styles.learningTop}>
                <Text style={styles.learningBadge}>
                  {learningPath.problemsSolved > 0 ? 'IN PROGRESS' : 'RECOMMENDED'}
                </Text>
                <Feather name="book" size={16} color="rgba(255,255,255,0.6)" />
              </View>
              <Text style={styles.learningTitle}>{learningPath.label}</Text>
              <Text style={styles.learningDesc}>
                {learningPath.problemsSolved} / {learningPath.totalProblems} problems solved
                {learningPath.averageScore > 0 ? ` · Avg ${learningPath.averageScore}pts` : ''}
              </Text>
              <View style={styles.learningProgressBg}>
                <View
                  style={[
                    styles.learningProgressFill,
                    {
                      width: learningPath.totalProblems > 0
                        ? `${Math.round((learningPath.problemsSolved / learningPath.totalProblems) * 100)}%`
                        : '0%',
                    },
                  ]}
                />
              </View>
              <View style={styles.learningFooter}>
                <Text style={styles.learningProgress}>
                  {learningPath.totalProblems > 0
                    ? `${Math.round((learningPath.problemsSolved / learningPath.totalProblems) * 100)}% complete`
                    : 'Start learning'}
                </Text>
                <Pressable
                  style={styles.resumeBtn}
                  onPress={() => router.push('/(tabs)/library' as any)}
                >
                  <Text style={styles.resumeBtnText}>
                    {learningPath.problemsSolved > 0 ? 'Resume Path' : 'Start Path'}
                  </Text>
                  <Feather name="arrow-right" size={12} color={COLORS.green800} />
                </Pressable>
              </View>
            </View>
          </View>
        )}

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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
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
    letterSpacing: -0.3,
  },

  // Insight Card
  insightCard: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
  },
  insightTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  insightLabel: {
    fontSize: 10,
    fontFamily: FONTS.bold,
    color: COLORS.green500,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  insightTitle: {
    fontSize: 18,
    fontFamily: FONTS.bold,
    color: COLORS.text,
    letterSpacing: -0.4,
    marginBottom: 6,
  },
  insightDesc: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: COLORS.figmaSubtext,
    lineHeight: 20,
    marginBottom: 12,
  },
  insightArrow: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.sand100,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
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
});
