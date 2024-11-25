// src/components/game/GameHeader.tsx
'use client';

import { Shield, Sword, TrendingUp, Timer, Coins } from 'lucide-react';
import { useGameStore } from '@/lib/store/gameStore';
import { SEASONS } from '@/constants/seasonSystem';

export default function GameHeader() {
  const { gold, humanPower, marketTrend, volatility, currentSeason, yearCount, dayCount, elapsedTime } = useGameStore();

  const season = SEASONS[currentSeason];

  return (
    <div className="fixed top-0 left-0 right-0 bg-gray-900 text-white z-50 shadow-lg">
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-5 gap-4">
          {/* 所持金 */}
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <div className="flex items-center space-x-2">
              <Coins className="text-yellow-500" />
              <span>{gold}G</span>
            </div>
          </div>

          {/* 市場トレンド */}
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <div className="flex items-center space-x-2">
              <TrendingUp className={marketTrend >= 0 ? "text-green-500" : "text-red-500"} />
              <div className="flex flex-col">
                <span>{Math.abs(marketTrend * 100).toFixed(1)}%</span>
                <span className="text-xs text-gray-400">
                  変動率: {(volatility * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
          
          {/* 勢力バランス */}
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <div className="flex justify-between mb-2">
              <span className="text-blue-400 flex items-center">
                <Shield className="w-4 h-4 mr-1" />{Math.round(humanPower)}%
              </span>
              <span className="text-red-400 flex items-center">
                <Sword className="w-4 h-4 mr-1" />{Math.round(100 - humanPower)}%
              </span>
            </div>
            <div className="w-full bg-red-500 h-2 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 transition-all duration-500"
                style={{ width: `${humanPower}%` }}
              />
            </div>
          </div>

          {/* 季節表示 */}
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{season.icon}</span>
                <div className="flex flex-col">
                  <span className={`font-bold ${season.color}`}>
                    {season.name}
                  </span>
                  <span className="text-xs text-gray-400">
                    {yearCount}年目 {dayCount + 1}日目
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 経過時間 */}
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <div className="flex items-center space-x-2">
              <Timer className="text-gray-400" />
              <span>
                {Math.floor(elapsedTime / 60)}:{(elapsedTime % 60).toString().padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}