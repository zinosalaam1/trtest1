// Advanced animation configurations for Motion (Framer Motion)

export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3, ease: "easeInOut" }
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

export const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" }
};

export const fadeInScale = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.4, ease: "easeOut" }
};

export const slideInFromLeft = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.5, ease: "easeOut" }
};

export const slideInFromRight = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.5, ease: "easeOut" }
};

export const bounceIn = {
  initial: { opacity: 0, scale: 0.3 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  }
};

export const pulseAnimation = {
  scale: [1, 1.05, 1],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

export const glowAnimation = {
  boxShadow: [
    "0 0 10px rgba(168, 85, 247, 0.3)",
    "0 0 20px rgba(168, 85, 247, 0.6)",
    "0 0 10px rgba(168, 85, 247, 0.3)"
  ],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

export const floatAnimation = {
  y: [0, -10, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

export const rotateAnimation = {
  rotate: [0, 360],
  transition: {
    duration: 20,
    repeat: Infinity,
    ease: "linear"
  }
};

export const shimmerAnimation = {
  backgroundPosition: ["200% 0", "-200% 0"],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "linear"
  }
};

export const hoverScale = {
  whileHover: { 
    scale: 1.05,
    transition: { duration: 0.2 }
  },
  whileTap: { scale: 0.95 }
};

export const hoverLift = {
  whileHover: { 
    y: -5,
    boxShadow: "0 10px 30px rgba(168, 85, 247, 0.3)",
    transition: { duration: 0.2 }
  },
  whileTap: { scale: 0.98 }
};

export const hoverGlow = {
  whileHover: {
    boxShadow: "0 0 20px rgba(168, 85, 247, 0.6)",
    transition: { duration: 0.2 }
  }
};

export const coinAnimation = {
  initial: { scale: 0, rotate: 0, y: 0 },
  animate: { 
    scale: [0, 1.2, 1],
    rotate: [0, 360, 360],
    y: [0, -20, 0],
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export const notificationBadgePulse = {
  scale: [1, 1.2, 1],
  transition: {
    duration: 1,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

export const progressBarFill = (progress: number) => ({
  initial: { width: 0 },
  animate: { 
    width: `${progress}%`,
    transition: { 
      duration: 1, 
      ease: "easeOut" 
    }
  }
});

export const levelUpAnimation = {
  initial: { scale: 0, rotate: -180, opacity: 0 },
  animate: { 
    scale: [0, 1.5, 1],
    rotate: [0, 360, 360],
    opacity: [0, 1, 1],
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

export const streakFlame = {
  scale: [1, 1.1, 1],
  rotate: [-5, 5, -5],
  transition: {
    duration: 0.5,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

export const cardFlip = {
  rotateY: [0, 180],
  transition: {
    duration: 0.6,
    ease: "easeInOut"
  }
};

export const successPop = {
  initial: { scale: 0, opacity: 0 },
  animate: {
    scale: [0, 1.2, 1],
    opacity: [0, 1, 1],
    transition: {
      duration: 0.5,
      ease: [0.34, 1.56, 0.64, 1] // Custom easing for overshoot
    }
  }
};

export const errorShake = {
  x: [0, -10, 10, -10, 10, 0],
  transition: {
    duration: 0.5,
    ease: "easeInOut"
  }
};

export const loadingDots = {
  opacity: [0, 1, 0],
  transition: {
    duration: 1.5,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

export const particleFloat = {
  y: [0, -100],
  opacity: [1, 0],
  scale: [1, 0.5],
  transition: {
    duration: 2,
    ease: "easeOut"
  }
};

export const ribbonWave = {
  y: [0, -5, 0],
  scaleX: [1, 1.02, 1],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

export const iconBounce = {
  whileHover: {
    y: [0, -10, 0],
    transition: {
      duration: 0.5,
      ease: "easeInOut"
    }
  }
};
