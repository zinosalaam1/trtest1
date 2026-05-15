import { Menu, Search, Settings, Home, Users, Trophy, Gift, Sparkles, ShoppingCart, Crown, Zap, Star, TrendingUp, Package, Flame } from 'lucide-react';
import logo from '../../assets/trbg.png';

import { useState } from 'react';
import { motion } from 'motion/react';

interface MarketplacePageProps {
  onBack: () => void;
  onOpenSettings?: () => void;
  onOpenProfile?: () => void;
  onNavigate: (page: string) => void;
}

const featuredItems = [
  { id: 1, name: 'Legendary Avatar Frame', price: 2499, category: 'Cosmetic', rarity: 'legendary', icon: '🖼️', image: 'https://placehold.co/400x200/1a0533/a855f7?text=Tour+Arcade' },
  { id: 2, name: 'Victory Emote Pack', price: 999, category: 'Emotes', rarity: 'epic', icon: '🎉', image: 'https://placehold.co/400x200/1a0533/a855f7?text=Tour+Arcade' },
  { id: 3, name: 'Pro Gamer Badge', price: 1499, category: 'Badge', rarity: 'rare', icon: '🏅', image: 'https://placehold.co/400x200/1a0533/a855f7?text=Tour+Arcade' },
];

const marketplaceItems = [
  { id: 4, name: 'Neon Glow Effect', price: 1999, category: 'Effects', rarity: 'epic', icon: '✨', popular: true },
  { id: 5, name: 'Champion Title', price: 2999, category: 'Titles', rarity: 'legendary', icon: '👑', popular: true },
  { id: 6, name: 'Victory Dance', price: 799, category: 'Emotes', rarity: 'rare', icon: '💃', popular: false },
  { id: 7, name: 'Lightning Trail', price: 1299, category: 'Effects', rarity: 'epic', icon: '⚡', popular: true },
  { id: 8, name: 'Gold Name Tag', price: 1799, category: 'Cosmetic', rarity: 'rare', icon: '🏷️', popular: false },
  { id: 9, name: 'Cyber Skin Pack', price: 3499, category: 'Skins', rarity: 'legendary', icon: '🎨', popular: true },
  { id: 10, name: 'Winner Pose Set', price: 1199, category: 'Emotes', rarity: 'epic', icon: '🤸', popular: false },
  { id: 11, name: 'Rainbow Border', price: 899, category: 'Cosmetic', rarity: 'rare', icon: '🌈', popular: false },
  { id: 12, name: 'VIP Chat Badge', price: 2199, category: 'Badge', rarity: 'epic', icon: '💬', popular: true },
];

export function MarketplacePage({ onBack, onOpenSettings, onOpenProfile, onNavigate }: MarketplacePageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [userCoins, setUserCoins] = useState(15420);

  const categories = ['all', 'Cosmetic', 'Emotes', 'Effects', 'Badge', 'Titles', 'Skins'];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'from-yellow-600 to-orange-600';
      case 'epic': return 'from-purple-600 to-pink-600';
      case 'rare': return 'from-blue-600 to-cyan-600';
      default: return 'from-gray-600 to-gray-700';
    }
  };

  const filteredItems = selectedCategory === 'all' 
    ? marketplaceItems 
    : marketplaceItems.filter(item => item.category === selectedCategory);

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
        <button className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-600 to-rose-600 flex items-center justify-center">
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
                placeholder="Search marketplace items..."
                className="w-full bg-[#2a2a32] border-0 rounded-full pl-12 pr-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
          </div>

          {/* User Icons & Balance */}
          <div className="flex items-center gap-3">
            <motion.div 
              className="bg-gradient-to-r from-yellow-600 to-orange-600 px-4 py-2 rounded-full flex items-center gap-2"
              animate={{
                boxShadow: [
                  "0 0 0px rgba(234, 179, 8, 0)",
                  "0 0 20px rgba(234, 179, 8, 0.5)",
                  "0 0 0px rgba(234, 179, 8, 0)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-2xl">💎</span>
              <span>{userCoins.toLocaleString()}</span>
            </motion.div>
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

        {/* Marketplace Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
            {/* Hero Section */}
            <motion.div 
              className="text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <motion.div
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
                >
                  <Gift className="w-10 h-10 text-pink-500" />
                </motion.div>
                <h1 className="text-4xl">Marketplace</h1>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Package className="w-10 h-10 text-pink-500" />
                </motion.div>
              </div>
              <p className="text-gray-400">Unlock exclusive items, cosmetics, and rewards</p>
            </motion.div>

            {/* Featured Items Carousel */}
            <div className="mb-8">
              <h2 className="text-2xl mb-4 flex items-center gap-2">
                <Flame className="w-6 h-6 text-orange-500" />
                Featured Items
              </h2>
              <div className="grid grid-cols-3 gap-6">
                {featuredItems.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    className={`relative rounded-xl overflow-hidden bg-gradient-to-br ${getRarityColor(item.rarity)} p-1`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ scale: 1.05, y: -10 }}
                  >
                    <div className="bg-[#1a1a1f] rounded-xl p-6">
                      <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-xs">
                        {item.rarity.toUpperCase()}
                      </div>
                      <motion.div 
                        className="text-6xl text-center mb-4"
                        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        {item.icon}
                      </motion.div>
                      <h3 className="text-lg mb-2">{item.name}</h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-yellow-400">
                          <span className="text-xl">💎</span>
                          <span>{item.price.toLocaleString()}</span>
                        </div>
                        <motion.button
                          onClick={() => onNavigate(`marketplacepurchase-${item.id}`)}
                          className="bg-gradient-to-r from-green-600 to-emerald-600 px-4 py-2 rounded-lg text-sm"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Buy Now
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-lg whitespace-nowrap transition-all ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </motion.button>
              ))}
            </div>

            {/* Marketplace Grid */}
            <div className="grid grid-cols-4 gap-4">
              {filteredItems.map((item, idx) => (
                <motion.div
                  key={item.id}
                  className="bg-[#1a1a1f] rounded-xl p-4 border border-gray-800 hover:border-pink-600 transition-colors relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(236, 72, 153, 0.3)" }}
                >
                  {item.popular && (
                    <div className="absolute top-2 right-2 bg-orange-600 px-2 py-1 rounded text-xs flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      Popular
                    </div>
                  )}
                  <motion.div 
                    className="text-5xl text-center mb-3"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    {item.icon}
                  </motion.div>
                  <div className={`text-xs px-2 py-1 rounded-full inline-block mb-2 bg-gradient-to-r ${getRarityColor(item.rarity)}`}>
                    {item.rarity}
                  </div>
                  <h3 className="text-sm mb-1">{item.name}</h3>
                  <div className="text-xs text-gray-400 mb-3">{item.category}</div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-yellow-400">
                      <span>💎</span>
                      <span className="text-sm">{item.price.toLocaleString()}</span>
                    </div>
                    <motion.button
                      onClick={() => onNavigate(`marketplacepurchase-${item.id}`)}
                      className="bg-pink-600 hover:bg-pink-700 px-3 py-1 rounded text-xs"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Buy
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
