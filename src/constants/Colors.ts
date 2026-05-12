/**
 * SplitKaro Color System
 * Dark-first design inspired by CRED + Splitwise
 * Purple accent matches the reference design image
 */

export const Colors = {
  dark: {
    // Backgrounds
    background: '#0D0D0F',       // near-black page background
    surface: '#1A1A2E',          // card / sheet background
    surfaceElevated: '#22223A',  // elevated surface (modals, dropdowns)
    border: '#2D2D44',           // subtle borders

    // Accent
    primary: '#7C3AED',          // vivid purple (main CTA)
    primaryLight: '#A78BFA',     // lighter purple for secondary elements
    primaryDim: '#3D1D8F',       // darker purple for pressed states

    // Semantic
    success: '#22C55E',          // green — "you are owed"
    danger: '#EF4444',           // red — "you owe"
    warning: '#F59E0B',          // amber — pending

    // Text
    textPrimary: '#F8FAFC',      // main readable text
    textSecondary: '#94A3B8',    // muted labels
    textDisabled: '#4B5563',     // disabled state

    // Special
    fab: '#7C3AED',              // floating action button
    tabBar: '#111118',           // bottom tab bar background
    tabBarActive: '#7C3AED',     // active tab icon/label
    tabBarInactive: '#4B5563',   // inactive tab icon/label
  },

  light: {
    background: '#F8FAFC',
    surface: '#FFFFFF',
    surfaceElevated: '#F1F5F9',
    border: '#E2E8F0',

    primary: '#7C3AED',
    primaryLight: '#A78BFA',
    primaryDim: '#EDE9FE',

    success: '#16A34A',
    danger: '#DC2626',
    warning: '#D97706',

    textPrimary: '#0F172A',
    textSecondary: '#64748B',
    textDisabled: '#CBD5E1',

    fab: '#7C3AED',
    tabBar: '#FFFFFF',
    tabBarActive: '#7C3AED',
    tabBarInactive: '#94A3B8',
  },
} as const;

// Gradient definitions for use with LinearGradient (future)
export const Gradients = {
  purpleCard: ['#7C3AED', '#4F46E5'],
  darkCard: ['#1A1A2E', '#0D0D0F'],
  successCard: ['#166534', '#14532D'],
  dangerCard: ['#991B1B', '#7F1D1D'],
};

export type ColorScheme = keyof typeof Colors;
