import { Menu, Search, Home, Users, Trophy, Gift, Sparkles, ShoppingCart, Crown, Zap, Settings, Bell, MessageCircle, Wallet, LogOut } from 'lucide-react';
import logo from '../../assets/trbg.png';
import { useLeaderboard } from '../hooks/useLeaderboard';

import { motion } from 'motion/react';
import { ALL_GAMES, getFeaturedGames } from '../utils/gameConfig';

interface HomePageProps {
  onSignOut: () => void;
  onOpenSettings?: () => void;
  onOpenProfile?: () => void;
  onOpenTournaments?: () => void;
  onNavigate?: (page: string) => void;
  gameState?: any;
}

const leaderboardPlayers = [
        ];

export function HomePage({ onSignOut, onOpenSettings, onOpenProfile, onOpenTournaments, onNavigate, gameState }: HomePageProps) {
  const games = ALL_GAMES;

  return (
    <div className="min-h-screen bg-[#1a1a1f] text-white flex flex-col md:flex-row">
      {/* Left Sidebar - Hidden on mobile, visible on md+ */}
      <div className="hidden md:flex w-16 bg-[#0f0f13] flex-col items-center py-6 gap-6 border-r border-gray-800">
        <button className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center hover:bg-blue-700 transition-colors">
          <Home className="w-5 h-5" />
        </button>
        <button 
          onClick={onOpenProfile}
          className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors"
        >
          <Users className="w-5 h-5" />
        </button>
        <button 
          onClick={() => onNavigate?.('tournaments')}
          className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors"
        >
          <Trophy className="w-5 h-5" />
        </button>
        <button 
          onClick={() => onNavigate?.('marketplace')}
          className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors"
        >
          <Gift className="w-5 h-5" />
        </button>
        <button 
          onClick={() => onNavigate?.('events')}
          className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors"
        >
          <Sparkles className="w-5 h-5" />
        </button>
        <button 
          onClick={() => onNavigate?.('shop')}
          className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors"
        >
          <ShoppingCart className="w-5 h-5" />
        </button>
        <button 
          onClick={() => onNavigate?.('premium')}
          className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors"
        >
          <Crown className="w-5 h-5" />
        </button>
        <button 
          onClick={() => onNavigate?.('quickmatch')}
          className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors"
        >
          <Zap className="w-5 h-5" />
        </button>

        {/* Logout Button at bottom */}
        <motion.button 
          onClick={onSignOut}
          className="w-10 h-10 rounded-lg bg-red-600 flex items-center justify-center hover:bg-red-700 transition-colors mt-auto"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <LogOut className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-[#0f0f13] border-b border-gray-800 px-4 md:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 md:gap-6">
            <button className="text-gray-400 hover:text-white">
              <Menu className="w-6 h-6" />
            </button>
            <img src={logo} alt="Tour Arcade" className="h-6 md:h-8" />
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
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
              onClick={() => onNavigate?.('notifications')}
              className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center hover:bg-gray-500 transition-colors relative"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-red-600 w-5 h-5 rounded-full text-xs flex items-center justify-center">3</span>
            </motion.button>
            <motion.button 
              onClick={() => onNavigate?.('messages')}
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
              onClick={() => onNavigate?.('wallet')}
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

        {/* Main Content Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Games Section */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* Navigation Tabs */}
            <div className="flex gap-2 md:gap-4 mb-6 overflow-x-auto pb-2">
              <motion.button 
                className="bg-blue-600 text-white px-4 md:px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors whitespace-nowrap text-sm md:text-base"
                whileHover={{ scale: 1.05 }}
              >
                <Home className="w-4 h-4" />
                Home
              </motion.button>
              <motion.button 
                onClick={() => onNavigate?.('gamelibrary')}
                className="bg-gray-700 text-white px-4 md:px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-gray-600 transition-colors whitespace-nowrap text-sm md:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                🎮 Games
              </motion.button>
              <motion.button 
                onClick={() => onNavigate?.('leaderboards')}
                className="bg-gray-700 text-white px-4 md:px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-gray-600 transition-colors whitespace-nowrap text-sm md:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Trophy className="w-4 h-4" />
                Leaderboards
              </motion.button>
              <motion.button 
                onClick={() => onNavigate?.('socials')}
                className="bg-gray-700 text-white px-4 md:px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-gray-600 transition-colors whitespace-nowrap text-sm md:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Users className="w-4 h-4" />
                Socials
              </motion.button>
              <motion.button 
                onClick={() => onNavigate?.('rewards')}
                className="bg-gray-700 text-white px-4 md:px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-gray-600 transition-colors whitespace-nowrap text-sm md:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Gift className="w-4 h-4" />
                Rewards
              </motion.button>
            </div>

            {/* Featured Game */}
            <div className="mb-6">
              <motion.div 
                onClick={() => onNavigate?.(`game-${games[0].id}`)}
                className="relative rounded-2xl overflow-hidden h-48 md:h-80 group cursor-pointer"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                whileHover={{ scale: 1.02 }}
              >
                <img
                  src={games[0].image}
                  alt={games[0].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <motion.div 
                  className="absolute bottom-4 md:bottom-6 left-4 md:left-6"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <h2 className="text-3xl md:text-5xl mb-2 drop-shadow-lg">{games[0].title}</h2>
                </motion.div>
              </motion.div>
            </div>

            {/* Game Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {games.slice(1).map((game, idx) => (
                <motion.div 
                  key={game.id}
                  onClick={() => onNavigate?.(`game-${game.id}`)}
                  className="relative rounded-xl overflow-hidden h-32 group cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * idx, duration: 0.4 }}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -5,
                    boxShadow: "0 10px 30px rgba(168, 85, 247, 0.3)"
                  }}
                >
                  <img
                    src={game.image}
                    alt={game.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>
                  <motion.div 
                    className="absolute bottom-3 left-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 * idx + 0.2 }}
                  >
                    <h3 className="text-sm drop-shadow-lg">{game.title}</h3>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Leaderboards Panel */}
          <div className="w-80 bg-[#0f0f13] border-l border-gray-800 p-6 overflow-y-auto">
            <div className="bg-[#2a2a32] rounded-xl p-6">
              <div className="flex items-center gap-2 mb-6">
                <Trophy className="w-5 h-5 text-yellow-500" />
                <h3 className="text-lg">Leaderboards & Rankings</h3>
              </div>

              <div className="space-y-4">
                {leaderboardPlayers.map((player) => (
                  <motion.div 
                    key={player.rank} 
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: player.rank * 0.1 }}
                    whileHover={{ x: 5, transition: { duration: 0.2 } }}
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <motion.div 
                        className={`w-10 h-10 ${player.color} rounded-lg flex items-center justify-center text-xl`}
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.3 }}
                      >
                        {player.avatar}
                      </motion.div>
                      <div className="flex-1">
                        <div className="text-white">{player.name}</div>
                        <div className="text-sm text-gray-400">{player.points}</div>
                      </div>
                    </div>
                    <div className="text-2xl text-gray-600">—</div>
                  </motion.div>
                ))}
              </div>

              <button 
                onClick={() => onNavigate?.('leaderboards')}
                className="w-full mt-6 text-purple-400 hover:text-purple-300 transition-colors text-sm"
              >
                View all rankings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}