"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, Shield, FileText, Play, Mail } from 'lucide-react';
import { useRouter } from 'next/navigation';

const tools = [
  {
    name: 'Port Scanner',
    description: 'Scan network ports and services',
    icon: Search,
    href: '/port-scan',
    color: 'cyber-blue'
  },
  {
    name: 'Vulnerability Scanner',
    description: 'Detect security vulnerabilities',
    icon: Shield,
    href: '/vulnerability-scan',
    color: 'cyber-red'
  },
  {
    name: 'Email Scanner',
    description: 'Discover domain email addresses',
    icon: Mail,
    href: '/email-scanner',
    color: 'cyber-purple'
  },
  {
    name: 'Security Notes',
    description: 'Document findings and analysis',
    icon: FileText,
    href: '/notes',
    color: 'cyber-green'
  }
];

export default function ScanTools() {
  const router = useRouter();

  console.log("ScanTools component rendered");

  const handleToolClick = (href: string) => {
    console.log("Navigating to tool:", href);
    router.push(href);
  };

  return (
    <Card className="cyber-card">
      <CardHeader>
        <CardTitle className="text-cyber-text flex items-center space-x-2">
          <Play className="h-5 w-5 text-cyber-blue" />
          <span>Quick Scan Tools</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Button
                key={tool.name}
                variant="ghost"
                className="h-auto p-4 justify-start border border-cyber-blue/20 hover:border-cyber-blue/40 hover:bg-cyber-blue/10 transition-all duration-200"
                onClick={() => handleToolClick(tool.href)}
              >
                <div className="flex items-start space-x-3 w-full">
                  <Icon className={`h-5 w-5 mt-1 text-${tool.color}`} />
                  <div className="text-left">
                    <div className="font-medium text-cyber-text">{tool.name}</div>
                    <div className="text-sm text-cyber-muted">{tool.description}</div>
                  </div>
                </div>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}