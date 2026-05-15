# Tour Arcade - Gaming Platform

A modern, skill-based gaming platform featuring tournaments, leaderboards, and 14 classic arcade games.

## 🎮 Features

### Games
- **15 Arcade Classics**: PAC-MAN (fully playable!), SEGA Rally, Street Fighter, Metal Slug 5, NBA Jam, Tekken 5, Pixel Racer, Neon Runner, Blitz Chess, Contra, The Maze of Kings, Virtua Athlete 2000, Mario Bros, Donkey Kong, Switch 'N' Shoot
- **Difficulty Levels**: Easy (1.0x), Medium (1.5x), Hard (2.0x) point multipliers
- **Game Cards**: Beautiful game presentation with real images
- **PAC-MAN Fully Playable**: Complete implementation with authentic gameplay, smart ghost AI, and difficulty scaling
- **Ready for Your Games**: 14 game slots ready for your own implementations
- **Build Your Own**: Comprehensive guide to build and integrate your own games (see [GAME_DEVELOPMENT_GUIDE.md](/GAME_DEVELOPMENT_GUIDE.md))

### Leaderboards
- **Global Rankings**: Compete with players worldwide
- **Regional Rankings**: See top players in your region
- **Real-time Updates**: Leaderboards update automatically
- **Points System**: Difficulty-based scoring with multipliers

### Tournaments
- **Tournament Arena**: Browse and join active tournaments
- **Tournament Details**: View brackets, participants, and prizes
- **Create Tournaments**: Custom tournament creation (Premium feature)
- **Prize Pools**: Compete for rewards

### User Experience
- **Multi-step Signup**: Email verification, plan selection
- **Free & Premium Tiers**: Flexible subscription options
- **Responsive Design**: Fully mobile-responsive UI
- **Dark Theme**: Sleek gaming aesthetic
- **Smooth Animations**: Motion/Framer Motion powered

### Additional Pages
- **Profile Management**: Track stats, achievements
- **Marketplace**: Buy game items and power-ups
- **Events**: Special events and challenges
- **Shop**: In-game purchases
- **Premium Features**: VIP perks and benefits
- **Quick Match**: Instant matchmaking
- **Wallet**: Manage earnings and transactions
- **Messages**: Player communication
- **Notifications**: Real-time updates
- **Socials**: Connect with other players
- **Rewards**: Daily and weekly rewards

## 🚀 Tech Stack

### Frontend
- **React 18+** with TypeScript
- **Tailwind CSS v4** for styling
- **Motion (Framer Motion)** for animations
- **Vite** as build tool
- **Local Storage** for client-side state

### Recommended Backend
- **Django 4.2+** with Django REST Framework
- **PostgreSQL 14+** database
- **JWT Authentication**
- **Django Channels** for real-time features (optional)

## 📦 Installation

### Prerequisites
```bash
Node.js 18+
npm or yarn
```

### Setup
```bash
# Clone the repository
git clone <your-repo-url>
cd tour-arcade

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 🏗️ Project Structure

```
tour-arcade/
├── components/           # React components
│   ├── HomePage.tsx         # Main home page
│   ├── GameComingSoon.tsx   # Individual game pages
│   ├── LeaderboardsPage.tsx # Global/Regional rankings
│   ├── TournamentArena.tsx  # Tournament hub
│   ├── ProfilePage.tsx      # User profile
│   ├── MarketplacePage.tsx  # Item marketplace
│   ├── EventsPage.tsx       # Special events
│   ├── ShopPage.tsx         # In-game shop
│   ├── PremiumPage.tsx      # Premium features
│   ├── QuickMatchPage.tsx   # Matchmaking
│   ├── WalletPage.tsx       # User wallet
│   ├── MessagesPage.tsx     # Messaging
│   ├── NotificationsPage.tsx # Notifications
│   ├── SocialsPage.tsx      # Social features
│   ├── RewardsPage.tsx      # Rewards system
│   └── ui/                  # Reusable UI components
├── utils/
│   ├── gameConfig.ts        # Centralized game configuration
│   └── animations.ts        # Animation utilities
├── hooks/
│   └── useGameState.ts      # Game state management
├── styles/
│   └── globals.css          # Global styles
├── App.tsx                  # Main app router
├── DEPLOYMENT.md            # Deployment guide
└── README.md                # This file
```

## 🎯 Game Configuration

All games are configured in `/utils/gameConfig.ts`:

```typescript
export const GAMES: Record<string, Game> = {
  segarally: {
    id: 'segarally',
    title: 'SEGA Rally',
    category: 'Racing',
    difficulty: { easy: 1.0, medium: 1.5, hard: 2.0 },
    hasLauncher: false // Set to true when game logic is added
  },
  // ... 13 more games
};
```

### Adding Game Logic

1. Create game component in `/components/YourGame.tsx`
2. Update `gameConfig.ts`: set `hasLauncher: true`
3. Add game route in `App.tsx`
4. Implement difficulty selector integration
5. Add score submission to leaderboards

Example:
```typescript
// In App.tsx, add your game route
if (gameId === 'your-game-id') {
  return <YourGameComponent 
    difficulty={selectedDifficulty}
    onGameComplete={(score, points) => {
      saveGameScore('your-game-id', score, points, difficulty);
    }}
  />;
}
```

## 📱 Mobile Responsiveness

The entire app is mobile-responsive:
- Collapsible sidebar on mobile
- Responsive navigation
- Touch-optimized controls
- Adaptive layouts
- Mobile-first design

## 🎨 Customization

### Theme Colors
Edit `/styles/globals.css`:
```css
:root {
  --background: #0a0a0f;
  --primary: #a855f7;
  --secondary: #ec4899;
}
```

### Game Images
Update images in `gameConfig.ts` or use the Unsplash integration.

## 🔒 Authentication Flow

1. **Landing Page** → Sign up CTA
2. **Signup Page** → Email entry
3. **Email Verification** → OTP/Link
4. **Plan Selection** → Free or Premium
5. **Free**: Instant access
6. **Premium**: Payment → Card details → Complete

## 📊 Leaderboard System

### Points Calculation
```typescript
// Easy: score * 1.0
// Medium: score * 1.5
// Hard: score * 2.0
const points = score * difficultyMultiplier;
```

### Rankings
- **Global**: All players worldwide
- **Regional**: Players in your region

## 🏆 Tournament System

1. Browse tournaments in Tournament Arena
2. View details (prize, participants, dates)
3. Join tournament
4. Compete in tournament bracket
5. Win prizes

## 💰 Monetization

- **Free Tier**: Basic features, limited games
- **Standard Tier**: All games, tournaments
- **Premium Tier**: Exclusive tournaments, higher rewards, VIP perks

## 🛠️ Development

### Add a New Page
1. Create component: `/components/YourPage.tsx`
2. Add route in `App.tsx`
3. Add navigation button where needed
4. Update mobile responsive design

### Add a New Game
1. Add to `gameConfig.ts`
2. Create game component (optional)
3. Update `hasLauncher` when ready
4. Test difficulty selector
5. Verify leaderboard integration

## 🚢 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for comprehensive deployment instructions including:
- Django backend setup
- PostgreSQL configuration
- Nginx configuration
- SSL certificates
- Production settings
- Monitoring & logging

### Quick Deploy (Frontend Only)

```bash
# Build
npm run build

# Deploy to Vercel/Netlify
# Upload dist/ folder
```

### Full Stack Deploy

Follow the Django + React deployment guide in [DEPLOYMENT.md](./DEPLOYMENT.md).

## 🔧 Environment Variables

Create `.env.local`:
```env
VITE_API_URL=http://localhost:8000/api
VITE_API_TIMEOUT=10000
```

## 📈 Performance

- Lazy loading for game components
- Image optimization
- Code splitting
- Efficient state management
- Minimal re-renders

## 🐛 Troubleshooting

### Build Errors
```bash
# Clear node modules
rm -rf node_modules package-lock.json
npm install
```

### Styling Issues
```bash
# Rebuild Tailwind
npm run build
```

### Game Not Loading
- Check `gameConfig.ts` for correct `hasLauncher` value
- Verify game component exists
- Check App.tsx routing

## 📝 License

All rights reserved. See LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📧 Support

For issues and questions:
- Open an issue on GitHub
- Email: support@tourarcade.com
- Discord: discord.gg/tourarcade

## 🎯 Roadmap

- [ ] Add more games
- [ ] Real-time multiplayer
- [ ] Mobile app (React Native)
- [ ] Streaming integration
- [ ] Social features enhancement
- [ ] AI matchmaking
- [ ] Spectator mode
- [ ] Replay system

## ⚠️ Important Notes

1. **No Among Us**: This game has been removed from the platform
2. **Leaderboards**: Only Global and Regional rankings (no game-specific)
3. **Game Logic**: All 14 games are placeholders ready for external logic
4. **Mobile First**: Entire app is mobile responsive
5. **Backend Required**: For production, Django backend is recommended

## 🎮 Game List

1. PAC-MAN (Arcade) ✅ **FULLY PLAYABLE**
2. SEGA Rally (Racing)
3. Street Fighter (Fighting)
4. Metal Slug 5 (Shooter)
5. NBA Jam (Sports)
6. Tekken 5 (Fighting)
7. Pixel Racer (Racing)
8. Neon Runner (Arcade)
9. Blitz Chess (Strategy)
10. Contra (Shooter)
11. The Maze of Kings (Puzzle)
12. Virtua Athlete 2000 (Sports)
13. Mario Bros (Arcade)
14. Donkey Kong (Arcade)
15. Switch 'N' Shoot (Shooter)

**Note**: PAC-MAN is fully implemented with complete gameplay. The other 14 games are ready for you to build using the [Game Development Guide](/GAME_DEVELOPMENT_GUIDE.md).

---

**Built with ❤️ for gamers, by gamers**

**Version**: 1.0.0  
**Last Updated**: April 11, 2026