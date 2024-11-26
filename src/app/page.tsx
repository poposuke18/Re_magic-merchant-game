// src/app/page.tsx
'use client';

import { useGameStore } from '@/lib/store/gameStore';
import StartScreen from '@/components/game/StartScreen';
import GameHeader from '@/components/game/GameHeader';
import EventManager from '@/components/game/EventManager';
import MagicBookProduction from '@/components/game/MagicBookProduction';
import MagicShop from '@/components/game/MagicShop';
import Inventory from '@/components/game/Inventory';
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
      <main className="container mx-auto pt-32 px-4 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 左のカラム：生産 */}
          <div className="space-y-6">
            <MagicBookProduction />
          </div>
          
          {/* 中央のカラム：ショップ */}
          <div className="space-y-6">
            <MagicShop />
          </div>
          
          {/* 右のカラム：インベントリ */}
          <div className="space-y-6">
            <Inventory />
          </div>
        </div>
      </main>
      <EventManager />
    </div>
  );
}