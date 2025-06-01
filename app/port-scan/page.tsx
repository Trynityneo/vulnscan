"use client";

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Search, Play, Target, Server } from 'lucide-react';

interface ScanResult {
  port: number;
  protocol: string;
  status: 'open' | 'closed' | 'filtered';
  service: string;
  banner?: string;
}

export default function PortScanPage() {
  const [target, setTarget] = useState('');
  const [portRange, setPortRange] = useState('1-1000');
  const [scanning, setScanning] = useState(false);
  const [results, setResults] = useState<ScanResult[]>([]);

  console.log("PortScan page rendered");

  const mockResults: ScanResult[] = [
    { port: 22, protocol: 'tcp', status: 'open', service: 'SSH', banner: 'OpenSSH 8.9' },
    { port: 80, protocol: 'tcp', status: 'open', service: 'HTTP', banner: 'nginx/1.18.0' },
    { port: 443, protocol: 'tcp', status: 'open', service: 'HTTPS', banner: 'nginx/1.18.0' },
    { port: 3306, protocol: 'tcp', status: 'open', service: 'MySQL', banner: 'MySQL 8.0.28' },
    { port: 8080, protocol: 'tcp', status: 'filtered', service: 'HTTP-Proxy' },
    { port: 25, protocol: 'tcp', status: 'closed', service: 'SMTP' },
  ];

  const handleScan = async () => {
    console.log("Starting port scan for:", target, "ports:", portRange);
    setScanning(true);
    setResults([]);

    // Simulate scanning delay
    setTimeout(() => {
      setResults(mockResults);
      setScanning(false);
      console.log("Port scan completed with", mockResults.length, "results");
    }, 3000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-cyber-green/20 text-cyber-green border-cyber-green/30';
      case 'closed': return 'bg-cyber-red/20 text-cyber-red border-cyber-red/30';
      case 'filtered': return 'bg-cyber-amber/20 text-cyber-amber border-cyber-amber/30';
      default: return 'bg-cyber-blue/20 text-cyber-blue border-cyber-blue/30';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-2">
        <Search className="h-6 w-6 text-cyber-blue" />
        <h1 className="text-2xl font-bold text-cyber-text glow-text">Port Scanner</h1>
      </div>

      {/* Scan Configuration */}
      <Card className="cyber-card">
        <CardHeader>
          <CardTitle className="text-cyber-text flex items-center space-x-2">
            <Target className="h-5 w-5 text-cyber-blue" />
            <span>Scan Configuration</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="target" className="text-cyber-text">Target IP/Domain</Label>
              <Input
                id="target"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                placeholder="192.168.1.1 or example.com"
                className="cyber-input"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ports" className="text-cyber-text">Port Range</Label>
              <Input
                id="ports"
                value={portRange}
                onChange={(e) => setPortRange(e.target.value)}
                placeholder="1-1000 or 80,443,22"
                className="cyber-input"
              />
            </div>
          </div>

          <div className="mt-6">
            <Button
              onClick={handleScan}
              disabled={!target || scanning}
              className="cyber-button"
            >
              {scanning ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-cyber-bg border-t-transparent rounded-full animate-spin"></div>
                  <span>Scanning...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Play className="h-4 w-4" />
                  <span>Start Scan</span>
                </div>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Scan Progress */}
      {scanning && (
        <Card className="cyber-card scan-animation">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="animate-pulse-glow">
                <Server className="h-8 w-8 text-cyber-blue" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-cyber-text">Scanning {target}</h3>
                <p className="text-cyber-muted">Checking ports {portRange}...</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results */}
      {results.length > 0 && (
        <Card className="cyber-card">
          <CardHeader>
            <CardTitle className="text-cyber-text">Scan Results</CardTitle>
            <p className="text-sm text-cyber-muted">Found {results.filter(r => r.status === 'open').length} open ports</p>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-cyber-blue/20">
                    <th className="text-left py-3 text-cyber-text font-medium">Port</th>
                    <th className="text-left py-3 text-cyber-text font-medium">Protocol</th>
                    <th className="text-left py-3 text-cyber-text font-medium">Status</th>
                    <th className="text-left py-3 text-cyber-text font-medium">Service</th>
                    <th className="text-left py-3 text-cyber-text font-medium">Banner</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((result, index) => (
                    <tr key={index} className="border-b border-cyber-surface hover:bg-cyber-blue/5">
                      <td className="py-3 text-cyber-text font-mono">{result.port}</td>
                      <td className="py-3 text-cyber-text uppercase">{result.protocol}</td>
                      <td className="py-3">
                        <Badge variant="outline" className={getStatusColor(result.status)}>
                          {result.status}
                        </Badge>
                      </td>
                      <td className="py-3 text-cyber-text">{result.service}</td>
                      <td className="py-3 text-cyber-muted font-mono text-sm">{result.banner || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
      </div>
    </DashboardLayout>
  );
}