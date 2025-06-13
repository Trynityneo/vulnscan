import { useState, useEffect, useCallback } from 'react';
import { scanService, type ScanResult } from '@/lib/scanService';

export function useScans() {
  const [scans, setScans] = useState<ScanResult[]>([]);
  const [stats, setStats] = useState(scanService.getScanStats());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const refreshData = useCallback(() => {
    try {
      setScans(scanService.getRecentScans(10));
      setStats(scanService.getScanStats());
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch scan data'));
    }
  }, []);

  useEffect(() => {
    refreshData();
    const unsubscribe = scanService.subscribe(refreshData);
    return () => unsubscribe();
  }, [refreshData]);

  const startNewScan = useCallback(async (type: 'port' | 'vulnerability' | 'email', target: string) => {
    try {
      setIsLoading(true);
      setError(null);
      await scanService.startScan(type, target);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to start scan'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    scans,
    stats,
    isLoading,
    error,
    startNewScan,
    refreshData,
  };
}
