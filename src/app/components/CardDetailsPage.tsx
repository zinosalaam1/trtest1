import { Gamepad2, ChevronLeft, CreditCard, HelpCircle } from 'lucide-react';
import logo from '../../assets/trbg.png';
import { Input } from './ui/input';
import { Checkbox } from './ui/checkbox';
import { useState } from 'react';

interface CardDetailsPageProps {
  onBack: () => void;
  onComplete: () => void;
}

export function CardDetailsPage({ onBack, onComplete }: CardDetailsPageProps) {
  const [agreed, setAgreed] = useState(false);

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

      {/* Card Details Form */}
      <div className="relative z-10 flex items-center justify-center px-4 sm:px-8 py-8">
        <div className="bg-white text-black rounded-3xl p-12 w-full max-w-2xl">
          {/* Back Button */}
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-blue-600 mb-8 hover:text-blue-700 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Change payment method</span>
          </button>

          <h1 className="text-4xl mb-6">Set up your Debit or Credit Card</h1>
          
          {/* Card logos */}
          <div className="flex items-center gap-3 mb-8">
            {/* Mastercard Logo */}
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-red-500 opacity-80"></div>
              <div className="w-10 h-10 rounded-full bg-orange-400 opacity-80 -ml-5"></div>
            </div>
            {/* Visa Logo */}
            <div className="bg-white border border-gray-300 px-4 py-1 rounded">
              <span className="text-blue-700">VISA</span>
            </div>
          </div>

          {/* Form */}
          <div className="space-y-4 mb-6">
            {/* Card number */}
            <div className="relative">
              <Input
                type="text"
                placeholder="Card number"
                className="w-full bg-gray-100 border-0 rounded-lg px-6 py-6 pr-12 text-gray-800 placeholder:text-gray-500"
              />
              <CreditCard className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            </div>

            {/* Expiration date and CVV */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                type="text"
                placeholder="Expiration date"
                className="bg-gray-100 border-0 rounded-lg px-6 py-6 text-gray-800 placeholder:text-gray-500"
              />
              <div className="relative">
                <Input
                  type="text"
                  placeholder="CVV"
                  className="bg-gray-100 border-0 rounded-lg px-6 py-6 pr-12 text-gray-800 placeholder:text-gray-500"
                />
                <HelpCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              </div>
            </div>

            {/* Name on card */}
            <Input
              type="text"
              placeholder="Name on card"
              className="w-full bg-gray-100 border-0 rounded-lg px-6 py-6 text-gray-800 placeholder:text-gray-500"
            />
          </div>

          {/* Pricing box */}
          <div className="bg-gray-100 rounded-lg p-6 mb-6">
            <div className="text-gray-700 mb-2">Standard</div>
            <div className="text-gray-700">
              <span className="mr-1">$7.99 for first month</span>
            </div>
            <div className="text-gray-600 text-sm">
              then auto-renews for $7.99/month
            </div>
          </div>

          {/* Payment processing info */}
          <p className="text-sm text-gray-700 mb-4">
            Your payments will be processed internationally. Additional bank fees may apply.
          </p>

          {/* Terms agreement */}
          <p className="text-sm text-gray-700 mb-6">
            By checking the checkbox below, you agree to our{' '}
            <a href="#" className="text-blue-600 underline">Terms of Use</a>,{' '}
            <a href="#" className="text-blue-600 underline">Privacy Statement</a>. TourArcade will automatically continue your membership and charge the membership fee (currently $7.99/month) to your payment method until you cancel. You may cancel at any time to avoid future charges.
          </p>

          {/* Checkbox */}
          <div className="flex items-center gap-3 mb-6">
            <Checkbox 
              id="agree" 
              checked={agreed}
              onCheckedChange={(checked) => setAgreed(checked as boolean)}
              className="border-gray-400" 
            />
            <label htmlFor="agree" className="text-gray-700">
              I agree
            </label>
          </div>

          {/* Start Membership button */}
          <button 
            onClick={onComplete}
            disabled={!agreed}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed text-center text-xl"
          >
            Start Membership
          </button>
        </div>
      </div>
    </div>
  );
}
