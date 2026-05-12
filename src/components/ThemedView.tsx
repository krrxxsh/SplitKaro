/**
 * ThemedView — Premium dark surface container
 *
 * Usage:
 *   <ThemedView>...</ThemedView>                    — standard #050505 bg
 *   <ThemedView type="card">...</ThemedView>        — glass-dark card
 *   <ThemedView type="elevated">...</ThemedView>    — elevated surface
 */

import React from 'react';
import { View, type ViewProps, StyleSheet } from 'react-native';

const BG    = '#050505';
const CARD  = '#0F0F14';
const CARD2 = '#13131A';

export type ViewType = 'default' | 'card' | 'elevated';

interface ThemedViewProps extends ViewProps {
  type?: ViewType;
}

export function ThemedView({ style, type = 'default', ...rest }: ThemedViewProps) {
  return (
    <View
      style={[
        s.default,
        type === 'card'     && s.card,
        type === 'elevated' && s.elevated,
        style,
      ]}
      {...rest}
    />
  );
}

const s = StyleSheet.create({
  default: {
    backgroundColor: BG,
  },
  card: {
    backgroundColor: CARD,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#1E1E2E',
  },
  elevated: {
    backgroundColor: CARD2,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#1E1E2E',
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
});
