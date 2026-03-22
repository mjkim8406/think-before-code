import { View, StyleSheet, Text } from 'react-native';
import { COLORS, CONCEPT_TAG_LABELS } from '@/src/lib/constants';
import type { UserWeakConcept } from '@/src/types';
import type { ConceptTag } from '@/src/lib/constants';

interface WeakConceptCardProps {
  concepts: UserWeakConcept[];
}

export function WeakConceptCard({ concepts }: WeakConceptCardProps) {
  if (concepts.length === 0) return null;

  const top = concepts.slice(0, 3);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>WEAK CONCEPTS</Text>
      <View style={styles.list}>
        {top.map((c, idx) => (
          <View key={c.id} style={styles.item}>
            <View style={styles.rank}>
              <Text style={styles.rankNum}>{idx + 1}</Text>
            </View>
            <Text style={styles.concept}>
              {CONCEPT_TAG_LABELS[c.conceptTag as ConceptTag] ?? c.conceptTag}
            </Text>
            <View style={styles.countBadge}>
              <Text style={styles.countText}>{c.missCount}회</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 22,
    boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.04)',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.03)',
  },
  title: {
    fontSize: 11,
    fontWeight: '700',
    color: '#8A8A7A',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 16,
  },
  list: {
    gap: 12,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  rank: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.sand100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rankNum: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.green800,
  },
  concept: {
    flex: 1,
    fontSize: 14,
    color: '#2C2C24',
    fontWeight: '600',
  },
  countBadge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
    backgroundColor: COLORS.errorDim,
  },
  countText: {
    fontSize: 11,
    color: COLORS.error,
    fontWeight: '700',
  },
});
