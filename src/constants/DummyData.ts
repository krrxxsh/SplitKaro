/**
 * SplitKaro Dummy Data
 * Mock data for development — no backend needed yet.
 * Replace with Firebase Firestore calls in Phase 2 of backend integration.
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export type User = {
  id: string;
  name: string;
  avatar: string;  // initials or emoji for now
  phone?: string;
  upiId?: string;
};

export type GroupType = 'Trip' | 'Home' | 'Couple' | 'Event' | 'Other';

export type Group = {
  id: string;
  name: string;
  type: GroupType;
  emoji: string;        // visual icon for the group
  members: User[];
  totalSpent: number;
  yourBalance: number;  // positive = you are owed, negative = you owe
  lastActivity: string; // human-readable last activity text
  lastActivityDate: string;
};

export type SplitType = 'Equal' | 'Exact' | 'Percentage';

export type ExpenseCategory = 'Food' | 'Fuel' | 'Hotel' | 'Transport' | 'Misc';

export type Expense = {
  id: string;
  groupId: string;
  description: string;
  amount: number;
  paidBy: User;
  participants: User[];
  splitType: SplitType;
  category: ExpenseCategory;
  date: string;
  notes?: string;
};

export type Settlement = {
  id: string;
  groupId: string;
  from: User;
  to: User;
  amount: number;
  settled: boolean;
  date: string;
};

export type ActivityItem = {
  id: string;
  type: 'expense' | 'settlement' | 'group_created' | 'member_added';
  groupName: string;
  groupId: string;
  description: string;
  amount?: number;
  actor: User;
  date: string;
};

// ─── Mock Users ───────────────────────────────────────────────────────────────

export const CURRENT_USER: User = {
  id: 'u0',
  name: 'Arjun Sharma',
  avatar: 'AS',
  phone: '+91 98765 43210',
  upiId: 'arjun@upi',
};

export const USERS: User[] = [
  CURRENT_USER,
  { id: 'u1', name: 'Krish Mehta',   avatar: 'KM', phone: '+91 99887 76655', upiId: 'krish@gpay' },
  { id: 'u2', name: 'Rahul Gupta',   avatar: 'RG', phone: '+91 91234 56789', upiId: 'rahul@upi' },
  { id: 'u3', name: 'Siddharth Roy', avatar: 'SR', phone: '+91 70011 22334', upiId: 'sid@phonepe' },
  { id: 'u4', name: 'Aman Singh',    avatar: 'AS', phone: '+91 80055 66778', upiId: 'aman@paytm' },
  { id: 'u5', name: 'Pooja Nair',    avatar: 'PN', phone: '+91 62233 44556', upiId: 'pooja@upi' },
];

// ─── Mock Groups ──────────────────────────────────────────────────────────────

export const GROUPS: Group[] = [
  {
    id: 'g1',
    name: 'Goa Trip 2024',
    type: 'Trip',
    emoji: '🏖️',
    members: [USERS[0], USERS[1], USERS[2], USERS[4]],
    totalSpent: 18400,
    yourBalance: 1800,
    lastActivity: 'You added Dinner',
    lastActivityDate: '2 hrs ago',
  },
  {
    id: 'g2',
    name: 'Roommates',
    type: 'Home',
    emoji: '🏠',
    members: [USERS[0], USERS[2], USERS[3]],
    totalSpent: 42000,
    yourBalance: 0,
    lastActivity: 'Rahul added Rent',
    lastActivityDate: '1 day ago',
  },
  {
    id: 'g3',
    name: 'College Canteen',
    type: 'Other',
    emoji: '☕',
    members: [USERS[0], USERS[1], USERS[3], USERS[4], USERS[5]],
    totalSpent: 3200,
    yourBalance: -45,
    lastActivity: 'Siddharth added Chai',
    lastActivityDate: '3 days ago',
  },
  {
    id: 'g4',
    name: 'Bike Ride — Manali',
    type: 'Trip',
    emoji: '🏍️',
    members: [USERS[0], USERS[1], USERS[4]],
    totalSpent: 9800,
    yourBalance: 450,
    lastActivity: 'Aman added Fuel',
    lastActivityDate: '5 days ago',
  },
  {
    id: 'g5',
    name: 'Flat Rent — BLR',
    type: 'Home',
    emoji: '🏢',
    members: [USERS[0], USERS[5]],
    totalSpent: 28000,
    yourBalance: -400,
    lastActivity: 'Pooja added Electricity',
    lastActivityDate: '1 week ago',
  },
];

// ─── Mock Expenses (for Group 1 — Goa Trip) ───────────────────────────────────

export const EXPENSES: Expense[] = [
  {
    id: 'e1',
    groupId: 'g1',
    description: 'Hotel — Radisson Blu',
    amount: 8200,
    paidBy: USERS[1],  // Krish
    participants: [USERS[0], USERS[1], USERS[2], USERS[4]],
    splitType: 'Equal',
    category: 'Hotel',
    date: '2024-12-20',
  },
  {
    id: 'e2',
    groupId: 'g1',
    description: 'Dinner at Britto\'s',
    amount: 2200,
    paidBy: USERS[0],  // Arjun (current user)
    participants: [USERS[0], USERS[1], USERS[2], USERS[4]],
    splitType: 'Equal',
    category: 'Food',
    date: '2024-12-21',
  },
  {
    id: 'e3',
    groupId: 'g1',
    description: 'Taxi to Airport',
    amount: 1400,
    paidBy: USERS[2],  // Rahul
    participants: [USERS[0], USERS[1], USERS[2]],
    splitType: 'Equal',
    category: 'Transport',
    date: '2024-12-22',
  },
  {
    id: 'e4',
    groupId: 'g1',
    description: 'Fuel — Mumbai to Goa',
    amount: 3600,
    paidBy: USERS[4],  // Aman
    participants: [USERS[0], USERS[1], USERS[4]],
    splitType: 'Equal',
    category: 'Fuel',
    date: '2024-12-19',
  },
  {
    id: 'e5',
    groupId: 'g1',
    description: 'Beach shack lunch',
    amount: 980,
    paidBy: USERS[1],  // Krish
    participants: [USERS[0], USERS[1], USERS[2], USERS[4]],
    splitType: 'Equal',
    category: 'Food',
    date: '2024-12-21',
  },
];

// ─── Mock Settlements ─────────────────────────────────────────────────────────

export const SETTLEMENTS: Settlement[] = [
  {
    id: 's1',
    groupId: 'g1',
    from: USERS[0],   // Arjun pays
    to: USERS[1],     // Krish receives
    amount: 450,
    settled: false,
    date: '2024-12-23',
  },
  {
    id: 's2',
    groupId: 'g3',
    from: USERS[0],
    to: USERS[3],
    amount: 45,
    settled: false,
    date: '2025-01-05',
  },
  {
    id: 's3',
    groupId: 'g5',
    from: USERS[0],
    to: USERS[5],
    amount: 400,
    settled: false,
    date: '2025-01-10',
  },
];

// ─── Activity Feed ─────────────────────────────────────────────────────────────

export const ACTIVITY: ActivityItem[] = [
  {
    id: 'a1',
    type: 'expense',
    groupName: 'Goa Trip 2024',
    groupId: 'g1',
    description: 'You added "Dinner at Britto\'s"',
    amount: 2200,
    actor: USERS[0],
    date: '2 hrs ago',
  },
  {
    id: 'a2',
    type: 'settlement',
    groupName: 'Roommates',
    groupId: 'g2',
    description: 'Rahul settled up with you',
    amount: 400,
    actor: USERS[2],
    date: '1 day ago',
  },
  {
    id: 'a3',
    type: 'expense',
    groupName: 'College Canteen',
    groupId: 'g3',
    description: 'Siddharth added "Chai + Samosa"',
    amount: 90,
    actor: USERS[3],
    date: '3 days ago',
  },
  {
    id: 'a4',
    type: 'expense',
    groupName: 'Bike Ride — Manali',
    groupId: 'g4',
    description: 'Aman added "Fuel — HP Petrol"',
    amount: 3600,
    actor: USERS[4],
    date: '5 days ago',
  },
  {
    id: 'a5',
    type: 'group_created',
    groupName: 'Flat Rent — BLR',
    groupId: 'g5',
    description: 'You created a new group',
    actor: USERS[0],
    date: '1 week ago',
  },
];

// ─── Computed Summary ─────────────────────────────────────────────────────────

/** Total balance across all groups for the current user */
export const getTotalBalance = (): number => {
  return GROUPS.reduce((sum, g) => sum + g.yourBalance, 0);
};

/** Total amount you are owed across all groups */
export const getTotalOwed = (): number => {
  return GROUPS.filter(g => g.yourBalance > 0).reduce((sum, g) => sum + g.yourBalance, 0);
};

/** Total amount you owe across all groups */
export const getTotalYouOwe = (): number => {
  return GROUPS.filter(g => g.yourBalance < 0).reduce((sum, g) => sum + Math.abs(g.yourBalance), 0);
};
