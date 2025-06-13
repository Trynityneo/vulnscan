import { v4 as uuidv4 } from 'uuid';

interface ScanResult {
  id: string;
  type: 'port' | 'vulnerability' | 'email';
  target: string;
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
  startTime: Date;
  endTime?: Date;
  results?: any;
  severity?: 'low' | 'medium' | 'high' | 'critical';
}

class ScanService {
  private static instance: ScanService;
  private scans: ScanResult[] = [];
  private subscribers: Array<() => void> = [];

  private constructor() {
    // Initialize with some historical data
    this.scans = [
      this.createScan('port', 'example.com', 'completed', 'low'),
      this.createScan('vulnerability', '192.168.1.1', 'completed', 'medium'),
      this.createScan('email', 'example.org', 'completed', 'low'),
    ];
  }

  static getInstance(): ScanService {
    if (!ScanService.instance) {
      ScanService.instance = new ScanService();
    }
    return ScanService.instance;
  }

  private createScan(
    type: 'port' | 'vulnerability' | 'email',
    target: string,
    status: 'completed' | 'failed',
    severity: 'low' | 'medium' | 'high' | 'critical'
  ): ScanResult {
    const endTime = new Date();
    const startTime = new Date(endTime.getTime() - Math.floor(Math.random() * 24 * 60 * 60 * 1000));
    
    return {
      id: uuidv4(),
      type,
      target,
      status,
      startTime,
      endTime,
      severity,
      results: this.generateMockResults(type, target)
    };
  }

  private generateMockResults(type: string, target: string): any {
    const baseResults = {
      target,
      timestamp: new Date().toISOString(),
      scanType: type
    };

    switch (type) {
      case 'port':
        return {
          ...baseResults,
          openPorts: [
            { port: 80, service: 'http', status: 'open' },
            { port: 443, service: 'https', status: 'open' },
            { port: 22, service: 'ssh', status: 'closed' }
          ]
        };
      case 'vulnerability':
        return {
          ...baseResults,
          vulnerabilities: [
            { id: 'CVE-2023-1234', severity: 'high', description: 'SQL Injection Vulnerability' },
            { id: 'CVE-2023-1235', severity: 'medium', description: 'XSS Vulnerability' }
          ]
        };
      case 'email':
        return {
          ...baseResults,
          emails: [
            'admin@example.com',
            'support@example.com',
            'info@example.com'
          ]
        };
      default:
        return baseResults;
    }
  }

  async startScan(type: 'port' | 'vulnerability' | 'email', target: string): Promise<ScanResult> {
    const scan: ScanResult = {
      id: uuidv4(),
      type,
      target,
      status: 'pending',
      startTime: new Date(),
      severity: 'low'
    };

    this.scans.unshift(scan);
    this.notifySubscribers();

    // Simulate scan in progress
    setTimeout(() => {
      scan.status = 'in-progress';
      this.notifySubscribers();

      // Simulate scan completion
      setTimeout(() => {
        const scanIndex = this.scans.findIndex(s => s.id === scan.id);
        if (scanIndex !== -1) {
          const completedScan = this.createScan(
            type,
            target,
            Math.random() > 0.2 ? 'completed' : 'failed',
            ['low', 'medium', 'high', 'critical'][Math.floor(Math.random() * 4)] as any
          );
          this.scans[scanIndex] = completedScan;
          this.notifySubscribers();
        }
      }, 2000 + Math.random() * 3000);
    }, 500);

    return scan;
  }

  getRecentScans(limit: number = 10): ScanResult[] {
    return [...this.scans].sort((a, b) => 
      new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
    ).slice(0, limit);
  }

  getScanStats() {
    const totalScans = this.scans.length;
    const completedScans = this.scans.filter(s => s.status === 'completed').length;
    const failedScans = this.scans.filter(s => s.status === 'failed').length;
    const inProgressScans = this.scans.filter(s => s.status === 'in-progress').length;
    
    const severityCounts = this.scans.reduce((acc, scan) => {
      if (scan.severity) {
        acc[scan.severity] = (acc[scan.severity] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    return {
      totalScans,
      completedScans,
      failedScans,
      inProgressScans,
      successRate: totalScans > 0 ? Math.round((completedScans / totalScans) * 100) : 0,
      severityCounts
    };
  }

  subscribe(callback: () => void): () => void {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(cb => cb !== callback);
    };
  }

  private notifySubscribers() {
    this.subscribers.forEach(callback => callback());
  }
}

export const scanService = ScanService.getInstance();
export type { ScanResult };
