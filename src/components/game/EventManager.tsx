// src/components/game/EventManager.tsx
import { useEffect, useCallback, useRef, useState } from 'react';
import { useGameStore } from '@/lib/store/gameStore';
import { EVENTS, GameEvent, EventChoice } from '@/constants/eventSystem';
import EventDisplay from './EventDisplay';
import type { GameState } from '@/types/game';

export default function EventManager() {
  const [activeEvent, setActiveEvent] = useState<GameEvent | null>(null);
  const [showChoices, setShowChoices] = useState(false);
  const gameState = useGameStore();
  const updateGameState = useGameStore(state => state.updateGameState);
  const eventCheckIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const checkEventConditions = useCallback(() => {
    if (activeEvent) return;

    // GameStateとして扱うために必要なプロパティのみを抽出
    const currentGameState: GameState = {
      gameStarted: gameState.gameStarted,
      gameOver: gameState.gameOver,
      gold: gameState.gold,
      humanPower: gameState.humanPower,
      monsterPower: gameState.monsterPower,
      marketTrend: gameState.marketTrend,
      volatility: gameState.volatility,
      inventory: gameState.inventory,
      elapsedTime: gameState.elapsedTime,
      currentSeason: gameState.currentSeason,
      dayCount: gameState.dayCount,
      yearCount: gameState.yearCount,
      weatherCondition: gameState.weatherCondition,
      reputation: gameState.reputation,
      productionSlots: gameState.productionSlots,
      productionUpgrades: gameState.productionUpgrades,
    };

    const eligibleEvents = Object.values(EVENTS).filter(event => {
      if (event.condition) {
        return event.condition(currentGameState);
      }
      return true;
    });

    if (eligibleEvents.length === 0) return;

    const totalWeight = eligibleEvents.reduce((sum, event) => sum + event.weight, 0);
    let random = Math.random() * totalWeight;
    
    for (const event of eligibleEvents) {
      random -= event.weight;
      if (random <= 0) {
        setActiveEvent(event);
        if (event.choices) {
          setShowChoices(true);
        } else if (event.effects.immediate) {
          const newState = event.effects.immediate(currentGameState);
          if (Object.keys(newState).length > 0) {
            updateGameState(newState);
          }
        }
        break;
      }
    }
  }, [activeEvent, gameState, updateGameState]);

  const handleChoice = useCallback((choice: EventChoice) => {
    if (!activeEvent) return;

    // GameStateとして扱うために必要なプロパティのみを抽出
    const currentGameState: GameState = {
      gameStarted: gameState.gameStarted,
      gameOver: gameState.gameOver,
      gold: gameState.gold,
      humanPower: gameState.humanPower,
      monsterPower: gameState.monsterPower,
      marketTrend: gameState.marketTrend,
      volatility: gameState.volatility,
      inventory: gameState.inventory,
      elapsedTime: gameState.elapsedTime,
      currentSeason: gameState.currentSeason,
      dayCount: gameState.dayCount,
      yearCount: gameState.yearCount,
      weatherCondition: gameState.weatherCondition,
      reputation: gameState.reputation,
      productionSlots: gameState.productionSlots,
      productionUpgrades: gameState.productionUpgrades,
    };

    if (choice.effects.immediate) {
      const newState = choice.effects.immediate(currentGameState);
      updateGameState(newState);
    }

    if (choice.effects.reputation) {
      const newReputation = {
        human: Math.min(100, Math.max(0, currentGameState.reputation.human + choice.effects.reputation.human)),
        monster: Math.min(100, Math.max(0, currentGameState.reputation.monster + choice.effects.reputation.monster))
      };
      updateGameState({ reputation: newReputation });
    }

    setShowChoices(false);
    setTimeout(() => setActiveEvent(null), 2000);
  }, [activeEvent, gameState.currentSeason, gameState.dayCount, gameState.elapsedTime, gameState.gameOver, gameState.gameStarted, gameState.gold, gameState.humanPower, gameState.inventory, gameState.marketTrend, gameState.monsterPower, gameState.productionSlots, gameState.productionUpgrades, gameState.reputation, gameState.volatility, gameState.weatherCondition, gameState.yearCount, updateGameState]);

  const handleCloseEvent = useCallback(() => {
    setActiveEvent(null);
  }, []);

  useEffect(() => {
    if (!gameState.gameStarted) return;

    // イベントチェックの間隔を15秒に設定
    const checkInterval = 15000;
    
    if (eventCheckIntervalRef.current) {
      clearInterval(eventCheckIntervalRef.current);
    }

    // アクティブなイベントの残り時間を更新
    if (activeEvent && activeEvent.duration === 'TEMPORARY' && activeEvent.durationValue !== undefined) {
      const countdownInterval = setInterval(() => {
        setActiveEvent(prev => {
          if (!prev || prev.durationValue === undefined) return null;
          const newDurationValue = prev.durationValue - 1;
          if (newDurationValue <= 0) {
            // イベント終了時の処理
            if (prev.effects.end) {
              const endState = prev.effects.end({
                gameStarted: gameState.gameStarted,
                gameOver: gameState.gameOver,
                gold: gameState.gold,
                humanPower: gameState.humanPower,
                monsterPower: gameState.monsterPower,
                marketTrend: gameState.marketTrend,
                volatility: gameState.volatility,
                inventory: gameState.inventory,
                elapsedTime: gameState.elapsedTime,
                currentSeason: gameState.currentSeason,
                dayCount: gameState.dayCount,
                yearCount: gameState.yearCount,
                weatherCondition: gameState.weatherCondition,
                reputation: gameState.reputation,
                productionSlots: gameState.productionSlots,
                productionUpgrades: gameState.productionUpgrades,
              });
              updateGameState(endState);
            }
            return null;
          }
          return { ...prev, durationValue: newDurationValue };
        });
      }, 1000); // 1秒ごとにカウントダウン

      return () => {
        clearInterval(countdownInterval);
        if (eventCheckIntervalRef.current) {
          clearInterval(eventCheckIntervalRef.current);
        }
      };
    }

    eventCheckIntervalRef.current = setInterval(checkEventConditions, checkInterval);

    return () => {
      if (eventCheckIntervalRef.current) {
        clearInterval(eventCheckIntervalRef.current);
      }
    };
  }, [gameState.gameStarted, checkEventConditions, activeEvent, gameState, updateGameState]);

  return (
    <>
      {activeEvent && (
        <EventDisplay
          event={activeEvent}
          onChoice={handleChoice}
          showChoices={showChoices}
          onClose={!showChoices ? handleCloseEvent : undefined}
        />
      )}
    </>
  );
}