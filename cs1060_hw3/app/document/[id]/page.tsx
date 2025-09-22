"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft,
  Download, 
  Share, 
  Bookmark,
  Eye,
  FileText,
  MapPin,
  Calendar,
  Search,
  Highlighter,
  ZoomIn,
  ZoomOut
} from "lucide-react";
import { mockCounties, mockDocuments } from "@/lib/mock-data";
import Link from "next/link";

interface DocumentViewerProps {
  params: Promise<{ id: string }>;
}

export default function DocumentViewer({ params }: DocumentViewerProps) {
  const [viewMode, setViewMode] = useState<'split' | 'pdf' | 'text'>('split');
  const [highlightKeywords, setHighlightKeywords] = useState(true);
  const [id, setId] = useState<string>('');

  // Extract id from params Promise
  useEffect(() => {
    params.then(({ id: paramId }) => setId(paramId));
  }, [params]);

  // Show loading state while id is being resolved
  if (!id) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  // Mock document - in a real app this would be fetched based on the ID
  const document = mockDocuments.find(doc => doc.id === id) || mockDocuments[0];
  const county = mockCounties.find(c => c.id === document.countyId);

  // Mock related documents
  const relatedDocuments = mockDocuments.filter(doc => 
    doc.id !== document.id && 
    (doc.countyId === document.countyId || 
     doc.topics.some(topic => document.topics.includes(topic)))
  ).slice(0, 3);

  const highlightText = (text: string, keywords: string[]) => {
    if (!highlightKeywords) return text;
    
    let highlightedText = text;
    keywords.forEach(keyword => {
      const regex = new RegExp(`(${keyword})`, 'gi');
      highlightedText = highlightedText.replace(regex, '<mark class="bg-yellow-200 dark:bg-yellow-800">$1</mark>');
    });
    return highlightedText;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Link href="/search" className="flex items-center gap-2 hover:underline">
                <ArrowLeft className="w-4 h-4" />
                Back to Search
              </Link>
              <div className="w-px h-6 bg-border" />
              <Link href="/dashboard" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">CP</span>
                </div>
                <span className="font-semibold">CivicPulse</span>
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Bookmark className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button variant="outline" size="sm">
                <Share className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Document Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-3">{document.title}</h1>
              <div className="flex items-center gap-6 text-sm text-muted-foreground mb-4">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {county?.name} County, {county?.state}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(document.date).toLocaleDateString()}
                </span>
                <span className="flex items-center gap-1">
                  <FileText className="w-4 h-4" />
                  {document.type}
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  OCR Quality: {document.ocrQuality}%
                </span>
              </div>
            </div>
            <Badge variant="outline" className="text-sm">
              Status: {document.processingStatus}
            </Badge>
          </div>

          {/* Keywords */}
          <div className="flex flex-wrap gap-2 mb-6">
            {document.keywords.map((keyword, index) => (
              <Badge key={index} variant="secondary">
                {keyword}
              </Badge>
            ))}
          </div>

          {/* View Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'split' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('split')}
              >
                Split View
              </Button>
              <Button
                variant={viewMode === 'pdf' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('pdf')}
              >
                PDF Only
              </Button>
              <Button
                variant={viewMode === 'text' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('text')}
              >
                Text Only
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={highlightKeywords ? 'default' : 'outline'}
                size="sm"
                onClick={() => setHighlightKeywords(!highlightKeywords)}
              >
                <Highlighter className="w-4 h-4 mr-2" />
                Highlight Keywords
              </Button>
              <Button variant="outline" size="sm">
                <ZoomOut className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <ZoomIn className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Document View */}
          <div className="lg:col-span-3">
            {viewMode === 'split' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* PDF View */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Original Document</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8 min-h-[600px] flex items-center justify-center">
                      <div className="text-center">
                        <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">PDF Viewer</p>
                        <p className="text-sm text-muted-foreground mt-2">
                          In a real implementation, this would show the actual PDF document
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Text View */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Extracted Text</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-sm max-w-none">
                      <div 
                        dangerouslySetInnerHTML={{
                          __html: highlightText(document.extractedText, document.keywords)
                        }}
                        className="whitespace-pre-wrap text-sm leading-relaxed"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {viewMode === 'pdf' && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Original Document</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8 min-h-[800px] flex items-center justify-center">
                    <div className="text-center">
                      <FileText className="w-24 h-24 text-muted-foreground mx-auto mb-4" />
                      <p className="text-lg text-muted-foreground">PDF Viewer</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        In a real implementation, this would show the actual PDF document
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {viewMode === 'text' && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Extracted Text</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none">
                    <div 
                      dangerouslySetInnerHTML={{
                        __html: highlightText(document.extractedText, document.keywords)
                      }}
                      className="whitespace-pre-wrap leading-relaxed"
                    />
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Document Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Document Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label className="text-sm font-medium">Processing Status</Label>
                  <p className="text-sm text-muted-foreground capitalize">{document.processingStatus}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">OCR Quality</Label>
                  <p className="text-sm text-muted-foreground">{document.ocrQuality}%</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Topics</Label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {document.topics.map((topic, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {topic.replace('_', ' ')}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Related Documents */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Related Documents</CardTitle>
                <CardDescription>
                  Also discussed in other jurisdictions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* Historical Context Alert */}
                <div className="p-3 bg-blue-50 dark:bg-blue-950 border border-blue-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                    <div>
                      <h4 className="text-sm font-medium text-blue-800 dark:text-blue-200">
                        Historical Context Found
                      </h4>
                      <p className="text-xs text-blue-600 dark:text-blue-300 mt-1">
                        Sedgwick County debated this one year ago; Ordinance passed in Sedgwick County in 2022
                      </p>
                    </div>
                  </div>
                </div>
                
                {relatedDocuments.map((relatedDoc) => (
                  <div key={relatedDoc.id} className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                    <h4 className="text-sm font-medium mb-1">{relatedDoc.title}</h4>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {mockCounties.find(c => c.id === relatedDoc.countyId)?.name} County
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(relatedDoc.date).toLocaleDateString()}
                      </div>
                      {/* Show if this is a historical precedent */}
                      {relatedDoc.countyId === '2' && (
                        <div className="flex items-center gap-1 text-blue-600">
                          <span className="w-2 h-2 bg-blue-500 rounded-full" />
                          <span className="text-xs">Historical precedent - Ordinance passed 2022</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Search className="w-4 h-4 mr-2" />
                  Search Similar
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Bookmark className="w-4 h-4 mr-2" />
                  Add to Watchlist
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <FileText className="w-4 h-4 mr-2" />
                  Create Brief
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}
