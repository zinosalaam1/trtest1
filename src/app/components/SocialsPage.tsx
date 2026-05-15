import { Menu, Search, Settings, Home, Users, Trophy, Gift, Sparkles, ShoppingCart, Crown, Zap, UserPlus, MessageCircle, Send, Phone, Video, MoreVertical, Star, Bell, Wallet } from 'lucide-react';
import logo from '../../assets/logo.svg';

import { Input } from './ui/input';
import { socialApi } from '../utils/api';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface SocialsPageProps {
  onBack: () => void;
  onOpenSettings?: () => void;
  onOpenProfile?: () => void;
  onNavigate: (page: string) => void;
}


const pendingRequests = [
  { id: 1, name: 'NewPlayer123', avatar: '🎯', mutualFriends: 3, level: 15 },
  { id: 2, name: 'GameMaster', avatar: '🎲', mutualFriends: 7, level: 28 }
];



export function SocialsPage({
  onBack,
  onOpenSettings,
  onOpenProfile,
  onNavigate
}: SocialsPageProps) {
  const [friends, setFriends] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedFriend, setSelectedFriend] = useState<number>(1);
  const [chatInput, setChatInput] = useState('');
  const [activeTab, setActiveTab] = useState<'friends' | 'requests' | 'party'>('friends');

  useEffect(() => {
    Promise.all([
      socialApi.friends().catch(() => []),
      socialApi.messages().catch(() => []),
    ]).then(([f, m]) => {
      setFriends(f as any[]);
      setMessages(m as any[]);
      setIsLoading(false);
    });
  }, []);

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
                placeholder="Search friends..."
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
        <div className="bg-[#0f0f13] border-b border-gray-800 px-8 py-4">
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
              className="px-6 py-3 rounded-lg flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white"
              whileHover={{ scale: 1.05 }}
            >
              👥 Socials
            </motion.button>
            <motion.button 
              onClick={() => onNavigate('rewards')}
              className="px-6 py-3 rounded-lg flex items-center gap-2 bg-gray-700 text-white hover:bg-gray-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🎁 Rewards
            </motion.button>
          </div>
        </div>

        {/* Socials Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Friends List Sidebar */}
          <div className="w-80 bg-[#0f0f13] border-r border-gray-800 flex flex-col">
            {/* Tabs */}
            <div className="flex border-b border-gray-800">
              <button
                onClick={() => setActiveTab('friends')}
                className={`flex-1 py-3 text-sm ${activeTab === 'friends' ? 'bg-[#1a1a1f] text-white' : 'text-gray-400'}`}
              >
                Friends ({friends.length})
              </button>
              <button
                onClick={() => setActiveTab('requests')}
                className={`flex-1 py-3 text-sm ${activeTab === 'requests' ? 'bg-[#1a1a1f] text-white' : 'text-gray-400'}`}
              >
                Requests ({pendingRequests.length})
              </button>
              <button
                onClick={() => setActiveTab('party')}
                className={`flex-1 py-3 text-sm ${activeTab === 'party' ? 'bg-[#1a1a1f] text-white' : 'text-gray-400'}`}
              >
                Party ({partyMembers.length})
              </button>
            </div>

            {/* Add Friend Button */}
            <div className="p-4 border-b border-gray-800">
              <motion.button 
                className="w-full bg-green-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-green-700 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <UserPlus className="w-4 h-4" />
                Add Friend
              </motion.button>
            </div>

            {/* Friends List */}
            <div className="flex-1 overflow-y-auto">
              {activeTab === 'friends' && friends.map((friend, idx) => (
                <motion.div
                  key={friend.id}
                  className={`p-4 cursor-pointer border-b border-gray-800 ${
                    selectedFriend === friend.id ? 'bg-[#1a1a1f]' : 'hover:bg-[#1a1a1f]'
                  }`}
                  onClick={() => setSelectedFriend(friend.id)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ x: 5 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-2xl">
                        {friend.avatar}
                      </div>
                      <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[#0f0f13] ${
                        friend.status === 'online' ? 'bg-green-500' :
                        friend.status === 'away' ? 'bg-yellow-500' :
                        'bg-gray-500'
                      }`}></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <div className="truncate">{friend.name}</div>
                        <div className="text-xs bg-blue-600 px-2 py-0.5 rounded">{friend.level}</div>
                      </div>
                      <div className="text-xs text-gray-400 truncate">{friend.game}</div>
                      <div className="text-xs text-gray-500">{friend.mutual} mutual friends</div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {activeTab === 'requests' && pendingRequests.map((request, idx) => (
                <motion.div
                  key={request.id}
                  className="p-4 border-b border-gray-800"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center text-2xl">
                      {request.avatar}
                    </div>
                    <div className="flex-1">
                      <div>{request.name}</div>
                      <div className="text-xs text-gray-400">Level {request.level} • {request.mutualFriends} mutual</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <motion.button 
                      className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Accept
                    </motion.button>
                    <motion.button 
                      className="flex-1 bg-gray-700 text-white py-2 rounded hover:bg-gray-600 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Decline
                    </motion.button>
                  </div>
                </motion.div>
              ))}

              {activeTab === 'party' && (
                <div className="p-4">
                  <div className="space-y-3 mb-4">
                    {partyMembers.map((member, idx) => (
                      <motion.div
                        key={member.id}
                        className="flex items-center justify-between p-3 bg-[#1a1a1f] rounded-lg"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-xl">
                            {member.avatar}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span>{member.name}</span>
                              {member.host && <span className="text-xs bg-yellow-600 px-2 py-0.5 rounded">Host</span>}
                            </div>
                            <div className={`text-xs ${member.ready ? 'text-green-400' : 'text-gray-400'}`}>
                              {member.ready ? 'Ready' : 'Not Ready'}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <motion.button 
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-lg hover:opacity-90 transition-opacity"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Start Game
                  </motion.button>
                </div>
              )}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="bg-[#1a1a1f] border-b border-gray-800 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-xl">
                  🎮
                </div>
                <div>
                  <div>ProGamer_420</div>
                  <div className="text-xs text-green-400">Online • Playing Traffic Rider</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <motion.button 
                  className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-600 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Phone className="w-5 h-5" />
                </motion.button>
                <motion.button 
                  className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-600 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Video className="w-5 h-5" />
                </motion.button>
                <motion.button 
                  className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-600 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <MoreVertical className="w-5 h-5" />
                </motion.button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {chatMessages.map((msg, idx) => (
                <motion.div
                  key={msg.id}
                  className={`flex gap-3 ${msg.user === 'You' ? 'flex-row-reverse' : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-xl flex-shrink-0">
                    {msg.avatar}
                  </div>
                  <div className={`flex-1 max-w-md ${msg.user === 'You' ? 'text-right' : ''}`}>
                    <div className="text-xs text-gray-400 mb-1">{msg.user} • {msg.time}</div>
                    <div className={`inline-block px-4 py-2 rounded-lg ${
                      msg.user === 'You' ? 'bg-blue-600 text-white' : 'bg-[#1a1a1f] text-white'
                    }`}>
                      {msg.message}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-gray-800">
              <div className="flex gap-2">
                <Input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 bg-[#1a1a1f] border-gray-700 text-white"
                />
                <motion.button 
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Friend Details Sidebar */}
          <div className="w-80 bg-[#0f0f13] border-l border-gray-800 p-6">
            <motion.div 
              className="text-center mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <motion.div 
                className="w-24 h-24 bg-purple-600 rounded-full flex items-center justify-center text-5xl mx-auto mb-4"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                🎮
              </motion.div>
              <h3 className="text-xl mb-1">ProGamer_420</h3>
              <div className="text-sm text-green-400 mb-2">Online</div>
              <div className="text-xs text-gray-400">Level 45 • Rank #234</div>
            </motion.div>

            {/* Quick Actions */}
            <div className="space-y-3 mb-6">
              <motion.button 
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <MessageCircle className="w-4 h-4" />
                Send Message
              </motion.button>
              <motion.button 
                className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Users className="w-4 h-4" />
                Invite to Party
              </motion.button>
              <motion.button 
                className="w-full bg-gray-700 text-white py-3 rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Star className="w-4 h-4" />
                Add to Favorites
              </motion.button>
            </div>

            {/* Stats */}
            <div className="bg-[#1a1a1f] rounded-xl p-4">
              <h4 className="mb-3">Recent Stats</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Win Rate</span>
                  <span className="text-green-400">87%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Games Played</span>
                  <span>1,245</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Favorite Game</span>
                  <span>Traffic Rider</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Mutual Friends</span>
                  <span>12</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
