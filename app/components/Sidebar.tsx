'use client';

import { Home, TrendingUp, Users, Settings, Wallet, BarChart3 } from 'lucide-react';
import { WalletStats } from '../types';

interface SidebarProps {
  walletStats: WalletStats;
}

export default function Sidebar({ walletStats }: SidebarProps) {
  const menuItems = [
    { icon: Home, label: 'Home', active: true },
    { icon: TrendingUp, label: 'Trending' },
    { icon: Users, label: 'Following' },
    { icon: BarChart3, label: 'Analytics' },
    { icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="w-80 min-h-screen bg-white/10 backdrop-blur-md border-r border-white/20 p-6">
      {/* Post Feed Section */}
      <div className="bg-white/20 rounded-2xl p-6 mb-6">
        <h3 className="text-xl font-semibold text-white mb-6">Post Feed</h3>
        
        {/* Tip Button */}
        <button className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white rounded-xl py-3 mb-4 font-medium transition-all duration-200 transform hover:scale-[1.02]">
          Tip
        </button>

        {/* Menu Items */}
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                item.active 
                  ? 'bg-white/20 text-white' 
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Wallet Stats */}
      <div className="bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Wallet Stats</h3>
          <Wallet className="w-5 h-5 text-cyan-300" />
        </div>
        
        <div className="text-3xl font-bold text-white mb-2">
          ${walletStats.balance.toFixed(2)}
        </div>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-white/70">
            <span>Tips Sent</span>
            <span className="text-white">${walletStats.totalTipsSent.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-white/70">
            <span>Tips Received</span>
            <span className="text-white">${walletStats.totalTipsReceived.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
