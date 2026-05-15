import { useLeaderboard } from '../hooks/useLeaderboard';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, Search, Settings, Home, Users, Trophy, Gift, Sparkles, ShoppingCart, Crown, Zap, Medal, TrendingUp, Filter, ChevronDown, Bell, MessageCircle, Wallet, Star, Award, Gamepad2 } from 'lucide-react';
import logo from '../../assets/trbg.png';


interface LeaderboardsPageProps {
  onBack: () => void;
  onOpenSettings?: () => void;
  onOpenProfile?: () => void;
  onNavigate: (page: string) => void;
}

interface GlobalLeaderboardEntry {
  playerName: string;
  totalPoints: number;
  gamesPlayed: number;
  pacmanPoints?: number;
  amongUsPoints?: number;
  avatar?: string;
}

export function AdvancedLeaderboardsPage({ onBack, onOpenSettings, onOpenProfile, onNavigate }: LeaderboardsPageProps) {
  const [activeTab, setActiveTab] = useState<'global' | 'regional'>('global');
  const [globalLeaderboard, setGlobalLeaderboard] = useState<GlobalLeaderboardEntry[]>([]);
  const [regionalLeaderboard, setRegionalLeaderboard] = useState<GlobalLeaderboardEntry[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<'north-america' | 'europe' | 'asia' | 'oceania'>('north-america');
  const [timeFilter, setTimeFilter] = useState<'all-time' | 'monthly' | 'weekly'>('all-time');

  useEffect(() => {
    // Load leaderboard data
    const global = JSON.parse(localStorage.getItem('globalLeaderboard') || '[]');
    const regional = JSON.parse(localStorage.getItem(`regionalLeaderboard_${selectedRegion}`) || '[]');

    setGlobalLeaderboard(global);
    setRegionalLeaderboard(regional);
  }, [selectedRegion]);

  const getRankColor = (rank: number) => {
    if (rank === 0) return 'from-yellow-400 via-yellow-500 to-yellow-600';
    if (rank === 1) return 'from-gray-300 via-gray-400 to-gray-500';
    if (rank === 2) return 'from-orange-400 via-orange-500 to-orange-600';
    return 'from-purple-600 to-purple-800';
  };

  const getRankIcon = (rank: number) => {
    if (rank === 0) return <Crown className="w-6 h-6 text-yellow-900" />;
    if (rank === 1) return <Medal className="w-6 h-6 text-gray-900" />;
    if (rank === 2) return <Award className="w-6 h-6 text-orange-900" />;
    return <Star className="w-5 h-5" />;
  };

  const getCurrentLeaderboard = () => {
    if (activeTab === 'regional') return regionalLeaderboard.slice(0, 100);
    return globalLeaderboard.slice(0, 100);
  };

  const currentData = getCurrentLeaderboard();

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
                placeholder="Search players..."
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
              className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer overflow-hidden"
            >
              <span className="text-xl">👤</span>
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
              <Gamepad2 className="w-4 h-4" /> Games
            </motion.button>
            <motion.button 
              className="px-6 py-3 rounded-lg flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white"
              whileHover={{ scale: 1.05 }}
            >
              <Trophy className="w-4 h-4" /> Leaderboards
            </motion.button>
            <motion.button 
              onClick={() => onNavigate('socials')}
              className="px-6 py-3 rounded-lg flex items-center gap-2 bg-gray-700 text-white hover:bg-gray-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Users className="w-4 h-4" /> Socials
            </motion.button>
            <motion.button 
              onClick={() => onNavigate('rewards')}
              className="px-6 py-3 rounded-lg flex items-center gap-2 bg-gray-700 text-white hover:bg-gray-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Gift className="w-4 h-4" /> Rewards
            </motion.button>
          </div>
        </div>

        {/* Leaderboards Content */}
        <div className="flex-1 overflow-y-auto bg-gradient-to-b from-[#0a0a0f] to-[#1a1a1f] p-8">
          <div className="max-w-7xl mx-auto">
            {/* Hero Section */}
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <motion.h1 
                className="text-6xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                animate={{ 
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                Global Leaderboards
              </motion.h1>
              <p className="text-xl text-gray-400">
                Compete, climb, and claim your place among the elite
              </p>
            </motion.div>

            {/* Ranking Tabs */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex gap-4 mb-8 bg-[#1a1a24] p-2 rounded-2xl border border-gray-800"
            >
              <button
                onClick={() => setActiveTab('global')}
                className={`flex-1 px-8 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-3 ${
                  activeTab === 'global'
                    ? 'bg-gradient-to-r from-purple-600 to-purple-700 shadow-lg shadow-purple-900/50'
                    : 'hover:bg-gray-800'
                }`}
              >
                <Trophy className="w-5 h-5" />
                <span>Global Rankings</span>
                <span className="px-2 py-1 bg-purple-900/50 rounded-full text-xs">{globalLeaderboard.length}</span>
              </button>
              <button
                onClick={() => setActiveTab('regional')}
                className={`flex-1 px-8 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-3 ${
                  activeTab === 'regional'
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 shadow-lg shadow-blue-900/50'
                    : 'hover:bg-gray-800'
                }`}
              >
                <TrendingUp className="w-5 h-5" />
                <span>Regional Rankings</span>
                <span className="px-2 py-1 bg-blue-900/50 rounded-full text-xs">{regionalLeaderboard.length}</span>
              </button>
            </motion.div>

            {/* Regional Selector */}
            {activeTab === 'regional' && (
              <motion.div
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="mb-8 flex items-center gap-4 justify-center"
              >
                <span className="text-gray-400">Region:</span>
                <div className="flex gap-2">
                  {[
                    { key: 'north-america' as const, label: 'North America', flag: '🌎' },
                    { key: 'europe' as const, label: 'Europe', flag: '🌍' },
                    { key: 'asia' as const, label: 'Asia', flag: '🌏' },
                    { key: 'oceania' as const, label: 'Oceania', flag: '🌊' }
                  ].map(region => (
                    <button
                      key={region.key}
                      onClick={() => setSelectedRegion(region.key)}
                      className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                        selectedRegion === region.key
                          ? 'bg-gradient-to-r from-blue-600 to-cyan-600'
                          : 'bg-gray-800 hover:bg-gray-700'
                      }`}
                    >
                      <span>{region.flag}</span>
                      <span className="text-sm font-semibold">{region.label}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Top 3 Podium */}
            {currentData.length >= 3 && (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-3 gap-6 mb-12"
              >
                {/* 2nd Place */}
                <motion.div
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="bg-gradient-to-br from-gray-700/50 to-gray-800/50 border-2 border-gray-400 rounded-3xl p-8 text-center relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" />
                  <div className="relative z-10">
                    <div className="flex justify-center mb-6">
                      <motion.div
                        animate={{ rotate: [0, -5, 5, -5, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="w-24 h-24 bg-gradient-to-br from-gray-300 to-gray-500 rounded-full flex items-center justify-center shadow-2xl"
                      >
                        <Medal className="w-12 h-12 text-gray-900" />
                      </motion.div>
                    </div>
                    <div className="text-5xl font-bold mb-2">2nd</div>
                    <div className="text-xl font-bold mb-3">
                      {activeTab === 'global' ? currentData[1].playerName : currentData[1].playerName}
                    </div>
                    <div className="text-3xl font-bold text-purple-400 mb-1">
                      {activeTab === 'global' 
                        ? currentData[1].totalPoints?.toLocaleString() 
                        : currentData[1].leaderboardPoints?.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-400">Leaderboard Points</div>
                  </div>
                </motion.div>

                {/* 1st Place */}
                <motion.div
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="bg-gradient-to-br from-yellow-600/50 to-yellow-700/50 border-2 border-yellow-400 rounded-3xl p-8 text-center relative overflow-hidden"
                  animate={{
                    boxShadow: [
                      '0 0 0px rgba(234, 179, 8, 0)',
                      '0 0 60px rgba(234, 179, 8, 0.6)',
                      '0 0 0px rgba(234, 179, 8, 0)'
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-yellow-900/50 to-transparent" />
                  <motion.div
                    className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-yellow-500 px-6 py-2 rounded-full font-bold shadow-lg"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    👑 CHAMPION
                  </motion.div>
                  <div className="relative z-10 mt-6">
                    <div className="flex justify-center mb-6">
                      <motion.div
                        animate={{ 
                          rotate: [0, -10, 10, -10, 0],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-28 h-28 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-2xl"
                      >
                        <Crown className="w-14 h-14 text-yellow-900" />
                      </motion.div>
                    </div>
                    <div className="text-6xl font-bold mb-3">1st</div>
                    <div className="text-2xl font-bold mb-4">
                      {activeTab === 'global' ? currentData[0].playerName : currentData[0].playerName}
                    </div>
                    <div className="text-4xl font-bold text-yellow-300 mb-2">
                      {activeTab === 'global' 
                        ? currentData[0].totalPoints?.toLocaleString() 
                        : currentData[0].leaderboardPoints?.toLocaleString()}
                    </div>
                    <div className="text-sm text-yellow-200">Leaderboard Points</div>
                  </div>
                </motion.div>

                {/* 3rd Place */}
                <motion.div
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="bg-gradient-to-br from-orange-700/50 to-orange-800/50 border-2 border-orange-400 rounded-3xl p-8 text-center relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-orange-900/50 to-transparent" />
                  <div className="relative z-10">
                    <div className="flex justify-center mb-6">
                      <motion.div
                        animate={{ rotate: [0, 5, -5, 5, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="w-24 h-24 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center shadow-2xl"
                      >
                        <Award className="w-12 h-12 text-orange-900" />
                      </motion.div>
                    </div>
                    <div className="text-5xl font-bold mb-2">3rd</div>
                    <div className="text-xl font-bold mb-3">
                      {activeTab === 'global' ? currentData[2].playerName : currentData[2].playerName}
                    </div>
                    <div className="text-3xl font-bold text-purple-400 mb-1">
                      {activeTab === 'global' 
                        ? currentData[2].totalPoints?.toLocaleString() 
                        : currentData[2].leaderboardPoints?.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-400">Leaderboard Points</div>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* Full Leaderboard Table */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-[#1a1a24] border border-gray-800 rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="bg-gradient-to-r from-purple-900/50 via-pink-900/50 to-purple-900/50 px-8 py-6 border-b border-gray-800 flex items-center justify-between">
                <h2 className="text-3xl font-bold flex items-center gap-3">
                  <TrendingUp className="w-8 h-8 text-purple-400" />
                  Full Rankings
                </h2>
                <div className="flex gap-2">
                  {['all-time', 'monthly', 'weekly'].map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setTimeFilter(filter as any)}
                      className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                        timeFilter === filter
                          ? 'bg-purple-600'
                          : 'bg-gray-800 hover:bg-gray-700'
                      }`}
                    >
                      {filter.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                    </button>
                  ))}
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-900/70 backdrop-blur">
                    <tr>
                      <th className="px-8 py-5 text-left text-sm font-bold text-gray-400 uppercase tracking-wider">Rank</th>
                      <th className="px-8 py-5 text-left text-sm font-bold text-gray-400 uppercase tracking-wider">Player</th>
                      {activeTab === 'global' && (
                        <th className="px-8 py-5 text-right text-sm font-bold text-gray-400 uppercase tracking-wider">Games Played</th>
                      )}
                      {activeTab !== 'global' && (
                        <>
                          <th className="px-8 py-5 text-right text-sm font-bold text-gray-400 uppercase tracking-wider">Difficulty</th>
                          <th className="px-8 py-5 text-right text-sm font-bold text-gray-400 uppercase tracking-wider">Raw Score</th>
                        </>
                      )}
                      <th className="px-8 py-5 text-right text-sm font-bold text-gray-400 uppercase tracking-wider">Leaderboard Points</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800/50">
                    {currentData.length === 0 ? (
                      <tr>
                        <td colSpan={activeTab === 'global' ? 4 : 5} className="px-8 py-16 text-center text-gray-500">
                          <div className="flex flex-col items-center gap-4">
                            <Trophy className="w-16 h-16 text-gray-700" />
                            <div className="text-xl">No scores yet. Be the first to compete!</div>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      currentData.map((entry, index) => (
                        <motion.tr
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.03 }}
                          className="hover:bg-gray-900/50 transition-all group"
                        >
                          <td className="px-8 py-6">
                            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${getRankColor(index)} flex items-center justify-center font-bold shadow-lg group-hover:scale-110 transition-transform`}>
                              {index < 3 ? getRankIcon(index) : <span className="text-lg">{index + 1}</span>}
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-xl font-bold">
                                {entry.playerName?.charAt(0) || 'P'}
                              </div>
                              <div>
                                <div className="font-bold text-lg">{entry.playerName || 'Player'}</div>
                                {activeTab === 'global' && entry.gamesPlayed > 0 && (
                                  <div className="text-sm text-gray-400">
                                    {entry.pacmanPoints || 0} PAC-MAN + {entry.amongUsPoints || 0} Among Us
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                          {activeTab === 'global' && (
                            <td className="px-8 py-6 text-right">
                              <div className="text-lg font-bold text-blue-400">{entry.gamesPlayed || 0}</div>
                            </td>
                          )}
                          {activeTab !== 'global' && (
                            <>
                              <td className="px-8 py-6 text-right">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                  entry.difficulty === 'easy' ? 'bg-green-600/20 border border-green-600/50 text-green-400' :
                                  entry.difficulty === 'medium' ? 'bg-yellow-600/20 border border-yellow-600/50 text-yellow-400' :
                                  'bg-red-600/20 border border-red-600/50 text-red-400'
                                }`}>
                                  {entry.difficulty?.toUpperCase()}
                                </span>
                              </td>
                              <td className="px-8 py-6 text-right">
                                <div className="text-lg font-bold">{entry.score?.toLocaleString() || 0}</div>
                              </td>
                            </>
                          )}
                          <td className="px-8 py-6 text-right">
                            <div className="text-2xl font-bold text-purple-400">
                              {activeTab === 'global' 
                                ? entry.totalPoints?.toLocaleString() 
                                : entry.leaderboardPoints?.toLocaleString() || 0}
                            </div>
                          </td>
                        </motion.tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Info Box */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-8 bg-gradient-to-r from-purple-900/20 via-pink-900/20 to-purple-900/20 border border-purple-700/50 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <Star className="w-6 h-6 text-yellow-400" />
                Scoring System
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-lg mb-2 text-purple-400">Difficulty Multipliers</h4>
                  <div className="space-y-2 text-gray-300">
                    <div className="flex justify-between">
                      <span className="text-green-400">• EASY:</span>
                      <span className="font-bold">1.0x multiplier</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-yellow-400">• MEDIUM:</span>
                      <span className="font-bold">1.5x multiplier</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-red-400">• HARD:</span>
                      <span className="font-bold">2.0x multiplier</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2 text-purple-400">Global Rankings</h4>
                  <p className="text-gray-300">
                    Global leaderboard ranks players by total accumulated points across all games. 
                    Compete in multiple games to increase your total score and climb the rankings!
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
