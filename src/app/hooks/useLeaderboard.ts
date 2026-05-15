/**
 * useLeaderboard — fetches real leaderboard data from API
 * with WebSocket live updates and reconnect logic
 */
import { useState, useEffect, useRef, useCallback } from 'react';
import { gamesApi, type LeaderboardEntry } from '../utils/api';
import { tokenStorage } from '../utils/api';

const WS_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:8000/api')
  .replace('/api', '')
  .replace('https://', 'wss://')
  .replace('http://', 'ws://');

export function useLeaderboard(gameId: string | 'global') {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const wsRef = useRef<WebSocket | null>(null);
  const retryRef = useRef<ReturnType<typeof setTimeout>>();
  const retryCount = useRef(0);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      const data = gameId === 'global'
        ? await gamesApi.getGlobalLeaderboard()
        : await gamesApi.getLeaderboard(gameId);
      setEntries(data);
    } catch {
      setError('Failed to load leaderboard.');
    } finally {
      setIsLoading(false);
    }
  }, [gameId]);

  const connectWS = useCallback(() => {
    if (gameId === 'global') return; // global lb uses polling only
    const token = tokenStorage.getAccess();
    const url = `${WS_BASE}/ws/leaderboard/${gameId}/${token ? `?token=${token}` : ''}`;
    const ws = new WebSocket(url);

    ws.onmessage = (e) => {
      try {
        const msg = JSON.parse(e.data);
        if (msg.type === 'leaderboard_snapshot' || msg.type === 'leaderboard_update') {
          setEntries(msg.data);
          setIsLoading(false);
        }
      } catch {}
    };

    ws.onclose = (e) => {
      if (e.code === 1000) return; // clean close
      const delay = Math.min(1000 * 2 ** retryCount.current, 30000);
      retryCount.current++;
      retryRef.current = setTimeout(connectWS, delay);
    };

    ws.onerror = () => ws.close();
    wsRef.current = ws;
  }, [gameId]);

  useEffect(() => {
    fetchData();
    connectWS();
    // Refresh every 30s as fallback
    const poll = setInterval(fetchData, 30000);
    return () => {
      clearInterval(poll);
      clearTimeout(retryRef.current);
      wsRef.current?.close(1000);
      retryCount.current = 0;
    };
  }, [fetchData, connectWS]);

  return { entries, isLoading, error, refresh: fetchData };
}
