import { Menu, Settings, Home, Users, Trophy, Gift, Sparkles, ShoppingCart, Crown, Zap, ChevronRight, Check, CreditCard, DollarSign } from 'lucide-react';
import logo from '../../assets/logo.svg';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { showToast } from './ToastManager';
import { SuccessConfetti } from './ParticleEffect';

interface MarketplacePurchasePageProps {
  itemId: string;
  onBack: () => void;
  onOpenSettings?: () => void;
  onOpenProfile?: () => void;
  onNavigate: (page: string) => void;
}

const itemDetails: Record<string, any> = {
  '1': {
    name: 'Legendary Sword Skin',
    category: 'Weapon Skin',
    price: 499,
    image: 'https://placehold.co/400x200/1a0533/a855f7?text=Tour+Arcade',
    rarity: 'Legendary',
    rarityColor: 'from-yellow-600 to-orange-600',
    features: [
      'Animated flame effects',
      'Exclusive legendary glow',
      'Custom kill animations',
      'Unique sound effects'
    ],
    stats: [
      { label: 'Rarity', value: 'Legendary' },
      { label: 'Collection', value: 'Inferno Series' },
      { label: 'Released', value: 'Dec 2025' },
      { label: 'Owned by', value: '1,247 players' }
    ]
  },
  '2': {
    name: 'Neon Avatar Frame',
    category: 'Profile Cosmetic',
    price: 199,
    image: 'https://placehold.co/400x200/1a0533/a855f7?text=Tour+Arcade',
    rarity: 'Epic',
    rarityColor: 'from-purple-600 to-pink-600',
    features: [
      'Animated neon border',
      'Color customization',
      'Pulse effects',
      'Prestige indicator'
    ],
    stats: [
      { label: 'Rarity', value: 'Epic' },
      { label: 'Collection', value: 'Cyber Series' },
      { label: 'Released', value: 'Nov 2025' },
      { label: 'Owned by', value: '3,842 players' }
    ]
  }
};

export function MarketplacePurchasePage({ itemId, onBack, onOpenSettings, onOpenProfile, onNavigate }: MarketplacePurchasePageProps) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [purchased, setPurchased] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const item = itemDetails[itemId] || itemDetails['1'];

  const handlePurchase = () => {
    setPurchased(true);
    setShowConfirmation(false);
    setShowConfetti(true);
    showToast({ 
      type: 'success', 
      title: 'Purchase Successful!', 
      message: `${item.name} has been added to your inventory` 
    });
    
    setTimeout(() => {
      setShowConfetti(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-black text-white flex">
      <SuccessConfetti trigger={showConfetti} />
      
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
        <button onClick={() => onNavigate('marketplace')} className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center">
          <Gift className="w-5 h-5" />
        </button>
        <button onClick={() => onNavigate('events')} className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors">
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

        <div className="flex-1 overflow-y-auto p-12">
          <div className="max-w-7xl mx-auto">
            {/* Back Button */}
            <motion.button 
              onClick={onBack}
              className="flex items-center gap-2 text-gray-300 hover:text-white mb-8"
              whileHover={{ x: -5 }}
            >
              <ChevronRight className="w-5 h-5 rotate-180" />
              Back to Marketplace
            </motion.button>

            <div className="grid grid-cols-2 gap-12">
              {/* Image Section */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <div className={`bg-gradient-to-br ${item.rarityColor} p-1 rounded-2xl`}>
                  <div className="bg-black rounded-2xl p-8">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.05, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      <img 
                        src={item.image}
                        alt={item.name}
                        className="w-full h-[500px] object-cover rounded-xl"
                      />
                    </motion.div>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mt-6">
                  {item.stats.map((stat: any, idx: number) => (
                    <motion.div
                      key={idx}
                      className="bg-[#1a1a1f] rounded-xl p-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                      <p className="text-white">{stat.value}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Details Section */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                {/* Header */}
                <div>
                  <div className={`inline-block bg-gradient-to-r ${item.rarityColor} px-4 py-1 rounded-full mb-4`}>
                    <span className="text-sm">{item.rarity}</span>
                  </div>
                  <h1 className="text-5xl mb-2">{item.name}</h1>
                  <p className="text-xl text-gray-400">{item.category}</p>
                </div>

                {/* Price */}
                <motion.div 
                  className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-xl p-6 border border-green-600"
                  whileHover={{ scale: 1.02 }}
                >
                  <p className="text-gray-400 mb-2">Price</p>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-8 h-8 text-green-400" />
                    <span className="text-4xl text-green-400">{item.price}</span>
                    <span className="text-gray-400 text-xl">coins</span>
                  </div>
                </motion.div>

                {/* Features */}
                <div className="bg-[#1a1a1f] rounded-xl p-6">
                  <h3 className="text-2xl mb-4">Features</h3>
                  <ul className="space-y-3">
                    {item.features.map((feature: string, idx: number) => (
                      <motion.li
                        key={idx}
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + idx * 0.1 }}
                      >
                        <Check className="w-5 h-5 text-green-500 mt-0.5" />
                        <span className="text-gray-300">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Purchase Button */}
                {!purchased ? (
                  <motion.button
                    onClick={() => setShowConfirmation(true)}
                    className={`w-full bg-gradient-to-r ${item.rarityColor} py-6 rounded-xl text-2xl`}
                    whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(168, 85, 247, 0.6)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Purchase Now
                  </motion.button>
                ) : (
                  <motion.div
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 py-6 rounded-xl text-2xl text-center flex items-center justify-center gap-3"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                  >
                    <Check className="w-8 h-8" />
                    Purchased!
                  </motion.div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirmation && (
          <motion.div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowConfirmation(false)}
          >
            <motion.div 
              className="bg-[#1a1a1f] rounded-2xl p-8 max-w-md w-full border border-gray-700"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="inline-block mb-4"
                >
                  <CreditCard className="w-16 h-16 text-purple-500" />
                </motion.div>
                <h2 className="text-3xl mb-2">Confirm Purchase</h2>
                <p className="text-gray-400">Are you sure you want to purchase this item?</p>
              </div>

              <div className="bg-black/50 rounded-xl p-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">Item</span>
                  <span className="text-white">{item.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Price</span>
                  <span className="text-green-400 text-xl">{item.price} coins</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <motion.button
                  onClick={() => setShowConfirmation(false)}
                  className="bg-gray-700 py-3 rounded-lg hover:bg-gray-600 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  onClick={handlePurchase}
                  className={`bg-gradient-to-r ${item.rarityColor} py-3 rounded-lg`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Confirm
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
