import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  TextInput,
  Pressable,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { COLORS, FONTS } from '@/src/lib/constants';
import { useLibraryData } from '@/src/hooks/useLibraryData';
import { useBookmarks } from '@/src/hooks/useBookmarks';
import { useProfileData } from '@/src/hooks/useProfileData';
import { getTagLabel } from '@/src/lib/tagLabels';
import type { LibraryProblemRow } from '@/src/services/libraryService';

// ─── Shared Logo ─────────────────────────────────────────────────────────
function LogoIcon() {
  return (
    <View style={logo.wrap}>
      <Text style={[logo.ch, { color: COLORS.green800 }]}>&lt;</Text>
      <Text style={[logo.ch, { color: COLORS.green600 }]}>&gt;</Text>
      <Text style={[logo.ch, { color: COLORS.green500 }]}>&gt;</Text>
      <Text style={[logo.ch, { color: COLORS.green400 }]}>&gt;</Text>
    </View>
  );
}
const logo = StyleSheet.create({
  wrap: { flexDirection: 'row', alignItems: 'center' },
  ch: { fontSize: 26, fontFamily: FONTS.black, letterSpacing: -1, lineHeight: 30, marginRight: -2 },
});

// ─── Difficulty Badge ────────────────────────────────────────────────────
function DifficultyBadge({ difficulty }: { difficulty: 'easy' | 'medium' | 'hard' }) {
  const config = {
    easy: { bg: COLORS.figmaEasyBg, text: COLORS.figmaEasyText, label: 'Easy' },
    medium: { bg: COLORS.figmaMediumBg, text: COLORS.figmaMediumText, label: 'Medium' },
    hard: { bg: COLORS.figmaHardBg, text: COLORS.figmaHardText, label: 'Hard' },
  }[difficulty];

  return (
    <View style={[styles.diffBadge, { backgroundColor: config.bg }]}>
      <Text style={[styles.diffBadgeText, { color: config.text }]}>{config.label}</Text>
    </View>
  );
}

// ─── Problem Card ────────────────────────────────────────────────────────
function ProblemCard({
  problem,
  isSolved,
  isBookmarked,
  onPress,
  onToggleBookmark,
}: {
  problem: LibraryProblemRow;
  isSolved: boolean;
  isBookmarked: boolean;
  onPress: () => void;
  onToggleBookmark: () => void;
}) {
  return (
    <Pressable
      style={({ pressed }) => [styles.problemCard, pressed && { opacity: 0.85 }]}
      onPress={onPress}
    >
      <View style={styles.cardTopRow}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Text style={styles.problemDomain}>{problem.domain}</Text>
          {isSolved && (
            <View style={styles.solvedBadge}>
              <Feather name="check" size={10} color={COLORS.figmaEasyText} />
              <Text style={styles.solvedBadgeText}>풀이 완료</Text>
            </View>
          )}
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Pressable onPress={onToggleBookmark} hitSlop={8}>
            <Ionicons
              name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
              size={18}
              color={isBookmarked ? COLORS.green800 : COLORS.sand300}
            />
          </Pressable>
          <DifficultyBadge difficulty={problem.difficulty} />
        </View>
      </View>
      <Text style={styles.problemTitle}>{problem.title}</Text>
      <Text style={styles.problemDescription} numberOfLines={2}>
        {problem.summary}
      </Text>
      <View style={styles.tagRow}>
        {problem.tags.map((tag) => (
          <View key={tag} style={styles.tagChip}>
            <Text style={styles.tagChipText}>{getTagLabel(tag)}</Text>
          </View>
        ))}
      </View>
    </Pressable>
  );
}

// ─── Category Tabs ───────────────────────────────────────────────────────
const BOOKMARK_FILTER_KEY = '__bookmarked__';

// key = DB category 컬럼 값 (파일명 기준)
const CATEGORY_LABELS: Record<string, string> = {
  greedy: 'Greedy',
  dp: 'DP',
  graph: 'Graph',
  tree: 'Tree',
  sorting: 'Sorting',
  search: 'Search',
  'number-theory': 'Number Theory',
  combinatorics: 'Combinatorics',
  'data-structures': 'Data Structures',
  geometry: 'Geometry',
};

// ─── Main Screen ─────────────────────────────────────────────────────────
export default function LibraryScreen() {
  const router = useRouter();
  const { category: paramCategory } = useLocalSearchParams<{ category?: string }>();
  const {
    problems,
    solvedIds,
    totalCount,
    solvedCount,
    categories: dbCategories,
    isLoading,
    error,
    search,
    setSearch,
    submitSearch,
    activeCategory,
    setActiveCategory,
    activeDifficulty,
    setActiveDifficulty,
    refresh,
  } = useLibraryData();
  const { bookmarkedIds, toggle: toggleBookmark, refresh: refreshBookmarks } = useBookmarks();
  const { profile, refresh: refreshProfile } = useProfileData();
  const [showBookmarked, setShowBookmarked] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      refresh();
      refreshBookmarks();
      refreshProfile();
      // URL 파라미터로 카테고리 필터 적용 (홈 Learning Path에서 이동 시)
      if (paramCategory) {
        setActiveCategory(paramCategory);
        setShowBookmarked(false);
      }
    }, [paramCategory])
  );

  // DB에서 온 카테고리 + All + Bookmarked 조합
  const categoryTabs = useMemo(() => {
    const tabs: { key: string | null; label: string; count?: number }[] = [
      { key: null, label: 'All' },
      { key: BOOKMARK_FILTER_KEY, label: 'Bookmarked' },
    ];
    for (const cat of dbCategories) {
      tabs.push({
        key: cat.key,
        label: CATEGORY_LABELS[cat.key] ?? cat.key,
        count: cat.count,
      });
    }
    return tabs;
  }, [dbCategories]);

  // 현재 선택된 카테고리 키 (UI 표시용)
  const selectedCategoryKey = showBookmarked ? BOOKMARK_FILTER_KEY : activeCategory;

  function handleCategoryPress(key: string | null) {
    if (key === BOOKMARK_FILTER_KEY) {
      setShowBookmarked(true);
      setActiveCategory(null);
    } else {
      setShowBookmarked(false);
      setActiveCategory(key);
    }
  }

  // Bookmarked 필터 적용
  const filteredProblems = useMemo(() => {
    if (showBookmarked) {
      return problems.filter((p) => bookmarkedIds.has(p.id));
    }
    return problems;
  }, [problems, showBookmarked, bookmarkedIds]);

  function handleProblemPress(problemId: string) {
    router.push(`/problem/${problemId}` as any);
  }

  const progressPercent = totalCount > 0 ? (solvedCount / totalCount) * 100 : 0;

  const listHeader = useMemo(() => (
    <>
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
      <View style={styles.headerSection}>
        <Text style={styles.headerTitle}>Library.</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchWrap}>
        <Feather name="search" size={16} color={COLORS.figmaSubtext} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="문제, 알고리즘, 태그 검색..."
          placeholderTextColor={COLORS.figmaSubtext}
          value={search}
          onChangeText={setSearch}
          onSubmitEditing={submitSearch}
          returnKeyType="search"
        />
        {search.length > 0 && (
          <Pressable onPress={() => setSearch('')} hitSlop={8}>
            <Feather name="x" size={16} color={COLORS.figmaSubtext} />
          </Pressable>
        )}
      </View>

      {/* Category Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryScroll}
        style={styles.categoryScrollWrap}
      >
        {categoryTabs.map((cat) => (
          <Pressable
            key={cat.key ?? 'all'}
            onPress={() => handleCategoryPress(cat.key)}
            style={[
              styles.categoryTab,
              selectedCategoryKey === cat.key && styles.categoryTabActive,
            ]}
          >
            <Text
              style={[
                styles.categoryTabText,
                selectedCategoryKey === cat.key && styles.categoryTabTextActive,
              ]}
            >
              {cat.label}{cat.count != null ? ` ${cat.count}` : ''}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Difficulty Filter */}
      <View style={styles.diffFilterRow}>
        {([null, 'easy', 'medium', 'hard'] as const).map((d) => {
          const label = d === null ? 'All' : d === 'easy' ? 'Easy' : d === 'medium' ? 'Medium' : 'Hard';
          const isActive = activeDifficulty === d;
          return (
            <Pressable
              key={label}
              onPress={() => setActiveDifficulty(d)}
              style={[styles.diffFilterChip, isActive && styles.diffFilterChipActive]}
            >
              <Text style={[styles.diffFilterText, isActive && styles.diffFilterTextActive]}>
                {label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </>
  ), [search, submitSearch, categoryTabs, selectedCategoryKey, activeDifficulty, setSearch, setActiveDifficulty]);

  const listFooter = useMemo(() => (
    <>
      {/* Your Progress */}
      <View style={styles.progressSection}>
        <Text style={styles.sectionLabel}>YOUR PROGRESS</Text>
        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressCount}>{solvedCount}</Text>
            <Text style={styles.progressTotal}> / {totalCount}</Text>
            <Text style={styles.progressSubtext}> SOLVED CHALLENGES</Text>
          </View>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: `${progressPercent}%` }]} />
          </View>
          <Text style={styles.progressNote}>
            {solvedCount === 0
              ? 'Let\'s get started! Pick your first challenge.'
              : solvedCount < 10
                ? 'Keep going! You\'re just getting started.'
                : `Great progress! ${totalCount - solvedCount} more to go.`}
          </Text>
        </View>
      </View>
      <View style={{ height: 24 }} />
    </>
  ), [solvedCount, totalCount, progressPercent]);

  const renderProblemCard = React.useCallback(({ item }: { item: LibraryProblemRow }) => (
    <View style={{ paddingHorizontal: 24, marginBottom: 12 }}>
      <ProblemCard
        problem={item}
        isSolved={solvedIds.has(item.id)}
        isBookmarked={bookmarkedIds.has(item.id)}
        onPress={() => handleProblemPress(item.id)}
        onToggleBookmark={() => toggleBookmark(item.id)}
      />
    </View>
  ), [solvedIds, bookmarkedIds]);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      {isLoading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={COLORS.green800} />
        </View>
      ) : (
        <FlatList
          data={filteredProblems}
          keyExtractor={(item) => item.id}
          renderItem={renderProblemCard}
          ListHeaderComponent={listHeader}
          ListFooterComponent={listFooter}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Ionicons
                name={showBookmarked ? 'bookmark-outline' : 'search'}
                size={32}
                color={COLORS.sand300}
              />
              <Text style={styles.emptyText}>
                {showBookmarked ? '북마크한 문제가 없습니다' : '검색 결과가 없습니다'}
              </Text>
            </View>
          }
          contentContainerStyle={styles.flatListContent}
          showsVerticalScrollIndicator={false}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={5}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  scroll: { flex: 1 },
  content: { paddingBottom: 24 },
  flatListContent: { paddingBottom: 24 },

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

  // Header
  headerSection: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 36,
    fontFamily: FONTS.black,
    color: COLORS.figmaDarkGreen,
    letterSpacing: -1,
    lineHeight: 40,
  },

  // Search
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 24,
    marginBottom: 16,
    backgroundColor: COLORS.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
    paddingHorizontal: 14,
    height: 48,
  },
  searchIcon: { marginRight: 10 },
  searchInput: {
    flex: 1,
    fontSize: 15,
    fontFamily: FONTS.regular,
    color: COLORS.text,
    height: 48,
  },

  // Category Tabs
  categoryScrollWrap: { marginBottom: 20 },
  categoryScroll: { paddingHorizontal: 24, gap: 8 },
  categoryTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
  },
  categoryTabActive: {
    backgroundColor: COLORS.green800,
    borderColor: COLORS.green800,
  },
  categoryTabText: {
    fontSize: 13,
    fontFamily: FONTS.medium,
    color: COLORS.figmaSubtext,
  },
  categoryTabTextActive: {
    color: COLORS.white,
    fontFamily: FONTS.semiBold,
  },

  // Difficulty Filter
  diffFilterRow: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    gap: 8,
    marginBottom: 16,
  },
  diffFilterChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: COLORS.sand100,
    borderWidth: 1,
    borderColor: COLORS.sand200,
  },
  diffFilterChipActive: {
    backgroundColor: COLORS.figmaDarkGreen,
    borderColor: COLORS.figmaDarkGreen,
  },
  diffFilterText: {
    fontSize: 12,
    fontFamily: FONTS.semiBold,
    color: COLORS.figmaSubtext,
  },
  diffFilterTextActive: {
    color: COLORS.white,
  },

  // Problem Cards
  cardList: {
    paddingHorizontal: 24,
    gap: 12,
    marginBottom: 20,
  },
  problemCard: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  problemDomain: {
    fontSize: 11,
    fontFamily: FONTS.bold,
    color: COLORS.figmaSubtext,
    letterSpacing: 1,
  },
  solvedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: COLORS.figmaEasyBg,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  solvedBadgeText: {
    fontSize: 10,
    fontFamily: FONTS.semiBold,
    color: COLORS.figmaEasyText,
  },
  diffBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  diffBadgeText: {
    fontSize: 11,
    fontFamily: FONTS.semiBold,
    letterSpacing: 0.3,
  },
  problemTitle: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    color: COLORS.text,
    letterSpacing: -0.4,
    marginBottom: 8,
  },
  problemDescription: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: COLORS.figmaSubtext,
    lineHeight: 20,
    marginBottom: 14,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  tagChip: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: COLORS.sand100,
    borderWidth: 1,
    borderColor: COLORS.sand200,
  },
  tagChipText: {
    fontSize: 11,
    fontFamily: FONTS.semiBold,
    color: COLORS.textSecondary,
  },

  // Empty State
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
    gap: 12,
  },
  emptyText: {
    fontSize: 15,
    fontFamily: FONTS.medium,
    color: COLORS.figmaSubtext,
  },

  // Section Label
  sectionLabel: {
    fontSize: 11,
    fontFamily: FONTS.bold,
    color: COLORS.textTertiary,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    paddingHorizontal: 24,
    marginBottom: 12,
  },

  // Progress
  progressSection: { marginBottom: 8 },
  progressCard: {
    marginHorizontal: 24,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
  },
  progressHeader: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 12,
  },
  progressCount: {
    fontSize: 28,
    fontFamily: FONTS.black,
    color: COLORS.figmaDarkGreen,
    letterSpacing: -1,
  },
  progressTotal: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    color: COLORS.figmaSubtext,
  },
  progressSubtext: {
    fontSize: 11,
    fontFamily: FONTS.bold,
    color: COLORS.figmaSubtext,
    letterSpacing: 0.5,
  },
  progressBarBg: {
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.sand200,
    marginBottom: 10,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.figmaProgressFill,
  },
  progressNote: {
    fontSize: 13,
    fontFamily: FONTS.regular,
    color: COLORS.figmaSubtext,
  },
});
