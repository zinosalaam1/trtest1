import { Menu, Settings, Home, Users, Trophy, Gift, Sparkles, ShoppingCart, Crown, Zap, Calendar, Clock, DollarSign, Award, ChevronRight } from 'lucide-react';
import logo from '../../assets/logo.svg';

import { motion } from 'motion/react';
import { showToast } from './ToastManager';

interface EventDetailsPageProps {
  eventId: string;
  onBack: () => void;
  onOpenSettings?: () => void;
  onOpenProfile?: () => void;
  onNavigate: (page: string) => void;
}

const eventDetails: Record<string, any> = {
  '1': {
    title: 'Weekend Warrior Tournament',
    subtitle: 'Compete for Glory and Prizes',
    description: 'Join our premier weekend tournament featuring the best players from around the world. Battle through multiple rounds to claim your spot at the top and win massive prizes!',
    image: 'https://placehold.co/400x200/1a0533/a855f7?text=Tour+Arcade',
    startDate: 'Saturday, 8:00 PM EST',
    duration: '3 hours',
    prizePool: '$5,000',
    entryFee: '$25',
    maxPlayers: '128',
    currentPlayers: '94',
    format: 'Single Elimination',
    game: 'Traffic Rider',
    requirements: [
      'Account level 10 or higher',
      'Win rate above 40%',
      'Good standing with no recent violations'
    ],
    prizes: [
      { place: '1st Place', prize: '$2,000', icon: '🥇' },
      { place: '2nd Place', prize: '$1,200', icon: '🥈' },
      { place: '3rd Place', prize: '$800', icon: '🥉' },
      { place: '4th-8th', prize: '$250 each', icon: '🏆' }
    ]
  },
  '2': {
    title: 'Speed Run Challenge',
    subtitle: 'Beat the Clock!',
    description: 'Race against time in our intense speed run challenge. Complete levels as fast as possible and compete for the fastest times on the leaderboard.',
    image: 'https://placehold.co/400x200/1a0533/a855f7?text=Tour+Arcade',
    startDate: 'Daily at 6:00 PM EST',
    duration: '1 hour',
    prizePool: '$500',
    entryFee: 'Free',
    maxPlayers: 'Unlimited',
    currentPlayers: '2,341',
    format: 'Time Trial',
    game: 'Race Master',
    requirements: [
      'Complete tutorial',
      'Account in good standing'
    ],
    prizes: [
      { place: 'Top 10%', prize: '$50 each', icon: '⚡' },
      { place: 'Top 25%', prize: '$20 each', icon: '💨' }
    ]
  },
  '3': {
    title: 'Team Clash Championship',
    subtitle: 'Ultimate Team Battle',
    description: 'Bring your squad and compete in the ultimate team championship. Coordinate with your teammates and dominate the competition!',
    image: 'https://placehold.co/400x200/1a0533/a855f7?text=Tour+Arcade',
    startDate: 'Sunday, 7:00 PM EST',
    duration: '4 hours',
    prizePool: '$10,000',
    entryFee: '$100 per team',
    maxPlayers: '32 teams',
    currentPlayers: '24 teams',
    format: '4v4 Double Elimination',
    game: 'Cyber Hunter',
    requirements: [
      'Full team of 4 players',
      'Team leader level 15+',
      'Combined team rating 1500+'
    ],
    prizes: [
      { place: '1st Place Team', prize: '$5,000', icon: '👑' },
      { place: '2nd Place Team', prize: '$3,000', icon: '🏆' },
      { place: '3rd Place Team', prize: '$2,000', icon: '🎖️' }
    ]
  }
};

export function EventDetailsPage({ eventId, onBack, onOpenSettings, onOpenProfile, onNavigate }: EventDetailsPageProps) {
  const event = eventDetails[eventId] || eventDetails['1'];

  const handleJoinEvent = () => {
    showToast({ 
      type: 'success', 
      title: 'Registration Successful!', 
      message: `You're registered for ${event.title}` 
    });
  };

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Left Sidebar */}
      <div className="w-16 bg-[#0f0f13] flex flex-col items-center py-6 gap-6 border-r border-gray-800">
        <button onClick={onBack} className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors">
          <Home className="w-5 h-5" />
        </button>
        <button onClick={onOpenProfile} className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors">
          <Users className="w-5 h-5" />
        </button>
        <button onClick={() => onNavigate('tournaments')} className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors">
          <Trophy className="w-5 h-5" />
        </button>
        <button onClick={() => onNavigate('marketplace')} className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors">
          <Gift className="w-5 h-5" />
        </button>
        <button onClick={() => onNavigate('events')} className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
          <Sparkles className="w-5 h-5" />
        </button>
        <button onClick={() => onNavigate('shop')} className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors">
          <ShoppingCart className="w-5 h-5" />
        </button>
        <button onClick={() => onNavigate('premium')} className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors">
          <Crown className="w-5 h-5" />
        </button>
        <button onClick={() => onNavigate('quickmatch')} className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors">
          <Zap className="w-5 h-5" />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-[#0f0f13] border-b border-gray-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button className="text-gray-400 hover:text-white"><Menu className="w-6 h-6" /></button>
            <img src={logo} alt="Tour Arcade" className="h-8" />
          </div>
          <div className="flex items-center gap-3">
            <button onClick={onOpenSettings} className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center hover:bg-gray-500 transition-colors">
              <Settings className="w-5 h-5" />
            </button>
            <button onClick={onOpenProfile} className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" alt="User" className="w-full h-full rounded-full object-cover" />
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto">
          {/* Hero Image */}
          <motion.div 
            className="relative h-96 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <img 
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-12">
              <motion.button 
                onClick={onBack}
                className="flex items-center gap-2 text-gray-300 hover:text-white mb-6"
                whileHover={{ x: -5 }}
              >
                <ChevronRight className="w-5 h-5 rotate-180" />
                Back to Events
              </motion.button>
              <motion.h1 
                className="text-6xl mb-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
              >
                {event.title}
              </motion.h1>
              <motion.p 
                className="text-2xl text-gray-300"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                {event.subtitle}
              </motion.p>
            </div>
          </motion.div>

          {/* Content */}
          <div className="p-12 max-w-7xl mx-auto">
            <div className="grid grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="col-span-2 space-y-8">
                {/* Description */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h2 className="text-3xl mb-4">About This Event</h2>
                  <p className="text-gray-300 text-lg leading-relaxed">{event.description}</p>
                </motion.div>

                {/* Requirements */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-[#1a1a1f] rounded-xl p-6"
                >
                  <h3 className="text-2xl mb-4 flex items-center gap-2">
                    <Award className="w-6 h-6 text-purple-500" />
                    Requirements
                  </h3>
                  <ul className="space-y-2">
                    {event.requirements.map((req: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-3 text-gray-300">
                        <span className="text-green-500 mt-1">✓</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Prize Distribution */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 rounded-xl p-6 border border-yellow-600/50"
                >
                  <h3 className="text-2xl mb-6 flex items-center gap-2">
                    <Trophy className="w-6 h-6 text-yellow-500" />
                    Prize Distribution
                  </h3>
                  <div className="space-y-4">
                    {event.prizes.map((prize: any, idx: number) => (
                      <motion.div
                        key={idx}
                        className="flex items-center justify-between bg-black/30 rounded-lg p-4"
                        whileHover={{ scale: 1.02, backgroundColor: 'rgba(0,0,0,0.5)' }}
                      >
                        <div className="flex items-center gap-4">
                          <span className="text-4xl">{prize.icon}</span>
                          <span className="text-xl">{prize.place}</span>
                        </div>
                        <span className="text-2xl text-green-400">{prize.prize}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Event Info Card */}
                <motion.div
                  className="bg-[#1a1a1f] rounded-xl p-6 border border-purple-600"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="text-2xl mb-6">Event Details</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-purple-500 mt-1" />
                      <div>
                        <p className="text-gray-400 text-sm">Start Time</p>
                        <p className="text-white">{event.startDate}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-purple-500 mt-1" />
                      <div>
                        <p className="text-gray-400 text-sm">Duration</p>
                        <p className="text-white">{event.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <DollarSign className="w-5 h-5 text-green-500 mt-1" />
                      <div>
                        <p className="text-gray-400 text-sm">Prize Pool</p>
                        <p className="text-green-400 text-xl">{event.prizePool}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Trophy className="w-5 h-5 text-yellow-500 mt-1" />
                      <div>
                        <p className="text-gray-400 text-sm">Entry Fee</p>
                        <p className="text-white">{event.entryFee}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Users className="w-5 h-5 text-blue-500 mt-1" />
                      <div>
                        <p className="text-gray-400 text-sm">Players</p>
                        <p className="text-white">{event.currentPlayers} / {event.maxPlayers}</p>
                      </div>
                    </div>
                  </div>

                  {/* Join Button */}
                  <motion.button
                    onClick={handleJoinEvent}
                    className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-600 py-4 rounded-lg text-lg"
                    whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(168, 85, 247, 0.6)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Join Event
                  </motion.button>
                </motion.div>

                {/* Format Info */}
                <motion.div
                  className="bg-[#1a1a1f] rounded-xl p-6"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="text-xl mb-4">Format</h3>
                  <p className="text-gray-300">{event.format}</p>
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <p className="text-gray-400 text-sm mb-2">Featured Game</p>
                    <p className="text-white text-lg">{event.game}</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
