import { Menu, Search, Settings, Home, Users, Trophy, Gift, Sparkles, ShoppingCart, Crown, Zap, Flame, Target, Swords, Clock, Users as UsersIcon } from 'lucide-react';
import logo from '../../assets/trbg.png';

import { useState } from 'react';
import { motion } from 'motion/react';

interface QuickMatchPageProps {
  onBack: () => void;
  onOpenSettings?: () => void;
  onOpenProfile?: () => void;
  onNavigate: (page: string) => void;
}

const gameModes = [
  { id: 1, name: '1v1 Duel', players: '2 Players', time: '5-10 min', icon: '⚔️', color: 'from-red-600 to-orange-600', active: 1247 },
  { id: 2, name: 'Team Battle', players: '4v4', time: '15-20 min', icon: '🛡️', color: 'from-blue-600 to-cyan-600', active: 3891 },
  { id: 3, name: 'Battle Royale', players: '50 Players', time: '20-30 min', icon: '💥', color: 'from-purple-600 to-pink-600', active: 8452 },
  { id: 4, name: 'Speed Run', players: '1 Player', time: '3-5 min', icon: '⚡', color: 'from-yellow-600 to-orange-600', active: 892 },
];

const activeMatches = [
  { id: 1, game: 'Traffic Rider', mode: '1v1', prize: '$50', players: '2/2', status: 'Starting Soon' },
  { id: 2, game: 'Cyber Hunter', mode: 'Battle Royale', prize: '$500', players: '48/50', status: 'Filling Up' },
  { id: 3, game: 'GTA V', mode: 'Team Battle', prize: '$200', players: '6/8', status: 'Open' },
];

export function QuickMatchPage({ onBack, onOpenSettings, onOpenProfile, onNavigate }: QuickMatchPageProps) {
  const [selectedMode, setSelectedMode] = useState<number | null>(null);
  const [searching, setSearching] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Left Sidebar */}
      <div className="w-16 bg-[#0f0f13] flex flex-col items-center py-6 gap-6 border-r border-gray-800">
        <button 
          onClick={onBack}
          className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors"
        >
          <Home className="w-5 h-5" />
        </button>
        <button 
          onClick={onOpenProfile}
          className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors"
        >
          <Users className="w-5 h-5" />
        </button>
        <button 
          onClick={() => onNavigate('tournaments')}
          className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors"
        >
          <Trophy className="w-5 h-5" />
        </button>
        <button 
          onClick={() => onNavigate('marketplace')}
          className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors"
        >
          <Gift className="w-5 h-5" />
        </button>
        <button 
          onClick={() => onNavigate('events')}
          className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors"
        >
          <Sparkles className="w-5 h-5" />
        </button>
        <button 
          onClick={() => onNavigate('shop')}
          className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors"
        >
          <ShoppingCart className="w-5 h-5" />
        </button>
        <button 
          onClick={() => onNavigate('premium')}
          className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors"
        >
          <Crown className="w-5 h-5" />
        </button>
        <button className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-600 to-orange-600 flex items-center justify-center">
          <Zap className="w-5 h-5" />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-[#0f0f13] border-b border-gray-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button className="text-gray-400 hover:text-white">
              <Menu className="w-6 h-6" />
            </button>
            <img src={logo} alt="Tour Arcade" className="h-8" />
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={onOpenSettings}
              className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center hover:bg-gray-500 transition-colors"
            >
              <Settings className="w-5 h-5" />
            </button>
            <button 
              onClick={onOpenProfile}
              className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer"
            >
              <img 
                src="https://placehold.co/400x200/1a0533/a855f7?text=Tour+Arcade"
                alt="User"
                className="w-full h-full rounded-full object-cover"
              />
            </button>
          </div>
        </header>

        {/* Quick Match Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
            {/* Hero */}
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <motion.div
                  animate={{ 
                    scale: [1, 1.3, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Zap className="w-12 h-12 text-yellow-500" />
                </motion.div>
                <h1 className="text-5xl">Quick Match</h1>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Flame className="w-12 h-12 text-orange-500" />
                </motion.div>
              </div>
              <p className="text-xl text-gray-400">Jump into instant action and compete for prizes!</p>
            </motion.div>

            {/* Game Modes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
              {gameModes.map((mode, idx) => (
                <motion.div
                  key={mode.id}
                  className={`bg-gradient-to-br ${mode.color} rounded-xl p-1 cursor-pointer`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ 
                    scale: 1.05, 
                    boxShadow: "0 20px 60px rgba(234, 179, 8, 0.5)"
                  }}
                  onClick={() => {
                    if (mode.id === 1) onNavigate('duelmatch');
                    else if (mode.id === 2) onNavigate('teambattle');
                    else setSelectedMode(mode.id);
                  }}
                >
                  <div className={`bg-[#1a1a1f] rounded-xl p-8 ${selectedMode === mode.id ? 'ring-2 ring-white' : ''}`}>
                    <div className="flex items-center gap-6">
                      <motion.div 
                        className="text-7xl"
                        animate={{ 
                          rotate: [0, 10, -10, 0],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ duration: 2, repeat: Infinity, delay: idx * 0.3 }}
                      >
                        {mode.icon}
                      </motion.div>
                      <div className="flex-1">
                        <h3 className="text-3xl mb-2">{mode.name}</h3>
                        <div className="space-y-1 text-gray-300">
                          <div className="flex items-center gap-2">
                            <UsersIcon className="w-4 h-4" />
                            {mode.players}
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {mode.time}
                          </div>
                          <div className="flex items-center gap-2 text-green-400">
                            <Flame className="w-4 h-4" />
                            {mode.active.toLocaleString()} active
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Search Button */}
            {selectedMode && !searching && (
              <motion.div 
                className="text-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <motion.button
                  onClick={() => setSearching(true)}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 px-16 py-6 rounded-xl text-2xl"
                  whileHover={{ 
                    scale: 1.1,
                    boxShadow: "0 0 50px rgba(34, 197, 94, 0.6)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    boxShadow: [
                      "0 0 0px rgba(34, 197, 94, 0)",
                      "0 0 30px rgba(34, 197, 94, 0.5)",
                      "0 0 0px rgba(34, 197, 94, 0)"
                    ]
                  }}
                  transition={{
                    boxShadow: { duration: 2, repeat: Infinity }
                  }}
                >
                  Find Match
                </motion.button>
              </motion.div>
            )}

            {/* Searching Animation */}
            {searching && (
              <motion.div 
                className="text-center mb-12 bg-[#1a1a1f] rounded-xl p-12"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <motion.div 
                  className="text-8xl mb-6"
                  animate={{ 
                    rotate: 360,
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                    scale: { duration: 1, repeat: Infinity }
                  }}
                >
                  🎯
                </motion.div>
                <h2 className="text-3xl mb-4">Searching for opponents...</h2>
                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className="text-2xl text-gray-400">Est. time:</div>
                  <div className="text-2xl text-green-400">0:23</div>
                </div>
                <motion.button
                  onClick={() => setSearching(false)}
                  className="bg-red-600 px-4 sm:px-8 py-3 rounded-lg hover:bg-red-700 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Cancel Search
                </motion.button>
              </motion.div>
            )}

            {/* Active Matches */}
            <div>
              <h2 className="text-2xl mb-6 flex items-center gap-2">
                <Swords className="w-6 h-6" />
                Active Matches
              </h2>
              <div className="space-y-4">
                {activeMatches.map((match, idx) => (
                  <motion.div
                    key={match.id}
                    className="bg-[#1a1a1f] rounded-xl p-6 border border-gray-800 hover:border-purple-600 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ x: 10 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center text-2xl">
                          🎮
                        </div>
                        <div>
                          <h3 className="text-xl mb-1">{match.game}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-400">
                            <span>{match.mode}</span>
                            <span>•</span>
                            <span className="text-green-400">{match.prize} Prize</span>
                            <span>•</span>
                            <span>{match.players}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`px-4 py-2 rounded-lg text-sm ${
                          match.status === 'Starting Soon' ? 'bg-orange-600' :
                          match.status === 'Filling Up' ? 'bg-yellow-600' :
                          'bg-green-600'
                        }`}>
                          {match.status}
                        </span>
                        <motion.button
                          className="bg-purple-600 px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Spectate
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
