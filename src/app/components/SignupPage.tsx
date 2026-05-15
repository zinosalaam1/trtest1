import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Gamepad2, Eye, EyeOff, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ApiError } from '../utils/api';
import logo from "../../assets/trbg.png";

export function SignupPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ username: '', email: '', password: '', password_confirm: '', date_of_birth: '', agreeToTerms: false });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  const strength = (() => {
    const p = form.password;
    if (!p) return 0;
    let s = 0;
    if (p.length >= 8) s++; if (/[A-Z]/.test(p)) s++; if (/[0-9]/.test(p)) s++; if (/[^A-Za-z0-9]/.test(p)) s++;
    return s;
  })();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!form.email) errs.email = 'Email is required.';
    if (!form.username || form.username.length < 3) errs.username = 'Min 3 characters.';
    if (!form.password || form.password.length < 8) errs.password = 'Min 8 characters.';
    if (form.password !== form.password_confirm) errs.password = 'Passwords do not match.';
    if (!form.agreeToTerms) errs.general = 'You must accept the Terms of Service.';
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({}); setIsLoading(true);
    try {
      await register({ email: form.email.trim().toLowerCase(), username: form.username.trim().toLowerCase(), password: form.password, password_confirm: form.password_confirm, date_of_birth: form.date_of_birth || undefined });
      setSuccess(true);
      setTimeout(() => navigate('/home'), 1500);
    } catch (err) {
      if (err instanceof ApiError) {
        const d = err.data as Record<string, string | string[]>;
        const newErrs: Record<string, string> = {};
        if (d.email) newErrs.email = Array.isArray(d.email) ? d.email[0] : d.email as string;
        if (d.username) newErrs.username = Array.isArray(d.username) ? d.username[0] : d.username as string;
        if (d.password) newErrs.password = Array.isArray(d.password) ? d.password[0] : d.password as string;
        if (!Object.keys(newErrs).length) newErrs.general = err.message;
        setErrors(newErrs);
      } else { setErrors({ general: 'Connection error. Please try again.' }); }
    } finally { setIsLoading(false); }
  };

  const set = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(p => ({ ...p, [field]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));

  const strengthColors = ['', 'bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500'];
  const strengthLabels = ['', 'Weak', 'Fair', 'Good', 'Strong'];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <header className="flex items-center justify-between px-4 sm:px-8 py-4 sm:py-6">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Tour Arcade Logo" className="w-20 h-12 object-contain"
  />

        </Link>
        <Link to="/signin" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm">Already have an account?</Link>
      </header>

      <div className="flex-1 flex items-start sm:items-center justify-center px-4 sm:px-8 py-4 sm:py-8">
        <motion.div className="bg-white text-black rounded-2xl p-6 sm:p-10 w-full max-w-lg shadow-2xl"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <AnimatePresence mode="wait">
            {success ? (
              <motion.div key="s" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
                <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Account Created!</h2>
                <p className="text-gray-500">Taking you to your dashboard...</p>
              </motion.div>
            ) : (
              <motion.div key="f">
                <h1 className="text-2xl sm:text-3xl font-bold mb-1">Create account</h1>
                <p className="text-gray-500 mb-5 text-sm">Join Tour Arcade and start competing.</p>

                {errors.general && (
                  <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 mb-4 text-sm">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />{errors.general}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <input type="text" placeholder="Username" value={form.username} onChange={set('username')} disabled={isLoading}
                      className={`w-full bg-gray-100 rounded-xl px-4 py-3.5 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-purple-400 text-sm ${errors.username ? 'ring-2 ring-red-400' : ''}`} />
                    {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
                  </div>
                  <div>
                    <input type="email" placeholder="Email address" value={form.email} onChange={set('email')} disabled={isLoading}
                      className={`w-full bg-gray-100 rounded-xl px-4 py-3.5 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-purple-400 text-sm ${errors.email ? 'ring-2 ring-red-400' : ''}`} />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <div className="relative">
                      <input type={showPassword ? 'text' : 'password'} placeholder="Password (min 8 chars)" value={form.password} onChange={set('password')} disabled={isLoading}
                        className={`w-full bg-gray-100 rounded-xl px-4 py-3.5 pr-11 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-purple-400 text-sm ${errors.password ? 'ring-2 ring-red-400' : ''}`} />
                      <button type="button" onClick={() => setShowPassword(p => !p)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {form.password && (
                      <div className="mt-1.5 flex gap-1">
                        {[1,2,3,4].map(i => <div key={i} className={`h-1 flex-1 rounded-full ${i <= strength ? strengthColors[strength] : 'bg-gray-200'}`} />)}
                        <span className="text-xs text-gray-400 ml-1">{strengthLabels[strength]}</span>
                      </div>
                    )}
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                  </div>
                  <input type={showPassword ? 'text' : 'password'} placeholder="Confirm password" value={form.password_confirm} onChange={set('password_confirm')} disabled={isLoading}
                    className="w-full bg-gray-100 rounded-xl px-4 py-3.5 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-purple-400 text-sm" />
                  <input type="date" value={form.date_of_birth} onChange={set('date_of_birth')} disabled={isLoading}
                    className="w-full bg-gray-100 rounded-xl px-4 py-3.5 text-gray-600 outline-none focus:ring-2 focus:ring-purple-400 text-sm" />

                  <div className="flex items-start gap-3 py-1">
                    <input type="checkbox" id="terms" checked={form.agreeToTerms} onChange={set('agreeToTerms')} className="mt-0.5 w-4 h-4 accent-purple-600" />
                    <label htmlFor="terms" className="text-xs sm:text-sm text-gray-600 leading-snug">
                      I agree to the <Link to="/terms" className="text-purple-600 hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-purple-600 hover:underline">Privacy Policy</Link>
                    </label>
                  </div>

                  <motion.button type="submit" disabled={isLoading}
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4 rounded-xl font-semibold text-sm sm:text-base disabled:opacity-60 flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    {isLoading ? <><Loader2 className="w-5 h-5 animate-spin" /> Creating...</> : 'Create Account'}
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
