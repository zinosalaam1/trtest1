import { Menu, Search, Settings, Home, Users, Trophy, Gift, Sparkles, ShoppingCart, Crown, Zap, Check, Star, Flame } from 'lucide-react';
import logo from '../../assets/logo.svg';

import { motion } from 'motion/react';

interface PremiumPageProps {
  onBack: () => void;
  onOpenSettings?: () => void;
  onOpenProfile?: () => void;
  onNavigate: (page: string) => void;
}

const tiers = [
  {
    name: 'Free',
    price: 0,
    period: 'Forever',
    color: 'from-gray-600 to-gray-700',
    features: [
      'Access to games'
    ]
  },
  {
    name: 'Standard',
    price: 7.99,
    period: 'per month',
    popular: true,
    color: 'from-purple-600 to-pink-600',
    features: [
      'All Free features',
      '2x Daily Rewards',
      'Priority matchmaking',
      'Exclusive Standard badge',
      'Ad-free experience',
      '10% discount on shop items',
      'Early access to new games',
      'Custom profile themes',
      'VIP tournament access',
      'Exclusive cosmetics monthly',
      'Priority customer support',
      'Custom animations',
      'Name color customization'
    ]
  }
];

export function PremiumPage({ onBack, onOpenSettings, onOpenProfile, onNavigate }: PremiumPageProps) {
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
        <button className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-600 to-orange-600 flex items-center justify-center">
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

        {/* Premium Content */}
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
                    rotate: [0, -15, 15, -15, 0],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Crown className="w-12 h-12 text-yellow-500" />
                </motion.div>
                <h1 className="text-5xl">Premium Membership</h1>
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Star className="w-12 h-12 text-yellow-500" />
                </motion.div>
              </div>
              <p className="text-xl text-gray-400">Unlock exclusive perks and elevate your gaming experience</p>
            </motion.div>

            {/* Pricing Tiers */}
            <div className="grid grid-cols-2 gap-8 mb-12 max-w-5xl mx-auto">
              {tiers.map((tier, idx) => (
                <motion.div
                  key={tier.name}
                  className={`rounded-xl p-1 relative ${tier.popular ? `bg-gradient-to-br ${tier.color}` : ''}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -10,
                    boxShadow: tier.popular ? "0 20px 60px rgba(234, 179, 8, 0.4)" : "0 20px 40px rgba(0, 0, 0, 0.3)"
                  }}
                >
                  {tier.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-600 px-4 py-1 rounded-full text-sm flex items-center gap-1">
                      <Flame className="w-4 h-4" />
                      Most Popular
                    </div>
                  )}
                  <div className="bg-[#1a1a1f] rounded-xl p-6 h-full flex flex-col">
                    <div className="text-center mb-6">
                      <h3 className="text-2xl mb-2">{tier.name}</h3>
                      <div className="text-4xl mb-1">${tier.price}</div>
                      <div className="text-sm text-gray-400">{tier.period}</div>
                    </div>
                    <div className="flex-1 space-y-3 mb-6">
                      {tier.features.map((feature, i) => (
                        <motion.div
                          key={i}
                          className="flex items-start gap-2 text-sm"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 + i * 0.05 }}
                        >
                          <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                    <motion.button
                      className={`w-full py-3 rounded-lg ${
                        tier.popular 
                          ? `bg-gradient-to-r ${tier.color} text-white`
                          : 'bg-gray-700 hover:bg-gray-600 text-white'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {tier.price === 0 ? 'Current Plan' : 'Upgrade Now'}
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Benefits Grid */}
            <div className="grid grid-cols-3 gap-6">
              <motion.div
                className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 border border-blue-700 rounded-xl p-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.05, borderColor: 'rgb(59, 130, 246)' }}
              >
                <motion.div 
                  className="text-5xl mb-4"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🎮
                </motion.div>
                <h3 className="text-xl mb-2">Exclusive Content</h3>
                <p className="text-sm text-gray-300">Access premium games, events, and tournaments available only to VIP members</p>
              </motion.div>

              <motion.div
                className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border border-purple-700 rounded-xl p-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.05, borderColor: 'rgb(168, 85, 247)' }}
              >
                <motion.div 
                  className="text-5xl mb-4"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  💎
                </motion.div>
                <h3 className="text-xl mb-2">Enhanced Rewards</h3>
                <p className="text-sm text-gray-300">Earn up to 5x more rewards on every game and unlock exclusive prizes</p>
              </motion.div>

              <motion.div
                className="bg-gradient-to-br from-orange-900/50 to-red-900/50 border border-orange-700 rounded-xl p-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 }}
                whileHover={{ scale: 1.05, borderColor: 'rgb(249, 115, 22)' }}
              >
                <motion.div 
                  className="text-5xl mb-4"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  👑
                </motion.div>
                <h3 className="text-xl mb-2">VIP Status</h3>
                <p className="text-sm text-gray-300">Stand out with exclusive badges, effects, and priority support</p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
