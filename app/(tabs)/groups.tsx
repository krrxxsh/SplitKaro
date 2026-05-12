/**
 * Groups — Clean list, no stats clutter
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
import { GROUPS, type Group } from '../../src/constants/DummyData';

const fmt = (n: number) => `₹${Math.abs(n).toLocaleString('en-IN')}`;

function GroupRow({ group, onPress }: { group: Group; onPress: () => void }) {
  const settled = group.yourBalance === 0;
  const isPos   = group.yourBalance > 0;

  return (
    <TouchableOpacity
      style={s.row}
      onPress={onPress}
      activeOpacity={0.72}
    >
      {/* Left: emoji + info */}
      <View style={s.emojiBox}>
        <Text style={s.emoji}>{group.emoji}</Text>
      </View>
      <View style={s.info}>
        <Text style={s.groupName}>{group.name}</Text>
        <Text style={s.groupSub} numberOfLines={1}>{group.lastActivity}</Text>
      </View>

      {/* Right: balance */}
      {settled ? (
        <Text style={s.settledTxt}>Settled</Text>
      ) : (
        <View style={s.balRight}>
          <Text style={[s.balAmt, { color: isPos ? C.success : C.danger }]}>
            {isPos ? '+' : '-'}{fmt(group.yourBalance)}
          </Text>
          <Text style={[s.balLbl, { color: isPos ? C.success : C.danger }]}>
            {isPos ? 'owed' : 'owe'}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

export default function GroupsScreen() {
  return (
    <SafeAreaView style={s.safe} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      {/* Header */}
      <View style={s.header}>
        <Text style={s.title}>Groups</Text>
        <TouchableOpacity
          style={s.addBtn}
          onPress={() => router.push('/group/create')}
        >
          <Ionicons name="add" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={GROUPS}
        keyExtractor={g => g.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={s.list}
        ItemSeparatorComponent={() => <View style={s.sep} />}
        renderItem={({ item }) => (
          <GroupRow
            group={item}
            onPress={() => router.push(`/group/${item.id}`)}
          />
        )}
        ListFooterComponent={<View style={{ height: 110 }} />}
      />
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe:  { flex: 1, backgroundColor: C.bg },
  header:{
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24, paddingTop: 8, paddingBottom: 20,
  },
  title: { fontSize: 28, fontFamily: F.bold, color: C.text },
  addBtn:{
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: C.purple,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: C.purple, shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4, shadowRadius: 10, elevation: 8,
  },

  list: { paddingHorizontal: 16 },

  // Row inside a single card container
  row: {
    flexDirection: 'row', alignItems: 'center',
    gap: 14, paddingVertical: 14, paddingHorizontal: 4,
  },
  sep: { height: 1, backgroundColor: C.border, marginHorizontal: 4 },

  emojiBox: {
    width: 44, height: 44, borderRadius: 13,
    backgroundColor: C.card,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: C.border,
  },
  emoji: { fontSize: 22 },
  info:  { flex: 1 },
  groupName: { fontSize: 15, fontFamily: F.semibold, color: C.text, marginBottom: 3 },
  groupSub:  { fontSize: 12, fontFamily: F.regular,  color: C.textMuted },

  balRight: { alignItems: 'flex-end', gap: 1 },
  balAmt:   { fontSize: 15, fontFamily: F.bold },
  balLbl:   { fontSize: 11, fontFamily: F.medium },
  settledTxt:{ fontSize: 12, fontFamily: F.medium, color: C.textMuted },
});
