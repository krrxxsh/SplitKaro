/**
 * ThemedText — Premium typography using Montserrat
 *
 * Usage:
 *   <ThemedText>Regular body text</ThemedText>
 *   <ThemedText type="title">Page Title</ThemedText>
 *   <ThemedText type="subtitle">Subtitle</ThemedText>
 *   <ThemedText type="label">SECTION LABEL</ThemedText>
 *   <ThemedText type="muted">Muted hint text</ThemedText>
 */

import React from 'react';
import { Text, type TextProps, StyleSheet } from 'react-native';
import { F } from '../constants/Typography';

const TEXT  = '#F1F1F6';
const MUTED = '#6B7280';
const DIM   = '#94A3B8';
const LAVENDER = '#C4B5FD';

export type TextType =
  | 'default'
  | 'title'
  | 'subtitle'
  | 'label'
  | 'muted'
  | 'link'
  | 'mono';

interface ThemedTextProps extends TextProps {
  type?: TextType;
}

export function ThemedText({ style, type = 'default', ...rest }: ThemedTextProps) {
  return (
    <Text
      style={[
        s.default,
        type === 'title'    && s.title,
        type === 'subtitle' && s.subtitle,
        type === 'label'    && s.label,
        type === 'muted'    && s.muted,
        type === 'link'     && s.link,
        type === 'mono'     && s.mono,
        style,
      ]}
      {...rest}
    />
  );
}

const s = StyleSheet.create({
  default: {
    fontSize: 15,
    fontFamily: F.regular,
    color: TEXT,
    lineHeight: 22,
  },
  title: {
    fontSize: 28,
    fontFamily: F.bold,
    color: TEXT,
    letterSpacing: -0.5,
    lineHeight: 36,
  },
  subtitle: {
    fontSize: 18,
    fontFamily: F.semibold,
    color: TEXT,
    lineHeight: 26,
  },
  label: {
    fontSize: 11,
    fontFamily: F.semibold,
    color: MUTED,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
  muted: {
    fontSize: 13,
    fontFamily: F.regular,
    color: MUTED,
    lineHeight: 20,
  },
  link: {
    fontSize: 14,
    fontFamily: F.medium,
    color: LAVENDER,
    textDecorationLine: 'underline',
  },
  mono: {
    fontSize: 13,
    fontFamily: F.regular,
    color: DIM,
    letterSpacing: 0.5,
  },
});
