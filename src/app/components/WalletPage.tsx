import { Menu, Search, Settings, Home, Users, Trophy, Gift, Sparkles, ShoppingCart, Crown, Zap, Wallet, TrendingUp, ArrowUpRight, ArrowDownLeft, Plus, Bell, MessageCircle } from 'lucide-react';
import logo from '../../assets/logo.svg';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { walletApi } from '../utils/api';

interface WalletPageProps {
  onBack: () => void;
  onOpenSettings?: () => void;
  onOpenProfile?: () => void;
  onNavigate: (page: string) => void;
}


export function WalletPage({
  onBack,
  onOpenSettings,
  onOpenProfile,
  onNavigate,
}: WalletPageProps) {

  const [transactions, setTransactions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    walletApi.transactions()
      .then(data => {
        setTransactions(data || []);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);
  const totalBalance = 542.75;
  const totalEarnings = 1245.50;
  const pendingPayout = 125.00;

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

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-xl">
              😎
            </div>
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

        {/* Wallet Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-6xl mx-auto">
            {/* Hero */}
            <motion.div 
              className="text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Wallet className="w-10 h-10 text-green-500" />
                </motion.div>
                <h1 className="text-4xl">Wallet</h1>
              </div>
            </motion.div>

            {/* Balance Cards */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              <motion.div
                className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl p-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(34, 197, 94, 0.4)" }}
              >
                <div className="text-sm text-green-100 mb-2">Available Balance</div>
                <motion.div 
                  className="text-4xl mb-3"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ${totalBalance.toFixed(2)}
                </motion.div>
                <motion.button 
                  className="bg-white text-green-600 px-6 py-2 rounded-lg w-full flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Plus className="w-4 h-4" />
                  Add Funds
                </motion.button>
              </motion.div>

              <motion.div
                className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl p-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)" }}
              >
                <div className="text-sm text-blue-100 mb-2">Total Earnings</div>
                <div className="text-4xl mb-3">${totalEarnings.toFixed(2)}</div>
                <div className="flex items-center gap-2 text-sm text-blue-100">
                  <TrendingUp className="w-4 h-4" />
                  +12.5% this month
                </div>
              </motion.div>

              <motion.div
                className="bg-gradient-to-br from-yellow-600 to-orange-600 rounded-xl p-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(234, 179, 8, 0.4)" }}
              >
                <div className="text-sm text-yellow-100 mb-2">Pending Payout</div>
                <div className="text-4xl mb-3">${pendingPayout.toFixed(2)}</div>
                <div className="text-sm text-yellow-100">Available in 3 days</div>
              </motion.div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <motion.button
                className="bg-[#1a1a1f] rounded-xl p-4 border border-gray-800 hover:border-green-600 transition-colors flex items-center gap-3"
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                  <ArrowUpRight className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <div>Withdraw</div>
                  <div className="text-xs text-gray-400">Transfer to bank</div>
                </div>
              </motion.button>

              <motion.button
                onClick={() => onNavigate('shop')}
                className="bg-[#1a1a1f] rounded-xl p-4 border border-gray-800 hover:border-blue-600 transition-colors flex items-center gap-3"
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <Plus className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <div>Add Funds</div>
                  <div className="text-xs text-gray-400">Buy coins</div>
                </div>
              </motion.button>

              <motion.button
                className="bg-[#1a1a1f] rounded-xl p-4 border border-gray-800 hover:border-purple-600 transition-colors flex items-center gap-3"
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                  <ArrowDownLeft className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <div>History</div>
                  <div className="text-xs text-gray-400">View all</div>
                </div>
              </motion.button>
            </div>

            {/* Recent Transactions */}
            <div>
              <h2 className="text-2xl mb-6">Recent Transactions</h2>
              <div className="space-y-3">
                {transactions.map((transaction, idx) => (
                  <motion.div
                    key={transaction.id}
                    className="bg-[#1a1a1f] rounded-xl p-4 border border-gray-800 flex items-center justify-between"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    whileHover={{ x: 10, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)" }}
                  >
                    <div className="flex items-center gap-4">
                      <motion.div 
                        className="text-3xl"
                        whileHover={{ scale: 1.3, rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        {transaction.icon}
                      </motion.div>
                      <div>
                        <div>{transaction.title}</div>
                        <div className="text-sm text-gray-400">{transaction.time}</div>
                      </div>
                    </div>
                    <div className={`text-xl ${
                      transaction.type === 'earn' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {transaction.amount}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
