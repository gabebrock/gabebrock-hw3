"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Bell, 
  Calendar, 
  TrendingUp, 
  MapPin, 
  Clock, 
  FileText,
  AlertTriangle,
  Eye,
  Filter
} from "lucide-react";
import { mockCounties, mockDocuments, mockTrends, mockMeetings } from "@/lib/mock-data";
import Link from "next/link";

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState<{
    id?: string;
    name: string;
    email?: string;
    type: string;
    preferences?: {
      topics?: string[];
      states?: string[];
      keywords?: string[];
    };
    loginTime?: string;
  } | null>(null);

  // Load user data from localStorage (simulating authentication)
  useEffect(() => {
    const userData = localStorage.getItem('civicpulse_user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      // Create default John Reporter user if none exists
      const defaultUser = {
        id: 'john_reporter_001',
        name: 'John Reporter',
        email: 'john@newsroom.com',
        type: 'reporter',
        preferences: {
          topics: ['Education', 'Public Schools'],
          states: ['Kansas', 'Missouri'],
          keywords: ['cell phone ban', 'curriculum', 'book policy']
        },
        loginTime: new Date().toISOString(),
        savedItems: [] // Initialize empty saved items
      };
      
      // Save to localStorage and set state
      localStorage.setItem('civicpulse_user', JSON.stringify(defaultUser));
      setUser(defaultUser);
    }
  }, []);

  const recentAlerts = [
    {
      id: "1",
      title: "New cell phone policy discussion in Johnson County",
      county: "Johnson County",
      time: "2 hours ago",
      priority: "high"
    },
    {
      id: "2", 
      title: "Solar zoning amendment passed in Sedgwick County",
      county: "Sedgwick County",
      time: "5 hours ago",
      priority: "medium"
    },
    {
      id: "3",
      title: "Transit development district approved in Overland Park",
      county: "Johnson County", 
      time: "1 day ago",
      priority: "medium"
    }
  ];

  const upcomingMeetings = mockMeetings.filter(m => m.status === 'upcoming').slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
                <span className="font-semibold">CivicPulse</span>
              </Link>
              <Badge variant="secondary">{user?.type || 'reporter'}</Badge>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
              <Link href="/account" className="text-sm hover:underline">
                {user?.name || 'User'}
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Search */}
        <div className="mb-8">
            <div className="relative max-w-2xl">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search municipal documents, meetings, and trends..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 text-lg"
              />
              <Link href="/search">
                <Button className="absolute right-2 top-1/2 transform -translate-y-1/2">
                  Search
                </Button>
              </Link>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Watchlist Feed */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Watchlist Feed
                </CardTitle>
                <CardDescription>
                  Recent items matching your keywords and interests
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockDocuments.map((doc) => (
                  <Link key={doc.id} href={`/document/${doc.id}`}>
                    <div className="border rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium hover:text-blue-600">{doc.title}</h3>
                        <div className="flex items-center gap-2">
                        <Badge variant="outline">{doc.type}</Badge>
                          {/* High-Confidence Match Indicator */}
                          {doc.keywords.length >= 3 && (
                            <Badge className="bg-red-100 text-red-800 border-red-200">
                              High-Confidence Match
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {mockCounties.find(c => c.id === doc.countyId)?.name} County
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(doc.date).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <FileText className="w-3 h-3" />
                          OCR Quality: {doc.ocrQuality}%
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {doc.extractedText.substring(0, 200)}...
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {doc.keywords.slice(0, 4).map((keyword, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>

            {/* Trend Heatmap Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Trending Topics
                </CardTitle>
                <CardDescription>
                  Hot topics across Kansas counties
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockTrends.map((trend) => (
                    <div key={trend.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{trend.topic}</h4>
                        <p className="text-sm text-muted-foreground">{trend.timeframe}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="text-sm font-medium">Intensity: {trend.intensity}%</div>
                          <div className="text-xs text-muted-foreground">
                            {trend.counties.length} counties
                          </div>
                        </div>
                        <div className={`w-3 h-3 rounded-full ${
                          trend.intensity > 80 ? 'bg-red-500' :
                          trend.intensity > 60 ? 'bg-yellow-500' : 'bg-green-500'
                        }`} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Recent Alerts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentAlerts.map((alert) => (
                  <div key={alert.id} className="p-3 border rounded-lg">
                    <div className="flex items-start justify-between mb-1">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        alert.priority === 'high' ? 'bg-red-500' :
                        alert.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                      }`} />
                      <span className="text-xs text-muted-foreground">{alert.time}</span>
                    </div>
                    <h4 className="text-sm font-medium mb-1">{alert.title}</h4>
                    <p className="text-xs text-muted-foreground">{alert.county}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Upcoming Meetings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Upcoming Meetings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingMeetings.map((meeting) => (
                  <div key={meeting.id} className="p-3 border rounded-lg">
                    <h4 className="text-sm font-medium mb-1">{meeting.title}</h4>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(meeting.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {mockCounties.find(c => c.id === meeting.countyId)?.name} County
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href="/search">
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Advanced Search
                  </Button>
                </Link>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Bell className="w-4 h-4 mr-2" />
                  Manage Alerts
                </Button>
                <Link href="/trends">
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    View Heatmap
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
