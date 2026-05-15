/**
 * Tour Arcade — ProtectedRoute
 * Drop into: src/app/components/ProtectedRoute.tsx
 *
 * Wrap any <Route> that requires authentication.
 * Shows a loading spinner while auth state is resolving,
 * then redirects to /signin if not authenticated.
 *
 * Usage in App.tsx:
 *   <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
 */

import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Gamepad2 } from 'lucide-react';
import { motion } from 'motion/react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireVerified?: boolean; // set true for payment-sensitive pages
}

export function ProtectedRoute({ children, requireVerified = false }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  // Show loading spinner while auth state initialises
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#05050f] flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
        >
          <Gamepad2 className="w-12 h-12 text-purple-500" />
        </motion.div>
      </div>
    );
  }

  // Not logged in → redirect to signin, remembering where they tried to go
  if (!isAuthenticated) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  // Email verification required for sensitive pages
  if (requireVerified && user && !user.is_email_verified) {
    return (
      <div className="min-h-screen bg-[#05050f] flex items-center justify-center text-white">
        <div className="text-center max-w-md">
          <div className="text-5xl mb-4">📧</div>
          <h2 className="text-2xl font-bold mb-3">Email Verification Required</h2>
          <p className="text-gray-400 mb-6">
            Please verify your email address to access this feature.
            Check your inbox for the verification link.
          </p>
          <p className="text-sm text-gray-500">
            Didn't get it? Check spam or contact support.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
