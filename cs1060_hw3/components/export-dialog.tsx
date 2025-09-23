"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Download, 
  FileText, 
  Mail, 
  Link as LinkIcon, 
  Users,
  BarChart3,
  Quote,
  X
} from "lucide-react";

interface ExportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  document: {
    id: string;
    title: string;
    type: string;
    countyId: string;
    keywords: string[];
  };
}

export function ExportDialog({ isOpen, onClose, document }: ExportDialogProps) {
  const [exportType, setExportType] = useState<'summary' | 'full' | 'custom'>('summary');
  const [includeCharts, setIncludeCharts] = useState(true);
  const [includeQuotes, setIncludeQuotes] = useState(true);
  const [includeContext, setIncludeContext] = useState(true);
  const [recipientEmail, setRecipientEmail] = useState("");

  if (!isOpen) return null;

  const handleExport = (format: 'pdf' | 'docx' | 'email' | 'link') => {
    // Mock export functionality
    console.log(`Exporting ${exportType} report as ${format}`, {
      includeCharts,
      includeQuotes,
      includeContext,
      recipientEmail
    });
    
    // Simulate download or sharing
    if (format === 'email') {
      alert(`Report sent to ${recipientEmail}`);
    } else if (format === 'link') {
      navigator.clipboard.writeText(`https://civicpulse.app/shared/${document.id}`);
      alert('Shareable link copied to clipboard');
    } else {
      alert(`Downloading ${format.toUpperCase()} report...`);
    }
    
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-2xl mx-4">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Export Report</CardTitle>
              <CardDescription>
                Create a comprehensive report for your editor or team
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Export Type */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Report Type</Label>
            <div className="grid grid-cols-3 gap-3">
              <Button
                variant={exportType === 'summary' ? 'default' : 'outline'}
                onClick={() => setExportType('summary')}
                className="h-auto p-3 flex-col"
              >
                <FileText className="w-5 h-5 mb-2" />
                <span className="text-xs">Executive Summary</span>
              </Button>
              <Button
                variant={exportType === 'full' ? 'default' : 'outline'}
                onClick={() => setExportType('full')}
                className="h-auto p-3 flex-col"
              >
                <Quote className="w-5 h-5 mb-2" />
                <span className="text-xs">Full Report</span>
              </Button>
              <Button
                variant={exportType === 'custom' ? 'default' : 'outline'}
                onClick={() => setExportType('custom')}
                className="h-auto p-3 flex-col"
              >
                <BarChart3 className="w-5 h-5 mb-2" />
                <span className="text-xs">Custom Brief</span>
              </Button>
            </div>
          </div>

          {/* Include Options */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Include in Report</Label>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="charts"
                  checked={includeCharts}
                  onCheckedChange={(checked) => setIncludeCharts(checked as boolean)}
                />
                <Label htmlFor="charts" className="text-sm">
                  Trend charts and heatmap visualizations
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="quotes"
                  checked={includeQuotes}
                  onCheckedChange={(checked) => setIncludeQuotes(checked as boolean)}
                />
                <Label htmlFor="quotes" className="text-sm">
                  Key snippets and quotes from documents
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="context"
                  checked={includeContext}
                  onCheckedChange={(checked) => setIncludeContext(checked as boolean)}
                />
                <Label htmlFor="context" className="text-sm">
                  Historical context and related discussions
                </Label>
              </div>
            </div>
          </div>

          {/* Preview */}
          <Card className="bg-muted/50">
            <CardHeader>
              <CardTitle className="text-sm">Report Preview</CardTitle>
            </CardHeader>
            <CardContent className="text-xs space-y-2">
              <div className="font-medium">Cell Phone Policy Trends - Johnson County Analysis</div>
              <div className="text-muted-foreground">
                • Executive summary of policy discussions<br/>
                • 3 key counties showing similar trends<br/>
                • Historical precedent from Sedgwick County (2022)<br/>
                {includeCharts && "• Trend intensity heatmap\n"}
                {includeQuotes && "• 5 key quotes from meeting minutes\n"}
                {includeContext && "• Cross-jurisdictional comparison\n"}
              </div>
            </CardContent>
          </Card>

          {/* Export Options */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium mb-2 block">Download</Label>
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start" 
                  onClick={() => handleExport('pdf')}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => handleExport('docx')}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Download Word Doc
                </Button>
              </div>
            </div>
            
            <div>
              <Label className="text-sm font-medium mb-2 block">Share</Label>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    placeholder="editor@newsroom.com"
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                    className="text-xs"
                  />
                  <Button 
                    size="sm"
                    onClick={() => handleExport('email')}
                    disabled={!recipientEmail}
                  >
                    <Mail className="w-4 h-4" />
                  </Button>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => handleExport('link')}
                >
                  <LinkIcon className="w-4 h-4 mr-2" />
                  Copy Share Link
                </Button>
              </div>
            </div>
          </div>

          {/* Team Collaboration */}
          <Card className="border-green-200 bg-green-50 dark:bg-green-950">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-green-800 dark:text-green-200">
                <Users className="w-4 h-4" />
                <span className="text-sm font-medium">Team Collaboration</span>
              </div>
              <p className="text-xs text-green-600 dark:text-green-300 mt-1">
                This report will help establish you as the reporter who spotted this trend first during your editorial meeting.
              </p>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}
