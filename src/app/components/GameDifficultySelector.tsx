import { motion } from 'motion/react';
import { Shield, Zap, Flame, Star } from 'lucide-react';

interface DifficultyOption {
  id: 'easy' | 'medium' | 'hard';
  name: string;
  icon: typeof Shield;
  color: string;
  borderColor: string;
  multiplier: number;
  speedLabel: string;
  description: string;
  features: string[];
}

interface GameDifficultySelectorProps {
  onSelectDifficulty: (difficulty: 'easy' | 'medium' | 'hard') => void;
  gameTitle: string;
}

const DIFFICULTY_OPTIONS: DifficultyOption[] = [
  {
    id: 'easy',
    name: 'Easy',
    icon: Shield,
    color: 'from-green-600 to-emerald-600',
    borderColor: 'border-green-500',
    multiplier: 1.0,
    speedLabel: 'Slow',
    description: 'Perfect for beginners. Ghosts move slowly.',
    features: ['Slower enemies', 'More time to react', '1.0x score multiplier']
  },
  {
    id: 'medium',
    name: 'Medium',
    icon: Zap,
    color: 'from-yellow-600 to-orange-600',
    borderColor: 'border-yellow-500',
    multiplier: 1.5,
    speedLabel: 'Normal',
    description: 'Balanced challenge with better rewards.',
    features: ['Normal enemy speed', 'Standard gameplay', '1.5x score multiplier']
  },
  {
    id: 'hard',
    name: 'Hard',
    icon: Flame,
    color: 'from-red-600 to-pink-600',
    borderColor: 'border-red-500',
    multiplier: 2.0,
    speedLabel: 'Fast',
    description: 'For experienced players. Maximum points!',
    features: ['Fast enemies', 'High difficulty', '2.0x score multiplier']
  }
];

export function GameDifficultySelector({ onSelectDifficulty, gameTitle }: GameDifficultySelectorProps) {
  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="max-w-6xl w-full">
        {/* Title */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Star className="w-8 h-8 text-yellow-500" />
            <h1 className="text-5xl">Select Difficulty</h1>
            <Star className="w-8 h-8 text-yellow-500" />
          </div>
          <p className="text-gray-400 text-xl">Choose your challenge level for {gameTitle}</p>
        </motion.div>

        {/* Difficulty Cards */}
        <div className="grid grid-cols-3 gap-8">
          {DIFFICULTY_OPTIONS.map((difficulty, idx) => {
            const Icon = difficulty.icon;
            return (
              <motion.div
                key={difficulty.id}
                className={`relative bg-[#1a1a1f] border-2 ${difficulty.borderColor} rounded-2xl p-8 cursor-pointer group`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.15, duration: 0.5 }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -10,
                  boxShadow: `0 20px 50px ${difficulty.id === 'easy' ? 'rgba(34, 197, 94, 0.3)' : difficulty.id === 'medium' ? 'rgba(234, 179, 8, 0.3)' : 'rgba(220, 38, 38, 0.3)'}`
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectDifficulty(difficulty.id)}
              >
                {/* Icon */}
                <motion.div
                  className={`w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br ${difficulty.color} flex items-center justify-center`}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <Icon className="w-12 h-12 text-white" />
                </motion.div>

                {/* Title */}
                <h2 className="text-3xl text-center mb-2">{difficulty.name}</h2>
                <p className="text-gray-400 text-center mb-6">{difficulty.description}</p>

                {/* Stats Box */}
                <div className="bg-[#0f0f13] rounded-xl p-4 mb-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Enemy Speed</span>
                    <span className={`font-bold ${difficulty.id === 'easy' ? 'text-green-400' : difficulty.id === 'medium' ? 'text-yellow-400' : 'text-red-400'}`}>
                      {difficulty.speedLabel}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Score Multiplier</span>
                    <span className={`font-bold ${difficulty.id === 'easy' ? 'text-green-400' : difficulty.id === 'medium' ? 'text-yellow-400' : 'text-red-400'}`}>
                      {difficulty.multiplier}x
                    </span>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-2">
                  {difficulty.features.map((feature, featureIdx) => (
                    <motion.div
                      key={featureIdx}
                      className="flex items-center gap-2 text-sm"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.15 + featureIdx * 0.1 }}
                    >
                      <div className={`w-2 h-2 rounded-full ${difficulty.id === 'easy' ? 'bg-green-500' : difficulty.id === 'medium' ? 'bg-yellow-500' : 'bg-red-500'}`} />
                      <span className="text-gray-300">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Hover Effect Glow */}
                <motion.div
                  className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`}
                  style={{
                    background: `radial-gradient(circle at center, ${difficulty.id === 'easy' ? 'rgba(34, 197, 94, 0.1)' : difficulty.id === 'medium' ? 'rgba(234, 179, 8, 0.1)' : 'rgba(220, 38, 38, 0.1)'} 0%, transparent 70%)`
                  }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Pro Tip */}
        <motion.div
          className="text-center mt-12 text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-sm">💡 Pro Tip: Higher difficulty = More leaderboard points!</p>
        </motion.div>
      </div>
    </div>
  );
}
