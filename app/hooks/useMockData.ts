'use client';

import { useState, useEffect } from 'react';
import { User, Post, Tip, WalletStats } from '../types';

// Mock data for development
const mockUsers: User[] = [
  {
    userId: '1',
    walletAddress: '0x1234...5678',
    displayName: 'Alice Creator',
    avatarUrl: 'https://via.placeholder.com/40',
    bio: 'Digital artist and content creator',
    followerCount: 1250,
    followingCount: 320,
  },
  {
    userId: '2',
    walletAddress: '0x2345...6789',
    displayName: 'Bob Builder',
    avatarUrl: 'https://via.placeholder.com/40',
    bio: 'Web3 developer sharing insights',
    followerCount: 890,
    followingCount: 150,
  },
  {
    userId: '3',
    walletAddress: '0x3456...7890',
    displayName: 'Carol Writer',
    avatarUrl: 'https://via.placeholder.com/40',
    bio: 'Blockchain journalist and educator',
    followerCount: 2100,
    followingCount: 450,
  },
];

const mockPosts: Post[] = [
  {
    postId: '1',
    creatorId: '1',
    creator: mockUsers[0],
    content: 'Just finished my latest digital artwork! What do you think about this new style? 🎨✨ #DigitalArt #NFT',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    imageUrl: 'https://via.placeholder.com/400x300',
    likesCount: 45,
    tipsCount: 12,
    totalTipAmount: 3.20,
    hasUserLiked: false,
    hasUserTipped: false,
  },
  {
    postId: '2',
    creatorId: '2',
    creator: mockUsers[1],
    content: 'Pro tip: Always test your smart contracts on testnets before mainnet deployment. Here\'s my checklist for safer deployments 🔐',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    likesCount: 67,
    tipsCount: 8,
    totalTipAmount: 2.40,
    hasUserLiked: true,
    hasUserTipped: false,
  },
  {
    postId: '3',
    creatorId: '3',
    creator: mockUsers[2],
    content: 'Breaking: New Base protocol update brings 50% lower gas fees! This is huge for micro-transactions and tipping 🚀',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
    likesCount: 123,
    tipsCount: 25,
    totalTipAmount: 8.75,
    hasUserLiked: true,
    hasUserTipped: true,
  },
];

export function useMockData() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [walletStats, setWalletStats] = useState<WalletStats>({
    balance: 125.50,
    totalTipsSent: 45.25,
    totalTipsReceived: 12.75,
    totalEarnings: 67.80,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API loading
    setTimeout(() => {
      setPosts(mockPosts);
      setUsers(mockUsers);
      setCurrentUser({
        userId: 'current-user',
        walletAddress: '0x9999...0000',
        displayName: 'You',
        avatarUrl: 'https://via.placeholder.com/40',
        bio: 'Base MiniApp enthusiast',
      });
      setLoading(false);
    }, 1000);
  }, []);

  const likePost = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.postId === postId 
        ? {
            ...post,
            hasUserLiked: !post.hasUserLiked,
            likesCount: post.hasUserLiked ? post.likesCount - 1 : post.likesCount + 1,
          }
        : post
    ));
  };

  const tipPost = async (postId: string, amount: number): Promise<boolean> => {
    try {
      // Simulate transaction delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setPosts(prev => prev.map(post => 
        post.postId === postId 
          ? {
              ...post,
              hasUserTipped: true,
              tipsCount: post.tipsCount + 1,
              totalTipAmount: post.totalTipAmount + amount,
            }
          : post
      ));

      setWalletStats(prev => ({
        ...prev,
        balance: prev.balance - amount,
        totalTipsSent: prev.totalTipsSent + amount,
      }));

      return true;
    } catch (error) {
      console.error('Tip failed:', error);
      return false;
    }
  };

  return {
    posts,
    users,
    currentUser,
    walletStats,
    loading,
    likePost,
    tipPost,
  };
}
