"use client";

import EnhancedBetaSignup from "../forms/BetaSignup";

interface BetaSignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BetaSignupModal({ isOpen, onClose }: BetaSignupModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-slate-800/90 dark:bg-slate-800/95 backdrop-blur-md border border-slate-700/50 dark:border-slate-600/60 rounded-2xl p-8 max-w-md mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 dark:text-gray-300 hover:text-white dark:hover:text-white text-2xl font-bold transition-colors"
        >
          ×
        </button>

        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-white mb-2 flex items-center justify-center gap-3">
            <img
              src="/icons/trumpet-no-bg.png"
              alt="Trumpet"
              className="w-8 h-8 object-contain"
            />
            Join the Beta!
            <img
              src="/icons/trumpet-no-bg.png"
              alt="Trumpet"
              className="w-8 h-8 object-contain transform rotate-[270deg]"
            />
          </h3>
          <p className="text-gray-300 dark:text-gray-200">
            Be in that number when Fest Vibes launches in New Orleans.
          </p>
        </div>

        <EnhancedBetaSignup onClose={onClose} />
      </div>
    </div>
  );
}
