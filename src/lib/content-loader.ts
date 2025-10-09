import fs from "fs";
import path from "path";

export interface ContentData {
  hero: {
    subtitle: string;
    typewriterMessages: string[];
  };
  features: {
    sectionTitle: string;
    sectionSubtitle: string;
    introTitle: string;
    introTitleHighlight: string;
    introSubtitle: string;
    items: Record<
      string,
      {
        title: string;
        description: string;
      }
    >;
  };
  pricing: {
    sectionTitle: string;
    sectionSubtitle: string;
    plans: Record<
      string,
      {
        name: string;
        price: string;
        description: string;
        features: string[];
        excludedFeatures?: string[];
        buttonText: string;
      }
    >;
  };
  analytics: {
    sectionTitle: string;
    sectionSubtitle: string;
    mockEvents: Array<{
      name: string;
      venue: string;
      time: string;
      genre: string;
      attendees: number;
    }>;
    statCards: Array<{
      title: string;
      value: number;
      change: string;
      changeColor: string;
    }>;
  };
  chatDemo: {
    sectionTitle: string;
    sectionSubtitle: string;
    capabilities: Array<{
      text: string;
    }>;
  };
  cta: {
    title: string;
    subtitle: string;
  };
  brand: {
    motto: string;
  };
  socialMedia: {
    twitter: string;
    instagram: string;
  };
}

export async function loadContentData(): Promise<ContentData | null> {
  try {
    const dataPath = path.join(process.cwd(), "data", "content.json");
    const dataFile = fs.readFileSync(dataPath, "utf8");
    return JSON.parse(dataFile);
  } catch (error) {
    console.error("Failed to load content data:", error);
    return null;
  }
}
