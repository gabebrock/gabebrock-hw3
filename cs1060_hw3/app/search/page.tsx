"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Search, 
  Filter, 
  Calendar, 
  MapPin, 
  FileText, 
  Clock,
  TrendingUp,
  Eye,
  Download,
  Share
} from "lucide-react";
import { mockCounties, mockDocuments, Document } from "@/lib/mock-data";
import Link from "next/link";

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCounties, setSelectedCounties] = useState<string[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedDocTypes, setSelectedDocTypes] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [showFilters, setShowFilters] = useState(false);

  // Mock search results - in a real app this would be filtered based on the search criteria
  const [searchResults, setSearchResults] = useState<Document[]>(mockDocuments);

  const topics = ["education", "renewable_energy", "transit", "housing", "development", "zoning"];
  const docTypes = ["agenda", "minutes", "resolution", "ordinance"];

  const handleSearch = () => {
    // Mock search logic - in a real app this would query the backend
    let filtered = mockDocuments;
    
    if (searchQuery) {
      filtered = filtered.filter(doc => 
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.extractedText.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.keywords.some(keyword => keyword.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    if (selectedCounties.length > 0) {
      filtered = filtered.filter(doc => selectedCounties.includes(doc.countyId));
    }
    
    if (selectedTopics.length > 0) {
      filtered = filtered.filter(doc => 
        doc.topics.some(topic => selectedTopics.includes(topic))
      );
    }
    
    if (selectedDocTypes.length > 0) {
      filtered = filtered.filter(doc => selectedDocTypes.includes(doc.type));
    }
    
    setSearchResults(filtered);
  };

  const handleCountyChange = (countyId: string, checked: boolean) => {
    if (checked) {
      setSelectedCounties([...selectedCounties, countyId]);
    } else {
      setSelectedCounties(selectedCounties.filter(id => id !== countyId));
    }
  };

  const handleTopicChange = (topic: string, checked: boolean) => {
    if (checked) {
      setSelectedTopics([...selectedTopics, topic]);
    } else {
      setSelectedTopics(selectedTopics.filter(t => t !== topic));
    }
  };

  const handleDocTypeChange = (docType: string, checked: boolean) => {
    if (checked) {
      setSelectedDocTypes([...selectedDocTypes, docType]);
    } else {
      setSelectedDocTypes(selectedDocTypes.filter(t => t !== docType));
    }
  };

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
              <Link href="/search" className="text-sm font-medium">Search</Link>
              <Link href="/trends" className="text-sm hover:underline">Trends</Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Search Municipal Documents</h1>
          <p className="text-muted-foreground mb-6">
            Find agendas, minutes, resolutions, and ordinances across Kansas counties
          </p>
          
          {/* Main Search Bar */}
          <div className="flex gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search for keywords, topics, or specific issues..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <Button onClick={handleSearch}>Search</Button>
            <Button 
              variant="outline" 
              onClick={() => setShowFilters(!showFilters)}
              className="gap-2"
            >
              <Filter className="w-4 h-4" />
              Filters
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:col-span-1 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Counties */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">Counties</Label>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {mockCounties.slice(0, 6).map((county) => (
                      <div key={county.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`county-${county.id}`}
                          checked={selectedCounties.includes(county.id)}
                          onCheckedChange={(checked) => handleCountyChange(county.id, checked as boolean)}
                        />
                        <Label htmlFor={`county-${county.id}`} className="text-sm">
                          {county.name} County
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Topics */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">Topics</Label>
                  <div className="space-y-2">
                    {topics.map((topic) => (
                      <div key={topic} className="flex items-center space-x-2">
                        <Checkbox
                          id={`topic-${topic}`}
                          checked={selectedTopics.includes(topic)}
                          onCheckedChange={(checked) => handleTopicChange(topic, checked as boolean)}
                        />
                        <Label htmlFor={`topic-${topic}`} className="text-sm capitalize">
                          {topic.replace('_', ' ')}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Document Types */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">Document Type</Label>
                  <div className="space-y-2">
                    {docTypes.map((docType) => (
                      <div key={docType} className="flex items-center space-x-2">
                        <Checkbox
                          id={`doctype-${docType}`}
                          checked={selectedDocTypes.includes(docType)}
                          onCheckedChange={(checked) => handleDocTypeChange(docType, checked as boolean)}
                        />
                        <Label htmlFor={`doctype-${docType}`} className="text-sm capitalize">
                          {docType}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Date Range */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">Date Range</Label>
                  <div className="space-y-2">
                    <Input
                      type="date"
                      placeholder="Start date"
                      value={dateRange.start}
                      onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                    />
                    <Input
                      type="date"
                      placeholder="End date"
                      value={dateRange.end}
                      onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                    />
                  </div>
                </div>

                <Button variant="outline" className="w-full" onClick={() => {
                  setSelectedCounties([]);
                  setSelectedTopics([]);
                  setSelectedDocTypes([]);
                  setDateRange({ start: "", end: "" });
                  setSearchQuery("");
                  setSearchResults(mockDocuments);
                }}>
                  Clear All Filters
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Search Results */}
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-semibold">Search Results</h2>
                <p className="text-sm text-muted-foreground">
                  Found {searchResults.length} documents
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
                <Button variant="outline" size="sm">
                  <Share className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {searchResults.map((doc) => (
                <Card key={doc.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <Link href={`/document/${doc.id}`}>
                          <h3 className="text-lg font-medium mb-2 hover:text-blue-600 cursor-pointer">
                            {doc.title}
                          </h3>
                        </Link>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {mockCounties.find(c => c.id === doc.countyId)?.name} County
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(doc.date).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <FileText className="w-3 h-3" />
                            OCR: {doc.ocrQuality}%
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {doc.type}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Link href={`/document/${doc.id}`}>
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {doc.extractedText.substring(0, 300)}...
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      {doc.keywords.slice(0, 5).map((keyword, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        {doc.topics.map((topic, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {topic.replace('_', ' ')}
                          </Badge>
                        ))}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Processing: {doc.processingStatus}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {searchResults.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No results found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search terms or filters
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
