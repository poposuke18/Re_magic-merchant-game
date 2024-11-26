// src/lib/store/gameStore.ts

import { create } from 'zustand';
import { TIME_CONSTANTS } from '@/constants/timeConstants';
import type { 
  GameState, 
  GameStore, 
  ProductionSlot, 
  Material, 
  MagicBook 
} from '@/types/game.d';

const INITIAL_STATE: GameState = {
  gameStarted: false,
  gameOver: false,
  gold: 1500,
  humanPower: 50,
  monsterPower: 50,
  marketTrend: 0,
  volatility: 0.2,
  inventory: [],
  elapsedTime: 0,
  currentSeason: 'SPRING',
  dayCount: 0,
  yearCount: 1,
  weatherCondition: 'CLEAR',
  reputation: {
    human: 50,
    monster: 50
  },
  productionSlots: [
    {
      id: 1,
      element: 'FIRE',
      active: false,
      progress: 0,
      timeRemaining: 0,
      level: 1,
      materials: 0
    },
    {
      id: 2,
      element: 'ICE',
      active: false,
      progress: 0,
      timeRemaining: 0,
      level: 1,
      materials: 0
    }
  ],
  productionUpgrades: {
    speed: 1,
    quality: 1,
    slots: 2,
  }
};

export const useGameStore = create<GameStore>((set) => ({
  ...INITIAL_STATE,

  startGame: () => set({ gameStarted: true }),
  
  resetGame: () => set(INITIAL_STATE),
  
  setGameOver: (value: boolean) => set({ gameOver: value }),
  
  updateGold: (amount: number) => set((state) => ({
    gold: state.gold + amount
  })),
  
  updatePower: (humanPower: number) => set({
    humanPower,
    monsterPower: 100 - humanPower
  }),

  updateReputation: (change: { human: number; monster: number }) => set((state) => ({
    reputation: {
      human: Math.min(100, Math.max(0, state.reputation.human + change.human)),
      monster: Math.min(100, Math.max(0, state.reputation.monster + change.monster))
    }
  })),
  
  addToInventory: (item: MagicBook | Material) => set((state) => ({
    inventory: [...state.inventory, item]
  })),

  removeFromInventory: (itemId: string) => set((state) => ({
    inventory: state.inventory.filter(item => item.id !== itemId)
  })),

  updateInventory: (newInventory: (MagicBook | Material)[]) => set({
    inventory: newInventory
  }),
  
  updateMarket: () => set((state) => {
    const randomChange = (Math.random() - 0.5) * 0.4;
    const newMarketTrend = Math.max(-0.5, Math.min(0.5, state.marketTrend + randomChange));
    const newVolatility = Math.max(0.1, Math.min(0.4, state.volatility * (1 + (Math.random() - 0.5) * 0.1)));
    
    if (state.marketTrend === newMarketTrend && state.volatility === newVolatility) {
      return {};
    }
    
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
    
    const noChanges = 
      state.elapsedTime === newElapsedTime &&
      state.dayCount === newDayCount % TIME_CONSTANTS.DAYS_PER_SEASON &&
      state.yearCount === newYearCount + 1 &&
      state.currentSeason === seasons[currentSeasonIndex];
    
    if (noChanges) {
      return {};
    }

    return {
      elapsedTime: newElapsedTime,
      dayCount: newDayCount % TIME_CONSTANTS.DAYS_PER_SEASON,
      yearCount: newYearCount + 1,
      currentSeason: seasons[currentSeasonIndex]
    };
  }),

  updateGameState: (partialState: Partial<GameState>) => set((state) => {
    const hasChanges = Object.entries(partialState).some(
      ([key, value]) => state[key as keyof GameState] !== value
    );
    
    if (!hasChanges) {
      return {};
    }
    
    return { ...state, ...partialState };
  }),

  updateProductionSlot: (slotId: number, updates: Partial<ProductionSlot>) => set((state) => ({
    productionSlots: state.productionSlots.map(slot =>
      slot.id === slotId ? { ...slot, ...updates } : slot
    )
  })),

  upgradeProduction: (type: keyof GameState['productionUpgrades']) => set((state) => ({
    productionUpgrades: {
      ...state.productionUpgrades,
      [type]: state.productionUpgrades[type] + 1
    }
  })),
}));