// src/components/game/Inventory.tsx
import React from 'react';
import { useGameStore } from '@/lib/store/gameStore';
import { Book, Shield, Sword } from 'lucide-react';
import { motion } from 'framer-motion';
import type { MagicBook, Material } from '@/types/game';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { calculatePowerImpact, checkGameOver } from '@/lib/utils/powerBalance';

export default function Inventory() {
  const { 
    inventory, 
    updateGold, 
    removeFromInventory,
    humanPower,
    updatePower,
    updateReputation,
    setGameOver
  } = useGameStore();

  // MagicBook型の判定を行うType Guard関数
  const isMagicBook = (item: MagicBook | Material): item is MagicBook => {
    return 'basePrice' in item && 'quality' in item && 'level' in item;
  };

  const handleSell = (item: MagicBook | Material, faction: 'HUMAN' | 'MONSTER') => {
    if (!isMagicBook(item)) return; // MagicBookでない場合は早期リターン

    const marketTrend = useGameStore.getState().marketTrend;
    const finalPrice = Math.round(item.basePrice * (1 + marketTrend));
    
    const impact = calculatePowerImpact(item, faction, humanPower);
    const newHumanPower = humanPower + impact.humanPower;
    
    updatePower(newHumanPower);
    updateReputation(impact.reputationChange);
    updateGold(finalPrice);
    removeFromInventory(item.id);

    if (checkGameOver(newHumanPower)) {
      setGameOver(true);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Book className="w-5 h-5" />
          インベントリ
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4">
          {inventory.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="border rounded-lg p-4 hover:bg-gray-50"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">{item.name}</h4>
                  {isMagicBook(item) && (
                    <p className="text-sm text-gray-500">
                      品質: {item.quality.toFixed(1)} / レベル: {item.level}
                    </p>
                  )}
                </div>
                {isMagicBook(item) && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleSell(item, 'HUMAN')}
                      className="flex items-center gap-1 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                    >
                      <Shield className="w-4 h-4" />
                      <span>{item.basePrice}G</span>
                    </button>
                    <button
                      onClick={() => handleSell(item, 'MONSTER')}
                      className="flex items-center gap-1 px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                    >
                      <Sword className="w-4 h-4" />
                      <span>{item.basePrice}G</span>
                    </button>
                  </div>
                )}
              </div>
              
              {isMagicBook(item) && (
                <div className="mt-2 text-sm">
                  <div className="flex gap-4">
                    <span className="text-blue-600">
                      人間: {humanPower.toFixed(1)}%
                    </span>
                    <span className="text-red-600">
                      魔物: {(100 - humanPower).toFixed(1)}%
                    </span>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}