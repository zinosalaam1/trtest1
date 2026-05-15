import { Menu, Search, Settings, Home, Users, Trophy, Gift, Sparkles, ShoppingCart, Crown, Zap, Edit, Share, ArrowLeft, Send, Calendar, Flame, Gamepad2, Bell, MessageCircle, Wallet } from 'lucide-react';
import logo from '../../assets/logo.svg';
import friendsIcon from '../../assets/friends-icon.svg';

import { socialApi } from '../utils/api';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface ProfilePageProps {
  onBack: () => void;
  onOpenSettings?: () => void;
  onNavigate?: (page: string) => void;
}

const recentGames = [
  {
    title: 'Traffic Rider',
    image: 'https://placehold.co/400x200/1a0533/a855f7?text=Tour+Arcade'
  },
  {
    title: 'Cyber Hunter',
    image: 'https://placehold.co/400x200/1a0533/a855f7?text=Tour+Arcade'
  },
  {
    title: 'Street Fighter II',
    image: 'https://placehold.co/400x200/1a0533/a855f7?text=Tour+Arcade'
  }
];


export function ProfilePage({
  onBack,
  onOpenSettings,
  onNavigate
}: ProfilePageProps) {
  const [friends, setFriends] = useState<any[]>([]);
  const [selectedFriend, setSelectedFriend] = useState<number | null>(null);

  useEffect(() => {
    socialApi
      .friends()
      .then((data: any) => setFriends(data || []))
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Left Sidebar */}
      <div className="w-16 bg-[#0f0f13] flex flex-col items-center py-6 gap-6 border-r border-gray-800">
        <button 
          onClick={onBack}
          className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center hover:bg-blue-700 transition-colors"
        >
          <Home className="w-5 h-5" />
        </button>
        <button className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors">
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
            <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center cursor-pointer">
              <img 
                src="https://placehold.co/400x200/1a0533/a855f7?text=Tour+Arcade"
                alt="User"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>
        </header>

        {/* Profile Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto p-6">
            {/* Back Button */}
            <button 
              onClick={onBack}
              className="flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </button>

            <div className="grid grid-cols-3 gap-6">
              {/* Left Column - Profile Card */}
              <div className="col-span-2 space-y-6">
                {/* Profile Header Card */}
                <motion.div 
                  className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 relative overflow-hidden"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <motion.div 
                      className="absolute top-0 right-0 w-64 h-64 bg-purple-600 rounded-full blur-3xl"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3]
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                    ></motion.div>
                  </div>

                  <div className="relative flex items-start gap-6">
                    {/* Avatar with Status */}
                    <motion.div 
                      className="relative"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                    >
                      <motion.div 
                        className="w-32 h-32 rounded-full bg-gradient-to-br from-red-500 to-pink-600 p-1"
                        animate={{
                          boxShadow: [
                            "0 0 0px rgba(239, 68, 68, 0)",
                            "0 0 30px rgba(239, 68, 68, 0.6)",
                            "0 0 0px rgba(239, 68, 68, 0)"
                          ]
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        <div className="w-full h-full rounded-full overflow-hidden">
                          <img 
                            src="https://placehold.co/400x200/1a0533/a855f7?text=Tour+Arcade"
                            alt="EliteGamer"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </motion.div>
                      <motion.div 
                        className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 border-4 border-gray-800 rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      ></motion.div>
                      <motion.div 
                        className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-green-500 text-xs px-3 py-1 rounded-full"
                        animate={{
                          boxShadow: [
                            "0 0 0px rgba(34, 197, 94, 0)",
                            "0 0 20px rgba(34, 197, 94, 0.6)",
                            "0 0 0px rgba(34, 197, 94, 0)"
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        Premium
                      </motion.div>
                    </motion.div>

                    {/* Profile Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h1 className="text-3xl mb-1 flex items-center gap-2">
                            EliteGamer
                            <div className="text-sm bg-yellow-600 px-2 py-0.5 rounded">Level 42</div>
                          </h1>
                          <div className="flex items-center gap-2 text-gray-400">
                            <span>Rank #47</span>
                            <span>•</span>
                            <span className="text-green-400">Online</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-purple-700 transition-colors">
                            <Edit className="w-4 h-4" />
                            Edit Profile
                          </button>
                          <button className="bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-600 transition-colors">
                            <Settings className="w-4 h-4" />
                            Settings
                          </button>
                          <button className="bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-600 transition-colors">
                            <Share className="w-4 h-4" />
                            Share
                          </button>
                        </div>
                      </div>

                      {/* Level Progress */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="flex items-center gap-1">
                            <Trophy className="w-4 h-4 text-yellow-500" />
                            Level Progress
                          </span>
                          <span className="text-gray-400">Level 42</span>
                        </div>
                        <div className="bg-gray-700 rounded-full h-3 overflow-hidden">
                          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 h-full" style={{ width: '68%' }}></div>
                        </div>
                        <div className="text-xs text-gray-400 mt-1">34,200 XP to Level 43</div>
                      </div>

                      {/* Bio/Stats Row */}
                      <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                          #42
                        </span>
                        <span>•</span>
                        <span>eet</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Recently Played */}
                <div className="bg-[#1a1a1f] rounded-2xl p-6">
                  <h2 className="text-xl mb-4">Recently played</h2>
                  <div className="grid grid-cols-3 gap-4">
                    {recentGames.map((game, idx) => (
                      <div key={idx} className="relative rounded-xl overflow-hidden group cursor-pointer">
                        <div className="aspect-video">
                          <img
                            src={game.image}
                            alt={game.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                        <div className="absolute bottom-3 left-3 right-3">
                          <h3 className="text-sm">{game.title}</h3>
                        </div>
                        <button className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-white/20 backdrop-blur-sm p-2 rounded-lg">
                          ▶
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4">
                  {/* Stats Card */}
                  <div className="bg-[#1a1a1f] rounded-xl p-6">
                    <h3 className="text-lg mb-4">Stats</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-blue-400" />
                        <div>
                          <div className="text-sm text-gray-400">Member for</div>
                          <div>52 days</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Gamepad2 className="w-4 h-4 text-purple-400" />
                        <div>
                          <div className="text-sm text-gray-400">Games Played</div>
                          <div>62</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Flame className="w-4 h-4 text-orange-400" />
                        <div>
                          <div className="text-sm text-gray-400">Play Streak</div>
                          <div>15 days</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Earnings Card */}
                  <div className="bg-gradient-to-br from-yellow-600 to-orange-600 rounded-xl p-6">
                    <h3 className="text-lg mb-2">Earnings</h3>
                    <div className="mb-4">
                      <div className="text-sm text-yellow-100">Available Balance</div>
                      <div className="text-2xl">$12.00</div>
                      <div className="text-xs text-yellow-100">Ready to withdraw</div>
                    </div>
                    <button className="w-full bg-yellow-500 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-yellow-400 transition-colors">
                      <Send className="w-4 h-4" />
                      Withdraw Funds
                    </button>
                    <div className="text-xs text-yellow-100 mt-2">1st Prize</div>
                  </div>

                  {/* Quick Actions */}
                  <div className="bg-[#1a1a1f] rounded-xl p-6">
                    <h3 className="text-lg mb-4 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-purple-400" />
                      Quick Actions
                    </h3>
                    <div className="space-y-2">
                      <button className="w-full bg-purple-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-purple-700 transition-colors">
                        <Gamepad2 className="w-4 h-4" />
                        Games Played
                      </button>
                      <button className="w-full bg-purple-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-purple-700 transition-colors">
                        <Trophy className="w-4 h-4" />
                        Join Tournament
                      </button>
                      <button className="w-full bg-purple-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-purple-700 transition-colors">
                        <Users className="w-4 h-4" />
                        Find Players
                      </button>
                      <button className="w-full bg-purple-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-purple-700 transition-colors">
                        <Share className="w-4 h-4" />
                        Export Stats
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Friends List */}
              <div className="bg-[#1a1a1f] rounded-2xl p-6 h-fit">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl">Friends</h2>
                  <button className="text-sm text-gray-400 hover:text-white transition-colors">▼</button>
                </div>

                <div className="space-y-3">
                  {friends.map((friend, idx) => (
                    <motion.div 
                      key={idx}
                      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedFriend === idx ? 'bg-[#2a2a32]' : 'hover:bg-[#2a2a32]'
                      }`}
                      onClick={() => setSelectedFriend(idx)}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="relative w-12 h-12 bg-gradient-to-br from-gray-600 to-gray-700 rounded-lg flex items-center justify-center text-2xl">
                        {friend.avatar}
                        {friend.online && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-[#1a1a1f] rounded-full"></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm">{friend.name}</div>
                        <div className="text-xs text-gray-400">{friend.tag}</div>
                      </div>
                      <motion.button 
                        className="text-gray-400 hover:text-white transition-colors"
                        whileHover={{ scale: 1.2, rotate: 15 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Send className="w-4 h-4" />
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <footer className="mt-12 pt-8 border-t border-gray-800">
              <div className="grid grid-cols-4 gap-8 mb-8">
                <div>
                  <h3 className="mb-4">TourArcade</h3>
                </div>
                <div>
                  <h3 className="mb-4">FAQs</h3>
                  <div className="space-y-2 text-sm text-gray-400">
                    <div>Privacy</div>
                    <div>Support chat</div>
                    <div>Jobs</div>
                  </div>
                </div>
                <div>
                  <h3 className="mb-4">Help Center</h3>
                  <div className="space-y-2 text-sm text-gray-400">
                    <div>Ways to play</div>
                    <div>Legal notices</div>
                  </div>
                </div>
                <div>
                  <h3 className="mb-4">Account</h3>
                  <div className="space-y-2 text-sm text-gray-400">
                    <div>Media center</div>
                    <div>Terms of use</div>
                    <div>Contact Us</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-500 pb-6">
                <div className="flex gap-3">
                  <a href="#" className="hover:text-white transition-colors">f</a>
                  <a href="#" className="hover:text-white transition-colors">in</a>
                  <a href="#" className="hover:text-white transition-colors">yt</a>
                  <a href="#" className="hover:text-white transition-colors">ig</a>
                </div>
              </div>

              <div className="text-xs text-gray-600">
                © 2025 © Tour Arcade Gaming Partners. All rights reserved.
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}