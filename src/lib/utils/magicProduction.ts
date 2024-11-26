// src/lib/utils/magicProduction.ts

import { MAGIC_ELEMENTS } from '@/constants/magicSystem';
import { Element, Season } from '@/lib/store/types';

export const calculateBookQuality = (
  element: Element,
  level: number,
  season: Season,
  volatility: number
): number => {
  const elementData = MAGIC_ELEMENTS[element];
  const tierData = elementData.tiers.find(tier => tier.level === level);
  if (!tierData) return 0;

  // 基本品質（レベルが高いほど最低品質が上がる）
  const baseMin = 40 + (level * 10);
  const baseQuality = Math.random() * (100 - baseMin) + baseMin;
  
  // 季節補正
  const seasonModifier = 1 + (Math.random() * 0.2);
  
  // 市場の変動による補正
  const volatilityModifier = 1 + ((Math.random() - 0.5) * volatility);
  
  // 最終品質を計算
  return Math.min(100, Math.max(0, baseQuality * seasonModifier * volatilityModifier));
};

export const generateBookName = (
  element: Element,
  level: number,
  quality: number
): string => {
  const elementData = MAGIC_ELEMENTS[element];
  const tierData = elementData.tiers.find(tier => tier.level === level);
  
  if (!tierData) return `${elementData.name}の魔導書`;
  
  let name = tierData.name;
  
  // 品質が特に高い場合、特別な接頭辞を追加
  if (quality >= 95) {
    name = `神業${name}`;
  } else if (quality >= 90) {
    name = `至高${name}`;
  } else if (quality >= 85) {
    name = `秘伝${name}`;
  }
  
  return name;
};