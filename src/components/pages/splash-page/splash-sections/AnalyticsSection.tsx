import type React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui";
import { BarChart3 } from "lucide-react";
import { EventCard, StatCard } from "@/splash-components";
import { MOCK_EVENTS, mergeStatCardsWithContent } from "@/lib/homepage-data";
import { ContentData } from "@/lib/content-loader";

interface AnalyticsSectionProps {
  contentData: ContentData | null;
}

export function AnalyticsSection({ contentData }: AnalyticsSectionProps) {
  // Get mock events from contentData or fallback to static data
  const mockEvents = contentData?.analytics?.mockEvents || MOCK_EVENTS;

  // Get merged stat cards with content from CMS
  const statCards = mergeStatCardsWithContent(contentData);

  return (
    <section id="analytics" className="relative z-10 px-6 lg:px-8 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            {contentData?.analytics?.sectionTitle ||
              "Smart Analytics for Smarter Planning"}
          </h2>
          <p className="text-xl text-gray-300">
            {contentData?.analytics?.sectionSubtitle ||
              "Get insights into music trends, event popularity, and discover what's hot in your area"}
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
                    <EventCard key={index} event={event} index={index} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stats Cards */}
          <div className="space-y-6">{generateStatCards(statCards)}</div>
        </div>
      </div>
    </section>
  );
}

function generateStatCards(data: ReturnType<typeof mergeStatCardsWithContent>) {
  return data.map((stat, index) => (
    <StatCard
      key={`${stat.title}-${index}`}
      title={stat.title}
      value={stat.value}
      change={stat.change}
      changeColor={stat.changeColor}
      icon={stat.icon}
      iconColors={stat.iconColors}
    />
  ));
}
