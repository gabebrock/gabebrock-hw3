"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Newspaper, Target, Users, Code, ArrowRight, Check } from "lucide-react";
import { useRouter } from "next/navigation";

const userTypes = [
  {
    id: "reporter",
    title: "Reporter",
    description: "Track breaking stories and policy changes across jurisdictions",
    icon: Newspaper,
    features: [
      "Beat-specific alerts",
      "Geographic trend mapping",
      "Export tools for articles",
      "Source citation management"
    ],
    example: "John covers education policy and needs early alerts on school board decisions"
  },

];

export function UserTypeSelection() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const router = useRouter();

  const handleContinue = () => {
    if (selectedType) {
      // In a real app, you'd save the user type to the database/context
      router.push('/dashboard');
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Choose Your User Type</h2>
        <p className="text-lg text-muted-foreground">
          Walk through how Reporters can use CivicPulse
        </p>
      </div>
      
      <div className="flex justify-center mb-8">
        <div className="w-full max-w-md">
        {userTypes.map((type) => {
          const Icon = type.icon;
          const isSelected = selectedType === type.id;
          
          return (
            <Card 
              key={type.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                isSelected ? 'ring-2 ring-blue-500 shadow-lg' : ''
              }`}
              onClick={() => setSelectedType(type.id)}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      isSelected ? 'bg-blue-500' : 'bg-muted'
                    }`}>
                      <Icon className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-muted-foreground'}`} />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{type.title}</CardTitle>
                    </div>
                  </div>
                  {isSelected && (
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
                <CardDescription className="text-sm">
                  {type.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {type.features.map((feature, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground italic">
                    Example: {type.example}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
        </div>
      </div>

      {selectedType && (
        <div className="text-center">
          <Button size="lg" className="gap-2" onClick={handleContinue}>
            Continue as {userTypes.find(t => t.id === selectedType)?.title}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
