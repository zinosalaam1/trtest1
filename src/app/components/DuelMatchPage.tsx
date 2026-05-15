import { Menu, Settings, Home, Users, Trophy, Gift, Sparkles, ShoppingCart, Crown, Zap, Swords, Clock, DollarSign, User } from 'lucide-react';
import logo from '../../assets/logo.svg';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { showToast } from './ToastManager';

interface DuelMatchPageProps {
  onBack: () => void;
  onOpenSettings?: () => void;
  onOpenProfile?: () => void;
  onNavigate: (page: string) => void;
}

const availableGames = [
  { id: 1, name: 'Traffic Rider', image: 'https://placehold.co/400x200/1a0533/a855f7?text=Tour+Arcade', prize: 50 },
  { id: 2, name: 'Race Master', image: 'https://placehold.co/400x200/1a0533/a855f7?text=Tour+Arcade', prize: 75 },
  { id: 3, name: 'Cyber Hunter', image: 'https://placehold.co/400x200/1a0533/a855f7?text=Tour+Arcade', prize: 100 },
  { id: 4, name: 'GTA V', image: 'https://placehold.co/400x200/1a0533/a855f7?text=Tour+Arcade', prize: 150 },
];

export function DuelMatchPage({ onBack, onOpenSettings, onOpenProfile, onNavigate }: DuelMatchPageProps) {
  const [selectedGame, setSelectedGame] = useState<number | null>(null);
  const [searching, setSearching] = useState(false);
  const [matchFound, setMatchFound] = useState(false);
  const [countdown, setCountdown] = useState(5);

  const startSearch = () => {
    if (!selectedGame) {
      showToast({ type: 'error', title: 'Select a Game', message: 'Please select a game before searching' });
      return;
    }
    
    setSearching(true);
    showToast({ type: 'info', title: 'Searching', message: 'Finding an opponent...' });
    
    // Simulate finding a match
    setTimeout(() => {
      setSearching(false);
      setMatchFound(true);
      showToast({ type: 'success', title: 'Match Found!', message: 'Opponent found. Get ready!' });
      
      // Countdown
      const countdownInterval = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(countdownInterval);
            showToast({ type: 'success', title: 'Match Starting!', message: 'Good luck!' });
            setTimeout(() => onNavigate('gamelibrary'), 1000);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }, 3000);
  };

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
          className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-600 to-orange-600 flex items-center justify-center"
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
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=user"
                alt="User"
                className="w-full h-full rounded-full object-cover"
              />
            </button>
          </div>
        </header>

        {/* Duel Match Content */}
        <div className="flex-1 overflow-y-auto p-8 bg-gradient-to-b from-black via-red-950/10 to-black">
          <div className="max-w-6xl mx-auto">
            {/* Hero */}
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center justify-center gap-4 mb-4">
                <motion.div
                  animate={{ 
                    rotate: [0, -15, 15, -15, 0],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Swords className="w-16 h-16 text-red-500" />
                </motion.div>
                <h1 className="text-6xl">1v1 Duel</h1>
              </div>
              <p className="text-xl text-gray-400">Face off against a skilled opponent in an intense 1v1 battle!</p>
              <div className="flex items-center justify-center gap-8 mt-6 text-gray-400">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  <span>2 Players</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>5-10 min</span>
                </div>
                <div className="flex items-center gap-2 text-green-400">
                  <DollarSign className="w-5 h-5" />
                  <span>Win Cash Prizes</span>
                </div>
              </div>
            </motion.div>

            {/* Match Found Modal */}
            <AnimatePresence>
              {matchFound && (
                <motion.div 
                  className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div 
                    className="bg-gradient-to-br from-red-900 to-orange-900 rounded-2xl p-12 text-center max-w-2xl"
                    initial={{ scale: 0.8, y: 50 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.8, y: 50 }}
                  >
                    <motion.div
                      animate={{ scale: [1, 1.2, 1], rotate: [0, 360] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="inline-block mb-6"
                    >
                      <Swords className="w-24 h-24 text-white" />
                    </motion.div>
                    <h2 className="text-5xl mb-4">Match Found!</h2>
                    <p className="text-2xl text-gray-200 mb-8">Prepare for battle</p>
                    <motion.div
                      className="text-8xl font-bold"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                    >
                      {countdown}
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Game Selection */}
            {!searching && !matchFound && (
              <>
                <h2 className="text-3xl mb-6 text-center">Select Your Game</h2>
                <div className="grid grid-cols-2 gap-6 mb-8">
                  {availableGames.map((game, idx) => (
                    <motion.div
                      key={game.id}
                      className={`relative rounded-xl overflow-hidden cursor-pointer border-4 transition-all ${
                        selectedGame === game.id 
                          ? 'border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.6)]' 
                          : 'border-transparent hover:border-red-500/50'
                      }`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      whileHover={{ scale: 1.05, y: -10 }}
                      onClick={() => setSelectedGame(game.id)}
                    >
                      <img 
                        src={game.image}
                        alt={game.name}
                        className="w-full h-64 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-2xl mb-2">{game.name}</h3>
                        <div className="flex items-center gap-2 text-green-400">
                          <DollarSign className="w-5 h-5" />
                          <span className="text-xl">${game.prize} Prize Pool</span>
                        </div>
                      </div>
                      {selectedGame === game.id && (
                        <motion.div 
                          className="absolute top-4 right-4 bg-red-500 rounded-full p-2"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                        >
                          <Swords className="w-6 h-6" />
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Search Button */}
                <div className="text-center">
                  <motion.button
                    onClick={startSearch}
                    className="bg-gradient-to-r from-red-600 to-orange-600 px-12 py-6 rounded-xl text-2xl flex items-center gap-4 mx-auto"
                    whileHover={{ scale: 1.1, boxShadow: "0 0 40px rgba(239, 68, 68, 0.6)" }}
                    whileTap={{ scale: 0.95 }}
                    disabled={!selectedGame}
                  >
                    <Swords className="w-8 h-8" />
                    Find Opponent
                  </motion.button>
                </div>
              </>
            )}

            {/* Searching Animation */}
            {searching && !matchFound && (
              <motion.div 
                className="text-center py-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="inline-block mb-6"
                >
                  <Swords className="w-24 h-24 text-red-500" />
                </motion.div>
                <h2 className="text-4xl mb-4">Searching for Opponent...</h2>
                <motion.p 
                  className="text-xl text-gray-400"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  Finding the perfect match for you
                </motion.p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
