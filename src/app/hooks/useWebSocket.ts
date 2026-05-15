/**
 * useWebSocket — generic hook for any WS endpoint
 * Auto reconnect with exponential backoff, JWT token refresh
 */
import { useEffect, useRef, useCallback } from 'react';
import { tokenStorage } from '../utils/api';

const WS_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:8000/api')
  .replace('/api', '')
  .replace('https://', 'wss://')
  .replace('http://', 'ws://');

interface UseWebSocketOptions {
  path: string;                        // e.g. '/ws/tournament/abc123/'
  onMessage: (data: unknown) => void;
  enabled?: boolean;
}

export function useWebSocket({ path, onMessage, enabled = true }: UseWebSocketOptions) {
  const wsRef = useRef<WebSocket | null>(null);
  const retryRef = useRef<ReturnType<typeof setTimeout>>();
  const retryCount = useRef(0);
  const onMessageRef = useRef(onMessage);
  onMessageRef.current = onMessage;

  const connect = useCallback(() => {
    if (!enabled) return;
    const token = tokenStorage.getAccess();
    const url = `${WS_BASE}${path}${token ? `?token=${token}` : ''}`;
    const ws = new WebSocket(url);

    ws.onopen = () => { retryCount.current = 0; };

    ws.onmessage = (e) => {
      try { onMessageRef.current(JSON.parse(e.data)); } catch {}
    };

    ws.onclose = (e) => {
      if (e.code === 1000) return;
      const delay = Math.min(1000 * 2 ** retryCount.current, 30000);
      retryCount.current++;
      retryRef.current = setTimeout(connect, delay);
    };

    ws.onerror = () => ws.close();

    // Keepalive ping every 25s
    const ping = setInterval(() => {
      if (ws.readyState === WebSocket.OPEN) ws.send(JSON.stringify({ type: 'ping' }));
    }, 25000);

    wsRef.current = ws;
    return () => clearInterval(ping);
  }, [path, enabled]);

  useEffect(() => {
    connect();
    return () => {
      clearTimeout(retryRef.current);
      wsRef.current?.close(1000);
    };
  }, [connect]);

  const send = useCallback((data: unknown) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(data));
    }
  }, []);

  return { send };
}
