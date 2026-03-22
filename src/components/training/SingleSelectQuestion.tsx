import { View, StyleSheet } from 'react-native';
import { Chip } from '@/src/components/ui/Chip';
import { getTagLabel } from '@/src/lib/tagLabels';

interface Props {
  options: string[];
  selected: string | undefined;
  onSelect: (value: string) => void;
}

export function SingleSelectQuestion({ options, selected, onSelect }: Props) {
  return (
    <View style={styles.wrap}>
      {options.map((opt) => (
        <Chip
          key={opt}
          label={getTagLabel(opt)}
          selected={selected === opt}
          onPress={() => onSelect(opt)}
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
