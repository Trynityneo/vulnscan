"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Shield, Activity } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function WelcomeCard() {
  const { user } = useAuth();

  console.log("WelcomeCard rendered for user:", user?.email);

  const getUserName = () => {
    if (user?.displayName) return user.displayName;
    if (user?.email) return user.email.split('@')[0];
    return 'Security Analyst';
  };

  return (
    <Card className="cyber-card bg-gradient-to-r from-cyber-surface to-cyber-blue/10">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-cyber-text glow-text">
              Welcome back, {getUserName()}
            </h2>
            <p className="text-cyber-muted">
              Your security dashboard is ready. Monitor threats, scan networks, and protect your infrastructure.
            </p>
            <div className="flex items-center space-x-4 mt-4">
              <div className="flex items-center space-x-2 text-cyber-green">
                <Activity className="h-4 w-4" />
                <span className="text-sm font-medium">System Active</span>
              </div>
              <div className="flex items-center space-x-2 text-cyber-blue">
                <Shield className="h-4 w-4" />
                <span className="text-sm font-medium">Protected</span>
              </div>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="relative">
              <Shield className="h-16 w-16 text-cyber-blue/30" />
              <div className="absolute inset-0 animate-pulse-glow">
                <Shield className="h-16 w-16 text-cyber-blue" />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}