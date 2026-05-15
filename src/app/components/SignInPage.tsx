import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Gamepad2, Eye, EyeOff, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ApiError } from '../utils/api';
import logo from "../../assets/trbg.png";

export function SignInPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/home';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { setError('Please enter your email and password.'); return; }
    setError(''); setIsLoading(true);
    try {
      await login(email.trim().toLowerCase(), password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Unable to connect. Please try again.');
    } finally { setIsLoading(false); }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex flex-col">
      {/* Decorative bg — hidden on small screens to save space */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden sm:block">
        <div className="absolute top-10 right-20 w-20 h-20 border-2 border-purple-900/30 rounded-full" />
        <div className="absolute top-32 left-10 w-16 h-16 border-2 border-purple-900/30 rounded-full" />
        <div className="absolute bottom-20 right-60 w-24 h-24 border-2 border-purple-900/30 rounded-full" />
      </div>

      <header className="relative z-10 flex items-center justify-between px-4 sm:px-8 py-4 sm:py-6">
        <Link to="/" className="flex items-center gap-2">
           <img src={logo} alt="Tour Arcade Logo" className="w-20 h-12 object-contain"
  />
        </Link>
        <span className="text-gray-400 text-sm hidden sm:block">Welcome back</span>
      </header>

      <div className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-8 py-6 sm:py-12">
        <motion.div
          className="bg-white text-black rounded-2xl sm:rounded-3xl p-6 sm:p-10 w-full max-w-xl shadow-2xl"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">Sign In</h1>
          <p className="text-gray-500 mb-6 sm:mb-8 text-sm sm:text-base">Enter your credentials to continue playing.</p>

          {error && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 mb-5 text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />{error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email" placeholder="Email address" value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-gray-100 border-0 rounded-xl px-4 sm:px-5 py-4 text-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-purple-400 outline-none text-sm sm:text-base"
              autoComplete="email" disabled={isLoading}
            />
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'} placeholder="Password"
                value={password} onChange={e => setPassword(e.target.value)}
                className="w-full bg-gray-100 border-0 rounded-xl px-4 sm:px-5 py-4 pr-12 text-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-purple-400 outline-none text-sm sm:text-base"
                autoComplete="current-password" disabled={isLoading}
              />
              <button type="button" onClick={() => setShowPassword(p => !p)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <div className="flex items-center justify-end">
              <Link to="/forgot-password" className="text-sm text-purple-600 hover:text-purple-700 transition-colors">
                Forgot Password?
              </Link>
            </div>

            <motion.button type="submit" disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold text-base sm:text-lg disabled:opacity-60 flex items-center justify-center gap-2"
              whileHover={{ scale: isLoading ? 1 : 1.02 }} whileTap={{ scale: isLoading ? 1 : 0.98 }}>
              {isLoading ? <><Loader2 className="w-5 h-5 animate-spin" /> Signing in...</> : 'Sign In'}
            </motion.button>

            <p className="text-center text-gray-600 text-sm">
              New to Tour Arcade?{' '}
              <Link to="/signup" className="text-purple-600 hover:text-purple-700 font-medium">Create an account</Link>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
