import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Home, Settings, Trophy, RotateCcw, Heart, Award, Zap, TrendingUp, Gauge } from 'lucide-react';
import { saveGameScore } from '../utils/gameConfig';

interface PixelRacerGameProps {
  onBack: () => void;
  onOpenSettings?: () => void;
  difficulty: 'easy' | 'medium' | 'hard';
  onGameOver?: (score: number, leaderboardPoints: number) => void;
}

const CANVAS_W = 480;
const CANVAS_H = 640;
const LANES = 4;
const LANE_W = CANVAS_W / LANES; // 120px per lane
const ROAD_LEFT = 0;

const DIFFICULTY_SETTINGS = {
  easy:   { startSpeed: 3,   maxSpeed: 9,   accel: 0.0008, spawnRate: 80,  lives: 3, multiplier: 1.0, name: 'Easy' },
  medium: { startSpeed: 5,   maxSpeed: 13,  accel: 0.0012, spawnRate: 60,  lives: 3, multiplier: 1.5, name: 'Medium' },
  hard:   { startSpeed: 7.5, maxSpeed: 18,  accel: 0.0018, spawnRate: 42,  lives: 2, multiplier: 2.0, name: 'Hard' },
};

const CAR_COLORS = ['#f43f5e', '#f97316', '#facc15', '#22d3ee', '#a855f7', '#22c55e'];
const CAR_W = 46;
const CAR_H = 72;

type TrafficCar = { lane: number; y: number; color: string; speed: number; type: 'slow' | 'normal' | 'fast' };
type Particle = { x: number; y: number; vx: number; vy: number; life: number; color: string; size: number };
type RoadStripe = { y: number };
type PowerUp = { lane: number; y: number; type: 'shield' | 'boost'; active: boolean };

export function PixelRacerGame({ onBack, onOpenSettings, difficulty, onGameOver }: PixelRacerGameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cfg = DIFFICULTY_SETTINGS[difficulty];

  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(cfg.lives);
  const [speed, setSpeed] = useState(cfg.startSpeed);
  const [gameOver, setGameOver] = useState(false);
  const [shield, setShield] = useState(false);
  const [boost, setBoost] = useState(false);
  const [lap, setLap] = useState(0);

  const laneRef = useRef(1); // 0-3
  const playerYRef = useRef(CANVAS_H - 120);
  const trafficRef = useRef<TrafficCar[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const stripesRef = useRef<RoadStripe[]>([]);
  const powerUpsRef = useRef<PowerUp[]>([]);
  const frameRef = useRef(0);
  const scoreRef = useRef(0);
  const livesRef = useRef(cfg.lives);
  const speedRef = useRef(cfg.startSpeed);
  const shieldRef = useRef(false);
  const boostRef = useRef(false);
  const gameOverRef = useRef(false);
  const rafRef = useRef<number>(0);
  const keysRef = useRef<Record<string, boolean>>({});
  const moveCoolRef = useRef(0);
  const invincRef = useRef(false);
  const distRef = useRef(0);

  // init road stripes
  useEffect(() => {
    stripesRef.current = Array.from({ length: 12 }, (_, i) => ({ y: i * 60 }));
  }, []);

  const getLaneX = (lane: number) => ROAD_LEFT + lane * LANE_W + LANE_W / 2 - CAR_W / 2;

  const spawnParticles = (x: number, y: number, color: string, count = 10) => {
    for (let i = 0; i < count; i++) {
      particlesRef.current.push({
        x, y,
        vx: (Math.random() - 0.5) * 6,
        vy: (Math.random() - 0.5) * 6,
        life: 1, color,
        size: 3 + Math.random() * 4,
      });
    }
  };

  const drawCar = (ctx: CanvasRenderingContext2D, x: number, y: number, color: string, isPlayer = false, carType: 'slow' | 'normal' | 'fast' = 'normal') => {
    // body
    const g = ctx.createLinearGradient(x, y, x + CAR_W, y + CAR_H);
    g.addColorStop(0, color);
    g.addColorStop(1, color + 'aa');
    ctx.fillStyle = g;
    ctx.shadowBlur = isPlayer ? 20 : 8;
    ctx.shadowColor = color;
    ctx.beginPath();
    ctx.roundRect(x + 4, y, CAR_W - 8, CAR_H, [6, 6, 4, 4]);
    ctx.fill();

    // roof
    ctx.fillStyle = isPlayer ? '#ffffff30' : '#00000030';
    ctx.beginPath();
    ctx.roundRect(x + 10, y + 14, CAR_W - 20, CAR_H * 0.4, 4);
    ctx.fill();

    // windshield
    ctx.fillStyle = isPlayer ? '#7dd3fc80' : '#60a5fa40';
    ctx.beginPath();
    ctx.roundRect(x + 10, y + 10, CAR_W - 20, 20, 3);
    ctx.fill();

    // wheels
    ctx.fillStyle = '#1a1a1a';
    ctx.shadowBlur = 0;
    [[x, y + 10], [x + CAR_W - 6, y + 10], [x, y + CAR_H - 20], [x + CAR_W - 6, y + CAR_H - 20]].forEach(([wx, wy]) => {
      ctx.beginPath();
      ctx.roundRect(wx, wy as number, 8, 16, 2);
      ctx.fill();
    });

    // headlights / taillights
    if (isPlayer) {
      ctx.fillStyle = '#facc15';
      ctx.shadowColor = '#facc15'; ctx.shadowBlur = 10;
      ctx.fillRect(x + 6, y, 8, 5);
      ctx.fillRect(x + CAR_W - 14, y, 8, 5);
    }
    ctx.fillStyle = isPlayer ? '#f43f5e' : '#22c55e50';
    ctx.shadowColor = isPlayer ? '#f43f5e' : '#22c55e';
    ctx.shadowBlur = 8;
    ctx.fillRect(x + 6, y + CAR_H - 5, 8, 5);
    ctx.fillRect(x + CAR_W - 14, y + CAR_H - 5, 8, 5);
    ctx.shadowBlur = 0;

    // speed stripes for fast cars
    if (carType === 'fast') {
      ctx.strokeStyle = '#fff4';
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(x + 4, y + 30); ctx.lineTo(x + 4, y + 55); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x + CAR_W - 4, y + 30); ctx.lineTo(x + CAR_W - 4, y + 55); ctx.stroke();
    }
  };

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

    // road
    ctx.fillStyle = '#1c1c2e';
    ctx.fillRect(ROAD_LEFT, 0, CANVAS_W, CANVAS_H);

    // road edges
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 5;
    ctx.shadowBlur = 8; ctx.shadowColor = '#f59e0b';
    ctx.beginPath(); ctx.moveTo(ROAD_LEFT + 3, 0); ctx.lineTo(ROAD_LEFT + 3, CANVAS_H); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(CANVAS_W - 3, 0); ctx.lineTo(CANVAS_W - 3, CANVAS_H); ctx.stroke();
    ctx.shadowBlur = 0;

    // lane dividers (scrolling)
    ctx.setLineDash([40, 25]);
    ctx.strokeStyle = '#ffffff22';
    ctx.lineWidth = 2;
    const stripeOff = frameRef.current * speedRef.current * 0.6 % 65;
    for (let lane = 1; lane < LANES; lane++) {
      const lx = ROAD_LEFT + lane * LANE_W;
      ctx.beginPath();
      for (let y = -65 + stripeOff; y < CANVAS_H; y += 65) {
        ctx.moveTo(lx, y);
        ctx.lineTo(lx, y + 40);
      }
      ctx.stroke();
    }
    ctx.setLineDash([]);

    // power ups
    powerUpsRef.current.forEach(pu => {
      if (!pu.active) return;
      const pux = getLaneX(pu.lane) + CAR_W / 2;
      const pulse = Math.sin(frameRef.current * 0.1) * 3;
      ctx.shadowBlur = 20;
      ctx.shadowColor = pu.type === 'shield' ? '#22d3ee' : '#facc15';
      ctx.fillStyle = pu.type === 'shield' ? '#22d3ee33' : '#facc1533';
      ctx.beginPath();
      ctx.arc(pux, pu.y, 22 + pulse, 0, Math.PI * 2);
      ctx.fill();
      ctx.font = '20px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(pu.type === 'shield' ? '🛡' : '⚡', pux, pu.y + pulse);
      ctx.shadowBlur = 0;
    });

    // traffic
    trafficRef.current.forEach(car => {
      drawCar(ctx, getLaneX(car.lane), car.y, car.color, false, car.type);
    });

    // player
    const px = getLaneX(laneRef.current);
    const py = playerYRef.current;
    const pcolor = shieldRef.current ? '#22d3ee' : '#a855f7';
    if (shieldRef.current) {
      ctx.strokeStyle = '#22d3ee66';
      ctx.lineWidth = 3;
      ctx.shadowBlur = 20; ctx.shadowColor = '#22d3ee';
      ctx.beginPath(); ctx.arc(px + CAR_W / 2, py + CAR_H / 2, CAR_W * 0.85, 0, Math.PI * 2); ctx.stroke();
      ctx.shadowBlur = 0;
    }
    // engine exhaust
    const exhaust = Math.sin(frameRef.current * 0.4) * 4;
    ctx.fillStyle = boostRef.current ? '#facc1580' : '#7c3aed50';
    ctx.shadowBlur = 10; ctx.shadowColor = boostRef.current ? '#facc15' : '#7c3aed';
    ctx.beginPath(); ctx.ellipse(px + 12, py + CAR_H + exhaust, 6, 10 + exhaust, 0, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(px + CAR_W - 12, py + CAR_H + exhaust, 6, 10 + exhaust, 0, 0, Math.PI * 2); ctx.fill();
    ctx.shadowBlur = 0;

    drawCar(ctx, px, py, pcolor, true);

    // particles
    particlesRef.current.forEach(p => {
      ctx.globalAlpha = p.life;
      ctx.fillStyle = p.color;
      ctx.shadowBlur = 5; ctx.shadowColor = p.color;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2); ctx.fill();
      ctx.shadowBlur = 0;
    });
    ctx.globalAlpha = 1;

    // HUD
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(6, 6, 160, 48);
    ctx.fillStyle = '#d8b4fe';
    ctx.font = 'bold 18px monospace';
    ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    ctx.fillText(`${scoreRef.current.toLocaleString()}`, 14, 22);
    ctx.font = '12px monospace';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText(`${Math.round(speedRef.current * 10)} km/h`, 14, 44);

    // speed bar
    const barW = 148;
    const maxS = cfg.maxSpeed;
    const pct = Math.min((speedRef.current - cfg.startSpeed) / (maxS - cfg.startSpeed), 1);
    ctx.fillStyle = '#ffffff15';
    ctx.fillRect(CANVAS_W - 160, 6, barW, 10);
    const sg = ctx.createLinearGradient(CANVAS_W - 160, 0, CANVAS_W - 160 + barW * pct, 0);
    sg.addColorStop(0, '#22c55e'); sg.addColorStop(0.5, '#facc15'); sg.addColorStop(1, '#f43f5e');
    ctx.fillStyle = sg;
    ctx.fillRect(CANVAS_W - 160, 6, barW * pct, 10);
    ctx.fillStyle = '#94a3b8';
    ctx.font = '10px monospace';
    ctx.textAlign = 'right';
    ctx.fillText('SPEED', CANVAS_W - 6, 22);

    if (boostRef.current) {
      ctx.fillStyle = '#facc15';
      ctx.font = 'bold 15px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('⚡ BOOST!', CANVAS_W / 2, 20);
    }
  }, [cfg]);

  const gameLoop = useCallback(() => {
    if (gameOverRef.current) return;
    frameRef.current++;
    const s = boostRef.current ? speedRef.current * 1.6 : speedRef.current;

    // accelerate
    if (!boostRef.current) {
      speedRef.current = Math.min(cfg.maxSpeed, speedRef.current + cfg.accel);
      if (frameRef.current % 20 === 0) setSpeed(Math.round(speedRef.current * 10) / 10);
    }

    distRef.current += s;
    scoreRef.current = Math.floor(distRef.current / 5);
    if (frameRef.current % 30 === 0) setScore(scoreRef.current);
    if (frameRef.current % 600 === 0) setLap(l => l + 1);

    // player lane movement
    moveCoolRef.current = Math.max(0, moveCoolRef.current - 1);
    if (moveCoolRef.current === 0) {
      if ((keysRef.current['ArrowLeft'] || keysRef.current['a']) && laneRef.current > 0) {
        laneRef.current--;
        moveCoolRef.current = 12;
        spawnParticles(getLaneX(laneRef.current + 1) + CAR_W / 2, playerYRef.current + CAR_H / 2, '#a855f7', 6);
      }
      if ((keysRef.current['ArrowRight'] || keysRef.current['d']) && laneRef.current < LANES - 1) {
        laneRef.current++;
        moveCoolRef.current = 12;
        spawnParticles(getLaneX(laneRef.current - 1) + CAR_W / 2, playerYRef.current + CAR_H / 2, '#a855f7', 6);
      }
    }

    // spawn traffic
    if (frameRef.current % cfg.spawnRate === 0) {
      const usedLanes = trafficRef.current.filter(c => c.y < 80).map(c => c.lane);
      const available = [0, 1, 2, 3].filter(l => !usedLanes.includes(l));
      if (available.length > 0) {
        const lane = available[Math.floor(Math.random() * available.length)];
        const types: TrafficCar['type'][] = ['slow', 'normal', 'fast'];
        const type = types[Math.floor(Math.random() * types.length)];
        const speedMap = { slow: s * 0.3, normal: s * 0.55, fast: s * 0.8 };
        trafficRef.current.push({
          lane, y: -CAR_H - 20,
          color: CAR_COLORS[Math.floor(Math.random() * CAR_COLORS.length)],
          speed: speedMap[type],
          type,
        });
      }
    }

    // spawn power-ups
    if (frameRef.current % 280 === 140) {
      const lane = Math.floor(Math.random() * LANES);
      powerUpsRef.current.push({ lane, y: -30, type: Math.random() > 0.5 ? 'shield' : 'boost', active: true });
    }

    // move traffic
    trafficRef.current.forEach(car => { car.y += s - car.speed; });
    trafficRef.current = trafficRef.current.filter(c => c.y < CANVAS_H + 100);

    // move power-ups
    powerUpsRef.current.forEach(pu => { pu.y += s * 0.6; });
    powerUpsRef.current = powerUpsRef.current.filter(p => p.y < CANVAS_H + 50);

    // collision with traffic
    if (!invincRef.current) {
      const px = getLaneX(laneRef.current);
      const py = playerYRef.current;
      trafficRef.current = trafficRef.current.filter(car => {
        const cx = getLaneX(car.lane);
        const margin = 10;
        const hit =
          px + margin < cx + CAR_W - margin &&
          px + CAR_W - margin > cx + margin &&
          py + margin < car.y + CAR_H - margin &&
          py + CAR_H - margin > car.y + margin;
        if (hit) {
          spawnParticles(cx + CAR_W / 2, car.y + CAR_H / 2, car.color, 16);
          if (shieldRef.current) {
            shieldRef.current = false; setShield(false);
          } else {
            livesRef.current--;
            setLives(livesRef.current);
            invincRef.current = true;
            setTimeout(() => { invincRef.current = false; }, 1800);
            if (livesRef.current <= 0) {
              gameOverRef.current = true;
              setGameOver(true);
              const lbp = Math.floor(scoreRef.current * cfg.multiplier);
              saveGameScore('pixelracer', scoreRef.current, lbp, difficulty);
              onGameOver?.(scoreRef.current, lbp);
            }
          }
          return false;
        }
        return true;
      });
    }

    // power-up collection
    const px = getLaneX(laneRef.current);
    const py = playerYRef.current;
    powerUpsRef.current.forEach(pu => {
      if (!pu.active) return;
      const pux = getLaneX(pu.lane) + CAR_W / 2;
      const puy = pu.y;
      const dx = (px + CAR_W / 2) - pux;
      const dy = (py + CAR_H / 2) - puy;
      if (Math.sqrt(dx * dx + dy * dy) < 36) {
        pu.active = false;
        if (pu.type === 'shield') {
          shieldRef.current = true; setShield(true);
          spawnParticles(pux, puy, '#22d3ee', 12);
        } else {
          boostRef.current = true; setBoost(true);
          spawnParticles(pux, puy, '#facc15', 14);
          setTimeout(() => { boostRef.current = false; setBoost(false); }, 4000);
        }
      }
    });

    // particles
    particlesRef.current.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.vy += 0.08; p.life -= 0.03;
    });
    particlesRef.current = particlesRef.current.filter(p => p.life > 0);

    draw();
    rafRef.current = requestAnimationFrame(gameLoop);
  }, [cfg, difficulty, draw, onGameOver]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [gameLoop]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      keysRef.current[e.key] = true;
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') e.preventDefault();
    };
    const up = (e: KeyboardEvent) => { keysRef.current[e.key] = false; };
    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    return () => { window.removeEventListener('keydown', down); window.removeEventListener('keyup', up); };
  }, []);

  const handleRestart = () => {
    trafficRef.current = []; particlesRef.current = []; powerUpsRef.current = [];
    frameRef.current = 0; scoreRef.current = 0; distRef.current = 0;
    livesRef.current = cfg.lives; speedRef.current = cfg.startSpeed;
    laneRef.current = 1; shieldRef.current = false; boostRef.current = false;
    gameOverRef.current = false; invincRef.current = false; moveCoolRef.current = 0;
    setScore(0); setLives(cfg.lives); setSpeed(cfg.startSpeed); setGameOver(false);
    setShield(false); setBoost(false); setLap(0);
    rafRef.current = requestAnimationFrame(gameLoop);
  };

  const lbp = Math.floor(score * cfg.multiplier);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
      <header className="bg-[#0f0f1a] border-b border-amber-900/50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <Home className="w-5 h-5" /> Back
          </button>
          <h1 className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
            PIXEL RACER
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-gray-800 px-3 py-1.5 rounded text-sm">
            <span className="text-gray-400">LB: </span><span className="text-green-400 font-bold">{lbp.toLocaleString()}</span>
          </div>
          <button onClick={onOpenSettings} className="w-9 h-9 rounded-full bg-gray-700 flex items-center justify-center hover:bg-gray-600">
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="flex gap-6 items-start">
          {/* Left */}
          <div className="w-52 space-y-3">
            <div className="bg-[#0f0f1a] rounded-xl p-4 border border-amber-900/50">
              <div className="flex items-center gap-2 mb-2"><Trophy className="w-4 h-4 text-yellow-500" /><span className="text-xs text-gray-400">Score</span></div>
              <div className="text-3xl font-bold text-yellow-400">{score.toLocaleString()}</div>
              <div className="text-xs text-gray-500 mt-1">LB: <span className="text-green-400">{lbp.toLocaleString()}</span></div>
            </div>
            <div className="bg-[#0f0f1a] rounded-xl p-4 border border-amber-900/50 space-y-2.5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Lives</span>
                <div className="flex gap-1">{Array.from({ length: lives }).map((_, i) => <Heart key={i} className="w-4 h-4 fill-red-500 text-red-500" />)}</div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400 flex items-center gap-1"><Gauge className="w-3 h-3" /> Speed</span>
                <span className="text-orange-400 font-bold">{Math.round(speed * 10)} km/h</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Mode</span><span className="text-white">{cfg.name}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Mult</span><span className="text-purple-400 font-bold">{cfg.multiplier}x</span>
              </div>
            </div>
            {shield && (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                className="bg-cyan-900/40 border border-cyan-500 rounded-xl p-3 text-center text-sm text-cyan-400">
                🛡 Shield Active!
              </motion.div>
            )}
            {boost && (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                className="bg-yellow-900/40 border border-yellow-500 rounded-xl p-3 text-center text-sm text-yellow-400">
                ⚡ Boost Active!
              </motion.div>
            )}
            <div className="bg-[#0f0f1a] rounded-xl p-4 border border-amber-900/50 text-xs text-gray-400 space-y-1.5">
              <div className="font-medium text-gray-300 mb-2">Controls</div>
              <div><span className="font-mono bg-gray-700 px-1 rounded">← →</span> Switch lane</div>
              <div><span className="font-mono bg-gray-700 px-1 rounded">A / D</span> Switch lane</div>
            </div>
          </div>

          {/* Canvas */}
          <div className="relative">
            <div className="rounded-xl overflow-hidden border-2 border-amber-700 shadow-2xl shadow-amber-900/30">
              <canvas ref={canvasRef} width={CANVAS_W} height={CANVAS_H} className="block" />
            </div>
            <AnimatePresence>
              {gameOver && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-black/90 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <Award className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
                    <h2 className="text-4xl font-bold mb-4">RACE OVER!</h2>
                    <div className="bg-gray-800 rounded-lg p-5 mb-5 space-y-2">
                      <div className="text-2xl font-bold text-yellow-400">{score.toLocaleString()} pts</div>
                      <div className="text-gray-400 text-sm">{cfg.name} • {Math.round(speed * 10)} km/h peak</div>
                      <div className="pt-3 border-t border-gray-700">
                        <div className="text-xs text-gray-500">Leaderboard Points</div>
                        <div className="text-3xl font-bold text-green-400">{lbp.toLocaleString()}</div>
                      </div>
                    </div>
                    <div className="flex gap-3 justify-center">
                      <motion.button onClick={handleRestart} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                        className="bg-gradient-to-r from-yellow-600 to-orange-600 px-5 py-3 rounded-lg flex items-center gap-2">
                        <RotateCcw className="w-4 h-4" /> Race Again
                      </motion.button>
                      <motion.button onClick={onBack} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                        className="bg-gray-700 px-5 py-3 rounded-lg flex items-center gap-2">
                        <Home className="w-4 h-4" /> Menu
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right */}
          <div className="w-52 space-y-3">
            <div className="bg-[#0f0f1a] rounded-xl p-4 border border-amber-900/50">
              <h3 className="text-sm font-medium mb-3 flex items-center gap-2"><Zap className="w-4 h-4 text-yellow-400" />Power-Ups</h3>
              <div className="space-y-2 text-xs text-gray-400">
                <div className="flex items-center gap-2"><span>🛡</span><span>Shield — absorbs one crash</span></div>
                <div className="flex items-center gap-2"><span>⚡</span><span>Boost — 4s speed surge</span></div>
              </div>
            </div>
            <div className="bg-[#0f0f1a] rounded-xl p-4 border border-amber-900/50">
              <h3 className="text-sm font-medium mb-3 flex items-center gap-2"><TrendingUp className="w-4 h-4 text-orange-400" />Traffic Types</h3>
              <div className="space-y-2 text-xs text-gray-400">
                <div className="flex justify-between"><span>🐢 Slow</span><span className="text-green-400">Easy dodge</span></div>
                <div className="flex justify-between"><span>🚗 Normal</span><span className="text-yellow-400">Watch out</span></div>
                <div className="flex justify-between"><span>🏎 Fast</span><span className="text-red-400">Danger!</span></div>
              </div>
            </div>
            <div className="bg-[#0f0f1a] rounded-xl p-4 border border-amber-900/50 text-xs text-gray-400 space-y-1">
              <div className="font-medium text-gray-300 mb-2">Scoring</div>
              <p>Score increases with distance. Speed increases over time — the longer you survive, the faster it gets!</p>
            </div>
            <motion.button onClick={handleRestart}
              className="w-full bg-gray-700 py-2.5 rounded-lg flex items-center justify-center gap-2 text-sm"
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <RotateCcw className="w-4 h-4" /> Restart
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
