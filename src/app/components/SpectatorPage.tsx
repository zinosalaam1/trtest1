import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Maximize, Volume2, VolumeX, Settings as SettingsIcon, Eye, MessageCircle, Share2, Users } from 'lucide-react';

import { motion } from 'motion/react';

interface SpectatorPageProps {
  matchId?: string;
  onBack: () => void;
}

export function SpectatorPage({ matchId, onBack }: SpectatorPageProps) {
  const navigate = useNavigate();
  const params = useParams();
  const id = matchId || params.matchId || '1';
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [showChat, setShowChat] = useState(true);
  const [viewers, setViewers] = useState(2540);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Simulate viewer count changes
  useEffect(() => {
    const interval = setInterval(() => {
      setViewers(prev => prev + Math.floor(Math.random() * 20) - 10);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Draw spectator view (simplified PAC-MAN visualization)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrame: number;
    let frame = 0;

    const draw = () => {
      // Clear canvas
      ctx.fillStyle = '#0a0a0f';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw maze grid (simplified)
      ctx.strokeStyle = '#1e40af';
      ctx.lineWidth = 2;
      for (let i = 0; i < 20; i++) {
        for (let j = 0; j < 20; j++) {
          if (Math.random() > 0.7) {
            ctx.strokeRect(i * 30, j * 30, 30, 30);
          }
        }
      }

      // Animate PAC-MAN (Player 1)
      const pacX = 100 + Math.sin(frame * 0.05) * 150;
      const pacY = 100 + Math.cos(frame * 0.03) * 100;

      const gradient1 = ctx.createRadialGradient(pacX, pacY, 0, pacX, pacY, 15);
      gradient1.addColorStop(0, '#ffeb3b');
      gradient1.addColorStop(1, '#fbbf24');
      ctx.fillStyle = gradient1;
      ctx.shadowBlur = 15;
      ctx.shadowColor = '#fbbf24';

      ctx.beginPath();
      const mouthAngle = Math.abs(Math.sin(frame * 0.1)) * 0.3;
      ctx.arc(pacX, pacY, 15, mouthAngle, Math.PI * 2 - mouthAngle);
      ctx.lineTo(pacX, pacY);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Animate PAC-MAN (Player 2)
      const pacX2 = 500 - Math.sin(frame * 0.04) * 120;
      const pacY2 = 400 - Math.cos(frame * 0.06) * 150;

      const gradient2 = ctx.createRadialGradient(pacX2, pacY2, 0, pacX2, pacY2, 15);
      gradient2.addColorStop(0, '#ff69b4');
      gradient2.addColorStop(1, '#ff1493');
      ctx.fillStyle = gradient2;
      ctx.shadowBlur = 15;
      ctx.shadowColor = '#ff69b4';

      ctx.beginPath();
      const mouthAngle2 = Math.abs(Math.sin(frame * 0.1 + Math.PI)) * 0.3;
      ctx.arc(pacX2, pacY2, 15, mouthAngle2 + Math.PI, Math.PI * 3 - mouthAngle2);
      ctx.lineTo(pacX2, pacY2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Draw dots
      ctx.fillStyle = '#fbbf24';
      for (let i = 0; i < 30; i++) {
        const dotX = Math.random() * canvas.width;
        const dotY = Math.random() * canvas.height;
        ctx.beginPath();
        ctx.arc(dotX, dotY, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw ghosts
      const ghosts = [
        { x: 200 + Math.sin(frame * 0.02) * 80, y: 300, color: '#FF0000' },
        { x: 400, y: 200 + Math.cos(frame * 0.03) * 60, color: '#00FFFF' },
        { x: 300 + Math.sin(frame * 0.025) * 100, y: 150, color: '#FFB8FF' }
      ];

      ghosts.forEach(ghost => {
        const gradient = ctx.createRadialGradient(ghost.x, ghost.y, 0, ghost.x, ghost.y, 12);
        gradient.addColorStop(0, ghost.color);
        gradient.addColorStop(1, ghost.color + '80');
        ctx.fillStyle = gradient;
        ctx.shadowBlur = 10;
        ctx.shadowColor = ghost.color;

        ctx.beginPath();
        ctx.arc(ghost.x, ghost.y, 12, Math.PI, 0);
        ctx.lineTo(ghost.x + 12, ghost.y + 12);
        for (let i = 0; i < 3; i++) {
          ctx.lineTo(ghost.x + 12 - (i * 8), ghost.y + 12 - Math.sin(frame * 0.1 + i) * 3);
        }
        ctx.lineTo(ghost.x - 12, ghost.y + 12);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Draw player indicators
      ctx.font = 'bold 12px Arial';
      ctx.fillStyle = '#ffeb3b';
      ctx.fillText('P1', pacX - 10, pacY - 25);
      ctx.fillStyle = '#ff69b4';
      ctx.fillText('P2', pacX2 - 10, pacY2 - 25);

      frame++;
      animationFrame = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  const match = {
    player1: { name: localStorage.getItem('ta_username') || 'You', score: 12450 },
    player2: { name: 'SpeedRunner99', score: 11320 }
  };

  const chatMessages = [
    { user: 'GameMaster', message: 'Amazing plays! 🔥' },
    { user: 'PixelHunter', message: 'That ghost dodge was insane!' },
    { user: 'RetroFan88', message: 'ProGamer leading by 1000+' },
    { user: 'ArcadeKing', message: 'This is the best match today!' }
  ];

  return (
    <div className={`${isFullscreen ? 'fixed inset-0 z-50' : 'min-h-screen'} bg-[#0a0a0f] text-white flex flex-col`}>
      {/* Top Controls */}
      {!isFullscreen && (
        <div className="bg-[#0f0f13]/95 backdrop-blur-sm border-b border-gray-800 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(`/tournaments/match/${id}`)}
              className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <motion.div
                  className="w-2 h-2 bg-red-500 rounded-full"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span className="text-sm font-semibold">LIVE SPECTATOR MODE</span>
              </div>
              <p className="text-xs text-gray-400">PAC-MAN Tournament Match</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm">
              <Eye className="w-4 h-4 text-purple-400" />
              <span className="font-semibold">{viewers.toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}

      {/* Main Game View */}
      <div className="flex-1 flex relative">
        {/* Game Canvas */}
        <div className="flex-1 bg-black flex items-center justify-center relative">
          {/* Player Stats Overlay */}
          <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 to-transparent p-4 z-10">
            <div className="max-w-7xl mx-auto grid grid-cols-2 gap-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center font-bold">
                  P1
                </div>
                <div>
                  <div className="font-semibold">{match.player1.name}</div>
                  <div className="text-2xl font-bold text-yellow-400">{match.player1.score.toLocaleString()}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 justify-end">
                <div className="text-right">
                  <div className="font-semibold">{match.player2.name}</div>
                  <div className="text-2xl font-bold text-pink-400">{match.player2.score.toLocaleString()}</div>
                </div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center font-bold">
                  P2
                </div>
              </div>
            </div>
          </div>

          {/* Canvas */}
          <canvas
            ref={canvasRef}
            width={600}
            height={600}
            className="border-2 border-purple-600 rounded-lg shadow-2xl shadow-purple-600/20 max-w-full max-h-full"
          />

          {/* Bottom Controls Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 z-10">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-2">
                <motion.button
                  onClick={() => setIsMuted(!isMuted)}
                  className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </motion.button>
                <motion.button
                  onClick={() => setShowChat(!showChat)}
                  className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <MessageCircle className="w-5 h-5" />
                </motion.button>
                <motion.button
                  className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Share2 className="w-5 h-5" />
                </motion.button>
              </div>

              <div className="flex items-center gap-2">
                <motion.button
                  className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <SettingsIcon className="w-5 h-5" />
                </motion.button>
                <motion.button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Maximize className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Live Chat Sidebar */}
        {showChat && !isFullscreen && (
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            className="w-80 bg-[#0f0f13] border-l border-gray-800 flex flex-col hidden lg:flex"
          >
            <div className="p-4 border-b border-gray-800 flex items-center justify-between">
              <h3 className="font-semibold flex items-center gap-2">
                <Users className="w-4 h-4 text-purple-400" />
                Live Chat
              </h3>
              <span className="text-xs text-gray-400">{viewers} watching</span>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {chatMessages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="text-sm"
                >
                  <span className="text-purple-400 font-semibold">{msg.user}: </span>
                  <span className="text-gray-300">{msg.message}</span>
                </motion.div>
              ))}
            </div>

            <div className="p-4 border-t border-gray-800">
              <input
                type="text"
                placeholder="Send a message..."
                className="w-full bg-[#2a2a32] border-0 rounded-lg px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
