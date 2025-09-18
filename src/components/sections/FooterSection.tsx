import type React from "react";
import Link from "next/link";
import { Twitter, Instagram } from "lucide-react";
import { ContentData } from "@/hooks/use-homepage-state";

interface FooterSectionProps {
  contentData: ContentData | null;
  footerLogo: string;
}

export function FooterSection({ contentData, footerLogo }: FooterSectionProps) {
  return (
    <footer
      id="footer"
      className="relative z-10 px-6 lg:px-8 py-12 border-t border-slate-700/50 dark:border-gray-700/50"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-center">
              <img
                src={footerLogo}
                alt="Fest Vibes Logo"
                className="h-16 sm:h-18 md:h-20 w-auto object-contain"
              />
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href={contentData?.socialMedia?.twitter || "https://twitter.com/festvibes"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </Link>
              <Link
                href={contentData?.socialMedia?.instagram || "https://www.instagram.com/fest_vibes_nola/"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <div className="md:text-right">
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-white transition-colors"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-white transition-colors"
                >
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700/50 dark:border-gray-700/50 mt-12 pt-8 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Fest Vibes. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
