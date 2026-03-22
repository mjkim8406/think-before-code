import { Stack } from 'expo-router';
import { COLORS } from '@/src/lib/constants';

export default function TrainingLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: COLORS.background },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="reading" />
      <Stack.Screen name="pattern-analysis" />
      <Stack.Screen name="strategy-design" />
      <Stack.Screen name="solution-flow" />
      <Stack.Screen name="edge-cases" />
      <Stack.Screen name="complexity" />
      <Stack.Screen name="comparison" />
      <Stack.Screen name="result" options={{ gestureEnabled: false }} />
    </Stack>
  );
}
