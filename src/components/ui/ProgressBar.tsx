import { View, StyleSheet, Text } from 'react-native';
import { COLORS, FONTS } from '@/src/lib/constants';

interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const fillPercent = Math.min((current / total) * 100, 100);

  return (
    <View style={styles.container}>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${fillPercent}%` }]} />
      </View>
      <Text style={styles.stepCounter}>{current} / {total}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  track: {
    flex: 1,
    height: 3,
    backgroundColor: COLORS.sand200,
    borderRadius: 2,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: COLORS.green800,
    borderRadius: 2,
  },
  stepCounter: {
    fontSize: 12,
    fontFamily: FONTS.bold,
    fontWeight: '700',
    color: COLORS.sand300,
    letterSpacing: 0.5,
  },
});
