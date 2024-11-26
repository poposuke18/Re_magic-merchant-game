// src/types/event.d.ts
import { GameEvent, EventChoice } from '@/constants/eventSystem';

export interface EventDisplayProps {
  event: GameEvent;
  onChoice?: (choice: EventChoice) => void;
  showChoices: boolean;
  onClose?: () => void;
}