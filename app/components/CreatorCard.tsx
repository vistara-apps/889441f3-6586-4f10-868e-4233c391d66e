'use client';

import { useState } from 'react';
import { User } from '../types';
import { Users, TrendingUp, DollarSign } from 'lucide-react';

interface CreatorCardProps {
  creator: User;
}

export default function CreatorCard({ creator }: CreatorCardProps) {
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 hover:bg-white/15 transition-colors">
      {/* Profile Section */}
      <div className="flex items-center space-x-4 mb-4">
        <img
          src={creator.avatarUrl}
          alt={creator.displayName}
          className="w-16 h-16 rounded-full border-2 border-white/20"
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-white truncate">{creator.displayName}</h3>
          <p className="text-white/60 text-sm truncate">{creator.bio}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between mb-4 py-3 bg-white/5 rounded-lg px-4">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1 text-white/60 mb-1">
            <Users className="w-4 h-4" />
          </div>
          <div className="text-lg font-semibold text-white">
            {creator.followerCount ? (creator.followerCount / 1000).toFixed(1) + 'K' : '0'}
          </div>
          <div className="text-xs text-white/60">Followers</div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1 text-white/60 mb-1">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div className="text-lg font-semibold text-white">95%</div>
          <div className="text-xs text-white/60">Engagement</div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1 text-white/60 mb-1">
            <DollarSign className="w-4 h-4" />
          </div>
          <div className="text-lg font-semibold text-white">$2.4K</div>
          <div className="text-xs text-white/60">Earned</div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex space-x-3">
        <button
          onClick={() => setIsFollowing(!isFollowing)}
          className={`flex-1 py-2.5 px-4 rounded-lg font-medium transition-colors ${
            isFollowing
              ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
              : 'bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white'
          }`}
        >
          {isFollowing ? 'Following' : 'Follow'}
        </button>
        
        <button className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-colors">
          Tip
        </button>
      </div>
    </div>
  );
}
