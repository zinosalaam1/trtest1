import { Menu, Settings, Home, Users, Trophy, Gift, Sparkles, ShoppingCart, Crown, Zap, Shield, Clock, DollarSign } from 'lucide-react';
import logo from '../../assets/logo.svg';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { showToast } from './ToastManager';

interface TeamBattlePageProps {
  onBack: () => void;
  onOpenSettings?: () => void;
  onOpenProfile?: () => void;
  onNavigate: (page: string) => void;
}

export function TeamBattlePage({ onBack, onOpenSettings, onOpenProfile, onNavigate }: TeamBattlePageProps) {
  const [teamMode, setTeamMode] = useState<'solo' | 'party' | null>(null);
  const [searching, setSearching] = useState(false);

  const startSearch = (mode: 'solo' | 'party') => {
    setTeamMode(mode);
    setSearching(true);
    showToast({ type: 'info', title: 'Searching', message: `Finding ${mode === 'solo' ? 'teammates and opponents' : 'opponents for your party'}...` });
    
    setTimeout(() => {
      showToast({ type: 'success', title: 'Match Found!', message: 'Entering team lobby...' });
      setTimeout(() => onNavigate('gamelibrary'), 2000);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Left Sidebar - Same as DuelMatchPage */}
      <div className="w-16 bg-[#0f0f13] flex flex-col items-center py-6 gap-6 border-r border-gray-800">
        <button onClick={onBack} className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors">
          <Home className="w-5 h-5" />
        </button>
        <button onClick={onOpenProfile} className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors">
          <Users className="w-5 h-5" />
        </button>
        <button onClick={() => onNavigate('tournaments')} className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors">
          <Trophy className="w-5 h-5" />
        </button>
        <button onClick={() => onNavigate('marketplace')} className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors">
          <Gift className="w-5 h-5" />
        </button>
        <button onClick={() => onNavigate('events')} className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors">
          <Sparkles className="w-5 h-5" />
        </button>
        <button onClick={() => onNavigate('shop')} className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors">
          <ShoppingCart className="w-5 h-5" />
        </button>
        <button onClick={() => onNavigate('premium')} className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors">
          <Crown className="w-5 h-5" />
        </button>
        <button onClick={() => onNavigate('quickmatch')} className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-600 to-orange-600 flex items-center justify-center">
          <Zap className="w-5 h-5" />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-[#0f0f13] border-b border-gray-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button className="text-gray-400 hover:text-white"><Menu className="w-6 h-6" /></button>
            <img src={logo} alt="Tour Arcade" className="h-8" />
          </div>
          <div className="flex items-center gap-3">
            <button onClick={onOpenSettings} className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center hover:bg-gray-500 transition-colors">
              <Settings className="w-5 h-5" />
            </button>
            <button onClick={onOpenProfile} className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" alt="User" className="w-full h-full rounded-full object-cover" />
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 bg-gradient-to-b from-black via-blue-950/10 to-black">
          <div className="max-w-6xl mx-auto">
            <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-center justify-center gap-4 mb-4">
                <motion.div animate={{ rotate: [0, -10, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                  <Shield className="w-16 h-16 text-blue-500" />
                </motion.div>
                <h1 className="text-6xl">Team Battle</h1>
              </div>
              <p className="text-xl text-gray-400">Join forces with allies and dominate as a team!</p>
              <div className="flex items-center justify-center gap-8 mt-6 text-gray-400">
                <div className="flex items-center gap-2"><Users className="w-5 h-5" /><span>4v4 Battle</span></div>
                <div className="flex items-center gap-2"><Clock className="w-5 h-5" /><span>15-20 min</span></div>
                <div className="flex items-center gap-2 text-green-400"><DollarSign className="w-5 h-5" /><span>$200 Prize Pool</span></div>
              </div>
            </motion.div>

            {!searching && (
              <div className="grid grid-cols-2 gap-8">
                <motion.div
                  className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 rounded-2xl p-8 border-2 border-blue-500 cursor-pointer"
                  whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(59, 130, 246, 0.5)" }}
                  onClick={() => startSearch('solo')}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <div className="text-center">
                    <motion.div className="inline-block mb-6" animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                      <Users className="w-20 h-20 text-blue-400" />
                    </motion.div>
                    <h2 className="text-3xl mb-4">Solo Queue</h2>
                    <p className="text-gray-300 mb-6">Join as a solo player and get matched with 3 teammates</p>
                    <ul className="text-left space-y-2 text-gray-300">
                      <li>✓ Automatic matchmaking</li>
                      <li>✓ Balanced team composition</li>
                      <li>✓ Quick queue times</li>
                    </ul>
                  </div>
                </motion.div>

                <motion.div
                  className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-2xl p-8 border-2 border-purple-500 cursor-pointer"
                  whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(168, 85, 247, 0.5)" }}
                  onClick={() => startSearch('party')}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <div className="text-center">
                    <motion.div className="inline-block mb-6" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                      <Shield className="w-20 h-20 text-purple-400" />
                    </motion.div>
                    <h2 className="text-3xl mb-4">Party Queue</h2>
                    <p className="text-gray-300 mb-6">Bring your own squad of 4 players</p>
                    <ul className="text-left space-y-2 text-gray-300">
                      <li>✓ Play with friends</li>
                      <li>✓ Better coordination</li>
                      <li>✓ Team synergy bonus</li>
                    </ul>
                  </div>
                </motion.div>
              </div>
            )}

            {searching && (
              <motion.div className="text-center py-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="inline-block mb-6">
                  <Shield className="w-24 h-24 text-blue-500" />
                </motion.div>
                <h2 className="text-4xl mb-4">Finding {teamMode === 'solo' ? 'Teammates & Opponents' : 'Opponents'}...</h2>
                <motion.p className="text-xl text-gray-400" animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
                  Assembling your team
                </motion.p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
