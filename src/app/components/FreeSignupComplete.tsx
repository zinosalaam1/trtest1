import { motion } from 'motion/react';
import { CheckCircle, Zap, Trophy, Users, Star } from 'lucide-react';
import logo from '../../assets/logo.svg';
import { ParticleEffect } from './ParticleEffect';

interface FreeSignupCompleteProps {
  onComplete: () => void;
}

export function FreeSignupComplete({ onComplete }: FreeSignupCompleteProps) {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white relative overflow-hidden flex items-center justify-center">
      <ParticleEffect />
      
      <motion.div
        className="relative z-10 max-w-2xl mx-auto px-4 sm:px-8 text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Success Icon */}
        <motion.div
          className="mb-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        >
          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <img src={logo} alt="Tour Arcade" className="h-12 mx-auto mb-6" />
          <h1 className="text-3xl sm:text-5xl font-bold mb-4">Welcome to Tour Arcade!</h1>
          <p className="text-xl text-gray-400 mb-8">
            Your free account is ready. Let's get you started!
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="bg-[#1a1a24] rounded-xl p-6 border border-gray-800">
            <Zap className="w-8 h-8 text-blue-400 mb-3 mx-auto" />
            <h3 className="font-semibold mb-2">Unlimited Gaming</h3>
            <p className="text-sm text-gray-400">Play all our games without limits</p>
          </div>
          <div className="bg-[#1a1a24] rounded-xl p-6 border border-gray-800">
            <Trophy className="w-8 h-8 text-yellow-400 mb-3 mx-auto" />
            <h3 className="font-semibold mb-2">Leaderboards</h3>
            <p className="text-sm text-gray-400">Compete globally & track your rank</p>
          </div>
          <div className="bg-[#1a1a24] rounded-xl p-6 border border-gray-800">
            <Users className="w-8 h-8 text-purple-400 mb-3 mx-auto" />
            <h3 className="font-semibold mb-2">Community</h3>
            <p className="text-sm text-gray-400">Connect with fellow gamers</p>
          </div>
          <div className="bg-[#1a1a24] rounded-xl p-6 border border-gray-800">
            <Star className="w-8 h-8 text-pink-400 mb-3 mx-auto" />
            <h3 className="font-semibold mb-2">Achievements</h3>
            <p className="text-sm text-gray-400">Unlock badges & earn rewards</p>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.button
          onClick={onComplete}
          className="bg-gradient-to-r from-purple-600 to-pink-600 px-12 py-4 rounded-lg text-lg font-semibold hover:opacity-90 transition-opacity"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(168, 85, 247, 0.5)' }}
          whileTap={{ scale: 0.95 }}
        >
          Start Playing Now
        </motion.button>

        {/* Upgrade Prompt */}
        <motion.div
          className="mt-8 p-4 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg border border-purple-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-sm text-gray-400">
            Want to compete for cash prizes? 
            <button className="ml-2 text-purple-400 hover:text-purple-300 underline">
              Upgrade to Standard
            </button>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
