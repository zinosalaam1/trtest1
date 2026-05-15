/**
 * Tour Arcade — API Client
 * Drop into: src/app/utils/api.ts
 *
 * All backend communication lives here. Components never call fetch() directly.
 */

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// ─── Token management ─────────────────────────────────────────────────────────

export const tokenStorage = {
  getAccess: () => localStorage.getItem('ta_access'),
  getRefresh: () => localStorage.getItem('ta_refresh'),
  set: (access: string, refresh: string) => {
    localStorage.setItem('ta_access', access);
    localStorage.setItem('ta_refresh', refresh);
  },
  clear: () => {
    localStorage.removeItem('ta_access');
    localStorage.removeItem('ta_refresh');
    localStorage.removeItem('ta_user');
    localStorage.removeItem('ta_username');
  },
};

// ─── Core fetch wrapper ───────────────────────────────────────────────────────

let isRefreshing = false;
let refreshQueue: Array<(token: string) => void> = [];

async function refreshAccessToken(): Promise<string | null> {
  const refresh = tokenStorage.getRefresh();
  if (!refresh) return null;

  const res = await fetch(`${BASE_URL}/auth/token/refresh/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh }),
  });

  if (!res.ok) {
    tokenStorage.clear();
    window.location.href = '/signin';
    return null;
  }

  const data = await res.json();
  localStorage.setItem('ta_access', data.access);
  return data.access;
}

export async function apiFetch<T = unknown>(
  path: string,
  options: RequestInit = {},
  retry = true
): Promise<T> {
  const url = path.startsWith('http') ? path : `${BASE_URL}${path}`;
  const access = tokenStorage.getAccess();

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };
  if (access) headers['Authorization'] = `Bearer ${access}`;

  const res = await fetch(url, { ...options, headers });

  // Handle 401 — try to refresh token once
  if (res.status === 401 && retry) {
    if (isRefreshing) {
      return new Promise(resolve => {
        refreshQueue.push((token: string) => {
          headers['Authorization'] = `Bearer ${token}`;
          resolve(apiFetch<T>(path, { ...options, headers }, false));
        });
      });
    }
    isRefreshing = true;
    const newToken = await refreshAccessToken();
    isRefreshing = false;
    if (newToken) {
      refreshQueue.forEach(cb => cb(newToken));
      refreshQueue = [];
      headers['Authorization'] = `Bearer ${newToken}`;
      return apiFetch<T>(path, { ...options, headers }, false);
    }
  }

  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: 'Unknown error' }));
    throw new ApiError(res.status, error);
  }

  // 204 No Content
  if (res.status === 204) return undefined as T;
  return res.json();
}

export class ApiError extends Error {
  constructor(public status: number, public data: Record<string, unknown>) {
    const msg = Object.values(data).flat().join(' ') || `HTTP ${status}`;
    super(typeof msg === 'string' ? msg : JSON.stringify(msg));
    this.name = 'ApiError';
  }
}

// ─── Auth API ─────────────────────────────────────────────────────────────────

export interface AuthResponse {
  access: string;
  refresh: string;
  user: UserProfile;
}

export interface UserProfile {
  id: string;
  email: string;
  username: string;
  avatar: string;
  bio: string;
  country: string;
  plan: 'free' | 'premium';
  level: number;
  xp: number;
  xp_to_next_level: number;
  coins: number;
  gems: number;
  wallet_balance: string;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
  rank: number;
  wins: number;
  losses: number;
  total_games: number;
  win_rate: number;
  current_streak: number;
  best_streak: number;
  total_earnings: string;
  is_email_verified: boolean;
  created_at: string;
  last_login: string;
}

export const authApi = {
  register: (data: { email: string; username: string; password: string; password_confirm: string; date_of_birth?: string }) =>
    apiFetch<AuthResponse>('/auth/register/', { method: 'POST', body: JSON.stringify(data) }),

  login: (data: { email: string; password: string }) =>
    apiFetch<AuthResponse>('/auth/login/', { method: 'POST', body: JSON.stringify(data) }),

  logout: (refresh: string) =>
    apiFetch('/auth/logout/', { method: 'POST', body: JSON.stringify({ refresh }) }),

  verifyEmail: (token: string) =>
    apiFetch('/auth/verify-email/', { method: 'POST', body: JSON.stringify({ token }) }),

  forgotPassword: (email: string) =>
    apiFetch('/auth/forgot-password/', { method: 'POST', body: JSON.stringify({ email }) }),

  resetPassword: (token: string, new_password: string) =>
    apiFetch('/auth/reset-password/', { method: 'POST', body: JSON.stringify({ token, new_password }) }),

  me: () => apiFetch<UserProfile>('/auth/me/'),

  updateProfile: (data: Partial<UserProfile>) =>
    apiFetch<UserProfile>('/auth/me/', { method: 'PATCH', body: JSON.stringify(data) }),

  changePassword: (old_password: string, new_password: string) =>
    apiFetch('/auth/me/change-password/', { method: 'POST', body: JSON.stringify({ old_password, new_password }) }),

  claimDailyReward: () =>
    apiFetch<{ coins_awarded: number; total_coins: number }>('/auth/me/daily-reward/', { method: 'POST' }),
};

// ─── Games API ────────────────────────────────────────────────────────────────

export interface ScoreSubmission {
  session_id?: string;
  game_id: string;
  difficulty: 'easy' | 'medium' | 'hard';
  score: number;
  leaderboard_points: number;
}

export interface LeaderboardEntry {
  rank: number;
  username: string;
  avatar: string;
  tier: string;
  level: number;
  best_score: number;
  best_leaderboard_points: number;
  best_difficulty: string;
  games_played: number;
}

export const gamesApi = {
  startSession: (game_id: string, difficulty: string) =>
    apiFetch<{ session_id: string }>('/games/session/start/', {
      method: 'POST',
      body: JSON.stringify({ game_id, difficulty }),
    }),

  submitScore: (data: ScoreSubmission) =>
    apiFetch<{ score_id: string; validated: boolean; flagged: boolean }>('/games/session/submit/', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getLeaderboard: (game_id: string) =>
    apiFetch<LeaderboardEntry[]>(`/games/leaderboard/${game_id}/`),

  getGlobalLeaderboard: () =>
    apiFetch<LeaderboardEntry[]>('/games/leaderboard/global/'),

  getMyScores: (game_id?: string) =>
    apiFetch<ScoreSubmission[]>(`/games/my-scores/${game_id ? `?game_id=${game_id}` : ''}`),
};

// ─── Tournaments API ──────────────────────────────────────────────────────────

export const tournamentsApi = {
  list: (params?: { status?: string; game_id?: string }) => {
    const qs = new URLSearchParams(params as Record<string, string>).toString();
    return apiFetch<Tournament[]>(`/tournaments/${qs ? `?${qs}` : ''}`);
  },

  detail: (id: string) => apiFetch<Tournament>(`/tournaments/${id}/`),

  join: (id: string) =>
    apiFetch(`/tournaments/${id}/join/`, { method: 'POST' }),

  mine: () => apiFetch<Tournament[]>('/tournaments/my/'),
};

export interface Tournament {
  id: string;
  title: string;
  description: string;
  game_id: string;
  difficulty: string;
  format: string;
  status: string;
  prize_pool: string;
  entry_fee: string;
  max_participants: number;
  participant_count: number;
  is_full: boolean;
  starts_at: string;
  ends_at: string | null;
}

// ─── Wallet / Payment API ─────────────────────────────────────────────────────

export interface TransactionRecord {
  id: string;
  type: string;
  amount: string;
  description: string;
  balance_after: string;
  status: string;
  created_at: string;
}

export const walletApi = {
  transactions: () => apiFetch<TransactionRecord[]>('/auth/transactions/'),

  initiatePayment: (amount: number, plan: string) =>
    apiFetch<{ authorization_url: string; access_code: string; reference: string }>(
      '/auth/payment/initiate/',
      { method: 'POST', body: JSON.stringify({ amount, plan }) }
    ),

  verifyPayment: (reference: string) =>
    apiFetch('/auth/payment/verify/', { method: 'POST', body: JSON.stringify({ reference }) }),
};

// ─── Notifications / Messages API ─────────────────────────────────────────────

export const socialApi = {
  notifications: () => apiFetch('/auth/notifications/'),
  markRead: (id: number) => apiFetch(`/auth/notifications/${id}/read/`, { method: 'POST' }),
  markAllRead: () => apiFetch('/auth/notifications/read-all/', { method: 'POST' }),

  messages: () => apiFetch('/auth/messages/'),
  sendMessage: (username: string, content: string) =>
    apiFetch(`/auth/messages/send/${username}/`, { method: 'POST', body: JSON.stringify({ content }) }),

  friends: () => apiFetch('/auth/friends/'),
  sendFriendRequest: (username: string) =>
    apiFetch(`/auth/friends/request/${username}/`, { method: 'POST' }),
  acceptFriendRequest: (id: number) =>
    apiFetch(`/auth/friends/accept/${id}/`, { method: 'POST' }),
};
