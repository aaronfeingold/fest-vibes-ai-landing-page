import type React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail } from "lucide-react";

interface EmailSignupModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  email: string;
  setEmail: (email: string) => void;
  isSubmitting: boolean;
  isSubmitted: boolean;
  submitError: string;
  onSubmit: (e: React.FormEvent) => void;
  assistantName: string;
  mascotNoBackground: string;
}

export function EmailSignupModal({
  open,
  onOpenChange,
  email,
  setEmail,
  isSubmitting,
  isSubmitted,
  submitError,
  onSubmit,
  assistantName,
  mascotNoBackground,
}: EmailSignupModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-slate-800 dark:bg-gray-800 border-slate-700 dark:border-gray-700 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-2">
            Join the Beta Waitlist
          </DialogTitle>
          <DialogDescription className="text-gray-300 text-center">
            Enter your email to get notified when Fest-Vibes launches!
          </DialogDescription>
        </DialogHeader>
        {isSubmitting ? (
          <div className="text-center py-8">
            <div className="relative mx-auto mb-4">
              <img
                src={mascotNoBackground}
                alt={`${assistantName.charAt(0).toUpperCase() + assistantName.slice(1)} the Cat`}
                className="w-24 h-24 object-cover animate-spin mx-auto"
                style={{ animationDuration: "2s" }}
              />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Adding you to the list...
            </h3>
            <p className="text-gray-300">
              Just a moment while we get you signed up!
            </p>
          </div>
        ) : !isSubmitted ? (
          <form onSubmit={onSubmit} className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isSubmitting}
                className="bg-slate-700 dark:bg-gray-700 border-slate-600 dark:border-gray-600 text-white placeholder-gray-400 focus:border-purple-500 disabled:opacity-50"
              />
            </div>
            {submitError && (
              <div className="text-red-400 text-sm text-center bg-red-500/10 p-2 rounded">
                {submitError}
              </div>
            )}
            <div className="flex flex-col gap-3">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-brand-gradient hover:from-festival-purple-500 hover:to-festival-pink-500 disabled:opacity-50"
              >
                <Mail className="w-4 h-4 mr-2" />
                Get Early Access
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
                className="border-slate-600 text-gray-300 hover:bg-slate-700 disabled:opacity-50"
              >
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-brand-gradient rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              You're on the list!
            </h3>
            <p className="text-gray-300">
              We'll notify you as soon as Fest-Vibes is ready to rock your
              weekends!
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Check your email for confirmation.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}