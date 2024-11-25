// src/components/game/EventDisplay.tsx
import { motion } from 'framer-motion';
import { AlertCircle, Clock, Coins, Shield, Sword } from 'lucide-react';
import { GameEvent, EventChoice } from '@/constants/eventSystem';
import EventEffectsDisplay from './EventEffectsDisplay';
import { useGameStore } from '@/lib/store/gameStore';


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
  const getEventCategoryIcon = () => {
    switch (event.category) {
      case 'POLITICAL':
        return <Shield className="w-6 h-6 text-blue-500" />;
      case 'NATURAL':
        return <AlertCircle className="w-6 h-6 text-red-500" />;
      case 'ECONOMIC':
        return <Coins className="w-6 h-6 text-yellow-500" />;
      case 'MAGICAL':
        return <Sword className="w-6 h-6 text-purple-500" />;
      default:
        return <AlertCircle className="w-6 h-6 text-gray-500" />;
    }
  };

  const getEventCategoryColor = () => {
    switch (event.category) {
      case 'POLITICAL': return 'bg-blue-50 border-blue-200';
      case 'NATURAL': return 'bg-red-50 border-red-200';
      case 'ECONOMIC': return 'bg-yellow-50 border-yellow-200';
      case 'MAGICAL': return 'bg-purple-50 border-purple-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className={`fixed bottom-4 right-4 w-96 rounded-lg shadow-xl overflow-hidden border-2 ${getEventCategoryColor()}`}
    >
      {/* ヘッダー */}
      <div className="p-4 flex items-start gap-3">
        <div className="flex-shrink-0">
          {getEventCategoryIcon()}
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
            effects={event.effects.immediate(gameState)} 
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
              className="w-full p-3 text-left hover:bg-white/50 rounded-lg transition-colors border border-gray-200
                        flex items-center justify-between group"
            >
              <span className="flex-1">{choice.text}</span>
              {choice.effects.reputation && (
                <div className="flex items-center gap-2 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-blue-500">
                    {choice.effects.reputation.human > 0 && `+${choice.effects.reputation.human}`}
                  </span>
                  <span className="text-red-500">
                    {choice.effects.reputation.monster > 0 && `+${choice.effects.reputation.monster}`}
                  </span>
                </div>
              )}
            </motion.button>
          ))}
        </div>
      )}

      {/* フッター */}
      <div className="bg-black/5 px-4 py-2 flex justify-between items-center">
        <div className="flex items-center text-sm text-gray-500">
          <Clock className="w-4 h-4 mr-1" />
          {event.duration === 'TEMPORARY' 
            ? `残り${event.durationValue}日間` 
            : event.duration === 'PERMANENT'
            ? '恒久的な効果'
            : '一時的な効果'}
        </div>
        {!showChoices && onClose && (
          <button
            onClick={onClose}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            閉じる
          </button>
        )}
      </div>
    </motion.div>
  );
}