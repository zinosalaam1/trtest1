import { Menu, Search, Settings, Home, Users, Trophy, Gift, Sparkles, ShoppingCart, Crown, Zap, RotateCcw, Save } from 'lucide-react';
import logo from '../../assets/trbg.png';

import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useState } from 'react';

interface SettingsPageProps {
  onBack: () => void;
  onOpenProfile: () => void;
}

type SettingsTab = 'profile' | 'gameplay' | 'display' | 'audio' | 'privacy' | 'notifications' | 'subscription' | 'advanced';

export function SettingsPage({ onBack, onOpenProfile }: SettingsPageProps) {
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');

  return (
    <div className="min-h-screen bg-[#1a1a1f] text-white flex">
      {/* Left Sidebar */}
      <div className="w-16 bg-[#0f0f13] flex flex-col items-center py-6 gap-6 border-r border-gray-800">
        <button 
          onClick={onBack}
          className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center hover:bg-blue-700 transition-colors"
        >
          <Home className="w-5 h-5" />
        </button>
        <button className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors">
          <Users className="w-5 h-5" />
        </button>
        <button className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors">
          <Trophy className="w-5 h-5" />
        </button>
        <button className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors">
          <Gift className="w-5 h-5" />
        </button>
        <button className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors">
          <Sparkles className="w-5 h-5" />
        </button>
        <button className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors">
          <ShoppingCart className="w-5 h-5" />
        </button>
        <button className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors">
          <Crown className="w-5 h-5" />
        </button>
        <button className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors">
          <Zap className="w-5 h-5" />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-[#0f0f13] border-b border-gray-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button className="text-gray-400 hover:text-white">
              <Menu className="w-6 h-6" />
            </button>
            <img src={logo} alt="Tour Arcade" className="h-8" />
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search"
                className="w-full bg-[#2a2a32] border-0 rounded-full pl-12 pr-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
          </div>

          {/* User Icons */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-xl">
              😎
            </div>
            <div className="w-10 h-10 rounded-full bg-gray-600"></div>
            <button className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center hover:bg-purple-500 transition-colors">
              <Settings className="w-5 h-5" />
            </button>
            <div className="w-10 h-10 rounded-full bg-gray-600"></div>
            <button 
              onClick={onOpenProfile}
              className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer"
            >
              <img 
                src="https://placehold.co/400x200/1a0533/a855f7?text=Tour+Arcade"
                alt="User"
                className="w-full h-full rounded-full object-cover"
              />
            </button>
          </div>
        </header>

        {/* Settings Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-5xl mx-auto">
            {/* Settings Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-4xl mb-2">Settings</h1>
                <p className="text-gray-400">Customize your Tour Arcade experience</p>
              </div>
              <div className="flex gap-3">
                <button className="bg-[#2a2a32] text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-[#3a3a42] transition-colors">
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </button>
                <button className="bg-white text-black px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-gray-100 transition-colors">
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-[#2a2a32] rounded-lg p-2 flex items-center gap-2 mb-6 overflow-x-auto">
              <button 
                onClick={() => setActiveTab('profile')}
                className={`px-6 py-3 rounded-lg flex items-center gap-2 whitespace-nowrap transition-colors ${activeTab === 'profile' ? 'bg-[#1a1a1f] text-white' : 'text-gray-400 hover:text-white'}`}
              >
                <Users className="w-4 h-4" />
                Profile
              </button>
              <button 
                onClick={() => setActiveTab('gameplay')}
                className={`px-6 py-3 rounded-lg flex items-center gap-2 whitespace-nowrap transition-colors ${activeTab === 'gameplay' ? 'bg-[#1a1a1f] text-white' : 'text-gray-400 hover:text-white'}`}
              >
                <Trophy className="w-4 h-4" />
                Gameplay
              </button>
              <button 
                onClick={() => setActiveTab('display')}
                className={`px-6 py-3 rounded-lg flex items-center gap-2 whitespace-nowrap transition-colors ${activeTab === 'display' ? 'bg-[#1a1a1f] text-white' : 'text-gray-400 hover:text-white'}`}
              >
                Display
              </button>
              <button 
                onClick={() => setActiveTab('audio')}
                className={`px-6 py-3 rounded-lg flex items-center gap-2 whitespace-nowrap transition-colors ${activeTab === 'audio' ? 'bg-[#1a1a1f] text-white' : 'text-gray-400 hover:text-white'}`}
              >
                Audio
              </button>
              <button 
                onClick={() => setActiveTab('privacy')}
                className={`px-6 py-3 rounded-lg flex items-center gap-2 whitespace-nowrap transition-colors ${activeTab === 'privacy' ? 'bg-[#1a1a1f] text-white' : 'text-gray-400 hover:text-white'}`}
              >
                Privacy
              </button>
              <button 
                onClick={() => setActiveTab('notifications')}
                className={`px-6 py-3 rounded-lg flex items-center gap-2 whitespace-nowrap transition-colors ${activeTab === 'notifications' ? 'bg-[#1a1a1f] text-white' : 'text-gray-400 hover:text-white'}`}
              >
                Notifications
              </button>
              <button 
                onClick={() => setActiveTab('subscription')}
                className={`px-6 py-3 rounded-lg flex items-center gap-2 whitespace-nowrap transition-colors ${activeTab === 'subscription' ? 'bg-[#1a1a1f] text-white' : 'text-gray-400 hover:text-white'}`}
              >
                Subscription
              </button>
              <button 
                onClick={() => setActiveTab('advanced')}
                className={`px-6 py-3 rounded-lg flex items-center gap-2 whitespace-nowrap transition-colors ${activeTab === 'advanced' ? 'bg-[#1a1a1f] text-white' : 'text-gray-400 hover:text-white'}`}
              >
                <Settings className="w-4 h-4" />
                Advanced
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                {/* Profile Card */}
                <div className="bg-[#2a2a32] rounded-xl p-6">
                  <div className="flex items-start gap-6 mb-6">
                    <div className="w-24 h-24 rounded-full bg-red-600 flex items-center justify-center relative overflow-hidden">
                      <img 
                        src="https://placehold.co/400x200/1a0533/a855f7?text=Tour+Arcade"
                        alt="User"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl mb-1">EliteGamer</h2>
                      <p className="text-gray-400 mb-3">demo@tourarcade.com</p>
                      <div className="flex gap-4">
                        <div className="bg-[#1a1a1f] px-4 py-2 rounded-lg">
                          <span className="text-gray-400">Level 42</span>
                        </div>
                        <div className="bg-[#1a1a1f] px-4 py-2 rounded-lg">
                          <span className="text-gray-400">Rank #23</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Profile Form */}
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Username</label>
                      <Input
                        type="text"
                        defaultValue="EliteGamer"
                        className="w-full bg-[#1a1a1f] border-0 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Bio</label>
                      <Textarea
                        defaultValue="Tell us about yourself..."
                        className="w-full bg-[#1a1a1f] border-0 text-white"
                        rows={1}
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Email</label>
                      <Input
                        type="email"
                        defaultValue="demo@tourarcade.com"
                        className="w-full bg-[#1a1a1f] border-0 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Discord Tag</label>
                      <Input
                        type="text"
                        defaultValue="username#1234"
                        className="w-full bg-[#1a1a1f] border-0 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Location</label>
                      <Input
                        type="text"
                        defaultValue="City, Country"
                        className="w-full bg-[#1a1a1f] border-0 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Twitch Username</label>
                      <Input
                        type="text"
                        defaultValue="twitch.tv/username"
                        className="w-full bg-[#1a1a1f] border-0 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Website</label>
                      <Input
                        type="text"
                        defaultValue="https://yoursite.com"
                        className="w-full bg-[#1a1a1f] border-0 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">YouTube Channel</label>
                      <Input
                        type="text"
                        defaultValue="youtube.com/@channel"
                        className="w-full bg-[#1a1a1f] border-0 text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Security Section */}
                <div className="bg-[#2a2a32] rounded-xl p-6">
                  <h3 className="text-xl mb-6">Security</h3>
                  
                  {/* Two-Factor Authentication */}
                  <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-700">
                    <div>
                      <h4 className="mb-1">Two-Factor Authentication</h4>
                      <p className="text-sm text-gray-400">Add an extra layer of security to your account</p>
                    </div>
                    <Switch />
                  </div>

                  {/* Password Fields */}
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Current Password</label>
                      <Input
                        type="password"
                        placeholder="Enter current password"
                        className="w-full bg-[#1a1a1f] border-0 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">New Password</label>
                      <Input
                        type="password"
                        placeholder="Enter new password"
                        className="w-full bg-[#1a1a1f] border-0 text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'gameplay' && (
              <div className="bg-[#2a2a32] rounded-xl p-6">
                <h3 className="text-xl mb-6">Game Preferences</h3>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-6 border-b border-gray-700">
                    <div>
                      <h4 className="mb-1">Default Difficulty</h4>
                      <p className="text-sm text-gray-400">Choose your preferred difficulty level</p>
                    </div>
                    <Select defaultValue="medium">
                      <SelectTrigger className="w-48 bg-[#1a1a1f] border-0">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                        <SelectItem value="expert">Expert</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between pb-6 border-b border-gray-700">
                    <div>
                      <h4 className="mb-1">Auto Save</h4>
                      <p className="text-sm text-gray-400">Automatically save game progress</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between pb-6 border-b border-gray-700">
                    <div>
                      <h4 className="mb-1">Tutorials</h4>
                      <p className="text-sm text-gray-400">Show tutorial hints and tips</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between pb-6 border-b border-gray-700">
                    <div>
                      <h4 className="mb-1">Haptic Feedback</h4>
                      <p className="text-sm text-gray-400">Enable controller and mobile vibration</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between pb-6 border-b border-gray-700">
                    <div>
                      <h4 className="mb-1">Cross-Platform Sync</h4>
                      <p className="text-sm text-gray-400">Sync progress across all devices</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between pb-6 border-b border-gray-700">
                    <div>
                      <h4 className="mb-1">Competitive Mode</h4>
                      <p className="text-sm text-gray-400">Enable ranked gameplay features</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="mb-1">AI Assistance</h4>
                      <p className="text-sm text-gray-400">Get smart gameplay suggestions</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'privacy' && (
              <div className="bg-[#2a2a32] rounded-xl p-6">
                <h3 className="text-xl mb-6">Privacy Controls</h3>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-6 border-b border-gray-700">
                    <div>
                      <h4 className="mb-1">Profile Visibility</h4>
                      <p className="text-sm text-gray-400">Who can see your profile</p>
                    </div>
                    <Select defaultValue="public">
                      <SelectTrigger className="w-48 bg-[#1a1a1f] border-0">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public</SelectItem>
                        <SelectItem value="friends">Friends Only</SelectItem>
                        <SelectItem value="private">Private</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between pb-6 border-b border-gray-700">
                    <div>
                      <h4 className="mb-1">Show Online Status</h4>
                      <p className="text-sm text-gray-400">Let others see when you're online</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between pb-6 border-b border-gray-700">
                    <div>
                      <h4 className="mb-1">Allow Friend Requests</h4>
                      <p className="text-sm text-gray-400">Receive friend requests from other players</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between pb-6 border-b border-gray-700">
                    <div>
                      <h4 className="mb-1">Show Game Activity</h4>
                      <p className="text-sm text-gray-400">Display what games you're playing</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between pb-6 border-b border-gray-700">
                    <div>
                      <h4 className="mb-1">Data Collection</h4>
                      <p className="text-sm text-gray-400">Allow anonymous usage analytics</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between pb-6 border-b border-gray-700">
                    <div>
                      <h4 className="mb-1">Personalised Ads</h4>
                      <p className="text-sm text-gray-400">Show relevant advertisements</p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="mb-1">Location Tracking</h4>
                      <p className="text-sm text-gray-400">Use location for regional features</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'display' && (
              <div className="bg-[#2a2a32] rounded-xl p-6">
                <h3 className="text-xl mb-6">Appearance</h3>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-6 border-b border-gray-700">
                    <div>
                      <h4 className="mb-1">Theme</h4>
                      <p className="text-sm text-gray-400">Choose your preferred theme</p>
                    </div>
                    <Select defaultValue="dark">
                      <SelectTrigger className="w-48 bg-[#1a1a1f] border-0">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="auto">Auto</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="pb-6 border-b border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="mb-1">Color Scheme</h4>
                        <p className="text-sm text-gray-400">Customize the accent colors</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button className="w-8 h-8 rounded-full bg-white border-2 border-gray-600 hover:border-white transition-colors"></button>
                        <button className="w-8 h-8 rounded-full bg-purple-600 border-2 border-gray-600 hover:border-purple-400 transition-colors"></button>
                        <button className="w-8 h-8 rounded-full bg-pink-600 border-2 border-gray-600 hover:border-pink-400 transition-colors"></button>
                        <button className="w-8 h-8 rounded-full bg-green-500 border-2 border-gray-600 hover:border-green-400 transition-colors"></button>
                        <button className="w-8 h-8 rounded-full bg-orange-500 border-2 border-gray-600 hover:border-orange-400 transition-colors"></button>
                      </div>
                    </div>
                  </div>

                  <div className="pb-6 border-b border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="mb-1">Font Size</h4>
                        <p className="text-sm text-gray-400">Adjust text size for better readability</p>
                      </div>
                      <div className="text-gray-400">14px</div>
                    </div>
                    <input 
                      type="range" 
                      min="12" 
                      max="20" 
                      defaultValue="14" 
                      className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-0"
                    />
                  </div>

                  <div className="flex items-center justify-between pb-6 border-b border-gray-700">
                    <div>
                      <h4 className="mb-1">Animations</h4>
                      <p className="text-sm text-gray-400">Enable smooth transitions and effects</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between pb-6 border-b border-gray-700">
                    <div>
                      <h4 className="mb-1">High Contrast</h4>
                      <p className="text-sm text-gray-400">Improve visibility with higher contrast</p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="mb-1">Reduced Motion</h4>
                      <p className="text-sm text-gray-400">Minimize motion for accessibility</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'audio' && (
              <div className="bg-[#2a2a32] rounded-xl p-6">
                <h3 className="text-xl mb-6">Volume Controls</h3>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4>Master Volume</h4>
                      <div className="text-gray-400">80%</div>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      defaultValue="80" 
                      className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-0"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4>Music</h4>
                      <div className="text-gray-400">70%</div>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      defaultValue="70" 
                      className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-0"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4>Sound Effect</h4>
                      <div className="text-gray-400">85%</div>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      defaultValue="85" 
                      className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-0"
                    />
                  </div>

                  <div className="pb-6 border-b border-gray-700">
                    <div className="flex items-center justify-between mb-3">
                      <h4>Voice Chat</h4>
                      <div className="text-gray-400">90%</div>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      defaultValue="90" 
                      className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-0"
                    />
                  </div>

                  <div className="flex items-center justify-between pb-6 border-b border-gray-700">
                    <div>
                      <h4 className="mb-1">Spatial Audio</h4>
                      <p className="text-sm text-gray-400">3D positional audio experience</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between pb-6 border-b border-gray-700">
                    <div>
                      <h4 className="mb-1">Dynamic Range</h4>
                      <p className="text-sm text-gray-400">Automatic volume adjustment</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="mb-1">Audio Quality</h4>
                      <p className="text-sm text-gray-400">Higher quality uses more bandwidth</p>
                    </div>
                    <Select defaultValue="high">
                      <SelectTrigger className="w-48 bg-[#1a1a1f] border-0">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="ultra">Ultra</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="bg-[#2a2a32] rounded-xl p-6">
                <h3 className="text-xl mb-6">Notification Preferences</h3>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-6 border-b border-gray-700">
                    <div>
                      <h4 className="mb-1">Push Notifications</h4>
                      <p className="text-sm text-gray-400">Receive notifications on this device</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between pb-6 border-b border-gray-700">
                    <div>
                      <h4 className="mb-1">Email Notifications</h4>
                      <p className="text-sm text-gray-400">Receive notifications via email</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between pb-6 border-b border-gray-700">
                    <div>
                      <h4 className="mb-1">Game Invites</h4>
                      <p className="text-sm text-gray-400">When friends invite you to play</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between pb-6 border-b border-gray-700">
                    <div>
                      <h4 className="mb-1">Tournament Updates</h4>
                      <p className="text-sm text-gray-400">Tournament results and announcements</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between pb-6 border-b border-gray-700">
                    <div>
                      <h4 className="mb-1">Friend Activity</h4>
                      <p className="text-sm text-gray-400">When friends achieve milestones</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between pb-6 border-b border-gray-700">
                    <div>
                      <h4 className="mb-1">Achievements</h4>
                      <p className="text-sm text-gray-400">When you unlock new achievements</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="mb-1">Quiet Hours</h4>
                      <p className="text-sm text-gray-400">Disable notifications during specified hours</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'subscription' && (
              <div className="space-y-6">
                <div className="bg-[#2a2a32] rounded-xl p-6">
                  <h3 className="text-xl mb-6">Subscription Management</h3>
                  
                  {/* Current Plan */}
                  <div className="mb-6">
                    <h4 className="mb-4">Current Plan</h4>
                    <div className="bg-gradient-to-r from-yellow-600 to-yellow-700 rounded-lg p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-yellow-800 px-3 py-1 rounded text-sm">Premium Standard</div>
                        <span className="text-sm text-yellow-100">Next billing: Jan 15, 2026</span>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl">$12.99</div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <button className="bg-[#1a1a1f] text-white px-4 py-3 rounded-lg hover:bg-[#2a2a2f] transition-colors">
                      Change Plan
                    </button>
                    <button className="bg-[#1a1a1f] text-white px-4 py-3 rounded-lg hover:bg-[#2a2a2f] transition-colors">
                      Manage Billing
                    </button>
                    <button className="bg-red-600/20 text-red-400 px-4 py-3 rounded-lg hover:bg-red-600/30 transition-colors">
                      Cancel Subscription
                    </button>
                  </div>

                  {/* Available Plans */}
                  <div className="mb-6">
                    <h4 className="mb-4">Available Plans</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {/* Free Plan */}
                      <div className="bg-[#1a1a1f] rounded-lg p-6">
                        <div className="mb-4">
                          <div className="text-sm text-gray-400 mb-1">Free</div>
                          <div className="text-3xl mb-1">$0</div>
                          <div className="text-sm text-gray-400">No deposit</div>
                        </div>
                        <div className="space-y-3 mb-6">
                          <div className="flex items-start gap-2 text-sm">
                            <span className="text-green-500 mt-0.5">✓</span>
                            <span>5 up to 90 day</span>
                          </div>
                          <div className="flex items-start gap-2 text-sm">
                            <span className="text-green-500 mt-0.5">✓</span>
                            <span>Basic customization</span>
                          </div>
                          <div className="flex items-start gap-2 text-sm">
                            <span className="text-green-500 mt-0.5">✓</span>
                            <span>Multiplayer access</span>
                          </div>
                          <div className="flex items-start gap-2 text-sm text-gray-500">
                            <span className="mt-0.5">✓</span>
                            <span>Tournament entry</span>
                          </div>
                        </div>
                        <button className="w-full bg-[#2a2a32] text-white py-3 rounded-lg hover:bg-[#3a3a42] transition-colors">
                          Current Plan
                        </button>
                      </div>

                      {/* Premium Plan */}
                      <div className="bg-gradient-to-br from-yellow-700 to-yellow-800 rounded-lg p-6 relative">
                        <div className="absolute top-4 right-4 bg-yellow-600 px-3 py-1 rounded text-xs">
                          Most Popular
                        </div>
                        <div className="mb-4">
                          <div className="text-sm text-yellow-100 mb-1">Premium Standard</div>
                          <div className="text-3xl mb-1">$12.99</div>
                          <div className="text-sm text-yellow-100">Billed monthly</div>
                        </div>
                        <div className="space-y-3 mb-6">
                          <div className="flex items-start gap-2 text-sm">
                            <span className="text-yellow-200 mt-0.5">✓</span>
                            <span>Unlimited games</span>
                          </div>
                          <div className="flex items-start gap-2 text-sm">
                            <span className="text-yellow-200 mt-0.5">✓</span>
                            <span>Marketplace access</span>
                          </div>
                          <div className="flex items-start gap-2 text-sm">
                            <span className="text-yellow-200 mt-0.5">✓</span>
                            <span>Exclusive content</span>
                          </div>
                          <div className="flex items-start gap-2 text-sm">
                            <span className="text-yellow-200 mt-0.5">✓</span>
                            <span>Advanced analytics</span>
                          </div>
                        </div>
                        <button className="w-full bg-yellow-600 text-white py-3 rounded-lg hover:bg-yellow-500 transition-colors">
                          Active Plan
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Billing History */}
                  <div>
                    <h4 className="mb-4">Billing History</h4>
                    <div className="space-y-3">
                      {[
                        { date: 'Dec 15, 2025', id: 'INV-2025-12', amount: '$12.99', status: 'Paid' },
                        { date: 'Nov 15, 2025', id: 'INV-2025-11', amount: '$12.99', status: 'Paid' },
                        { date: 'Oct 15, 2025', id: 'INV-2025-10', amount: '$12.99', status: 'Paid' },
                        { date: 'Sep 15, 2025', id: 'INV-2024-09', amount: '$12.99', status: 'Paid' }
                      ].map((invoice, idx) => (
                        <div key={idx} className="flex items-center justify-between bg-[#1a1a1f] p-4 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-500/20 rounded flex items-center justify-center">
                              <div className="w-5 h-5 bg-green-500 rounded"></div>
                            </div>
                            <div>
                              <div className="text-sm">{invoice.date}</div>
                              <div className="text-xs text-gray-400">{invoice.id}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-6">
                            <div className="text-right">
                              <div>{invoice.amount}</div>
                              <div className="text-xs text-green-400">{invoice.status}</div>
                            </div>
                            <div className="flex gap-2">
                              <button className="text-sm text-gray-400 hover:text-white transition-colors">Edit</button>
                              <button className="text-sm text-gray-400 hover:text-white transition-colors">Add Now</button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="mt-6">
                    <h4 className="mb-4">Payment Method</h4>
                    <div className="bg-[#1a1a1f] p-4 rounded-lg flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-500 rounded flex items-center justify-center">
                          <div className="w-6 h-4 bg-white rounded-sm"></div>
                        </div>
                        <div>
                          <div className="text-sm">Interac ****4242</div>
                          <div className="text-xs text-gray-400">Exp 05/2029</div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="text-sm text-gray-400 hover:text-white transition-colors">Edit</button>
                        <button className="text-sm text-gray-400 hover:text-white transition-colors">Add Now</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'advanced' && (
              <div className="space-y-6">
                {/* Storage & Data */}
                <div className="bg-[#2a2a32] rounded-xl p-6">
                  <h3 className="text-xl mb-6">Storage & Data</h3>
                  
                  {/* Cloud Storage Progress Bar */}
                  <div className="mb-6">
                    <h4 className="mb-3">Cloud Storage</h4>
                    <div className="bg-[#1a1a1f] rounded-full h-8 overflow-hidden mb-2">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-full" style={{ width: '65%' }}></div>
                    </div>
                    <p className="text-sm text-gray-400">Games, saves, screenshots, and profile data</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-3 gap-4">
                    <button className="bg-[#1a1a1f] text-white px-4 py-3 rounded-lg hover:bg-[#2a2a2f] transition-colors">
                      Export Data
                    </button>
                    <button className="bg-[#1a1a1f] text-white px-4 py-3 rounded-lg hover:bg-[#2a2a2f] transition-colors">
                      Import Data
                    </button>
                    <button className="bg-[#1a1a1f] text-white px-4 py-3 rounded-lg hover:bg-[#2a2a2f] transition-colors">
                      Clear Cache
                    </button>
                  </div>
                </div>

                {/* Account Manager */}
                <div className="bg-[#2a2a32] rounded-xl p-6">
                  <h3 className="text-xl mb-6">Account Manager</h3>
                  
                  <div className="bg-[#1a1a1f] rounded-lg p-4 mb-6">
                    <p className="text-sm text-gray-400 mb-4">Account actions below are permanent and cannot be undone.</p>
                    <div className="flex gap-4">
                      <button className="bg-[#2a2a32] text-white px-6 py-3 rounded-lg hover:bg-[#3a3a42] transition-colors">
                        Sign Out
                      </button>
                      <button className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors">
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>

                {/* Developer Options */}
                <div className="bg-[#2a2a32] rounded-xl p-6">
                  <h3 className="text-xl mb-6">Developer Options</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between pb-6 border-b border-gray-700">
                      <div>
                        <h4 className="mb-1">Debug Mode</h4>
                        <p className="text-sm text-gray-400">Show performance metrics and logs</p>
                      </div>
                      <Switch />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="mb-1">Beta Features</h4>
                        <p className="text-sm text-gray-400">Access experimental features</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}