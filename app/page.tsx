'use client';

import { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import CastCard from './components/CastCard';
import StatsCard from './components/StatsCard';
import CreatorCard from './components/CreatorCard';
import { useMockData } from './hooks/useMockData';
import { Plus, Loader2 } from 'lucide-react';

export default function HomePage() {
  const { posts, users, currentUser, walletStats, loading, likePost, tipPost } = useMockData();
  const [activeTab, setActiveTab] = useState('feed');

  if (loading) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-white animate-spin mx-auto mb-4" />
          <p className="text-white/80">Loading TipSync...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg">
      <Header />
      
      <div className="flex">
        <Sidebar walletStats={walletStats} />
        
        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            {/* Create Post */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 mb-6">
              <div className="flex items-center space-x-4">
                <img
                  src={currentUser?.avatarUrl || 'https://via.placeholder.com/40'}
                  alt="Your avatar"
                  className="w-12 h-12 rounded-full border-2 border-white/20"
                />
                <div className="flex-1">
                  <textarea
                    placeholder="What's happening? Share something worth tipping..."
                    className="w-full bg-transparent text-white placeholder-white/50 resize-none focus:outline-none text-lg"
                    rows={3}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                <div className="flex items-center space-x-4 text-white/60">
                  <button className="hover:text-white transition-colors">
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <button className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                  Post
                </button>
              </div>
            </div>

            {/* Feed */}
            <div className="space-y-6">
              {posts.map((post) => (
                <CastCard
                  key={post.postId}
                  post={post}
                  onLike={likePost}
                  onTip={tipPost}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-80 p-6 space-y-6">
          {/* Stats Overview */}
          <div className="space-y-4">
            <StatsCard
              title="Total Tips Today"
              value="$1,247"
              change="+12% from yesterday"
              icon="dollar"
              variant="accent"
            />
            
            <StatsCard
              title="Active Creators"
              value="2,847"
              change="+5% this week"
              icon="users"
            />
          </div>

          {/* Top Creators */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6">
            <h3 className="text-xl font-semibold text-white mb-6">Trending Creators</h3>
            <div className="space-y-4">
              {users.slice(0, 3).map((creator) => (
                <CreatorCard key={creator.userId} creator={creator} />
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white py-3 rounded-lg font-medium transition-colors">
                Bulk Tip Favorites
              </button>
              <button className="w-full bg-white/10 hover:bg-white/20 text-white py-3 rounded-lg font-medium transition-colors">
                View Analytics
              </button>
              <button className="w-full bg-white/10 hover:bg-white/20 text-white py-3 rounded-lg font-medium transition-colors">
                Creator Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
