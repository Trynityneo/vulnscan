"use client";

import { Search, Bell, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

export default function Header() {
  const { user } = useAuth();

  console.log("Header rendered for user:", user?.email);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const getUserName = () => {
    if (user?.displayName) return user.displayName;
    if (user?.email) return user.email.split('@')[0];
    return 'User';
  };

  return (
    <header className="bg-cyber-surface border-b border-cyber-blue/20 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Greeting */}
        <div className="hidden lg:block">
          <h1 className="text-xl font-semibold text-cyber-text">
            {getGreeting()}, <span className="text-cyber-blue glow-text">{getUserName()}</span>
          </h1>
          <p className="text-sm text-cyber-muted">Ready to secure your network?</p>
        </div>

        {/* Search and notifications */}
        <div className="flex items-center space-x-4 ml-auto lg:ml-0">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-cyber-muted" />
            <Input
              placeholder="Search scans, vulnerabilities..."
              className="pl-10 w-64 cyber-input"
            />
          </div>

          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="relative text-cyber-muted hover:text-cyber-blue"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-cyber-red rounded-full animate-pulse"></span>
          </Button>

          {/* User menu */}
          <Button
            variant="ghost"
            size="icon"
            className="text-cyber-muted hover:text-cyber-blue"
          >
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}