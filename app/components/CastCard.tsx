'use client';

import { useState } from 'react';
import { Heart, MessageCircle, Repeat2, Share, DollarSign, Clock } from 'lucide-react';
import { Post } from '../types';
import { formatDistanceToNow } from 'date-fns';
import TipButton from './TipButton';

interface CastCardProps {
  post: Post;
  variant?: 'withTipButton' | 'minimal';
  onLike: (postId: string) => void;
  onTip: (postId: string, amount: number) => Promise<boolean>;
}

export default function CastCard({ post, variant = 'withTipButton', onLike, onTip }: CastCardProps) {
  const [showTipModal, setShowTipModal] = useState(false);

  const handleLike = () => {
    onLike(post.postId);
    // Show tip button after like if not already tipped
    if (!post.hasUserLiked && !post.hasUserTipped && variant === 'withTipButton') {
      setTimeout(() => setShowTipModal(true), 300);
    }
  };

  const handleTip = async (amount: number) => {
    const success = await onTip(post.postId, amount);
    if (success) {
      setShowTipModal(false);
    }
    return success;
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 hover:bg-white/15 transition-colors">
      {/* Header */}
      <div className="flex items-start space-x-3 mb-4">
        <img
          src={post.creator.avatarUrl}
          alt={post.creator.displayName}
          className="w-12 h-12 rounded-full border-2 border-white/20"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <h3 className="font-semibold text-white truncate">{post.creator.displayName}</h3>
            <span className="text-cyan-300">@{post.creator.userId}</span>
          </div>
          <div className="flex items-center space-x-1 text-white/60 text-sm">
            <Clock className="w-4 h-4" />
            <span>{formatDistanceToNow(post.timestamp)} ago</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mb-4">
        <p className="text-white leading-relaxed mb-3">{post.content}</p>
        {post.imageUrl && (
          <img
            src={post.imageUrl}
            alt="Post content"
            className="w-full rounded-lg border border-white/20"
          />
        )}
      </div>

      {/* Engagement Stats */}
      <div className="flex items-center justify-between mb-4 py-2 border-t border-white/10">
        <div className="flex items-center space-x-6">
          <button
            onClick={handleLike}
            className={`flex items-center space-x-2 group transition-colors ${
              post.hasUserLiked ? 'text-red-400' : 'text-white/60 hover:text-red-400'
            }`}
          >
            <Heart 
              className={`w-5 h-5 transition-transform group-hover:scale-110 ${
                post.hasUserLiked ? 'fill-current' : ''
              }`} 
            />
            <span className="text-sm">{post.likesCount}</span>
          </button>

          <button className="flex items-center space-x-2 text-white/60 hover:text-blue-400 transition-colors group">
            <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="text-sm">Reply</span>
          </button>

          <button className="flex items-center space-x-2 text-white/60 hover:text-green-400 transition-colors group">
            <Repeat2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="text-sm">Recast</span>
          </button>

          <button className="flex items-center space-x-2 text-white/60 hover:text-purple-400 transition-colors group">
            <Share className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="text-sm">Share</span>
          </button>
        </div>

        {/* Tip Stats */}
        {post.tipsCount > 0 && (
          <div className="flex items-center space-x-2 text-cyan-300">
            <DollarSign className="w-4 h-4" />
            <span className="text-sm font-medium">
              ${post.totalTipAmount.toFixed(2)} • {post.tipsCount} tips
            </span>
          </div>
        )}
      </div>

      {/* Tip Button */}
      {variant === 'withTipButton' && (
        <TipButton
          post={post}
          onTip={handleTip}
          showModal={showTipModal}
          onCloseModal={() => setShowTipModal(false)}
        />
      )}
    </div>
  );
}
