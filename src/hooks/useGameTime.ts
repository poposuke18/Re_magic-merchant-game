// src/hooks/useGameTime.ts
import { useEffect, useCallback, useRef } from 'react';
import { useGameStore } from '@/lib/store/gameStore';

export function useGameTime() {
  const gameStarted = useGameStore(state => state.gameStarted);
  const updateTime = useGameStore(state => state.updateTime);
  const updateMarket = useGameStore(state => state.updateMarket);
  
  const timeIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const marketIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const startIntervals = useCallback(() => {
    if (timeIntervalRef.current) clearInterval(timeIntervalRef.current);
    if (marketIntervalRef.current) clearInterval(marketIntervalRef.current);

    timeIntervalRef.current = setInterval(() => {
      updateTime();
    }, 1000);

    marketIntervalRef.current = setInterval(() => {
      updateMarket();
    }, 15000);
  }, [updateTime, updateMarket]);

  useEffect(() => {
    if (gameStarted) {
      startIntervals();
    }

    return () => {
      if (timeIntervalRef.current) clearInterval(timeIntervalRef.current);
      if (marketIntervalRef.current) clearInterval(marketIntervalRef.current);
    };
  }, [gameStarted, startIntervals]);
}