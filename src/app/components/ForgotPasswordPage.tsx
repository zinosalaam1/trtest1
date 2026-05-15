import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Gamepad2, Mail, ArrowLeft, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { authApi, ApiError } from '../utils/api';
import { Input } from './ui/input';

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) { setError('Please enter your email.'); return; }
    setError(''); setIsLoading(true);
    try {
      await authApi.forgotPassword(email.trim().toLowerCase());
      setSent(true);
    } catch {
      setError('Something went wrong. Please try again.');
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
          {sent ? (
            <div className="text-center py-4">
              <CheckCircle2 className="w-14 h-14 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Check your inbox</h2>
              <p className="text-gray-500 mb-6 text-sm">If an account exists for {email}, you'll receive a reset link shortly.</p>
              <Link to="/signin" className="text-purple-600 hover:underline text-sm flex items-center justify-center gap-1">
                <ArrowLeft className="w-4 h-4" /> Back to Sign In
              </Link>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Forgot password?</h1>
                  <p className="text-gray-500 text-sm">We'll send you a reset link.</p>
                </div>
              </div>
              {error && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 mb-5 text-sm">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />{error}
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input type="email" placeholder="Email address" value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full bg-gray-100 border-0 rounded-xl px-5 py-4 placeholder:text-gray-400"
                  disabled={isLoading} />
                <motion.button type="submit" disabled={isLoading}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-60"
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  {isLoading ? <><Loader2 className="w-5 h-5 animate-spin" /> Sending...</> : 'Send Reset Link'}
                </motion.button>
                <Link to="/signin" className="flex items-center justify-center gap-1 text-gray-500 text-sm hover:text-gray-700">
                  <ArrowLeft className="w-4 h-4" /> Back to Sign In
                </Link>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
