import { Menu, Search, Settings, Home, Users, Trophy, Gift, Sparkles, ShoppingCart, Crown, Zap, Calendar, Clock, MapPin, Star, Users as UsersIcon } from 'lucide-react';
import logo from '../../assets/trbg.png';

import { useState } from 'react';
import { motion } from 'motion/react';

interface EventsPageProps {
  onBack: () => void;
  onOpenSettings?: () => void;
  onOpenProfile?: () => void;
  onNavigate: (page: string) => void;
}

const liveEvents = [
  { id: 1, name: 'Weekend Warrior Tournament', type: 'Tournament', prize: '$5,000', participants: 248, maxParticipants: 256, endsIn: '2h 34m', icon: '⚔️', color: 'from-red-600 to-orange-600' },
  { id: 2, name: 'Speed Run Challenge', type: 'Challenge', prize: '$2,500', participants: 89, maxParticipants: 100, endsIn: '5h 12m', icon: '⚡', color: 'from-yellow-600 to-orange-600' },
  { id: 3, name: 'Team Deathmatch', type: 'Match', prize: '$1,000', participants: 32, maxParticipants: 64, endsIn: '1h 45m', icon: '🎯', color: 'from-purple-600 to-pink-600' }
];

const upcomingEvents = [
  { id: 4, name: 'Monthly Championship', date: 'Dec 15, 2025', time: '8:00 PM EST', prize: '$50,000', participants: 1024, icon: '👑', type: 'Championship' },
  { id: 5, name: 'Holiday Special Event', date: 'Dec 25, 2025', time: '12:00 PM EST', prize: '$10,000', participants: 512, icon: '🎄', type: 'Special' },
  { id: 6, name: 'New Year Showdown', date: 'Jan 1, 2026', time: '6:00 PM EST', prize: '$25,000', participants: 768, icon: '🎆', type: 'Tournament' }
];

const dailyChallenges = [
  { id: 1, challenge: 'Win 5 Matches', progress: 3, total: 5, reward: '500 Points', icon: '🏆' },
  { id: 2, challenge: 'Play 10 Games', progress: 7, total: 10, reward: '300 Points', icon: '🎮' },
  { id: 3, challenge: 'Reach Top 10', progress: 0, total: 1, reward: '1000 Points', icon: '⭐' },
  { id: 4, challenge: 'Invite 3 Friends', progress: 1, total: 3, reward: '750 Points', icon: '👥' }
];

export function EventsPage({ onBack, onOpenSettings, onOpenProfile, onNavigate }: EventsPageProps) {
  const [selectedTab, setSelectedTab] = useState<'live' | 'upcoming' | 'daily'>('live');

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
        <button className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
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

          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search events..."
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

        {/* Events Content */}
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
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                    scale: { duration: 2, repeat: Infinity }
                  }}
                >
                  <Sparkles className="w-10 h-10 text-purple-500" />
                </motion.div>
                <h1 className="text-4xl">Special Events</h1>
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Star className="w-10 h-10 text-yellow-500" />
                </motion.div>
              </div>
              <p className="text-gray-400">Join limited-time events and earn exclusive rewards</p>
            </motion.div>

            {/* Tabs */}
            <div className="flex gap-3 mb-8">
              <motion.button
                onClick={() => setSelectedTab('live')}
                className={`flex-1 py-4 rounded-xl transition-all ${
                  selectedTab === 'live' 
                    ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white' 
                    : 'bg-[#1a1a1f] text-gray-400 hover:bg-[#2a2a2f]'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  Live Events ({liveEvents.length})
                </div>
              </motion.button>
              <motion.button
                onClick={() => setSelectedTab('upcoming')}
                className={`flex-1 py-4 rounded-xl transition-all ${
                  selectedTab === 'upcoming' 
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white' 
                    : 'bg-[#1a1a1f] text-gray-400 hover:bg-[#2a2a2f]'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Calendar className="w-5 h-5 mx-auto mb-1" />
                Upcoming
              </motion.button>
              <motion.button
                onClick={() => setSelectedTab('daily')}
                className={`flex-1 py-4 rounded-xl transition-all ${
                  selectedTab === 'daily' 
                    ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white' 
                    : 'bg-[#1a1a1f] text-gray-400 hover:bg-[#2a2a2f]'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Trophy className="w-5 h-5 mx-auto mb-1" />
                Daily Challenges
              </motion.button>
            </div>

            {/* Live Events */}
            {selectedTab === 'live' && (
              <div className="space-y-6">
                {liveEvents.map((event, idx) => (
                  <motion.div
                    key={event.id}
                    className={`bg-gradient-to-r ${event.color} rounded-xl p-1`}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ scale: 1.02, boxShadow: "0 10px 40px rgba(0, 0, 0, 0.5)" }}
                  >
                    <div className="bg-[#1a1a1f] rounded-xl p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <motion.div 
                            className="text-6xl"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            {event.icon}
                          </motion.div>
                          <div>
                            <h3 className="text-2xl mb-1">{event.name}</h3>
                            <div className="flex items-center gap-4 text-sm text-gray-400">
                              <span className="flex items-center gap-1">
                                <Trophy className="w-4 h-4" />
                                {event.prize}
                              </span>
                              <span className="flex items-center gap-1">
                                <UsersIcon className="w-4 h-4" />
                                {event.participants}/{event.maxParticipants}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                Ends in {event.endsIn}
                              </span>
                            </div>
                          </div>
                        </div>
                        <motion.button
                          onClick={() => onNavigate(`eventdetails-${event.id}`)}
                          className="bg-white text-black px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          View Details
                        </motion.button>
                      </div>
                      <div className="mt-4">
                        <div className="bg-gray-800 rounded-full h-2 overflow-hidden">
                          <motion.div 
                            className="bg-gradient-to-r from-green-500 to-emerald-500 h-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${(event.participants / event.maxParticipants) * 100}%` }}
                            transition={{ duration: 1, delay: idx * 0.2 }}
                          ></motion.div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Upcoming Events */}
            {selectedTab === 'upcoming' && (
              <div className="grid grid-cols-2 gap-6">
                {upcomingEvents.map((event, idx) => (
                  <motion.div
                    key={event.id}
                    className="bg-[#1a1a1f] rounded-xl p-6 border border-gray-800 hover:border-blue-600 transition-colors"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)" }}
                  >
                    <motion.div 
                      className="text-6xl text-center mb-4"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      {event.icon}
                    </motion.div>
                    <div className="text-xs bg-blue-600 px-2 py-1 rounded inline-block mb-2">{event.type}</div>
                    <h3 className="text-xl mb-3">{event.name}</h3>
                    <div className="space-y-2 text-sm text-gray-400 mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {event.date}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {event.time}
                      </div>
                      <div className="flex items-center gap-2">
                        <Trophy className="w-4 h-4 text-yellow-500" />
                        <span className="text-yellow-400">{event.prize} Prize Pool</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <UsersIcon className="w-4 h-4" />
                        {event.participants} spots available
                      </div>
                    </div>
                    <motion.button
                      className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 py-3 rounded-lg"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Register Now
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Daily Challenges */}
            {selectedTab === 'daily' && (
              <div className="space-y-4">
                {dailyChallenges.map((challenge, idx) => (
                  <motion.div
                    key={challenge.id}
                    className="bg-[#1a1a1f] rounded-xl p-6 border border-gray-800"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ x: 10 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <motion.div 
                          className="text-4xl"
                          whileHover={{ scale: 1.3, rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          {challenge.icon}
                        </motion.div>
                        <div className="flex-1">
                          <h3 className="text-lg mb-2">{challenge.challenge}</h3>
                          <div className="flex items-center gap-4">
                            <div className="flex-1">
                              <div className="flex items-center justify-between text-xs mb-1">
                                <span className="text-gray-400">Progress</span>
                                <span>{challenge.progress}/{challenge.total}</span>
                              </div>
                              <div className="bg-gray-800 rounded-full h-2 overflow-hidden">
                                <motion.div 
                                  className="bg-gradient-to-r from-green-500 to-emerald-500 h-full"
                                  initial={{ width: 0 }}
                                  animate={{ width: `${(challenge.progress / challenge.total) * 100}%` }}
                                  transition={{ duration: 1, delay: idx * 0.1 }}
                                ></motion.div>
                              </div>
                            </div>
                            <div className="text-yellow-400 flex items-center gap-1">
                              <Star className="w-4 h-4" />
                              {challenge.reward}
                            </div>
                          </div>
                        </div>
                      </div>
                      {challenge.progress >= challenge.total ? (
                        <motion.button
                          className="bg-green-600 px-6 py-2 rounded-lg"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Claim
                        </motion.button>
                      ) : (
                        <button className="bg-gray-700 px-6 py-2 rounded-lg text-gray-400 cursor-not-allowed">
                          In Progress
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
