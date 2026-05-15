import { motion, useScroll, useTransform } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Gamepad2, Zap, Trophy, Users, TrendingUp, Shield, Award, Star, Clock, DollarSign, Target, Sparkles } from 'lucide-react';
import { FaTwitter, FaDiscord, FaYoutube, FaTiktok } from 'react-icons/fa';
import logo from '../../assets/trbg.png';
import { useState, useEffect } from 'react';

export function LandingPage() {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);
  const [activeFeature, setActiveFeature] = useState(0);
  const [stats, setStats] = useState({
    players: 0,
    prizePool: 0,
    tournaments: 0,
    gamesPlayed: 0
  });

  // Animate stats on mount
  useEffect(() => {
    const animateValue = (start: number, end: number, duration: number, callback: (val: number) => void) => {
      const startTime = Date.now();
      const timer = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(start + (end - start) * progress);
        callback(current);
        if (progress === 1) clearInterval(timer);
      }, 16);
    };

    animateValue(0, 250000, 2000, (val) => setStats(s => ({ ...s, players: val })));
    animateValue(0, 850000, 2000, (val) => setStats(s => ({ ...s, prizePool: val })));
    animateValue(0, 1240, 2000, (val) => setStats(s => ({ ...s, tournaments: val })));
    animateValue(0, 5600000, 2000, (val) => setStats(s => ({ ...s, gamesPlayed: val })));
  }, []);

  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <Trophy className="w-8 h-8 md:w-12 md:h-12" />,
      title: "Compete & Win",
      description: "Battle for your share of $850K+ monthly prizes",
      gradient: "from-yellow-600 to-orange-600",
      emoji: "🏆"
    },
    {
      icon: <Users className="w-8 h-8 md:w-12 md:h-12" />,
      title: "Join Elite Tournaments",
      description: "Team-based competitions with massive rewards",
      gradient: "from-purple-600 to-pink-600",
      emoji: "👥"
    },
    {
      icon: <TrendingUp className="w-8 h-8 md:w-12 md:h-12" />,
      title: "Skill-Based Matching",
      description: "Fair matchmaking ensures competitive gameplay",
      gradient: "from-blue-600 to-cyan-600",
      emoji: "📈"
    },
    {
      icon: <Shield className="w-8 h-8 md:w-12 md:h-12" />,
      title: "Secure & Fair",
      description: "Anti-cheat protection and verified payouts",
      gradient: "from-green-600 to-emerald-600",
      emoji: "🛡️"
    }
  ];

  const games = [
    {
      title: 'PAC-MAN',
      emoji: '👻',
      gradient: 'from-yellow-600 to-orange-600',
      players: '45K+',
      prizePool: '$12K'
    },
    {
      title: 'SEGA Rally',
      emoji: '🏎️',
      gradient: 'from-blue-600 to-cyan-600',
      players: '38K+',
      prizePool: '$10K'
    },
    {
      title: 'Street Fighter',
      emoji: '🥊',
      gradient: 'from-red-600 to-orange-600',
      players: '52K+',
      prizePool: '$15K'
    },
    {
      title: 'Metal Slug 5',
      emoji: '💣',
      gradient: 'from-green-600 to-emerald-600',
      players: '31K+',
      prizePool: '$9K'
    },
    {
      title: 'NBA Jam',
      emoji: '🏀',
      gradient: 'from-orange-600 to-red-600',
      players: '42K+',
      prizePool: '$11K'
    },
    {
      title: 'Tekken 5',
      emoji: '🥋',
      gradient: 'from-purple-600 to-pink-600',
      players: '48K+',
      prizePool: '$14K'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">
      {/* Animated Background */}
      <motion.div
        className="fixed inset-0 pointer-events-none overflow-hidden"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-blue-900/10" />
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-purple-500/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </motion.div>

      {/* Header */}
      <motion.header
        className="relative z-10 flex items-center justify-between px-4 md:px-8 py-4 md:py-6 border-b border-gray-900/50 backdrop-blur-sm bg-[#0a0a0f]/80 sticky top-0"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.img
          src={logo}
          alt="Tour Arcade"
          className="h-8 md:h-12"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400 }}
        />
        <div className="flex items-center gap-2 md:gap-4">
          <motion.button
            onClick={() => navigate('/signin')}
            className="px-3 md:px-4 py-2 rounded text-sm md:text-base text-gray-300 hover:text-white transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Sign In
          </motion.button>
          <motion.button
            onClick={() => navigate('/signup')}
            className="bg-gradient-to-r from-purple-600 to-pink-600 px-4 md:px-6 py-2 rounded text-sm md:text-base hover:opacity-90 transition-opacity"
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(168, 85, 247, 0.5)" }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
          </motion.button>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative z-10 px-4 md:px-8 py-12 md:py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h1
              className="text-4xl md:text-7xl lg:text-8xl font-bold mb-4 md:mb-6 tracking-tight"
              animate={{
                textShadow: [
                  "0 0 20px rgba(168, 85, 247, 0.3)",
                  "0 0 40px rgba(168, 85, 247, 0.6)",
                  "0 0 20px rgba(168, 85, 247, 0.3)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              YOUR SKILLS.
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                YOUR REWARDS.
              </span>
            </motion.h1>
            <motion.p
              className="text-base md:text-xl text-gray-400 max-w-3xl mx-auto mb-8 md:mb-10 leading-relaxed px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Join the ultimate competitive gaming platform where your talent translates to real cash prizes. Subscribe for unlimited access to tournaments, compete in classic arcade games, and earn your place on the global leaderboard.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <motion.button
                onClick={() => navigate('/signup')}
                className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 rounded-lg flex items-center justify-center gap-3 text-lg font-semibold"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 30px rgba(168, 85, 247, 0.6)",
                }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  boxShadow: [
                    "0 0 0px rgba(168, 85, 247, 0)",
                    "0 0 20px rgba(168, 85, 247, 0.4)",
                    "0 0 0px rgba(168, 85, 247, 0)"
                  ]
                }}
                transition={{
                  boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                <motion.div
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                >
                  <Zap className="w-6 h-6 fill-current" />
                </motion.div>
                Start Free Trial
              </motion.button>
              <motion.button
                onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto border-2 border-purple-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-purple-600/10 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                How It Works
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Live Stats */}
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            {[
              { label: "Active Players", value: stats.players.toLocaleString(), icon: <Users className="w-5 h-5 md:w-6 md:h-6" /> },
              { label: "Monthly Prizes", value: `$${(stats.prizePool / 1000).toFixed(0)}K`, icon: <DollarSign className="w-5 h-5 md:w-6 md:h-6" /> },
              { label: "Live Tournaments", value: stats.tournaments.toLocaleString(), icon: <Trophy className="w-5 h-5 md:w-6 md:h-6" /> },
              { label: "Games Played", value: `${(stats.gamesPlayed / 1000000).toFixed(1)}M`, icon: <Gamepad2 className="w-5 h-5 md:w-6 md:h-6" /> }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                className="bg-[#1a1a24] rounded-xl p-4 md:p-6 border border-gray-800 hover:border-purple-600 transition-colors"
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="flex items-center gap-2 mb-2 text-purple-400">
                  {stat.icon}
                  <span className="text-xs md:text-sm text-gray-400">{stat.label}</span>
                </div>
                <div className="text-2xl md:text-3xl font-bold">{stat.value}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Games */}
      <section className="relative z-10 px-4 md:px-8 py-12 md:py-16 bg-gradient-to-b from-[#0a0a0f] to-[#1a1a24]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-8 md:mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">Featured Games</h2>
            <p className="text-gray-400 text-sm md:text-base">Compete in classic arcade games with skill-based matchmaking</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {games.map((game, idx) => (
              <motion.div
                key={idx}
                className="bg-[#1a1a24] rounded-2xl overflow-hidden border-2 border-gray-800 hover:border-purple-600 transition-all cursor-pointer group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                whileHover={{
                  scale: 1.05,
                  y: -10,
                  boxShadow: "0 20px 60px rgba(168, 85, 247, 0.4)"
                }}
                onClick={() => navigate('/signup')}
              >
                <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${game.gradient} opacity-20`} />
                  <motion.div
                    className="text-6xl md:text-8xl z-10"
                    whileHover={{ scale: 1.3, rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    {game.emoji}
                  </motion.div>
                  <motion.div
                    className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <span className="text-white font-bold text-lg">Play Now</span>
                  </motion.div>
                </div>
                <div className={`p-4 md:p-6 bg-gradient-to-br ${game.gradient} bg-opacity-10`}>
                  <h3 className="text-lg md:text-xl font-bold mb-2">{game.title}</h3>
                  <div className="flex items-center justify-between text-xs md:text-sm">
                    <div className="flex items-center gap-1 text-gray-400">
                      <Users className="w-3 h-3 md:w-4 md:h-4" />
                      {game.players}
                    </div>
                    <div className="flex items-center gap-1 text-yellow-400 font-semibold">
                      <Trophy className="w-3 h-3 md:w-4 md:h-4" />
                      {game.prizePool}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="relative z-10 px-4 md:px-8 py-12 md:py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">How It Works</h2>
            <p className="text-gray-400 text-sm md:text-base">Get started in 3 simple steps</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                step: "01",
                icon: <Sparkles className="w-8 h-8 md:w-12 md:h-12" />,
                title: "Start Free Trial",
                description: "Get 14 days free access to all games and tournaments. Cancel anytime."
              },
              {
                step: "02",
                icon: <Gamepad2 className="w-8 h-8 md:w-12 md:h-12" />,
                title: "Play & Compete",
                description: "Choose from 15 classic games. Win matches to climb the leaderboard and earn points."
              },
              {
                step: "03",
                icon: <Trophy className="w-8 h-8 md:w-12 md:h-12" />,
                title: "Win Prizes",
                description: "Top players share $850K+ monthly. Rankings reset daily for fresh opportunities."
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="bg-[#1a1a24] rounded-2xl p-6 md:p-8 border border-gray-800 hover:border-purple-600 transition-all"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                whileHover={{ y: -10, boxShadow: "0 10px 40px rgba(168, 85, 247, 0.3)" }}
              >
                <div className="text-6xl md:text-7xl font-bold text-gray-800 mb-4">{item.step}</div>
                <div className="text-purple-400 mb-4">{item.icon}</div>
                <h3 className="text-xl md:text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-400 text-sm md:text-base">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Features */}
      <section className="relative z-10 px-4 md:px-8 py-12 md:py-20 bg-gradient-to-b from-[#0a0a0f] to-[#1a1a24]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">Why Tour Arcade?</h2>
            <p className="text-gray-400 text-sm md:text-base">The most competitive gaming platform on the web</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {/* Feature Selector */}
            <div className="space-y-4">
              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  className={`p-4 md:p-6 rounded-xl cursor-pointer transition-all ${
                    activeFeature === idx
                      ? `bg-gradient-to-r ${feature.gradient} border-2 border-white/20`
                      : 'bg-[#1a1a24] border-2 border-gray-800 hover:border-purple-600'
                  }`}
                  onClick={() => setActiveFeature(idx)}
                  whileHover={{ scale: 1.02, x: 10 }}
                >
                  <div className="flex items-center gap-4">
                    <div className="text-4xl md:text-5xl">{feature.emoji}</div>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold mb-1">{feature.title}</h3>
                      <p className="text-xs md:text-sm opacity-80">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Feature Display */}
            <motion.div
              key={activeFeature}
              className={`bg-gradient-to-br ${features[activeFeature].gradient} rounded-2xl p-8 md:p-12 flex items-center justify-center`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center">
                <motion.div
                  className="text-8xl md:text-9xl mb-6"
                  animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {features[activeFeature].emoji}
                </motion.div>
                <h3 className="text-2xl md:text-4xl font-bold mb-4">{features[activeFeature].title}</h3>
                <p className="text-base md:text-xl opacity-90">{features[activeFeature].description}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-4 md:px-8 py-16 md:py-24 text-center">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
              Ready to Turn Your
              <br />
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Gaming Skills Into Cash?
              </span>
            </h2>
            <p className="text-gray-400 text-base md:text-xl mb-8 md:mb-10 max-w-2xl mx-auto">
              Join 250,000+ skilled gamers competing for real money. Your gaming skills deserve rewards.
            </p>
            <motion.button
              onClick={() => navigate('/signup')}
              className="bg-gradient-to-r from-green-500 to-green-600 px-8 md:px-12 py-4 md:py-5 rounded-lg text-lg md:text-xl font-bold"
              whileHover={{
                scale: 1.1,
                boxShadow: "0 0 40px rgba(34, 197, 94, 0.6)"
              }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  "0 0 0px rgba(34, 197, 94, 0)",
                  "0 0 30px rgba(34, 197, 94, 0.4)",
                  "0 0 0px rgba(34, 197, 94, 0)"
                ]
              }}
              transition={{
                boxShadow: { duration: 2, repeat: Infinity }
              }}
            >
              Start Your Free Trial
            </motion.button>
            <p className="text-xs md:text-sm text-gray-500 mt-4 md:mt-6">
              $9.99/month after 14-day free trial. Cancel anytime.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-900 px-4 md:px-8 py-8 md:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <img src={logo} alt="Tour Arcade" className="h-8 mb-4" />
              <p className="text-sm text-gray-400">
                The ultimate competitive gaming platform for skilled players.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Games</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tournaments</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Leaderboards</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Rewards</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press Kit</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Fair Play</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-gray-900">
            <p className="text-sm text-gray-500 mb-4 md:mb-0">
              © 2026 Tour Arcade. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-gray-500 hover:text-white transition-colors">
                <FaTwitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors">
                <FaDiscord className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors">
                <FaYoutube className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors">
                <FaTiktok className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
