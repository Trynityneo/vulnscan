"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { signup } = useAuth();
  const router = useRouter();

  console.log("Signup page rendered");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Signup form submitted with email:", email);
    
    setError('');
    setLoading(true);

    try {
      await signup(email, password);
      console.log("Signup successful, redirecting to dashboard");
      router.push('/dashboard');
    } catch (error: any) {
      console.error("Signup error:", error);
      setError(error.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cyber-bg bg-cyber-grid flex items-center justify-center p-4">
      <Card className="w-full max-w-md cyber-card">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Shield className="h-12 w-12 text-cyber-blue glow-text" />
          </div>
          <CardTitle className="text-2xl font-bold text-cyber-text glow-text">Join CyberShield</CardTitle>
          <CardDescription className="text-cyber-muted">
            Create your security account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 rounded-md bg-cyber-red/20 border border-cyber-red/30 text-cyber-red text-sm">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="name" className="text-cyber-text">Full Name</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="cyber-input"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-cyber-text">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@company.com"
                className="cyber-input"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-cyber-text">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a strong password"
                  className="cyber-input pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 text-cyber-muted hover:text-cyber-blue"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full cyber-button"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-cyber-bg border-t-transparent rounded-full animate-spin"></div>
                  <span>Creating Account...</span>
                </div>
              ) : (
                'Create Account'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-cyber-muted text-sm">
              Already have an account?{' '}
              <Link href="/login" className="text-cyber-blue hover:text-cyber-blue/80 font-medium">
                Sign in
              </Link>
            </p>
          </div>

          <div className="mt-4 p-3 rounded-md bg-cyber-blue/10 border border-cyber-blue/20">
            <p className="text-xs text-cyber-muted text-center">
              🎮 Demo Mode: Account creation is simulated - any credentials work
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}