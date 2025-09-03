'use client';

import { useState } from 'react';
import { ConnectWallet } from '@coinbase/onchainkit/wallet';
import { Identity, Avatar, Name } from '@coinbase/onchainkit/identity';
import { Bell, Search, Settings } from 'lucide-react';
import { useAccount } from 'wagmi';

export default function Header() {
  const { isConnected, address } = useAccount();
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center">
              <span className="text-white font-bold text-lg">TS</span>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-white">TipSync</h1>
              <p className="text-sm text-white/70">Tip creators instantly</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button className="text-white/80 hover:text-white transition-colors">Home</button>
            <button className="text-white/80 hover:text-white transition-colors">Following</button>
            <button className="text-white/80 hover:text-white transition-colors">Trending</button>
            <button className="text-white/80 hover:text-white transition-colors">Creators</button>
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
              <Search className="w-5 h-5 text-white" />
            </button>

            {/* Notifications */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors relative"
              >
                <Bell className="w-5 h-5 text-white" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full"></span>
              </button>
            </div>

            {/* Wallet Connection */}
            <div className="flex items-center space-x-2">
              {isConnected && address ? (
                <div className="flex items-center space-x-2 bg-white/10 rounded-lg px-3 py-2">
                  <Avatar address={address} className="w-6 h-6" />
                  <Name address={address} className="text-white text-sm" />
                </div>
              ) : (
                <ConnectWallet className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white border-0 rounded-lg px-4 py-2 font-medium" />
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
