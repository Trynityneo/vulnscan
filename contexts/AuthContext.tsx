"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

// Mock User interface for demo purposes
interface MockUser {
  uid: string;
  email: string;
  displayName?: string;
}

interface AuthContextType {
  user: MockUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(null);
  const [loading, setLoading] = useState(true);

  console.log("AuthProvider initialized, loading:", loading);

  useEffect(() => {
    // Check for existing session in localStorage
    const checkStoredAuth = () => {
      try {
        const storedUser = localStorage.getItem('cybershield-user');
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          console.log("Found stored user session:", userData.email);
          setUser(userData);
        } else {
          console.log("No stored user session found");
        }
      } catch (error) {
        console.error("Error reading stored auth:", error);
        localStorage.removeItem('cybershield-user');
      }
      setLoading(false);
    };

    checkStoredAuth();
  }, []);

  const login = async (email: string, password: string) => {
    console.log("Attempting demo login for:", email);
    
    // Simulate loading time
    await new Promise(resolve => setTimeout(resolve, 800));
    
    try {
      // Mock user creation - accept any email/password in demo
      const mockUser: MockUser = {
        uid: `user-${Date.now()}`,
        email: email,
        displayName: email.split('@')[0]
      };

      // Store in localStorage for persistence
      localStorage.setItem('cybershield-user', JSON.stringify(mockUser));
      setUser(mockUser);
      console.log("Demo login successful for:", email);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const signup = async (email: string, password: string) => {
    console.log("Attempting demo signup for:", email);
    
    // Simulate loading time
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      // Mock user creation - accept any email/password in demo
      const mockUser: MockUser = {
        uid: `user-${Date.now()}`,
        email: email,
        displayName: email.split('@')[0]
      };

      // Store in localStorage for persistence
      localStorage.setItem('cybershield-user', JSON.stringify(mockUser));
      setUser(mockUser);
      console.log("Demo signup successful for:", email);
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    }
  };

  const logout = async () => {
    console.log("Attempting logout");
    try {
      localStorage.removeItem('cybershield-user');
      setUser(null);
      console.log("Logout successful");
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}