// src/app/page.tsx
'use client';

import { useGameStore } from '@/lib/store/gameStore';
import StartScreen from '@/components/game/StartScreen';
import GameHeader from '@/components/game/GameHeader';
import EventManager from '@/components/game/EventManager'
import { useGameTime } from '@/hooks/useGameTime';

export default function Home() {
  const gameStarted = useGameStore(state => state.gameStarted);
  useGameTime();
  

  if (!gameStarted) {
    return <StartScreen />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
    <GameHeader />
    <main className="container mx-auto pt-32 px-4">
      {/* 既存のコンテンツ */}
    </main>
    <EventManager />
  </div>
  );
}