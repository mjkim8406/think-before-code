/**
 * Global Error Boundary — catches uncaught JS errors in the component tree
 */

import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { COLORS, FONTS } from '@/src/lib/constants';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class AppErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('[ErrorBoundary]', error, info.componentStack);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <View style={styles.container}>
          <Text style={styles.emoji}>!</Text>
          <Text style={styles.title}>문제가 발생했습니다</Text>
          <Text style={styles.message}>
            {this.state.error?.message ?? '알 수 없는 오류가 발생했습니다'}
          </Text>
          <Pressable
            style={({ pressed }) => [styles.retryBtn, pressed && { opacity: 0.85 }]}
            onPress={this.handleRetry}
          >
            <Text style={styles.retryText}>다시 시도</Text>
          </Pressable>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    backgroundColor: COLORS.background,
  },
  emoji: {
    fontSize: 40,
    fontFamily: FONTS.black,
    color: COLORS.error,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.errorDim,
    textAlign: 'center',
    lineHeight: 64,
    overflow: 'hidden',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    color: COLORS.text,
    marginBottom: 8,
  },
  message: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  retryBtn: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: COLORS.green800,
  },
  retryText: {
    fontSize: 14,
    fontFamily: FONTS.semiBold,
    color: COLORS.white,
  },
});
