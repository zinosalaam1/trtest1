import { motion } from 'motion/react';
import { Star } from 'lucide-react';



interface BeautifulGameCardProps {
  game: {
    id: string;
    title: string;
    image: string;
    emoji: string;
    rating: number;
    players: string;
  };
  onClick: () => void;
  featured?: boolean;
  gradient?: string;
}

export function BeautifulGameCard({ game, onClick, featured = false, gradient = 'from-purple-600 to-blue-600' }: BeautifulGameCardProps) {
  const starCount = Math.floor(game.rating);
  
  return (
    <motion.div
      onClick={onClick}
      className="relative rounded-2xl overflow-hidden cursor-pointer group"
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      {/* Background Image */}
      <div className="aspect-[4/3] relative bg-gradient-to-br from-gray-800 to-gray-900">
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <motion.div
            className="text-9xl"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {game.emoji}
          </motion.div>
        </div>
        
        {/* Gradient Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80`}></div>
        
        {/* Hover Glow */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-t ${gradient} opacity-0 group-hover:opacity-30 transition-opacity duration-300`}
        />
      </div>

      {/* Bottom Info Section */}
      <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-br ${gradient} p-4`}>
        <h3 className="text-lg md:text-xl font-bold mb-2">{game.title}</h3>
        
        <div className="flex items-center justify-between">
          {/* Star Rating */}
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < starCount ? 'fill-yellow-400 text-yellow-400' : 'text-gray-500'}`}
              />
            ))}
          </div>
          
          {/* Player Count */}
          <span className="text-sm text-gray-200">• {game.players}</span>
        </div>
      </div>

      {/* Featured Badge */}
      {featured && (
        <div className="absolute top-3 right-3 bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
          <Star className="w-3 h-3 fill-current" />
          Featured
        </div>
      )}

      {/* Play Overlay */}
      <motion.div
        className="absolute inset-0 bg-black/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        initial={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white text-black px-8 py-4 rounded-full font-bold text-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          PLAY NOW
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
