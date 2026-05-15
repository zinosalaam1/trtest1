import { useState } from 'react';
import { motion } from 'motion/react';
import { Menu, Search, Settings, Bell, MessageCircle, Home, Users, Trophy, Gift, Sparkles, ShoppingCart, Crown, Zap, Star, TrendingUp, Award, Gamepad2, Target, Lock, LogOut } from 'lucide-react';
import logo from '../../assets/trbg.png';
import { ParticleEffect } from './ParticleEffect';


interface FreeHomePageProps {
  onSignOut: () => void;
  onOpenSettings: () => void;
  onOpenProfile: () => void;
  onNavigate?: (page: string) => void;
  gameState?: any;
}

const freeGames = [
  {
    id: 'pacman',
    title: 'PAC-MAN',
    image: 'https://placehold.co/400x200/1a0533/a855f7?text=Tour+Arcade',
    category: 'Arcade',
    players: '45.2K',
    rating: 5.0,
    description: 'Classic arcade action'
  },
  {
    id: 'amongus',
    title: 'Among Us Challenge',
    image: 'https://placehold.co/400x200/1a0533/a855f7?text=Tour+Arcade',
    category: 'Arcade',
    players: '38.5K',
    rating: 4.9,
    description: 'Complete tasks and survive'
  }
];

const freeAchievements = [
  { id: '1', title: 'First Game', icon: '🎮', unlocked: true, progress: 1, total: 1 },
  { id: '2', title: 'Score 1000', icon: '🎯', unlocked: true, progress: 1, total: 1 },
  { id: '3', title: 'Play 10 Games', icon: '🔟', unlocked: false, progress: 7, total: 10 },
  { id: '4', title: 'Top 100', icon: '🏆', unlocked: false, progress: 45, total: 100 }
];

const globalLeaderboard = [
  { rank: 1, username: 'GhostHunter', score: 125430, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=skillmaster', tier: 'diamond' },
  { rank: 2, username: 'PacMaster', score: 118920, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=speedrunner', tier: 'platinum' },
  { rank: 3, username: 'DotEater', score: 112340, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=arcadeking', tier: 'platinum' },
  { rank: 4, username: 'MazeRunner', score: 98750, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=elitegamer', tier: 'gold' },
  { rank: 5, username: localStorage.getItem('ta_username') || 'You', score: 87230, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user', tier: 'gold', isYou: true }
];

export function FreeHomePage({ onSignOut, onOpenSettings, onOpenProfile, onNavigate, gameState }: FreeHomePageProps) {
  const [selectedSidebarItem, setSelectedSidebarItem] = useState('home');

  const handleUpgradeClick = () => {
    onNavigate?.('premium');
  };

  return (
    <div className="min-h-screen bg-[#1a1a1f] text-white flex">
      <ParticleEffect />
      
      {/* Left Sidebar */}
      <div className="w-20 bg-[#0f0f13] flex flex-col items-center py-6 gap-4 border-r border-gray-800 relative z-10">
        <button 
          onClick={() => setSelectedSidebarItem('home')}
          className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
            selectedSidebarItem === 'home' 
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg shadow-purple-600/50' 
              : 'bg-gray-700 hover:bg-gray-600'
          }`}
        >
          <Home className="w-6 h-6" />
        </button>
        
        <button 
          onClick={() => onNavigate?.('gamelibrary')}
          className="w-12 h-12 rounded-xl bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-all"
        >
          <Gamepad2 className="w-6 h-6" />
        </button>

        <button 
          onClick={() => onNavigate?.('leaderboards')}
          className="w-12 h-12 rounded-xl bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-all"
        >
          <Trophy className="w-6 h-6" />
        </button>

        <button 
          onClick={onOpenProfile}
          className="w-12 h-12 rounded-xl bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-all"
        >
          <Users className="w-6 h-6" />
        </button>

        {/* Locked Premium Features */}
        <div className="mt-auto space-y-4">
          <div className="relative group">
            <button 
              onClick={handleUpgradeClick}
              className="w-12 h-12 rounded-xl bg-gray-800 flex items-center justify-center opacity-50 cursor-not-allowed relative"
            >
              <Trophy className="w-6 h-6" />
              <Lock className="w-3 h-3 absolute top-1 right-1 text-gray-500" />
            </button>
            <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-gray-900 px-3 py-2 rounded-lg text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <div className="font-semibold mb-1">Tournaments 🔒</div>
              <div className="text-gray-400">Upgrade to unlock</div>
            </div>
          </div>

          <button 
            onClick={handleUpgradeClick}
            className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center hover:opacity-90 transition-all"
          >
            <Crown className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-[#0f0f13] border-b border-gray-800 px-6 py-4 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-6">
            <button className="text-gray-400 hover:text-white">
              <Menu className="w-6 h-6" />
            </button>
            <img src={logo} alt="Tour Arcade" className="h-8" />
            <div className="bg-blue-600/20 border border-blue-600 px-4 py-1 rounded-full text-sm flex items-center gap-2">
              <Zap className="w-4 h-4 text-blue-400" />
              <span className="text-blue-400 font-semibold">FREE PLAN</span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search games, players, achievements..."
                className="w-full bg-[#2a2a32] border-0 rounded-full pl-12 pr-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          {/* User Icons */}
          <div className="flex items-center gap-3">
            <motion.button 
              onClick={() => onNavigate?.('notifications')}
              className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center hover:bg-gray-500 transition-colors relative"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-red-600 w-5 h-5 rounded-full text-xs flex items-center justify-center">2</span>
            </motion.button>
            <motion.button 
              onClick={() => onNavigate?.('messages')}
              className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center hover:bg-gray-500 transition-colors relative"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageCircle className="w-5 h-5" />
            </motion.button>
            <button 
              onClick={onOpenSettings}
              className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center hover:bg-gray-500 transition-colors"
            >
              <Settings className="w-5 h-5" />
            </button>
            <button 
              onClick={onOpenProfile}
              className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer"
            >
              <img 
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=user"
                alt="User"
                className="w-full h-full rounded-full object-cover"
              />
            </button>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto p-6 space-y-6">
            {/* Welcome Section */}
            <motion.div
              className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-2xl border border-blue-700 p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold mb-2">Welcome to Tour Arcade!</h1>
                  <p className="text-gray-300 text-lg mb-4">
                    You're on the <span className="text-blue-400 font-semibold">Free Plan</span> - Play unlimited games and compete on leaderboards
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-sm text-gray-400">All games unlocked</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-sm text-gray-400">Global leaderboards</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-sm text-gray-400">Achievements</span>
                    </div>
                  </div>
                </div>
                <motion.button
                  onClick={handleUpgradeClick}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Crown className="w-5 h-5" />
                  Upgrade to Standard
                </motion.button>
              </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-4 gap-4">
              <motion.div
                className="bg-[#0f0f13] rounded-xl p-6 border border-gray-800"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-blue-600/20 flex items-center justify-center">
                    <Gamepad2 className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{gameState?.user?.totalGames || 0}</div>
                    <div className="text-xs text-gray-400">Games Played</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="bg-[#0f0f13] rounded-xl p-6 border border-gray-800"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-purple-600/20 flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">#{globalLeaderboard.find(p => p.isYou)?.rank || '-'}</div>
                    <div className="text-xs text-gray-400">Global Rank</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="bg-[#0f0f13] rounded-xl p-6 border border-gray-800"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-yellow-600/20 flex items-center justify-center">
                    <Award className="w-5 h-5 text-yellow-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{freeAchievements.filter(a => a.unlocked).length}/{freeAchievements.length}</div>
                    <div className="text-xs text-gray-400">Achievements</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="bg-[#0f0f13] rounded-xl p-6 border border-gray-800"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-green-600/20 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{gameState?.user?.level || 1}</div>
                    <div className="text-xs text-gray-400">Level</div>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="grid grid-cols-3 gap-6">
              {/* Featured Game */}
              <div className="col-span-2 space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold">Available Games</h2>
                    <button 
                      onClick={() => onNavigate?.('gamelibrary')}
                      className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1"
                    >
                      View All
                      <TrendingUp className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {freeGames.map((game, idx) => (
                      <motion.div
                        key={game.id}
                        className="bg-[#0f0f13] rounded-xl border border-gray-800 overflow-hidden group cursor-pointer hover:border-blue-600 transition-all"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + idx * 0.1 }}
                        onClick={() => onNavigate?.('pacman')}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex">
                          <div className="w-48 h-32 relative overflow-hidden">
                            <img
                              src={game.image}
                              alt={game.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0f0f13]"></div>
                          </div>
                          <div className="flex-1 p-4 flex items-center justify-between">
                            <div>
                              <h3 className="text-xl font-bold mb-1">{game.title}</h3>
                              <p className="text-sm text-gray-400 mb-2">{game.description}</p>
                              <div className="flex items-center gap-4 text-sm">
                                <div className="flex items-center gap-1">
                                  <Users className="w-4 h-4 text-gray-500" />
                                  <span className="text-gray-400">{game.players} playing</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                  <span className="text-gray-400">{game.rating}</span>
                                </div>
                              </div>
                            </div>
                            <motion.button
                              className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 rounded-lg font-semibold flex items-center gap-2"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Gamepad2 className="w-5 h-5" />
                              Play Now
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Achievements */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <h2 className="text-2xl font-bold mb-4">Your Achievements</h2>
                  <div className="grid grid-cols-2 gap-3">
                    {freeAchievements.map((achievement, idx) => (
                      <motion.div
                        key={achievement.id}
                        className={`bg-[#0f0f13] rounded-xl p-4 border ${
                          achievement.unlocked ? 'border-yellow-600' : 'border-gray-800'
                        }`}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 + idx * 0.05 }}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`text-4xl ${!achievement.unlocked && 'opacity-50 grayscale'}`}>
                            {achievement.icon}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold mb-1">{achievement.title}</h3>
                            <div className="flex items-center gap-2">
                              <div className="flex-1 bg-gray-800 rounded-full h-2 overflow-hidden">
                                <div 
                                  className={`h-full ${achievement.unlocked ? 'bg-yellow-500' : 'bg-blue-600'}`}
                                  style={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                                ></div>
                              </div>
                              <span className="text-xs text-gray-400">{achievement.progress}/{achievement.total}</span>
                            </div>
                          </div>
                          {achievement.unlocked && (
                            <Star className="w-5 h-5 text-yellow-500 fill-current" />
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Right Sidebar */}
              <div className="space-y-6">
                {/* Global Leaderboard */}
                <motion.div
                  className="bg-[#0f0f13] rounded-xl border border-gray-800 p-6"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold">Global Leaderboard</h3>
                    <button 
                      onClick={() => onNavigate?.('leaderboards')}
                      className="text-blue-400 hover:text-blue-300 text-xs"
                    >
                      View All
                    </button>
                  </div>
                  <div className="space-y-3">
                    {globalLeaderboard.map((player, idx) => (
                      <motion.div
                        key={player.rank}
                        className={`flex items-center gap-3 p-2 rounded-lg ${
                          player.isYou ? 'bg-blue-900/30 border border-blue-700' : 'hover:bg-gray-800/50'
                        }`}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + idx * 0.05 }}
                      >
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          player.rank === 1 ? 'bg-yellow-500 text-black' :
                          player.rank === 2 ? 'bg-gray-400 text-black' :
                          player.rank === 3 ? 'bg-orange-600 text-white' :
                          'bg-gray-700 text-white'
                        }`}>
                          {player.rank}
                        </div>
                        <div className="w-8 h-8 rounded-full overflow-hidden">
                          <img src={player.avatar} alt={player.username} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-semibold truncate">
                            {player.username}
                            {player.isYou && <span className="text-blue-400 ml-1">(You)</span>}
                          </div>
                          <div className="text-xs text-gray-400">{player.score.toLocaleString()} pts</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Upgrade Card */}
                <motion.div
                  className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-xl border border-purple-600 p-6"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="text-center">
                    <Crown className="w-12 h-12 mx-auto mb-3 text-yellow-500" />
                    <h3 className="text-lg font-bold mb-2">Unlock Premium</h3>
                    <p className="text-sm text-gray-300 mb-4">
                      Compete in tournaments and win real cash prizes!
                    </p>
                    <div className="space-y-2 mb-4 text-left text-sm">
                      <div className="flex items-center gap-2">
                        <Trophy className="w-4 h-4 text-purple-400" />
                        <span>Tournament access</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-purple-400" />
                        <span>Cash prize competitions</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-purple-400" />
                        <span>Exclusive rewards</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-purple-400" />
                        <span>Priority matchmaking</span>
                      </div>
                    </div>
                    <div className="text-center mb-4">
                      <div className="text-3xl font-bold">$7.99</div>
                      <div className="text-xs text-gray-400">per month</div>
                    </div>
                    <motion.button
                      onClick={handleUpgradeClick}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 py-3 rounded-lg font-semibold"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Upgrade Now
                    </motion.button>
                  </div>
                </motion.div>

                {/* Quick Actions */}
                <motion.div
                  className="bg-[#0f0f13] rounded-xl border border-gray-800 p-6"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
                  <div className="space-y-2">
                    <button 
                      onClick={() => onNavigate?.('gamelibrary')}
                      className="w-full bg-gray-800 hover:bg-gray-700 py-3 rounded-lg text-sm font-semibold transition-colors"
                    >
                      Browse Games
                    </button>
                    <button 
                      onClick={() => onNavigate?.('leaderboards')}
                      className="w-full bg-gray-800 hover:bg-gray-700 py-3 rounded-lg text-sm font-semibold transition-colors"
                    >
                      View Leaderboards
                    </button>
                    <button 
                      onClick={onOpenProfile}
                      className="w-full bg-gray-800 hover:bg-gray-700 py-3 rounded-lg text-sm font-semibold transition-colors"
                    >
                      Edit Profile
                    </button>
                    <motion.button 
                      onClick={onSignOut}
                      className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}