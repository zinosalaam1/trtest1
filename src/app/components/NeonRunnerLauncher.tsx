import { useState } from 'react';
import { motion } from 'motion/react';
import { Home, Settings, Trophy, Shield, Zap, Flame, Star, Users } from 'lucide-react';
import { NeonRunnerGame } from './NeonRunnerGame';

interface NeonRunnerLauncherProps {
  onBack: () => void;
  onOpenSettings?: () => void;
  onNavigateToLeaderboard?: () => void;
  onGameComplete?: (score: number, leaderboardPoints: number, difficulty: string) => void;
}

const DIFFICULTY_INFO = [
  {
    id: 'easy', name: 'Easy', icon: Shield,
    color: 'from-green-600 to-emerald-600', borderColor: 'border-green-500',
    multiplier: 1.0, description: 'Slow obstacles, forgiving timing.',
    features: ['Slow obstacle speed', '3 lives', '1.0x multiplier'],
  },
  {
    id: 'medium', name: 'Medium', icon: Zap,
    color: 'from-yellow-600 to-orange-600', borderColor: 'border-yellow-500',
    multiplier: 1.5, description: 'Balanced speed and obstacle density.',
    features: ['Normal speed', 'More obstacles', '1.5x multiplier'],
  },
  {
    id: 'hard', name: 'Hard', icon: Flame,
    color: 'from-red-600 to-pink-600', borderColor: 'border-red-500',
    multiplier: 2.0, description: 'High speed, relentless obstacles.',
    features: ['Fast obstacles', 'Dense patterns', '2.0x multiplier'],
  },
];

export function NeonRunnerLauncher({ onBack, onOpenSettings, onNavigateToLeaderboard, onGameComplete }: NeonRunnerLauncherProps) {
  const [selectedDifficulty, setSelectedDifficulty] = useState<'easy' | 'medium' | 'hard' | null>(null);
  const [showGame, setShowGame] = useState(false);

  const getTopScores = () => {
    try {
      const scores = JSON.parse(localStorage.getItem('neonrunner_scores') || '[]');
      return scores.sort((a: any, b: any) => b.leaderboardPoints - a.leaderboardPoints).slice(0, 5);
    } catch { return []; }
  };
  const topScores = getTopScores();

  if (showGame && selectedDifficulty) {
    return (
      <NeonRunnerGame
        difficulty={selectedDifficulty}
        onBack={() => { setShowGame(false); setSelectedDifficulty(null); }}
        onOpenSettings={onOpenSettings}
        onGameOver={(score, lbp) => {
          onGameComplete?.(score, lbp, selectedDifficulty);
          setShowGame(false);
          setSelectedDifficulty(null);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#05050f] text-white flex flex-col">
      <header className="bg-[#0a0a18] border-b border-purple-900/50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <Home className="w-5 h-5" /> Back to Library
          </button>
        </div>
        <div className="flex items-center gap-3">
          <motion.button onClick={onNavigateToLeaderboard}
            className="bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 rounded-lg flex items-center gap-2 text-sm"
            whileHover={{scale:1.05}} whileTap={{scale:0.95}}>
            <Trophy className="w-4 h-4" /> Leaderboard
          </motion.button>
          <button onClick={onOpenSettings} className="w-9 h-9 rounded-full bg-gray-700 flex items-center justify-center hover:bg-gray-600">
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-5xl mx-auto">
          <motion.div className="text-center mb-10" initial={{opacity:0,y:-20}} animate={{opacity:1,y:0}}>
            <div className="text-6xl mb-4">⚡</div>
            <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              NEON RUNNER
            </h1>
            <p className="text-lg text-gray-400 max-w-xl mx-auto">
              Sprint through a neon cyberpunk world. Jump over obstacles, grab power-ups, and survive as long as possible!
            </p>
          </motion.div>

          {/* Difficulty */}
          <div className="mb-10">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Star className="w-5 h-5 text-yellow-500" />
              <h2 className="text-2xl font-bold">Select Difficulty</h2>
              <Star className="w-5 h-5 text-yellow-500" />
            </div>
            <div className="grid grid-cols-3 gap-5">
              {DIFFICULTY_INFO.map((diff, idx) => {
                const Icon = diff.icon;
                return (
                  <motion.div key={diff.id}
                    className={`bg-[#0a0a18] rounded-2xl border-2 ${diff.borderColor} p-5 cursor-pointer group hover:shadow-2xl transition-all`}
                    initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:idx*0.1}}
                    whileHover={{scale:1.04,y:-8}} onClick={() => { setSelectedDifficulty(diff.id as any); setShowGame(true); }}>
                    <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${diff.color} flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-center">{diff.name}</h3>
                    <p className="text-gray-400 text-sm text-center mb-4">{diff.description}</p>
                    <ul className="space-y-1.5 mb-4">
                      {diff.features.map((f, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                          <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${diff.color}`} />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <motion.button
                      className={`w-full bg-gradient-to-r ${diff.color} py-2.5 rounded-lg font-semibold text-sm`}
                      whileHover={{scale:1.04}} whileTap={{scale:0.96}}>
                      Play {diff.name}
                    </motion.button>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Game info */}
          <motion.div className="bg-[#0a0a18] rounded-2xl border border-purple-900/50 p-6 mb-8"
            initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.3}}>
            <h3 className="text-lg font-semibold mb-4">How to Play</h3>
            <div className="grid grid-cols-3 gap-6 text-sm text-gray-400">
              <div>
                <div className="text-purple-400 font-medium mb-2">🏃 Run & Jump</div>
                <p>Your runner moves automatically. Press SPACE or click to jump. Double-jump to reach higher!</p>
              </div>
              <div>
                <div className="text-cyan-400 font-medium mb-2">🛡 Power-Ups</div>
                <p>Collect shields to absorb one obstacle hit. Grab the slow power-up to buy reaction time.</p>
              </div>
              <div>
                <div className="text-yellow-400 font-medium mb-2">📈 Score</div>
                <p>You earn 1 point per frame survived. Higher difficulties multiply your leaderboard score.</p>
              </div>
            </div>
          </motion.div>

          {/* Top scores */}
          {topScores.length > 0 && (
            <motion.div className="bg-[#0a0a18] rounded-2xl border border-gray-800 p-6"
              initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.4}}>
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3"><Trophy className="w-5 h-5 text-yellow-500" /><h2 className="text-xl font-bold">Your Best Runs</h2></div>
                <button onClick={onNavigateToLeaderboard} className="text-purple-400 text-sm flex items-center gap-1 hover:text-purple-300">
                  View All <Users className="w-3 h-3" />
                </button>
              </div>
              <div className="space-y-2">
                {topScores.map((s: any, i: number) => (
                  <div key={i} className="bg-gray-800 rounded-lg p-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${i===0?'bg-yellow-500 text-black':i===1?'bg-gray-400 text-black':i===2?'bg-orange-600 text-white':'bg-gray-700 text-white'}`}>{i+1}</div>
                      <div>
                        <div className="text-white text-sm font-medium">{s.score?.toLocaleString()} pts</div>
                        <div className="text-xs text-gray-400">{s.difficulty} • {new Date(s.timestamp||s.date).toLocaleDateString()}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-green-400 font-bold text-sm">{s.leaderboardPoints?.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">LB Points</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
