import { Gamepad2, Lock, ChevronRight } from 'lucide-react';
import logo from '../../assets/logo.svg';

interface PaymentPageProps {
  onNext: () => void;
}

export function PaymentPage({ onNext }: PaymentPageProps) {
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

        <svg className="absolute bottom-20 left-40 w-56 h-56 opacity-20" viewBox="0 0 200 200" fill="none" stroke="#1e40af" strokeWidth="2">
          <rect x="30" y="40" width="140" height="120" rx="15" />
          <circle cx="60" cy="80" r="10" />
          <circle cx="140" cy="80" r="10" />
          <rect x="80" y="120" width="40" height="20" rx="3" />
        </svg>

        <svg className="absolute bottom-40 right-20 w-48 h-48 opacity-20" viewBox="0 0 200 200" fill="none" stroke="#1e40af" strokeWidth="2">
          <rect x="20" y="50" width="160" height="100" rx="15" />
          <circle cx="70" cy="80" r="12" />
          <circle cx="130" cy="80" r="12" />
          <rect x="85" y="120" width="30" height="15" rx="3" />
        </svg>

        {/* Gamepad icons */}
        <div className="absolute top-20 right-40 opacity-10">
          <Gamepad2 className="w-16 h-16 text-blue-600" />
        </div>
        <div className="absolute bottom-40 right-10 opacity-10">
          <Gamepad2 className="w-20 h-20 text-blue-600" />
        </div>
        <div className="absolute top-60 left-20 opacity-10">
          <Gamepad2 className="w-14 h-14 text-blue-600" />
        </div>
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-4 sm:px-8 py-6">
        <img src={logo} alt="Tour Arcade" className="h-12" />
        <div className="text-4xl">Sign Out</div>
      </header>

      {/* Payment Card */}
      <div className="relative z-10 flex items-center justify-center px-4 sm:px-8 py-8">
        <div className="bg-white text-black rounded-3xl p-12 w-full max-w-2xl">
          <h1 className="text-4xl mb-4">Choose how to pay</h1>
          <p className="text-gray-600 mb-12">
            Your payment is encrypted and you can change how you pay anytime.
          </p>
          
          {/* Lock Icon and End-to-end encrypted */}
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-purple-600 rounded-full p-2">
              <Lock className="w-5 h-5 text-white" />
            </div>
            <span className="text-gray-700">End-to-end encrypted</span>
          </div>
          
          {/* Payment Option Card */}
          <button 
            onClick={onNext}
            className="w-full bg-gray-100 hover:bg-gray-200 rounded-xl p-6 flex items-center justify-between transition-colors"
          >
            <div className="flex items-center gap-4">
              <span className="text-xl text-gray-800">Credit or Debit Card</span>
              <div className="flex items-center gap-2">
                {/* Mastercard Logo */}
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-red-500 opacity-80"></div>
                  <div className="w-8 h-8 rounded-full bg-orange-400 opacity-80 -ml-4"></div>
                </div>
                {/* Visa Logo */}
                <div className="bg-white border border-gray-300 px-3 py-1 rounded">
                  <span className="text-blue-700">VISA</span>
                </div>
              </div>
            </div>
            <ChevronRight className="w-6 h-6 text-gray-500" />
          </button>
        </div>
      </div>
    </div>
  );
}
