// src/components/game/EventEffectsDisplay.tsx
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Coins, Shield, Sword } from 'lucide-react';
import type { EventEffect } from '@/constants/eventSystem';

interface EventEffectsDisplayProps {
    effects: EventEffect;
    isPreview?: boolean;
  }
  
  interface EffectIndicatorProps {
    value: number;
    icon: React.ReactNode;
    label: string;
    colorClass?: string;
  }

  export default function EventEffectsDisplay({ effects, isPreview = false }: EventEffectsDisplayProps) {
    const EffectIndicator = ({ 
      value, 
      icon, 
      label,
      colorClass = value > 0 ? 'text-green-500' : 'text-red-500'
    }: EffectIndicatorProps) => (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 p-2 rounded-lg bg-gray-50"
      >
        <div className={`${colorClass}`}>
          {icon}
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium">{label}</span>
          <span className={`text-xs ${colorClass}`}>
            {value > 0 ? '+' : ''}{value}
            {label.includes('%') ? '%' : ''}
          </span>
        </div>
      </motion.div>
    );


  return (
    <div className="grid grid-cols-2 gap-2">
      {effects.gold && (
        <EffectIndicator
          value={effects.gold}
          icon={<Coins className="w-4 h-4" />}
          label="Gold"
        />
      )}
      {effects.humanPower && (
        <EffectIndicator
          value={effects.humanPower}
          icon={<Shield className="w-4 h-4" />}
          label="Human Power %"
        />
      )}
      {effects.marketTrend && (
        <EffectIndicator
          value={Math.round(effects.marketTrend * 100)}
          icon={effects.marketTrend > 0 
            ? <TrendingUp className="w-4 h-4" />
            : <TrendingDown className="w-4 h-4" />}
          label="Market Trend %"
        />
      )}
      {effects.volatility && (
        <EffectIndicator
          value={Math.round((effects.volatility - 1) * 100)}
          icon={<TrendingUp className="w-4 h-4" />}
          label="Volatility %"
          colorClass={effects.volatility > 1 ? 'text-yellow-500' : 'text-blue-500'}
        />
      )}
      
      {effects.elementBonus && Object.entries(effects.elementBonus).map(([element, bonus]) => (
        <EffectIndicator
          key={element}
          value={Math.round((bonus - 1) * 100)}
          icon={<span className="text-lg">{getElementIcon(element)}</span>}
          label={`${element} Bonus %`}
        />
      ))}
    </div>
  );
}

function getElementIcon(element: string): string {
  switch (element) {
    case 'FIRE': return '🔥';
    case 'ICE': return '❄️';
    case 'WIND': return '🌪️';
    case 'EARTH': return '🌍';
    case 'LIGHTNING': return '⚡';
    default: return '✨';
  }
}