// src/lib/store/types.ts
export interface GameState {
    gameStarted: boolean;
    gold: number;
    humanPower: number;
    monsterPower: number;
    marketTrend: number;
    volatility: number;
    inventory: InventoryItem[];
    elapsedTime: number;
    currentSeason: Season;
    dayCount: number;
    yearCount: number;
    activeSeasonalEvents: SeasonalEvent[];
    weatherCondition: WeatherCondition;
    reputation: {
      human: number;
      monster: number;
    };
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