/**
 * Unused modal — kept to avoid Expo Router warnings.
 * SplitKaro uses its own modal screens via the group/ stack.
 */
import { Redirect } from 'expo-router';

export default function ModalScreen() {
  return <Redirect href="/login" />;
}
