// src/lib/utils/calculations.ts を新規作成

import { Element, Season } from '@/lib/store/types';
import { SEASONS } from '@/constants/seasonSystem';

export const calculateBookQuality = (
  element: Element,
  season: Season,
  productionLevel: number,
  volatility: number
): number => {
  // 基本品質（0-100）
  const baseQuality = Math.random() * 60 + 40;
  
  // 季節補正
  const seasonModifier = SEASONS[season].elementModifiers[element];
  
  // 生産レベル補正（レベルが上がるごとに品質が上がりやすい）
  const levelModifier = 1 + (productionLevel * 0.1);
  
  // 市場の変動による補正（変動が大きいほど品質にばらつきが出る）
  const volatilityModifier = 1 + ((Math.random() - 0.5) * volatility);
  
  // 最終品質を計算
  const finalQuality = baseQuality * seasonModifier * levelModifier * volatilityModifier;
  
  // 0-100の範囲に収める
  return Math.min(100, Math.max(0, finalQuality));
};

export const calculateBookPrice = (
  quality: number,
  element: Element,
  season: Season,
  marketTrend: number
): number => {
  // 基本価格
  const basePrice = 100 + (quality * 2);
  
  // 季節による需要の変動
  const seasonModifier = SEASONS[season].elementModifiers[element];
  
  // 市場トレンドの影響
  const marketModifier = 1 + marketTrend;
  
  // 最終価格を計算
  const finalPrice = Math.round(basePrice * seasonModifier * marketModifier);
  
  return Math.max(50, finalPrice); // 最低価格を設定
};