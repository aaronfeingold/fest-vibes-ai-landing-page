import type React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui";
import { BarChart3 } from "lucide-react";
import { EventCard, StatCard } from "@/splash-components";
import { MOCK_EVENTS, STAT_CARDS_DATA } from "@/lib/homepage-data";

export function AnalyticsSection() {
  return (
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
                  {MOCK_EVENTS.map((event, index) => (
                    <EventCard key={index} event={event} index={index} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stats Cards */}
          <div className="space-y-6">{generateStatCards(STAT_CARDS_DATA)}</div>
        </div>
      </div>
    </section>
  );
}

function generateStatCards(data: typeof STAT_CARDS_DATA) {
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
