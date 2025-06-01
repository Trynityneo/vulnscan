"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Shield } from 'lucide-react';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  console.log("Home page rendered, user:", user?.email, "loading:", loading);

  useEffect(() => {
    if (!loading) {
      if (user) {
        console.log("User authenticated, redirecting to dashboard");
        router.push('/dashboard');
      } else {
        console.log("No user, redirecting to login");
        router.push('/login');
      }
    }
  }, [user, loading, router]);

  return (
    <div className="min-h-screen bg-cyber-bg bg-cyber-grid flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="animate-pulse-glow">
          <Shield className="h-16 w-16 text-cyber-blue mx-auto" />
        </div>
        <h1 className="text-2xl font-bold text-cyber-text glow-text">CyberShield</h1>
        <div className="w-8 h-8 border-4 border-cyber-blue border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-cyber-muted">Initializing security dashboard...</p>
      </div>
    </div>
  );
}
