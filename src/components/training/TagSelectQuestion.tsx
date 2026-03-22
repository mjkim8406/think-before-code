import { View, StyleSheet } from 'react-native';
import { Chip } from '@/src/components/ui/Chip';
import { getTagLabel } from '@/src/lib/tagLabels';

interface Props {
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
}

export function TagSelectQuestion({ options, selected, onToggle }: Props) {
  const selectedSet = new Set(selected);

  return (
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
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
});
