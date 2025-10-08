import type React from "react";
import { Button } from "@/ui";
import { MessageCircle, ArrowRight } from "lucide-react";
import { ContentData } from "@/lib/content-loader";

interface CTASectionProps {
  onJoinBetaClick: () => void;
  contentData: ContentData | null;
}

export function CTASection({ onJoinBetaClick, contentData }: CTASectionProps) {
  return (
    <section
      id="cta"
      data-testid="cta-section"
      className="relative z-10 px-6 lg:px-8 py-20"
    >
      <div className="mx-auto max-w-4xl text-center">
        <div
          data-testid="cta-card"
          className="bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 rounded-3xl p-12 border border-brand-primary/20 backdrop-blur-sm"
        >
          <h2
            data-testid="cta-title"
            className="text-4xl font-bold text-white mb-6"
          >
            {contentData?.cta?.title || "Ready to Transform Your Weekends?"}
          </h2>
          <p
            data-testid="cta-description"
            className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
          >
            {contentData?.cta?.subtitle ||
              "Join thousands of music lovers in New Orleans who've discovered their perfect festival experience. Start planning your next music adventure today."}
          </p>
          <div className="flex justify-center">
            <Button
              data-testid="cta-join-button"
              size="lg"
              onClick={onJoinBetaClick}
              className="bg-brand-gradient hover:from-festival-purple-500 hover:to-festival-pink-500 text-base sm:text-lg px-4 sm:px-8 py-3 sm:py-4 flex items-center justify-center"
            >
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
