/**
 * useGameState — API-connected, no mock data.
 * All user data comes from AuthContext (real backend).
 * Transactions and notifications fetched from the API.
 */
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { gamesApi, walletApi, socialApi } from '../utils/api';

// ─── Types (kept for backwards compatibility with existing components) ────────

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  progress: number;
  total: number;
  unlocked: boolean;
  reward: number;
  date?: string;
}

export interface Friend {
  id: string;
  username: string;
  avatar: string;
  online: boolean;
  level: number;
  lastSeen?: string;
}

export interface Notification {
  id: string;
  type: 'achievement' | 'friend' | 'tournament' | 'reward' | 'system';
  title: string;
  message: string;
  read: boolean;
  timestamp: Date;
  icon?: string;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

export interface Transaction {
  id: string;
  type: 'win' | 'loss' | 'purchase' | 'reward' | 'withdrawal' | 'deposit';
  amount: number;
  description: string;
  timestamp: Date;
  balance: number;
}

export interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  coins: number;
  gems: number;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
  wins: number;
  losses: number;
  totalGames: number;
  winRate: number;
  currentStreak: number;
  bestStreak: number;
  rank: number;
  totalEarnings: number;
  achievements: Achievement[];
  friends: Friend[];
  notifications: Notification[];
  messages: Message[];
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useGameState() {
  const { user: authUser, updateUser, refreshUser } = useAuth();

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  // Load data from API on mount / when user changes
  useEffect(() => {
    if (!authUser) return;

    // Transactions
    walletApi.transactions().then(data => {
      setTransactions(data.map(t => ({
        id: t.id,
        type: t.type as Transaction['type'],
        amount: parseFloat(t.amount),
        description: t.description,
        timestamp: new Date(t.created_at),
        balance: parseFloat(t.balance_after),
      })));
    }).catch(() => {});

    // Notifications
    socialApi.notifications().then((data: any[]) => {
      setNotifications(data.map(n => ({
        id: String(n.id),
        type: n.type as Notification['type'],
        title: n.title,
        message: n.message,
        read: n.read,
        timestamp: new Date(n.created_at),
        icon: n.icon,
      })));
    }).catch(() => {});

    // Friends
    socialApi.friends().then((data: any[]) => {
      setFriends(data.map(f => ({
        id: String(f.id),
        username: f.friend?.username ?? '',
        avatar: f.friend?.avatar ?? '',
        online: false,
        level: f.friend?.level ?? 1,
      })));
    }).catch(() => {});

    // Messages
    socialApi.messages().then((data: any[]) => {
      setMessages(data.map(m => ({
        id: String(m.id),
        senderId: String(m.sender?.id ?? ''),
        senderName: m.sender?.username ?? '',
        senderAvatar: m.sender?.avatar ?? '',
        content: m.content,
        timestamp: new Date(m.created_at),
        read: m.read,
      })));
    }).catch(() => {});
  }, [authUser?.id]);

  // Shape authUser into the legacy User shape expected by existing components
  const user: User | null = authUser ? {
    id: authUser.id,
    username: authUser.username,
    email: authUser.email,
    avatar: authUser.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${authUser.username}`,
    level: authUser.level,
    xp: authUser.xp,
    xpToNextLevel: authUser.xp_to_next_level,
    coins: authUser.coins,
    gems: authUser.gems,
    tier: authUser.tier,
    wins: authUser.wins,
    losses: authUser.losses,
    totalGames: authUser.total_games,
    winRate: authUser.win_rate,
    currentStreak: authUser.current_streak,
    bestStreak: authUser.best_streak,
    rank: authUser.rank,
    totalEarnings: parseFloat(authUser.total_earnings),
    achievements: [],   // Loaded separately when needed
    friends,
    notifications,
    messages,
  } : null;

  // ─── Actions ────────────────────────────────────────────────────────────

  const addCoins = useCallback((amount: number) => {
    if (!authUser) return;
    updateUser({ coins: authUser.coins + amount });
  }, [authUser, updateUser]);

  const addXP = useCallback((amount: number) => {
    if (!authUser) return;
    const newXP = authUser.xp + amount;
    const levelsGained = Math.floor(newXP / authUser.xp_to_next_level);
    updateUser({
      xp: newXP % authUser.xp_to_next_level,
      level: authUser.level + levelsGained,
    });
  }, [authUser, updateUser]);

  const markNotificationRead = useCallback(async (id: string) => {
    try {
      await socialApi.markRead(Number(id));
    } catch {}
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  }, []);

  const markMessageRead = useCallback((id: string) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, read: true } : m));
  }, []);

  const addTransaction = useCallback((t: Omit<Transaction, 'id' | 'timestamp' | 'balance'>) => {
    const entry: Transaction = {
      ...t,
      id: Date.now().toString(),
      timestamp: new Date(),
      balance: (authUser?.coins ?? 0) + t.amount,
    };
    setTransactions(prev => [entry, ...prev]);
    if (t.type !== 'purchase') addCoins(t.amount);
  }, [authUser, addCoins]);

  const submitScore = useCallback(async (
    sessionId: string | undefined,
    gameId: string,
    score: number,
    leaderboardPoints: number,
    difficulty: 'easy' | 'medium' | 'hard',
  ) => {
    try {
      const result = await gamesApi.submitScore({
        session_id: sessionId,
        game_id: gameId,
        score,
        leaderboard_points: leaderboardPoints,
        difficulty,
      });
      await refreshUser();
      return result;
    } catch (err) {
      console.warn('Score submission failed:', err);
      return null;
    }
  }, [refreshUser]);

  const setUser = useCallback((updater: any) => {
    if (typeof updater === 'function') {
      // Legacy support — compute the update and pass relevant fields to updateUser
      const updated = updater(user);
      if (updated && authUser) {
        updateUser({
          coins: updated.coins,
          xp: updated.xp,
          level: updated.level,
        });
      }
    }
  }, [user, authUser, updateUser]);

  return {
    user,
    setUser,
    transactions,
    addCoins,
    addXP,
    markNotificationRead,
    markMessageRead,
    addTransaction,
    submitScore,
    refreshUser,
  };
}
