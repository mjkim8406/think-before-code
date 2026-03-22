/**
 * QuestionBlock — 질문 하나의 래퍼
 *
 * Q1, Q2... 태그 + 질문 텍스트 + children (질문 컴포넌트)
 */

import { View, StyleSheet, Text } from 'react-native';
import { COLORS, FONTS, SPACING } from '@/src/lib/constants';

interface QuestionBlockProps {
  index: number;       // 0-based → Q1, Q2...
  question: string;
  hint?: string;
  children: React.ReactNode;
}

export function QuestionBlock({ index, question, hint, children }: QuestionBlockProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.tag}>
          <Text style={styles.tagText}>Q{index + 1}</Text>
        </View>
        <Text style={styles.question}>{question}</Text>
      </View>
      {hint && <Text style={styles.hint}>{hint}</Text>}
      <View style={styles.body}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 28,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 14,
  },
  tag: {
    backgroundColor: COLORS.primaryDim,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginTop: 2,
  },
  tagText: {
    fontSize: 11,
    fontWeight: '700',
    fontFamily: FONTS.bold,
    color: COLORS.green800,
    letterSpacing: 0.3,
  },
  question: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    fontFamily: FONTS.semiBold,
    color: COLORS.text,
    lineHeight: 22,
    letterSpacing: -0.2,
  },
  hint: {
    fontSize: 12,
    fontFamily: FONTS.regular,
    color: COLORS.textTertiary,
    marginBottom: 12,
    lineHeight: 18,
    paddingLeft: 2,
  },
  body: {
    // children render here
  },
});
