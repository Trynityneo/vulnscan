"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  status?: 'safe' | 'warning' | 'danger' | 'neutral';
}

export default function StatsCard({ 
  title, 
  value, 
  description, 
  icon: Icon, 
  trend, 
  trendValue,
  status = 'safe'
}: StatsCardProps) {
  console.log("StatsCard rendered:", title, value);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'safe': return 'text-cyber-green';
      case 'warning': return 'text-cyber-amber';
      case 'danger': return 'text-cyber-red';
      default: return 'text-cyber-blue';
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-cyber-green';
      case 'down': return 'text-cyber-red';
      default: return 'text-cyber-muted';
    }
  };

  return (
    <Card className="cyber-card hover:bg-cyber-blue/5 transition-colors duration-200">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-cyber-muted">{title}</CardTitle>
        <Icon className={`h-4 w-4 ${getStatusColor(status)}`} />
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          <div className={`text-2xl font-bold ${getStatusColor(status)}`}>
            {value}
          </div>
          {description && (
            <p className="text-xs text-cyber-muted">{description}</p>
          )}
          {trend && trendValue && (
            <div className={`text-xs ${getTrendColor(trend)} flex items-center space-x-1`}>
              <span>{trend === 'up' ? '↗' : trend === 'down' ? '↘' : '→'}</span>
              <span>{trendValue}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}