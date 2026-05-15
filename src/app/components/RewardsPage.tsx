import { Menu, Search, Settings, Home, Users, Trophy, Gift, Sparkles, ShoppingCart, Crown, Zap, Star, Award, Target, Clock, TrendingUp, Lock, Bell, MessageCircle, Wallet } from 'lucide-react';
import logo from '../../assets/logo.svg';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Progress } from './ui/progress';

interface RewardsPageProps {
  onBack: () => void;
  onOpenSettings?: () => void;
  onOpenProfile?: () => void;
  onNavigate: (page: string) => void;
}

const dailyRewards = [
  { day: 1, reward: '50 Points', claimed: true, icon: '💎' },
  { day: 2, reward: '100 Points', claimed: true, icon: '💰' },
  { day: 3, reward: '150 Points', claimed: true, icon: '🎁' },
  { day: 4, reward: '200 Points', claimed: false, current: true, icon: '🏆' },
  { day: 5, reward: '300 Points', claimed: false, icon: '👑' },
  { day: 6, reward: '500 Points', claimed: false, icon: '💎' },
  { day: 7, reward: '1000 Points', claimed: false, icon: '🎉' }
];

const achievements = [
  { id: 1, title: 'First Victory', description: 'Win your first game', progress: 100, total: 100, points: 100, icon: '🏆', unlocked: true },
  { id: 2, title: 'Win Streak', description: 'Win 5 games in a row', progress: 3, total: 5, points: 250, icon: '🔥', unlocked: false },
  { id: 3, title: 'Century Club', description: 'Play 100 games', progress: 67, total: 100, points: 500, icon: '🎮', unlocked: false },
  { id: 4, title: 'Top Scorer', description: 'Reach top 10 in leaderboard', progress: 0, total: 1, points: 1000, icon: '⭐', unlocked: false },
  { id: 5, title: 'Social Butterfly', description: 'Add 25 friends', progress: 12, total: 25, points: 300, icon: '🦋', unlocked: false },
  { id: 6, title: 'Tournament Winner', description: 'Win a tournament', progress: 0, total: 1, points: 2000, icon: '👑', unlocked: false }
];

const redeemableRewards = [
  { id: 1, title: 'Game Pass', description: '1 Week Premium Access', cost: 5000, icon: '🎫', available: true },
  { id: 2, title: 'Avatar Frame', description: 'Legendary Gold Frame', cost: 2500, icon: '🖼️', available: true },
  { id: 3, title: 'Custom Badge', description: 'VIP Status Badge', cost: 3000, icon: '🏅', available: true },
  { id: 4, title: 'Prize Pool Boost', description: '2x Earnings for 1 Day', cost: 10000, icon: '💰', available: false },
  { id: 5, title: 'Exclusive Skin', description: 'Limited Edition Character Skin', cost: 7500, icon: '🎨', available: true },
  { id: 6, title: 'Tournament Entry', description: 'Free Premium Tournament Entry', cost: 4000, icon: '🎟️', available: true }
];

export function RewardsPage({ onBack, onOpenSettings, onOpenProfile, onNavigate }: RewardsPageProps) {
  const [userPoints, setUserPoints] = useState(8420);
  const [selectedTab, setSelectedTab] = useState<'daily' | 'achievements' | 'redeem'>('daily');

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
                placeholder="Search rewards..."
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

        {/* Navigation Tabs */}
        <div className="bg-[#0f0f13] border-b border-gray-800 px-4 sm:px-8 py-4">
          <div className="flex items-center gap-4">
            <motion.button 
              onClick={onBack}
              className="px-6 py-3 rounded-lg flex items-center gap-2 bg-gray-700 text-white hover:bg-gray-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🎮 Games
            </motion.button>
            <motion.button 
              onClick={() => onNavigate('leaderboards')}
              className="px-6 py-3 rounded-lg flex items-center gap-2 bg-gray-700 text-white hover:bg-gray-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🏆 Leaderboards
            </motion.button>
            <motion.button 
              onClick={() => onNavigate('socials')}
              className="px-6 py-3 rounded-lg flex items-center gap-2 bg-gray-700 text-white hover:bg-gray-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              👥 Socials
            </motion.button>
            <motion.button 
              className="px-6 py-3 rounded-lg flex items-center gap-2 bg-gradient-to-r from-yellow-600 to-orange-600 text-white"
              whileHover={{ scale: 1.05 }}
            >
              🎁 Rewards
            </motion.button>
          </div>
        </div>

        {/* Rewards Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
            {/* Points Balance */}
            <motion.div 
              className="bg-gradient-to-r from-yellow-600 to-orange-600 rounded-2xl p-8 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-yellow-100 mb-2">Your Points Balance</div>
                  <motion.div 
                    className="text-5xl mb-3"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {userPoints.toLocaleString()} Points
                  </motion.div>
                  <div className="flex items-center gap-4 text-sm text-yellow-100">
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      +450 this week
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      Top 15% earners
                    </div>
                  </div>
                </div>
                <motion.div 
                  className="text-8xl"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  💎
                </motion.div>
              </div>
            </motion.div>

            {/* Tabs */}
            <div className="flex gap-3 mb-6">
              <motion.button
                onClick={() => setSelectedTab('daily')}
                className={`flex-1 py-4 rounded-xl transition-all ${
                  selectedTab === 'daily' 
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white' 
                    : 'bg-[#1a1a1f] text-gray-400 hover:bg-[#2a2a2f]'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Clock className="w-5 h-5 mx-auto mb-1" />
                Daily Rewards
              </motion.button>
              <motion.button
                onClick={() => setSelectedTab('achievements')}
                className={`flex-1 py-4 rounded-xl transition-all ${
                  selectedTab === 'achievements' 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                    : 'bg-[#1a1a1f] text-gray-400 hover:bg-[#2a2a2f]'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Award className="w-5 h-5 mx-auto mb-1" />
                Achievements
              </motion.button>
              <motion.button
                onClick={() => setSelectedTab('redeem')}
                className={`flex-1 py-4 rounded-xl transition-all ${
                  selectedTab === 'redeem' 
                    ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white' 
                    : 'bg-[#1a1a1f] text-gray-400 hover:bg-[#2a2a2f]'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Gift className="w-5 h-5 mx-auto mb-1" />
                Redeem
              </motion.button>
            </div>

            {/* Daily Rewards */}
            {selectedTab === 'daily' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h2 className="text-2xl mb-4">Daily Login Rewards</h2>
                <p className="text-gray-400 mb-6">Login every day to claim your rewards! Current streak: 3 days</p>
                <div className="grid grid-cols-7 gap-4">
                  {dailyRewards.map((reward, idx) => (
                    <motion.div
                      key={reward.day}
                      className={`rounded-xl p-6 text-center relative ${
                        reward.claimed ? 'bg-gray-700' :
                        reward.current ? 'bg-gradient-to-br from-blue-600 to-cyan-600' :
                        'bg-[#1a1a1f]'
                      }`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.1 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                    >
                      {reward.claimed && (
                        <div className="absolute top-2 right-2 bg-green-500 rounded-full p-1">
                          <Award className="w-3 h-3" />
                        </div>
                      )}
                      <motion.div 
                        className="text-4xl mb-2"
                        animate={reward.current ? { scale: [1, 1.2, 1] } : {}}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        {reward.icon}
                      </motion.div>
                      <div className="text-sm mb-1">Day {reward.day}</div>
                      <div className="text-xs text-gray-300">{reward.reward}</div>
                      {reward.current && (
                        <motion.button 
                          className="mt-3 w-full bg-white text-blue-600 py-2 rounded-lg text-sm hover:bg-gray-100 transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Claim
                        </motion.button>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Achievements */}
            {selectedTab === 'achievements' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h2 className="text-2xl mb-4">Achievements</h2>
                <p className="text-gray-400 mb-6">Complete challenges to earn bonus points!</p>
                <div className="grid grid-cols-2 gap-4">
                  {achievements.map((achievement, idx) => (
                    <motion.div
                      key={achievement.id}
                      className={`rounded-xl p-6 ${
                        achievement.unlocked 
                          ? 'bg-gradient-to-br from-yellow-600 to-orange-600' 
                          : 'bg-[#1a1a1f]'
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      whileHover={{ scale: 1.02, y: -5 }}
                    >
                      <div className="flex items-start gap-4">
                        <motion.div 
                          className={`text-5xl ${achievement.unlocked ? '' : 'grayscale opacity-50'}`}
                          animate={achievement.unlocked ? { rotate: [0, 10, -10, 0] } : {}}
                          transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
                        >
                          {achievement.icon}
                        </motion.div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg">{achievement.title}</h3>
                            <div className="bg-black/30 px-3 py-1 rounded-full text-sm">
                              +{achievement.points} pts
                            </div>
                          </div>
                          <p className="text-sm text-gray-300 mb-3">{achievement.description}</p>
                          {!achievement.unlocked && (
                            <>
                              <div className="flex items-center justify-between text-xs mb-2">
                                <span>Progress</span>
                                <span>{achievement.progress}/{achievement.total}</span>
                              </div>
                              <Progress 
                                value={(achievement.progress / achievement.total) * 100} 
                                className="h-2"
                              />
                            </>
                          )}
                          {achievement.unlocked && (
                            <div className="text-sm flex items-center gap-2 text-yellow-100">
                              <Award className="w-4 h-4" />
                              Unlocked!
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Redeem Rewards */}
            {selectedTab === 'redeem' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h2 className="text-2xl mb-4">Redeem Rewards</h2>
                <p className="text-gray-400 mb-6">Exchange your points for exclusive rewards and perks!</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {redeemableRewards.map((reward, idx) => (
                    <motion.div
                      key={reward.id}
                      className={`rounded-xl p-6 ${
                        reward.available ? 'bg-[#1a1a1f]' : 'bg-gray-900 opacity-60'
                      }`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.1 }}
                      whileHover={reward.available ? { scale: 1.05, y: -5 } : {}}
                    >
                      <div className="relative">
                        {!reward.available && (
                          <div className="absolute top-0 right-0 bg-red-600 rounded-full p-2">
                            <Lock className="w-4 h-4" />
                          </div>
                        )}
                        <motion.div 
                          className="text-5xl mb-3 text-center"
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: idx * 0.3 }}
                        >
                          {reward.icon}
                        </motion.div>
                        <h3 className="text-lg mb-1">{reward.title}</h3>
                        <p className="text-sm text-gray-400 mb-4">{reward.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="text-yellow-400">{reward.cost.toLocaleString()} pts</div>
                          <motion.button
                            className={`px-4 py-2 rounded-lg ${
                              reward.available && userPoints >= reward.cost
                                ? 'bg-green-600 hover:bg-green-700'
                                : 'bg-gray-700 cursor-not-allowed'
                            } text-white transition-colors`}
                            disabled={!reward.available || userPoints < reward.cost}
                            whileHover={reward.available && userPoints >= reward.cost ? { scale: 1.05 } : {}}
                            whileTap={reward.available && userPoints >= reward.cost ? { scale: 0.95 } : {}}
                          >
                            {reward.available ? (userPoints >= reward.cost ? 'Redeem' : 'Not Enough') : 'Locked'}
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
