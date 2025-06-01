"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Mail, Search, Globe, Clock, Shield, ExternalLink } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';

interface EmailResult {
  email: string;
  source: string;
  confidence: 'High' | 'Medium' | 'Low';
  type: 'Corporate' | 'Personal' | 'Support' | 'Sales' | 'Admin';
  verified: boolean;
}

export default function EmailScannerPage() {
  const [domain, setDomain] = useState('');
  const [scanning, setScanning] = useState(false);
  const [results, setResults] = useState<EmailResult[]>([]);
  const [scanComplete, setScanComplete] = useState(false);
  const [scanStats, setScanStats] = useState({
    totalFound: 0,
    verified: 0,
    sources: 0,
    scanTime: 0
  });

  console.log("EmailScanner component rendered, domain:", domain);

  const handleScan = async () => {
    if (!domain.trim()) return;
    
    console.log("Starting email scan for domain:", domain);
    setScanning(true);
    setScanComplete(false);
    setResults([]);
    
    const startTime = Date.now();
    
    // Simulate scanning delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate realistic mock email results
    const mockResults: EmailResult[] = [
      {
        email: `admin@${domain}`,
        source: 'DNS Records',
        confidence: 'High',
        type: 'Admin',
        verified: true
      },
      {
        email: `contact@${domain}`,
        source: 'Website Scrape',
        confidence: 'High',
        type: 'Support',
        verified: true
      },
      {
        email: `info@${domain}`,
        source: 'Website Footer',
        confidence: 'High',
        type: 'Corporate',
        verified: true
      },
      {
        email: `sales@${domain}`,
        source: 'Social Media',
        confidence: 'Medium',
        type: 'Sales',
        verified: false
      },
      {
        email: `support@${domain}`,
        source: 'Website Contact',
        confidence: 'High',
        type: 'Support',
        verified: true
      },
      {
        email: `no-reply@${domain}`,
        source: 'Email Headers',
        confidence: 'Medium',
        type: 'Corporate',
        verified: false
      },
      {
        email: `webmaster@${domain}`,
        source: 'WHOIS Data',
        confidence: 'Medium',
        type: 'Admin',
        verified: false
      }
    ];
    
    // Randomly select 4-7 results to make it more realistic
    const selectedResults = mockResults.slice(0, Math.floor(Math.random() * 4) + 4);
    
    const endTime = Date.now();
    const scanTime = (endTime - startTime) / 1000;
    
    setResults(selectedResults);
    setScanStats({
      totalFound: selectedResults.length,
      verified: selectedResults.filter(r => r.verified).length,
      sources: new Set(selectedResults.map(r => r.source)).size,
      scanTime: scanTime
    });
    
    setScanning(false);
    setScanComplete(true);
    
    console.log("Email scan completed, found", selectedResults.length, "emails");
  };

  const getConfidenceBadge = (confidence: string) => {
    const colors = {
      High: 'bg-green-500/10 text-green-400 border-green-500/20',
      Medium: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
      Low: 'bg-red-500/10 text-red-400 border-red-500/20'
    };
    return colors[confidence as keyof typeof colors] || colors.Low;
  };

  const getTypeBadge = (type: string) => {
    const colors = {
      Corporate: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      Personal: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      Support: 'bg-cyber-green/10 text-cyber-green border-cyber-green/20',
      Sales: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
      Admin: 'bg-red-500/10 text-red-400 border-red-500/20'
    };
    return colors[type as keyof typeof colors] || colors.Corporate;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-cyber-purple/10 border border-cyber-purple/20">
            <Mail className="h-6 w-6 text-cyber-purple" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Email Address Scanner</h1>
            <p className="text-cyber-muted">Discover email addresses associated with a domain</p>
          </div>
        </div>

        {/* Scan Form */}
        <Card className="bg-cyber-dark border-cyber-border">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-white">
              <Globe className="h-5 w-5 text-cyber-blue" />
              <span>Domain Email Discovery</span>
            </CardTitle>
            <CardDescription>
              Enter a domain name to scan for associated email addresses using OSINT techniques
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex space-x-3">
              <Input
                placeholder="Enter domain (e.g., example.com)"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="flex-1 bg-cyber-dark/50 border-cyber-border text-white placeholder:text-cyber-muted"
                disabled={scanning}
              />
              <Button 
                onClick={handleScan}
                disabled={scanning || !domain.trim()}
                className="bg-cyber-purple hover:bg-cyber-purple/80 text-white px-8"
              >
                {scanning ? (
                  <>
                    <Search className="mr-2 h-4 w-4 animate-spin" />
                    Scanning...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Start Scan
                  </>
                )}
              </Button>
            </div>
            
            <div className="p-3 rounded-md bg-cyber-blue/10 border border-cyber-blue/20">
              <p className="text-xs text-cyber-muted">
                🔍 Demo Mode: Simulated email discovery using common patterns and OSINT techniques
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Scan Statistics */}
        {scanComplete && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-cyber-dark border-cyber-border">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-8 w-8 text-cyber-green" />
                  <div>
                    <p className="text-sm text-cyber-muted">Total Found</p>
                    <p className="text-2xl font-bold text-white">{scanStats.totalFound}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-cyber-dark border-cyber-border">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Shield className="h-8 w-8 text-green-400" />
                  <div>
                    <p className="text-sm text-cyber-muted">Verified</p>
                    <p className="text-2xl font-bold text-white">{scanStats.verified}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-cyber-dark border-cyber-border">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <ExternalLink className="h-8 w-8 text-cyber-blue" />
                  <div>
                    <p className="text-sm text-cyber-muted">Sources</p>
                    <p className="text-2xl font-bold text-white">{scanStats.sources}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-cyber-dark border-cyber-border">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Clock className="h-8 w-8 text-cyber-purple" />
                  <div>
                    <p className="text-sm text-cyber-muted">Scan Time</p>
                    <p className="text-2xl font-bold text-white">{scanStats.scanTime.toFixed(1)}s</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Results Table */}
        {scanComplete && results.length > 0 && (
          <Card className="bg-cyber-dark border-cyber-border">
            <CardHeader>
              <CardTitle className="text-white">Discovered Email Addresses</CardTitle>
              <CardDescription>
                Email addresses found through various OSINT sources and techniques
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-cyber-border hover:bg-cyber-dark/50">
                    <TableHead className="text-cyber-muted">Email Address</TableHead>
                    <TableHead className="text-cyber-muted">Source</TableHead>
                    <TableHead className="text-cyber-muted">Type</TableHead>
                    <TableHead className="text-cyber-muted">Confidence</TableHead>
                    <TableHead className="text-cyber-muted">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.map((result, index) => (
                    <TableRow key={index} className="border-cyber-border hover:bg-cyber-dark/50">
                      <TableCell className="font-mono text-white">
                        {result.email}
                      </TableCell>
                      <TableCell className="text-cyber-muted">
                        {result.source}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getTypeBadge(result.type)}>
                          {result.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getConfidenceBadge(result.confidence)}>
                          {result.confidence}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={result.verified ? 
                            'bg-green-500/10 text-green-400 border-green-500/20' : 
                            'bg-gray-500/10 text-gray-400 border-gray-500/20'
                          }
                        >
                          {result.verified ? 'Verified' : 'Unverified'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {/* Scanning Progress */}
        {scanning && (
          <Card className="bg-cyber-dark border-cyber-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-center space-x-3">
                <Search className="h-6 w-6 text-cyber-purple animate-spin" />
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-white">Scanning in Progress</h3>
                  <p className="text-cyber-muted">Searching for email addresses associated with {domain}...</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}