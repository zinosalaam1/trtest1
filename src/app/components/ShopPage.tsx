import { Menu, Search, Settings, Home, Users, Trophy, Gift, Sparkles, ShoppingCart, Crown, Zap, CreditCard, Wallet, TrendingUp, Package } from 'lucide-react';
import logo from '../../assets/logo.svg';

import { useState } from 'react';
import { motion } from 'motion/react';

interface ShopPageProps {
  onBack: () => void;
  onOpenSettings?: () => void;
  onOpenProfile?: () => void;
  onNavigate: (page: string) => void;
}

const coinPackages = [
  { id: 1, coins: 1000, price: 9.99, bonus: 0, popular: false, icon: '💎' },
  { id: 2, coins: 2500, price: 19.99, bonus: 10, popular: true, icon: '💎💎' },
  { id: 3, coins: 5000, price: 39.99, bonus: 15, popular: false, icon: '💎💎💎' },
  { id: 4, coins: 10000, price: 74.99, bonus: 20, popular: false, icon: '💰' },
  { id: 5, coins: 25000, price: 149.99, bonus: 25, popular: false, icon: '👑' },
  { id: 6, coins: 50000, price: 249.99, bonus: 30, popular: false, icon: '🏆' },
];

const bundles = [
  { id: 1, name: 'Starter Bundle', items: ['500 Coins', '3 Emotes', '1 Avatar Frame'], price: 14.99, value: 24.99, icon: '🎁' },
  { id: 2, name: 'Pro Gamer Pack', items: ['2000 Coins', '10 Emotes', '5 Avatar Frames', '2 Skins'], price: 39.99, value: 79.99, icon: '🎮' },
  { id: 3, name: 'Ultimate Collection', items: ['10000 Coins', 'All Emotes', 'All Frames', '10 Skins', 'VIP Badge'], price: 99.99, value: 199.99, icon: '👑' },
];

export function ShopPage({ onBack, onOpenSettings, onOpenProfile, onNavigate }: ShopPageProps) {
  const [selectedTab, setSelectedTab] = useState<'coins' | 'bundles' | 'special'>('coins');

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
        <button className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center">
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

          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search shop..."
                className="w-full bg-[#2a2a32] border-0 rounded-full pl-12 pr-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
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

        {/* Shop Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
            {/* Hero */}
            <motion.div 
              className="text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <ShoppingCart className="w-10 h-10 text-green-500" />
                </motion.div>
                <h1 className="text-4xl">Shop</h1>
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Package className="w-10 h-10 text-green-500" />
                </motion.div>
              </div>
              <p className="text-gray-400">Purchase coins and exclusive bundles</p>
            </motion.div>

            {/* Tabs */}
            <div className="flex gap-3 mb-8">
              <motion.button
                onClick={() => setSelectedTab('coins')}
                className={`flex-1 py-4 rounded-xl ${
                  selectedTab === 'coins' 
                    ? 'bg-gradient-to-r from-yellow-600 to-orange-600' 
                    : 'bg-[#1a1a1f] hover:bg-[#2a2a2f]'
                }`}
                whileHover={{ scale: 1.02 }}
              >
                💎 Coin Packages
              </motion.button>
              <motion.button
                onClick={() => setSelectedTab('bundles')}
                className={`flex-1 py-4 rounded-xl ${
                  selectedTab === 'bundles' 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600' 
                    : 'bg-[#1a1a1f] hover:bg-[#2a2a2f]'
                }`}
                whileHover={{ scale: 1.02 }}
              >
                🎁 Bundles
              </motion.button>
              <motion.button
                onClick={() => setSelectedTab('special')}
                className={`flex-1 py-4 rounded-xl ${
                  selectedTab === 'special' 
                    ? 'bg-gradient-to-r from-red-600 to-rose-600' 
                    : 'bg-[#1a1a1f] hover:bg-[#2a2a2f]'
                }`}
                whileHover={{ scale: 1.02 }}
              >
                ⭐ Special Offers
              </motion.button>
            </div>

            {/* Coin Packages */}
            {selectedTab === 'coins' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {coinPackages.map((pkg, idx) => (
                  <motion.div
                    key={pkg.id}
                    className={`rounded-xl p-6 relative ${
                      pkg.popular 
                        ? 'bg-gradient-to-br from-yellow-600 to-orange-600' 
                        : 'bg-[#1a1a1f] border border-gray-800'
                    }`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ scale: 1.05, y: -10 }}
                  >
                    {pkg.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-600 px-4 py-1 rounded-full text-sm flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        Best Value
                      </div>
                    )}
                    {pkg.bonus > 0 && (
                      <div className="absolute top-4 right-4 bg-green-600 px-2 py-1 rounded text-xs">
                        +{pkg.bonus}% Bonus
                      </div>
                    )}
                    <motion.div 
                      className="text-6xl text-center mb-4"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
                    >
                      {pkg.icon}
                    </motion.div>
                    <div className="text-center mb-4">
                      <div className="text-3xl mb-1">{pkg.coins.toLocaleString()}</div>
                      <div className="text-sm text-gray-300">Coins</div>
                      {pkg.bonus > 0 && (
                        <div className="text-xs text-green-400 mt-1">
                          +{Math.floor(pkg.coins * (pkg.bonus / 100))} bonus coins
                        </div>
                      )}
                    </div>
                    <div className="text-center mb-4">
                      <div className="text-2xl">${pkg.price}</div>
                    </div>
                    <motion.button
                      className={`w-full py-3 rounded-lg ${
                        pkg.popular 
                          ? 'bg-white text-orange-600' 
                          : 'bg-gradient-to-r from-green-600 to-emerald-600 text-white'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Purchase
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Bundles */}
            {selectedTab === 'bundles' && (
              <div className="grid grid-cols-2 gap-6">
                {bundles.map((bundle, idx) => (
                  <motion.div
                    key={bundle.id}
                    className="bg-[#1a1a1f] rounded-xl p-6 border border-gray-800 hover:border-purple-600 transition-colors"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(168, 85, 247, 0.3)" }}
                  >
                    <motion.div 
                      className="text-6xl text-center mb-4"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      {bundle.icon}
                    </motion.div>
                    <h3 className="text-2xl mb-3 text-center">{bundle.name}</h3>
                    <div className="space-y-2 mb-4">
                      {bundle.items.map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-gray-400">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          {item}
                        </div>
                      ))}
                    </div>
                    <div className="text-center mb-4">
                      <div className="text-2xl text-green-400 mb-1">${bundle.price}</div>
                      <div className="text-sm text-gray-500">
                        <span className="line-through">${bundle.value}</span>
                        <span className="ml-2 text-green-400">
                          Save ${(bundle.value - bundle.price).toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <motion.button
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 py-3 rounded-lg"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Buy Bundle
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Special Offers */}
            {selectedTab === 'special' && (
              <motion.div
                className="bg-gradient-to-br from-red-600 to-rose-600 rounded-xl p-8"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="text-center">
                  <motion.div 
                    className="text-8xl mb-6"
                    animate={{ 
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    🎉
                  </motion.div>
                  <h2 className="text-3xl mb-4">Limited Time Offer!</h2>
                  <p className="text-xl mb-6">Double Coins on all purchases for the next 24 hours!</p>
                  <div className="flex items-center justify-center gap-4 mb-8">
                    <div className="bg-black/30 px-6 py-3 rounded-lg">
                      <div className="text-3xl">12</div>
                      <div className="text-sm">Hours</div>
                    </div>
                    <div className="text-3xl">:</div>
                    <div className="bg-black/30 px-6 py-3 rounded-lg">
                      <div className="text-3xl">34</div>
                      <div className="text-sm">Minutes</div>
                    </div>
                    <div className="text-3xl">:</div>
                    <div className="bg-black/30 px-6 py-3 rounded-lg">
                      <div className="text-3xl">56</div>
                      <div className="text-sm">Seconds</div>
                    </div>
                  </div>
                  <motion.button
                    className="bg-white text-red-600 px-12 py-4 rounded-lg text-xl"
                    whileHover={{ scale: 1.1, boxShadow: "0 0 40px rgba(255, 255, 255, 0.5)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Claim Offer Now!
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
