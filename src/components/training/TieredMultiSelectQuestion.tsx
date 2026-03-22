import { View, StyleSheet, Text } from 'react-native';
import { Chip } from '@/src/components/ui/Chip';
import { getTagLabel } from '@/src/lib/tagLabels';
import { COLORS, FONTS } from '@/src/lib/constants';

interface Props {
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
}

export function TieredMultiSelectQuestion({ options, selected, onToggle }: Props) {
  const selectedSet = new Set(selected);

  return (
    <View>
      <Text style={styles.hint}>해당하는 것을 모두 선택하세요</Text>
      <View style={styles.wrap}>
        {options.map((opt) => (
          <Chip
            key={opt}
            label={getTagLabel(opt)}
            selected={selectedSet.has(opt)}
            onPress={() => onToggle(opt)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  hint: {
    fontSize: 12,
    fontFamily: FONTS.regular,
    color: COLORS.textTertiary,
    marginBottom: 12,
  },
  wrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
});
