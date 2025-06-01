"use client";

import { Suspense } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import WelcomeCard from '@/components/dashboard/WelcomeCard';
import StatsCard from '@/components/dashboard/StatsCard';
import ScanChart from '@/components/dashboard/ScanChart';
import SafetyGauge from '@/components/dashboard/SafetyGauge';
import ScanTools from '@/components/dashboard/ScanTools';
import ActiveScans from '@/components/dashboard/ActiveScans';
import { Network, Shield, Search, FileText, Activity, Target } from 'lucide-react';

export default function DashboardPage() {
  console.log("Dashboard page rendered");

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <WelcomeCard />

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Networks Scanned"
            value="47"
            description="This month"
            icon={Network}
            trend="up"
            trendValue="+12%"
            status="safe"
          />
          <StatsCard
            title="Ports Scanned"
            value="2,847"
            description="Active services found"
            icon={Search}
            trend="up"
            trendValue="+23%"
            status="safe"
          />
          <StatsCard
            title="Vulnerabilities"
            value="8"
            description="Critical issues"
            icon={Shield}
            trend="down"
            trendValue="-4 this week"
            status="warning"
          />
          <StatsCard
            title="Security Reports"
            value="12"
            description="Generated this month"
            icon={FileText}
            trend="up"
            trendValue="+2"
            status="safe"
          />
        </div>

        {/* Charts and Gauges */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Suspense fallback={<div className="cyber-card h-80 animate-pulse" />}>
              <ScanChart />
            </Suspense>
          </div>
          <div className="space-y-6">
            <SafetyGauge score={87} title="Overall Safety Score" />
          </div>
        </div>

        {/* Tools and Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ScanTools />
          <ActiveScans />
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard
            title="Scan Success Rate"
            value="98.5%"
            description="Completed successfully"
            icon={Activity}
            status="safe"
          />
          <SafetyGauge score={73} title="Network Satisfaction" />
          <StatsCard
            title="Active Targets"
            value="156"
            description="Monitored endpoints"
            icon={Target}
            trend="up"
            trendValue="+8"
            status="safe"
          />
        </div>
      </div>
    </DashboardLayout>
  );
}