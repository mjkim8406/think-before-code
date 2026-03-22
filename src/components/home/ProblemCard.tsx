import { View, StyleSheet, Text } from 'react-native';
import { COLORS, CONCEPT_TAG_LABELS } from '@/src/lib/constants';
import type { Problem } from '@/src/types';
import type { ConceptTag } from '@/src/lib/constants';

interface ProblemCardProps {
  problem: Problem;
  platform?: string;
  titleKo?: string;
  titleEn?: string;
}

function difficultyStyle(d: string) {
  switch (d) {
    case 'easy':
      return { color: COLORS.green800, bg: COLORS.green50 };
    case 'medium':
      return { color: '#B45309', bg: '#FFFBEB' };
    case 'hard':
      return { color: '#EF4444', bg: '#FEF2F2' };
    default:
      return { color: COLORS.textSecondary, bg: 'transparent' };
  }
}

function difficultyLabel(d: string) {
  switch (d) {
    case 'easy': return 'Easy';
    case 'medium': return 'Medium';
    case 'hard': return 'Hard';
    default: return d;
  }
}

export function ProblemCard({ problem, platform = 'LeetCode', titleKo, titleEn }: ProblemCardProps) {
  const diff = difficultyStyle(problem.difficulty);

  // Parse title: if titleKo/titleEn not provided, try to split from problem.title
  let koTitle = titleKo;
  let enTitle = titleEn;
  if (!koTitle || !enTitle) {
    const match = problem.title.match(/^(.+?)\s*\((.+?)\)$/);
    if (match) {
      koTitle = koTitle ?? match[1];
      enTitle = enTitle ?? match[2];
    } else {
      koTitle = koTitle ?? problem.title;
      enTitle = enTitle ?? '';
    }
  }

  return (
    <View style={styles.card}>
      {/* Accent bar at top */}
      <View style={styles.accentBar} />

      <View style={styles.body}>
        {/* Top row: platform + difficulty */}
        <View style={styles.topRow}>
          <Text style={styles.platformBadge}>{platform}</Text>
          <View style={[styles.diffBadge, { backgroundColor: diff.bg }]}>
            <Text style={[styles.diffText, { color: diff.color }]}>
              {difficultyLabel(problem.difficulty)}
            </Text>
          </View>
        </View>

        {/* Title */}
        <Text style={styles.titleKo}>{koTitle}</Text>
        {enTitle ? <Text style={styles.titleEn}>{enTitle}</Text> : null}

        {/* Concept tags */}
        <View style={styles.conceptTags}>
          {problem.conceptTags.slice(0, 3).map((tag) => (
            <View key={tag} style={styles.conceptTag}>
              <View style={styles.tagDot} />
              <Text style={styles.tagText}>
                {CONCEPT_TAG_LABELS[tag as ConceptTag] ?? tag}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.04,
    shadowRadius: 16,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.03)',
  },
  accentBar: {
    height: 4,
    backgroundColor: COLORS.green500,
  },
  body: {
    padding: 22,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  platformBadge: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: COLORS.green800,
    backgroundColor: COLORS.green50,
    borderWidth: 1,
    borderColor: COLORS.green100,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    overflow: 'hidden',
  },
  diffBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  diffText: {
    fontSize: 11,
    fontWeight: '700',
  },
  titleKo: {
    fontSize: 22,
    fontWeight: '800',
    color: '#2C2C24',
    letterSpacing: -0.3,
    marginBottom: 3,
  },
  titleEn: {
    fontSize: 14,
    fontWeight: '500',
    color: '#8A8A7A',
    marginBottom: 16,
  },
  conceptTags: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  conceptTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: COLORS.sand100,
    borderWidth: 1,
    borderColor: COLORS.sand200,
  },
  tagDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.green500,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#5C5C4F',
  },
});
