import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Settings, Trophy, Gamepad2, Clock, Sparkles, Menu, Bell, MessageCircle, Wallet, Home, Users, Gift, ShoppingCart, Crown, Zap } from 'lucide-react';
import logo from '../../assets/logo.svg';
import { getGameById } from '../utils/gameConfig';
import { GameDifficultySelector } from './GameDifficultySelector';


interface GameComingSoonProps {
  gameId: string;
  onBack: () => void;
  onOpenSettings?: () => void;
  onOpenProfile?: () => void;
  onNavigate?: (page: string) => void;
  onNavigateToLeaderboard?: () => void;
}

export function GameComingSoon({ gameId, onBack, onOpenSettings, onOpenProfile, onNavigate, onNavigateToLeaderboard }: GameComingSoonProps) {
  const [showDifficulty, setShowDifficulty] = useState(false);
  const game = getGameById(gameId);
  
  if (!game) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] text-white flex items-center justify-center">
        <p>Game not found</p>
      </div>
    );
  }

  const handleSelectDifficulty = (difficulty: 'easy' | 'medium' | 'hard') => {
    console.log(`Selected ${difficulty} difficulty for ${game.displayName}`);
    // This is where the actual game would launch
    // For now, we'll just show a message
    setShowDifficulty(false);
  };

  return (
    <div className="min-h-screen bg-[#1a1a1f] text-white flex">
      {/* Left Sidebar */}
      <div className="w-16 bg-[#0f0f13] flex flex-col items-center py-6 gap-6 border-r border-gray-800">
        <button 
          onClick={onBack}
          className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center hover:bg-blue-700 transition-colors"
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

        {/* Show Difficulty Selector or Game Info */}
        {showDifficulty ? (
          <GameDifficultySelector 
            gameTitle={game.displayName}
            onSelectDifficulty={handleSelectDifficulty}
          />
        ) : (
          <div className="max-w-4xl mx-auto px-4 md:px-8 py-8 md:py-16">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center"
            >
              {/* Game Image */}
              <motion.div
                className="mb-8 md:mb-12 mx-auto"
                animate={{ 
                  scale: [1, 1.05, 1],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="relative w-full max-w-2xl mx-auto">
                  <motion.div
                    className="relative rounded-3xl overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={game.image}
                      alt={game.displayName}
                      className="w-full h-64 md:h-96 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1f] via-transparent to-transparent"></div>
                  </motion.div>
                  {/* Glowing border effect */}
                  <div className="absolute inset-0 rounded-3xl border-2 border-purple-500/30 shadow-[0_0_30px_rgba(168,85,247,0.3)]"></div>
                </div>
              </motion.div>

              {/* Title */}
              <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                {game.displayName}
              </h1>

              {/* Description */}
              <p className="text-lg md:text-2xl text-gray-300 mb-8 md:mb-12 max-w-2xl mx-auto px-4">
                {game.description}
              </p>

              {/* Game Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12 max-w-2xl mx-auto">
                <motion.div
                  className="bg-[#1a1a24] border border-purple-600/30 rounded-xl p-4 md:p-6"
                  whileHover={{ scale: 1.05, borderColor: 'rgba(168, 85, 247, 0.6)' }}
                >
                  <Gamepad2 className="w-8 h-8 md:w-10 md:h-10 text-purple-400 mx-auto mb-3" />
                  <h3 className="text-sm md:text-base text-gray-400 mb-1">Category</h3>
                  <p className="text-lg md:text-xl font-bold">{game.category}</p>
                </motion.div>

                <motion.div
                  className="bg-[#1a1a24] border border-blue-600/30 rounded-xl p-4 md:p-6"
                  whileHover={{ scale: 1.05, borderColor: 'rgba(59, 130, 246, 0.6)' }}
                >
                  <Trophy className="w-8 h-8 md:w-10 md:h-10 text-blue-400 mx-auto mb-3" />
                  <h3 className="text-sm md:text-base text-gray-400 mb-1">Rating</h3>
                  <p className="text-lg md:text-xl font-bold">{game.rating} ⭐</p>
                </motion.div>

                <motion.div
                  className="bg-[#1a1a24] border border-green-600/30 rounded-xl p-4 md:p-6"
                  whileHover={{ scale: 1.05, borderColor: 'rgba(34, 197, 94, 0.6)' }}
                >
                  <Clock className="w-8 h-8 md:w-10 md:h-10 text-green-400 mx-auto mb-3" />
                  <h3 className="text-sm md:text-base text-gray-400 mb-1">Players</h3>
                  <p className="text-lg md:text-xl font-bold">{game.players}</p>
                </motion.div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
                <motion.button
                  onClick={() => setShowDifficulty(true)}
                  className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 px-8 md:px-10 py-4 md:py-5 rounded-xl font-bold text-lg md:text-xl hover:from-purple-500 hover:to-pink-500 transition-all flex items-center justify-center gap-3"
                  whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(168, 85, 247, 0.6)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Gamepad2 className="w-6 h-6" />
                  Start Game
                </motion.button>

                <motion.button
                  onClick={onBack}
                  className="w-full sm:w-auto bg-gradient-to-r from-gray-700 to-gray-800 px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold text-base md:text-lg hover:from-gray-600 hover:to-gray-700 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Back to Games
                </motion.button>

                {onNavigateToLeaderboard && (
                  <motion.button
                    onClick={onNavigateToLeaderboard}
                    className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold text-base md:text-lg hover:from-purple-500 hover:to-pink-500 transition-all flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Trophy className="w-5 h-5" />
                    View Leaderboards
                  </motion.button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}