import { useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Gamepad2, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { authApi, ApiError } from '../utils/api';
import { Input } from './ui/input';

export function ResetPasswordPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const token = params.get('token') || '';
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) { setError('Password must be at least 8 characters.'); return; }
    if (password !== confirm) { setError('Passwords do not match.'); return; }
    setError(''); setIsLoading(true);
    try {
      await authApi.resetPassword(token, password);
      setSuccess(true);
      setTimeout(() => navigate('/signin'), 2500);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Reset failed. The link may have expired.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex flex-col">
      <header className="px-8 py-6">
        <Link to="/" className="flex items-center gap-2">
          <Gamepad2 className="w-8 h-8 text-purple-500" />
          <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Tour Arcade</span>
        </Link>
      </header>
      <div className="flex-1 flex items-center justify-center px-8">
        <motion.div className="bg-white text-black rounded-2xl p-10 w-full max-w-md shadow-2xl"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <AnimatePresence mode="wait">
            {success ? (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-4">
                <CheckCircle2 className="w-14 h-14 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Password reset!</h2>
                <p className="text-gray-500 text-sm">Redirecting you to sign in...</p>
              </motion.div>
            ) : (
              <motion.div key="form">
                <h1 className="text-2xl font-bold mb-1 text-gray-900">Set new password</h1>
                <p className="text-gray-500 mb-6 text-sm">Choose a strong password for your account.</p>
                {!token && <p className="text-red-500 text-sm mb-4">Invalid reset link. Please <Link to="/forgot-password" className="underline">request a new one</Link>.</p>}
                {error && (
                  <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 mb-5 text-sm">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />{error}
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input type="password" placeholder="New password" value={password} onChange={e => setPassword(e.target.value)}
                    className="w-full bg-gray-100 border-0 rounded-xl px-5 py-4 placeholder:text-gray-400" disabled={isLoading || !token} />
                  <Input type="password" placeholder="Confirm new password" value={confirm} onChange={e => setConfirm(e.target.value)}
                    className="w-full bg-gray-100 border-0 rounded-xl px-5 py-4 placeholder:text-gray-400" disabled={isLoading || !token} />
                  <motion.button type="submit" disabled={isLoading || !token}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-60"
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    {isLoading ? <><Loader2 className="w-5 h-5 animate-spin" /> Resetting...</> : 'Reset Password'}
                  </motion.button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
