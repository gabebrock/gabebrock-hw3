"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { 
  MapPin, 
  Calendar, 
  BarChart3,
  Clock,
  Map,
  ArrowUp,
  ArrowDown,
  Minus
} from "lucide-react";
import { mockCounties, mockTrends, mockDocuments } from "@/lib/mock-data";
import Link from "next/link";

export default function TrendsPage() {
  const [selectedTrend, setSelectedTrend] = useState(mockTrends[0]);
  const [viewMode, setViewMode] = useState<'heatmap' | 'timeline' | 'comparison'>('heatmap');
  const [timeframe, setTimeframe] = useState('30d');

  // Mock intensity data for heatmap visualization
  const getIntensityColor = (intensity: number) => {
    if (intensity >= 80) return 'bg-red-500';
    if (intensity >= 60) return 'bg-orange-500';
    if (intensity >= 40) return 'bg-yellow-500';
    if (intensity >= 20) return 'bg-green-500';
    return 'bg-gray-200 dark:bg-gray-700';
  };

  const getIntensityForCounty = (countyId: string) => {
    const countyData = selectedTrend.counties.find(c => c.countyId === countyId);
    return countyData?.intensity || 0;
  };

  const getTrendDirection = (intensity: number) => {
    // Mock trend direction based on intensity
    if (intensity >= 70) return 'up';
    if (intensity <= 30) return 'down';
    return 'stable';
  };

  const timelineData = [
    { date: '2024-08-01', intensity: 45 },
    { date: '2024-08-15', intensity: 52 },
    { date: '2024-09-01', intensity: 68 },
    { date: '2024-09-15', intensity: 85 },
    { date: '2024-09-22', intensity: selectedTrend.intensity }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">CP</span>
              </div>
              <span className="font-semibold">CivicPulse</span>
            </Link>
            <nav className="flex items-center gap-4">
              <Link href="/dashboard" className="text-sm hover:underline">Dashboard</Link>
              <Link href="/search" className="text-sm hover:underline">Search</Link>
              <Link href="/trends" className="text-sm font-medium">Trends</Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Trend Analysis</h1>
          <p className="text-muted-foreground mb-6">
            Visualize policy trends and emerging issues across Kansas counties
          </p>
          
          {/* Controls */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'heatmap' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('heatmap')}
              >
                <Map className="w-4 h-4 mr-2" />
                Heatmap
              </Button>
              <Button
                variant={viewMode === 'timeline' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('timeline')}
              >
                <Clock className="w-4 h-4 mr-2" />
                Timeline
              </Button>
              <Button
                variant={viewMode === 'comparison' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('comparison')}
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Compare
              </Button>
            </div>
            
            <div className="flex items-center gap-2">
              <Label className="text-sm">Timeframe:</Label>
              <select 
                value={timeframe} 
                onChange={(e) => setTimeframe(e.target.value)}
                className="px-3 py-1 border rounded-md text-sm"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Trend Selection Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Active Trends</CardTitle>
                <CardDescription>
                  Select a trend to analyze
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockTrends.map((trend) => (
                  <div
                    key={trend.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      selectedTrend.id === trend.id ? 'bg-blue-50 dark:bg-blue-950 border-blue-200' : 'hover:bg-muted/50'
                    }`}
                    onClick={() => setSelectedTrend(trend)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-sm font-medium">{trend.topic}</h4>
                      <div className="flex items-center gap-1">
                        {getTrendDirection(trend.intensity) === 'up' && <ArrowUp className="w-3 h-3 text-green-500" />}
                        {getTrendDirection(trend.intensity) === 'down' && <ArrowDown className="w-3 h-3 text-red-500" />}
                        {getTrendDirection(trend.intensity) === 'stable' && <Minus className="w-3 h-3 text-gray-500" />}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground mb-2">
                      Intensity: {trend.intensity}%
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {trend.counties.length} counties • {trend.timeframe}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Trend Details */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Trend Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Keywords</Label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedTrend.keywords.map((keyword, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Peak Counties</Label>
                  <div className="space-y-2 mt-2">
                    {selectedTrend.counties
                      .sort((a, b) => b.intensity - a.intensity)
                      .slice(0, 3)
                      .map((county) => {
                        const countyInfo = mockCounties.find(c => c.id === county.countyId);
                        return (
                          <div key={county.countyId} className="flex items-center justify-between text-sm">
                            <span>{countyInfo?.name}</span>
                            <div className="flex items-center gap-2">
                              <div className={`w-3 h-3 rounded-full ${getIntensityColor(county.intensity)}`} />
                              <span className="text-xs text-muted-foreground">{county.intensity}%</span>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Visualization Area */}
          <div className="lg:col-span-3">
            {viewMode === 'heatmap' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Map className="w-5 h-5" />
                    County Intensity Heatmap: {selectedTrend.topic}
                  </CardTitle>
                  <CardDescription>
                    Geographic distribution of trend intensity across Kansas counties
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Mock Heatmap Grid */}
                  <div className="grid grid-cols-5 gap-2 mb-6">
                    {mockCounties.map((county) => {
                      const intensity = getIntensityForCounty(county.id);
                      return (
                        <div
                          key={county.id}
                          className={`p-4 rounded-lg border-2 transition-all hover:scale-105 cursor-pointer ${
                            intensity > 0 ? getIntensityColor(intensity) : 'bg-gray-100 dark:bg-gray-800'
                          }`}
                          title={`${county.name} County: ${intensity}%`}
                        >
                          <div className="text-center">
                            <div className="text-xs font-medium text-white drop-shadow-sm">
                              {county.name}
                            </div>
                            <div className="text-xs text-white drop-shadow-sm mt-1">
                              {intensity}%
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Legend */}
                  <div className="flex items-center justify-center gap-4 text-sm">
                    <span>Intensity:</span>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded" />
                      <span>0%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-green-500 rounded" />
                      <span>20%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-yellow-500 rounded" />
                      <span>40%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-orange-500 rounded" />
                      <span>60%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-red-500 rounded" />
                      <span>80%+</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {viewMode === 'timeline' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Trend Timeline: {selectedTrend.topic}
                  </CardTitle>
                  <CardDescription>
                    Evolution of trend intensity over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {timelineData.map((point, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className="text-sm text-muted-foreground w-20">
                          {new Date(point.date).toLocaleDateString()}
                        </div>
                        <div className="flex-1 relative">
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${getIntensityColor(point.intensity)}`}
                              style={{ width: `${point.intensity}%` }}
                            />
                          </div>
                        </div>
                        <div className="text-sm font-medium w-12">
                          {point.intensity}%
                        </div>
                        <div className="w-6">
                          {index > 0 && (
                            <>
                              {point.intensity > timelineData[index - 1].intensity && <ArrowUp className="w-4 h-4 text-green-500" />}
                              {point.intensity < timelineData[index - 1].intensity && <ArrowDown className="w-4 h-4 text-red-500" />}
                              {point.intensity === timelineData[index - 1].intensity && <Minus className="w-4 h-4 text-gray-500" />}
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {viewMode === 'comparison' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Trend Comparison
                  </CardTitle>
                  <CardDescription>
                    Compare intensity across different trends
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {mockTrends.map((trend) => (
                      <div key={trend.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium">{trend.topic}</h4>
                          <span className="text-sm text-muted-foreground">{trend.intensity}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                          <div 
                            className={`h-3 rounded-full ${getIntensityColor(trend.intensity)}`}
                            style={{ width: `${trend.intensity}%` }}
                          />
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Active in {trend.counties.length} counties • {trend.timeframe}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Related Documents */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Related Documents</CardTitle>
                <CardDescription>
                  Documents contributing to this trend
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {selectedTrend.documents.map((docId) => {
                    const doc = mockDocuments.find(d => d.id === docId);
                    if (!doc) return null;
                    
                    const county = mockCounties.find(c => c.id === doc.countyId);
                    
                    return (
                      <div key={doc.id} className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                        <h4 className="text-sm font-medium mb-1">{doc.title}</h4>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {county?.name} County
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(doc.date).toLocaleDateString()}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {doc.type}
                          </Badge>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
