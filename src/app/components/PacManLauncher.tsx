import { useState } from 'react';
import { motion } from 'motion/react';
import { Home, Settings, Trophy, Zap, Shield, Flame, Star, TrendingUp, Award, Users } from 'lucide-react';
import logo from '../../assets/trbg.png';
import { PacManGame } from './PacManGame';

interface PacManLauncherProps {
  onBack: () => void;
  onOpenSettings?: () => void;
  onNavigateToLeaderboard?: () => void;
  onGameComplete?: (score: number, leaderboardPoints: number, difficulty: string) => void;
}

const DIFFICULTY_INFO = [
  {
    id: 'easy',
    name: 'Easy',
    icon: Shield,
    color: 'from-green-600 to-emerald-600',
    borderColor: 'border-green-500',
    multiplier: 1.0,
    ghostSpeed: 'Slow',
    description: 'Perfect for beginners. Ghosts move slowly.',
    features: ['Slower ghosts', 'More time to react', '1.0x score multiplier']
  },
  {
    id: 'medium',
    name: 'Medium',
    icon: Zap,
    color: 'from-yellow-600 to-orange-600',
    borderColor: 'border-yellow-500',
    multiplier: 1.5,
    ghostSpeed: 'Normal',
    description: 'Balanced challenge with better rewards.',
    features: ['Normal ghost speed', 'Standard gameplay', '1.5x score multiplier']
  },
  {
    id: 'hard',
    name: 'Hard',
    icon: Flame,
    color: 'from-red-600 to-pink-600',
    borderColor: 'border-red-500',
    multiplier: 2.0,
    ghostSpeed: 'Fast',
    description: 'For experienced players. Maximum points!',
    features: ['Fast ghosts', 'High difficulty', '2.0x score multiplier']
  }
];

export function PacManLauncher({ onBack, onOpenSettings, onNavigateToLeaderboard, onGameComplete }: PacManLauncherProps) {
  const [selectedDifficulty, setSelectedDifficulty] = useState<'easy' | 'medium' | 'hard' | null>(null);
  const [showGame, setShowGame] = useState(false);

  // Get top scores from localStorage
  const getTopScores = () => {
    const scores = JSON.parse(localStorage.getItem('pacman_scores') || '[]');
    return scores
      .sort((a: any, b: any) => b.leaderboardPoints - a.leaderboardPoints)
      .slice(0, 5);
  };

  const topScores = getTopScores();

  const handleStartGame = (difficulty: 'easy' | 'medium' | 'hard') => {
    setSelectedDifficulty(difficulty);
    setShowGame(true);
  };

  const handleGameOver = (score: number, leaderboardPoints: number) => {
    if (selectedDifficulty) {
      onGameComplete?.(score, leaderboardPoints, selectedDifficulty);
    }
    setShowGame(false);
    setSelectedDifficulty(null);
  };

  if (showGame && selectedDifficulty) {
    return (
      <PacManGame
        difficulty={selectedDifficulty}
        onBack={() => {
          setShowGame(false);
          setSelectedDifficulty(null);
        }}
        onOpenSettings={onOpenSettings}
        onGameOver={handleGameOver}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#1a1a1f] text-white flex flex-col">
      {/* Header */}
      <header className="bg-[#0f0f13] border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <Home className="w-5 h-5" />
            Back to Library
          </button>
          <img src={logo} alt="Tour Arcade" className="h-8" />
        </div>

        <div className="flex items-center gap-3">
          <motion.button
            onClick={onNavigateToLeaderboard}
            className="bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 rounded-lg flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Trophy className="w-5 h-5" />
            Leaderboard
          </motion.button>
          <button
            onClick={onOpenSettings}
            className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-7xl mx-auto">
          {/* Game Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent">
              PAC-MAN
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              The classic arcade game reimagined for Tour Arcade. Choose your difficulty and climb the global leaderboard!
            </p>
          </motion.div>

          {/* Difficulty Selection */}
          <div className="mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Star className="w-6 h-6 text-yellow-500" />
              <h2 className="text-3xl font-bold">Select Difficulty</h2>
              <Star className="w-6 h-6 text-yellow-500" />
            </div>
            
            <div className="grid grid-cols-3 gap-6 max-w-5xl mx-auto">
              {DIFFICULTY_INFO.map((diff, idx) => {
                const Icon = diff.icon;
                return (
                  <motion.div
                    key={diff.id}
                    className={`bg-[#0f0f13] rounded-2xl border-2 ${diff.borderColor} p-6 cursor-pointer group hover:shadow-2xl transition-all`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ scale: 1.05, y: -10 }}
                    onClick={() => handleStartGame(diff.id as any)}
                  >
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${diff.color} flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-2 text-center">{diff.name}</h3>
                    <p className="text-gray-400 text-sm text-center mb-4">{diff.description}</p>
                    
                    <div className="bg-gray-800 rounded-lg p-3 mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-400">Ghost Speed</span>
                        <span className="text-white font-semibold">{diff.ghostSpeed}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">Score Multiplier</span>
                        <span className={`font-bold bg-gradient-to-r ${diff.color} bg-clip-text text-transparent`}>
                          {diff.multiplier}x
                        </span>
                      </div>
                    </div>

                    <ul className="space-y-2 mb-4">
                      {diff.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                          <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${diff.color}`}></div>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <motion.button
                      className={`w-full bg-gradient-to-r ${diff.color} py-3 rounded-lg font-semibold group-hover:shadow-lg transition-shadow`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Play {diff.name}
                    </motion.button>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Scoring Info */}
          <motion.div
            className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-2xl border border-purple-700 p-8 mb-12 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-6 h-6 text-purple-400" />
              <h2 className="text-2xl font-bold">How Scoring Works</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-purple-400">Game Score</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between">
                    <span className="text-gray-300">Dot</span>
                    <span className="text-yellow-400 font-semibold">+10 points</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-300">Power Pellet</span>
                    <span className="text-yellow-400 font-semibold">+50 points</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-300">Ghost (powered)</span>
                    <span className="text-yellow-400 font-semibold">+200 points</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-300">Level Complete</span>
                    <span className="text-yellow-400 font-semibold">+1000 points</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3 text-green-400">Leaderboard Points</h3>
                <div className="bg-gray-900/50 rounded-lg p-4 mb-3">
                  <div className="text-center mb-2">
                    <div className="text-2xl font-bold text-white mb-1">
                      Game Score × Difficulty Multiplier
                    </div>
                    <div className="text-sm text-gray-400">= Leaderboard Points</div>
                  </div>
                </div>
                <div className="text-sm text-gray-300 space-y-1">
                  <div className="flex justify-between">
                    <span>Easy (1.0x):</span>
                    <span>1000 → <span className="text-green-400">1000 pts</span></span>
                  </div>
                  <div className="flex justify-between">
                    <span>Medium (1.5x):</span>
                    <span>1000 → <span className="text-green-400">1500 pts</span></span>
                  </div>
                  <div className="flex justify-between">
                    <span>Hard (2.0x):</span>
                    <span>1000 → <span className="text-green-400">2000 pts</span></span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-purple-700">
              <div className="flex items-start gap-3">
                <Award className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-1" />
                <div className="text-sm text-gray-300">
                  <strong className="text-white">Global Ranking:</strong> Your position on the leaderboard is determined by your <strong className="text-green-400">total accumulated leaderboard points</strong> from all games played. Choose higher difficulties to climb faster!
                </div>
              </div>
            </div>
          </motion.div>

          {/* Recent Top Scores */}
          {topScores.length > 0 && (
            <motion.div
              className="bg-[#0f0f13] rounded-2xl border border-gray-800 p-8 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Trophy className="w-6 h-6 text-yellow-500" />
                  <h2 className="text-2xl font-bold">Your Top Scores</h2>
                </div>
                <motion.button
                  onClick={onNavigateToLeaderboard}
                  className="text-purple-400 hover:text-purple-300 text-sm flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                >
                  View Full Leaderboard
                  <Users className="w-4 h-4" />
                </motion.button>
              </div>

              <div className="space-y-3">
                {topScores.map((score: any, idx: number) => (
                  <motion.div
                    key={idx}
                    className="bg-gray-800 rounded-lg p-4 flex items-center justify-between"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + idx * 0.1 }}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                        idx === 0 ? 'bg-yellow-500 text-black' :
                        idx === 1 ? 'bg-gray-400 text-black' :
                        idx === 2 ? 'bg-orange-600 text-white' :
                        'bg-gray-700 text-white'
                      }`}>
                        {idx + 1}
                      </div>
                      <div>
                        <div className="text-white font-semibold">{score.score.toLocaleString()} points</div>
                        <div className="text-sm text-gray-400">
                          {score.difficulty.charAt(0).toUpperCase() + score.difficulty.slice(1)} • {new Date(score.timestamp).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-green-400 font-bold">{score.leaderboardPoints.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">Leaderboard Pts</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Game Preview */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="inline-block bg-gradient-to-r from-yellow-500 via-orange-500 to-pink-500 p-1 rounded-2xl">
              <div className="bg-[#1a1a1f] rounded-xl p-8">
                <div className="text-6xl mb-4">🟡 👻 👻 👻 👻</div>
                <p className="text-gray-400">
                  Navigate the maze, eat dots, avoid ghosts, and score big!
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
