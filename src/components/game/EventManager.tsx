// src/components/game/EventManager.tsx
'use client';

import { useEffect, useCallback, useRef, useState } from 'react';
import { useGameStore } from '@/lib/store/gameStore';
import { EVENTS, GameEvent, EventChoice } from '@/constants/eventSystem';
import EventDisplay from './EventDisplay';

export default function EventManager() {
    const [activeEvent, setActiveEvent] = useState<GameEvent | null>(null);
    const [showChoices, setShowChoices] = useState(false);
    const gameState = useGameStore();
    const updateGameState = useGameStore(state => state.updateGameState);
    const eventCheckIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
    const checkEventConditions = useCallback(() => {
        if (activeEvent) return;
    
        const eligibleEvents = Object.values(EVENTS).filter(event => {
          if (event.condition) {
            return event.condition(gameState);
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
              const newState = event.effects.immediate(gameState);
              if (Object.keys(newState).length > 0) {
                updateGameState(newState);
              }
            }
            break;
          }
        }
      }, [activeEvent, gameState, updateGameState]);
  
      const handleChoice = useCallback((choice: EventChoice) => {
        if (choice.effects.immediate) {
          updateGameState(choice.effects.immediate(gameState));
        }
        if (choice.effects.reputation) {
          updateGameState({
            reputation: {
              human: Math.min(100, Math.max(0, gameState.reputation.human + choice.effects.reputation.human)),
              monster: Math.min(100, Math.max(0, gameState.reputation.monster + choice.effects.reputation.monster))
            }
          });
        }
        setShowChoices(false);
        setTimeout(() => setActiveEvent(null), 2000);
      }, [gameState, updateGameState]);
    
      const handleCloseEvent = useCallback(() => {
        setActiveEvent(null);
      }, []);
  
    useEffect(() => {
        if (!gameState.gameStarted) return;
    
        if (eventCheckIntervalRef.current) {
          clearInterval(eventCheckIntervalRef.current);
        }
    
        eventCheckIntervalRef.current = setInterval(checkEventConditions, 30000);
    
        return () => {
          if (eventCheckIntervalRef.current) {
            clearInterval(eventCheckIntervalRef.current);
          }
        };
      }, [gameState.gameStarted, checkEventConditions]);

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