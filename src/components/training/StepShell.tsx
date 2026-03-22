/**
 * StepShell — 모든 Training 스텝 화면의 공통 래퍼
 *
 * 포함: 뒤로 + 단계 카운터, 프로그레스 바, ScrollView, 하단 버튼
 */

import { View, StyleSheet, ScrollView, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Button } from '@/src/components/ui/Button';
import { COLORS, FONTS, SPACING } from '@/src/lib/constants';
import { TOTAL_STEPS } from '@/src/lib/stepConfig';

interface StepShellProps {
  stepNumber: number;
  stepLabel: string;
  children: React.ReactNode;
  nextLabel?: string;
  onNext: () => void;
  canProceed?: boolean;
  showBack?: boolean;
}

export function StepShell({
  stepNumber,
  stepLabel,
  children,
  nextLabel = '다음 →',
  onNext,
  canProceed = true,
  showBack = true,
}: StepShellProps) {
  const router = useRouter();
  const progress = stepNumber / TOTAL_STEPS;

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <View style={styles.screen}>
        {/* Top Bar */}
        <View style={styles.topBar}>
          {showBack ? (
            <Pressable onPress={() => router.back()} style={styles.backBtn}>
              <Text style={styles.backBtnText}>{'<'} 뒤로</Text>
            </Pressable>
          ) : (
            <View />
          )}
          <Text style={styles.stepCounter}>
            {stepNumber} / {TOTAL_STEPS}
          </Text>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
        </View>

        {/* Step Label */}
        <View style={styles.labelRow}>
          <View style={styles.labelBadge}>
            <Text style={styles.labelBadgeText}>STEP {stepNumber}</Text>
          </View>
          <Text style={styles.labelText}>{stepLabel}</Text>
        </View>

        {/* Content */}
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {children}
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <Button
            title={nextLabel}
            onPress={onNext}
            disabled={!canProceed}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  screen: {
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 14,
    paddingBottom: 10,
    paddingHorizontal: SPACING.xxl,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  backBtnText: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: FONTS.semiBold,
    color: COLORS.textTertiary,
    letterSpacing: -0.2,
  },
  stepCounter: {
    fontSize: 12,
    fontWeight: '700',
    fontFamily: FONTS.bold,
    color: COLORS.sand300,
    letterSpacing: 0.5,
  },
  progressTrack: {
    height: 3,
    backgroundColor: COLORS.sand200,
    marginHorizontal: SPACING.xxl,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.green800,
    borderRadius: 2,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: SPACING.xxl,
    paddingTop: 20,
    paddingBottom: 8,
  },
  labelBadge: {
    backgroundColor: COLORS.green800,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  labelBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    fontFamily: FONTS.extraBold,
    color: COLORS.white,
    letterSpacing: 0.8,
  },
  labelText: {
    fontSize: 20,
    fontWeight: '800',
    fontFamily: FONTS.extraBold,
    color: COLORS.text,
    letterSpacing: -0.5,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingTop: 8,
    paddingHorizontal: SPACING.xxl,
    paddingBottom: 110,
  },
  footer: {
    paddingVertical: 16,
    paddingHorizontal: SPACING.xxl,
    paddingBottom: 36,
  },
});
