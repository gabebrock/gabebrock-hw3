"use client";

import { useState } from "react";
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

  // Mock user data - in a real app this would come from authentication
  const userType = "reporter"; // reporter, strategist, advocate, developer
  const userName = "John Reporter";

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
                  <span className="text-white text-sm font-bold">CP</span>
                </div>
                <span className="font-semibold">CivicPulse</span>
              </Link>
              <Badge variant="secondary">{userType}</Badge>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
              <div className="text-sm">Welcome, {userName}</div>
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
            <Button className="absolute right-2 top-1/2 transform -translate-y-1/2">
              Search
            </Button>
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
                  <div key={doc.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">{doc.title}</h3>
                      <Badge variant="outline">{doc.type}</Badge>
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
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Advanced Search
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Bell className="w-4 h-4 mr-2" />
                  Manage Alerts
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  View Heatmap
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
