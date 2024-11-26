// src/components/game/MagicBookProduction.tsx
import React, { useState } from 'react';
import { Timer, Book, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGameStore } from '@/lib/store/gameStore';
import { MAGIC_ELEMENTS } from '@/constants/magicSystem';
import { motion } from 'framer-motion';
import type { Element, Material } from '@/types/game';

const MagicBookProduction: React.FC = () => {
  const [] = useState<number | null>(null);
  const { 
    productionSlots, 
    inventory, 
    updateProductionSlot, 
    removeFromInventory 
  } = useGameStore();

  const canCraftBook = (element: Element, level: number): boolean => {
    const elementData = MAGIC_ELEMENTS[element];
    if (!elementData) return false;

    const tierData = elementData.tiers.find(tier => tier.level === level);
    if (!tierData) return false;

    return tierData.requiredMaterials.every((required) => {
      const availableMaterials = inventory.filter((item): item is Material => {
        return (
          'type' in item && 
          'grade' in item && 
          item.type === required.type && 
          item.grade === required.grade && 
          item.element === element
        );
      });
      return availableMaterials.length >= required.amount;
    });
  };

  const startProduction = (slotId: number) => {
    const slot = productionSlots.find(s => s.id === slotId);
    if (!slot) return;

    const elementData = MAGIC_ELEMENTS[slot.element];
    if (!elementData) return;

    const tierData = elementData.tiers.find(tier => tier.level === slot.level);
    if (!tierData) return;

    // 必要な素材を消費
    tierData.requiredMaterials.forEach(required => {
      const materialsToUse = inventory.filter((item): item is Material => {
        return (
          'type' in item && 
          'grade' in item && 
          item.type === required.type && 
          item.grade === required.grade && 
          item.element === slot.element
        );
      }).slice(0, required.amount);
      
      materialsToUse.forEach(material => {
        removeFromInventory(material.id);
      });
    });

    // 生産開始
    updateProductionSlot(slotId, {
      active: true,
      progress: 0,
      timeRemaining: 60 // 1分の生産時間
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Book className="w-5 h-5" />
          魔導書生産
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {productionSlots.map(slot => {
            const elementData = MAGIC_ELEMENTS[slot.element];
            if (!elementData) return null;

            const tierData = elementData.tiers.find(tier => tier.level === slot.level);
            const canCraft = canCraftBook(slot.element, slot.level);

            return (
              <div key={slot.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-lg font-medium">{elementData.name}</h3>
                    <p className="text-sm text-gray-500">
                      次の生産: {tierData?.name}
                    </p>
                  </div>
                  {!slot.active && (
                    <button
                      onClick={() => startProduction(slot.id)}
                      disabled={!canCraft}
                      className={`p-2 rounded-lg transition-colors ${
                        canCraft
                          ? 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  )}
                </div>

                {/* 必要素材の表示 */}
                {tierData && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium mb-2">必要な素材:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {tierData.requiredMaterials.map((material, index) => {
                        const available = inventory.filter((item): item is Material => 
                          'type' in item && 
                          'grade' in item && 
                          item.type === material.type && 
                          item.grade === material.grade && 
                          item.element === slot.element
                        ).length;

                        return (
                          <div 
                            key={index}
                            className={`text-sm p-2 rounded-lg ${
                              available >= material.amount
                                ? 'bg-green-100 text-green-700'
                                : 'bg-red-100 text-red-700'
                            }`}
                          >
                            {material.type} ({available}/{material.amount})
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 進捗バー */}
                {slot.active && (
                  <>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <motion.div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${slot.progress}%` }}
                        initial={{ width: 0 }}
                        animate={{ width: `${slot.progress}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>進捗: {Math.round(slot.progress)}%</span>
                      <span className="flex items-center gap-1">
                        <Timer className="w-4 h-4" />
                        {slot.timeRemaining}秒
                      </span>
                    </div>
                  </>
                )}

                {/* レベル表示 */}
                <div className="mt-4 text-sm text-gray-500">
                  レベル: {slot.level} / {elementData.tiers.length}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default MagicBookProduction;