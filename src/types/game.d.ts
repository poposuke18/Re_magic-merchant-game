// src/types/game.d.ts

export type Element = 'FIRE' | 'ICE' | 'WIND' | 'EARTH' | 'LIGHTNING';
export type Season = 'SPRING' | 'SUMMER' | 'AUTUMN' | 'WINTER';
export type WeatherCondition = 'CLEAR' | 'RAIN' | 'STORM' | 'CLOUDY';
export type MaterialType = 'CRYSTAL' | 'ESSENCE' | 'CORE' | 'SHARD' | 'DUST';
export type MaterialGrade = 'COMMON' | 'UNCOMMON' | 'RARE' | 'EPIC' | 'LEGENDARY';

export interface GameState {
  gameStarted: boolean;
  gameOver: boolean;
  gold: number;
  humanPower: number;
  monsterPower: number;
  marketTrend: number;
  volatility: number;
  inventory: (MagicBook | Material)[]; 
  elapsedTime: number;
  currentSeason: Season;
  dayCount: number;
  yearCount: number;
  weatherCondition: WeatherCondition;
  reputation: {
    human: number;
    monster: number;
  };
  productionSlots: ProductionSlot[];
  productionUpgrades: {
    speed: number;
    quality: number;
    slots: number;
  };
}

export interface MagicBook {
  id: string;
  name: string;
  element: Element;
  basePrice: number;
  power: number;
  level: number;
  quality: number;
  quantity: number;
  crafted: boolean;
  description: string;
  type?: string;
  grade?: string;
}

export interface Material {
  id: string;
  name: string;
  element: Element;
  type: MaterialType;
  grade: MaterialGrade;
  price: number;
  description: string;
}

export interface ProductionSlot {
  id: number;
  element: Element;
  active: boolean;
  progress: number;
  timeRemaining: number;
  level: number;
  materials: number;
}

export interface SeasonalEvent {
  id: string;
  name: string;
  description: string;
  duration: number;
  startDay?: number;
  endDay?: number;
  effects: {
    elementBonus: Partial<Record<Element, number>>;
    priceModifier: number;
  };
}

export interface GameStore extends GameState {
  startGame: () => void;
  resetGame: () => void;
  updateGold: (amount: number) => void;
  updatePower: (power: number) => void;
  addToInventory: (item: MagicBook | Material) => void;
  removeFromInventory: (id: string) => void;
  updateInventory: (inventory: (MagicBook | Material)[]) => void;
  updateMarket: () => void;
  updateTime: () => void;
  updateGameState: (partialState: Partial<GameState>) => void;
  updateReputation: (change: { human: number; monster: number }) => void;
  setGameOver: (value: boolean) => void;
  updateProductionSlot: (slotId: number, updates: Partial<ProductionSlot>) => void;
  upgradeProduction: (type: keyof GameState['productionUpgrades']) => void;
}

export interface MagicElement {
  id: Element;
  name: string;
  description: string;
  tiers: MagicBookTier[];
  materials: Material[];
}

export interface MagicBookTier {
  level: number;
  name: string;
  requiredMaterials: {
    type: MaterialType;
    grade: MaterialGrade;
    amount: number;
  }[];
}