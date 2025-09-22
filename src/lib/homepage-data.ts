import {
  Heart,
  Music,
  Calendar,
  Users,
  MessageCircle,
  MapPin,
  Star,
  TrendingUp,
  Clock,
  Mic2,
} from "lucide-react";

export interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  iconImage: string;
  title: string;
  description: string;
  color: string;
}

export interface MockEvent {
  name: string;
  venue: string;
  time: string;
  genre: string;
  attendees: number;
}

// todo - three prices? to the moon
export interface PricingPlan {
  name: string;
  price: string;
  description: string;
  features: string[];
  excludedFeatures?: string[];
  isPopular?: boolean;
  buttonText: string;
  buttonVariant?: "default" | "secondary";
}

export interface DemoCapability {
  icon: React.ComponentType<{ className?: string }>;
  text: string;
}

// this should also come from marketing team
export const FEATURES: Feature[] = [
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
    description: "Vibe with your AI assistant to craft personalized weekend music experiences",
    color: "from-brand-primary to-brand-secondary",
  },
  {
    icon: MapPin,
    iconImage: "/icons/analytics.png",
    title: "Nightlife Analytics",
    description: "Understand the landscape of your own nightlife with insights and trends",
    color: "from-stage-sky to-indigo-500",
  },
];

// this will come from API
export const MOCK_EVENTS: MockEvent[] = [
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

// this will come from Marketing Team (markdown maybe)
export const PRICING_PLANS: PricingPlan[] = [
  {
    name: "Free Plan",
    price: "$0",
    description: "Perfect for getting started with music discovery",
    features: [
      "Dynamic data filtering",
      "Visual heat map discovery",
      "Drag-and-drop planning",
      "Shareable festival plans",
      "Export to social media",
    ],
    excludedFeatures: ["No Chat assistance"],
    buttonText: "Get Started Free",
    buttonVariant: "secondary",
  },
  {
    name: "Vibes Plan",
    price: "$9.99",
    description: "Everything in Free, plus unlimited AI assistance",
    features: [
      "Chat assistance",
      "Personalized recommendations",
      "Smart schedule optimization",
      "Venue and artist insights",
      "Priority customer support",
      "Everything in Free Plan",
    ],
    isPopular: true,
    buttonText: "Start Free Trial",
    buttonVariant: "default",
  },
];

// more marketing content
export const DEMO_CAPABILITIES: DemoCapability[] = [
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
  {
    icon: Clock,
    text: "Optimize timing for multiple events",
  },
  {
    icon: Star,
    text: "Track your favorite artists and venues",
  },
];

// custom icons for some local artists
export const EVENT_ICONS = {
  "Trombone Shorty": "/icons/trumpet-no-bg-2.png",
  "Tank & The Bangas": Mic2,
  "The Iceman Special": "/icons/guitar-no-bg.png",
  Boyfriend: "/icons/xo-boyfriend.png",
} as const;
