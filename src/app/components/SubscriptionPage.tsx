import { Gamepad2 } from 'lucide-react';
import logo from '../../assets/trbg.png';

interface SubscriptionPageProps {
  onNext: () => void;
}

export function SubscriptionPage({ onNext }: SubscriptionPageProps) {
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
        <div className="text-4xl">Sign In</div>
      </header>

      {/* Subscription Card */}
      <div className="relative z-10 flex items-center justify-center px-4 sm:px-8 py-8">
        <div className="bg-white text-black rounded-3xl overflow-hidden w-full max-w-md shadow-2xl">
          {/* Purple header */}
          <div className="bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 text-white py-10 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
            <h2 className="text-5xl relative z-10 tracking-wide">Standard</h2>
          </div>
          
          {/* Card content */}
          <div className="p-12 text-center space-y-8">
            <div>
              <p className="text-gray-700 mb-4">Monthly Price</p>
              <div className="text-7xl">$7.99</div>
            </div>
            
            <p className="text-gray-700">Access to all features</p>
          </div>
        </div>
      </div>

      {/* Terms text and Next button */}
      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-8 space-y-6">
        <p className="text-white text-center">
          All content is available. See our Terms of Use for more details. Only available to one user for both Web & Mobile.
        </p>
        
        <button 
          onClick={onNext}
          className="w-full max-w-2xl mx-auto bg-gradient-to-r from-pink-500 to-pink-600 text-white py-4 rounded-lg hover:opacity-90 transition-opacity text-2xl block text-center"
        >
          Next
        </button>
      </div>
    </div>
  );
}
