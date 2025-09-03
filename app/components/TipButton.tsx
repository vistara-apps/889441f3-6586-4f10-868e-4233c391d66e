'use client';

import { useState } from 'react';
import { DollarSign, X, Loader2 } from 'lucide-react';
import { Post } from '../types';

interface TipButtonProps {
  post: Post;
  variant?: 'default' | 'processing';
  onTip: (amount: number) => Promise<boolean>;
  showModal: boolean;
  onCloseModal: () => void;
}

export default function TipButton({ 
  post, 
  variant = 'default', 
  onTip, 
  showModal, 
  onCloseModal 
}: TipButtonProps) {
  const [selectedAmount, setSelectedAmount] = useState(0.25);
  const [customAmount, setCustomAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const predefinedAmounts = [0.10, 0.25, 0.50, 1.00, 2.00, 5.00];

  const handleTip = async () => {
    setIsProcessing(true);
    const amount = customAmount ? parseFloat(customAmount) : selectedAmount;
    const success = await onTip(amount);
    setIsProcessing(false);
    
    if (success) {
      onCloseModal();
      setCustomAmount('');
      setSelectedAmount(0.25);
    }
  };

  if (post.hasUserTipped) {
    return (
      <div className="flex items-center justify-center py-2 px-4 bg-green-500/20 rounded-lg border border-green-500/30">
        <DollarSign className="w-4 h-4 text-green-400 mr-2" />
        <span className="text-green-400 text-sm font-medium">Tipped!</span>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => onCloseModal ? onCloseModal() : onTip(0.25)}
        disabled={variant === 'processing'}
        className={`w-full flex items-center justify-center space-x-2 py-3 rounded-lg font-medium transition-all duration-200 ${
          variant === 'processing'
            ? 'bg-gray-500/20 text-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white hover:scale-[1.02] active:scale-[0.98]'
        }`}
      >
        {variant === 'processing' ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <DollarSign className="w-5 h-5" />
        )}
        <span>
          {variant === 'processing' ? 'Processing...' : 'Tip Creator'}
        </span>
      </button>

      {/* Tip Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 w-full max-w-md">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">Tip {post.creator.displayName}</h3>
              <button
                onClick={onCloseModal}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-white/60" />
              </button>
            </div>

            {/* Amount Selection */}
            <div className="mb-6">
              <h4 className="text-white/80 mb-3">Select amount (USDC)</h4>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {predefinedAmounts.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => {
                      setSelectedAmount(amount);
                      setCustomAmount('');
                    }}
                    className={`py-3 px-4 rounded-lg font-medium transition-colors ${
                      selectedAmount === amount && !customAmount
                        ? 'bg-cyan-400/30 text-cyan-300 border border-cyan-400/50'
                        : 'bg-white/10 text-white/80 hover:bg-white/20'
                    }`}
                  >
                    ${amount.toFixed(2)}
                  </button>
                ))}
              </div>

              {/* Custom Amount */}
              <div>
                <label className="block text-white/80 text-sm mb-2">Or enter custom amount</label>
                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  placeholder="0.00"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-cyan-400/50"
                />
              </div>
            </div>

            {/* Transaction Summary */}
            <div className="bg-white/5 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white/60">Tip amount</span>
                <span className="text-white">
                  ${(customAmount ? parseFloat(customAmount) || 0 : selectedAmount).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-white/60">Platform fee (5%)</span>
                <span className="text-white">
                  ${((customAmount ? parseFloat(customAmount) || 0 : selectedAmount) * 0.05).toFixed(2)}
                </span>
              </div>
              <hr className="border-white/10 my-2" />
              <div className="flex justify-between items-center font-semibold">
                <span className="text-white">Total</span>
                <span className="text-white">
                  ${((customAmount ? parseFloat(customAmount) || 0 : selectedAmount) * 1.05).toFixed(2)}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <button
                onClick={onCloseModal}
                className="flex-1 py-3 px-4 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleTip}
                disabled={isProcessing || (!customAmount && !selectedAmount)}
                className="flex-1 py-3 px-4 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 disabled:from-gray-500 disabled:to-gray-600 text-white rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
              >
                {isProcessing ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <DollarSign className="w-5 h-5" />
                )}
                <span>{isProcessing ? 'Processing...' : 'Send Tip'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
