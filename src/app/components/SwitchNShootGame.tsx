import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Home, Settings, Trophy, RotateCcw, Heart, Award, TrendingUp, Zap } from 'lucide-react';
import { saveGameScore } from '../utils/gameConfig';

interface SwitchNShootGameProps {
  onBack: () => void;
  onOpenSettings?: () => void;
  difficulty: 'easy' | 'medium' | 'hard';
  onGameOver?: (score: number, leaderboardPoints: number) => void;
}

const CANVAS_W = 500;
const CANVAS_H = 650;
const PLAYER_Y = CANVAS_H - 80;
const PLAYER_W = 50;
const PLAYER_H = 36;
const BULLET_SPEED = 10;

const COLORS = ['#a855f7', '#f43f5e', '#22d3ee', '#facc15'];
const COLOR_NAMES = ['Purple', 'Red', 'Cyan', 'Yellow'];

const DIFFICULTY_SETTINGS = {
  easy:   { enemySpeed: 1.2, spawnRate: 90, multiplier: 1.0, name: 'Easy',   lives: 5, bulletCooldown: 18 },
  medium: { enemySpeed: 1.8, spawnRate: 65, multiplier: 1.5, name: 'Medium', lives: 3, bulletCooldown: 14 },
  hard:   { enemySpeed: 2.6, spawnRate: 45, multiplier: 2.0, name: 'Hard',   lives: 2, bulletCooldown: 10 },
};

type Enemy = { x: number; y: number; colorIdx: number; size: number; speed: number; hp: number };
type Bullet = { x: number; y: number; colorIdx: number; speed: number };
type Particle = { x: number; y: number; vx: number; vy: number; life: number; color: string; size: number };

export function SwitchNShootGame({ onBack, onOpenSettings, difficulty, onGameOver }: SwitchNShootGameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cfg = DIFFICULTY_SETTINGS[difficulty];

  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(cfg.lives);
  const [gameOver, setGameOver] = useState(false);
  const [colorIdx, setColorIdx] = useState(0);
  const [combo, setCombo] = useState(0);

  const playerXRef = useRef(CANVAS_W / 2 - PLAYER_W / 2);
  const colorIdxRef = useRef(0);
  const enemiesRef = useRef<Enemy[]>([]);
  const bulletsRef = useRef<Bullet[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const frameRef = useRef(0);
  const scoreRef = useRef(0);
  const livesRef = useRef(cfg.lives);
  const comboRef = useRef(0);
  const comboTimerRef = useRef(0);
  const bulletCooldownRef = useRef(0);
  const gameOverRef = useRef(false);
  const rafRef = useRef<number>(0);
  const keysRef = useRef<Record<string, boolean>>({});

  const spawnParticles = (x: number, y: number, color: string, count = 10) => {
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 / count) * i + Math.random() * 0.5;
      particlesRef.current.push({
        x, y,
        vx: Math.cos(angle) * (2 + Math.random() * 4),
        vy: Math.sin(angle) * (2 + Math.random() * 4),
        life: 1,
        color,
        size: 3 + Math.random() * 4,
      });
    }
  };

  const fireCurrentColor = useCallback(() => {
    if (bulletCooldownRef.current > 0) return;
    bulletsRef.current.push({
      x: playerXRef.current + PLAYER_W / 2,
      y: PLAYER_Y - 10,
      colorIdx: colorIdxRef.current,
      speed: BULLET_SPEED,
    });
    bulletCooldownRef.current = cfg.bulletCooldown;
  }, [cfg.bulletCooldown]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    ctx.fillStyle = '#06060f';
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

    // starfield bg
    const starSeed = frameRef.current;
    for (let i = 0; i < 60; i++) {
      const sx = ((i * 137 + 11) % CANVAS_W);
      const sy = ((i * 71 + starSeed * 0.15 * (i % 3 + 1)) % CANVAS_H + CANVAS_H) % CANVAS_H;
      const alpha = 0.2 + (Math.sin(starSeed * 0.05 + i) * 0.5 + 0.5) * 0.3;
      ctx.fillStyle = `rgba(255,255,255,${alpha})`;
      ctx.fillRect(sx, sy, 1.5, 1.5);
    }

    // bottom platform glow
    const activeColor = COLORS[colorIdxRef.current];
    ctx.shadowBlur = 20;
    ctx.shadowColor = activeColor;
    ctx.strokeStyle = activeColor;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, PLAYER_Y + PLAYER_H + 6);
    ctx.lineTo(CANVAS_W, PLAYER_Y + PLAYER_H + 6);
    ctx.stroke();
    ctx.shadowBlur = 0;

    // enemies
    enemiesRef.current.forEach(e => {
      const ecolor = COLORS[e.colorIdx];
      ctx.shadowBlur = 12;
      ctx.shadowColor = ecolor;
      ctx.fillStyle = ecolor;
      ctx.beginPath();
      // hexagonal enemy
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 6;
        const ex = e.x + Math.cos(angle) * e.size;
        const ey = e.y + Math.sin(angle) * e.size;
        if (i === 0) ctx.moveTo(ex, ey); else ctx.lineTo(ex, ey);
      }
      ctx.closePath();
      ctx.fill();
      // inner circle
      ctx.fillStyle = '#ffffff30';
      ctx.beginPath();
      ctx.arc(e.x, e.y, e.size * 0.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    // bullets
    bulletsRef.current.forEach(b => {
      const bcolor = COLORS[b.colorIdx];
      ctx.shadowBlur = 14;
      ctx.shadowColor = bcolor;
      ctx.fillStyle = bcolor;
      ctx.beginPath();
      ctx.roundRect(b.x - 4, b.y - 12, 8, 22, 4);
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    // player
    const px = playerXRef.current;
    ctx.shadowBlur = 20;
    ctx.shadowColor = activeColor;
    // ship body
    ctx.fillStyle = activeColor;
    ctx.beginPath();
    ctx.moveTo(px + PLAYER_W / 2, PLAYER_Y - 10);
    ctx.lineTo(px + PLAYER_W, PLAYER_Y + PLAYER_H);
    ctx.lineTo(px + PLAYER_W * 0.75, PLAYER_Y + PLAYER_H - 8);
    ctx.lineTo(px + PLAYER_W / 2, PLAYER_Y + PLAYER_H + 2);
    ctx.lineTo(px + PLAYER_W * 0.25, PLAYER_Y + PLAYER_H - 8);
    ctx.lineTo(px, PLAYER_Y + PLAYER_H);
    ctx.closePath();
    ctx.fill();
    // cockpit
    ctx.fillStyle = '#ffffff50';
    ctx.beginPath();
    ctx.ellipse(px + PLAYER_W / 2, PLAYER_Y + 10, 10, 14, 0, 0, Math.PI * 2);
    ctx.fill();
    // engine glow
    const enginePulse = Math.sin(frameRef.current * 0.3) * 4;
    ctx.fillStyle = activeColor + '80';
    ctx.beginPath();
    ctx.ellipse(px + PLAYER_W / 2, PLAYER_Y + PLAYER_H + 6 + enginePulse, 8, 6 + enginePulse, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // particles
    particlesRef.current.forEach(p => {
      ctx.globalAlpha = p.life;
      ctx.fillStyle = p.color;
      ctx.shadowBlur = 6; ctx.shadowColor = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    });
    ctx.globalAlpha = 1;

    // HUD: color indicators at top
    const btnW = 80, btnGap = 12;
    const totalW = COLORS.length * btnW + (COLORS.length - 1) * btnGap;
    const startX = (CANVAS_W - totalW) / 2;
    COLORS.forEach((c, i) => {
      const bx = startX + i * (btnW + btnGap);
      const isActive = i === colorIdxRef.current;
      ctx.fillStyle = isActive ? c : c + '40';
      ctx.strokeStyle = c;
      ctx.lineWidth = isActive ? 2 : 1;
      ctx.shadowBlur = isActive ? 15 : 0;
      ctx.shadowColor = c;
      ctx.beginPath();
      ctx.roundRect(bx, 10, btnW, 28, 6);
      ctx.fill();
      ctx.stroke();
      ctx.shadowBlur = 0;
      ctx.fillStyle = isActive ? '#fff' : c + 'bb';
      ctx.font = `bold ${isActive ? 13 : 11}px monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`[${i + 1}] ${COLOR_NAMES[i]}`, bx + btnW / 2, 24);
    });

    // score
    ctx.fillStyle = '#d8b4fe';
    ctx.font = 'bold 18px monospace';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${scoreRef.current}`, 12, 60);
    if (comboRef.current > 1) {
      ctx.fillStyle = '#facc15';
      ctx.font = `bold ${14 + comboRef.current}px monospace`;
      ctx.fillText(`${comboRef.current}x COMBO!`, 12, 82);
    }

    // lives
    ctx.textAlign = 'right';
    ctx.font = '16px monospace';
    ctx.fillStyle = '#f43f5e';
    ctx.fillText('♥'.repeat(livesRef.current), CANVAS_W - 12, 60);
  }, []);

  const gameLoop = useCallback(() => {
    if (gameOverRef.current) return;
    frameRef.current++;
    const cfg_local = DIFFICULTY_SETTINGS[difficulty];
    const speedMult = 1 + Math.floor(frameRef.current / 600) * 0.08;

    // player movement
    const moveSpeed = 5;
    if (keysRef.current['ArrowLeft'] || keysRef.current['a']) playerXRef.current = Math.max(0, playerXRef.current - moveSpeed);
    if (keysRef.current['ArrowRight'] || keysRef.current['d']) playerXRef.current = Math.min(CANVAS_W - PLAYER_W, playerXRef.current + moveSpeed);

    // auto fire when space held
    if (keysRef.current[' ']) fireCurrentColor();

    bulletCooldownRef.current = Math.max(0, bulletCooldownRef.current - 1);
    comboTimerRef.current = Math.max(0, comboTimerRef.current - 1);
    if (comboTimerRef.current === 0 && comboRef.current > 0) {
      comboRef.current = 0;
      setCombo(0);
    }

    // spawn enemies
    if (frameRef.current % cfg_local.spawnRate === 0) {
      const cIdx = Math.floor(Math.random() * COLORS.length);
      const size = 16 + Math.random() * 12;
      enemiesRef.current.push({
        x: size + Math.random() * (CANVAS_W - size * 2),
        y: -size,
        colorIdx: cIdx,
        size,
        speed: cfg_local.enemySpeed * speedMult,
        hp: 1,
      });
    }

    // move bullets
    bulletsRef.current.forEach(b => { b.y -= b.speed; });
    bulletsRef.current = bulletsRef.current.filter(b => b.y > -20);

    // move enemies
    enemiesRef.current.forEach(e => { e.y += e.speed; });

    // bullet-enemy collision
    bulletsRef.current = bulletsRef.current.filter(b => {
      let hit = false;
      enemiesRef.current = enemiesRef.current.filter(e => {
        const dx = b.x - e.x, dy = b.y - e.y;
        if (Math.sqrt(dx * dx + dy * dy) < e.size + 6 && b.colorIdx === e.colorIdx) {
          e.hp--;
          hit = true;
          spawnParticles(e.x, e.y, COLORS[e.colorIdx], 14);
          if (e.hp <= 0) {
            const pts = Math.round(10 * (1 + comboRef.current * 0.2));
            scoreRef.current += pts;
            comboRef.current++;
            comboTimerRef.current = 90;
            setScore(scoreRef.current);
            setCombo(comboRef.current);
            return false;
          }
        }
        return true;
      });
      return !hit;
    });

    // enemy reach bottom
    enemiesRef.current = enemiesRef.current.filter(e => {
      if (e.y > PLAYER_Y + PLAYER_H + e.size) {
        spawnParticles(e.x, PLAYER_Y, '#f43f5e', 10);
        livesRef.current--;
        setLives(livesRef.current);
        comboRef.current = 0; setCombo(0);
        if (livesRef.current <= 0) {
          gameOverRef.current = true;
          setGameOver(true);
          const lbp = Math.floor(scoreRef.current * cfg_local.multiplier);
          saveGameScore('switchnshoot', scoreRef.current, lbp, difficulty);
          onGameOver?.(scoreRef.current, lbp);
        }
        return false;
      }
      return true;
    });

    // particles
    particlesRef.current.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.vy += 0.1; p.life -= 0.025;
    });
    particlesRef.current = particlesRef.current.filter(p => p.life > 0);

    draw();
    rafRef.current = requestAnimationFrame(gameLoop);
  }, [difficulty, draw, fireCurrentColor, onGameOver]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [gameLoop]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      keysRef.current[e.key] = true;
      // color switch
      if (e.key === '1') { colorIdxRef.current = 0; setColorIdx(0); }
      if (e.key === '2') { colorIdxRef.current = 1; setColorIdx(1); }
      if (e.key === '3') { colorIdxRef.current = 2; setColorIdx(2); }
      if (e.key === '4') { colorIdxRef.current = 3; setColorIdx(3); }
      if (e.key === 'q') { colorIdxRef.current = (colorIdxRef.current - 1 + COLORS.length) % COLORS.length; setColorIdx(colorIdxRef.current); }
      if (e.key === 'e') { colorIdxRef.current = (colorIdxRef.current + 1) % COLORS.length; setColorIdx(colorIdxRef.current); }
      if (e.key === ' ') { e.preventDefault(); fireCurrentColor(); }
    };
    const up = (e: KeyboardEvent) => { keysRef.current[e.key] = false; };
    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    return () => { window.removeEventListener('keydown', down); window.removeEventListener('keyup', up); };
  }, [fireCurrentColor]);

  const handleRestart = () => {
    enemiesRef.current = []; bulletsRef.current = []; particlesRef.current = [];
    playerXRef.current = CANVAS_W / 2 - PLAYER_W / 2;
    colorIdxRef.current = 0;
    frameRef.current = 0; scoreRef.current = 0;
    livesRef.current = cfg.lives;
    comboRef.current = 0; comboTimerRef.current = 0; bulletCooldownRef.current = 0;
    gameOverRef.current = false;
    setScore(0); setLives(cfg.lives); setGameOver(false); setColorIdx(0); setCombo(0);
    rafRef.current = requestAnimationFrame(gameLoop);
  };

  const lbp = Math.floor(score * cfg.multiplier);

  return (
    <div className="min-h-screen bg-[#06060f] text-white flex flex-col">
      <header className="bg-[#0a0a18] border-b border-purple-900/50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <Home className="w-5 h-5" /> Back
          </button>
          <h1 className="text-xl font-bold" style={{color: COLORS[colorIdx]}}>SWITCH 'N' SHOOT</h1>
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
            <div className="bg-[#0a0a18] rounded-xl p-4 border border-purple-900/50">
              <div className="flex items-center gap-2 mb-2"><Trophy className="w-4 h-4 text-yellow-500" /><span className="text-xs text-gray-400">Score</span></div>
              <div className="text-3xl font-bold text-purple-400">{score.toLocaleString()}</div>
              <div className="text-xs text-gray-500 mt-1">LB: <span className="text-green-400">{lbp.toLocaleString()}</span></div>
              {combo > 1 && <div className="text-yellow-400 font-bold text-sm mt-2">🔥 {combo}x Combo!</div>}
            </div>
            <div className="bg-[#0a0a18] rounded-xl p-4 border border-purple-900/50 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Lives</span>
                <div className="flex gap-1">{Array.from({length:lives}).map((_,i)=><Heart key={i} className="w-4 h-4 fill-red-500 text-red-500"/>)}</div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Mode</span><span className="text-white">{cfg.name}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Mult</span><span className="text-purple-400 font-bold">{cfg.multiplier}x</span>
              </div>
            </div>
            {/* color picker */}
            <div className="bg-[#0a0a18] rounded-xl p-4 border border-purple-900/50">
              <div className="text-xs text-gray-400 mb-3 font-medium">Active Color</div>
              <div className="grid grid-cols-2 gap-2">
                {COLORS.map((c, i) => (
                  <button key={i} onClick={() => { colorIdxRef.current = i; setColorIdx(i); }}
                    className="py-2 rounded-lg text-xs font-bold transition-all"
                    style={{
                      background: i === colorIdx ? c : c + '22',
                      border: `1px solid ${c}`,
                      color: i === colorIdx ? '#fff' : c,
                    }}>
                    [{i+1}] {COLOR_NAMES[i]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Canvas */}
          <div className="relative">
            <div className="rounded-xl overflow-hidden border-2 shadow-2xl" style={{borderColor: COLORS[colorIdx], boxShadow: `0 0 30px ${COLORS[colorIdx]}44`}}>
              <canvas ref={canvasRef} width={CANVAS_W} height={CANVAS_H} className="block" />
            </div>
            <AnimatePresence>
              {gameOver && (
                <motion.div initial={{opacity:0}} animate={{opacity:1}}
                  className="absolute inset-0 bg-black/90 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <Award className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
                    <h2 className="text-4xl font-bold mb-4">GAME OVER</h2>
                    <div className="bg-gray-800 rounded-lg p-5 mb-5 space-y-2">
                      <div className="text-2xl font-bold text-purple-400">{score.toLocaleString()} pts</div>
                      <div className="text-gray-400 text-sm">{cfg.name} • Best combo: {combo}x</div>
                      <div className="pt-3 border-t border-gray-700">
                        <div className="text-xs text-gray-500">Leaderboard Points</div>
                        <div className="text-3xl font-bold text-green-400">{lbp.toLocaleString()}</div>
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
          </div>

          {/* Right */}
          <div className="w-52 space-y-3">
            <div className="bg-[#0a0a18] rounded-xl p-4 border border-purple-900/50">
              <h3 className="text-sm font-medium mb-3 flex items-center gap-2"><Zap className="w-4 h-4 text-yellow-400"/>Controls</h3>
              <div className="space-y-2 text-xs text-gray-400">
                <div><span className="font-mono bg-gray-700 px-1 rounded">← →</span> Move ship</div>
                <div><span className="font-mono bg-gray-700 px-1 rounded">SPACE</span> Shoot</div>
                <div><span className="font-mono bg-gray-700 px-1 rounded">1 2 3 4</span> Switch color</div>
                <div><span className="font-mono bg-gray-700 px-1 rounded">Q / E</span> Cycle color</div>
              </div>
            </div>
            <div className="bg-[#0a0a18] rounded-xl p-4 border border-purple-900/50">
              <h3 className="text-sm font-medium mb-3 flex items-center gap-2"><TrendingUp className="w-4 h-4 text-purple-400"/>Rules</h3>
              <div className="text-xs text-gray-400 space-y-2">
                <p>Match your bullet color to the enemy color to destroy it!</p>
                <p>Wrong colors do nothing. Build combos for bonus points.</p>
                <p className="text-orange-400">Don't let enemies reach the bottom!</p>
              </div>
            </div>
            <motion.button onClick={handleRestart}
              className="w-full bg-gray-700 py-2.5 rounded-lg flex items-center justify-center gap-2 text-sm"
              whileHover={{scale:1.03}} whileTap={{scale:0.97}}>
              <RotateCcw className="w-4 h-4" /> Restart
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
