/**
 * Tab Navigator — Liquid Glass Floating Pill
 * CRED/Groww/Revolut style
 */
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

const PURPLE = '#8B5CF6';
const INACTIVE = '#3A3A4A';

type Icon = React.ComponentProps<typeof Ionicons>['name'];

function TabIcon({ icon, iconFocused, focused }: {
  icon: Icon; iconFocused: Icon; focused: boolean;
}) {
  return (
    <View style={[ts.iconWrap, focused && ts.iconWrapActive]}>
      <Ionicons
        name={focused ? iconFocused : icon}
        size={22}
        color={focused ? '#fff' : INACTIVE}
      />
    </View>
  );
}

const ts = StyleSheet.create({
  iconWrap: {
    width: 48, height: 48,
    borderRadius: 24,
    alignItems: 'center', justifyContent: 'center',
  },
  iconWrapActive: {
    backgroundColor: PURPLE,
    // Removed shadows/elevation to fix Android square artifacts inside BlurView
  },
});

function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { bottom } = useSafeAreaInsets();
  return (
    <View style={[s.barShadow, { bottom: Math.max(bottom + 12, 20) }]}>
      <View style={s.clipContainer}>
        <BlurView 
          intensity={80} 
          tint="dark" 
          experimentalBlurMethod="dimezisBlurView"
          style={StyleSheet.absoluteFill} 
        />
        <View style={s.contentRow}>
          {state.routes.map((route, index) => {
            const isFocused = state.index === index;
            const iconName = route.name === 'index' ? 'home' : 
                             route.name === 'groups' ? 'people' : 
                             route.name === 'activity' ? 'time' : 'person';
            
            return (
              <View key={route.key} style={s.tabItem}>
                <TouchableOpacity 
                  activeOpacity={0.6}
                  onPress={() => {
                    const event = navigation.emit({
                      type: 'tabPress',
                      target: route.key,
                      canPreventDefault: true,
                    });
                    if (!isFocused && !event.defaultPrevented) {
                      navigation.navigate(route.name);
                    }
                  }}
                  style={{ borderRadius: 24, overflow: 'hidden' }}
                >
                  <TabIcon 
                    icon={`${iconName}-outline` as Icon} 
                    iconFocused={iconName as Icon} 
                    focused={isFocused} 
                  />
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  barShadow: {
    position: 'absolute',
    left: 32, right: 32, height: 68,
    borderRadius: 34,
    shadowColor: '#000', shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.6, shadowRadius: 24, elevation: 8,
  },
  clipContainer: {
    flex: 1,
    borderRadius: 34,
    overflow: 'hidden',
    borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  contentRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  tabItem: {
    flex: 1, alignItems: 'center', justifyContent: 'center'
  }
});

export default function TabLayout() {
  return (
    <Tabs tabBar={(props) => <CustomTabBar {...props} />} screenOptions={{ headerShown: false }} />
  );
}
