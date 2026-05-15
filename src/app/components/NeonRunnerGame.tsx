import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Home, Settings, Trophy, RotateCcw, Pause, Play, Heart, Zap, TrendingUp, Award } from 'lucide-react';
import { saveGameScore } from '../utils/gameConfig';

interface NeonRunnerGameProps {
  onBack: () => void;
  onOpenSettings?: () => void;
  difficulty: 'easy' | 'medium' | 'hard';
  onGameOver?: (score: number, leaderboardPoints: number) => void;
}

const CANVAS_W = 800;
const CANVAS_H = 400;
const GROUND_Y = 320;
const PLAYER_W = 36;
const PLAYER_H = 48;
const PLAYER_X = 120;

const DIFFICULTY_SETTINGS = {
  easy:   { speed: 5,   gravity: 0.55, jumpForce: -13, obstacleRate: 90,  multiplier: 1.0, name: 'Easy' },
  medium: { speed: 7,   gravity: 0.65, jumpForce: -14, obstacleRate: 70,  multiplier: 1.5, name: 'Medium' },
  hard:   { speed: 9.5, gravity: 0.75, jumpForce: -15, obstacleRate: 52,  multiplier: 2.0, name: 'Hard' },
};

type Obstacle = { x: number; w: number; h: number; type: 'low' | 'high' | 'double'; color: string };
type Particle = { x: number; y: number; vx: number; vy: number; life: number; color: string; size: number };
type PowerUp = { x: number; y: number; type: 'shield' | 'slow'; active: boolean };

export function NeonRunnerGame({ onBack, onOpenSettings, difficulty, onGameOver }: NeonRunnerGameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [lives, setLives] = useState(3);
  const [shield, setShield] = useState(false);
  const [slowMode, setSlowMode] = useState(false);

  const cfg = DIFFICULTY_SETTINGS[difficulty];

  const playerYRef = useRef(GROUND_Y - PLAYER_H);
  const playerVYRef = useRef(0);
  const isGroundedRef = useRef(true);
  const canDoubleJumpRef = useRef(true);
  const obstaclesRef = useRef<Obstacle[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const powerUpsRef = useRef<PowerUp[]>([]);
  const frameRef = useRef(0);
  const scoreRef = useRef(0);
  const livesRef = useRef(3);
  const shieldRef = useRef(false);
  const slowRef = useRef(false);
  const gameOverRef = useRef(false);
  const pausedRef = useRef(false);
  const bgOffsetRef = useRef(0);
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef(0);

  const spawnParticles = (x: number, y: number, color: string, count = 8) => {
    for (let i = 0; i < count; i++) {
      particlesRef.current.push({
        x, y,
        vx: (Math.random() - 0.5) * 6,
        vy: (Math.random() - 0.5) * 6 - 2,
        life: 1,
        color,
        size: Math.random() * 4 + 2,
      });
    }
  };

  const jump = useCallback(() => {
    if (gameOverRef.current || pausedRef.current) return;
    if (isGroundedRef.current) {
      playerVYRef.current = cfg.jumpForce;
      isGroundedRef.current = false;
      canDoubleJumpRef.current = true;
      spawnParticles(PLAYER_X + PLAYER_W / 2, GROUND_Y, '#a855f7', 6);
    } else if (canDoubleJumpRef.current) {
      playerVYRef.current = cfg.jumpForce * 0.85;
      canDoubleJumpRef.current = false;
      spawnParticles(PLAYER_X + PLAYER_W / 2, playerYRef.current + PLAYER_H, '#ec4899', 10);
    }
  }, [cfg]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    const speed = slowRef.current ? cfg.speed * 0.4 : cfg.speed;

    // bg scroll
    bgOffsetRef.current = (bgOffsetRef.current + speed * 0.3) % CANVAS_W;

    // clear
    ctx.fillStyle = '#05050f';
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

    // scrolling grid background
    ctx.strokeStyle = 'rgba(168,85,247,0.08)';
    ctx.lineWidth = 1;
    const gx = bgOffsetRef.current;
    for (let x = -gx % 80; x < CANVAS_W; x += 80) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, CANVAS_H); ctx.stroke();
    }
    for (let y = 0; y < CANVAS_H; y += 60) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(CANVAS_W, y); ctx.stroke();
    }

    // distant city silhouette
    ctx.fillStyle = 'rgba(88,28,135,0.25)';
    const buildings = [0,120,80,200,160,50,250,180,100,300,140,220,80,350,160,70,280,400];
    for (let i = 0; i < buildings.length - 1; i += 2) {
      const bx = (buildings[i] - bgOffsetRef.current * 0.15 + CANVAS_W) % CANVAS_W;
      const bh = buildings[i + 1];
      ctx.fillRect(bx, CANVAS_H - 200 - bh * 0.3, 30, bh * 0.3 + 200);
    }

    // ground glow
    const grd = ctx.createLinearGradient(0, GROUND_Y, 0, CANVAS_H);
    grd.addColorStop(0, 'rgba(168,85,247,0.6)');
    grd.addColorStop(1, 'rgba(168,85,247,0)');
    ctx.fillStyle = grd;
    ctx.fillRect(0, GROUND_Y, CANVAS_W, 4);
    ctx.fillStyle = '#1a0533';
    ctx.fillRect(0, GROUND_Y + 4, CANVAS_W, CANVAS_H - GROUND_Y - 4);

    // ground line decoration
    ctx.strokeStyle = 'rgba(168,85,247,0.9)';
    ctx.lineWidth = 2;
    ctx.shadowBlur = 12;
    ctx.shadowColor = '#a855f7';
    ctx.beginPath();
    ctx.moveTo(0, GROUND_Y);
    ctx.lineTo(CANVAS_W, GROUND_Y);
    ctx.stroke();
    ctx.shadowBlur = 0;

    // dashes on ground
    ctx.strokeStyle = 'rgba(236,72,153,0.4)';
    ctx.lineWidth = 2;
    for (let x = (CANVAS_W - bgOffsetRef.current * 2) % 120; x < CANVAS_W; x += 120) {
      ctx.beginPath();
      ctx.moveTo(x, GROUND_Y + 12);
      ctx.lineTo(x + 60, GROUND_Y + 12);
      ctx.stroke();
    }

    // power-ups
    powerUpsRef.current.forEach(pu => {
      pu.x -= speed;
      if (!pu.active) return;
      const pcolor = pu.type === 'shield' ? '#22d3ee' : '#facc15';
      ctx.shadowBlur = 15;
      ctx.shadowColor = pcolor;
      ctx.fillStyle = pcolor;
      ctx.beginPath();
      ctx.arc(pu.x, pu.y, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.font = '14px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(pu.type === 'shield' ? '🛡' : '⚡', pu.x, pu.y);
      ctx.shadowBlur = 0;
    });
    powerUpsRef.current = powerUpsRef.current.filter(p => p.x > -20);

    // obstacles
    obstaclesRef.current.forEach(obs => {
      obs.x -= speed;
      const oy = GROUND_Y - obs.h;
      ctx.shadowBlur = 10;
      ctx.shadowColor = obs.color;
      const obsGrd = ctx.createLinearGradient(obs.x, oy, obs.x + obs.w, oy + obs.h);
      obsGrd.addColorStop(0, obs.color);
      obsGrd.addColorStop(1, obs.color + '88');
      ctx.fillStyle = obsGrd;
      ctx.beginPath();
      ctx.roundRect(obs.x, oy, obs.w, obs.h, 4);
      ctx.fill();
      ctx.strokeStyle = obs.color;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.shadowBlur = 0;
    });
    obstaclesRef.current = obstaclesRef.current.filter(o => o.x > -100);

    // player
    const px = PLAYER_X;
    const py = playerYRef.current;
    const pcolor = shieldRef.current ? '#22d3ee' : '#a855f7';

    if (shieldRef.current) {
      ctx.strokeStyle = '#22d3ee88';
      ctx.lineWidth = 2;
      ctx.shadowBlur = 20;
      ctx.shadowColor = '#22d3ee';
      ctx.beginPath();
      ctx.arc(px + PLAYER_W / 2, py + PLAYER_H / 2, PLAYER_W * 0.8, 0, Math.PI * 2);
      ctx.stroke();
      ctx.shadowBlur = 0;
    }

    // player body glow
    ctx.shadowBlur = 20;
    ctx.shadowColor = pcolor;
    const playerGrd = ctx.createLinearGradient(px, py, px + PLAYER_W, py + PLAYER_H);
    playerGrd.addColorStop(0, '#c084fc');
    playerGrd.addColorStop(1, '#7c3aed');
    ctx.fillStyle = playerGrd;
    ctx.beginPath();
    ctx.roundRect(px, py, PLAYER_W, PLAYER_H, 6);
    ctx.fill();

    // visor
    ctx.fillStyle = '#0ea5e9';
    ctx.shadowColor = '#0ea5e9';
    ctx.beginPath();
    ctx.roundRect(px + 6, py + 8, PLAYER_W - 12, 12, 3);
    ctx.fill();

    // legs
    const legAnim = Math.sin(frameRef.current * 0.3) * 6;
    ctx.fillStyle = '#6d28d9';
    ctx.fillRect(px + 4, py + PLAYER_H, 10, 8 + legAnim);
    ctx.fillRect(px + PLAYER_W - 14, py + PLAYER_H, 10, 8 - legAnim);
    ctx.shadowBlur = 0;

    // trail
    for (let i = 1; i <= 4; i++) {
      ctx.fillStyle = `rgba(168,85,247,${0.15 * (5 - i)})`;
      ctx.beginPath();
      ctx.roundRect(px - i * 8, py + i * 2, PLAYER_W, PLAYER_H - i * 4, 6);
      ctx.fill();
    }

    // particles
    particlesRef.current.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.vy += 0.15; p.life -= 0.03;
      ctx.globalAlpha = p.life;
      ctx.fillStyle = p.color;
      ctx.shadowBlur = 6;
      ctx.shadowColor = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    });
    ctx.globalAlpha = 1;
    particlesRef.current = particlesRef.current.filter(p => p.life > 0);

    // HUD score
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillRect(8, 8, 160, 36);
    ctx.fillStyle = '#d8b4fe';
    ctx.font = 'bold 20px monospace';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(`SCORE: ${scoreRef.current}`, 16, 26);

    if (slowRef.current) {
      ctx.fillStyle = '#facc15';
      ctx.font = 'bold 14px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('⚡ SLOW MODE', CANVAS_W / 2, 20);
    }
  }, [cfg]);

  const gameLoop = useCallback((time: number) => {
    if (gameOverRef.current) return;
    if (pausedRef.current) { rafRef.current = requestAnimationFrame(gameLoop); return; }
    if (lastTimeRef.current === 0) lastTimeRef.current = time;
    lastTimeRef.current = time;

    frameRef.current++;
    const speed = slowRef.current ? cfg.speed * 0.4 : cfg.speed;

    // physics
    playerVYRef.current += cfg.gravity;
    playerYRef.current += playerVYRef.current;
    if (playerYRef.current >= GROUND_Y - PLAYER_H) {
      playerYRef.current = GROUND_Y - PLAYER_H;
      playerVYRef.current = 0;
      isGroundedRef.current = true;
      canDoubleJumpRef.current = true;
    }

    // spawn obstacles
    if (frameRef.current % cfg.obstacleRate === 0) {
      const types: Obstacle['type'][] = ['low', 'high', 'double'];
      const type = types[Math.floor(Math.random() * types.length)];
      const colors = ['#f43f5e', '#f97316', '#ef4444'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      const w = 28 + Math.random() * 20;
      const h = type === 'low' ? 40 + Math.random() * 20
               : type === 'high' ? 80 + Math.random() * 30
               : 60 + Math.random() * 25;
      obstaclesRef.current.push({ x: CANVAS_W + 10, w, h, type, color });
    }

    // spawn power-ups
    if (frameRef.current % 300 === 150) {
      const type = Math.random() > 0.5 ? 'shield' : 'slow';
      powerUpsRef.current.push({ x: CANVAS_W + 10, y: GROUND_Y - 60, type, active: true });
    }

    // collision detection
    const px = PLAYER_X, py = playerYRef.current;
    const margin = shieldRef.current ? 12 : 4;

    obstaclesRef.current.forEach(obs => {
      const oy = GROUND_Y - obs.h;
      if (
        px + PLAYER_W - margin > obs.x + margin &&
        px + margin < obs.x + obs.w - margin &&
        py + PLAYER_H - margin > oy + margin &&
        py + margin < oy + obs.h - margin
      ) {
        obstaclesRef.current = obstaclesRef.current.filter(o => o !== obs);
        spawnParticles(obs.x + obs.w / 2, oy + obs.h / 2, obs.color, 12);
        if (shieldRef.current) {
          shieldRef.current = false;
          setShield(false);
        } else {
          livesRef.current--;
          setLives(livesRef.current);
          spawnParticles(px + PLAYER_W / 2, py + PLAYER_H / 2, '#ef4444', 16);
          if (livesRef.current <= 0) {
            gameOverRef.current = true;
            setGameOver(true);
            const lbp = Math.floor(scoreRef.current * cfg.multiplier);
            saveGameScore('neonrunner', scoreRef.current, lbp, difficulty);
            onGameOver?.(scoreRef.current, lbp);
          }
        }
      }
    });

    // power-up collection
    powerUpsRef.current.forEach(pu => {
      if (!pu.active) return;
      const dx = (px + PLAYER_W / 2) - pu.x;
      const dy = (py + PLAYER_H / 2) - pu.y;
      if (Math.sqrt(dx * dx + dy * dy) < 30) {
        pu.active = false;
        if (pu.type === 'shield') {
          shieldRef.current = true;
          setShield(true);
          spawnParticles(pu.x, pu.y, '#22d3ee', 12);
        } else {
          slowRef.current = true;
          setSlowMode(true);
          spawnParticles(pu.x, pu.y, '#facc15', 12);
          setTimeout(() => { slowRef.current = false; setSlowMode(false); }, 5000);
        }
      }
    });

    // score
    scoreRef.current += 1;
    if (frameRef.current % 30 === 0) setScore(scoreRef.current);

    draw();
    rafRef.current = requestAnimationFrame(gameLoop);
  }, [cfg, difficulty, draw, onGameOver]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [gameLoop]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp' || e.key === 'w') {
        e.preventDefault();
        jump();
      }
      if (e.code === 'KeyP') setIsPaused(p => { pausedRef.current = !p; return !p; });
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [jump]);

  const handleRestart = () => {
    obstaclesRef.current = [];
    particlesRef.current = [];
    powerUpsRef.current = [];
    playerYRef.current = GROUND_Y - PLAYER_H;
    playerVYRef.current = 0;
    isGroundedRef.current = true;
    canDoubleJumpRef.current = true;
    frameRef.current = 0;
    scoreRef.current = 0;
    livesRef.current = 3;
    shieldRef.current = false;
    slowRef.current = false;
    gameOverRef.current = false;
    pausedRef.current = false;
    lastTimeRef.current = 0;
    setScore(0); setLives(3); setGameOver(false); setShield(false); setSlowMode(false); setIsPaused(false);
    rafRef.current = requestAnimationFrame(gameLoop);
  };

  const lbPoints = Math.floor(score * cfg.multiplier);

  return (
    <div className="min-h-screen bg-[#05050f] text-white flex flex-col">
      <header className="bg-[#0a0a18] border-b border-purple-900/50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <Home className="w-5 h-5" /> Back
          </button>
          <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            NEON RUNNER
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-gray-800 px-3 py-1.5 rounded text-sm">
            <span className="text-gray-400">LB Pts: </span>
            <span className="text-green-400 font-bold">{lbPoints.toLocaleString()}</span>
          </div>
          <button onClick={onOpenSettings} className="w-9 h-9 rounded-full bg-gray-700 flex items-center justify-center hover:bg-gray-600">
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="flex gap-6">
          {/* Stats */}
          <div className="w-52 space-y-3">
            <div className="bg-[#0a0a18] rounded-xl p-4 border border-purple-900/50">
              <div className="flex items-center gap-2 mb-3"><Trophy className="w-4 h-4 text-yellow-500" /><span className="text-sm text-gray-400">Score</span></div>
              <div className="text-3xl font-bold text-purple-400">{score.toLocaleString()}</div>
              <div className="text-xs text-gray-500 mt-1">LB: <span className="text-green-400">{lbPoints.toLocaleString()}</span></div>
            </div>
            <div className="bg-[#0a0a18] rounded-xl p-4 border border-purple-900/50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Lives</span>
                <div className="flex gap-1">{Array.from({length: lives}).map((_, i) => <Heart key={i} className="w-4 h-4 fill-red-500 text-red-500" />)}</div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Difficulty</span>
                <span className="text-white text-sm font-medium">{cfg.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Multiplier</span>
                <span className="text-purple-400 text-sm font-bold">{cfg.multiplier}x</span>
              </div>
            </div>
            {shield && (
              <motion.div initial={{scale:0}} animate={{scale:1}} className="bg-cyan-900/40 border border-cyan-500 rounded-xl p-3 text-center text-sm text-cyan-400">
                🛡 Shield Active!
              </motion.div>
            )}
            {slowMode && (
              <motion.div initial={{scale:0}} animate={{scale:1}} className="bg-yellow-900/40 border border-yellow-500 rounded-xl p-3 text-center text-sm text-yellow-400">
                ⚡ Slow Mode!
              </motion.div>
            )}
            <div className="bg-[#0a0a18] rounded-xl p-4 border border-purple-900/50">
              <div className="text-xs text-gray-400 space-y-1.5">
                <div className="font-medium text-gray-300 mb-2">Controls</div>
                <div><span className="font-mono bg-gray-700 px-1.5 rounded">SPACE</span> / <span className="font-mono bg-gray-700 px-1.5 rounded">↑</span> Jump</div>
                <div><span className="font-mono bg-gray-700 px-1.5 rounded">↑↑</span> Double jump</div>
                <div><span className="font-mono bg-gray-700 px-1.5 rounded">P</span> Pause</div>
              </div>
            </div>
          </div>

          {/* Canvas */}
          <div className="relative">
            <div className="rounded-xl overflow-hidden border-2 border-purple-700 shadow-2xl shadow-purple-900/40">
              <canvas ref={canvasRef} width={CANVAS_W} height={CANVAS_H}
                onClick={jump}
                className="cursor-pointer block"
              />
            </div>
            <AnimatePresence>
              {isPaused && !gameOver && (
                <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
                  className="absolute inset-0 bg-black/80 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <Pause className="w-16 h-16 mx-auto mb-4 text-purple-400" />
                    <h2 className="text-3xl font-bold mb-2">PAUSED</h2>
                    <p className="text-gray-400 text-sm">Press P to continue</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {gameOver && (
                <motion.div initial={{opacity:0}} animate={{opacity:1}}
                  className="absolute inset-0 bg-black/90 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <Award className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
                    <h2 className="text-4xl font-bold mb-4">GAME OVER</h2>
                    <div className="bg-gray-800 rounded-lg p-5 mb-5 space-y-2">
                      <div className="text-2xl font-bold text-purple-400">{score.toLocaleString()} pts</div>
                      <div className="text-gray-400 text-sm">{cfg.name} mode</div>
                      <div className="pt-3 border-t border-gray-700">
                        <div className="text-xs text-gray-500">Leaderboard Points</div>
                        <div className="text-3xl font-bold text-green-400">{lbPoints.toLocaleString()}</div>
                      </div>
                    </div>
                    <div className="flex gap-3 justify-center">
                      <motion.button onClick={handleRestart} whileHover={{scale:1.05}} whileTap={{scale:0.95}}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 px-5 py-3 rounded-lg flex items-center gap-2">
                        <RotateCcw className="w-4 h-4" /> Play Again
                      </motion.button>
                      <motion.button onClick={onBack} whileHover={{scale:1.05}} whileTap={{scale:0.95}}
                        className="bg-gray-700 px-5 py-3 rounded-lg flex items-center gap-2">
                        <Home className="w-4 h-4" /> Menu
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            {!gameOver && (
              <div className="mt-2 text-center text-xs text-gray-600">Click canvas or SPACE to jump • Double jump available!</div>
            )}
          </div>

          {/* Right panel */}
          <div className="w-52 space-y-3">
            <div className="bg-[#0a0a18] rounded-xl p-4 border border-purple-900/50">
              <h3 className="text-sm font-medium mb-3 flex items-center gap-2"><Zap className="w-4 h-4 text-yellow-400" />Power-Ups</h3>
              <div className="space-y-2 text-xs text-gray-400">
                <div className="flex items-center gap-2"><span>🛡</span><span>Shield — absorbs one hit</span></div>
                <div className="flex items-center gap-2"><span>⚡</span><span>Slow — world slows down</span></div>
              </div>
            </div>
            <div className="bg-[#0a0a18] rounded-xl p-4 border border-purple-900/50">
              <h3 className="text-sm font-medium mb-3 flex items-center gap-2"><TrendingUp className="w-4 h-4 text-purple-400" />Scoring</h3>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-gray-400"><span>Per second</span><span className="text-yellow-400">+1</span></div>
                <div className="flex justify-between text-gray-400"><span>Difficulty</span><span className="text-purple-400">{cfg.multiplier}x</span></div>
                <div className="text-gray-600 mt-2 text-xs">Survive as long as possible. Speed increases over time!</div>
              </div>
            </div>
            <motion.button
              onClick={() => { pausedRef.current = !isPaused; setIsPaused(p => !p); }}
              disabled={gameOver}
              className="w-full bg-gradient-to-r from-purple-700 to-pink-700 py-2.5 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 text-sm"
              whileHover={{scale:1.03}} whileTap={{scale:0.97}}
            >
              {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
              {isPaused ? 'Resume' : 'Pause'}
            </motion.button>
            <motion.button
              onClick={handleRestart}
              className="w-full bg-gray-700 py-2.5 rounded-lg flex items-center justify-center gap-2 text-sm"
              whileHover={{scale:1.03}} whileTap={{scale:0.97}}
            >
              <RotateCcw className="w-4 h-4" /> Restart
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
