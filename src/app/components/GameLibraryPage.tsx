import { useState } from 'react';
import { motion } from 'motion/react';
import { Menu, Search, Settings, Bell, MessageCircle, Wallet, Home, Users, Trophy, Gift, Sparkles, ShoppingCart, Crown, Zap, Filter, Star, Clock, TrendingUp, Gamepad2 } from 'lucide-react';
import logo from '../../assets/trbg.png';

import { ALL_GAMES, getAllCategories } from '../utils/gameConfig';

interface GameLibraryPageProps {
  onBack: () => void;
  onOpenSettings?: () => void;
  onOpenProfile?: () => void;
  onNavigate?: (page: string) => void;
  selectedGame?: string;
  onPlayGame?: (gameId: string) => void;
}

const categories = ['All', ...getAllCategories()];

export function GameLibraryPage({ onBack, onOpenSettings, onOpenProfile, onNavigate, onPlayGame }: GameLibraryPageProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'popular' | 'rating' | 'recent'>('popular');

  const filteredGames = ALL_GAMES.filter(game => {
    const matchesCategory = selectedCategory === 'All' || game.category === selectedCategory;
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedGames = [...filteredGames].sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'popular') return parseFloat(b.players.replace('K', '')) - parseFloat(a.players.replace('K', ''));
    return 0;
  });

  return (
    <div className="min-h-screen bg-[#1a1a1f] text-white flex">
      {/* Left Sidebar */}
      <div className="w-16 bg-[#0f0f13] flex flex-col items-center py-6 gap-6 border-r border-gray-800">
        <button 
          onClick={onBack}
          className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center hover:bg-blue-700 transition-colors"
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
                placeholder="Search games..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-4xl mb-2">Game Library</h1>
              <p className="text-gray-400">Explore our collection of competitive games</p>
            </div>

            {/* Filters and Sort */}
            <div className="flex items-center justify-between mb-6">
              {/* Category Filter */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2">
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                      selectedCategory === category
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>

              {/* Sort Options */}
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-gray-700 border-0 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                >
                  <option value="popular">Most Popular</option>
                  <option value="rating">Top Rated</option>
                  <option value="recent">Recently Added</option>
                </select>
              </div>
            </div>

            {/* Games Grid */}
            <div className="grid grid-cols-4 gap-6">
              {sortedGames.map((game, idx) => (
                <motion.div
                  key={game.id}
                  className="group cursor-pointer"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05, duration: 0.3 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                >
                  <div className="relative rounded-xl overflow-hidden mb-3">
                    <div className="aspect-[4/5]">
                      <img
                        src={game.image}
                        alt={game.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    
                    {/* Game Info Overlay */}
                    <motion.div
                      className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100"
                      initial={{ y: 20 }}
                      whileHover={{ y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.button
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 py-2 rounded-lg flex items-center justify-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onNavigate?.(`game-${game.id}`)}
                      >
                        <Gamepad2 className="w-4 h-4" />
                        Play Now
                      </motion.button>
                    </motion.div>

                    {/* Featured Badge */}
                    {game.featured && (
                      <div className="absolute top-3 right-3 bg-yellow-500 text-black px-2 py-1 rounded-lg text-xs flex items-center gap-1">
                        <Star className="w-3 h-3 fill-current" />
                        Featured
                      </div>
                    )}
                  </div>

                  {/* Game Details */}
                  <div>
                    <h3 className="mb-1">{game.title}</h3>
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {game.players}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                        {game.rating}
                      </span>
                    </div>
                    <span className="inline-block mt-1 px-2 py-0.5 bg-gray-700 rounded text-xs text-gray-300">
                      {game.category}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Empty State */}
            {sortedGames.length === 0 && (
              <motion.div
                className="text-center py-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Gamepad2 className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl mb-2">No games found</h3>
                <p className="text-gray-400">Try adjusting your filters or search query</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}