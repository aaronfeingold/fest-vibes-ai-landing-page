import type React from "react";
import { Button } from "@/ui";
import { MessageCircle, ArrowRight } from "lucide-react";

interface CTASectionProps {
  onJoinBetaClick: () => void;
}

export function CTASection({ onJoinBetaClick }: CTASectionProps) {
  return (
    <section id="cta" className="relative z-10 px-6 lg:px-8 py-20">
      <div className="mx-auto max-w-4xl text-center">
        <div className="bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 rounded-3xl p-12 border border-brand-primary/20 backdrop-blur-sm">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Weekends?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of music lovers in New Orleans who've discovered
            their perfect festival experience. Start planning your next music
            adventure today.
          </p>
          <div className="flex justify-center">
            <Button
              size="lg"
              onClick={onJoinBetaClick}
              className="bg-brand-gradient hover:from-festival-purple-500 hover:to-festival-pink-500 text-base sm:text-lg px-4 sm:px-8 py-3 sm:py-4 flex items-center justify-center"
            >
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 flex-shrink-0" />
              <span className="text-center whitespace-normal">
                Join for Free!
              </span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-1 sm:ml-2 flex-shrink-0" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
