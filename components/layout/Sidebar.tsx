"use client";

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Shield, Activity, Search, FileText, LogOut, Menu, X, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter, usePathname } from 'next/navigation';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Activity },
  { name: 'Port Scans', href: '/port-scan', icon: Search },
  { name: 'Vulnerability Scans', href: '/vulnerability-scan', icon: Shield },
  { name: 'Email Scanner', href: '/email-scanner', icon: Mail },
  { name: 'Notes', href: '/notes', icon: FileText },
];

export default function Sidebar() {
  const { logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  console.log("Sidebar rendered, current path:", pathname);

  const handleLogout = async () => {
    console.log("Logout button clicked");
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleNavigation = (href: string) => {
    console.log("Navigating to:", href);
    router.push(href);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden fixed top-4 left-4 z-50 bg-cyber-surface border border-cyber-blue/20"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed left-0 top-0 z-40 h-full w-64 bg-cyber-surface border-r border-cyber-blue/20
        transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:z-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-cyber-blue/20">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-cyber-blue glow-text" />
              <span className="text-xl font-bold text-cyber-text glow-text">CyberShield</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.href)}
                  className={`
                    w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left
                    transition-all duration-200 group
                    ${isActive 
                      ? 'bg-cyber-blue/20 text-cyber-blue border border-cyber-blue/30 animate-pulse-glow' 
                      : 'text-cyber-text hover:bg-cyber-blue/10 hover:text-cyber-blue'
                    }
                  `}
                >
                  <item.icon className={`h-5 w-5 ${isActive ? 'text-cyber-blue' : 'text-cyber-muted group-hover:text-cyber-blue'}`} />
                  <span className="font-medium">{item.name}</span>
                </button>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-cyber-blue/20">
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="w-full justify-start space-x-3 text-cyber-red hover:bg-cyber-red/10 hover:text-cyber-red"
            >
              <LogOut className="h-5 w-5" />
              <span>Sign Out</span>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}