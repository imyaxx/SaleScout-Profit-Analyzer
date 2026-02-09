/**
 * Хук usePolling — вызывает callback каждые intervalMs мс,
 * пока enabled === true. Используется для авто-обновления анализа.
 */
import { useEffect, useRef } from 'react';

export function usePolling(
  callback: () => void | Promise<void>,
  intervalMs: number,
  enabled: boolean
) {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!enabled) return;

    const id = setInterval(() => {
      savedCallback.current();
    }, intervalMs);

    return () => clearInterval(id);
  }, [intervalMs, enabled]);
}
