import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { LandingPage } from './components/LandingPage';
import { SignInPage } from './components/SignInPage';
import { SignupPage } from './components/SignupPage';
import { HomePage } from './components/HomePage';
import { SettingsPage } from './components/SettingsPage';
import { ProfilePage } from './components/ProfilePage';
import { LiveMatchesHub } from './components/LiveMatchesHub';
import { LiveMatchPage } from './components/LiveMatchPage';
import { SpectatorPage } from './components/SpectatorPage';
import { TournamentArena } from './components/TournamentArena';
import { TournamentDetails } from './components/TournamentDetails';
import { TournamentBracket } from './components/TournamentBracket';
import { AdvancedLeaderboardsPage } from './components/AdvancedLeaderboardsPage';
import { SocialsPage } from './components/SocialsPage';
import { RewardsPage } from './components/RewardsPage';
import { MarketplacePage } from './components/MarketplacePage';
import { EventsPage } from './components/EventsPage';
import { ShopPage } from './components/ShopPage';
import { PremiumPage } from './components/PremiumPage';
import { QuickMatchPage } from './components/QuickMatchPage';
import { NotificationsPage } from './components/NotificationsPage';
import { MessagesPage } from './components/MessagesPage';
import { WalletPage } from './components/WalletPage';
import { EmailAuthPage } from './components/EmailAuthPage';
import { SubscriptionPage } from './components/SubscriptionPage';
import { PaymentPage } from './components/PaymentPage';
import { CardDetailsPage } from './components/CardDetailsPage';
import { GameLibraryPage } from './components/GameLibraryPage';
import { ToastManager } from './components/ToastManager';
import { DuelMatchPage } from './components/DuelMatchPage';
import { TeamBattlePage } from './components/TeamBattlePage';
import { EventDetailsPage } from './components/EventDetailsPage';
import { MarketplacePurchasePage } from './components/MarketplacePurchasePage';
import { PacManLauncher } from './components/PacManLauncher';
import { CreateTournamentPage } from './components/CreateTournamentPage';
import { PlanSelectionPage } from './components/PlanSelectionPage';
import { FreeSignupComplete } from './components/FreeSignupComplete';
import { FreeHomePage } from './components/FreeHomePage';
import { GameComingSoon } from './components/GameComingSoon';
import { NeonRunnerLauncher } from './components/NeonRunnerLauncher';
import { SwitchNShootLauncher } from './components/SwitchNShootLauncher';
import { MazeOfKingsLauncher } from './components/MazeOfKingsLauncher';
import { PixelRacerLauncher } from './components/PixelRacerLauncher';
import { ForgotPasswordPage } from './components/ForgotPasswordPage';
import { ResetPasswordPage } from './components/ResetPasswordPage';
import { VerifyEmailPage } from './components/VerifyEmailPage';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { useGameState } from './hooks/useGameState';
import { gamesApi } from './utils/api';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ToastManager />
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

function AppRoutes() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const gameState = useGameState();
  const userTier = user?.plan ?? 'free';

  const handleNavigation = (path: string) => navigate(`/${path}`);
  const handleSignOut = async () => { await logout(); navigate('/'); };

  const makeGameComplete = (gameId: string) =>
    async (score: number, leaderboardPoints: number, difficulty: string) => {
      try {
        await gamesApi.submitScore({
          game_id: gameId,
          score,
          leaderboard_points: leaderboardPoints,
          difficulty: difficulty as 'easy' | 'medium' | 'hard',
        });
      } catch {
        console.warn('Backend score submit failed — score saved locally');
      }
    };

  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/auth/email" element={<EmailAuthPage onBackToLogin={() => navigate('/signup')} onNext={() => navigate('/plan-selection')} />} />
      <Route path="/plan-selection" element={<PlanSelectionPage onSelectFree={() => navigate('/free-complete')} onSelectPremium={() => navigate('/subscription')} />} />
      <Route path="/free-complete" element={<FreeSignupComplete onComplete={() => navigate('/home')} />} />
      <Route path="/subscription" element={<SubscriptionPage onNext={() => navigate('/payment')} />} />
      <Route path="/payment" element={<ProtectedRoute><PaymentPage onNext={() => navigate('/card-details')} /></ProtectedRoute>} />
      <Route path="/card-details" element={<ProtectedRoute requireVerified><CardDetailsPage onBack={() => navigate('/payment')} onComplete={() => navigate('/home')} /></ProtectedRoute>} />

      {/* Home */}
      <Route path="/home" element={
        <ProtectedRoute>
          {userTier === 'free'
            ? <FreeHomePage onSignOut={handleSignOut} onOpenSettings={() => navigate('/settings')} onOpenProfile={() => navigate('/profile')} onNavigate={handleNavigation} gameState={gameState} />
            : <HomePage onSignOut={handleSignOut} onOpenSettings={() => navigate('/settings')} onOpenProfile={() => navigate('/profile')} onOpenTournaments={() => navigate('/tournaments')} onNavigate={handleNavigation} gameState={gameState} />
          }
        </ProtectedRoute>
      } />

      {/* Settings & Profile */}
      <Route path="/settings" element={<ProtectedRoute><SettingsPage onBack={() => navigate('/home')} onOpenProfile={() => navigate('/profile')} /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><ProfilePage onBack={() => navigate('/home')} onOpenSettings={() => navigate('/settings')} onNavigate={handleNavigation} /></ProtectedRoute>} />

      {/* Tournaments */}
      <Route path="/tournaments" element={<ProtectedRoute><LiveMatchesHub onBack={() => navigate('/home')} onOpenSettings={() => navigate('/settings')} onOpenProfile={() => navigate('/profile')} onNavigate={handleNavigation} /></ProtectedRoute>} />
      <Route path="/tournaments/arena" element={<ProtectedRoute><TournamentArena onBack={() => navigate('/tournaments')} onOpenSettings={() => navigate('/settings')} onOpenProfile={() => navigate('/profile')} onViewTournament={(id) => navigate(`/tournaments/${id}`)} onNavigate={handleNavigation} /></ProtectedRoute>} />
      <Route path="/tournaments/match/:matchId" element={<ProtectedRoute><LiveMatchPage onBack={() => navigate('/tournaments')} onOpenSettings={() => navigate('/settings')} onOpenProfile={() => navigate('/profile')} /></ProtectedRoute>} />
      <Route path="/tournaments/match/:matchId/spectate" element={<ProtectedRoute><SpectatorPage onBack={() => navigate('/tournaments')} /></ProtectedRoute>} />
      <Route path="/tournaments/bracket" element={<ProtectedRoute><TournamentBracket onBack={() => navigate('/tournaments/1')} onOpenSettings={() => navigate('/settings')} onOpenProfile={() => navigate('/profile')} onNavigate={handleNavigation} /></ProtectedRoute>} />
      <Route path="/tournaments/create" element={<ProtectedRoute><CreateTournamentPage onBack={() => navigate('/tournaments')} onOpenSettings={() => navigate('/settings')} onNavigate={handleNavigation} onTournamentCreated={() => navigate('/tournaments')} /></ProtectedRoute>} />
      <Route path="/tournaments/:id" element={<ProtectedRoute><TournamentDetails tournamentId="1" onBack={() => navigate('/tournaments')} onOpenSettings={() => navigate('/settings')} onOpenProfile={() => navigate('/profile')} onViewBracket={() => navigate('/tournaments/bracket')} onNavigate={handleNavigation} /></ProtectedRoute>} />

      {/* Main pages */}
      <Route path="/leaderboards" element={<ProtectedRoute><AdvancedLeaderboardsPage onBack={() => navigate('/home')} onOpenSettings={() => navigate('/settings')} onOpenProfile={() => navigate('/profile')} onNavigate={handleNavigation} /></ProtectedRoute>} />
      <Route path="/socials" element={<ProtectedRoute><SocialsPage onBack={() => navigate('/home')} onOpenSettings={() => navigate('/settings')} onOpenProfile={() => navigate('/profile')} onNavigate={handleNavigation} /></ProtectedRoute>} />
      <Route path="/rewards" element={<ProtectedRoute><RewardsPage onBack={() => navigate('/home')} onOpenSettings={() => navigate('/settings')} onOpenProfile={() => navigate('/profile')} onNavigate={handleNavigation} /></ProtectedRoute>} />
      <Route path="/marketplace" element={<ProtectedRoute><MarketplacePage onBack={() => navigate('/home')} onOpenSettings={() => navigate('/settings')} onOpenProfile={() => navigate('/profile')} onNavigate={handleNavigation} /></ProtectedRoute>} />
      <Route path="/marketplace/:itemId" element={<ProtectedRoute><MarketplacePurchasePage itemId="1" onBack={() => navigate('/marketplace')} onOpenSettings={() => navigate('/settings')} onOpenProfile={() => navigate('/profile')} onNavigate={handleNavigation} /></ProtectedRoute>} />
      <Route path="/events" element={<ProtectedRoute><EventsPage onBack={() => navigate('/home')} onOpenSettings={() => navigate('/settings')} onOpenProfile={() => navigate('/profile')} onNavigate={handleNavigation} /></ProtectedRoute>} />
      <Route path="/events/:eventId" element={<ProtectedRoute><EventDetailsPage eventId="1" onBack={() => navigate('/events')} onOpenSettings={() => navigate('/settings')} onOpenProfile={() => navigate('/profile')} onNavigate={handleNavigation} /></ProtectedRoute>} />
      <Route path="/shop" element={<ProtectedRoute><ShopPage onBack={() => navigate('/home')} onOpenSettings={() => navigate('/settings')} onOpenProfile={() => navigate('/profile')} onNavigate={handleNavigation} /></ProtectedRoute>} />
      <Route path="/premium" element={<ProtectedRoute><PremiumPage onBack={() => navigate('/home')} onOpenSettings={() => navigate('/settings')} onOpenProfile={() => navigate('/profile')} onNavigate={handleNavigation} /></ProtectedRoute>} />
      <Route path="/quickmatch" element={<ProtectedRoute><QuickMatchPage onBack={() => navigate('/home')} onOpenSettings={() => navigate('/settings')} onOpenProfile={() => navigate('/profile')} onNavigate={handleNavigation} /></ProtectedRoute>} />
      <Route path="/quickmatch/duel" element={<ProtectedRoute><DuelMatchPage onBack={() => navigate('/quickmatch')} onOpenSettings={() => navigate('/settings')} onOpenProfile={() => navigate('/profile')} onNavigate={handleNavigation} /></ProtectedRoute>} />
      <Route path="/quickmatch/team" element={<ProtectedRoute><TeamBattlePage onBack={() => navigate('/quickmatch')} onOpenSettings={() => navigate('/settings')} onOpenProfile={() => navigate('/profile')} onNavigate={handleNavigation} /></ProtectedRoute>} />
      <Route path="/notifications" element={<ProtectedRoute><NotificationsPage onBack={() => navigate('/home')} onOpenSettings={() => navigate('/settings')} onOpenProfile={() => navigate('/profile')} onNavigate={handleNavigation} /></ProtectedRoute>} />
      <Route path="/messages" element={<ProtectedRoute><MessagesPage onBack={() => navigate('/home')} onOpenSettings={() => navigate('/settings')} onOpenProfile={() => navigate('/profile')} onNavigate={handleNavigation} /></ProtectedRoute>} />
      <Route path="/wallet" element={<ProtectedRoute requireVerified><WalletPage onBack={() => navigate('/home')} onOpenSettings={() => navigate('/settings')} onOpenProfile={() => navigate('/profile')} onNavigate={handleNavigation} /></ProtectedRoute>} />

      {/* Games Library */}
      <Route path="/games" element={<ProtectedRoute><GameLibraryPage onBack={() => navigate('/home')} onOpenSettings={() => navigate('/settings')} onOpenProfile={() => navigate('/profile')} onNavigate={handleNavigation} onPlayGame={(gameId) => navigate(`/games/${gameId}`)} /></ProtectedRoute>} />

      {/* Individual games — specific routes BEFORE generic :gameId */}
      <Route path="/games/pacman" element={<ProtectedRoute><PacManLauncher onBack={() => navigate('/games')} onOpenSettings={() => navigate('/settings')} onNavigateToLeaderboard={() => navigate('/leaderboards')} onGameComplete={makeGameComplete('pacman')} /></ProtectedRoute>} />
      <Route path="/games/neonrunner" element={<ProtectedRoute><NeonRunnerLauncher onBack={() => navigate('/games')} onOpenSettings={() => navigate('/settings')} onNavigateToLeaderboard={() => navigate('/leaderboards')} onGameComplete={makeGameComplete('neonrunner')} /></ProtectedRoute>} />
      <Route path="/games/switchnshoot" element={<ProtectedRoute><SwitchNShootLauncher onBack={() => navigate('/games')} onOpenSettings={() => navigate('/settings')} onNavigateToLeaderboard={() => navigate('/leaderboards')} onGameComplete={makeGameComplete('switchnshoot')} /></ProtectedRoute>} />
      <Route path="/games/mazeofkings" element={<ProtectedRoute><MazeOfKingsLauncher onBack={() => navigate('/games')} onOpenSettings={() => navigate('/settings')} onNavigateToLeaderboard={() => navigate('/leaderboards')} onGameComplete={makeGameComplete('mazeofkings')} /></ProtectedRoute>} />
      <Route path="/games/pixelracer" element={<ProtectedRoute><PixelRacerLauncher onBack={() => navigate('/games')} onOpenSettings={() => navigate('/settings')} onNavigateToLeaderboard={() => navigate('/leaderboards')} onGameComplete={makeGameComplete('pixelracer')} /></ProtectedRoute>} />

      {/* Fallback — Coming Soon for unbuilt games */}
      <Route path="/games/:gameId" element={<ProtectedRoute><GameRouter onNavigate={handleNavigation} /></ProtectedRoute>} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function GameRouter({ onNavigate }: { onNavigate: (path: string) => void }) {
  const navigate = useNavigate();
  const gameId = window.location.pathname.split('/').pop() || '';
  return (
    <GameComingSoon
      gameId={gameId}
      onBack={() => navigate('/games')}
      onOpenSettings={() => navigate('/settings')}
      onOpenProfile={() => navigate('/profile')}
      onNavigate={onNavigate}
    />
  );
}
