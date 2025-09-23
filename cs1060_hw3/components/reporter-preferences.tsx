"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, Plus, X } from "lucide-react";
import { useRouter } from "next/navigation";

const predefinedTopics = [
  "Education", "Public Schools", "Cell Phone Policy", "Curriculum", "Book Policy",
  "Renewable Energy", "Solar Development", "Transit", "Housing", "Zoning"
];

const states = ["Kansas", "Missouri", "Iowa", "Nebraska", "Oklahoma", "Colorado"];

export function ReporterPreferences() {
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  const [customKeywords, setCustomKeywords] = useState<string[]>([]);
  const [newKeyword, setNewKeyword] = useState("");
  const router = useRouter();

  const handleTopicChange = (topic: string, checked: boolean) => {
    if (checked) {
      setSelectedTopics([...selectedTopics, topic]);
    } else {
      setSelectedTopics(selectedTopics.filter(t => t !== topic));
    }
  };

  const handleStateChange = (state: string, checked: boolean) => {
    if (checked) {
      setSelectedStates([...selectedStates, state]);
    } else {
      setSelectedStates(selectedStates.filter(s => s !== state));
    }
  };

  const addKeyword = () => {
    if (newKeyword.trim() && !customKeywords.includes(newKeyword.trim())) {
      setCustomKeywords([...customKeywords, newKeyword.trim()]);
      setNewKeyword("");
    }
  };

  const removeKeyword = (keyword: string) => {
    setCustomKeywords(customKeywords.filter(k => k !== keyword));
  };

  const handleComplete = () => {
    // In a real app, save preferences to database
    console.log("Saving preferences:", { selectedTopics, selectedStates, customKeywords });
    router.push('/dashboard');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Set Up Your Beat Preferences</h2>
        <p className="text-lg text-muted-foreground">
          Configure your coverage areas and keywords to get personalized alerts
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Topics */}
        <Card>
          <CardHeader>
            <CardTitle>Coverage Areas</CardTitle>
            <CardDescription>
              Select the topics you cover for your beat
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {predefinedTopics.map((topic) => (
              <div key={topic} className="flex items-center space-x-2">
                <Checkbox
                  id={`topic-${topic}`}
                  checked={selectedTopics.includes(topic)}
                  onCheckedChange={(checked) => handleTopicChange(topic, checked as boolean)}
                />
                <Label htmlFor={`topic-${topic}`} className="text-sm">
                  {topic}
                </Label>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* States */}
        <Card>
          <CardHeader>
            <CardTitle>Geographic Coverage</CardTitle>
            <CardDescription>
              Select states you want to monitor
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {states.map((state) => (
              <div key={state} className="flex items-center space-x-2">
                <Checkbox
                  id={`state-${state}`}
                  checked={selectedStates.includes(state)}
                  onCheckedChange={(checked) => handleStateChange(state, checked as boolean)}
                />
                <Label htmlFor={`state-${state}`} className="text-sm">
                  {state}
                </Label>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Keywords */}
      <Card>
        <CardHeader>
          <CardTitle>Custom Keywords (Like Google Alerts)</CardTitle>
          <CardDescription>
            Add specific terms you want to track across documents
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="e.g., cell phone ban, curriculum review..."
              value={newKeyword}
              onChange={(e) => setNewKeyword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addKeyword()}
            />
            <Button onClick={addKeyword} size="sm">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          
          {customKeywords.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {customKeywords.map((keyword) => (
                <Badge key={keyword} variant="secondary" className="gap-1">
                  {keyword}
                  <X 
                    className="w-3 h-3 cursor-pointer hover:text-red-500" 
                    onClick={() => removeKeyword(keyword)}
                  />
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Suggested Keywords for John */}
      <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950">
        <CardHeader>
          <CardTitle className="text-blue-800 dark:text-blue-200">
            Suggested for Education Beat
          </CardTitle>
          <CardDescription className="text-blue-600 dark:text-blue-300">
            Popular keywords for education reporters
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {["cell phone ban", "curriculum", "book policy", "school board", "superintendent", "budget cuts"].map((suggestion) => (
              <Button
                key={suggestion}
                variant="outline"
                size="sm"
                onClick={() => {
                  if (!customKeywords.includes(suggestion)) {
                    setCustomKeywords([...customKeywords, suggestion]);
                  }
                }}
                className="text-xs"
              >
                + {suggestion}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Complete Setup */}
      <div className="text-center">
        <Button 
          size="lg" 
          onClick={handleComplete}
          disabled={selectedTopics.length === 0 || selectedStates.length === 0}
          className="gap-2"
        >
          Complete Setup & Go to Dashboard
          <ArrowRight className="w-4 h-4" />
        </Button>
        <p className="text-sm text-muted-foreground mt-2">
          You can modify these preferences anytime in your account settings
        </p>
      </div>
    </div>
  );
}
