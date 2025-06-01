"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

const activeScans = [
  {
    id: 1,
    target: '192.168.1.0/24',
    type: 'Port Scan',
    status: 'running',
    progress: 65,
    startTime: '2 min ago'
  },
  {
    id: 2,
    target: 'web-server-01',
    type: 'Vulnerability Scan',
    status: 'completed',
    progress: 100,
    startTime: '5 min ago',
    vulnerabilities: 3
  },
  {
    id: 3,
    target: '10.0.0.50',
    type: 'Port Scan',
    status: 'queued',
    progress: 0,
    startTime: 'Pending'
  }
];

export default function ActiveScans() {
  console.log("ActiveScans rendered with scans:", activeScans);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running':
        return <Activity className="h-4 w-4 text-cyber-blue animate-pulse" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-cyber-green" />;
      case 'queued':
        return <Clock className="h-4 w-4 text-cyber-amber" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-cyber-red" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      running: 'bg-cyber-blue/20 text-cyber-blue border-cyber-blue/30',
      completed: 'bg-cyber-green/20 text-cyber-green border-cyber-green/30',
      queued: 'bg-cyber-amber/20 text-cyber-amber border-cyber-amber/30',
    };

    return (
      <Badge 
        variant="outline" 
        className={`${variants[status] || 'bg-cyber-red/20 text-cyber-red border-cyber-red/30'} capitalize`}
      >
        {status}
      </Badge>
    );
  };

  return (
    <Card className="cyber-card">
      <CardHeader>
        <CardTitle className="text-cyber-text">Active Scans</CardTitle>
        <p className="text-sm text-cyber-muted">Monitor running and recent scan activities</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activeScans.map((scan) => (
            <div key={scan.id} className="border border-cyber-blue/20 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(scan.status)}
                  <span className="font-medium text-cyber-text">{scan.target}</span>
                </div>
                {getStatusBadge(scan.status)}
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-cyber-muted">{scan.type}</span>
                <span className="text-cyber-muted">{scan.startTime}</span>
              </div>

              {scan.status === 'running' && (
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-cyber-muted">
                    <span>Progress</span>
                    <span>{scan.progress}%</span>
                  </div>
                  <div className="w-full bg-cyber-surface rounded-full h-2">
                    <div
                      className="h-2 bg-cyber-blue rounded-full transition-all duration-300 animate-pulse-glow"
                      style={{ width: `${scan.progress}%` }}
                    />
                  </div>
                </div>
              )}

              {scan.vulnerabilities !== undefined && (
                <div className="flex items-center space-x-2 text-sm">
                  <AlertTriangle className="h-4 w-4 text-cyber-amber" />
                  <span className="text-cyber-muted">
                    {scan.vulnerabilities} vulnerabilities found
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}