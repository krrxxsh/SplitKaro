/**
 * Typography constants — src/constants/Typography.ts
 *
 * All font families reference the Montserrat variants loaded in _layout.tsx.
 * Usage:  import { F } from '../constants/Typography';
 *         <Text style={{ fontFamily: F.bold, fontSize: 20 }}>Hello</Text>
 */

export const F = {
  regular:   'Montserrat_400Regular',
  medium:    'Montserrat_500Medium',
  semibold:  'Montserrat_600SemiBold',
  bold:      'Montserrat_700Bold',
  extrabold: 'Montserrat_800ExtraBold',
} as const;
