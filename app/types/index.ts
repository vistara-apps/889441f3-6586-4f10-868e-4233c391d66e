export interface User {
  userId: string;
  walletAddress?: string;
  displayName: string;
  avatarUrl: string;
  bio?: string;
  followerCount?: number;
  followingCount?: number;
}

export interface Post {
  postId: string;
  creatorId: string;
  creator: User;
  content: string;
  timestamp: Date;
  imageUrl?: string;
  likesCount: number;
  tipsCount: number;
  totalTipAmount: number;
  hasUserLiked: boolean;
  hasUserTipped: boolean;
}

export interface Tip {
  tipId: string;
  tipAmount: number;
  timestamp: Date;
  senderId: string;
  sender: User;
  receiverId: string;
  receiver: User;
  postId: string;
  transactionHash?: string;
  status: 'pending' | 'completed' | 'failed';
}

export interface WalletStats {
  balance: number;
  totalTipsSent: number;
  totalTipsReceived: number;
  totalEarnings: number;
}
