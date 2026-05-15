import { Menu, Search, Settings, Home, Users, Trophy, Gift, Sparkles, ShoppingCart, Crown, Zap, Play, Plus, Target, Bell, MessageCircle, Wallet } from 'lucide-react';
import logo from '../../assets/logo.svg';

import { motion } from 'motion/react';

interface TournamentArenaProps {
  onBack: () => void;
  onOpenSettings?: () => void;
  onOpenProfile?: () => void;
  onViewTournament: (id: string) => void;
  onNavigate?: (page: string) => void;
}

const featuredTournaments = [
  {
    id: '1',
    title: 'Apex Legends World Championship',
    prizePool: '$500,000 Prize Pool',
    players: '256 Players',
    status: 'Live',
    color: 'bg-red-600'
  },
  {
    id: '2',
    title: 'Valorant Champions Cup',
    prizePool: '$250,000 Prize Pool',
    players: '128 Players',
    status: 'Ongoing',
    color: 'bg-green-600'
  },
  {
    id: '3',
    title: 'Space Strategy Masters',
    prizePool: '$100,000 Prize Pool',
    players: '64 Players',
    status: 'Starting Soon',
    color: 'bg-blue-600'
  }
];

export function TournamentArena({ onBack, onOpenSettings, onOpenProfile, onViewTournament, onNavigate }: TournamentArenaProps) {
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

        {/* Tournament Arena Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
            {/* Hero Section */}
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-center gap-4 mb-4">
                <motion.div
                  animate={{ 
                    rotate: [0, -10, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <Trophy className="w-12 h-12 text-yellow-500" />
                </motion.div>
                <motion.h1 
                  className="text-5xl"
                  animate={{
                    textShadow: [
                      "0 0 20px rgba(234, 179, 8, 0.3)",
                      "0 0 40px rgba(234, 179, 8, 0.6)",
                      "0 0 20px rgba(234, 179, 8, 0.3)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Tournament Arena
                </motion.h1>
                <motion.div
                  animate={{ 
                    rotate: [0, 10, -10, 10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <Trophy className="w-12 h-12 text-yellow-500" />
                </motion.div>
              </div>
              <motion.p 
                className="text-gray-400 max-w-3xl mx-auto mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Experience the thrill of elite competitive gaming platform. Join tournaments, create gameplay events, and watch your favorite teams in our carefully curated competitive scene. Tour Arcade community.
              </motion.p>
              <motion.div 
                className="flex items-center justify-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <motion.button 
                  onClick={() => {
                    // Scroll to featured tournaments section
                    document.getElementById('featured-tournaments')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-3 rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
                  whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(168, 85, 247, 0.5)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Trophy className="w-5 h-5" />
                  Browse Tournaments
                </motion.button>
                <motion.button 
                  onClick={() => {
                    // Navigate to the first live tournament or show live tournaments
                    const liveTournament = featuredTournaments.find(t => t.status === 'Live');
                    if (liveTournament) {
                      onViewTournament(liveTournament.id);
                    }
                  }}
                  className="bg-white text-black px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Play className="w-5 h-5" />
                  Watch Live
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Action Cards */}
            <div className="grid grid-cols-3 gap-6 mb-12">
              {/* Browse Tournaments */}
              <motion.div 
                className="bg-gradient-to-br from-purple-900/50 to-purple-950/50 border border-purple-700 rounded-xl p-8 text-center hover:border-purple-500 transition-colors cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -10,
                  boxShadow: "0 20px 40px rgba(168, 85, 247, 0.3)"
                }}
              >
                <motion.div 
                  className="w-16 h-16 mx-auto mb-4 bg-purple-600 rounded-full flex items-center justify-center"
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.6 }}
                >
                  <Trophy className="w-8 h-8" />
                </motion.div>
                <h3 className="text-xl mb-2">Browse Tournaments</h3>
                <p className="text-sm text-gray-400">Discover upcoming and ongoing tournaments across all your favorite games.</p>
              </motion.div>

              {/* Live Tournaments */}
              <motion.div 
                className="bg-gradient-to-br from-red-900/50 to-red-950/50 border border-red-700 rounded-xl p-8 text-center hover:border-red-500 transition-colors cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -10,
                  boxShadow: "0 20px 40px rgba(220, 38, 38, 0.3)"
                }}
              >
                <motion.div 
                  className="w-16 h-16 mx-auto mb-4 bg-red-600 rounded-full flex items-center justify-center"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Play className="w-8 h-8" />
                </motion.div>
                <h3 className="text-xl mb-2">Live Tournaments</h3>
                <p className="text-sm text-gray-400">Watch live action with real-time match updates, commentary, and leaderboards.</p>
              </motion.div>

              {/* Tournament Brackets */}
              <motion.div 
                className="bg-gradient-to-br from-blue-900/50 to-blue-950/50 border border-blue-700 rounded-xl p-8 text-center hover:border-blue-500 transition-colors cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -10,
                  boxShadow: "0 20px 40px rgba(37, 99, 235, 0.3)"
                }}
              >
                <motion.div 
                  className="w-16 h-16 mx-auto mb-4 bg-blue-600 rounded-full flex items-center justify-center"
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.6 }}
                >
                  <Target className="w-8 h-8" />
                </motion.div>
                <h3 className="text-xl mb-2">Tournament Brackets</h3>
                <p className="text-sm text-gray-400">Track live tournament progress with interactive tournament brackets and match results.</p>
              </motion.div>
            </div>

            {/* Create Tournament Card */}
            <motion.div 
              className="bg-gradient-to-br from-green-900/50 to-green-950/50 border border-green-700 rounded-xl p-8 mb-12 hover:border-green-500 transition-colors"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, boxShadow: "0 20px 50px rgba(34, 197, 94, 0.3)" }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <motion.div 
                    className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center"
                    whileHover={{ rotate: 90, scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Plus className="w-10 h-10" />
                  </motion.div>
                  <div>
                    <h3 className="text-2xl mb-2">Create Tournament</h3>
                    <p className="text-gray-400">Organize your own TourArcade tournament or customization bracket</p>
                  </div>
                </div>
                <motion.button 
                  className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Create Now
                </motion.button>
              </div>
            </motion.div>

            {/* Live Tournament Statistics */}
            <div className="bg-[#1a1a1f] rounded-xl p-8 mb-12">
              <h2 className="text-2xl mb-6">Live Tournament Statistics</h2>
              <div className="grid grid-cols-6 gap-6">
                <div className="text-center">
                  <div className="text-3xl text-blue-400 mb-2">2.1M+</div>
                  <div className="text-sm text-gray-400">Total Players</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl text-green-400 mb-2">$4.2M+</div>
                  <div className="text-sm text-gray-400">Prize Pool</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl text-yellow-400 mb-2">847</div>
                  <div className="text-sm text-gray-400">Active Tournaments</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl text-red-400 mb-2">23</div>
                  <div className="text-sm text-gray-400">Tournament Live</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl text-orange-400 mb-2">156K</div>
                  <div className="text-sm text-gray-400">Online Right Now</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl text-purple-400 mb-2">89%</div>
                  <div className="text-sm text-gray-400">Player Return Rate</div>
                </div>
              </div>
            </div>

            {/* Featured Tournaments */}
            <div className="mb-12" id="featured-tournaments">
              <div className="flex items-center gap-2 mb-6">
                <Crown className="w-6 h-6 text-yellow-500" />
                <h2 className="text-2xl">Featured Tournaments</h2>
              </div>
              <div className="space-y-4">
                {featuredTournaments.map((tournament, idx) => (
                  <motion.div 
                    key={tournament.id}
                    className="bg-[#1a1a1f] rounded-xl p-6 flex items-center justify-between hover:bg-[#2a2a2f] transition-colors cursor-pointer"
                    onClick={() => onViewTournament(tournament.id)}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ 
                      x: 10, 
                      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)"
                    }}
                  >
                    <div>
                      <h3 className="text-xl mb-2">{tournament.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span>{tournament.prizePool}</span>
                        <span>•</span>
                        <span>{tournament.players}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <motion.span 
                        className={`${tournament.color} px-4 py-2 rounded-lg text-sm`}
                        animate={tournament.status === 'Live' ? {
                          boxShadow: [
                            "0 0 0px rgba(220, 38, 38, 0)",
                            "0 0 20px rgba(220, 38, 38, 0.6)",
                            "0 0 0px rgba(220, 38, 38, 0)"
                          ]
                        } : {}}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        {tournament.status}
                      </motion.span>
                      <motion.button 
                        className="text-gray-400 hover:text-white transition-colors"
                        whileHover={{ x: 5 }}
                      >
                        →
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
              <motion.button 
                className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-lg hover:opacity-90 transition-opacity"
                whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(168, 85, 247, 0.5)" }}
                whileTap={{ scale: 0.98 }}
              >
                View All Tournaments
              </motion.button>
            </div>

            {/* Tournament Management */}
            <div className="bg-[#1a1a1f] rounded-xl p-8">
              <div className="flex items-center gap-2 mb-6">
                <Crown className="w-6 h-6 text-yellow-500" />
                <h2 className="text-2xl">Tournament Management</h2>
              </div>
              <p className="text-gray-400 mb-6">
                Take control of your gaming community. Create, manage, and organize tournaments for your community using our comprehensive tournament management system.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => onNavigate?.('createtournament')}
                  className="bg-[#2a2a32] text-white px-6 py-3 rounded-lg hover:bg-[#3a3a42] transition-colors"
                >
                  Create Tournament
                </button>
                <button className="bg-[#2a2a32] text-white px-6 py-3 rounded-lg hover:bg-[#3a3a42] transition-colors">
                  My Tournaments
                </button>
              </div>
            </div>

            {/* Footer */}
            <footer className="mt-12 pt-8 border-t border-gray-800">
              <div className="grid grid-cols-4 gap-8 mb-8">
                <div>
                  <h3 className="mb-4">TourArcade</h3>
                  <p className="text-sm text-gray-400">The ultimate competitive gaming platform.</p>
                </div>
                <div>
                  <h3 className="mb-4">Tournaments</h3>
                  <div className="space-y-2 text-sm text-gray-400">
                    <div>Browse</div>
                    <div>Featured</div>
                    <div>Live</div>
                  </div>
                </div>
                <div>
                  <h3 className="mb-4">Support</h3>
                  <div className="space-y-2 text-sm text-gray-400">
                    <div>Help Center</div>
                    <div>Rules</div>
                    <div>Contact Us</div>
                  </div>
                </div>
                <div>
                  <h3 className="mb-4">Legal</h3>
                  <div className="space-y-2 text-sm text-gray-400">
                    <div>Privacy</div>
                    <div>Terms</div>
                    <div>Cookies</div>
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