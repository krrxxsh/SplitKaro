/**
 * FAB — Floating Action Button — Premium dark UI, Montserrat
 * Purple glow, spring animation on press
 */
import React, { useRef } from 'react';
import { TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PURPLE = '#7C3AED';

interface Props {
  onPress: () => void;
  icon?: React.ComponentProps<typeof Ionicons>['name'];
}

export const FAB: React.FC<Props> = ({ onPress, icon = 'add' }) => {
  const scale = useRef(new Animated.Value(1)).current;

  const pressIn = () =>
    Animated.spring(scale, { toValue: 0.90, useNativeDriver: true, speed: 60 }).start();
  const pressOut = () =>
    Animated.spring(scale, { toValue: 1,    useNativeDriver: true, speed: 60 }).start();

  return (
    <Animated.View style={[s.wrap, { transform: [{ scale }] }]}>
      <TouchableOpacity
        style={s.fab}
        onPress={onPress}
        onPressIn={pressIn}
        onPressOut={pressOut}
        activeOpacity={1}
        accessibilityLabel="Add new expense or group"
        accessibilityRole="button"
      >
        <Ionicons name={icon} size={28} color="#fff" />
      </TouchableOpacity>
    </Animated.View>
  );
};

const s = StyleSheet.create({
  wrap: {
    position: 'absolute',
    bottom: 22, right: 22,
    zIndex: 100,
  },
  fab: {
    width: 58, height: 58, borderRadius: 29,
    backgroundColor: PURPLE,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: PURPLE,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.55, shadowRadius: 14,
    elevation: 12,
  },
});
