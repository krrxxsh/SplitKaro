/**
 * useAppTheme Hook
 * Returns the correct color palette based on the device color scheme.
 * Usage: const { colors } = useAppTheme();
 */

import { useColorScheme } from 'react-native';
import { Colors } from '../constants/Colors';

export const useAppTheme = () => {
  const scheme = useColorScheme();
  // Default to dark since we are dark-first
  const colors = scheme === 'light' ? Colors.light : Colors.dark;
  return { colors, isDark: scheme !== 'light' };
};
