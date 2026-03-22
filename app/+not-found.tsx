import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS, SPACING, FONT_SIZE } from '@/src/lib/constants';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: '페이지를 찾을 수 없습니다' }} />
      <View style={styles.container}>
        <Text style={styles.text}>이 화면은 존재하지 않습니다.</Text>
        <Link href="/(tabs)/home" style={styles.link}>
          홈으로 돌아가기
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.lg,
    backgroundColor: COLORS.background,
  },
  text: {
    fontSize: FONT_SIZE.lg,
    color: COLORS.text,
  },
  link: {
    marginTop: SPACING.md,
    fontSize: FONT_SIZE.md,
    color: COLORS.accent,
  },
});
