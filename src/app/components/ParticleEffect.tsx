import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
  delay: number;
}

interface ParticleEffectProps {
  trigger?: boolean;
  origin?: { x: number; y: number };
  count?: number;
  colors?: string[];
}

export function ParticleEffect({ 
  trigger = false, 
  origin = { x: 50, y: 50 }, 
  count = 20,
  colors = ['#a855f7', '#ec4899', '#f59e0b', '#10b981']
}: ParticleEffectProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (trigger) {
      const newParticles: Particle[] = Array.from({ length: count }, (_, i) => ({
        id: Date.now() + i,
        x: origin.x + (Math.random() - 0.5) * 100,
        y: origin.y + (Math.random() - 0.5) * 100,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        duration: Math.random() * 1 + 0.5,
        delay: Math.random() * 0.2
      }));
      
      setParticles(newParticles);
      
      setTimeout(() => setParticles([]), 2000);
    }
  }, [trigger, origin.x, origin.y, count, colors]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color
          }}
          initial={{ opacity: 1, scale: 0 }}
          animate={{
            opacity: 0,
            scale: 1,
            y: -100,
            x: (Math.random() - 0.5) * 200
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  );
}

export function CoinExplosion({ trigger, x, y }: { trigger: boolean; x: number; y: number }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (trigger) {
      setShow(true);
      setTimeout(() => setShow(false), 1500);
    }
  }, [trigger]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl"
          style={{ left: x, top: y }}
          initial={{ opacity: 1, scale: 0 }}
          animate={{
            opacity: 0,
            scale: [0, 1.5, 1],
            x: (Math.random() - 0.5) * 300,
            y: -150 - Math.random() * 100,
            rotate: Math.random() * 720
          }}
          transition={{
            duration: 1.2,
            delay: i * 0.05,
            ease: "easeOut"
          }}
        >
          🪙
        </motion.div>
      ))}
    </div>
  );
}

export function SuccessConfetti({ trigger }: { trigger: boolean }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (trigger) {
      setShow(true);
      setTimeout(() => setShow(false), 3000);
    }
  }, [trigger]);

  if (!show) return null;

  const confettiPieces = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    color: ['#a855f7', '#ec4899', '#f59e0b', '#10b981', '#3b82f6'][i % 5],
    delay: Math.random() * 0.5,
    duration: 2 + Math.random() * 2
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {confettiPieces.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute w-3 h-3 rounded-sm"
          style={{
            left: piece.left,
            top: -20,
            backgroundColor: piece.color
          }}
          initial={{ opacity: 1 }}
          animate={{
            y: window.innerHeight + 100,
            rotate: Math.random() * 1080,
            x: (Math.random() - 0.5) * 200,
            opacity: [1, 1, 0]
          }}
          transition={{
            duration: piece.duration,
            delay: piece.delay,
            ease: "easeIn"
          }}
        />
      ))}
    </div>
  );
}
