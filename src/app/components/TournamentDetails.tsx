import { Menu, Search, Settings, Home, Users, Trophy, Gift, Sparkles, ShoppingCart, Crown, Zap, Play, Share, Send, Eye, Bell, MessageCircle, Wallet } from 'lucide-react';
import logo from '../../assets/logo.svg';

import { Input } from './ui/input';
import { useState } from 'react';
import { motion } from 'motion/react';

interface TournamentDetailsProps {
  tournamentId: string;
  onBack: () => void;
  onOpenSettings?: () => void;
  onOpenProfile?: () => void;
  onViewBracket: () => void;
  onNavigate?: (page: string) => void;
}

const participants = [
  { name: 'NeonStriker', rank: 'TG', kills: 42, deaths: 12, wins: 8, avatar: '🎮' },
  { name: 'VoidHunter', rank: 'TG', kills: 38, deaths: 18, wins: 7, avatar: '👾' }
];

const liveMatches = [
  { team1: 'Cyber Ninjas #2', score1: 13, team2: 'Neon Fire', score2: 16 },
  { team1: 'Tech Warriors', score1: 8, team2: 'Digital Samurai', score2: 12 }
];

export function TournamentDetails({ tournamentId, onBack, onOpenSettings, onOpenProfile, onViewBracket, onNavigate }: TournamentDetailsProps) {
  const [chatMessage, setChatMessage] = useState('');
  const [messages] = useState([
    { user: 'T1pwith4rmN#', message: 'neon ninjas is on fire team is so good', time: '2m ago' },
    { user: '@OWNkTHUN4e#Nnight', message: 'who the team', time: '3m ago' },
    { user: '@T', message: 'Thats #Nnight', time: '4m ago' }
  ]);

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

        {/* Tournament Details Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Tournament Header Tabs */}
          <div className="bg-[#0f0f13] border-b border-gray-800 px-8 py-4">
            <div className="flex items-center gap-6">
              <button className="text-white border-b-2 border-purple-600 pb-2">Home</button>
              <button className="text-gray-400 hover:text-white pb-2">Tournament Hub</button>
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-1 rounded-full text-sm">Bracket</button>
              <button className="text-gray-400 hover:text-white pb-2">Teams</button>
              <button className="text-gray-400 hover:text-white pb-2">Matches</button>
            </div>
          </div>

          <div className="p-8">
            <div className="max-w-7xl mx-auto">
              {/* Tournament Title */}
              <motion.div 
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <motion.div
                    animate={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
                  >
                    <Trophy className="w-6 h-6 text-yellow-500" />
                  </motion.div>
                  <h1 className="text-3xl">Cyber Strike Weekly Championship</h1>
                  <motion.span 
                    className="bg-red-600 px-3 py-1 rounded text-sm"
                    animate={{
                      boxShadow: [
                        "0 0 0px rgba(220, 38, 38, 0)",
                        "0 0 20px rgba(220, 38, 38, 0.8)",
                        "0 0 0px rgba(220, 38, 38, 0)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    LIVE
                  </motion.span>
                </div>
                <div className="text-gray-400">Prize: $14,000 • Ends in 3:30</div>
              </motion.div>

              <div className="grid grid-cols-3 gap-6">
                {/* Left Column */}
                <div className="col-span-2 space-y-6">
                  {/* Live Tournament Stream */}
                  <motion.div 
                    className="bg-[#1a1a1f] rounded-xl overflow-hidden"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="aspect-video bg-gradient-to-br from-purple-900/30 to-blue-900/30 flex items-center justify-center relative">
                      <div className="text-center">
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <Play className="w-16 h-16 text-white/50 mb-4 mx-auto" />
                        </motion.div>
                        <h3 className="text-xl mb-2">Live Tournament Stream</h3>
                        <p className="text-sm text-gray-400">Watch live action with real-time commentary</p>
                      </div>
                      <div className="absolute top-4 right-4 flex gap-2">
                        <motion.div 
                          className="bg-black/50 backdrop-blur-sm px-3 py-1 rounded flex items-center gap-2"
                          animate={{
                            boxShadow: [
                              "0 0 0px rgba(220, 38, 38, 0)",
                              "0 0 15px rgba(220, 38, 38, 0.6)",
                              "0 0 0px rgba(220, 38, 38, 0)"
                            ]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <motion.div 
                            className="w-2 h-2 bg-red-500 rounded-full"
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          ></motion.div>
                          <span className="text-sm">LIVE</span>
                        </motion.div>
                        <div className="bg-black/50 backdrop-blur-sm px-3 py-1 rounded flex items-center gap-2">
                          <Eye className="w-4 h-4" />
                          <span className="text-sm">2.4K</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 flex gap-2">
                      <div className="w-10 h-10 bg-gray-600 rounded"></div>
                      <div className="w-10 h-10 bg-gray-600 rounded"></div>
                      <div className="w-10 h-10 bg-gray-600 rounded"></div>
                    </div>
                  </motion.div>

                  {/* Live Matches */}
                  <div className="bg-[#1a1a1f] rounded-xl p-6">
                    <h3 className="text-xl mb-4">Live Matches</h3>
                    <div className="space-y-4">
                      {liveMatches.map((match, idx) => (
                        <div key={idx} className="bg-[#0f0f13] rounded-lg p-4">
                          <div className="grid grid-cols-3 gap-4 items-center">
                            <div className="text-right">
                              <div className="mb-1">{match.team1}</div>
                              <div className="text-sm text-gray-400">Round 1 • Best of 1</div>
                            </div>
                            <div className="flex items-center justify-center gap-4">
                              <div className="text-2xl">{match.score1}</div>
                              <div className="text-gray-500">:</div>
                              <div className="text-2xl">{match.score2}</div>
                            </div>
                            <div>
                              <div className="mb-1">{match.team2}</div>
                              <div className="text-sm text-gray-400">Round 1 • Best of 1</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Participants */}
                  <div className="bg-[#1a1a1f] rounded-xl p-6">
                    <h3 className="text-xl mb-4">Participants</h3>
                    <div className="space-y-4">
                      {participants.map((player, idx) => (
                        <div key={idx} className="bg-[#0f0f13] rounded-lg p-4">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center text-2xl">
                                {player.avatar}
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span>{player.name}</span>
                                  <span className="text-xs bg-gray-700 px-2 py-0.5 rounded">{player.rank}</span>
                                </div>
                              </div>
                            </div>
                            <div className="text-4xl text-gray-600">VS</div>
                            <div className="text-right">
                              <div className="text-gray-400">Opponent</div>
                              <div className="text-sm text-gray-500">TBD</div>
                            </div>
                          </div>
                          <div className="grid grid-cols-3 gap-4 text-center text-sm">
                            <div>
                              <div className="text-2xl mb-1">{player.kills}</div>
                              <div className="text-gray-400">Kills</div>
                            </div>
                            <div>
                              <div className="text-2xl mb-1">{player.deaths}</div>
                              <div className="text-gray-400">Deaths</div>
                            </div>
                            <div>
                              <div className="text-2xl mb-1">{player.wins}</div>
                              <div className="text-gray-400">Wins</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tournament Stats */}
                  <div className="bg-[#1a1a1f] rounded-xl p-6">
                    <h3 className="text-xl mb-4">Tournament Stats</h3>
                    <div className="grid grid-cols-3 gap-6">
                      <div>
                        <div className="text-sm text-gray-400 mb-1">Game Mode</div>
                        <div>Deathmatch</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400 mb-1">Total Prize</div>
                        <div className="text-green-400">$15,000</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400 mb-1">Entry Fee</div>
                        <div className="text-green-400">$15,000</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400 mb-1">Prize Pool</div>
                        <div>CyberNite Pro</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400 mb-1">Format</div>
                        <div>Single Elimination</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Live Chat */}
                  <div className="bg-[#1a1a1f] rounded-xl overflow-hidden">
                    <div className="p-4 border-b border-gray-800">
                      <h3 className="text-lg">Live Chat</h3>
                    </div>
                    <div className="h-96 p-4 space-y-3 overflow-y-auto">
                      {messages.map((msg, idx) => (
                        <div key={idx} className="text-sm">
                          <div className="text-purple-400">{msg.user}</div>
                          <div className="text-gray-300">{msg.message}</div>
                          <div className="text-xs text-gray-500">{msg.time}</div>
                        </div>
                      ))}
                    </div>
                    <div className="p-4 border-t border-gray-800">
                      <div className="flex gap-2">
                        <Input
                          value={chatMessage}
                          onChange={(e) => setChatMessage(e.target.value)}
                          placeholder="Type a message..."
                          className="flex-1 bg-[#0f0f13] border-0 text-white"
                        />
                        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                          <Send className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="bg-[#1a1a1f] rounded-xl p-6">
                    <h3 className="text-lg mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                      <button 
                        onClick={onViewBracket}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg hover:opacity-90 transition-opacity"
                      >
                        View Bracket
                      </button>
                      <button className="w-full bg-white text-black py-3 rounded-lg hover:bg-gray-100 transition-colors">
                        Join Tournament
                      </button>
                      <button className="w-full bg-[#2a2a32] text-white py-3 rounded-lg hover:bg-[#3a3a42] transition-colors flex items-center justify-center gap-2">
                        <Share className="w-4 h-4" />
                        Share Invite
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}