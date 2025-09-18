import type React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart3, TrendingUp, MapPin, Users } from "lucide-react";
import { EventCard } from "@/components/ui/EventCard";
import { StatCard } from "@/components/ui/StatCard";
import { MOCK_EVENTS } from "@/lib/homepage-data";

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
          <div className="space-y-6">
            <StatCard
              title="Funk Events This Week"
              value={127}
              change="↗ 23% from last week"
              changeColor="text-green-400"
              icon={TrendingUp}
              iconColors="bg-gradient-to-r from-stage-mint to-emerald-500"
            />

            <StatCard
              title="Weekend Events"
              value={162}
              change="5 new added today"
              changeColor="text-blue-400"
              icon={MapPin}
              iconColors="bg-gradient-to-r from-stage-sky to-stage-turquoise"
            />

            <StatCard
              title="Lit Fam"
              value={16}
              change="Your Krewe Vibes"
              changeColor="text-brand-accent"
              icon={Users}
              iconColors="bg-brand-gradient"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
