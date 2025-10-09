import type React from "react";
import { Card, CardContent } from "@/ui";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeColor?: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColors: string;
}

export function StatCard({
  title,
  value,
  change,
  changeColor = "text-green-400",
  icon: Icon,
  iconColors,
}: StatCardProps) {
  return (
    <Card className="bg-slate-800/50 dark:bg-gray-800/50 border-slate-700/50 dark:border-gray-700/50 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">{title}</p>
            <p className="text-3xl font-bold text-white">{value}</p>
          </div>
          <div
            className={`w-12 h-12 ${iconColors} rounded-lg flex items-center justify-center`}
          >
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
        {change && <p className={`${changeColor} text-sm mt-2`}>{change}</p>}
      </CardContent>
    </Card>
  );
}
