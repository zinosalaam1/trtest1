import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Search, Settings, Home, Users, Trophy, Gift, Sparkles, ShoppingCart, Crown, Zap, Bell, MessageCircle, Wallet, Play, Clock, Eye, TrendingUp } from 'lucide-react';
import logo from '../../assets/trbg.png';

import { motion } from 'motion/react';

interface LiveMatchesHubProps {
  onBack: () => void;
  onOpenSettings?: () => void;
  onOpenProfile?: () => void;
  onNavigate?: (page: string) => void;
}

const liveMatches = [
  {
    id: '1',
    game: 'PAC-MAN',
    emoji: '👻',
    player1: { name: localStorage.getItem('ta_username') || 'You', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=speedrunner' },
    player2: { name: 'SpeedRunner99', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=player7' },
    score1: 12450,
    score2: 11320,
    time: '12:34',
    viewers: 2540,
    prizePool: '$500',
    status: 'Live'
  },
  {
    id: '2',
    game: 'Street Fighter',
    emoji: '🥊',
    player1: { name: 'FightMaster', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=arcadeking' },
    player2: { name: 'ComboKing', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=player8' },
    score1: 2,
    score2: 1,
    time: '8:45',
    viewers: 4230,
    prizePool: '$750',
    status: 'Live'
  },
  {
    id: '3',
    game: 'SEGA Rally',
    emoji: '🏎️',
    player1: { name: 'RacerX', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=skillmaster' },
    player2: { name: 'TurboNinja', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=player9' },
    score1: 145.23,
    score2: 147.89,
    time: '5:12',
    viewers: 1840,
    prizePool: '$400',
    status: 'Live'
  }
];

const upcomingMatches = [
  {
    id: '4',
    game: 'Metal Slug 5',
    emoji: '💣',
    player1: { name: 'BulletStorm', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=player10' },
    player2: { name: 'PixelWarrior', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=player11' },
    startTime: 'In 15 min',
    prizePool: '$600',
    status: 'Starting Soon'
  },
  {
    id: '5',
    game: 'NBA Jam',
    emoji: '🏀',
    player1: { name: 'DunkMaster', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=player12' },
    player2: { name: 'AlleyOop', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=player13' },
    startTime: 'In 45 min',
    prizePool: '$550',
    status: 'Scheduled'
  },
  {
    id: '6',
    game: 'Tekken 5',
    emoji: '🥋',
    player1: { name: 'KazuyaMain', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=player14' },
    player2: { name: 'JinMaster', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=player15' },
    startTime: 'In 1 hr',
    prizePool: '$800',
    status: 'Scheduled'
  }
];

const completedMatches = [
  {
    id: '7',
    game: 'Mario Bros',
    emoji: '🍄',
    player1: { name: 'JumpKing', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=player16' },
    player2: { name: 'CoinCollector', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=player17' },
    winner: 'JumpKing',
    score1: 45230,
    score2: 43100,
    prizePool: '$700',
    status: 'Completed'
  },
  {
    id: '8',
    game: 'Contra',
    emoji: '🔫',
    player1: { name: 'SniperElite', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=player18' },
    player2: { name: 'ActionHero', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=player19' },
    winner: 'ActionHero',
    score1: 23400,
    score2: 28900,
    prizePool: '$650',
    status: 'Completed'
  }
];

export function LiveMatchesHub({ onBack, onOpenSettings, onOpenProfile, onNavigate }: LiveMatchesHubProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'live' | 'upcoming' | 'completed'>('live');

  return (
    <div className="min-h-screen bg-black text-white flex flex-col md:flex-row">
      {/* Left Sidebar */}
      <div className="hidden md:flex w-16 bg-[#0f0f13] flex-col items-center py-6 gap-6 border-r border-gray-800">
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
        <button className="w-10 h-10 rounded-lg bg-purple-600 flex items-center justify-center hover:bg-purple-700 transition-colors">
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
        <header className="bg-[#0f0f13] border-b border-gray-800 px-4 md:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4 md:gap-6">
            <button className="md:hidden text-gray-400 hover:text-white" onClick={onBack}>
              <Menu className="w-6 h-6" />
            </button>
            <img src={logo} alt="Tour Arcade" className="h-6 md:h-8" />
          </div>

          {/* Search Bar */}
          <div className="hidden md:block flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search matches..."
                className="w-full bg-[#2a2a32] border-0 rounded-full pl-12 pr-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
          </div>

          {/* User Icons */}
          <div className="flex items-center gap-2 md:gap-3">
            <motion.button
              onClick={() => onNavigate?.('notifications')}
              className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-600 flex items-center justify-center hover:bg-gray-500 transition-colors relative"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Bell className="w-4 h-4 md:w-5 md:h-5" />
              <span className="absolute -top-1 -right-1 bg-red-600 w-4 h-4 md:w-5 md:h-5 rounded-full text-xs flex items-center justify-center">3</span>
            </motion.button>
            <motion.button
              onClick={() => onNavigate?.('messages')}
              className="hidden md:flex w-10 h-10 rounded-full bg-gray-600 items-center justify-center hover:bg-gray-500 transition-colors relative"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageCircle className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-blue-600 w-5 h-5 rounded-full text-xs flex items-center justify-center">5</span>
            </motion.button>
            <button
              onClick={onOpenSettings}
              className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-600 flex items-center justify-center hover:bg-gray-500 transition-colors"
            >
              <Settings className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            <button
              onClick={onOpenProfile}
              className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-red-600 flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer"
            >
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=user"
                alt="User"
                className="w-full h-full rounded-full object-cover"
              />
            </button>
          </div>
        </header>

        {/* Page Header */}
        <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border-b border-gray-800 px-4 md:px-8 py-6 md:py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          >
            <div>
              <div className="flex items-center gap-3 mb-2">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Play className="w-6 h-6 md:w-8 md:h-8 text-red-500" />
                </motion.div>
                <h1 className="text-2xl md:text-4xl font-bold">Live Matches</h1>
              </div>
              <p className="text-sm md:text-base text-gray-400">Watch top players compete in real-time</p>
            </div>
            <div className="flex items-center gap-4 text-sm md:text-base">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 md:w-5 md:h-5 text-purple-400" />
                <span className="text-gray-400">8,610 watching</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-green-400" />
                <span className="text-gray-400">{liveMatches.length} live now</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="bg-[#0f0f13] border-b border-gray-800 px-4 md:px-8">
          <div className="flex gap-8">
            {[
              { key: 'live' as const, label: 'Live Matches', count: liveMatches.length },
              { key: 'upcoming' as const, label: 'Upcoming', count: upcomingMatches.length },
              { key: 'completed' as const, label: 'Completed', count: completedMatches.length }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`pb-4 pt-4 relative transition-colors ${
                  activeTab === tab.key ? 'text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                <span className="text-sm md:text-base">{tab.label}</span>
                <span className="ml-2 text-xs bg-gray-700 px-2 py-1 rounded">{tab.count}</span>
                {activeTab === tab.key && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Matches Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            {activeTab === 'live' && (
              <div className="grid grid-cols-1 gap-4 md:gap-6">
                {liveMatches.map((match, idx) => (
                  <motion.div
                    key={match.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-[#1a1a1f] rounded-xl p-4 md:p-6 border-2 border-red-900/50 hover:border-red-600 transition-all cursor-pointer"
                    onClick={() => navigate(`/tournaments/match/${match.id}`)}
                    whileHover={{ scale: 1.02, y: -5 }}
                  >
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl md:text-4xl">{match.emoji}</span>
                        <div>
                          <h3 className="text-lg md:text-xl font-bold">{match.game}</h3>
                          <div className="flex items-center gap-2 text-xs md:text-sm text-gray-400">
                            <motion.div
                              className="w-2 h-2 bg-red-500 rounded-full"
                              animate={{ opacity: [1, 0.3, 1] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            />
                            <span className="text-red-400 font-semibold">LIVE</span>
                            <span>•</span>
                            <Clock className="w-3 h-3 md:w-4 md:h-4" />
                            <span>{match.time}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-xs md:text-sm">
                        <div className="flex items-center gap-2">
                          <Eye className="w-4 h-4 text-purple-400" />
                          <span className="text-gray-400">{match.viewers.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Trophy className="w-4 h-4 text-yellow-400" />
                          <span className="text-yellow-400 font-semibold">{match.prizePool}</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 items-center">
                      <div className="flex items-center gap-3">
                        <img
                          src={match.player1.avatar}
                          alt={match.player1.name}
                          className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border-2 border-purple-600"
                        />
                        <div>
                          <div className="text-sm md:text-base font-semibold">{match.player1.name}</div>
                          <div className="text-xl md:text-2xl font-bold text-purple-400">{match.score1.toLocaleString()}</div>
                        </div>
                      </div>

                      <div className="text-center">
                        <div className="text-xl md:text-2xl font-bold text-gray-600">VS</div>
                      </div>

                      <div className="flex items-center gap-3 justify-end">
                        <div className="text-right">
                          <div className="text-sm md:text-base font-semibold">{match.player2.name}</div>
                          <div className="text-xl md:text-2xl font-bold text-pink-400">{match.score2.toLocaleString()}</div>
                        </div>
                        <img
                          src={match.player2.avatar}
                          alt={match.player2.name}
                          className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border-2 border-pink-600"
                        />
                      </div>
                    </div>

                    <motion.button
                      className="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-600 py-3 rounded-lg flex items-center justify-center gap-2 font-semibold"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Play className="w-5 h-5" />
                      Spectate Match
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === 'upcoming' && (
              <div className="grid grid-cols-1 gap-4 md:gap-6">
                {upcomingMatches.map((match, idx) => (
                  <motion.div
                    key={match.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-[#1a1a1f] rounded-xl p-4 md:p-6 border border-gray-800 hover:border-purple-600 transition-all"
                  >
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl md:text-4xl">{match.emoji}</span>
                        <div>
                          <h3 className="text-lg md:text-xl font-bold">{match.game}</h3>
                          <div className="flex items-center gap-2 text-xs md:text-sm text-gray-400">
                            <Clock className="w-3 h-3 md:w-4 md:h-4" />
                            <span>{match.startTime}</span>
                            <span>•</span>
                            <span className="text-blue-400">{match.status}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Trophy className="w-4 h-4 text-yellow-400" />
                        <span className="text-yellow-400 font-semibold">{match.prizePool}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 items-center">
                      <div className="flex items-center gap-3">
                        <img
                          src={match.player1.avatar}
                          alt={match.player1.name}
                          className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border-2 border-purple-600"
                        />
                        <div className="text-sm md:text-base font-semibold">{match.player1.name}</div>
                      </div>

                      <div className="text-center">
                        <div className="text-xl md:text-2xl font-bold text-gray-600">VS</div>
                      </div>

                      <div className="flex items-center gap-3 justify-end">
                        <div className="text-sm md:text-base font-semibold">{match.player2.name}</div>
                        <img
                          src={match.player2.avatar}
                          alt={match.player2.name}
                          className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border-2 border-pink-600"
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === 'completed' && (
              <div className="grid grid-cols-1 gap-4 md:gap-6">
                {completedMatches.map((match, idx) => (
                  <motion.div
                    key={match.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-[#1a1a1f] rounded-xl p-4 md:p-6 border border-gray-800 opacity-75"
                  >
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl md:text-4xl">{match.emoji}</span>
                        <div>
                          <h3 className="text-lg md:text-xl font-bold">{match.game}</h3>
                          <div className="text-xs md:text-sm text-green-400">{match.winner} Won!</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Trophy className="w-4 h-4 text-yellow-400" />
                        <span className="text-yellow-400 font-semibold">{match.prizePool}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 items-center">
                      <div className="flex items-center gap-3">
                        <img
                          src={match.player1.avatar}
                          alt={match.player1.name}
                          className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border-2 border-purple-600"
                        />
                        <div>
                          <div className="text-sm md:text-base font-semibold flex items-center gap-2">
                            {match.player1.name}
                            {match.winner === match.player1.name && <Crown className="w-4 h-4 text-yellow-400" />}
                          </div>
                          <div className="text-lg md:text-xl font-bold text-gray-400">{match.score1.toLocaleString()}</div>
                        </div>
                      </div>

                      <div className="text-center">
                        <div className="text-xl md:text-2xl font-bold text-gray-600">VS</div>
                      </div>

                      <div className="flex items-center gap-3 justify-end">
                        <div className="text-right">
                          <div className="text-sm md:text-base font-semibold flex items-center gap-2 justify-end">
                            {match.winner === match.player2.name && <Crown className="w-4 h-4 text-yellow-400" />}
                            {match.player2.name}
                          </div>
                          <div className="text-lg md:text-xl font-bold text-gray-400">{match.score2.toLocaleString()}</div>
                        </div>
                        <img
                          src={match.player2.avatar}
                          alt={match.player2.name}
                          className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border-2 border-pink-600"
                        />
                      </div>
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
