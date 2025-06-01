"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

const data = [
  { name: 'Jan', scans: 65, vulnerabilities: 12 },
  { name: 'Feb', scans: 78, vulnerabilities: 8 },
  { name: 'Mar', scans: 90, vulnerabilities: 15 },
  { name: 'Apr', scans: 81, vulnerabilities: 6 },
  { name: 'May', scans: 95, vulnerabilities: 4 },
  { name: 'Jun', scans: 112, vulnerabilities: 9 },
];

export default function ScanChart() {
  console.log("ScanChart rendered with data:", data);

  return (
    <Card className="cyber-card">
      <CardHeader>
        <CardTitle className="text-cyber-text">Scan Overview</CardTitle>
        <p className="text-sm text-cyber-muted">Monthly scan activity and vulnerability detection</p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="scanGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00d4ff" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#00d4ff" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="vulnGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
            <XAxis 
              dataKey="name" 
              stroke="#64748b"
              fontSize={12}
            />
            <YAxis 
              stroke="#64748b"
              fontSize={12}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#1e293b',
                border: '1px solid #00d4ff',
                borderRadius: '8px',
                color: '#f8fafc'
              }}
            />
            <Area
              type="monotone"
              dataKey="scans"
              stroke="#00d4ff"
              strokeWidth={2}
              fill="url(#scanGradient)"
              name="Total Scans"
            />
            <Area
              type="monotone"
              dataKey="vulnerabilities"
              stroke="#ef4444"
              strokeWidth={2}
              fill="url(#vulnGradient)"
              name="Vulnerabilities Found"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}