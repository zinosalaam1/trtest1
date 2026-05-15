import { useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Gamepad2, Loader2, CheckCircle2 } from 'lucide-react';
import { authApi, ApiError } from '../utils/api';

export function VerifyEmailPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const token = params.get('token') || '';
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleVerify = async () => {
    if (!token) { setStatus('error'); setMessage('Invalid verification link.'); return; }
    setStatus('loading');
    try {
      await authApi.verifyEmail(token);
      setStatus('success');
      setMessage('Email verified! You received 500 bonus coins.');
      setTimeout(() => navigate('/home'), 2500);
    } catch (err) {
      setStatus('error');
      setMessage(err instanceof ApiError ? err.message : 'Verification failed. Link may have expired.');
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
      <div className="flex-1 flex items-center justify-center">
        <motion.div className="bg-[#0f0f1a] rounded-2xl p-10 max-w-md w-full mx-8 border border-purple-900/50 text-center"
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <div className="text-5xl mb-4">📧</div>
          <h1 className="text-2xl font-bold mb-3">Email Verification</h1>
          {status === 'idle' && (
            <>
              <p className="text-gray-400 mb-6 text-sm">Click below to verify your email and claim 500 bonus coins.</p>
              <motion.button onClick={handleVerify}
                className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-3 rounded-xl font-semibold"
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                Verify Email
              </motion.button>
            </>
          )}
          {status === 'loading' && <div className="flex items-center justify-center gap-2 text-gray-400"><Loader2 className="w-6 h-6 animate-spin" /> Verifying...</div>}
          {status === 'success' && (
            <>
              <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-3" />
              <p className="text-green-400 mb-2">{message}</p>
              <p className="text-gray-500 text-sm">Redirecting to your dashboard...</p>
            </>
          )}
          {status === 'error' && (
            <>
              <p className="text-red-400 mb-4">{message}</p>
              <Link to="/signin" className="text-purple-400 hover:underline text-sm">Back to Sign In</Link>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
