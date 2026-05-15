import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Play, Eye, Trophy, Clock, TrendingUp, MessageCircle, Share2, Flag, Settings as SettingsIcon } from 'lucide-react';

import { motion } from 'motion/react';
import logo from '../../assets/logo.svg';

interface LiveMatchPageProps {
  matchId?: string;
  onBack: () => void;
  onOpenSettings?: () => void;
  onOpenProfile?: () => void;
}

export function LiveMatchPage({ matchId, onBack, onOpenSettings, onOpenProfile }: LiveMatchPageProps) {
  const navigate = useNavigate();
  const params = useParams();
  const id = matchId || params.matchId || '1';
  const [viewers, setViewers] = useState(2540);
  const [elapsedTime, setElapsedTime] = useState(754); // seconds

  // Simulate viewer count changes
  useEffect(() => {
    const interval = setInterval(() => {
      setViewers(prev => prev + Math.floor(Math.random() * 20) - 10);
      setElapsedTime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Match data (would come from props/API in real app)
  const match = {
    id,
    game: 'PAC-MAN',
    emoji: '👻',
    player1: {
      name: localStorage.getItem('ta_username') || 'You',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=speedrunner',
      score: 12450,
      lives: 2,
      level: 3
    },
    player2: {
      name: 'SpeedRunner99',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=player6',
      score: 11320,
      lives: 3,
      level: 2
    },
    prizePool: '$500',
    difficulty: 'Hard',
    mode: '1v1 Ranked'
  };

  const chatMessages = [
    { user: 'GameMaster', message: 'This is intense! 🔥', time: '12:32' },
    { user: 'PixelHunter', message: 'ProGamer is on fire!', time: '12:33' },
    { user: 'RetroFan88', message: 'Anyone betting on SpeedRunner?', time: '12:33' },
    { user: 'ArcadeKing', message: 'Both players are amazing!', time: '12:34' },
    { user: 'GhostChaser', message: 'That power pellet timing was perfect!', time: '12:34' }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex flex-col">
      {/* Header */}
      <header className="bg-[#0f0f13] border-b border-gray-800 px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <img src={logo} alt="Tour Arcade" className="h-6 md:h-8" />
            <div className="hidden md:block">
              <h1 className="text-lg font-bold">Live Match</h1>
              <p className="text-xs text-gray-400">Tournament Arena</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenSettings}
              className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center hover:bg-gray-500 transition-colors"
            >
              <SettingsIcon className="w-5 h-5" />
            </button>
            <button
              onClick={onOpenProfile}
              className="w-10 h-10 rounded-full bg-red-600 overflow-hidden"
            >
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=user"
                alt="User"
                className="w-full h-full object-cover"
              />
            </button>
          </div>
        </div>
      </header>

      {/* Match Info Banner */}
      <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-b border-gray-800 px-4 md:px-6 py-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-4xl md:text-5xl">{match.emoji}</span>
            <div>
              <h2 className="text-xl md:text-2xl font-bold">{match.game}</h2>
              <div className="flex items-center gap-3 text-xs md:text-sm text-gray-400">
                <motion.div
                  className="flex items-center gap-2"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <div className="w-2 h-2 bg-red-500 rounded-full" />
                  <span className="text-red-400 font-semibold">LIVE</span>
                </motion.div>
                <span>•</span>
                <Clock className="w-4 h-4" />
                <span>{formatTime(elapsedTime)}</span>
                <span>•</span>
                <span>{match.mode}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 md:gap-6 text-xs md:text-sm">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 md:w-5 md:h-5 text-purple-400" />
              <span className="font-semibold">{viewers.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 md:w-5 md:h-5 text-yellow-400" />
              <span className="text-yellow-400 font-semibold">{match.prizePool}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Side - Video/Game View */}
        <div className="flex-1 flex flex-col">
          {/* Player Stats */}
          <div className="bg-[#1a1a1f] border-b border-gray-800 px-4 md:px-6 py-4">
            <div className="grid grid-cols-3 gap-4 items-center">
              {/* Player 1 */}
              <div className="flex items-center gap-3">
                <img
                  src={match.player1.avatar}
                  alt={match.player1.name}
                  className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover border-2 border-purple-600"
                />
                <div>
                  <div className="font-semibold text-sm md:text-base">{match.player1.name}</div>
                  <div className="text-xs text-gray-400">Lives: {match.player1.lives} • Level {match.player1.level}</div>
                  <div className="text-xl md:text-2xl font-bold text-purple-400">{match.player1.score.toLocaleString()}</div>
                </div>
              </div>

              {/* VS */}
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-gray-600">VS</div>
                <div className="text-xs text-gray-500 mt-1">{match.difficulty}</div>
              </div>

              {/* Player 2 */}
              <div className="flex items-center gap-3 justify-end">
                <div className="text-right">
                  <div className="font-semibold text-sm md:text-base">{match.player2.name}</div>
                  <div className="text-xs text-gray-400">Lives: {match.player2.lives} • Level {match.player2.level}</div>
                  <div className="text-xl md:text-2xl font-bold text-pink-400">{match.player2.score.toLocaleString()}</div>
                </div>
                <img
                  src={match.player2.avatar}
                  alt={match.player2.name}
                  className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover border-2 border-pink-600"
                />
              </div>
            </div>
          </div>

          {/* Game Stream/Video Placeholder */}
          <div className="flex-1 bg-[#0a0a0f] flex items-center justify-center relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-pink-900/20" />
            <div className="relative z-10 text-center">
              <motion.div
                className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-6 bg-purple-600/20 rounded-full flex items-center justify-center border-4 border-purple-600"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Play className="w-12 h-12 md:w-16 md:h-16 text-purple-400" />
              </motion.div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Live Gameplay Stream</h2>
              <p className="text-gray-400 mb-6">Watch the action unfold in real-time</p>
              <motion.button
                onClick={() => navigate(`/tournaments/match/${id}/spectate`)}
                className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 rounded-lg font-semibold flex items-center gap-2 mx-auto"
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(168, 85, 247, 0.6)" }}
                whileTap={{ scale: 0.95 }}
              >
                <Play className="w-5 h-5" />
                Enter Spectator Mode
              </motion.button>
            </div>
          </div>

          {/* Match Controls */}
          <div className="bg-[#1a1a1f] border-t border-gray-800 px-4 md:px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 md:gap-4">
                <motion.button
                  className="px-4 py-2 bg-purple-600 rounded-lg text-sm font-semibold hover:bg-purple-700 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Follow
                </motion.button>
                <motion.button
                  className="px-4 py-2 bg-gray-700 rounded-lg text-sm hover:bg-gray-600 transition-colors flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Share2 className="w-4 h-4" />
                  <span className="hidden md:inline">Share</span>
                </motion.button>
              </div>

              <motion.button
                className="px-4 py-2 bg-red-600/20 border border-red-600 rounded-lg text-sm text-red-400 hover:bg-red-600/30 transition-colors flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Flag className="w-4 h-4" />
                <span className="hidden md:inline">Report</span>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Right Side - Chat & Info */}
        <div className="w-full lg:w-80 xl:w-96 bg-[#0f0f13] border-l border-gray-800 flex flex-col">
          {/* Match Stats */}
          <div className="p-4 border-b border-gray-800">
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-purple-400" />
              Match Statistics
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-400">Duration</span>
                <span className="font-semibold">{formatTime(elapsedTime)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Peak Viewers</span>
                <span className="font-semibold">{(viewers + 234).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Prize Pool</span>
                <span className="font-semibold text-yellow-400">{match.prizePool}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Match Type</span>
                <span className="font-semibold">{match.mode}</span>
              </div>
            </div>
          </div>

          {/* Live Chat */}
          <div className="flex-1 flex flex-col">
            <div className="p-4 border-b border-gray-800 flex items-center justify-between">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-purple-400" />
                Live Chat
              </h3>
              <span className="text-xs text-gray-400">{viewers} online</span>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {chatMessages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="text-sm"
                >
                  <div className="flex items-baseline gap-2">
                    <span className="text-purple-400 font-semibold text-xs">{msg.user}</span>
                    <span className="text-gray-500 text-xs">{msg.time}</span>
                  </div>
                  <div className="text-gray-300 mt-1">{msg.message}</div>
                </motion.div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-gray-800">
              <input
                type="text"
                placeholder="Send a message..."
                className="w-full bg-[#2a2a32] border-0 rounded-lg px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
