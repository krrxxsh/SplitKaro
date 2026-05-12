/**
 * Root Layout — app/_layout.tsx
 *
 * Responsibilities:
 *  1. Wrap everything in SafeAreaProvider so useSafeAreaInsets() works on
 *     ALL Android devices including S20 FE with edge-to-edge enabled.
 *  2. Load Montserrat font variants before rendering any screen.
 *  3. Register all Expo Router stack screens.
 */

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, ActivityIndicator } from 'react-native';
import { useFonts } from 'expo-font';

export default function RootLayout() {
  // Load Montserrat — app waits here until fonts are ready
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular:  require('@expo-google-fonts/montserrat/400Regular/Montserrat_400Regular.ttf'),
    Montserrat_500Medium:   require('@expo-google-fonts/montserrat/500Medium/Montserrat_500Medium.ttf'),
    Montserrat_600SemiBold: require('@expo-google-fonts/montserrat/600SemiBold/Montserrat_600SemiBold.ttf'),
    Montserrat_700Bold:     require('@expo-google-fonts/montserrat/700Bold/Montserrat_700Bold.ttf'),
    Montserrat_800ExtraBold:require('@expo-google-fonts/montserrat/800ExtraBold/Montserrat_800ExtraBold.ttf'),
  });

  // Show minimal loading screen while fonts download
  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, backgroundColor: '#050505', alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color="#7C3AED" />
      </View>
    );
  }

  return (
    // SafeAreaProvider MUST wrap everything so safe-area-context
    // insets (punch-hole camera top, gesture bar bottom) work on Android
    <SafeAreaProvider>
      <StatusBar style="light" backgroundColor="#050505" translucent />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#050505' },
          animation: 'fade',
        }}
      >
        <Stack.Screen name="login" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="group/[id]"       options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="group/create"     options={{ animation: 'slide_from_bottom', presentation: 'modal' }} />
        <Stack.Screen name="group/add-expense" options={{ animation: 'slide_from_bottom', presentation: 'modal' }} />
        <Stack.Screen name="group/settle"     options={{ animation: 'slide_from_bottom', presentation: 'modal' }} />
      </Stack>
    </SafeAreaProvider>
  );
}
