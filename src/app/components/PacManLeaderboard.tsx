import { gamesApi } from '../utils/api';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Home, Settings, Trophy, Medal, Crown, Star, TrendingUp, Zap, Shield, Flame, Filter, Calendar, Award } from 'lucide-react';
import logo from '../../assets/logo.svg';

interface PacManLeaderboardProps {
  onBack: () => void;
  onOpenSettings?: () => void;
}

interface LeaderboardEntry {
  username: string;
  totalPoints: number;
  highScore: number;
  gamesPlayed: number;
  difficulty: string;
  timestamp: string;
  avatar?: string;
}

const MOCK_PLAYERS = [
  { username: 'GhostHunter', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=skillmaster' },
  { username: 'PacMaster', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=speedrunner' },
  { username: 'DotEater3000', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=arcadeking' },
  { username: 'MazeRunner', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=elitegamer' },
  { username: 'ArcadeKing', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=arcadeking2' },
  { username: 'PixelPro', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=player1' },
  { username: 'RetroGamer', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=player2' },
  { username: 'SpeedDemon', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=player3' },
  { username: 'PowerPellet', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=player4' },
  { username: 'ClassicChamp', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=player5' },
];

export function PacManLeaderboard({
  const [leaderboardData, setLeaderboardData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    gamesApi.getLeaderboard('pacman').then(data => {
      setLeaderboardData(data || []);
      setIsLoading(false);
    }).catch(() => setIsLoading(false));
  }, []);
 onBack, onOpenSettings }: PacManLeaderboardProps) {
  const [timeFilter, setTimeFilter] = useState<'all' | 'today' | 'week' | 'month'>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    // Get scores from localStorage
    const scores = JSON.parse(localStorage.getItem('pacman_scores') || '[]');
    
    // Aggregate scores by username
    const aggregated = new Map<string, LeaderboardEntry>();
    
    scores.forEach((score: any) => {
      const existing = aggregated.get(score.username) || {
        username: score.username,
        totalPoints: 0,
        highScore: 0,
        gamesPlayed: 0,
        difficulty: score.difficulty,
        timestamp: score.timestamp,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user'
      };
      
      existing.totalPoints += score.leaderboardPoints;
      existing.gamesPlayed += 1;
      if (score.score > existing.highScore) {
        existing.highScore = score.score;
        existing.difficulty = score.difficulty;
      }
      
      aggregated.set(score.username, existing);
    });

    // Add mock players to fill leaderboard
    const mockScores = MOCK_PLAYERS.map((player, idx) => ({
      username: player.username,
      totalPoints: Math.floor(Math.random() * 50000) + 10000,
      highScore: Math.floor(Math.random() * 10000) + 5000,
      gamesPlayed: Math.floor(Math.random() * 50) + 10,
      difficulty: ['easy', 'medium', 'hard'][Math.floor(Math.random() * 3)],
      timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
      avatar: player.avatar
    }));

    // Merge real and mock data
    const allEntries = [...Array.from(aggregated.values()), ...mockScores];
    
    // Sort by total points
    const sorted = allEntries.sort((a, b) => b.totalPoints - a.totalPoints);
    
    setLeaderboardData(sorted);
  }, []);

  const filteredData = leaderboardData.filter(entry => {
    if (difficultyFilter !== 'all' && entry.difficulty !== difficultyFilter) {
      return false;
    }
    
    if (timeFilter !== 'all') {
      const entryDate = new Date(entry.timestamp);
      const now = new Date();
      
      if (timeFilter === 'today') {
        return entryDate.toDateString() === now.toDateString();
      } else if (timeFilter === 'week') {
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        return entryDate >= weekAgo;
      } else if (timeFilter === 'month') {
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        return entryDate >= monthAgo;
      }
    }
    
    return true;
  });

  const currentUserRank = filteredData.findIndex(entry => entry.username === localStorage.getItem('ta_username') || 'You') + 1;
  const currentUserData = filteredData.find(entry => entry.username === localStorage.getItem('ta_username') || 'You');

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return <Shield className="w-4 h-4 text-green-400" />;
      case 'medium': return <Zap className="w-4 h-4 text-yellow-400" />;
      case 'hard': return <Flame className="w-4 h-4 text-red-400" />;
      default: return null;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'hard': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

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
            Back to Game
          </button>
          <img src={logo} alt="Tour Arcade" className="h-8" />
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenSettings}
            className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Trophy className="w-12 h-12 text-yellow-500" />
              <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Global Leaderboard
              </h1>
              <Trophy className="w-12 h-12 text-yellow-500" />
            </div>
            <p className="text-xl text-gray-400">
              Compete with players worldwide and climb the ranks!
            </p>
          </motion.div>

          {/* User Stats Card */}
          {currentUserData && (
            <motion.div
              className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-2xl border border-purple-600 p-6 mb-8"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center text-2xl font-bold">
                    #{currentUserRank}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-1">Your Ranking</h3>
                    <p className="text-gray-400">Keep playing to climb higher!</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400">{currentUserData.totalPoints.toLocaleString()}</div>
                    <div className="text-sm text-gray-400">Total Points</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-400">{currentUserData.highScore.toLocaleString()}</div>
                    <div className="text-sm text-gray-400">High Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-400">{currentUserData.gamesPlayed}</div>
                    <div className="text-sm text-gray-400">Games Played</div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Filters */}
          <motion.div
            className="bg-[#0f0f13] rounded-xl border border-gray-800 p-6 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Filter className="w-5 h-5 text-gray-400" />
                <h3 className="text-lg font-semibold">Filters</h3>
              </div>
              
              <div className="flex items-center gap-4">
                {/* Time Filter */}
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <select
                    value={timeFilter}
                    onChange={(e) => setTimeFilter(e.target.value as any)}
                    className="bg-gray-800 border-0 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                  >
                    <option value="all">All Time</option>
                    <option value="today">Today</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                  </select>
                </div>

                {/* Difficulty Filter */}
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-gray-400" />
                  <select
                    value={difficultyFilter}
                    onChange={(e) => setDifficultyFilter(e.target.value as any)}
                    className="bg-gray-800 border-0 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                  >
                    <option value="all">All Difficulties</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Leaderboard Table */}
          <motion.div
            className="bg-[#0f0f13] rounded-xl border border-gray-800 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* Table Header */}
            <div className="bg-gray-900 px-6 py-4 flex items-center text-sm font-semibold text-gray-400">
              <div className="w-20">Rank</div>
              <div className="flex-1">Player</div>
              <div className="w-40 text-right">Total Points</div>
              <div className="w-32 text-right">High Score</div>
              <div className="w-32 text-right">Games</div>
              <div className="w-32 text-right">Difficulty</div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-800">
              {filteredData.slice(0, 50).map((entry, idx) => {
                const isCurrentUser = entry.username === localStorage.getItem('ta_username') || 'You';
                
                return (
                  <motion.div
                    key={idx}
                    className={`px-6 py-4 flex items-center hover:bg-gray-900/50 transition-colors ${
                      isCurrentUser ? 'bg-purple-900/20' : ''
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.02 }}
                  >
                    {/* Rank */}
                    <div className="w-20">
                      <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full font-bold ${
                        idx === 0 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black' :
                        idx === 1 ? 'bg-gradient-to-r from-gray-300 to-gray-500 text-black' :
                        idx === 2 ? 'bg-gradient-to-r from-orange-400 to-orange-600 text-white' :
                        isCurrentUser ? 'bg-purple-600 text-white' :
                        'bg-gray-700 text-white'
                      }`}>
                        {idx === 0 ? <Crown className="w-5 h-5" /> :
                         idx === 1 ? <Medal className="w-5 h-5" /> :
                         idx === 2 ? <Award className="w-5 h-5" /> :
                         idx + 1}
                      </div>
                    </div>

                    {/* Player */}
                    <div className="flex-1 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-700">
                        <img 
                          src={entry.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=user'} 
                          alt={entry.username}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className={`font-semibold ${isCurrentUser ? 'text-purple-400' : 'text-white'}`}>
                          {entry.username}
                          {isCurrentUser && <span className="ml-2 text-xs text-purple-400">(You)</span>}
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(entry.timestamp).toLocaleDateString()}
                        </div>
                      </div>
                    </div>

                    {/* Total Points */}
                    <div className="w-40 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <TrendingUp className="w-4 h-4 text-green-400" />
                        <span className="text-green-400 font-bold text-lg">
                          {entry.totalPoints.toLocaleString()}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500">Leaderboard Points</div>
                    </div>

                    {/* High Score */}
                    <div className="w-32 text-right">
                      <div className="text-yellow-400 font-semibold">
                        {entry.highScore.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500">Best Score</div>
                    </div>

                    {/* Games Played */}
                    <div className="w-32 text-right">
                      <div className="text-white font-semibold">
                        {entry.gamesPlayed}
                      </div>
                      <div className="text-xs text-gray-500">Matches</div>
                    </div>

                    {/* Difficulty */}
                    <div className="w-32 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {getDifficultyIcon(entry.difficulty)}
                        <span className={`font-semibold capitalize ${getDifficultyColor(entry.difficulty)}`}>
                          {entry.difficulty}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Empty State */}
          {filteredData.length === 0 && (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Trophy className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl mb-2">No scores found</h3>
              <p className="text-gray-400">Try adjusting your filters or play some games to get started!</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
