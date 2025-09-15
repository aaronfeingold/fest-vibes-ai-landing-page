"use client";

import type React from "react";
import Link from "next/link";
import { usePostHog } from 'posthog-js/react';

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import BetaSignupModal from "@/components/BetaSignupModal";
import { ABTestNavigation } from "@/components/ab-test-navigation";
import { useLogoVariant, useAssistantName } from "@/hooks/use-feature-flags";
import {
  Music,
  Users,
  Calendar,
  BarChart3,
  MessageCircle,
  MapPin,
  Star,
  Play,
  Heart,
  TrendingUp,
  Clock,
  Mic2,
  Radio,
  Volume2,
  Sparkles,
  ArrowRight,
  Mail,
  Twitter,
} from "lucide-react";

interface ContentData {
  hero: {
    subtitle: string;
  };
  features: {
    title: string;
    subtitle: string;
  };
  social: {
    title: string;
    subtitle: string;
  };
  cta: {
    title: string;
    subtitle: string;
  };
  featuresIntro: {
    title: string;
    titleHighlight: string;
    subtitle: string;
  };
  brand: {
    motto: string;
  };
}

export default function HomePage() {
  const posthog = usePostHog();
  const logoVariant = useLogoVariant();
  const assistantName = useAssistantName();
  const [isVisible, setIsVisible] = useState(false);
  const [showBetaModal, setShowBetaModal] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [showBoomyVibes, setShowBoomyVibes] = useState(false);
  const [contentData, setContentData] = useState<ContentData | null>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const loadContentData = async () => {
      try {
        const response = await fetch("/data.json");
        if (response.ok) {
          const data = await response.json();
          setContentData(data);
        }
      } catch (error) {
        console.error("Failed to load content data:", error);
        // Content data will remain null and defaults will be used
      }
    };

    loadContentData();
  }, []);

  const handleJoinBetaClick = () => {
    posthog?.capture("beta_signup_clicked", {
      source: "main_cta",
    });
    setShowBetaModal(true);
  };

  const handleBoomyClick = () => {
    posthog?.capture("boomy_mascot_clicked");
    setShowBoomyVibes(true);
    setTimeout(() => {
      setShowBoomyVibes(false);
    }, 4500);
  };

  const handleJoinBeta = () => {
    posthog?.capture("beta_signup_modal_proceed");
    setShowBetaModal(false);
    setShowEmailForm(true);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/beta-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        posthog?.capture("beta_signup_completed", {
          email: email,
        });
        posthog?.identify(email, {
          email: email,
          signup_date: new Date().toISOString(),
          source: "landing_page",
        });
        setIsSubmitted(true);
        setTimeout(() => {
          setShowEmailForm(false);
          setIsSubmitted(false);
          setEmail("");
        }, 3000);
      } else {
        posthog?.capture("beta_signup_failed", {
          email: email,
          error: data.error || "Unknown error",
        });
        setSubmitError(data.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      posthog?.capture("beta_signup_error", {
        email: email,
        error: error instanceof Error ? error.message : "Network error",
      });
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const features = [
    {
      icon: Heart,
      iconImage: "/icons/saints.png",
      title: "Local Musician Search",
      description: "Be the first to know where they be at",
      color: "from-festival-pink-500 to-red-500",
    },
    {
      icon: Music,
      iconImage: "/icons/trumpet.png",
      title: "Discover Live Music",
      description: "Find what you love or step outside the box",
      color: "from-stage-mint to-emerald-500",
    },
    {
      icon: Calendar,
      iconImage: "/icons/plan.png",
      title: "Plan Ahead",
      description: "Curate multi-day timelines and jam pack your weekends",
      color: "from-indigo-500 to-brand-primary",
    },
    {
      icon: Users,
      iconImage: "/icons/krewe.png",
      title: "Build-a-Krewe",
      description: "Connect your fam and share your plans",
      color: "from-stage-sky to-stage-turquoise",
    },
    {
      icon: MessageCircle,
      iconImage: "/icons/chat.png",
      title: "Chat Assistance",
      description: `Vibe with ${assistantName.charAt(0).toUpperCase() + assistantName.slice(1)} to craft personalized weekend music experiences`,
      color: "from-brand-primary to-brand-secondary",
    },
    {
        icon: MapPin,
        iconImage: "/icons/analytics.png",
        title: "Nightlife Analytics",
        description:
          "Understand the landscape of your own nightlife with insights and trends",
        color: "from-stage-sky to-indigo-500",
      },
  ];

  const mockEvents = [
    {
      name: "Trombone Shorty",
      venue: "Tipitina's",
      time: "9:00 PM",
      genre: "Funk",
      attendees: 234,
    },
    {
      name: "Tank & The Bangas",
      venue: "Blue Nile",
      time: "6:00 PM",
      genre: "Jazz",
      attendees: 156,
    },
    {
      name: "The Iceman Special",
      venue: "Maple Leaf",
      time: "10:00 PM",
      genre: "Psychedelic",
      attendees: 133,
    },
    {
      name: "Boyfriend",
      venue: "Saturn Bar",
      time: "7:30 PM",
      genre: "Hip-Hop",
      attendees: 89,
    },
  ];

  return (
    <div className="min-h-screen bg-brand-gradient-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-brand-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-brand-secondary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Beta Modal */}
      <BetaSignupModal
        isOpen={showBetaModal}
        onClose={() => setShowBetaModal(false)}
      />

      {/* Email Form Modal */}
      <Dialog open={showEmailForm} onOpenChange={setShowEmailForm}>
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
                  src="/mascots/mascot-alt.png"
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
            <form onSubmit={handleEmailSubmit} className="space-y-4 pt-4">
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
                  onClick={() => setShowEmailForm(false)}
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

      {/* Boomy Vibes Animation Overlay */}
      {showBoomyVibes && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div
            className={`relative transition-all duration-1000 ${
              showBoomyVibes
                ? "animate-bounce-in opacity-100 scale-100"
                : "opacity-0 scale-50"
            }`}
          >
            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
              <img
                src="/mascots/mascot.png"
                alt={`${assistantName.charAt(0).toUpperCase() + assistantName.slice(1)} the Cat in vibrant New Orleans street art style`}
                className="w-96 h-96 object-cover animate-spin"
                style={{ animationDuration: "3s" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent pointer-events-none" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-brand-gradient rounded-full animate-ping" />
            <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-r from-stage-sky to-stage-turquoise rounded-full animate-ping delay-500" />
          </div>
        </div>
      )}

      {/* Navigation */}
      <ABTestNavigation
        onBoomyClick={handleBoomyClick}
        onJoinBetaClick={handleJoinBetaClick}
      />

      {/* Hero Section */}
      <section className="relative z-10 px-6 lg:px-8 pt-20 pb-32">
        <div className="mx-auto max-w-4xl text-center">
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Your
              <span className="text-brand-accent">
                {" "}
                Hometown
              </span>
              <br />
              Is Your Own
              <span className="text-festival-pink-400">
                {" "}
                Music Fest
              </span>
            </h1>
            <p
              id="hero-subtitle"
              className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
            >
              {contentData?.hero?.subtitle ||
                "Transform any day into a personalized music festival. Discover live local music, plan with friends, and experience the ultimate decentralized festival vibes in your pocket."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                onClick={handleJoinBetaClick}
                className="bg-brand-gradient hover:from-festival-purple-500 hover:to-festival-pink-500 text-base sm:text-lg px-4 sm:px-8 py-3 sm:py-4 flex items-center justify-center"
              >
                <span className="text-center whitespace-normal">
                  Join the Waitlist!
                </span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-1 sm:ml-2 flex-shrink-0" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 px-6 lg:px-8 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              {contentData?.featuresIntro?.title ||
                "Everything You Need for the Perfect"}
              <span className="text-festival-purple-400 dark:text-festival-purple-400">
                {" "}
                {contentData?.featuresIntro?.titleHighlight || "Music Weekend"}
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              {contentData?.featuresIntro?.subtitle ||
                "From smart planning to social collaboration, we're covering every aspect of your music experience."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-slate-800/50 dark:bg-gray-800/50 border-slate-700/50 dark:border-gray-700/50 backdrop-blur-sm hover:bg-slate-800/70 dark:hover:bg-gray-800/70 transition-all duration-300 group"
              >
                <CardHeader>
                  <div
                    className={`w-12 h-12 rounded-lg mb-4 group-hover:scale-110 transition-transform duration-300 ${
                      feature.iconImage
                        ? ""
                        : `bg-gradient-to-r ${feature.color} flex items-center justify-center`
                    }`}
                  >
                    {feature.iconImage ? (
                      <img
                        src={feature.iconImage}
                        alt={`${feature.title} icon`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <feature.icon className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <CardTitle className="text-white text-xl">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-300 text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative z-10 px-6 lg:px-8 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Choose Your Vibe
            </h2>
            <p className="text-xl text-gray-300">
              Start free, upgrade when you're ready to chat with{" "}
              {assistantName.charAt(0).toUpperCase() + assistantName.slice(1)}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <Card className="bg-slate-800/50 dark:bg-gray-800/50 border-slate-700/50 dark:border-gray-700/50 backdrop-blur-sm hover:bg-slate-800/70 dark:hover:bg-gray-800/70 transition-all duration-300 relative">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold text-white mb-2">
                  Free Plan
                </CardTitle>
                <div className="text-4xl font-bold text-white mb-2">
                  $0
                  <span className="text-lg font-normal text-gray-400">
                    /month
                  </span>
                </div>
                <CardDescription className="text-gray-300">
                  Perfect for getting started with music discovery
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {[
                    "Visual heat map discovery",
                    "Dynamic data filtering",
                    "Manual timeline builder",
                    "Drag-and-drop planning",
                    "Shareable festival plans",
                    "Export to social media",
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-5 h-5 bg-gradient-to-r from-stage-mint to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-3 h-3 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                  <div className="flex items-center space-x-3 opacity-50">
                    <div className="w-5 h-5 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-3 h-3 text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-500">No AI chat assistance</span>
                  </div>
                </div>
                <Button
                  onClick={handleJoinBetaClick}
                  className="w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 mt-6"
                >
                  Get Started Free
                </Button>
              </CardContent>
            </Card>

            {/* Vibes Plan */}
            <Card className="bg-slate-800/50 dark:bg-gray-800/50 border-purple-500/50 backdrop-blur-sm hover:bg-slate-800/70 dark:hover:bg-gray-800/70 transition-all duration-300 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-brand-gradient text-white px-4 py-1">
                  Most Popular
                </Badge>
              </div>
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold text-white mb-2">
                  Vibes Plan
                </CardTitle>
                <div className="text-4xl font-bold text-white mb-2">
                  $9.99
                  <span className="text-lg font-normal text-gray-400">
                    /month
                  </span>
                </div>
                <CardDescription className="text-gray-300">
                  Everything in Free, plus unlimited AI assistance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {[
                    "Everything in Free Plan",
                    "Unlimited AI chat with " +
                      assistantName.charAt(0).toUpperCase() +
                      assistantName.slice(1),
                    "Personalized recommendations",
                    "Smart schedule optimization",
                    "Venue and artist insights",
                    "Priority customer support",
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-5 h-5 bg-brand-gradient rounded-full flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-3 h-3 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
                <Button
                  onClick={handleJoinBetaClick}
                  className="w-full bg-brand-gradient hover:from-festival-purple-500 hover:to-festival-pink-500 mt-6"
                >
                  Start Free Trial
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-400 text-sm">
              All plans include access to New Orleans music events. Cancel
              anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Boomy Chat Demo */}
      <section id="demo" className="relative z-10 px-6 lg:px-8 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Test {" "}
              {assistantName.charAt(0).toUpperCase() + assistantName.slice(1)},
              Your Planning Assistant
            </h2>
            <p className="text-xl text-gray-300">
              Let{" "}
              {assistantName.charAt(0).toUpperCase() + assistantName.slice(1)}{" "}
              suggest and organize your perfect music weekend
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center">
              <img
                src="/demo/chat-demo.png"
                alt={`${assistantName.charAt(0).toUpperCase() + assistantName.slice(1)} the Cat chat interface showing conversation about finding electronic music shows`}
                className="w-full max-w-lg rounded-lg shadow-2xl hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-4">
                {assistantName.charAt(0).toUpperCase() + assistantName.slice(1)}{" "}
                Can Help You:
              </h3>
              <div className="space-y-4">
                {[
                  {
                    icon: MapPin,
                    text: "Discover local venues and hidden gems",
                  },
                  {
                    icon: Users,
                    text: "Coordinate plans with your friend group",
                  },
                  {
                    icon: Calendar,
                    text: "Create multi-day festival itineraries",
                  },
                  {
                    icon: TrendingUp,
                    text: "Get personalized music recommendations",
                  },
                  { icon: Clock, text: "Optimize timing for multiple events" },
                  {
                    icon: Star,
                    text: "Track your favorite artists and venues",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 text-gray-300"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-brand-primary/20 to-brand-secondary/20 rounded-lg flex items-center justify-center">
                      <item.icon className="w-4 h-4 text-brand-accent" />
                    </div>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Analytics Dashboard Preview */}
      <section id="analytics" className="relative z-10 px-6 lg:px-8 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Smart Analytics for Smarter Planning
            </h2>
            <p className="text-xl text-gray-300">
              Get insights into music trends, event popularity, and discover
              what's hot in your area
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Event Table */}
            <div className="lg:col-span-2">
              <Card className="bg-slate-800/50 dark:bg-gray-800/50 border-slate-700/50 dark:border-gray-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2 text-brand-accent" />
                    Trending Events This Saturday
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockEvents.map((event, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-brand-gradient rounded-lg flex items-center justify-center">
                            {event.name === "Trombone Shorty" ? (
                              <img
                                src="/icons/trumpet-no-bg-2.png"
                                alt="Trumpet icon"
                                className="w-6 h-6 object-contain"
                              />
                            ) : event.name === "Tank & The Bangas" ? (
                              <Mic2 className="w-5 h-5 text-white" />
                            ) : event.name === "The Iceman Special" ? (
                              <img
                                src="/icons/guitar-no-bg.png"
                                alt="Guitar icon"
                                className="w-6 h-6 object-contain"
                              />
                            ) : event.name === "Boyfriend" ? (
                              <img
                                src="/icons/xo-boyfriend.png"
                                alt="XO Boyfriend icon"
                                className="w-6 h-6 object-contain"
                              />
                            ) : (
                              <Mic2 className="w-5 h-5 text-white" />
                            )}
                          </div>
                          <div>
                            <h4 className="text-white font-medium">
                              {event.name}
                            </h4>
                            <p className="text-gray-400 text-sm">
                              {event.venue} • {event.time}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge
                            variant="secondary"
                            className="bg-brand-primary/20 text-brand-accent"
                          >
                            {event.genre}
                          </Badge>
                          <p className="text-gray-400 text-sm mt-1">
                            {event.attendees} going
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Stats Cards */}
            <div className="space-y-6">
              <Card className="bg-slate-800/50 dark:bg-gray-800/50 border-slate-700/50 dark:border-gray-700/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">
                        Funk Events This Week
                      </p>
                      <p className="text-3xl font-bold text-white">127</p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-r from-stage-mint to-emerald-500 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <p className="text-green-400 text-sm mt-2">
                    ↗ 23% from last week
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 dark:bg-gray-800/50 border-slate-700/50 dark:border-gray-700/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Weekend Events</p>
                      <p className="text-3xl font-bold text-white">162</p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-r from-stage-sky to-stage-turquoise rounded-lg flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <p className="text-blue-400 text-sm mt-2">
                    5 new added today
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 dark:bg-gray-800/50 border-slate-700/50 dark:border-gray-700/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Lit Fam</p>
                      <p className="text-3xl font-bold text-white">16</p>
                    </div>
                    <div className="w-12 h-12 bg-brand-gradient rounded-lg flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <p className="text-brand-accent text-sm mt-2">
                    Your Krewe Vibes
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="relative z-10 px-6 lg:px-8 py-20">
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
                onClick={handleJoinBetaClick}
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

      {/* Footer */}
      <footer className="relative z-10 px-6 lg:px-8 py-12 border-t border-slate-700/50 dark:border-gray-700/50">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center">
                <img
                  src="/logos/footer/footer-logo.png"
                  alt="Fest Vibes Logo"
                  className="h-12 sm:h-12 md:h-10 w-auto object-contain"
                />
              </div>
              <p className="text-gray-400">
                {contentData?.brand?.motto || "Discover. Curate. Experience."}
              </p>
              <div className="flex items-center space-x-2">
                <Link
                  href="https://twitter.com/festvibes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Twitter className="w-5 h-5" />
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
    </div>
  );
}
