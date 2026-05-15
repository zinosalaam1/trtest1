import { Menu, Search, Settings, Home, Users, Trophy, Gift, Sparkles, ShoppingCart, Crown, Zap, Medal, TrendingUp, Filter, ChevronDown, Bell, MessageCircle, Wallet } from 'lucide-react';
import logo from '../../assets/trbg.png';

import { useLeaderboard } from '../hooks/useLeaderboard';
import { useState } from 'react';
import { motion } from 'motion/react';

interface LeaderboardsPageProps {
  onBack: () => void;
  onOpenSettings?: () => void;
  onOpenProfile?: () => void;
  onNavigate: (page: string) => void;
}

const regionalLeaderboard = [
  { rank: 1, name: 'Neonking', id: '#4567', score: '15,420 points', winrate: '87%', avatar: '😎', badge: '👑', trend: 'up' },
  { rank: 2, name: 'ProGamer', id: '#2341', score: '14,850 points', winrate: '82%', avatar: '🎮', badge: '🥈', trend: 'up' },
  { rank: 3, name: 'Speedrunner', id: '#7823', score: '14,250 points', winrate: '79%', avatar: '⚡', badge: '🥉', trend: 'down' },
  { rank: 4, name: 'Retromaster', id: '#5512', score: '13,420 points', winrate: '76%', avatar: '🕹️', badge: '🏆', trend: 'same' },
  { rank: 5, name: 'Retromas', id: '#9901', score: '13,420 points', winrate: '75%', avatar: '🎯', badge: '', trend: 'up' },
  { rank: 6, name: 'Retromas', id: '#3344', score: '13,420 points', winrate: '74%', avatar: '🎲', badge: '', trend: 'down' },
  { rank: 7, name: 'Retromas', id: '#8877', score: '13,420 points', winrate: '73%', avatar: '🎪', badge: '', trend: 'up' },
  { rank: 8, name: 'Retromas', id: '#6655', score: '13,420 points', winrate: '72%', avatar: '🎨', badge: '', trend: 'same' }
];

const globalLeaderboard = [
  { rank: 1, name: 'WorldElite', id: '#0001', score: '45,900 points', winrate: '95%', avatar: '👑', badge: '👑', trend: 'up' },
  { rank: 2, name: 'GlobalKing', id: '#0002', score: '43,500 points', winrate: '94%', avatar: '💎', badge: '🥈', trend: 'up' },
  { rank: 3, name: 'TopPlayer', id: '#0003', score: '41,200 points', winrate: '93%', avatar: '⭐', badge: '🥉', trend: 'up' }
];

export function LeaderboardsPage({ onBack, onOpenSettings, onOpenProfile, onNavigate }: LeaderboardsPageProps) {
  const [selectedGame, setSelectedGame] = useState('global');
  const { entries, isLoading } = useLeaderboard(selectedGame);
  const [activeTab, setActiveTab] = useState<'regional' | 'global'>('global');
  const [filterOpen, setFilterOpen] = useState(false);

  const getCurrentLeaderboard = () => {
    switch (activeTab) {
      case 'global': return globalLeaderboard;
      default: return regionalLeaderboard;
    }
  };

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
        <button 
          onClick={() => onNavigate('quickmatch')}
          className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors"
        >
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

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search"
                className="w-full bg-[#2a2a32] border-0 rounded-full pl-12 pr-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
          </div>

          {/* User Icons */}
          <div className="flex items-center gap-3">
            <motion.button 
              onClick={() => onNavigate('notifications')}
              className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center hover:bg-gray-500 transition-colors relative"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-red-600 w-5 h-5 rounded-full text-xs flex items-center justify-center">3</span>
            </motion.button>
            <motion.button 
              onClick={() => onNavigate('messages')}
              className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center hover:bg-gray-500 transition-colors relative"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageCircle className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-blue-600 w-5 h-5 rounded-full text-xs flex items-center justify-center">5</span>
            </motion.button>
            <button 
              onClick={onOpenSettings}
              className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center hover:bg-gray-500 transition-colors"
            >
              <Settings className="w-5 h-5" />
            </button>
            <motion.button 
              onClick={() => onNavigate('wallet')}
              className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center hover:bg-gray-500 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Wallet className="w-5 h-5" />
            </motion.button>
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

        {/* Navigation Tabs */}
        <div className="bg-[#0f0f13] border-b border-gray-800 px-8 py-4">
          <div className="flex items-center gap-4">
            <motion.button 
              onClick={onBack}
              className="px-6 py-3 rounded-lg flex items-center gap-2 bg-gray-700 text-white hover:bg-gray-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🎮 Games
            </motion.button>
            <motion.button 
              className="px-6 py-3 rounded-lg flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white"
              whileHover={{ scale: 1.05 }}
            >
              🏆 Leaderboards
            </motion.button>
            <motion.button 
              onClick={() => onNavigate('socials')}
              className="px-6 py-3 rounded-lg flex items-center gap-2 bg-gray-700 text-white hover:bg-gray-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              👥 Socials
            </motion.button>
            <motion.button 
              onClick={() => onNavigate('rewards')}
              className="px-6 py-3 rounded-lg flex items-center gap-2 bg-gray-700 text-white hover:bg-gray-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🎁 Rewards
            </motion.button>
          </div>
        </div>

        {/* Leaderboards Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-6xl mx-auto">
            {/* Hero Section */}
            <motion.div 
              className="text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <motion.div
                  animate={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <Trophy className="w-10 h-10 text-yellow-500" />
                </motion.div>
                <h1 className="text-4xl">Leaderboards</h1>
                <motion.div
                  animate={{ rotate: [0, 10, -10, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <Trophy className="w-10 h-10 text-yellow-500" />
                </motion.div>
              </div>
              <p className="text-gray-400">Track your progress and compete with the best players worldwide.</p>
            </motion.div>

            {/* Top 3 Podium */}
            <motion.div 
              className="grid grid-cols-3 gap-6 mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              {/* 2nd Place */}
              <motion.div 
                className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl p-6 text-center"
                whileHover={{ scale: 1.05, y: -10 }}
              >
                <motion.div 
                  className="text-6xl mb-3"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🥈
                </motion.div>
                <div className="text-3xl mb-2">2nd</div>
                <div className="text-sm text-gray-400">Silver Rank</div>
              </motion.div>

              {/* 1st Place */}
              <motion.div 
                className="bg-gradient-to-br from-yellow-600 to-yellow-700 rounded-xl p-6 text-center relative"
                whileHover={{ scale: 1.05, y: -10 }}
                animate={{
                  boxShadow: [
                    "0 0 0px rgba(234, 179, 8, 0)",
                    "0 0 40px rgba(234, 179, 8, 0.6)",
                    "0 0 0px rgba(234, 179, 8, 0)"
                  ]
                }}
                transition={{
                  boxShadow: { duration: 3, repeat: Infinity }
                }}
              >
                <motion.div 
                  className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-500 px-4 py-1 rounded-full text-sm"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Champion
                </motion.div>
                <motion.div 
                  className="text-6xl mb-3"
                  animate={{ 
                    rotate: [0, -10, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                >
                  👑
                </motion.div>
                <div className="text-3xl mb-2">1st</div>
                <div className="text-sm text-yellow-100">Gold Rank</div>
              </motion.div>

              {/* 3rd Place */}
              <motion.div 
                className="bg-gradient-to-br from-orange-700 to-orange-800 rounded-xl p-6 text-center"
                whileHover={{ scale: 1.05, y: -10 }}
              >
                <motion.div 
                  className="text-6xl mb-3"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🥉
                </motion.div>
                <div className="text-3xl mb-2">3rd</div>
                <div className="text-sm text-orange-200">Bronze Rank</div>
              </motion.div>
            </motion.div>

            {/* Leaderboard Type Tabs */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex gap-2">
                <motion.button
                  onClick={() => setActiveTab('regional')}
                  className={`px-6 py-2 rounded-lg transition-colors ${
                    activeTab === 'regional' ? 'bg-yellow-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Regional
                </motion.button>
                <motion.button
                  onClick={() => setActiveTab('global')}
                  className={`px-6 py-2 rounded-lg transition-colors ${
                    activeTab === 'global' ? 'bg-yellow-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Global
                </motion.button>
              </div>
              <motion.button
                onClick={() => setFilterOpen(!filterOpen)}
                className="flex items-center gap-2 bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                <Filter className="w-4 h-4" />
                Filter
                <ChevronDown className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Leaderboard Table */}
            <motion.div 
              className="bg-[#1a1a1f] rounded-xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {/* Table Header */}
              <div className="bg-gradient-to-r from-yellow-600 to-yellow-700 px-6 py-4 grid grid-cols-5 gap-4">
                <div>RANK</div>
                <div>NAME</div>
                <div>ID</div>
                <div>SCORE</div>
                <div>WINRATE</div>
              </div>

              {/* Table Rows */}
              <div className="divide-y divide-gray-800">
                {getCurrentLeaderboard().map((player, idx) => (
                  <motion.div
                    key={player.rank}
                    className="px-6 py-4 grid grid-cols-5 gap-4 items-center hover:bg-[#2a2a2f] transition-colors cursor-pointer"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex items-center gap-3">
                      <motion.div 
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          player.rank === 1 ? 'bg-yellow-600' : 
                          player.rank === 2 ? 'bg-gray-500' : 
                          player.rank === 3 ? 'bg-orange-600' : 
                          'bg-gray-700'
                        }`}
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.3 }}
                      >
                        {player.rank}
                      </motion.div>
                      {player.badge && (
                        <motion.span 
                          className="text-2xl"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
                        >
                          {player.badge}
                        </motion.span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{player.avatar}</span>
                      <span>{player.name}</span>
                    </div>
                    <div className="text-gray-400">{player.id}</div>
                    <div>{player.score}</div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-400">{player.winrate}</span>
                      {player.trend === 'up' && <TrendingUp className="w-4 h-4 text-green-400" />}
                      {player.trend === 'down' && <TrendingUp className="w-4 h-4 text-red-400 rotate-180" />}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Your Position */}
            <motion.div 
              className="mt-6 bg-gradient-to-r from-purple-900 to-blue-900 rounded-xl p-6"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-xl">
                    😎
                  </div>
                  <div>
                    <div className="text-xl mb-1">Your Position: #47</div>
                    <div className="text-sm text-gray-300">Keep playing to climb the ranks!</div>
                  </div>
                </div>
                <motion.button 
                  className="bg-white text-black px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View My Stats
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}