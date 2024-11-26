// src/lib/store/types.ts
export interface GameState {
  gameStarted: boolean;
  gameOver: boolean;
  gold: number;
  humanPower: number;
  monsterPower: number;
  marketTrend: number;
  volatility: number;
  inventory: MagicBook[];
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

export type GameStore = GameState & {
  startGame: () => void;
  resetGame: () => void;
  updateGold: (amount: number) => void;
  updatePower: (humanPower: number) => void;
  addToInventory: (item: MagicBook) => void;
  removeFromInventory: (itemId: string) => void;
  updateMarket: () => void;
  updateTime: () => void;
  updateGameState: (partialState: Partial<GameState>) => void;
  updateReputation: (change: { human: number; monster: number }) => void;
  setGameOver: (value: boolean) => void;
  updateProductionSlot: (slotId: number, updates: Partial<ProductionSlot>) => void;
};

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
  
  export interface InventoryItem {
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
  }
  
  export type Element = 'FIRE' | 'ICE' | 'WIND' | 'EARTH' | 'LIGHTNING';
  export type Season = 'SPRING' | 'SUMMER' | 'AUTUMN' | 'WINTER';
  export type WeatherCondition = 'CLEAR' | 'RAIN' | 'STORM' | 'CLOUDY';