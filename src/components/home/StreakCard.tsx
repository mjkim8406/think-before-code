import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '@/src/lib/constants';

interface StreakCardProps {
  currentStreak: number;
  longestStreak: number;
  weeklyAvg?: string;
}

export function StreakCard({ currentStreak, longestStreak, weeklyAvg = '4.2문제' }: StreakCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        {/* Left: streak stats */}
        <View style={styles.streakStats}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{currentStreak}</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{longestStreak}</Text>
            <Text style={styles.statLabel}>Day Best</Text>
          </View>
        </View>

        {/* Right: weekly avg */}
        <View style={styles.weeklyAvg}>
          <Text style={styles.avgLabel}>Avg</Text>
          <Text style={styles.avgValue}>{weeklyAvg}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 22,
    boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.04)',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.03)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  streakStats: {
    flexDirection: 'row',
    gap: 24,
  },
  statItem: {},
  statNumber: {
    fontSize: 32,
    fontWeight: '800',
    color: '#2C2C24',
    lineHeight: 32,
    letterSpacing: -1,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#8A8A7A',
    marginTop: 4,
    letterSpacing: 0.3,
  },
  weeklyAvg: {
    alignItems: 'flex-end',
  },
  avgLabel: {
    fontSize: 11,
    fontWeight: '500',
    color: '#8A8A7A',
  },
  avgValue: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.green800,
    marginTop: 2,
  },
});
