import { Menu, Search, Settings, Home, Users, Trophy, Gift, Sparkles, ShoppingCart, Crown, Zap, ArrowLeft, Bell, MessageCircle, Wallet } from 'lucide-react';
import logo from '../../assets/logo.svg';

import { motion } from 'motion/react';

interface TournamentBracketProps {
  onBack: () => void;
  onOpenSettings?: () => void;
  onOpenProfile?: () => void;
  onNavigate?: (page: string) => void;
}

const quarterFinals = [
  // Match 1
  [
    { name: 'Cyber-Ninjas_Pro', score: '0', seed: '1', winner: false },
    { name: 'Illuminators', score: '2', seed: '8', winner: true }
  ],
  // Match 2
  [
    { name: 'Humanistic', score: '1', seed: '4', winner: false },
    { name: 'Electro_breaker', score: '0', seed: '5', winner: false }
  ],
  // Match 3
  [
    { name: 'NeonSting', score: '0', seed: '3', winner: false },
    { name: 'YouthCenter', score: '2', seed: '6', winner: true }
  ],
  // Match 4
  [
    { name: 'TechnoNinja', score: '2', seed: '2', winner: true },
    { name: 'GalacyWarrior', score: '1', seed: '7', winner: false }
  ]
];

const semiFinals = [
  // Match 1
  [
    { name: 'Cyber-Ninjas_Pro', score: '', seed: '', winner: false },
    { name: 'Neon.viper', score: '', seed: '', winner: true }
  ],
  // Match 2
  [
    { name: 'Quantum Gamers', score: '', seed: '', winner: false },
    { name: 'TBD 🔥', score: '', seed: '', winner: true }
  ]
];

const finals = [
  { name: 'TBD', score: '', winner: false },
  { name: 'TBD 🔥', score: '', winner: true }
];

export function TournamentBracket({ onBack, onOpenSettings, onOpenProfile, onNavigate }: TournamentBracketProps) {
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

        {/* Tournament Tabs */}
        <div className="bg-[#0f0f13] border-b border-gray-800 px-8 py-4">
          <div className="flex items-center gap-6">
            <button className="text-gray-400 hover:text-white pb-2">Overview</button>
            <button className="text-gray-400 hover:text-white pb-2">Live</button>
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-1 rounded-full text-sm">Bracket</button>
            <button className="text-gray-400 hover:text-white pb-2">Players</button>
            <button className="text-gray-400 hover:text-white pb-2">Matches</button>
          </div>
        </div>

        {/* Bracket Content */}
        <div className="flex-1 overflow-y-auto bg-black p-8">
          <div className="max-w-7xl mx-auto">
            {/* Tournament Title */}
            <motion.div 
              className="flex items-center justify-between mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <motion.div
                    animate={{ 
                      rotate: [0, 15, -15, 0],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                  >
                    <Trophy className="w-6 h-6 text-yellow-500" />
                  </motion.div>
                  <h1 className="text-3xl">Cyber Strike Weekly Championship - Bracket</h1>
                  <motion.span 
                    className="bg-yellow-600 px-3 py-1 rounded text-sm"
                    animate={{
                      boxShadow: [
                        "0 0 0px rgba(234, 179, 8, 0)",
                        "0 0 20px rgba(234, 179, 8, 0.6)",
                        "0 0 0px rgba(234, 179, 8, 0)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    Prize $10,000
                  </motion.span>
                </div>
                <div className="text-gray-400">Single Elimination • Best of 3</div>
              </div>
              <motion.button 
                onClick={onBack}
                className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
                whileHover={{ x: -5 }}
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </motion.button>
            </motion.div>

            {/* Bracket Visualization */}
            <div className="grid grid-cols-4 gap-8 mb-12">
              {/* Quarter Finals */}
              <div>
                <h3 className="text-xl mb-6 text-center">Quarter Finals</h3>
                <div className="space-y-12">
                  {quarterFinals.map((match, idx) => (
                    <motion.div 
                      key={idx} 
                      className="relative"
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <div className="text-sm text-gray-400 mb-2">Match {idx + 1}</div>
                      {match.map((team, teamIdx) => (
                        <motion.div 
                          key={teamIdx}
                          className={`flex items-center justify-between p-3 mb-1 rounded ${
                            team.winner ? 'bg-green-600/20 border border-green-600' : 'bg-[#1a1a1f] border border-gray-800'
                          }`}
                          whileHover={{ 
                            x: 5, 
                            boxShadow: team.winner ? "0 0 20px rgba(34, 197, 94, 0.5)" : "0 0 10px rgba(75, 85, 99, 0.3)"
                          }}
                        >
                          <div className="flex items-center gap-2">
                            <motion.div 
                              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                                team.winner ? 'bg-green-600' : 'bg-gray-700'
                              }`}
                              animate={team.winner ? {
                                boxShadow: [
                                  "0 0 0px rgba(34, 197, 94, 0)",
                                  "0 0 15px rgba(34, 197, 94, 0.8)",
                                  "0 0 0px rgba(34, 197, 94, 0)"
                                ]
                              } : {}}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              {team.seed}
                            </motion.div>
                            <span className="text-sm">{team.name}</span>
                          </div>
                          <span className={team.winner ? 'text-green-400' : 'text-gray-400'}>{team.score}</span>
                        </motion.div>
                      ))}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Semi Finals */}
              <div className="mt-24">
                <h3 className="text-xl mb-6 text-center">Semi Finals</h3>
                <div className="space-y-32">
                  {semiFinals.map((match, idx) => (
                    <div key={idx} className="relative">
                      <div className="text-sm text-gray-400 mb-2">Match {idx + 1}</div>
                      {match.map((team, teamIdx) => (
                        <div 
                          key={teamIdx}
                          className={`flex items-center justify-between p-3 mb-1 rounded ${
                            team.winner ? 'bg-green-600/20 border border-green-600' : 'bg-[#1a1a1f] border border-gray-800'
                          }`}
                        >
                          <span className="text-sm">{team.name}</span>
                          <span className={team.winner ? 'text-green-400' : 'text-gray-400'}>{team.score}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* Finals */}
              <div className="mt-64">
                <h3 className="text-xl mb-6 text-center">Finals</h3>
                <div className="relative">
                  <div className="text-sm text-gray-400 mb-2">Match 1</div>
                  {finals.map((team, teamIdx) => (
                    <div 
                      key={teamIdx}
                      className={`flex items-center justify-between p-3 mb-1 rounded ${
                        team.winner ? 'bg-green-600/20 border border-green-600' : 'bg-[#1a1a1f] border border-gray-800'
                      }`}
                    >
                      <span className="text-sm">{team.name}</span>
                      <span className={team.winner ? 'text-green-400' : 'text-gray-400'}>{team.score}</span>
                    </div>
                  ))}
                  <div className="text-xs text-gray-500 mt-2 text-center">Winner TBD</div>
                </div>
              </div>

              {/* Champion */}
              <div className="mt-72">
                <h3 className="text-xl mb-6 text-center">Champion</h3>
                <motion.div 
                  className="bg-gradient-to-br from-yellow-600 to-yellow-700 rounded-xl p-6 text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    boxShadow: [
                      "0 0 0px rgba(234, 179, 8, 0)",
                      "0 0 40px rgba(234, 179, 8, 0.6)",
                      "0 0 0px rgba(234, 179, 8, 0)"
                    ]
                  }}
                  transition={{
                    scale: { duration: 0.5 },
                    boxShadow: { duration: 3, repeat: Infinity }
                  }}
                >
                  <motion.div
                    animate={{ 
                      rotate: [0, -10, 10, -10, 0],
                      y: [0, -10, 0]
                    }}
                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
                  >
                    <Crown className="w-12 h-12 mx-auto mb-3 text-yellow-200" />
                  </motion.div>
                  <div className="text-2xl mb-2">TBD</div>
                  <div className="text-sm text-yellow-100">Prize: $10,000</div>
                </motion.div>
              </div>
            </div>

            {/* Tournament Statistics */}
            <div className="bg-[#1a1a1f] rounded-xl p-8">
              <h2 className="text-2xl mb-6">Tournament Statistics</h2>
              <div className="grid grid-cols-4 gap-6">
                <div>
                  <div className="text-sm text-gray-400 mb-1">Total Matches</div>
                  <div className="text-2xl">7</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Teams Remaining</div>
                  <div className="text-2xl">4</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Total Prize Pool</div>
                  <div className="text-2xl text-green-400">$10,000</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Avg. Match Time</div>
                  <div className="text-2xl">32m</div>
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
                  <h3 className="mb-4">Tournaments</h3>
                  <div className="space-y-2 text-sm text-gray-400">
                    <div>Privacy</div>
                  </div>
                </div>
                <div>
                  <h3 className="mb-4">Support</h3>
                  <div className="space-y-2 text-sm text-gray-400">
                    <div>Ways to play</div>
                    <div>Legal notices</div>
                  </div>
                </div>
                <div>
                  <h3 className="mb-4">Company</h3>
                  <div className="space-y-2 text-sm text-gray-400">
                    <div>About us</div>
                    <div>Contact Us</div>
                  </div>
                </div>
              </div>
              <div className="text-xs text-gray-600 text-center">
                © 2025 Tour Arcade Gaming Partners. All rights reserved.
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}