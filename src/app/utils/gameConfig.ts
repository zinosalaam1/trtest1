// Centralized game configuration for Tour Arcade platform
// This ensures all games are consistently referenced across the entire system

export interface Game {
  id: string;
  title: string;
  displayName: string;
  image: string;
  category: string;
  players: string;
  rating: number;
  featured: boolean;
  description: string;
  emoji: string;
  difficulty: {
    easy: number;
    medium: number;
    hard: number;
  };
  hasLauncher: boolean; // Indicates if game has a full launcher/game component
}

export const GAMES: Record<string, Game> = {
  pacman: {
    id: 'pacman',
    title: 'PAC-MAN',
    displayName: 'PAC-MAN',
    image: 'https://images.unsplash.com/photo-1754246522949-69355c187b13?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNhZGUlMjBnYW1pbmclMjBjb2xvcmZ1bCUyMG5lb258ZW58MXx8fHwxNzczMjQ1NzEyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Arcade',
    players: '45.2K',
    rating: 5.0,
    featured: true,
    description: 'The legendary arcade classic! Navigate mazes, eat dots, and avoid ghosts in this timeless game.',
    emoji: '👻',
    difficulty: {
      easy: 1.0,
      medium: 1.5,
      hard: 2.0
    },
    hasLauncher: true
  },
  segarally: {
    id: 'segarally',
    title: 'SEGA Rally',
    displayName: 'SEGA Rally',
    image: 'https://images.unsplash.com/photo-1620855522342-de6d0ad7c3d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWNpbmclMjBjYXIlMjBhcmNhZGUlMjBnYW1lfGVufDF8fHx8MTc3NTcyMjIxN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Racing',
    players: '38.5K',
    rating: 4.9,
    featured: true,
    description: 'Classic rally racing action! Drift through challenging courses and beat the clock.',
    emoji: '🏎️',
    difficulty: {
      easy: 1.0,
      medium: 1.5,
      hard: 2.0
    },
    hasLauncher: false
  },
  streetfighter: {
    id: 'streetfighter',
    title: 'Street Fighter',
    displayName: 'Street Fighter',
    image: 'https://images.unsplash.com/photo-1759171053096-e7dbe7c36eb6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWdodGluZyUyMGdhbWUlMjBhcmNhZGV8ZW58MXx8fHwxNzc1NzAyNDczfDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Fighting',
    players: '52.1K',
    rating: 5.0,
    featured: true,
    description: 'The iconic fighting game! Master combos and special moves to defeat your opponents.',
    emoji: '🥊',
    difficulty: {
      easy: 1.0,
      medium: 1.5,
      hard: 2.0
    },
    hasLauncher: false
  },
  metalslug5: {
    id: 'metalslug5',
    title: 'Metal Slug 5',
    displayName: 'Metal Slug 5',
    image: 'https://images.unsplash.com/photo-1640152711682-83939d667926?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXRybyUyMGFyY2FkZSUyMHNob290ZXIlMjBnYW1lfGVufDF8fHx8MTc3NTcyMjIxN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Shooter',
    players: '41.3K',
    rating: 4.9,
    featured: true,
    description: 'Run and gun action! Battle through waves of enemies with powerful weapons and vehicles.',
    emoji: '💣',
    difficulty: {
      easy: 1.0,
      medium: 1.5,
      hard: 2.0
    },
    hasLauncher: false
  },
  nbajam: {
    id: 'nbajam',
    title: 'NBA Jam',
    displayName: 'NBA Jam',
    image: 'https://images.unsplash.com/photo-1573788709030-3f074effdb98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNrZXRiYWxsJTIwYXJjYWRlJTIwZ2FtZXxlbnwxfHx8fDE3NzU3MjIyMTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Sports',
    players: '48.7K',
    rating: 4.8,
    featured: true,
    description: 'He\'s on fire! Over-the-top basketball action with spectacular dunks and alley-oops.',
    emoji: '🏀',
    difficulty: {
      easy: 1.0,
      medium: 1.5,
      hard: 2.0
    },
    hasLauncher: false
  },
  tekken5: {
    id: 'tekken5',
    title: 'Tekken 5',
    displayName: 'Tekken 5',
    image: 'https://images.unsplash.com/photo-1759171053096-e7dbe7c36eb6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWdodGluZyUyMGdhbWUlMjBhcmNhZGV8ZW58MXx8fHwxNzc1NzAyNDczfDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Fighting',
    players: '39.2K',
    rating: 4.9,
    featured: false,
    description: 'The legendary 3D fighter! Execute devastating combos and master complex move sets.',
    emoji: '🥋',
    difficulty: {
      easy: 1.0,
      medium: 1.5,
      hard: 2.0
    },
    hasLauncher: false
  },
  pixelracer: {
    id: 'pixelracer',
    title: 'Pixel Racer',
    displayName: 'Pixel Racer',
    image: 'https://images.unsplash.com/photo-1620855522342-de6d0ad7c3d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWNpbmclMjBjYXIlMjBhcmNhZGUlMjBnYW1lfGVufDF8fHx8MTc3NTcyMjIxN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Racing',
    players: '33.8K',
    rating: 4.7,
    featured: false,
    description: 'Retro-style racing! Speed through pixel-perfect tracks and compete for the best lap times.',
    emoji: '🏁',
    difficulty: {
      easy: 1.0,
      medium: 1.5,
      hard: 2.0
    },
    hasLauncher: false
  },
  neonrunner: {
    id: 'neonrunner',
    title: 'Neon Runner',
    displayName: 'Neon Runner',
    image: 'https://images.unsplash.com/photo-1773291933807-1b109d528694?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZW9uJTIwcmFjaW5nJTIwZnV0dXJpc3RpY3xlbnwxfHx8fDE3NzU3MjIyMTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Arcade',
    players: '36.4K',
    rating: 4.8,
    featured: false,
    description: 'Endless runner in a neon world! Jump, slide, and dash through cyberpunk obstacles.',
    emoji: '⚡',
    difficulty: {
      easy: 1.0,
      medium: 1.5,
      hard: 2.0
    },
    hasLauncher: false
  },
  blitzchess: {
    id: 'blitzchess',
    title: 'Blitz Chess',
    displayName: 'Blitz Chess',
    image: 'https://images.unsplash.com/photo-1677816156349-5fa568399cce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVzcyUyMGJvYXJkJTIwZ2FtZSUyMHN0cmF0ZWd5fGVufDF8fHx8MTc3NTY0MjQyNnww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Strategy',
    players: '28.9K',
    rating: 4.9,
    featured: false,
    description: 'Fast-paced chess! Think quickly and execute brilliant tactics under time pressure.',
    emoji: '♟️',
    difficulty: {
      easy: 1.0,
      medium: 1.5,
      hard: 2.0
    },
    hasLauncher: false
  },
  contra: {
    id: 'contra',
    title: 'Contra',
    displayName: 'Contra',
    image: 'https://images.unsplash.com/photo-1640152711682-83939d667926?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXRybyUyMGFyY2FkZSUyMHNob290ZXIlMjBnYW1lfGVufDF8fHx8MTc3NTcyMjIxN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Shooter',
    players: '44.6K',
    rating: 5.0,
    featured: false,
    description: 'The classic run-and-gun! Battle alien forces with powerful weapons and teamwork.',
    emoji: '🔫',
    difficulty: {
      easy: 1.0,
      medium: 1.5,
      hard: 2.0
    },
    hasLauncher: false
  },
  mazeofkings: {
    id: 'mazeofkings',
    title: 'The Maze of Kings',
    displayName: 'The Maze of Kings',
    image: 'https://images.unsplash.com/photo-1772901337932-4ee4053eaecf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXplJTIwcHV6emxlJTIwZ2FtZXxlbnwxfHx8fDE3NzU3MDQwOTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Puzzle',
    players: '25.3K',
    rating: 4.7,
    featured: false,
    description: 'Navigate intricate mazes! Solve puzzles and find treasures in the ancient labyrinth.',
    emoji: '🗺️',
    difficulty: {
      easy: 1.0,
      medium: 1.5,
      hard: 2.0
    },
    hasLauncher: false
  },
  virtuaathlete2000: {
    id: 'virtuaathlete2000',
    title: 'Virtua Athlete 2000',
    displayName: 'Virtua Athlete 2000',
    image: 'https://images.unsplash.com/photo-1696507759797-0cd3695eed40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdGhsZXRpY3MlMjBzcG9ydHMlMjBnYW1lfGVufDF8fHx8MTc3NTcyMjIyMXww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Sports',
    players: '31.7K',
    rating: 4.6,
    featured: false,
    description: 'Olympic-style competition! Master button-timing in track and field events.',
    emoji: '🏃',
    difficulty: {
      easy: 1.0,
      medium: 1.5,
      hard: 2.0
    },
    hasLauncher: false
  },
  mariobros: {
    id: 'mariobros',
    title: 'Mario Bros',
    displayName: 'Mario Bros',
    image: 'https://images.unsplash.com/photo-1754246522949-69355c187b13?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGFzc2ljJTIwYXJjYWRlJTIwZ2FtZSUyMHJldHJvfGVufDF8fHx8MTc3NTcyMjIyMXww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Arcade',
    players: '57.2K',
    rating: 5.0,
    featured: true,
    description: 'The original platform classic! Jump on enemies and collect coins in the sewer.',
    emoji: '🍄',
    difficulty: {
      easy: 1.0,
      medium: 1.5,
      hard: 2.0
    },
    hasLauncher: false
  },
  donkeykong: {
    id: 'donkeykong',
    title: 'Donkey Kong',
    displayName: 'Donkey Kong',
    image: 'https://images.unsplash.com/photo-1754246522949-69355c187b13?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGFzc2ljJTIwYXJjYWRlJTIwZ2FtZSUyMHJldHJvfGVufDF8fHx8MTc3NTcyMjIyMXww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Arcade',
    players: '49.8K',
    rating: 5.0,
    featured: false,
    description: 'Save the princess! Climb platforms and avoid barrels in this arcade legend.',
    emoji: '🦍',
    difficulty: {
      easy: 1.0,
      medium: 1.5,
      hard: 2.0
    },
    hasLauncher: false
  },
  switchnshoot: {
    id: 'switchnshoot',
    title: 'Switch \'N\' Shoot',
    displayName: 'Switch \'N\' Shoot',
    image: 'https://images.unsplash.com/photo-1640152711682-83939d667926?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXRybyUyMGFyY2FkZSUyMHNob290ZXIlMjBnYW1lfGVufDF8fHx8MTc3NTcyMjIxN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Shooter',
    players: '22.4K',
    rating: 4.5,
    featured: false,
    description: 'Minimalist arcade shooter! Switch colors and shoot matching enemies in this addictive game.',
    emoji: '🎯',
    difficulty: {
      easy: 1.0,
      medium: 1.5,
      hard: 2.0
    },
    hasLauncher: false
  }
};

// Array of all available games
export const ALL_GAMES = Object.values(GAMES);

// Get game by ID
export function getGameById(id: string): Game | undefined {
  return GAMES[id];
}

// Get all game IDs
export function getAllGameIds(): string[] {
  return Object.keys(GAMES);
}

// Get featured games
export function getFeaturedGames(): Game[] {
  return ALL_GAMES.filter(game => game.featured);
}

// Get games by category
export function getGamesByCategory(category: string): Game[] {
  return ALL_GAMES.filter(game => game.category === category);
}

// Get all categories
export function getAllCategories(): string[] {
  return Array.from(new Set(ALL_GAMES.map(game => game.category)));
}

// Get games with launchers (fully implemented)
export function getPlayableGames(): Game[] {
  return ALL_GAMES.filter(game => game.hasLauncher);
}

// Calculate leaderboard points
export function calculateLeaderboardPoints(
  score: number, 
  difficulty: 'easy' | 'medium' | 'hard',
  gameId: string
): number {
  const game = getGameById(gameId);
  if (!game) return score;
  
  const multiplier = game.difficulty[difficulty];
  return Math.floor(score * multiplier);
}

// Update global leaderboard
export function updateGlobalLeaderboard(
  playerName: string,
  gameId: string,
  leaderboardPoints: number
): void {
  const globalLeaderboard = JSON.parse(localStorage.getItem('globalLeaderboard') || '[]');
  const playerIndex = globalLeaderboard.findIndex((p: any) => p.playerName === playerName);
  
  const gamePointsKey = `${gameId}Points`;
  
  if (playerIndex >= 0) {
    globalLeaderboard[playerIndex].totalPoints += leaderboardPoints;
    globalLeaderboard[playerIndex].gamesPlayed += 1;
    globalLeaderboard[playerIndex][gamePointsKey] = 
      (globalLeaderboard[playerIndex][gamePointsKey] || 0) + leaderboardPoints;
  } else {
    const newPlayer: any = {
      playerName,
      totalPoints: leaderboardPoints,
      gamesPlayed: 1
    };
    
    // Initialize all game points to 0
    getAllGameIds().forEach(id => {
      newPlayer[`${id}Points`] = id === gameId ? leaderboardPoints : 0;
    });
    
    globalLeaderboard.push(newPlayer);
  }
  
  globalLeaderboard.sort((a: any, b: any) => b.totalPoints - a.totalPoints);
  localStorage.setItem('globalLeaderboard', JSON.stringify(globalLeaderboard));
}

// Save game score to leaderboard
export function saveGameScore(
  gameId: string,
  score: number,
  leaderboardPoints: number,
  difficulty: 'easy' | 'medium' | 'hard',
  additionalData?: any
): void {
  const playerName = localStorage.getItem('ta_username') || localStorage.getItem('playerName') || 'Player';
  const leaderboardKey = `${gameId}Leaderboard`;
  
  // Save to game-specific leaderboard
  const gameLeaderboard = JSON.parse(localStorage.getItem(leaderboardKey) || '[]');
  gameLeaderboard.push({
    score,
    leaderboardPoints,
    difficulty,
    date: new Date().toISOString(),
    playerName,
    ...additionalData
  });
  gameLeaderboard.sort((a: any, b: any) => b.leaderboardPoints - a.leaderboardPoints);
  localStorage.setItem(leaderboardKey, JSON.stringify(gameLeaderboard.slice(0, 100)));
  
  // Update global leaderboard
  updateGlobalLeaderboard(playerName, gameId, leaderboardPoints);
}