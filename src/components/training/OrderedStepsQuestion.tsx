/**
 * OrderedStepsQuestion — 드래그 없이 탭으로 순서 지정
 *
 * 상단: 아직 선택 안 한 스텝 (탭하면 하단에 추가)
 * 하단: 선택된 순서 (탭하면 제거)
 *
 * react-native-draggable-flatlist 없이도 직관적으로 동작
 */

import { View, StyleSheet, Text, Pressable } from 'react-native';
import { COLORS, FONTS } from '@/src/lib/constants';
import type { StepItem } from '@/src/types';

interface Props {
  catalog: StepItem[];
  currentOrder: string[];   // 유저가 선택한 순서 (id 배열)
  onOrderChange: (newOrder: string[]) => void;
}

export function OrderedStepsQuestion({ catalog, currentOrder, onOrderChange }: Props) {
  const selectedSet = new Set(currentOrder);
  const remaining = catalog.filter((s) => !selectedSet.has(s.id));
  const catalogMap = new Map(catalog.map((s) => [s.id, s]));

  const handleAdd = (id: string) => {
    onOrderChange([...currentOrder, id]);
  };

  const handleRemove = (id: string) => {
    onOrderChange(currentOrder.filter((i) => i !== id));
  };

  return (
    <View>
      {/* 선택된 순서 */}
      {currentOrder.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>선택한 순서</Text>
          {currentOrder.map((id, idx) => {
            const item = catalogMap.get(id);
            if (!item) return null;
            return (
              <Pressable
                key={id}
                style={styles.selectedItem}
                onPress={() => handleRemove(id)}
              >
                <View style={styles.orderBadge}>
                  <Text style={styles.orderNumber}>{idx + 1}</Text>
                </View>
                <Text style={styles.itemLabel} numberOfLines={2}>{item.label}</Text>
                <Text style={styles.removeIcon}>✕</Text>
              </Pressable>
            );
          })}
        </View>
      )}

      {/* 남은 스텝 */}
      {remaining.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>
            {currentOrder.length === 0 ? '순서대로 탭하세요' : '남은 항목'}
          </Text>
          {remaining.map((item) => (
            <Pressable
              key={item.id}
              style={styles.remainingItem}
              onPress={() => handleAdd(item.id)}
            >
              <Text style={styles.addIcon}>+</Text>
              <Text style={styles.itemLabel} numberOfLines={2}>{item.label}</Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    fontFamily: FONTS.bold,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    color: COLORS.textTertiary,
    marginBottom: 10,
  },
  selectedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.green50,
    borderWidth: 1.5,
    borderColor: COLORS.green800,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 14,
    marginBottom: 8,
    gap: 12,
  },
  orderBadge: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: COLORS.green800,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderNumber: {
    fontSize: 12,
    fontWeight: '700',
    fontFamily: FONTS.bold,
    color: COLORS.white,
  },
  remainingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderWidth: 1.5,
    borderColor: COLORS.sand200,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 14,
    marginBottom: 8,
    gap: 12,
  },
  addIcon: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: COLORS.sand200,
    textAlign: 'center',
    lineHeight: 26,
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textTertiary,
    overflow: 'hidden',
  },
  itemLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    fontFamily: FONTS.medium,
    color: COLORS.text,
    lineHeight: 20,
  },
  removeIcon: {
    fontSize: 14,
    color: COLORS.textTertiary,
    fontWeight: '600',
  },
});
