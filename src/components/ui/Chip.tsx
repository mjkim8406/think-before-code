import { Pressable, StyleSheet, Text } from 'react-native';
import { COLORS, FONTS } from '@/src/lib/constants';

interface ChipProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  mono?: boolean;
}

export function Chip({ label, selected, onPress, mono }: ChipProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        selected ? styles.selected : styles.unselected,
        pressed && styles.pressed,
      ]}
    >
      <Text style={[styles.text, selected ? styles.selectedText : styles.unselectedText, mono && styles.monoText]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 24,
    borderWidth: 1.5,
  },
  unselected: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.sand200,
  },
  selected: {
    backgroundColor: COLORS.green800,
    borderColor: COLORS.green800,
    boxShadow: '0px 2px 8px rgba(13, 59, 30, 0.25)',
  },
  pressed: {
    opacity: 0.7,
  },
  text: {
    fontSize: 14,
    fontFamily: FONTS.semiBold,
    fontWeight: '600',
  },
  unselectedText: {
    color: COLORS.textSecondary, // sand-700 #5C5C4F
  },
  selectedText: {
    color: COLORS.white,
  },
  monoText: {
    fontFamily: FONTS.mono,
  },
});
