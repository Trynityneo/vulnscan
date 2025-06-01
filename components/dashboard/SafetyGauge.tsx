"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface SafetyGaugeProps {
  score: number;
  title: string;
}

export default function SafetyGauge({ score, title }: SafetyGaugeProps) {
  console.log("SafetyGauge rendered:", title, "score:", score);

  const data = [
    { name: 'Score', value: score },
    { name: 'Remaining', value: 100 - score },
  ];

  const getColor = (score: number) => {
    if (score >= 80) return '#10b981'; // cyber-green
    if (score >= 60) return '#f59e0b'; // cyber-amber
    return '#ef4444'; // cyber-red
  };

  const getStatus = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Needs Attention';
  };

  const color = getColor(score);
  const status = getStatus(score);

  return (
    <Card className="cyber-card">
      <CardHeader>
        <CardTitle className="text-cyber-text">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                startAngle={90}
                endAngle={-270}
                innerRadius={60}
                outerRadius={80}
                dataKey="value"
                stroke="none"
              >
                <Cell fill={color} />
                <Cell fill="#374151" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          
          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className={`text-3xl font-bold`} style={{ color }}>
              {score}%
            </div>
            <div className="text-sm text-cyber-muted">{status}</div>
          </div>
        </div>
        
        <div className="mt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-cyber-muted">Current Score</span>
            <span className="font-medium" style={{ color }}>{score}%</span>
          </div>
          <div className="w-full bg-cyber-surface rounded-full h-2">
            <div
              className="h-2 rounded-full transition-all duration-500"
              style={{
                width: `${score}%`,
                backgroundColor: color,
                boxShadow: `0 0 10px ${color}50`
              }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}