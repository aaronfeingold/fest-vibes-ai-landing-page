import type React from "react";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { PHProvider } from "@/components/posthog-provider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Fest-Vibes - Your Smart Music Festival Experience",
  description:
    "Transform any weekend into a personalized music festival. Discover local live music, plan with friends, and experience the ultimate decentralized festival in your pocket.",
  generator: "v0.dev",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={poppins.className}>
        <PHProvider>{children}</PHProvider>
      </body>
    </html>
  );
}
