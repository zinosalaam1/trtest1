import { Menu, Search, Settings, Home, Users, Trophy, Gift, Sparkles, ShoppingCart, Crown, Zap, Bell, Check, X } from 'lucide-react';
import logo from '../../assets/trbg.png';
import { useState, useEffect } from 'react';
import { socialApi } from '../utils/api';
import { motion } from 'motion/react';

interface NotificationsPageProps {
  onBack: () => void;
  onOpenSettings?: () => void;
  onOpenProfile?: () => void;
  onNavigate: (page: string) => void;
}


export function NotificationsPage({
  onBack,
  onOpenSettings,
  onOpenProfile,
  onNavigate
}: NotificationsPageProps) {

  const [notifications, setNotifications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    socialApi.notifications()
      .then((data: any) => {
        setNotifications(data || []);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  const handleMarkRead = async (id: string | number) => {
    await socialApi.markRead(Number(id)).catch(() => {});

    setNotifications(prev =>
      prev.map(n =>
        n.id === id ? { ...n, read: true } : n
      )
    );
  };

  const handleMarkAllRead = async () => {
    await socialApi.markAllRead().catch(() => {});

    setNotifications(prev =>
      prev.map(n => ({
        ...n,
        read: true
      }))
    );
  };
  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Left Sidebar */}
      <div className="w-16 bg-[#0f0f13] flex flex-col items-center py-6 gap-6 border-r border-gray-800">
        <button 
          onClick={onBack}
          className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors"
        >
          <Home className="w-5 h-5" />
        </button>
        <button 
          onClick={onOpenProfile}
          className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors"
        >
          <Users className="w-5 h-5" />
        </button>
        <button 
          onClick={() => onNavigate('tournaments')}
          className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors"
        >
          <Trophy className="w-5 h-5" />
        </button>
        <button 
          onClick={() => onNavigate('marketplace')}
          className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors"
        >
          <Gift className="w-5 h-5" />
        </button>
        <button 
          onClick={() => onNavigate('events')}
          className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors"
        >
          <Sparkles className="w-5 h-5" />
        </button>
        <button 
          onClick={() => onNavigate('shop')}
          className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors"
        >
          <ShoppingCart className="w-5 h-5" />
        </button>
        <button 
          onClick={() => onNavigate('premium')}
          className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors"
        >
          <Crown className="w-5 h-5" />
        </button>
        <button 
          onClick={() => onNavigate('quickmatch')}
          className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors"
        >
          <Zap className="w-5 h-5" />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-[#0f0f13] border-b border-gray-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button className="text-gray-400 hover:text-white">
              <Menu className="w-6 h-6" />
            </button>
            <img src={logo} alt="Tour Arcade" className="h-8" />
          </div>

          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search notifications..."
                className="w-full bg-[#2a2a32] border-0 rounded-full pl-12 pr-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-xl">
              😎
            </div>
            <button 
              onClick={onOpenSettings}
              className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center hover:bg-gray-500 transition-colors"
            >
              <Settings className="w-5 h-5" />
            </button>
            <button 
              onClick={onOpenProfile}
              className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer"
            >
              <img 
                src="https://placehold.co/400x200/1a0533/a855f7?text=Tour+Arcade"
                alt="User"
                className="w-full h-full rounded-full object-cover"
              />
            </button>
          </div>
        </header>

        {/* Notifications Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-4xl mx-auto">
            {/* Hero */}
            <motion.div 
              className="flex items-center justify-between mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ 
                    rotate: [0, -15, 15, 0],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <Bell className="w-10 h-10 text-blue-500" />
                </motion.div>
                <h1 className="text-4xl">Notifications</h1>
                <span className="bg-red-600 px-3 py-1 rounded-full text-sm">
                  {notifications.filter(n => !n.read).length} new
                </span>
              </div>
              <motion.button
                className="bg-purple-600 px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Mark all as read
              </motion.button>
            </motion.div>

            {/* Notifications List */}
            <div className="space-y-3">
              {notifications.map((notification, idx) => (
                <motion.div
                  key={notification.id}
                  className={`rounded-xl p-6 border ${
                    notification.read 
                      ? 'bg-[#1a1a1f] border-gray-800' 
                      : 'bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-blue-700'
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ x: 10, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)" }}
                >
                  <div className="flex items-start gap-4">
                    <motion.div 
                      className="text-4xl flex-shrink-0"
                      animate={{ scale: notification.read ? 1 : [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: notification.read ? 0 : Infinity }}
                    >
                      {notification.icon}
                    </motion.div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="text-lg">{notification.title}</h3>
                        <span className="text-xs text-gray-400">{notification.time}</span>
                      </div>
                      <p className="text-sm text-gray-400">{notification.message}</p>
                    </div>
                    <div className="flex gap-2">
                      {!notification.read && (
                        <motion.button
                          className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center hover:bg-green-700 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Check className="w-4 h-4" />
                        </motion.button>
                      )}
                      <motion.button
                        className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <X className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
