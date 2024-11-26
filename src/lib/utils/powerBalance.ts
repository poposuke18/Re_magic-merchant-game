// src/lib/utils/powerBalance.ts
import { MagicBook } from '@/lib/store/types';


interface PowerImpact {
    humanPower: number;
    monsterPower: number;
    reputationChange: {
      human: number;
      monster: number;
    };
  }

  export const calculatePowerImpact = (
    book: MagicBook,
    buyerFaction: 'HUMAN' | 'MONSTER',
    currentHumanPower: number
  ): PowerImpact => {
    const baseImpact = (book.quality / 100) * (book.level * 0.5);
    
  // 各属性が人間/魔物どちらに適しているかの係数
  const elementAlignment = {
    FIRE: 1.2,    // 人間寄り
    ICE: 0.8,     // 魔物寄り
    WIND: 1.0,    // 中立
    EARTH: 1.0,   // 中立
    LIGHTNING: 1.3 // 人間寄り
  };

  // 現在の勢力バランスに基づく補正
  // 弱い側がより強い効果を得られるように
  const balanceMultiplier = buyerFaction === 'HUMAN' 
    ? 1 + (0.5 * (1 - (currentHumanPower / 100)))
    : 1 + (0.5 * (currentHumanPower / 100));

  // 最終的な影響力を計算
  const impact = baseImpact * elementAlignment[book.element] * balanceMultiplier;
  
  // 評判への影響を計算
  const reputationChange = {
    human: buyerFaction === 'HUMAN' ? 1 : -0.5,
    monster: buyerFaction === 'MONSTER' ? 1 : -0.5
  };

  if (buyerFaction === 'HUMAN') {
    return {
      humanPower: Math.min(impact, 100 - currentHumanPower),
      monsterPower: -Math.min(impact, currentHumanPower),
      reputationChange
    };
  } else {
    return {
      humanPower: -Math.min(impact, currentHumanPower),
      monsterPower: Math.min(impact, 100 - currentHumanPower),
      reputationChange
    };
  }
};

// ゲームオーバー条件のチェック

export const checkGameOver = (humanPower: number): boolean => {
    return humanPower <= 0 || humanPower >= 100;
  };