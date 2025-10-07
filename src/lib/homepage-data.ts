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
import { ICONS } from "./icons";

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

export const SITE_METADATA = {
  title: "Fest-Vibes",
  description:
    "Transform any weekend into a personalized music festival. Discover local live music, curate plan with friends, and experience the vibes.",
  generator: "afdc.dev",
} as const;

// this should come from marketing team
export const FEATURES: Feature[] = [
  {
    icon: Heart,
    iconImage: ICONS.saints,
    title: "Local Musicians Search",
    description: "Stay up to date with your favorite local musicians.",
    color: "from-festival-pink-500 to-red-500",
  },
  {
    icon: Music,
    iconImage: ICONS.trumpet.standard,
    title: "Discover Live Music",
    description: "Find what you love or step outside the box",
    color: "from-stage-mint to-emerald-500",
  },
  {
    icon: Calendar,
    iconImage: ICONS.plan,
    title: "Plan Ahead",
    description: "Curate multi-day timelines and jam pack your weekends",
    color: "from-indigo-500 to-brand-primary",
  },
  {
    icon: Users,
    iconImage: ICONS.krewe,
    title: "Connect",
    description: "Share your plans with your friends",
    color: "from-stage-sky to-stage-turquoise",
  },
  {
    icon: MessageCircle,
    iconImage: ICONS.chat,
    title: "Chat",
    description:
      "Create personalized weekend music experiences with assistance",
    color: "from-brand-primary to-brand-secondary",
  },
  {
    icon: MapPin,
    iconImage: ICONS.analytics,
    title: "Nightlife Analytics",
    description:
      "Stay in the the know on your hometown's music scene with insights and trends",
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
    attendees: 200,
  },
  {
    name: "Tank & The Bangas",
    venue: "Blue Nile",
    time: "6:00 PM",
    genre: "Jazz",
    attendees: 150,
  },
  {
    name: "The Iceman Special",
    venue: "Maple Leaf",
    time: "10:00 PM",
    genre: "Psychedelic",
    attendees: 100,
  },
  {
    name: "Boyfriend",
    venue: "Saturn Bar",
    time: "7:30 PM",
    genre: "Hip-Hop",
    attendees: 50,
  },
];

// this will come from Marketing Team (markdown maybe?)
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
    icon: Star,
    text: "Track your favorite artists and venues",
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
];

// custom icons for some local artists
export const EVENT_ICONS = {
  "Trombone Shorty": ICONS.trumpet.noBackground2,
  "Tank & The Bangas": Mic2,
  "The Iceman Special": ICONS.guitar.noBackground,
  Boyfriend: ICONS.xoBoyfriend,
} as const;

// Marketing stuff for stat cards -- nobody reads this
export const STAT_CARDS_DATA = [
  {
    title: "Funk Events This Week",
    value: 127,
    change: "↗ 100% more funkier than last week",
    changeColor: "text-green-400",
    icon: TrendingUp,
    iconColors: "bg-gradient-to-r from-stage-mint to-emerald-500",
  },
  {
    title: "Weekend Events",
    value: 162,
    change: "5 new added today",
    changeColor: "text-blue-400",
    icon: MapPin,
    iconColors: "bg-gradient-to-r from-stage-sky to-stage-turquoise",
  },
  {
    title: "Lit Fam",
    value: 16,
    change: "Your Krewe's Vibes Are Growing!",
    changeColor: "text-brand-accent",
    icon: Users,
    iconColors: "bg-brand-gradient",
  },
] as const;
