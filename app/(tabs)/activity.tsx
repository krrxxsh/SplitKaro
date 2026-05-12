/**
 * Activity — Clean feed, no clutter
 */
import React from 'react';
import {
  View, Text, FlatList, StyleSheet,
  TouchableOpacity, StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { F } from '../../src/constants/Typography';
import { C } from '../../src/constants/Tokens';
import { ACTIVITY, type ActivityItem } from '../../src/constants/DummyData';

const fmt = (n: number) => `₹${n.toLocaleString('en-IN')}`;

const TYPE_COLOR: Record<ActivityItem['type'], string> = {
  expense:       C.amber,
  settlement:    C.success,
  group_created: C.purple,
  member_added:  '#60A5FA',
};

function FeedItem({ item, isLast }: { item: ActivityItem; isLast: boolean }) {
  const color = TYPE_COLOR[item.type];
  return (
    <TouchableOpacity
      style={[s.item, !isLast && s.itemBorder]}
      onPress={() => router.push(`/group/${item.groupId}`)}
      activeOpacity={0.72}
    >
      <View style={[s.dot, { backgroundColor: color }]} />
      <View style={s.content}>
        <Text style={s.desc} numberOfLines={2}>{item.description}</Text>
        <Text style={s.meta}>{item.groupName} · {item.date}</Text>
      </View>
      {item.amount != null && (
        <Text style={s.amt}>{fmt(item.amount)}</Text>
      )}
    </TouchableOpacity>
  );
}

export default function ActivityScreen() {
  return (
    <SafeAreaView style={s.safe} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      <View style={s.header}>
        <Text style={s.title}>Activity</Text>
      </View>

      <FlatList
        data={ACTIVITY}
        keyExtractor={i => i.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={s.list}
        renderItem={({ item, index }) => (
          <FeedItem item={item} isLast={index === ACTIVITY.length - 1} />
        )}
        ListFooterComponent={<View style={{ height: 110 }} />}
      />
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe:  { flex: 1, backgroundColor: C.bg },
  header:{ paddingHorizontal: 24, paddingTop: 8, paddingBottom: 20 },
  title: { fontSize: 28, fontFamily: F.bold, color: C.text },
  list:  { paddingHorizontal: 16 },
  item:  {
    flexDirection: 'row', alignItems: 'center',
    gap: 14, paddingVertical: 15,
  },
  itemBorder: { borderBottomWidth: 1, borderBottomColor: C.border },
  dot:     { width: 8, height: 8, borderRadius: 4, flexShrink: 0 },
  content: { flex: 1 },
  desc:    { fontSize: 14, fontFamily: F.medium, color: C.text, marginBottom: 3, lineHeight: 20 },
  meta:    { fontSize: 12, fontFamily: F.regular, color: C.textMuted },
  amt:     { fontSize: 14, fontFamily: F.bold, color: C.text },
});
