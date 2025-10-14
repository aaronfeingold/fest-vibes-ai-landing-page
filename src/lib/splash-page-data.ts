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
import { ContentData } from "./content-loader";

export interface Feature {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  iconImage: string;
  title: string;
  description: string;
  color: string;
}

export interface FeatureSkeleton {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  iconImage: string;
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
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  excludedFeatures?: string[];
  isPopular?: boolean;
  buttonText: string;
  buttonVariant?: "default" | "secondary";
}

export interface PricingSkeleton {
  id: string;
  buttonVariant: "default" | "secondary";
  isPopular: boolean;
}

export interface DemoCapability {
  icon: React.ComponentType<{ className?: string }>;
  text: string;
}

// Content IDs for mapping
export const CONTENT_IDS = {
  FEATURES: {
    LOCAL_MUSICIANS: "local-musicians",
    DISCOVER_MUSIC: "discover-music",
    PLAN_AHEAD: "plan-ahead",
    CONNECT: "connect",
    CHAT: "chat",
    ANALYTICS: "analytics",
  },
  PRICING: {
    FREE: "free",
    VIBES: "vibes",
  },
} as const;

export const SITE_METADATA = {
  title: "Fest-Vibes",
  description:
    "Transform any weekend into a personalized music festival. Discover local live music, curate plan with friends, and experience the vibes.",
  generator: "afdc.dev",
} as const;

// Skeleton with structure only - content comes from CMS
export const FEATURES_SKELETON: FeatureSkeleton[] = [
  {
    id: CONTENT_IDS.FEATURES.LOCAL_MUSICIANS,
    icon: Heart,
    iconImage: ICONS.saints,
    color: "from-festival-pink-500 to-red-500",
  },
  {
    id: CONTENT_IDS.FEATURES.DISCOVER_MUSIC,
    icon: Music,
    iconImage: ICONS.trumpet.standard,
    color: "from-stage-mint to-emerald-500",
  },
  {
    id: CONTENT_IDS.FEATURES.PLAN_AHEAD,
    icon: Calendar,
    iconImage: ICONS.plan,
    color: "from-indigo-500 to-brand-primary",
  },
  {
    id: CONTENT_IDS.FEATURES.CONNECT,
    icon: Users,
    iconImage: ICONS.krewe,
    color: "from-stage-sky to-stage-turquoise",
  },
  {
    id: CONTENT_IDS.FEATURES.CHAT,
    icon: MessageCircle,
    iconImage: ICONS.chat,
    color: "from-brand-primary to-brand-secondary",
  },
  {
    id: CONTENT_IDS.FEATURES.ANALYTICS,
    icon: MapPin,
    iconImage: ICONS.analytics,
    color: "from-stage-sky to-indigo-500",
  },
];

// Mock events - will come from API in future
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

// Skeleton with structure only - content comes from CMS
export const PRICING_SKELETON: PricingSkeleton[] = [
  {
    id: CONTENT_IDS.PRICING.FREE,
    buttonVariant: "secondary",
    isPopular: false,
  },
  {
    id: CONTENT_IDS.PRICING.VIBES,
    buttonVariant: "default",
    isPopular: true,
  },
];

// Demo capabilities - icons stay in code, text comes from CMS
export const DEMO_CAPABILITIES_ICONS = [
  MapPin,
  Star,
  Users,
  Calendar,
  TrendingUp,
  Clock,
] as const;


export interface ChatMessage {
  id: number;
  role: "user" | "assistant";
  content: string;
}

export const CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 1,
    role: "assistant",
    content:
      "There are plenty of great shows this weekend in New Orleans. I can make your a lineup to match your vibes. Are you into funk or psychedelic?",
  },
  {
    id: 2,
    role: "user",
    content:
      "nah fam. i want a chill night out, been binging some DtMF Bad Bunny tho, so find somethings with those vibes. nothing late cause i gotta wake up to watch the Saints.",
  },
  {
    id: 3,
    role: "assistant",
    content:
      "Yah, an early Saturday night with some hints of reggaeton. \n\naight hang on one sec...\n\n5:30p - Javier Olondo y Su Banda at Bachannal\n7:15p - Ride share to Frenchman street\n7:30P - Rastafunk at Cafe Negril\n...\n\nSound like a plan?",
  },
  {
    id: 4,
    role: "user",
    content: "lit ty",
  },
  {
    id: 5,
    role: "assistant",
    content: "siiic",
  },
];

// custom icons for some local artists
export const EVENT_ICONS = {
  "Trombone Shorty": ICONS.trumpet.noBackground2,
  "Tank & The Bangas": Mic2,
  "The Iceman Special": ICONS.guitar.noBackground,
  Boyfriend: ICONS.xoBoyfriend,
} as const;

// Stat cards - icons and colors stay in code, content comes from CMS
export const STAT_CARDS_SKELETON = [
  {
    icon: TrendingUp,
    iconColors: "bg-gradient-to-r from-stage-mint to-emerald-500",
  },
  {
    icon: MapPin,
    iconColors: "bg-gradient-to-r from-stage-sky to-stage-turquoise",
  },
  {
    icon: Users,
    iconColors: "bg-brand-gradient",
  },
] as const;

// Merge functions to combine skeleton with content
export function mergeFeaturesWithContent(
  contentData: ContentData | null
): Feature[] {
  return FEATURES_SKELETON.map((feature) => {
    const content = contentData?.features?.items?.[feature.id];
    return {
      ...feature,
      title: content?.title || "Feature Title",
      description: content?.description || "Feature description",
    };
  });
}

export function mergePricingWithContent(
  contentData: ContentData | null
): PricingPlan[] {
  return PRICING_SKELETON.map((plan) => {
    const content = contentData?.pricing?.plans?.[plan.id];
    return {
      ...plan,
      name: content?.name || "Plan Name",
      price: content?.price || "$0",
      description: content?.description || "Plan description",
      features: content?.features || [],
      excludedFeatures: content?.excludedFeatures,
      buttonText: content?.buttonText || "Get Started",
    };
  });
}

export function mergeDemoCapabilitiesWithContent(
  contentData: ContentData | null
): DemoCapability[] {
  return DEMO_CAPABILITIES_ICONS.map((icon, index) => {
    const content = contentData?.chatDemo?.capabilities?.[index];
    return {
      icon,
      text: content?.text || "Capability description",
    };
  });
}

export function mergeStatCardsWithContent(contentData: ContentData | null) {
  return STAT_CARDS_SKELETON.map((skeleton, index) => {
    const content = contentData?.analytics?.statCards?.[index];
    return {
      ...skeleton,
      title: content?.title || "Stat Title",
      value: content?.value || 0,
      change: content?.change || "No change",
      changeColor: content?.changeColor || "text-gray-400",
    };
  });
}
