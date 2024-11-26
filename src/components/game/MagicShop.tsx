// src/components/game/MagicShop.tsx
import React from 'react';
import { useGameStore } from '@/lib/store/gameStore';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ShoppingBag, Coins } from 'lucide-react';
import { MAGIC_ELEMENTS, GRADE_COLORS } from '@/constants/magicSystem';
import type { Element, Material } from '@/types/game';

const MagicShop: React.FC = () => {
  const { gold, updateGold, addToInventory } = useGameStore();

  const getAllMaterials = (): Material[] => {
    return Object.entries(MAGIC_ELEMENTS).flatMap(([elementKey, element]) => 
      element.materials.map(material => ({
        ...material,
        element: elementKey as Element
      }))
    );
  };

  const handlePurchase = (material: Material) => {
    if (gold >= material.price) {
      updateGold(-material.price);
      addToInventory({
        ...material,
        id: `${material.id}-${Date.now()}`
      });
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingBag className="w-5 h-5" />
          魔法素材店
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {getAllMaterials().map(material => (
            <div
              key={material.id}
              className="border rounded-lg p-4 flex items-center justify-between hover:bg-gray-50"
            >
              <div>
                <h4 className={`font-medium ${GRADE_COLORS[material.grade] || ''}`}>
                  {material.name}
                </h4>
                <p className="text-sm text-gray-500">{material.description}</p>
              </div>
              <button
                onClick={() => handlePurchase(material)}
                disabled={gold < material.price}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
                  ${gold >= material.price
                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
              >
                <Coins className="w-4 h-4" />
                <span>{material.price}G</span>
              </button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MagicShop;