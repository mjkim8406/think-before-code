import { View, StyleSheet, ViewStyle } from 'react-native';
import { COLORS } from '@/src/lib/constants';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  accent?: boolean;
}

export function Card({ children, style, accent }: CardProps) {
  return (
    <View style={[styles.card, accent && styles.accentCard, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 20,
    // Shadow: 0 1px 3px rgba(0,0,0,0.03), 0 4px 12px rgba(0,0,0,0.03)
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.03)',
    // Border: 1px solid rgba(0,0,0,0.03)
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.03)',
  },
  accentCard: {
    borderLeftWidth: 3,
    borderLeftColor: COLORS.green500,
  },
});
