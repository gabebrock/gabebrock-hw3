"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Bell, ArrowLeft } from "lucide-react";

interface NavigationProps {
  showBackButton?: boolean;
  backButtonText?: string;
  backButtonHref?: string;
}

export function Navigation({ 
  showBackButton = false, 
  backButtonText = "Back", 
  backButtonHref = "/search" 
}: NavigationProps) {
  const pathname = usePathname();
  const [user, setUser] = useState<{
    name?: string;
    type?: string;
  } | null>(null);

  // Load user data from localStorage
  useEffect(() => {
    try {
      const userData = localStorage.getItem('civicpulse_user');
      if (userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } else {
        // Default user
        setUser({
          name: 'John Reporter',
          type: 'reporter'
        });
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      setUser({
        name: 'John Reporter',
        type: 'reporter'
      });
    }
  }, []);

  const isActivePage = (path: string) => {
    if (path === '/dashboard' && pathname === '/') return false;
    return pathname === path || pathname.startsWith(path);
  };

  return (
    <header className="border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-4">
            {showBackButton && (
              <>
                <Link href={backButtonHref} className="flex items-center gap-2 hover:underline">
                  <ArrowLeft className="w-4 h-4" />
                  {backButtonText}
                </Link>
                <div className="w-px h-6 bg-border" />
              </>
            )}
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold">CivicPulse</span>
            </Link>
            {user?.type && (
              <Badge variant="secondary">{user.type}</Badge>
            )}
          </div>
          
          <nav className="flex items-center gap-4">
            <Link 
              href="/dashboard" 
              className={`text-sm hover:underline ${
                isActivePage('/dashboard') ? 'font-medium' : ''
              }`}
            >
              Dashboard
            </Link>
            <Link 
              href="/search" 
              className={`text-sm hover:underline ${
                isActivePage('/search') ? 'font-medium' : ''
              }`}
            >
              Search
            </Link>
            <Link 
              href="/trends" 
              className={`text-sm hover:underline ${
                isActivePage('/trends') ? 'font-medium' : ''
              }`}
            >
              Trends
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => alert('Feature not implemented yet.')}>
              <Bell className="w-4 h-4" />
            </Button>
            <Link 
              href="/account" 
              className={`text-sm hover:underline ${
                isActivePage('/account') ? 'font-medium' : 'text-muted-foreground'
              }`}
            >
              {user?.name || 'User'}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
