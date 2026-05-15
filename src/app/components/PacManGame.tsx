import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Home, Settings, Trophy, RotateCcw, Pause, Play, Volume2, VolumeX, Award, Star, TrendingUp, Zap, Heart } from 'lucide-react';
import logo from '../../assets/logo.svg';
import { toast } from 'sonner@2.0.3';

interface PacManGameProps {
  onBack: () => void;
  onOpenSettings?: () => void;
  difficulty: 'easy' | 'medium' | 'hard';
  onGameOver?: (score: number, leaderboardPoints: number) => void;
}

interface Position {
  x: number;
  y: number;
}

interface Ghost {
  x: number;
  y: number;
  color: string;
  direction: { x: number; y: number };
  name: string;
  mode: 'chase' | 'scatter' | 'frightened';
  targetX: number;
  targetY: number;
}

const GRID_SIZE = 25;
const CELL_SIZE = 20;
const CANVAS_WIDTH = GRID_SIZE * CELL_SIZE;
const CANVAS_HEIGHT = GRID_SIZE * CELL_SIZE;

const DIFFICULTY_SETTINGS = {
  easy: { ghostSpeed: 85, multiplier: 1.0, name: 'Easy', frightenedTime: 6000, ghostReleaseInterval: 5000 },
  medium: { ghostSpeed: 70, multiplier: 1.5, name: 'Medium', frightenedTime: 5000, ghostReleaseInterval: 4000 },
  hard: { ghostSpeed: 55, multiplier: 2.0, name: 'Hard', frightenedTime: 4000, ghostReleaseInterval: 3000 }
};

export function PacManGame({ onBack, onOpenSettings, difficulty, onGameOver }: PacManGameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [isPaused, setIsPaused] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [level, setLevel] = useState(1);
  const [showVictory, setShowVictory] = useState(false);
  const [ghostsEaten, setGhostsEaten] = useState(0);
  const [combo, setCombo] = useState(0);

  const pacManRef = useRef<Position>({ x: 12, y: 17 });
  const directionRef = useRef<Position>({ x: 0, y: 0 });
  const nextDirectionRef = useRef<Position>({ x: 0, y: 0 });
  const mouthOpenRef = useRef(0);
  
  const ghostsRef = useRef<Ghost[]>([
    { x: 11, y: 11, color: '#FF0000', direction: { x: 0, y: -1 }, name: 'Blinky', mode: 'chase', targetX: 12, targetY: 17 },
    { x: 12, y: 11, color: '#FFB8FF', direction: { x: 0, y: 1 }, name: 'Pinky', mode: 'chase', targetX: 12, targetY: 17 },
    { x: 13, y: 11, color: '#00FFFF', direction: { x: 1, y: 0 }, name: 'Inky', mode: 'chase', targetX: 12, targetY: 17 },
    { x: 14, y: 11, color: '#FFB852', direction: { x: -1, y: 0 }, name: 'Clyde', mode: 'chase', targetX: 12, targetY: 17 }
  ]);
  
  const mazeRef = useRef<number[][]>([]);
  const dotsRef = useRef<boolean[][]>([]);
  const powerPelletsRef = useRef<Position[]>([
    { x: 1, y: 3 },
    { x: 23, y: 3 },
    { x: 1, y: 21 },
    { x: 23, y: 21 }
  ]);
  const [powerMode, setPowerMode] = useState(false);
  const powerModeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [dotsRemaining, setDotsRemaining] = useState(0);
  const [fruit, setFruit] = useState<{ x: number; y: number; type: string; points: number } | null>(null);
  const ghostReleaseTimerRef = useRef(0);
  const [ghostsReleased, setGhostsReleased] = useState<string[]>(['Blinky']); // Blinky starts outside

  const initializeMaze = useCallback(() => {
    const maze: number[][] = Array(GRID_SIZE).fill(0).map(() => Array(GRID_SIZE).fill(0));
    
    // Outer walls
    for (let i = 0; i < GRID_SIZE; i++) {
      maze[0][i] = 1;
      maze[GRID_SIZE - 1][i] = 1;
      maze[i][0] = 1;
      maze[i][GRID_SIZE - 1] = 1;
    }
    
    // Complex maze pattern
    const walls = [
      // Top section
      [2, 2], [2, 3], [2, 4], [2, 5], [2, 6],
      [2, 8], [2, 9], [2, 10], [2, 11], [2, 12], [2, 13], [2, 14], [2, 15], [2, 16],
      [2, 18], [2, 19], [2, 20], [2, 21], [2, 22],
      
      [4, 2], [4, 3], [4, 4], [4, 5], [4, 6],
      [4, 8], [4, 9], [4, 10],
      [4, 14], [4, 15], [4, 16],
      [4, 18], [4, 19], [4, 20], [4, 21], [4, 22],
      
      // Left vertical
      [5, 2], [6, 2], [7, 2], [8, 2],
      [5, 6], [6, 6], [7, 6], [8, 6],
      [5, 22], [6, 22], [7, 22], [8, 22],
      [5, 18], [6, 18], [7, 18], [8, 18],
      
      // Center ghost house
      [9, 10], [9, 11], [9, 13], [9, 14],  // Removed [9, 12] to create exit
      [10, 9], [10, 15],
      [11, 9], [11, 15],
      [12, 9], [12, 15],
      [13, 9], [13, 15],
      [14, 10], [14, 11], [14, 12], [14, 13], [14, 14],
      
      // Middle sections
      [6, 8], [6, 9], [6, 10],
      [6, 14], [6, 15], [6, 16],
      
      [8, 8], [8, 9], [8, 10],
      [8, 14], [8, 15], [8, 16],
      
      // Bottom section
      [16, 2], [16, 3], [16, 4], [16, 5], [16, 6],
      [16, 8], [16, 9], [16, 10],
      [16, 14], [16, 15], [16, 16],
      [16, 18], [16, 19], [16, 20], [16, 21], [16, 22],
      
      [18, 2], [18, 3], [18, 4], [18, 5], [18, 6],
      [18, 8], [18, 9], [18, 10], [18, 11], [18, 12], [18, 13], [18, 14], [18, 15], [18, 16],
      [18, 18], [18, 19], [18, 20], [18, 21], [18, 22],
      
      [20, 2], [20, 3], [20, 4],
      [20, 6], [20, 7], [20, 8], [20, 9], [20, 10], [20, 11], [20, 12], [20, 13], [20, 14], [20, 15], [20, 16], [20, 17], [20, 18],
      [20, 20], [20, 21], [20, 22],
      
      [22, 2], [22, 3], [22, 4], [22, 5], [22, 6], [22, 7], [22, 8], [22, 9], [22, 10],
      [22, 14], [22, 15], [22, 16], [22, 17], [22, 18], [22, 19], [22, 20], [22, 21], [22, 22],
    ];
    
    walls.forEach(([y, x]) => {
      if (y < GRID_SIZE && x < GRID_SIZE && y >= 0 && x >= 0) {
        maze[y][x] = 1;
      }
    });
    
    mazeRef.current = maze;
    
    // Initialize dots
    const dots: boolean[][] = Array(GRID_SIZE).fill(0).map(() => Array(GRID_SIZE).fill(false));
    let dotCount = 0;
    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        if (maze[y][x] === 0 && !(y >= 10 && y <= 13 && x >= 10 && x <= 14)) {
          dots[y][x] = true;
          dotCount++;
        }
      }
    }
    dotsRef.current = dots;
    setDotsRemaining(dotCount);
  }, []);

  const isValidMove = (x: number, y: number) => {
    return x >= 0 && x < GRID_SIZE && y >= 0 && y < GRID_SIZE && mazeRef.current[y][x] === 0;
  };

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas with dark background
    ctx.fillStyle = '#0a0a0f';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    
    // Draw maze walls with glow effect
    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        if (mazeRef.current[y][x] === 1) {
          // Gradient wall
          const gradient = ctx.createLinearGradient(
            x * CELL_SIZE, y * CELL_SIZE,
            (x + 1) * CELL_SIZE, (y + 1) * CELL_SIZE
          );
          gradient.addColorStop(0, '#1e40af');
          gradient.addColorStop(1, '#3b82f6');
          
          ctx.fillStyle = gradient;
          ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
          
          // Border glow
          ctx.strokeStyle = '#60a5fa';
          ctx.lineWidth = 1;
          ctx.strokeRect(x * CELL_SIZE + 0.5, y * CELL_SIZE + 0.5, CELL_SIZE - 1, CELL_SIZE - 1);
        }
      }
    }
    
    // Draw dots
    ctx.fillStyle = '#fbbf24';
    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        if (dotsRef.current[y][x]) {
          ctx.shadowBlur = 5;
          ctx.shadowColor = '#fbbf24';
          ctx.beginPath();
          ctx.arc(x * CELL_SIZE + CELL_SIZE / 2, y * CELL_SIZE + CELL_SIZE / 2, 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }
    }
    
    // Draw power pellets with pulsing animation
    const time = Date.now() / 150;
    const pulse = Math.sin(time) * 0.3 + 1;
    powerPelletsRef.current.forEach(pellet => {
      const gradient = ctx.createRadialGradient(
        pellet.x * CELL_SIZE + CELL_SIZE / 2,
        pellet.y * CELL_SIZE + CELL_SIZE / 2,
        0,
        pellet.x * CELL_SIZE + CELL_SIZE / 2,
        pellet.y * CELL_SIZE + CELL_SIZE / 2,
        8 * pulse
      );
      gradient.addColorStop(0, '#fbbf24');
      gradient.addColorStop(1, 'rgba(251, 191, 36, 0)');
      
      ctx.fillStyle = gradient;
      ctx.shadowBlur = 15;
      ctx.shadowColor = '#fbbf24';
      ctx.beginPath();
      ctx.arc(
        pellet.x * CELL_SIZE + CELL_SIZE / 2,
        pellet.y * CELL_SIZE + CELL_SIZE / 2,
        5 * pulse,
        0,
        Math.PI * 2
      );
      ctx.fill();
      ctx.shadowBlur = 0;
    });
    
    // Draw fruit
    if (fruit) {
      ctx.font = '24px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#ff0000';
      ctx.fillText(
        fruit.type,
        fruit.x * CELL_SIZE + CELL_SIZE / 2,
        fruit.y * CELL_SIZE + CELL_SIZE / 2
      );
      ctx.shadowBlur = 0;
    }
    
    // Draw Pac-Man with smooth animation
    const pacMan = pacManRef.current;
    const gradient = ctx.createRadialGradient(
      pacMan.x * CELL_SIZE + CELL_SIZE / 2,
      pacMan.y * CELL_SIZE + CELL_SIZE / 2,
      0,
      pacMan.x * CELL_SIZE + CELL_SIZE / 2,
      pacMan.y * CELL_SIZE + CELL_SIZE / 2,
      CELL_SIZE / 2
    );
    gradient.addColorStop(0, '#ffeb3b');
    gradient.addColorStop(1, '#fbbf24');
    ctx.fillStyle = gradient;
    
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#fbbf24';
    
    ctx.beginPath();
    
    const mouthAngle = Math.abs(Math.sin(mouthOpenRef.current / 5)) * 0.3;
    let rotation = 0;
    if (directionRef.current.x === 1) rotation = 0;
    else if (directionRef.current.x === -1) rotation = Math.PI;
    else if (directionRef.current.y === 1) rotation = Math.PI / 2;
    else if (directionRef.current.y === -1) rotation = -Math.PI / 2;
    
    ctx.save();
    ctx.translate(pacMan.x * CELL_SIZE + CELL_SIZE / 2, pacMan.y * CELL_SIZE + CELL_SIZE / 2);
    ctx.rotate(rotation);
    ctx.arc(0, 0, CELL_SIZE / 2 - 1, mouthAngle, Math.PI * 2 - mouthAngle);
    ctx.lineTo(0, 0);
    ctx.fill();
    ctx.restore();
    
    ctx.shadowBlur = 0;
    
    // Draw ghosts with detailed rendering
    ghostsRef.current.forEach(ghost => {
      const isFrightened = ghost.mode === 'frightened';
      
      // Ghost body
      const bodyGradient = ctx.createRadialGradient(
        ghost.x * CELL_SIZE + CELL_SIZE / 2,
        ghost.y * CELL_SIZE + CELL_SIZE / 2 - 2,
        0,
        ghost.x * CELL_SIZE + CELL_SIZE / 2,
        ghost.y * CELL_SIZE + CELL_SIZE / 2 - 2,
        CELL_SIZE / 2
      );
      
      if (isFrightened) {
        const flashTime = Date.now() % 400;
        if (flashTime < 200) {
          bodyGradient.addColorStop(0, '#4169e1');
          bodyGradient.addColorStop(1, '#1e3a8a');
        } else {
          bodyGradient.addColorStop(0, '#f8f9fa');
          bodyGradient.addColorStop(1, '#9ca3af');
        }
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#4169e1';
      } else {
        bodyGradient.addColorStop(0, ghost.color);
        bodyGradient.addColorStop(1, ghost.color + 'CC');
        ctx.shadowBlur = 10;
        ctx.shadowColor = ghost.color;
      }
      
      ctx.fillStyle = bodyGradient;
      
      // Ghost head (rounded top)
      ctx.beginPath();
      ctx.arc(
        ghost.x * CELL_SIZE + CELL_SIZE / 2,
        ghost.y * CELL_SIZE + CELL_SIZE / 2,
        CELL_SIZE / 2 - 1,
        Math.PI,
        0
      );
      ctx.lineTo(ghost.x * CELL_SIZE + CELL_SIZE - 1, ghost.y * CELL_SIZE + CELL_SIZE - 1);
      
      // Wavy bottom with animation
      const waveTime = Date.now() / 100;
      for (let i = 0; i < 4; i++) {
        const waveX = ghost.x * CELL_SIZE + CELL_SIZE - 1 - (i * (CELL_SIZE / 4));
        const waveY = ghost.y * CELL_SIZE + CELL_SIZE - 1 - (Math.sin(waveTime + i) * 2);
        ctx.lineTo(waveX, waveY);
      }
      
      ctx.lineTo(ghost.x * CELL_SIZE + 1, ghost.y * CELL_SIZE + CELL_SIZE - 1);
      ctx.fill();
      
      ctx.shadowBlur = 0;
      
      // Eyes
      if (isFrightened) {
        // Scared eyes (wavy lines)
        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(ghost.x * CELL_SIZE + 5, ghost.y * CELL_SIZE + 8);
        ctx.lineTo(ghost.x * CELL_SIZE + 9, ghost.y * CELL_SIZE + 10);
        ctx.moveTo(ghost.x * CELL_SIZE + CELL_SIZE - 5, ghost.y * CELL_SIZE + 8);
        ctx.lineTo(ghost.x * CELL_SIZE + CELL_SIZE - 9, ghost.y * CELL_SIZE + 10);
        ctx.stroke();
        
        // Scared mouth
        ctx.beginPath();
        ctx.arc(ghost.x * CELL_SIZE + CELL_SIZE / 2, ghost.y * CELL_SIZE + 14, 3, 0, Math.PI);
        ctx.stroke();
      } else {
        // Normal eyes
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(ghost.x * CELL_SIZE + 7, ghost.y * CELL_SIZE + 8, 3, 0, Math.PI * 2);
        ctx.arc(ghost.x * CELL_SIZE + CELL_SIZE - 7, ghost.y * CELL_SIZE + 8, 3, 0, Math.PI * 2);
        ctx.fill();
        
        // Pupils looking towards Pac-Man
        const dx = pacMan.x - ghost.x;
        const dy = pacMan.y - ghost.y;
        const angle = Math.atan2(dy, dx);
        const pupilOffset = 1.5;
        
        ctx.fillStyle = '#1e293b';
        ctx.beginPath();
        ctx.arc(
          ghost.x * CELL_SIZE + 7 + Math.cos(angle) * pupilOffset,
          ghost.y * CELL_SIZE + 8 + Math.sin(angle) * pupilOffset,
          1.5,
          0,
          Math.PI * 2
        );
        ctx.arc(
          ghost.x * CELL_SIZE + CELL_SIZE - 7 + Math.cos(angle) * pupilOffset,
          ghost.y * CELL_SIZE + 8 + Math.sin(angle) * pupilOffset,
          1.5,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }
    });
    
    mouthOpenRef.current += 1;
  }, [fruit, powerMode]);

  const updateGhostAI = (ghost: Ghost, pacManPos: Position): Ghost => {
    let targetX = pacManPos.x;
    let targetY = pacManPos.y;
    
    if (ghost.mode === 'scatter') {
      // Each ghost has a corner to retreat to
      if (ghost.name === 'Blinky') { targetX = 23; targetY = 1; }
      else if (ghost.name === 'Pinky') { targetX = 1; targetY = 1; }
      else if (ghost.name === 'Inky') { targetX = 23; targetY = 23; }
      else if (ghost.name === 'Clyde') { targetX = 1; targetY = 23; }
    } else if (ghost.mode === 'frightened') {
      // Random movement when frightened
      targetX = Math.floor(Math.random() * GRID_SIZE);
      targetY = Math.floor(Math.random() * GRID_SIZE);
    } else {
      // Chase mode - different strategy per ghost
      if (ghost.name === 'Blinky') {
        // Directly chase Pac-Man
        targetX = pacManPos.x;
        targetY = pacManPos.y;
      } else if (ghost.name === 'Pinky') {
        // Target 4 cells ahead of Pac-Man
        targetX = pacManPos.x + directionRef.current.x * 4;
        targetY = pacManPos.y + directionRef.current.y * 4;
      } else if (ghost.name === 'Inky') {
        // Complex behavior
        targetX = pacManPos.x + directionRef.current.x * 2;
        targetY = pacManPos.y + directionRef.current.y * 2;
      } else if (ghost.name === 'Clyde') {
        // Chase if far, scatter if near
        const dist = Math.abs(ghost.x - pacManPos.x) + Math.abs(ghost.y - pacManPos.y);
        if (dist > 8) {
          targetX = pacManPos.x;
          targetY = pacManPos.y;
        } else {
          targetX = 1;
          targetY = 23;
        }
      }
    }
    
    ghost.targetX = Math.max(0, Math.min(GRID_SIZE - 1, targetX));
    ghost.targetY = Math.max(0, Math.min(GRID_SIZE - 1, targetY));
    
    // Find best direction
    const directions = [
      { x: 0, y: -1 },
      { x: 0, y: 1 },
      { x: -1, y: 0 },
      { x: 1, y: 0 }
    ];
    
    let bestDir = ghost.direction;
    let bestDist = Infinity;
    
    directions.forEach(dir => {
      // Don't reverse direction
      if (dir.x === -ghost.direction.x && dir.y === -ghost.direction.y) return;
      
      const newX = ghost.x + dir.x;
      const newY = ghost.y + dir.y;
      
      if (isValidMove(newX, newY)) {
        const dist = Math.abs(newX - ghost.targetX) + Math.abs(newY - ghost.targetY);
        if (dist < bestDist) {
          bestDist = dist;
          bestDir = dir;
        }
      }
    });
    
    const newX = ghost.x + bestDir.x;
    const newY = ghost.y + bestDir.y;
    
    if (isValidMove(newX, newY)) {
      return { ...ghost, x: newX, y: newY, direction: bestDir };
    }
    
    return ghost;
  };

  // Main game loop
  useEffect(() => {
    if (isPaused || gameOver) return;
    
    const gameInterval = setInterval(() => {
      // Try to move in next direction if available
      if (nextDirectionRef.current.x !== 0 || nextDirectionRef.current.y !== 0) {
        const nextX = pacManRef.current.x + nextDirectionRef.current.x;
        const nextY = pacManRef.current.y + nextDirectionRef.current.y;
        if (isValidMove(nextX, nextY)) {
          directionRef.current = { ...nextDirectionRef.current };
          nextDirectionRef.current = { x: 0, y: 0 };
        }
      }
      
      // Move Pac-Man
      const newX = pacManRef.current.x + directionRef.current.x;
      const newY = pacManRef.current.y + directionRef.current.y;
      
      if (isValidMove(newX, newY)) {
        pacManRef.current = { x: newX, y: newY };
        
        // Eat dot
        if (dotsRef.current[newY][newX]) {
          dotsRef.current[newY][newX] = false;
          setScore(s => s + 10);
          setDotsRemaining(d => d - 1);
        }
        
        // Eat power pellet
        const pelletIndex = powerPelletsRef.current.findIndex(
          p => p.x === newX && p.y === newY
        );
        if (pelletIndex !== -1) {
          powerPelletsRef.current.splice(pelletIndex, 1);
          setPowerMode(true);
          setScore(s => s + 50);
          setGhostsEaten(0);
          setCombo(0);
          
          // Set all ghosts to frightened mode
          ghostsRef.current = ghostsRef.current.map(g => ({ ...g, mode: 'frightened' }));
          
          if (powerModeTimerRef.current) {
            clearTimeout(powerModeTimerRef.current);
          }
          powerModeTimerRef.current = setTimeout(() => {
            setPowerMode(false);
            ghostsRef.current = ghostsRef.current.map(g => ({ ...g, mode: 'chase' }));
          }, DIFFICULTY_SETTINGS[difficulty].frightenedTime);
          
          toast.success('Power Mode Activated! 🔥');
        }
        
        // Eat fruit
        if (fruit && fruit.x === newX && fruit.y === newY) {
          setScore(s => s + fruit.points);
          toast.success(`${fruit.type} +${fruit.points} points!`);
          setFruit(null);
        }
      }
      
      draw();
    }, 100);
    
    return () => clearInterval(gameInterval);
  }, [isPaused, gameOver, draw, difficulty, fruit]);

  // Ghost movement
  useEffect(() => {
    if (isPaused || gameOver) return;
    
    const ghostInterval = setInterval(() => {
      ghostsRef.current = ghostsRef.current.map(ghost => updateGhostAI(ghost, pacManRef.current));
      
      // Check collision
      const collision = ghostsRef.current.find(
        ghost => ghost.x === pacManRef.current.x && ghost.y === pacManRef.current.y
      );
      
      if (collision) {
        if (collision.mode === 'frightened') {
          // Eat ghost
          const points = [200, 400, 800, 1600][ghostsEaten];
          setScore(s => s + points);
          setGhostsEaten(e => e + 1);
          const newCombo = combo + 1;
          setCombo(newCombo);
          
          // Reset ghost to center
          ghostsRef.current = ghostsRef.current.map(g => {
            if (g.name === collision.name) {
              return { ...g, x: 12, y: 11, mode: 'chase' };
            }
            return g;
          });
          
          toast.success(`${collision.name} eaten! +${points} (${newCombo}x combo)`);
        } else {
          // Lose life
          setLives(l => {
            const newLives = l - 1;
            if (newLives <= 0) {
              setGameOver(true);
              const leaderboardPoints = Math.floor(score * DIFFICULTY_SETTINGS[difficulty].multiplier);
              onGameOver?.(score, leaderboardPoints);
              
              const savedScores = JSON.parse(localStorage.getItem('pacman_scores') || '[]');
              savedScores.push({
                score,
                leaderboardPoints,
                difficulty,
                timestamp: new Date().toISOString(),
                username: localStorage.getItem('ta_username') || 'You'
              });
              localStorage.setItem('pacman_scores', JSON.stringify(savedScores));
              toast.error('Game Over!');
            } else {
              pacManRef.current = { x: 12, y: 17 };
              directionRef.current = { x: 0, y: 0 };
              nextDirectionRef.current = { x: 0, y: 0 };
              ghostsRef.current = [
                { x: 11, y: 11, color: '#FF0000', direction: { x: 0, y: -1 }, name: 'Blinky', mode: 'chase', targetX: 12, targetY: 17 },
                { x: 12, y: 11, color: '#FFB8FF', direction: { x: 0, y: 1 }, name: 'Pinky', mode: 'chase', targetX: 12, targetY: 17 },
                { x: 13, y: 11, color: '#00FFFF', direction: { x: 1, y: 0 }, name: 'Inky', mode: 'chase', targetX: 12, targetY: 17 },
                { x: 14, y: 11, color: '#FFB852', direction: { x: -1, y: 0 }, name: 'Clyde', mode: 'chase', targetX: 12, targetY: 17 }
              ];
              toast.error(`Life lost! ${newLives} remaining 💔`);
            }
            return newLives;
          });
        }
      }
    }, DIFFICULTY_SETTINGS[difficulty].ghostSpeed);
    
    return () => clearInterval(ghostInterval);
  }, [isPaused, gameOver, difficulty, score, onGameOver, ghostsEaten, combo]);

  // Spawn fruit randomly
  useEffect(() => {
    if (gameOver || isPaused) return;
    
    const fruitInterval = setInterval(() => {
      if (!fruit && Math.random() < 0.3) {
        const fruits = [
          { type: '🍒', points: 100 },
          { type: '🍓', points: 300 },
          { type: '🍊', points: 500 },
          { type: '🍎', points: 700 },
          { type: '🍇', points: 1000 },
          { type: '🍉', points: 2000 }
        ];
        const selectedFruit = fruits[Math.floor(Math.random() * fruits.length)];
        
        let x, y;
        do {
          x = Math.floor(Math.random() * GRID_SIZE);
          y = Math.floor(Math.random() * GRID_SIZE);
        } while (mazeRef.current[y][x] === 1);
        
        setFruit({ x, y, ...selectedFruit });
        
        setTimeout(() => setFruit(null), 10000);
      }
    }, 15000);
    
    return () => clearInterval(fruitInterval);
  }, [fruit, gameOver, isPaused]);

  // Level completion
  useEffect(() => {
    if (dotsRemaining === 0 && !gameOver && !showVictory) {
      setShowVictory(true);
      setTimeout(() => {
        setShowVictory(false);
        setLevel(l => l + 1);
        initializeMaze();
        pacManRef.current = { x: 12, y: 17 };
        directionRef.current = { x: 0, y: 0 };
        nextDirectionRef.current = { x: 0, y: 0 };
        ghostsRef.current = [
          { x: 11, y: 11, color: '#FF0000', direction: { x: 0, y: -1 }, name: 'Blinky', mode: 'chase', targetX: 12, targetY: 17 },
          { x: 12, y: 11, color: '#FFB8FF', direction: { x: 0, y: 1 }, name: 'Pinky', mode: 'chase', targetX: 12, targetY: 17 },
          { x: 13, y: 11, color: '#00FFFF', direction: { x: 1, y: 0 }, name: 'Inky', mode: 'chase', targetX: 12, targetY: 17 },
          { x: 14, y: 11, color: '#FFB852', direction: { x: -1, y: 0 }, name: 'Clyde', mode: 'chase', targetX: 12, targetY: 17 }
        ];
        powerPelletsRef.current = [
          { x: 1, y: 3 },
          { x: 23, y: 3 },
          { x: 1, y: 21 },
          { x: 23, y: 21 }
        ];
        setScore(s => s + 1000);
        toast.success('🎉 Level Complete! +1000 bonus points');
      }, 2500);
    }
  }, [dotsRemaining, gameOver, showVictory, initializeMaze]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameOver) return;
      
      e.preventDefault();
      
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          nextDirectionRef.current = { x: 0, y: -1 };
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          nextDirectionRef.current = { x: 0, y: 1 };
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          nextDirectionRef.current = { x: -1, y: 0 };
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          nextDirectionRef.current = { x: 1, y: 0 };
          break;
        case ' ':
          setIsPaused(p => !p);
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameOver]);

  useEffect(() => {
    initializeMaze();
  }, [initializeMaze]);

  const handleRestart = () => {
    setScore(0);
    setLives(3);
    setLevel(1);
    setGameOver(false);
    setPowerMode(false);
    setGhostsEaten(0);
    setCombo(0);
    setFruit(null);
    initializeMaze();
    pacManRef.current = { x: 12, y: 17 };
    directionRef.current = { x: 0, y: 0 };
    nextDirectionRef.current = { x: 0, y: 0 };
    ghostsRef.current = [
      { x: 11, y: 11, color: '#FF0000', direction: { x: 0, y: -1 }, name: 'Blinky', mode: 'chase', targetX: 12, targetY: 17 },
      { x: 12, y: 11, color: '#FFB8FF', direction: { x: 0, y: 1 }, name: 'Pinky', mode: 'chase', targetX: 12, targetY: 17 },
      { x: 13, y: 11, color: '#00FFFF', direction: { x: 1, y: 0 }, name: 'Inky', mode: 'chase', targetX: 12, targetY: 17 },
      { x: 14, y: 11, color: '#FFB852', direction: { x: -1, y: 0 }, name: 'Clyde', mode: 'chase', targetX: 12, targetY: 17 }
    ];
    powerPelletsRef.current = [
      { x: 1, y: 3 },
      { x: 23, y: 3 },
      { x: 1, y: 21 },
      { x: 23, y: 21 }
    ];
  };

  const leaderboardPoints = Math.floor(score * DIFFICULTY_SETTINGS[difficulty].multiplier);

  return (
    <div className="min-h-screen bg-[#1a1a1f] text-white flex flex-col">
      {/* Header */}
      <header className="bg-[#0f0f13] border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <Home className="w-5 h-5" />
          </button>
          <img src={logo} alt="Tour Arcade" className="h-8" />
          <h1 className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            PAC-MAN
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-gray-800 px-4 py-2 rounded-lg">
            <span className="text-gray-400 text-sm">Difficulty: </span>
            <span className="text-white font-semibold">{DIFFICULTY_SETTINGS[difficulty].name}</span>
          </div>
          <div className="bg-gray-800 px-4 py-2 rounded-lg">
            <span className="text-gray-400 text-sm">Multiplier: </span>
            <span className="text-purple-400 font-semibold">{DIFFICULTY_SETTINGS[difficulty].multiplier}x</span>
          </div>
          <button
            onClick={onOpenSettings}
            className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Game Area */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="flex gap-8">
          {/* Stats Panel */}
          <div className="w-64 space-y-4">
            <motion.div
              className="bg-[#0f0f13] rounded-xl p-6 border border-gray-800"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Trophy className="w-5 h-5 text-yellow-500" />
                <h2 className="text-lg">Score</h2>
              </div>
              <div className="text-4xl font-bold text-purple-400 mb-2">{score.toLocaleString()}</div>
              <div className="text-sm text-gray-400">
                Leaderboard Points: <span className="text-green-400 font-semibold">{leaderboardPoints.toLocaleString()}</span>
              </div>
              {combo > 1 && (
                <div className="mt-2 text-sm">
                  <span className="text-orange-400 font-bold">🔥 {combo}x Combo!</span>
                </div>
              )}
            </motion.div>

            <motion.div
              className="bg-[#0f0f13] rounded-xl p-6 border border-gray-800"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Level</span>
                  <span className="text-white font-semibold text-xl">{level}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Lives</span>
                  <div className="flex gap-1">
                    {Array.from({ length: lives }).map((_, i) => (
                      <Heart key={i} className="w-5 h-5 fill-red-500 text-red-500" />
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Dots</span>
                  <span className="text-white font-semibold">{dotsRemaining}</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-[#0f0f13] rounded-xl p-6 border border-gray-800"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-sm text-gray-400 mb-3">Controls</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="bg-gray-700 px-2 py-1 rounded text-xs font-mono">↑ ↓ ← →</div>
                  <span className="text-gray-300">Move</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-gray-700 px-2 py-1 rounded text-xs font-mono">WASD</div>
                  <span className="text-gray-300">Move</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-gray-700 px-2 py-1 rounded text-xs font-mono">SPACE</div>
                  <span className="text-gray-300">Pause</span>
                </div>
              </div>
            </motion.div>

            {powerMode && (
              <motion.div
                className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-4 text-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <Zap className="w-6 h-6 mx-auto mb-2 animate-pulse" />
                <div className="font-bold">POWER MODE!</div>
                <div className="text-sm opacity-80">Eat the ghosts!</div>
              </motion.div>
            )}
          </div>

          {/* Canvas */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="bg-[#0f0f13] rounded-xl p-4 border-2 border-blue-600 shadow-2xl shadow-blue-600/20">
              <canvas
                ref={canvasRef}
                width={CANVAS_WIDTH}
                height={CANVAS_HEIGHT}
                className="rounded-lg"
              />
            </div>

            {/* Pause Overlay */}
            <AnimatePresence>
              {isPaused && !gameOver && (
                <motion.div
                  className="absolute inset-0 bg-black/80 backdrop-blur-sm rounded-xl flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="text-center">
                    <Pause className="w-16 h-16 mx-auto mb-4 text-purple-400" />
                    <h2 className="text-3xl font-bold mb-2">PAUSED</h2>
                    <p className="text-gray-400">Press SPACE to continue</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Game Over Overlay */}
            <AnimatePresence>
              {gameOver && (
                <motion.div
                  className="absolute inset-0 bg-black/90 backdrop-blur-sm rounded-xl flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="text-center">
                    <Trophy className="w-20 h-20 mx-auto mb-4 text-yellow-500" />
                    <h2 className="text-4xl font-bold mb-4">GAME OVER</h2>
                    <div className="bg-gray-800 rounded-lg p-6 mb-6 space-y-2">
                      <div className="text-2xl font-bold text-purple-400">{score.toLocaleString()} Points</div>
                      <div className="text-lg text-gray-300">
                        Level {level} • {DIFFICULTY_SETTINGS[difficulty].name}
                      </div>
                      <div className="mt-4 pt-4 border-t border-gray-700">
                        <div className="text-sm text-gray-400">Leaderboard Points</div>
                        <div className="text-3xl font-bold text-green-400">
                          {leaderboardPoints.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          ({score.toLocaleString()} × {DIFFICULTY_SETTINGS[difficulty].multiplier}x)
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3 justify-center">
                      <motion.button
                        onClick={handleRestart}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 rounded-lg flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <RotateCcw className="w-5 h-5" />
                        Play Again
                      </motion.button>
                      <motion.button
                        onClick={onBack}
                        className="bg-gray-700 px-6 py-3 rounded-lg flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Home className="w-5 h-5" />
                        Main Menu
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Victory Overlay */}
            <AnimatePresence>
              {showVictory && (
                <motion.div
                  className="absolute inset-0 bg-black/80 backdrop-blur-sm rounded-xl flex items-center justify-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <div className="text-center">
                    <Award className="w-24 h-24 mx-auto mb-4 text-yellow-500 animate-bounce" />
                    <h2 className="text-5xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                      LEVEL COMPLETE!
                    </h2>
                    <p className="text-2xl text-gray-300">+1000 Bonus Points</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Controls Panel */}
          <div className="w-64 space-y-4">
            <motion.div
              className="bg-[#0f0f13] rounded-xl p-6 border border-gray-800"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-lg mb-4">Game Controls</h2>
              <div className="space-y-2">
                <motion.button
                  onClick={() => setIsPaused(!isPaused)}
                  disabled={gameOver}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 py-3 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
                  {isPaused ? 'Resume' : 'Pause'}
                </motion.button>
                <motion.button
                  onClick={handleRestart}
                  className="w-full bg-gray-700 py-3 rounded-lg flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <RotateCcw className="w-5 h-5" />
                  Restart
                </motion.button>
                <motion.button
                  onClick={() => setIsMuted(!isMuted)}
                  className="w-full bg-gray-700 py-3 rounded-lg flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  Sound
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-xl p-6 border border-purple-700"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-lg mb-3 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-purple-400" />
                Scoring System
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-300">Dot</span>
                  <span className="text-yellow-400">+10</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Power Pellet</span>
                  <span className="text-yellow-400">+50</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Ghost (1st)</span>
                  <span className="text-yellow-400">+200</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Ghost (2nd)</span>
                  <span className="text-yellow-400">+400</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Ghost (3rd)</span>
                  <span className="text-yellow-400">+800</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Ghost (4th)</span>
                  <span className="text-yellow-400">+1600</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Fruit</span>
                  <span className="text-yellow-400">+100-2000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Level Complete</span>
                  <span className="text-yellow-400">+1000</span>
                </div>
                <div className="mt-4 pt-4 border-t border-purple-700">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Difficulty Bonus</span>
                    <span className="text-purple-400">{DIFFICULTY_SETTINGS[difficulty].multiplier}x</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-[#0f0f13] rounded-xl p-6 border border-gray-800"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-sm font-semibold mb-3">Ghost Behaviors</h3>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-gray-400">Blinky: Chases directly</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{background: '#FFB8FF'}}></div>
                  <span className="text-gray-400">Pinky: Targets ahead</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-cyan-400"></div>
                  <span className="text-gray-400">Inky: Complex pattern</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{background: '#FFB852'}}></div>
                  <span className="text-gray-400">Clyde: Shy behavior</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}