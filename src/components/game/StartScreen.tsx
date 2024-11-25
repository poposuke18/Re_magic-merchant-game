// src/components/game/StartScreen.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/lib/store/gameStore';

const storySteps = [
  {
    title: "魔術商人",
    content: "混沌の時代が訪れようとしていた...",
  },
  {
    title: "世界の均衡",
    content: "人間と魔物の力が拮抗する中、あなたは一人の魔術商人として目覚めた。",
  },
  {
    title: "魔術書",
    content: "魔術書を作り、売り、そして世界の均衡を保つ。それがあなたの使命となる。",
  },
  {
    title: "商人としての道",
    content: "人間と魔物、どちらかに肩入れすれば世界は崩壊へと向かうだろう。賢明な取引こそが、この世界を救う鍵となる。",
  }
];

export default function StartScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const startGame = useGameStore(state => state.startGame);

  const handleNext = () => {
    if (currentStep < storySteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setIsVisible(false);
      setTimeout(startGame, 500);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white"
        >
          <div className="max-w-xl w-full px-4">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center space-y-8"
            >
              <h1 className="text-4xl mb-8 font-bold">
                {storySteps[currentStep].title}
              </h1>
              
              <p className="text-xl mb-12 leading-relaxed">
                {storySteps[currentStep].content}
              </p>

              <div className="flex justify-center gap-4">
                {currentStep < storySteps.length - 1 ? (
                  <button
                    onClick={handleNext}
                    className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-bold transition-colors"
                  >
                    続ける
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-bold transition-colors"
                  >
                    冒険の始まり
                  </button>
                )}
              </div>

              <div className="flex justify-center gap-2 mt-8">
                {storySteps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentStep ? 'bg-white' : 'bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}