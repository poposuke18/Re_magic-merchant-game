// src/components/game/StartScreen.tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/lib/store/gameStore';
import { Scroll, Book, Scale, Crown } from 'lucide-react';

interface StoryStep {
  title: string;
  content: string;
  icon: React.ReactNode;
  color: string;
}

const storySteps: StoryStep[] = [
  {
    title: "魔術商人",
    content: "混沌の時代が訪れようとしていた...",
    icon: <Book className="w-8 h-8" />,
    color: "text-purple-500"
  },
  {
    title: "世界の均衡",
    content: "人間と魔物の力が拮抗する中、あなたは一人の魔術商人として目覚めた。",
    icon: <Scale className="w-8 h-8" />, // Balanceの代わりにScale
    color: "text-blue-500"
  },
  {
    title: "魔術書",
    content: "魔術書を作り、売り、そして世界の均衡を保つ。それがあなたの使命となる。",
    icon: <Scroll className="w-8 h-8" />,
    color: "text-green-500"
  },
  {
    title: "商人としての道",
    content: "人間と魔物、どちらかに肩入れすれば世界は崩壊へと向かうだろう。賢明な取引こそが、この世界を救う鍵となる。",
    icon: <Crown className="w-8 h-8" />,
    color: "text-yellow-500"
  }
];

const StartScreen: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const startGame = useGameStore(state => state.startGame);

  const handleNext = () => {
    if (currentStep < storySteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setIsVisible(false);
      setTimeout(startGame, 500);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white px-4"
        >
          <div className="max-w-xl w-full">
            <motion.div
              key={currentStep}
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="text-center space-y-8"
            >
              {/* アイコンとタイトル */}
              <div className={`flex flex-col items-center gap-4 ${storySteps[currentStep].color}`}>
                {storySteps[currentStep].icon}
                <h1 className="text-4xl font-bold">
                  {storySteps[currentStep].title}
                </h1>
              </div>
              
              {/* コンテンツ */}
              <p className="text-xl leading-relaxed text-gray-300">
                {storySteps[currentStep].content}
              </p>

              {/* ナビゲーションボタン */}
              <div className="flex justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNext}
                  className={`px-8 py-3 rounded-lg font-bold transition-colors ${
                    currentStep < storySteps.length - 1
                      ? 'bg-blue-600 hover:bg-blue-700'
                      : 'bg-purple-600 hover:bg-purple-700'
                  }`}
                >
                  {currentStep < storySteps.length - 1 ? '続ける' : '冒険の始まり'}
                </motion.button>
              </div>

              {/* プログレスインジケーター */}
              <div className="flex justify-center gap-2 mt-8">
                {storySteps.map((_, index) => (
                  <motion.div
                    key={index}
                    initial={false}
                    animate={{
                      scale: index === currentStep ? 1.2 : 1,
                      backgroundColor: index === currentStep ? '#fff' : '#4b5563'
                    }}
                    className={`w-2 h-2 rounded-full transition-colors`}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StartScreen;