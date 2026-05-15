import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Settings, Trophy, Users, Calendar, DollarSign, Clock, Gamepad2, Plus, X, Check } from 'lucide-react';
import logo from '../../assets/logo.svg';

interface CreateTournamentPageProps {
  onBack: () => void;
  onOpenSettings?: () => void;
  onNavigate?: (page: string) => void;
  onTournamentCreated?: (tournamentId: string) => void;
}

export function CreateTournamentPage({ onBack, onOpenSettings, onNavigate, onTournamentCreated }: CreateTournamentPageProps) {
  const [tournamentName, setTournamentName] = useState('');
  const [selectedGame, setSelectedGame] = useState<'pacman' | 'amongus' | ''>('');
  const [format, setFormat] = useState<'single-elimination' | 'double-elimination' | 'round-robin'>('single-elimination');
  const [maxPlayers, setMaxPlayers] = useState<number>(16);
  const [prizePool, setPrizePool] = useState('');
  const [entryFee, setEntryFee] = useState('');
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [duration, setDuration] = useState<number>(60);
  const [description, setDescription] = useState('');
  const [rules, setRules] = useState<string[]>(['']);
  const [isCreating, setIsCreating] = useState(false);

  const games = [
    { id: 'pacman', name: 'PAC-MAN', emoji: '👻', color: 'from-yellow-600 to-yellow-700' },
    { id: 'amongus', name: 'Among Us', emoji: '🚀', color: 'from-green-600 to-blue-600' }
  ];

  const formats = [
    { id: 'single-elimination', name: 'Single Elimination', description: 'One loss and you\'re out' },
    { id: 'double-elimination', name: 'Double Elimination', description: 'Two losses allowed' },
    { id: 'round-robin', name: 'Round Robin', description: 'Everyone plays everyone' }
  ];

  const playerCounts = [8, 16, 32, 64, 128];

  const handleAddRule = () => {
    setRules([...rules, '']);
  };

  const handleRemoveRule = (index: number) => {
    setRules(rules.filter((_, i) => i !== index));
  };

  const handleRuleChange = (index: number, value: string) => {
    const newRules = [...rules];
    newRules[index] = value;
    setRules(newRules);
  };

  const handleCreateTournament = () => {
    setIsCreating(true);
    
    // Simulate tournament creation
    setTimeout(() => {
      const tournament = {
        id: Date.now().toString(),
        name: tournamentName,
        game: selectedGame,
        format,
        maxPlayers,
        prizePool,
        entryFee,
        startDate,
        startTime,
        duration,
        description,
        rules: rules.filter(r => r.trim() !== ''),
        createdAt: new Date().toISOString(),
        status: 'upcoming',
        currentPlayers: 0
      };

      // Save to localStorage
      const tournaments = JSON.parse(localStorage.getItem('customTournaments') || '[]');
      tournaments.push(tournament);
      localStorage.setItem('customTournaments', JSON.stringify(tournaments));

      setIsCreating(false);
      
      if (onTournamentCreated) {
        onTournamentCreated(tournament.id);
      } else {
        onBack();
      }
    }, 1500);
  };

  const isFormValid = () => {
    return (
      tournamentName.trim() !== '' &&
      selectedGame !== '' &&
      startDate !== '' &&
      startTime !== '' &&
      prizePool.trim() !== ''
    );
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Header */}
      <header className="bg-[#0f0f13] border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <img src={logo} alt="Tour Arcade" className="h-8" />
          <div className="h-6 w-px bg-gray-700" />
          <h1 className="text-xl font-bold">Create Tournament</h1>
        </div>
        {onOpenSettings && (
          <button
            onClick={onOpenSettings}
            className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors"
          >
            <Settings className="w-5 h-5" />
          </button>
        )}
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-8 py-12">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            Create Your Tournament
          </h1>
          <p className="text-xl text-gray-400">
            Set up a custom tournament for the Tour Arcade community
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="space-y-6"
        >
          {/* Basic Information */}
          <div className="bg-[#1a1a24] border border-gray-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Trophy className="w-6 h-6 text-purple-400" />
              Basic Information
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-400 mb-2">Tournament Name *</label>
                <input
                  type="text"
                  value={tournamentName}
                  onChange={(e) => setTournamentName(e.target.value)}
                  placeholder="e.g., Winter Championship 2026"
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-400 mb-2">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your tournament..."
                  rows={3}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>
            </div>
          </div>

          {/* Game Selection */}
          <div className="bg-[#1a1a24] border border-gray-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Gamepad2 className="w-6 h-6 text-purple-400" />
              Select Game *
            </h2>
            
            <div className="grid grid-cols-2 gap-4">
              {games.map((game) => (
                <motion.button
                  key={game.id}
                  onClick={() => setSelectedGame(game.id as any)}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    selectedGame === game.id
                      ? 'border-purple-500 bg-purple-900/30'
                      : 'border-gray-700 bg-gray-900/50 hover:border-gray-600'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="text-4xl mb-2">{game.emoji}</div>
                  <div className="font-bold text-lg">{game.name}</div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Tournament Format */}
          <div className="bg-[#1a1a24] border border-gray-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Users className="w-6 h-6 text-purple-400" />
              Tournament Format
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-400 mb-2">Format Type</label>
                <div className="grid gap-3">
                  {formats.map((fmt) => (
                    <button
                      key={fmt.id}
                      onClick={() => setFormat(fmt.id as any)}
                      className={`p-4 rounded-lg border-2 text-left transition-all ${
                        format === fmt.id
                          ? 'border-purple-500 bg-purple-900/30'
                          : 'border-gray-700 bg-gray-900/50 hover:border-gray-600'
                      }`}
                    >
                      <div className="font-bold">{fmt.name}</div>
                      <div className="text-sm text-gray-400">{fmt.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-400 mb-2">Maximum Players</label>
                <div className="grid grid-cols-5 gap-2">
                  {playerCounts.map((count) => (
                    <button
                      key={count}
                      onClick={() => setMaxPlayers(count)}
                      className={`py-3 rounded-lg border-2 font-bold transition-all ${
                        maxPlayers === count
                          ? 'border-purple-500 bg-purple-900/30'
                          : 'border-gray-700 bg-gray-900/50 hover:border-gray-600'
                      }`}
                    >
                      {count}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Schedule & Prizes */}
          <div className="bg-[#1a1a24] border border-gray-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-purple-400" />
              Schedule & Prizes
            </h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-400 mb-2">Start Date *</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-400 mb-2">Start Time *</label>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-400 mb-2">Duration (minutes)</label>
                <input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(parseInt(e.target.value))}
                  min="30"
                  step="30"
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-400 mb-2">Prize Pool *</label>
                <input
                  type="text"
                  value={prizePool}
                  onChange={(e) => setPrizePool(e.target.value)}
                  placeholder="e.g., $5,000"
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-400 mb-2">Entry Fee (optional)</label>
                <input
                  type="text"
                  value={entryFee}
                  onChange={(e) => setEntryFee(e.target.value)}
                  placeholder="e.g., $10 or Free"
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>
            </div>
          </div>

          {/* Rules */}
          <div className="bg-[#1a1a24] border border-gray-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Check className="w-6 h-6 text-purple-400" />
              Tournament Rules
            </h2>
            
            <div className="space-y-3">
              {rules.map((rule, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={rule}
                    onChange={(e) => handleRuleChange(index, e.target.value)}
                    placeholder={`Rule ${index + 1}`}
                    className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                  {rules.length > 1 && (
                    <button
                      onClick={() => handleRemoveRule(index)}
                      className="w-12 h-12 bg-red-900/50 border border-red-700 rounded-lg flex items-center justify-center hover:bg-red-900 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={handleAddRule}
                className="w-full py-3 border-2 border-dashed border-gray-700 rounded-lg hover:border-purple-600 hover:bg-purple-900/20 transition-all flex items-center justify-center gap-2 text-gray-400 hover:text-purple-400"
              >
                <Plus className="w-5 h-5" />
                Add Rule
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <motion.button
              onClick={onBack}
              className="flex-1 bg-gray-800 px-6 py-4 rounded-xl font-bold hover:bg-gray-700 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Cancel
            </motion.button>
            <motion.button
              onClick={handleCreateTournament}
              disabled={!isFormValid() || isCreating}
              className={`flex-1 px-6 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
                isFormValid() && !isCreating
                  ? 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600'
                  : 'bg-gray-700 cursor-not-allowed opacity-50'
              }`}
              whileHover={isFormValid() && !isCreating ? { scale: 1.02 } : {}}
              whileTap={isFormValid() && !isCreating ? { scale: 0.98 } : {}}
            >
              {isCreating ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  >
                    <Trophy className="w-5 h-5" />
                  </motion.div>
                  Creating Tournament...
                </>
              ) : (
                <>
                  <Trophy className="w-5 h-5" />
                  Create Tournament
                </>
              )}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
