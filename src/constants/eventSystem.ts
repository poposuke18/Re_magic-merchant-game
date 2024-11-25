// src/constants/eventSystem.ts
import { GameState } from '@/lib/store/types';

export type EventCategory = 'POLITICAL' | 'NATURAL' | 'ECONOMIC' | 'SOCIAL' | 'MAGICAL';
export type EventTrigger = 'TIME' | 'CONDITION' | 'RANDOM' | 'PLAYER_ACTION';
export type EventDuration = 'INSTANT' | 'TEMPORARY' | 'PERMANENT';
export type ElementType = 'FIRE' | 'ICE' | 'WIND' | 'EARTH' | 'LIGHTNING';

export interface EventChoice {
    id: string;
    text: string;
    condition?: (state: GameState) => boolean;
    effects: {
      immediate: (state: GameState) => Partial<GameState>;
      reputation?: {
        human: number;
        monster: number;
      };
    };
  }

export interface EventEffect {
  gold?: number;
  humanPower?: number;
  marketTrend?: number;
  elementBonus?: Partial<Record<ElementType, number>>;
  reputation?: {
    human: number;
    monster: number;
  };
  volatility?: number;
}

export interface GameEvent {
  id: string;
  name: string;
  description: string;
  category: EventCategory;
  trigger: EventTrigger;
  duration: EventDuration;
  durationValue?: number;
  condition?: (state: GameState) => boolean;
  weight: number;
  effects: {
    immediate?: (state: GameState) => Partial<GameState>;
    ongoing?: (state: GameState) => Partial<GameState>;
    end?: (state: GameState) => Partial<GameState>;
  };
  choices?: EventChoice[];
  elementEffects?: Partial<Record<ElementType, number>>;
}

export const EVENTS: Record<string, GameEvent> = {
  // 政治イベント
  PEACE_CONFERENCE: {
    id: 'PEACE_CONFERENCE',
    name: '和平会議',
    description: '人間と魔物の代表者たちによる和平会議が開催されています。',
    category: 'POLITICAL',
    trigger: 'CONDITION',
    duration: 'TEMPORARY',
    durationValue: 5,
    condition: (state) => Math.abs(state.humanPower - 50) < 10,
    weight: 1.2,
    effects: {
      ongoing: (state) => ({
        marketTrend: state.marketTrend * 0.8,
        volatility: state.volatility * 0.7
      })
    },
    choices: [
      {
        id: 'SUPPORT',
        text: '和平を支持する（両勢力の信頼度上昇、市場安定化）',
        effects: {
          immediate: (state: { marketTrend: number; volatility: number; gold: number; }) => ({
            marketTrend: state.marketTrend * 0.5,
            volatility: state.volatility * 0.5,
            gold: state.gold + 300
          }),
          reputation: { human: 10, monster: 10 }
        }
      },
      {
        id: 'NEUTRAL',
        text: '中立を保つ（現状維持）',
        effects: {
          immediate: (state: { gold: number; }) => ({ gold: state.gold + 500 }),
          reputation: { human: 0, monster: 0 }
        }
      },
      {
        id: 'OPPOSE',
        text: '和平に反対する（市場の活性化、評判低下）',
        effects: {
          immediate: (state: { marketTrend: number; volatility: number; gold: number; }) => ({
            marketTrend: state.marketTrend * 1.5,
            volatility: state.volatility * 1.5,
            gold: state.gold + 1000
          }),
          reputation: { human: -5, monster: -5 }
        }
      }
    ]
  },

  MAGICAL_REVOLUTION: {
    id: 'MAGICAL_REVOLUTION',
    name: '魔法革命',
    description: '新しい魔法理論が発見され、魔術書の価値が大きく変動しています。',
    category: 'MAGICAL',
    trigger: 'RANDOM',
    duration: 'TEMPORARY',
    durationValue: 7,
    weight: 0.8,
    effects: {
      ongoing: (state) => ({
        volatility: state.volatility * 2,
        marketTrend: state.marketTrend + 0.3
      })
    },
    elementEffects: {
      FIRE: 1.5,
      LIGHTNING: 1.8
    },
    choices: [
      {
        id: 'ADAPT',
        text: '新理論を取り入れる（一時的なコストと長期的な利益）',
        effects: {
          immediate: (state: { gold: number; }) => ({
            gold: state.gold - 1000,
          }),
          reputation: { human: 5, monster: 5 }
        }
      },
      {
        id: 'IGNORE',
        text: '従来の方法を守る（安定性重視）',
        effects: {
          immediate: (state: { volatility: number; }) => ({
            volatility: state.volatility * 0.8
          }),
          reputation: { human: -2, monster: -2 }
        }
      }
    ]
  },

  MERCHANT_GUILD_GATHERING: {
    id: 'MERCHANT_GUILD_GATHERING',
    name: '商人ギルド集会',
    description: '魔術商人ギルドが重要な集会を開いています。',
    category: 'ECONOMIC',
    trigger: 'TIME',
    duration: 'TEMPORARY',
    durationValue: 3,
    weight: 1.0,
    effects: {
      ongoing: (state) => ({
        marketTrend: state.marketTrend * 1.2
      })
    },
    choices: [
      {
        id: 'JOIN',
        text: '集会に参加する（ネットワーク構築）',
        effects: {
          immediate: (state: { gold: number; volatility: number; }) => ({
            gold: state.gold - 500,
            volatility: state.volatility * 0.8
          }),
          reputation: { human: 3, monster: 3 }
        }
      },
      {
        id: 'SKIP',
        text: '店舗の営業を優先する（即時の利益）',
        effects: {
          immediate: (state: { gold: number; }) => ({
            gold: state.gold + 800
          }),
          reputation: { human: -1, monster: -1 }
        }
      }
    ]
  },

  MANA_STORM: {
    id: 'MANA_STORM',
    name: '魔力の嵐',
    description: '強大な魔力の嵐が発生し、魔術書の需要が急激に変化しています。',
    category: 'NATURAL',
    trigger: 'RANDOM',
    duration: 'TEMPORARY',
    durationValue: 4,
    weight: 1.5,
    elementEffects: {
      WIND: 2.0,
      LIGHTNING: 1.8,
      ICE: 1.5
    },
    effects: {
      immediate: (state) => ({
        marketTrend: state.marketTrend + 0.4,
        volatility: state.volatility * 1.5
      })
    },
    choices: [
      {
        id: 'PROTECT',
        text: '店舗を守る（損失の最小化）',
        effects: {
          immediate: (state: { gold: number; }) => ({
            gold: state.gold - 300
          }),
          reputation: { human: 2, monster: 2 }
        }
      },
      {
        id: 'RESEARCH',
        text: '魔力の研究を行う（リスクと機会）',
        effects: {
          immediate: (state: { gold: number; volatility: number; }) => ({
            gold: state.gold - 800,
            volatility: state.volatility * 1.2
          }),
          reputation: { human: 5, monster: 5 }
        }
      }
    ]
  }
};