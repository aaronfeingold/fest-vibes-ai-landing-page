"use client";

import { BetaSignup } from "@/forms";
import Image from "next/image";
import { Button } from "@/ui";
import { X } from "lucide-react";
import { getTrumpetIconPath } from "@/lib/icons";

interface BetaSignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BetaSignupModal({ isOpen, onClose }: BetaSignupModalProps) {
  if (!isOpen) return null;

  return (
    <div
      id="beta-signup-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
    >
      <div
        id="beta-signup-modal"
        className="bg-slate-800/90 dark:bg-slate-800/95 backdrop-blur-md border border-slate-700/50 dark:border-slate-600/60 rounded-2xl p-8 max-w-md mx-4 relative"
      >
        <Button
          id="beta-signup-modal-close-button"
          onClick={onClose}
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 text-gray-400 dark:text-gray-300 hover:text-white dark:hover:text-white"
        >
          <X className="h-5 w-5" />
        </Button>

        <div id="beta-signup-modal-header" className="text-center mb-6">
          <h3
            id="beta-signup-modal-title"
            className="text-2xl font-bold text-white mb-2 flex items-center justify-center gap-3"
          >
            <Image
              id="beta-signup-modal-trumpet-left"
              src={getTrumpetIconPath("noBackground")}
              alt="Trumpet"
              width={32}
              height={32}
              className="w-8 h-8 object-contain"
            />
            Join the Beta!
            <Image
              id="beta-signup-modal-trumpet-right"
              src={getTrumpetIconPath("noBackground")}
              alt="Trumpet"
              width={32}
              height={32}
              className="w-8 h-8 object-contain transform scale-x-[-1]"
            />
          </h3>
          <p
            id="beta-signup-modal-description"
            className="text-gray-300 dark:text-gray-200"
          >
            Be in that number when Fest Vibes launches in New Orleans.
          </p>
        </div>

        <div id="beta-signup-modal-form-container">
          <BetaSignup onClose={onClose} />
        </div>
      </div>
    </div>
  );
}
