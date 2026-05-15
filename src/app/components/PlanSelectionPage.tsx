import { useState } from 'react';
import { motion } from 'motion/react';
import { Check, Crown, Zap, Trophy, Star, TrendingUp, Gift, Lock } from 'lucide-react';
import logo from '../../assets/trbg.png';
import { ParticleEffect } from './ParticleEffect';

interface PlanSelectionPageProps {
  onSelectFree: () => void;
  onSelectPremium: () => void;
}

export function PlanSelectionPage({ onSelectFree, onSelectPremium }: PlanSelectionPageProps) {
  const [hoveredPlan, setHoveredPlan] = useState<'free' | 'premium' | null>(null);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white relative overflow-hidden">
      <ParticleEffect />
      
      {/* Header */}
      <motion.header 
        className="relative z-10 flex items-center justify-between px-4 sm:px-8 py-6"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <img src={logo} alt="Tour Arcade" className="h-12" />
      </motion.header>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-6 sm:py-12">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl sm:text-5xl font-bold mb-4">Choose Your Plan</h1>
          <p className="text-xl text-gray-400">
            Start for free or unlock premium features
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-8 max-w-5xl mx-auto w-full">
          {/* Free Plan */}
          <motion.div
            className="bg-[#1a1a24] rounded-2xl border-2 border-gray-800 p-8 relative overflow-hidden"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            onMouseEnter={() => setHoveredPlan('free')}
            onMouseLeave={() => setHoveredPlan(null)}
            whileHover={{ scale: 1.02, borderColor: '#3b82f6' }}
          >
            {hoveredPlan === 'free' && (
              <motion.div
                className="absolute inset-0 bg-blue-600/5 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              />
            )}
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-blue-600/20 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Free Plan</h2>
                  <p className="text-gray-400">Get started today</p>
                </div>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-5xl font-bold">$0</span>
                  <span className="text-gray-400">/month</span>
                </div>
                <p className="text-sm text-gray-500 mt-2">No credit card required</p>
              </div>

              <div className="space-y-4 mb-8">
                <h3 className="font-semibold text-lg mb-3">What's included:</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-blue-600/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-white">Access to all games</p>
                      <p className="text-sm text-gray-500">Play unlimited games</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-blue-600/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-white">Global leaderboards</p>
                      <p className="text-sm text-gray-500">Compete with players worldwide</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-blue-600/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-white">Basic profile</p>
                      <p className="text-sm text-gray-500">Track your stats</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-blue-600/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-white">Achievement system</p>
                      <p className="text-sm text-gray-500">Unlock badges and rewards</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 opacity-50">
                    <div className="w-5 h-5 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Lock className="w-3 h-3 text-gray-500" />
                    </div>
                    <div>
                      <p className="text-gray-500">No tournament access</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 opacity-50">
                    <div className="w-5 h-5 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Lock className="w-3 h-3 text-gray-500" />
                    </div>
                    <div>
                      <p className="text-gray-500">No cash prizes</p>
                    </div>
                  </div>
                </div>
              </div>

              <motion.button
                onClick={onSelectFree}
                className="w-full bg-blue-600 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Start Free
              </motion.button>
            </div>
          </motion.div>

          {/* Premium Plan */}
          <motion.div
            className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-2xl border-2 border-purple-600 p-8 relative overflow-hidden"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            onMouseEnter={() => setHoveredPlan('premium')}
            onMouseLeave={() => setHoveredPlan(null)}
            whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(168, 85, 247, 0.5)' }}
          >
            {/* Popular Badge */}
            <div className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-2 rounded-full text-sm font-bold rotate-12">
              MOST POPULAR
            </div>

            {hoveredPlan === 'premium' && (
              <motion.div
                className="absolute inset-0 bg-purple-600/10 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              />
            )}
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Standard Plan</h2>
                  <p className="text-purple-300">Unlock everything</p>
                </div>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-5xl font-bold">$7.99</span>
                  <span className="text-gray-400">/month</span>
                </div>
                <p className="text-sm text-purple-300 mt-2">Only pay when you earn $1+</p>
              </div>

              <div className="space-y-4 mb-8">
                <h3 className="font-semibold text-lg mb-3">Everything in Free, plus:</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Tournament access</p>
                      <p className="text-sm text-gray-400">Compete in elite tournaments</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Real cash prizes</p>
                      <p className="text-sm text-gray-400">Earn money from wins</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Priority matchmaking</p>
                      <p className="text-sm text-gray-400">Faster game matching</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Exclusive rewards</p>
                      <p className="text-sm text-gray-400">Premium items & perks</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Custom profile themes</p>
                      <p className="text-sm text-gray-400">Stand out from the crowd</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Ad-free experience</p>
                      <p className="text-sm text-gray-400">Uninterrupted gameplay</p>
                    </div>
                  </div>
                </div>
              </div>

              <motion.button
                onClick={onSelectPremium}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 py-4 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(168, 85, 247, 0.5)' }}
                whileTap={{ scale: 0.98 }}
              >
                Get Started
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Features Comparison */}
        <motion.div
          className="mt-16 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-center mb-8">Why Go Premium?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-[#1a1a24] rounded-xl p-6 border border-gray-800">
              <Trophy className="w-12 h-12 text-yellow-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Compete for Cash</h3>
              <p className="text-sm text-gray-400">
                Win real money prizes in tournaments and ranked matches
              </p>
            </div>
            <div className="bg-[#1a1a24] rounded-xl p-6 border border-gray-800">
              <Star className="w-12 h-12 text-purple-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Premium Perks</h3>
              <p className="text-sm text-gray-400">
                Access exclusive items, themes, and customization options
              </p>
            </div>
            <div className="bg-[#1a1a24] rounded-xl p-6 border border-gray-800">
              <TrendingUp className="w-12 h-12 text-green-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Earn While Playing</h3>
              <p className="text-sm text-gray-400">
                Turn your gaming skills into real earnings
              </p>
            </div>
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          className="mt-12 text-center text-sm text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p>✓ Cancel anytime • ✓ Secure payments • ✓ 24/7 support</p>
        </motion.div>
      </div>
    </div>
  );
}
