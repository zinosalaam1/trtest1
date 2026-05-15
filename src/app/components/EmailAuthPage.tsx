import { Gamepad2 } from 'lucide-react';
import logo from '../../assets/logo.svg';
import { Input } from './ui/input';

interface EmailAuthPageProps {
  onBackToLogin: () => void;
  onNext: () => void;
}

export function EmailAuthPage({ onBackToLogin, onNext }: EmailAuthPageProps) {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Decorative background elements - gaming themed outlines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Game controller outlines */}
        <svg className="absolute top-10 left-10 w-64 h-64 opacity-20" viewBox="0 0 200 200" fill="none" stroke="#1e40af" strokeWidth="2">
          <rect x="40" y="60" width="120" height="80" rx="20" />
          <circle cx="70" cy="90" r="8" />
          <circle cx="90" cy="90" r="8" />
          <circle cx="140" cy="90" r="8" />
          <circle cx="160" cy="90" r="8" />
        </svg>
        
        <svg className="absolute top-40 right-20 w-48 h-48 opacity-20" viewBox="0 0 200 200" fill="none" stroke="#1e40af" strokeWidth="2">
          <rect x="50" y="30" width="100" height="140" rx="10" />
          <circle cx="100" cy="60" r="15" />
          <rect x="70" y="100" width="60" height="40" rx="5" />
        </svg>

        <svg className="absolute bottom-20 left-20 w-56 h-56 opacity-20" viewBox="0 0 200 200" fill="none" stroke="#1e40af" strokeWidth="2">
          <rect x="30" y="40" width="140" height="120" rx="15" />
          <circle cx="60" cy="80" r="10" />
          <circle cx="140" cy="80" r="10" />
          <rect x="80" y="120" width="40" height="20" rx="3" />
        </svg>

        {/* Gamepad icons */}
        <div className="absolute top-20 right-40 opacity-10">
          <Gamepad2 className="w-16 h-16 text-blue-600" />
        </div>
        <div className="absolute bottom-40 right-10 opacity-10">
          <Gamepad2 className="w-20 h-20 text-blue-600" />
        </div>
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-4 sm:px-8 py-6">
        <img src={logo} alt="Tour Arcade" className="h-12" />
        <div className="text-4xl">Sign In</div>
      </header>

      {/* Email Auth Form Card */}
      <div className="relative z-10 flex items-center justify-center px-4 sm:px-8 py-6 sm:py-12">
        <div className="bg-white text-black rounded-lg p-12 w-full max-w-lg">
          <h1 className="text-3xl mb-4 text-center">
            Email Authentication
          </h1>
          <p className="text-gray-500 text-center mb-8">
            Enter the 6-digit code sent to your email.
          </p>
          
          <div className="space-y-6">
            <Input
              type="text"
              placeholder=""
              maxLength={6}
              className="w-full bg-gray-200 border-0 rounded-lg px-6 py-6 text-gray-600 text-center tracking-widest"
            />
            
            <button 
              onClick={onNext}
              className="w-full bg-[#d946ef] text-white py-4 rounded-lg hover:opacity-90 transition-opacity text-lg text-center"
            >
              Verify email
            </button>
            
            <button 
              onClick={onBackToLogin}
              className="w-full text-gray-500 hover:text-gray-700 transition-colors text-center"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
