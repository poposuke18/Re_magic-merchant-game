// src/lib/store/gameStore.ts
import { create } from 'zustand';
import { GameState, InventoryItem } from './types';
import { TIME_CONSTANTS } from '@/constants/seasonSystem';

const INITIAL_STATE: GameState = {
  gameStarted: false,
  gold: 1500,
  humanPower: 20,
  monsterPower: 80,
  marketTrend: 0,
  volatility: 0.2,
  inventory: [],
  elapsedTime: 0,
  currentSeason: 'SUMMER',
  dayCount: 0,
  yearCount: 1,
  activeSeasonalEvents: [],
  weatherCondition: 'CLEAR',
  reputation: {
    human: 50,
    monster: 50
  }
};

type GameStore = GameState & {
  startGame: () => void;
  resetGame: () => void;
  updateGold: (amount: number) => void;
  updatePower: (humanPower: number) => void;
  addToInventory: (item: InventoryItem) => void;
  updateMarket: () => void;
  updateTime: () => void;
  updateGameState: (partialState: Partial<GameState>) => void;
};

export const useGameStore = create<GameStore>((set) => ({
  ...INITIAL_STATE,

  startGame: () => set({ gameStarted: true }),
  
  resetGame: () => set(INITIAL_STATE),
  
  updateGold: (amount) => set((state) => ({
    gold: state.gold + amount
  })),
  
  updatePower: (humanPower) => set((state) => {
    if (state.humanPower === humanPower) return {};
    return {
      humanPower,
      monsterPower: 100 - humanPower
    };
  }),
  
  addToInventory: (item) => set((state) => ({
    inventory: [...state.inventory, item]
  })),
  
  updateMarket: () => set((state) => {
    const randomChange = (Math.random() - 0.5) * 0.4;
    const newMarketTrend = Math.max(-0.5, Math.min(0.5, state.marketTrend + randomChange));
    const newVolatility = Math.max(0.1, Math.min(0.4, state.volatility * (1 + (Math.random() - 0.5) * 0.1)));
    
    if (state.marketTrend === newMarketTrend && state.volatility === newVolatility) return {};
    
    return {
      marketTrend: newMarketTrend,
      volatility: newVolatility
    };
  }),

  updateTime: () => set((state) => {
    const newElapsedTime = state.elapsedTime + 1;
    const newDayCount = Math.floor(newElapsedTime / TIME_CONSTANTS.TICKS_PER_DAY);
    const newSeasonCount = Math.floor(newDayCount / TIME_CONSTANTS.DAYS_PER_SEASON);
    const newYearCount = Math.floor(newSeasonCount / TIME_CONSTANTS.SEASONS_PER_YEAR);

    const seasons = ['SPRING', 'SUMMER', 'AUTUMN', 'WINTER'] as const;
    const currentSeasonIndex = newSeasonCount % 4;
    
    // 変更がない場合は更新しない
    if (
      state.elapsedTime === newElapsedTime &&
      state.dayCount === newDayCount % TIME_CONSTANTS.DAYS_PER_SEASON &&
      state.yearCount === newYearCount + 1 &&
      state.currentSeason === seasons[currentSeasonIndex]
    ) {
      return {};
    }

    return {
      elapsedTime: newElapsedTime,
      dayCount: newDayCount % TIME_CONSTANTS.DAYS_PER_SEASON,
      yearCount: newYearCount + 1,
      currentSeason: seasons[currentSeasonIndex]
    };
  }),

  updateGameState: (partialState) => set((state) => {
    // 変更がない場合は更新しない
    const hasChanges = Object.entries(partialState).some(
      ([key, value]) => state[key as keyof GameState] !== value
    );
    
    if (!hasChanges) return {};
    
    return { ...state, ...partialState };
  })
}));