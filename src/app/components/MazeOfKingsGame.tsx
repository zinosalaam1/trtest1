import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Home, Settings, Trophy, RotateCcw, Pause, Play, Heart, Award, Key, Zap } from 'lucide-react';
import { saveGameScore } from '../utils/gameConfig';

interface MazeOfKingsGameProps {
  onBack: () => void;
  onOpenSettings?: () => void;
  difficulty: 'easy' | 'medium' | 'hard';
  onGameOver?: (score: number, leaderboardPoints: number) => void;
}

const CELL = 36;
const COLS = 19;
const ROWS = 15;
const CANVAS_W = COLS * CELL;
const CANVAS_H = ROWS * CELL;

const DIFFICULTY_SETTINGS = {
  easy:   { enemySpeed: 220, lives: 3, keysNeeded: 3, multiplier: 1.0, name: 'Easy' },
  medium: { enemySpeed: 160, lives: 3, keysNeeded: 5, multiplier: 1.5, name: 'Medium' },
  hard:   { enemySpeed: 110, lives: 2, keysNeeded: 7, multiplier: 2.0, name: 'Hard' },
};

// 0=path, 1=wall
const BASE_MAZE: number[][] = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,1],
  [1,0,1,0,1,0,1,1,0,1,0,1,1,0,1,0,1,0,1],
  [1,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,1],
  [1,0,1,1,1,1,0,1,0,1,0,1,0,1,1,1,1,0,1],
  [1,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,1],
  [1,1,1,0,1,1,0,1,1,0,1,1,0,1,1,0,1,1,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,0,1,1,0,1,1,0,1,1,0,1,1,0,1,1,1],
  [1,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,1],
  [1,0,1,1,1,1,0,1,0,1,0,1,0,1,1,1,1,0,1],
  [1,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,1],
  [1,0,1,0,1,0,1,1,0,1,0,1,1,0,1,0,1,0,1],
  [1,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];

type Pos = { col: number; row: number };
type Enemy = { col: number; row: number; dir: Pos; color: string; timer: number; name: string };
type KeyItem = { col: number; row: number; collected: boolean };
type Particle = { x: number; y: number; vx: number; vy: number; life: number; color: string };

const OPEN_CELLS: Pos[] = [];
for (let r = 0; r < ROWS; r++)
  for (let c = 0; c < COLS; c++)
    if (BASE_MAZE[r][c] === 0) OPEN_CELLS.push({ col: c, row: r });

function randOpenCell(exclude: Pos[] = []): Pos {
  const available = OPEN_CELLS.filter(p =>
    !exclude.some(e => e.col === p.col && e.row === p.row) &&
    !(p.col === 1 && p.row === 1)
  );
  return available[Math.floor(Math.random() * available.length)];
}

export function MazeOfKingsGame({ onBack, onOpenSettings, difficulty, onGameOver }: MazeOfKingsGameProps) {
  const cfg = DIFFICULTY_SETTINGS[difficulty];
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(cfg.lives);
  const [keysCollected, setKeysCollected] = useState(0);
  const [level, setLevel] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(false);

  const playerRef = useRef<Pos>({ col: 1, row: 1 });
  const enemiesRef = useRef<Enemy[]>([]);
  const keyItemsRef = useRef<KeyItem[]>([]);
  const exitRef = useRef<Pos>({ col: 17, row: 13 });
  const particlesRef = useRef<Particle[]>([]);
  const scoreRef = useRef(0);
  const livesRef = useRef(cfg.lives);
  const keysCollectedRef = useRef(0);
  const levelRef = useRef(1);
  const gameOverRef = useRef(false);
  const pausedRef = useRef(false);
  const invincibleRef = useRef(false);
  const frameRef = useRef(0);
  const rafRef = useRef<number>(0);
  const lastMoveRef = useRef(0);
  const MOVE_COOLDOWN = 120; // ms

  const isWall = (col: number, row: number) =>
    col < 0 || col >= COLS || row < 0 || row >= ROWS || BASE_MAZE[row][col] === 1;

  const initLevel = useCallback((lvl: number) => {
    playerRef.current = { col: 1, row: 1 };
    keysCollectedRef.current = 0;
    setKeysCollected(0);

    // place keys
    const keyCount = cfg.keysNeeded + (lvl - 1);
    const usedPositions: Pos[] = [{ col: 1, row: 1 }];
    keyItemsRef.current = Array.from({ length: keyCount }, () => {
      const pos = randOpenCell(usedPositions);
      usedPositions.push(pos);
      return { ...pos, collected: false };
    });

    // exit
    const exitPos = randOpenCell([...usedPositions, { col: 17, row: 13 }]);
    exitRef.current = exitPos;

    // enemies
    const enemyCount = 2 + (lvl - 1) * 1;
    const dirs = [{ col: 0, row: 1 }, { col: 0, row: -1 }, { col: 1, row: 0 }, { col: -1, row: 0 }];
    const colors = ['#f43f5e', '#f97316', '#facc15', '#22d3ee'];
    const names = ['Rook', 'Bishop', 'Knight', 'Duke'];
    enemiesRef.current = Array.from({ length: Math.min(enemyCount, 4) }, (_, i) => {
      const pos = randOpenCell([{ col: 1, row: 1 }, ...usedPositions]);
      usedPositions.push(pos);
      return {
        col: pos.col, row: pos.row,
        dir: dirs[Math.floor(Math.random() * dirs.length)],
        color: colors[i % colors.length],
        timer: 0,
        name: names[i % names.length],
      };
    });
  }, [cfg]);

  const spawnParticles = (col: number, row: number, color: string, count = 8) => {
    const cx = col * CELL + CELL / 2;
    const cy = row * CELL + CELL / 2;
    for (let i = 0; i < count; i++) {
      particlesRef.current.push({
        x: cx, y: cy,
        vx: (Math.random() - 0.5) * 5,
        vy: (Math.random() - 0.5) * 5 - 2,
        life: 1, color,
      });
    }
  };

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = '#060610';
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

    // walls
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (BASE_MAZE[r][c] === 1) {
          const g = ctx.createLinearGradient(c * CELL, r * CELL, (c + 1) * CELL, (r + 1) * CELL);
          g.addColorStop(0, '#1e1b4b');
          g.addColorStop(1, '#312e81');
          ctx.fillStyle = g;
          ctx.fillRect(c * CELL, r * CELL, CELL, CELL);
          ctx.strokeStyle = '#4338ca55';
          ctx.lineWidth = 1;
          ctx.strokeRect(c * CELL + 0.5, r * CELL + 0.5, CELL - 1, CELL - 1);
        } else {
          ctx.fillStyle = '#0c0c22';
          ctx.fillRect(c * CELL, r * CELL, CELL, CELL);
        }
      }
    }

    // exit
    const ex = exitRef.current;
    const allKeysGot = keysCollectedRef.current >= keyItemsRef.current.length;
    ctx.shadowBlur = 18;
    ctx.shadowColor = allKeysGot ? '#22c55e' : '#6b7280';
    ctx.fillStyle = allKeysGot ? '#22c55e44' : '#6b728033';
    ctx.fillRect(ex.col * CELL + 2, ex.row * CELL + 2, CELL - 4, CELL - 4);
    ctx.font = `${CELL - 8}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🚪', ex.col * CELL + CELL / 2, ex.row * CELL + CELL / 2);
    ctx.shadowBlur = 0;

    // keys
    keyItemsRef.current.forEach(k => {
      if (k.collected) return;
      ctx.shadowBlur = 12;
      ctx.shadowColor = '#facc15';
      ctx.font = `${CELL - 10}px Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const pulse = Math.sin(frameRef.current * 0.06) * 2;
      ctx.fillText('🗝', k.col * CELL + CELL / 2, k.row * CELL + CELL / 2 + pulse);
      ctx.shadowBlur = 0;
    });

    // enemies
    enemiesRef.current.forEach(e => {
      ctx.shadowBlur = 14;
      ctx.shadowColor = e.color;
      ctx.fillStyle = e.color;
      const ex2 = e.col * CELL + CELL / 2;
      const ey2 = e.row * CELL + CELL / 2;
      ctx.beginPath();
      ctx.arc(ex2, ey2, CELL / 2 - 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff30';
      ctx.beginPath();
      ctx.arc(ex2 - 4, ey2 - 4, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      // skull
      ctx.font = '14px Arial';
      ctx.fillText('💀', ex2, ey2 + 1);
    });

    // player
    const p = playerRef.current;
    const px = p.col * CELL + CELL / 2;
    const py = p.row * CELL + CELL / 2;
    const pcolor = invincibleRef.current
      ? `hsl(${frameRef.current * 10 % 360}, 100%, 60%)`
      : '#a855f7';
    ctx.shadowBlur = 20;
    ctx.shadowColor = pcolor;
    ctx.fillStyle = pcolor;
    ctx.beginPath();
    ctx.arc(px, py, CELL / 2 - 3, 0, Math.PI * 2);
    ctx.fill();
    // crown
    ctx.shadowBlur = 0;
    ctx.font = '18px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('👑', px, py);

    // particles
    particlesRef.current.forEach(pt => {
      ctx.globalAlpha = pt.life;
      ctx.fillStyle = pt.color;
      ctx.shadowBlur = 5; ctx.shadowColor = pt.color;
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 3 * pt.life, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    });
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
  }, []);

  useEffect(() => {
    initLevel(1);
  }, [initLevel]);

  useEffect(() => {
    let rafId: number;
    let lastEnemy = 0;

    const loop = (time: number) => {
      if (gameOverRef.current) return;
      if (pausedRef.current) { rafId = requestAnimationFrame(loop); return; }
      frameRef.current++;

      // enemy movement
      if (time - lastEnemy > cfg.enemySpeed) {
        lastEnemy = time;
        enemiesRef.current = enemiesRef.current.map(e => {
          const dirs = [{ col: 0, row: 1 }, { col: 0, row: -1 }, { col: 1, row: 0 }, { col: -1, row: 0 }];
          // prefer current dir, then random
          const fwd = { col: e.col + e.dir.col, row: e.row + e.dir.row };
          if (!isWall(fwd.col, fwd.row) && Math.random() > 0.25) {
            return { ...e, col: fwd.col, row: fwd.row };
          }
          const valid = dirs.filter(d => !isWall(e.col + d.col, e.row + d.row));
          if (valid.length === 0) return e;
          const newDir = valid[Math.floor(Math.random() * valid.length)];
          return { ...e, col: e.col + newDir.col, row: e.row + newDir.row, dir: newDir };
        });

        // collision with player
        if (!invincibleRef.current) {
          const hit = enemiesRef.current.find(e => e.col === playerRef.current.col && e.row === playerRef.current.row);
          if (hit) {
            spawnParticles(playerRef.current.col, playerRef.current.row, '#f43f5e', 14);
            livesRef.current--;
            setLives(livesRef.current);
            invincibleRef.current = true;
            setTimeout(() => { invincibleRef.current = false; }, 2000);
            if (livesRef.current <= 0) {
              gameOverRef.current = true;
              setGameOver(true);
              const lbp = Math.floor(scoreRef.current * cfg.multiplier);
              saveGameScore('mazeofkings', scoreRef.current, lbp, difficulty);
              onGameOver?.(scoreRef.current, lbp);
            }
          }
        }
      }

      // particles
      particlesRef.current.forEach(pt => {
        pt.x += pt.vx; pt.y += pt.vy; pt.vy += 0.12; pt.life -= 0.025;
      });
      particlesRef.current = particlesRef.current.filter(p => p.life > 0);

      draw();
      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);
    rafRef.current = rafId;
    return () => cancelAnimationFrame(rafId);
  }, [cfg, difficulty, draw, onGameOver]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (gameOverRef.current || pausedRef.current) return;
      const now = Date.now();
      if (now - lastMoveRef.current < MOVE_COOLDOWN) return;

      const dirs: Record<string, Pos> = {
        ArrowUp: { col: 0, row: -1 }, w: { col: 0, row: -1 }, W: { col: 0, row: -1 },
        ArrowDown: { col: 0, row: 1 }, s: { col: 0, row: 1 }, S: { col: 0, row: 1 },
        ArrowLeft: { col: -1, row: 0 }, a: { col: -1, row: 0 }, A: { col: -1, row: 0 },
        ArrowRight: { col: 1, row: 0 }, d: { col: 1, row: 0 }, D: { col: 1, row: 0 },
      };
      const dir = dirs[e.key];
      if (!dir) {
        if (e.key === ' ' || e.key === 'p' || e.key === 'P') {
          pausedRef.current = !pausedRef.current;
          setIsPaused(p => !p);
        }
        return;
      }
      e.preventDefault();
      const np = { col: playerRef.current.col + dir.col, row: playerRef.current.row + dir.row };
      if (isWall(np.col, np.row)) return;
      lastMoveRef.current = now;
      playerRef.current = np;

      // collect key
      keyItemsRef.current = keyItemsRef.current.map(k => {
        if (!k.collected && k.col === np.col && k.row === np.row) {
          keysCollectedRef.current++;
          setKeysCollected(keysCollectedRef.current);
          scoreRef.current += 50;
          setScore(scoreRef.current);
          spawnParticles(np.col, np.row, '#facc15', 12);
          return { ...k, collected: true };
        }
        return k;
      });

      // reach exit
      const ex = exitRef.current;
      const allKeys = keysCollectedRef.current >= keyItemsRef.current.length;
      if (np.col === ex.col && np.row === ex.row && allKeys) {
        const bonus = 200 * levelRef.current;
        scoreRef.current += bonus;
        setScore(scoreRef.current);
        levelRef.current++;
        setLevel(levelRef.current);
        setShowLevelUp(true);
        setTimeout(() => {
          setShowLevelUp(false);
          initLevel(levelRef.current);
        }, 2000);
      }

      // enemy collision after move
      if (!invincibleRef.current) {
        const hit = enemiesRef.current.find(e => e.col === np.col && e.row === np.row);
        if (hit) {
          spawnParticles(np.col, np.row, '#f43f5e', 14);
          livesRef.current--;
          setLives(livesRef.current);
          invincibleRef.current = true;
          setTimeout(() => { invincibleRef.current = false; }, 2000);
          if (livesRef.current <= 0) {
            gameOverRef.current = true;
            setGameOver(true);
            const lbp = Math.floor(scoreRef.current * cfg.multiplier);
            saveGameScore('mazeofkings', scoreRef.current, lbp, difficulty);
            onGameOver?.(scoreRef.current, lbp);
          }
        }
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [cfg, difficulty, initLevel, onGameOver]);

  const handleRestart = () => {
    scoreRef.current = 0; livesRef.current = cfg.lives;
    levelRef.current = 1; keysCollectedRef.current = 0;
    gameOverRef.current = false; pausedRef.current = false;
    invincibleRef.current = false; particlesRef.current = [];
    setScore(0); setLives(cfg.lives); setLevel(1);
    setKeysCollected(0); setGameOver(false); setIsPaused(false);
    initLevel(1);
  };

  const lbp = Math.floor(score * cfg.multiplier);
  const totalKeys = keyItemsRef.current.length;

  return (
    <div className="min-h-screen bg-[#060610] text-white flex flex-col">
      <header className="bg-[#0a0a1e] border-b border-indigo-900/50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <Home className="w-5 h-5" /> Back
          </button>
          <h1 className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
            MAZE OF KINGS
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
          {/* Left stats */}
          <div className="w-52 space-y-3">
            <div className="bg-[#0a0a1e] rounded-xl p-4 border border-indigo-900/50">
              <div className="flex items-center gap-2 mb-2"><Trophy className="w-4 h-4 text-yellow-500" /><span className="text-xs text-gray-400">Score</span></div>
              <div className="text-3xl font-bold text-yellow-400">{score.toLocaleString()}</div>
              <div className="text-xs text-gray-500 mt-1">LB: <span className="text-green-400">{lbp.toLocaleString()}</span></div>
            </div>
            <div className="bg-[#0a0a1e] rounded-xl p-4 border border-indigo-900/50 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Level</span><span className="text-white font-bold text-lg">{level}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Lives</span>
                <div className="flex gap-1">{Array.from({ length: lives }).map((_, i) => <Heart key={i} className="w-4 h-4 fill-red-500 text-red-500" />)}</div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Mode</span><span className="text-white">{cfg.name}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Mult</span><span className="text-purple-400 font-bold">{cfg.multiplier}x</span>
              </div>
            </div>
            <div className="bg-[#0a0a1e] rounded-xl p-4 border border-indigo-900/50">
              <div className="flex items-center gap-2 mb-3"><Key className="w-4 h-4 text-yellow-400" /><span className="text-sm font-medium">Keys</span></div>
              <div className="text-2xl font-bold text-yellow-400 mb-1">{keysCollected} / {totalKeys}</div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-yellow-400 h-2 rounded-full transition-all" style={{ width: totalKeys ? `${(keysCollected / totalKeys) * 100}%` : '0%' }} />
              </div>
              {keysCollected >= totalKeys && <div className="text-green-400 text-xs mt-2 font-medium">✓ Find the exit door!</div>}
            </div>
            <div className="bg-[#0a0a1e] rounded-xl p-4 border border-indigo-900/50 text-xs text-gray-400 space-y-1.5">
              <div className="font-medium text-gray-300 mb-2">Controls</div>
              <div><span className="font-mono bg-gray-700 px-1 rounded">↑↓←→</span> Move</div>
              <div><span className="font-mono bg-gray-700 px-1 rounded">WASD</span> Move</div>
              <div><span className="font-mono bg-gray-700 px-1 rounded">P / Space</span> Pause</div>
            </div>
          </div>

          {/* Canvas */}
          <div className="relative">
            <div className="rounded-xl overflow-hidden border-2 border-indigo-700 shadow-2xl shadow-indigo-900/40">
              <canvas ref={canvasRef} width={CANVAS_W} height={CANVAS_H} className="block" />
            </div>
            <AnimatePresence>
              {isPaused && !gameOver && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/80 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <Pause className="w-16 h-16 mx-auto mb-4 text-yellow-400" />
                    <h2 className="text-3xl font-bold mb-2">PAUSED</h2>
                    <p className="text-gray-400 text-sm">Press P to continue</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {showLevelUp && (
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute inset-0 bg-black/80 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-7xl mb-4">👑</div>
                    <h2 className="text-4xl font-bold mb-2 text-yellow-400">LEVEL {level}!</h2>
                    <p className="text-gray-300">+{200 * (level - 1)} bonus points!</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {gameOver && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-black/90 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <Award className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
                    <h2 className="text-4xl font-bold mb-4">GAME OVER</h2>
                    <div className="bg-gray-800 rounded-lg p-5 mb-5 space-y-2">
                      <div className="text-2xl font-bold text-yellow-400">{score.toLocaleString()} pts</div>
                      <div className="text-gray-400 text-sm">{cfg.name} • Level {level}</div>
                      <div className="pt-3 border-t border-gray-700">
                        <div className="text-xs text-gray-500">Leaderboard Points</div>
                        <div className="text-3xl font-bold text-green-400">{lbp.toLocaleString()}</div>
                      </div>
                    </div>
                    <div className="flex gap-3 justify-center">
                      <motion.button onClick={handleRestart} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                        className="bg-gradient-to-r from-yellow-600 to-amber-600 px-5 py-3 rounded-lg flex items-center gap-2">
                        <RotateCcw className="w-4 h-4" /> Play Again
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
            <div className="bg-[#0a0a1e] rounded-xl p-4 border border-indigo-900/50">
              <h3 className="text-sm font-medium mb-3 flex items-center gap-2"><Zap className="w-4 h-4 text-yellow-400" />Legend</h3>
              <div className="space-y-2 text-xs text-gray-400">
                <div className="flex items-center gap-2"><span>👑</span><span>You — the King</span></div>
                <div className="flex items-center gap-2"><span>🗝</span><span>Keys — collect all!</span></div>
                <div className="flex items-center gap-2"><span>🚪</span><span>Exit — opens when all keys collected</span></div>
                <div className="flex items-center gap-2"><span>💀</span><span>Enemies — avoid them!</span></div>
              </div>
            </div>
            <div className="bg-[#0a0a1e] rounded-xl p-4 border border-indigo-900/50 text-xs text-gray-400 space-y-2">
              <div className="font-medium text-gray-300">Scoring</div>
              <div className="flex justify-between"><span>Key collected</span><span className="text-yellow-400">+50</span></div>
              <div className="flex justify-between"><span>Level complete</span><span className="text-yellow-400">+200/lvl</span></div>
              <div className="flex justify-between"><span>Difficulty</span><span className="text-purple-400">{cfg.multiplier}x</span></div>
            </div>
            <motion.button onClick={() => { pausedRef.current = !isPaused; setIsPaused(p => !p); }}
              disabled={gameOver}
              className="w-full bg-gradient-to-r from-indigo-700 to-purple-700 py-2.5 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 text-sm"
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
              {isPaused ? 'Resume' : 'Pause'}
            </motion.button>
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
