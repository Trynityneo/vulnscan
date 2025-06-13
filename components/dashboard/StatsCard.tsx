"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUp, ArrowDown, Loader2 } from 'lucide-react';

type Trend = 'up' | 'down' | 'neutral';
type Status = 'safe' | 'warning' | 'danger' | 'info' | 'loading';

interface StatsCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  trend?: Trend;
  trendValue?: string;
  status?: Status;
  isLoading?: boolean;
}

export default function StatsCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  trendValue,
  status = 'info',
  isLoading = false,
}: StatsCardProps) {
  const statusColors = {
    safe: 'text-green-500',
    warning: 'text-yellow-500',
    danger: 'text-red-500',
    info: 'text-cyber-blue',
    loading: 'text-cyber-muted',
  };

  const trendIcons = {
    up: <ArrowUp className="h-4 w-4" />,
    down: <ArrowDown className="h-4 w-4" />,
    neutral: null,
  };

  const trendColors = {
    up: 'text-green-500',
    down: 'text-red-500',
    neutral: 'text-cyber-muted',
  };

  return (
    <Card className="cyber-card h-full transition-all duration-200 hover:border-cyber-blue/40">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-cyber-muted">
          {title}
        </CardTitle>
        <div className={`h-5 w-5 ${statusColors[status]}`}>
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Icon className="h-5 w-5" />
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-cyber-text">
          {isLoading ? '--' : value}
        </div>
        <div className="flex items-center justify-between">
          <p className="text-xs text-cyber-muted">{description}</p>
          {!isLoading && trend && trend !== 'neutral' && trendValue && (
            <div className={`flex items-center text-xs ${trendColors[trend]}`}>
              {trendIcons[trend]}
              <span className="ml-1">{trendValue}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}