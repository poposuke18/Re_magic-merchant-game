// src/components/game/EventDisplay.tsx
import { motion } from 'framer-motion';
import { AlertCircle, Clock } from 'lucide-react';
import { GameEvent, EventChoice, EventCategory } from '@/constants/eventSystem';
import EventEffectsDisplay from './EventEffectsDisplay';
import { useGameStore } from '@/lib/store/gameStore';
import type { GameState } from '@/types/game';

interface EventDisplayProps {
  event: GameEvent;
  onChoice?: (choice: EventChoice) => void;
  showChoices: boolean;
  onClose?: () => void;
}

export default function EventDisplay({ 
  event, 
  onChoice, 
  showChoices,
  onClose 
}: EventDisplayProps) {
  const gameState = useGameStore();

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

  const getEventCategoryStyle = (category: EventCategory): { background: string; border: string } => {
    switch (category) {
      case 'POLITICAL':
        return {
          background: 'bg-blue-50',
          border: 'border-blue-200'
        };
      case 'NATURAL':
        return {
          background: 'bg-red-50',
          border: 'border-red-200'
        };
      case 'ECONOMIC':
        return {
          background: 'bg-yellow-50',
          border: 'border-yellow-200'
        };
      case 'MAGICAL':
        return {
          background: 'bg-purple-50',
          border: 'border-purple-200'
        };
      case 'SOCIAL':
        return {
          background: 'bg-green-50',
          border: 'border-green-200'
        };
      default:
        return {
          background: 'bg-gray-50',
          border: 'border-gray-200'
        };
    }
  };

  const styles = getEventCategoryStyle(event.category);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className={`fixed bottom-4 right-4 w-96 rounded-lg shadow-xl overflow-hidden border-2 z-50 ${styles.background} ${styles.border}`}
    >
      {/* ヘッダー */}
      <div className="p-4 flex items-start gap-3">
        <div className="flex-shrink-0">
          <AlertCircle className={`w-6 h-6 ${styles.background}`} />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold mb-1">{event.name}</h3>
          <p className="text-gray-600 text-sm">{event.description}</p>
        </div>
      </div>

      {/* 効果プレビュー */}
      {event.effects.immediate && (
        <div className="px-4 pb-2">
          <div className="text-sm font-medium text-gray-500 mb-2">予想される影響:</div>
          <EventEffectsDisplay 
            effects={event.effects.immediate(currentGameState)} 
            isPreview={true}
          />
        </div>
      )}

      {/* 選択肢 */}
      {showChoices && event.choices && (
        <div className="p-4 space-y-2">
          {event.choices.map((choice) => (
            <motion.button
              key={choice.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => onChoice?.(choice)}
              className="w-full p-3 text-left hover:bg-white/80 rounded-lg transition-colors border border-gray-200
                        flex items-center justify-between group bg-white/50"
            >
              <span className="text-gray-800">{choice.text}</span>
              {choice.effects.reputation && (
                <div className="flex items-center gap-2 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  {choice.effects.reputation.human !== 0 && (
                    <span className={`font-medium ${choice.effects.reputation.human > 0 ? 'text-blue-600' : 'text-red-600'}`}>
                      {choice.effects.reputation.human > 0 ? '+' : ''}{choice.effects.reputation.human}
                    </span>
                  )}
                  {choice.effects.reputation.monster !== 0 && (
                    <span className={`font-medium ${choice.effects.reputation.monster > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {choice.effects.reputation.monster > 0 ? '+' : ''}{choice.effects.reputation.monster}
                    </span>
                  )}
                </div>
              )}
            </motion.button>
          ))}
        </div>
      )}

      {/* フッター */}
      <div className="bg-gray-50 px-4 py-2 flex justify-between items-center">
        <div className="flex items-center text-sm text-gray-600">
          <Clock className="w-4 h-4 mr-1" />
          {event.duration === 'TEMPORARY' && event.durationValue !== undefined
            ? `残り${event.durationValue}日間`
            : event.duration === 'PERMANENT'
            ? '恒久的な効果'
            : '一時的な効果'}
        </div>
        {!showChoices && onClose && (
          <button
            onClick={onClose}
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            閉じる
          </button>
        )}
      </div>
    </motion.div>
  );
}