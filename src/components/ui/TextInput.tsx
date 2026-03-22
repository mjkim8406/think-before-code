import { TextInput as RNTextInput, StyleSheet, View, Text, TextInputProps } from 'react-native';
import { COLORS, FONTS } from '@/src/lib/constants';

interface StyledTextInputProps extends TextInputProps {
  label?: string;
}

export function TextInput({ label, style, ...props }: StyledTextInputProps) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <RNTextInput
        style={[styles.input, style]}
        placeholderTextColor={COLORS.sand300}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 4,
  },
  label: {
    fontSize: 11,
    fontFamily: FONTS.semiBold,
    fontWeight: '600',
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  input: {
    backgroundColor: COLORS.white,
    borderWidth: 1.5,
    borderColor: COLORS.sand200,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: COLORS.text, // sand-900 #2C2C24
    lineHeight: 22,
  },
});
