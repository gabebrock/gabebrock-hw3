"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  User,
  Settings,
  Bell,
  MapPin,
  Calendar,
  TrendingUp,
  Edit,
  Save,
  X,
  Plus,
  Eye,
  Download,
  Bookmark,
  Search
} from "lucide-react";
import { mockCounties, mockDocuments } from "@/lib/mock-data";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface UserData {
  id: string;
  name: string;
  email: string;
  type: string;
  preferences: {
    topics: string[];
    states: string[];
    keywords: string[];
  };
  loginTime: string;
  accountCreated?: string;
  lastActive?: string;
  savedItems?: string[]; // Array of document IDs
}

export default function AccountPage() {
  const [user, setUser] = useState<UserData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<UserData | null>(null);
  const [newKeyword, setNewKeyword] = useState("");
  const router = useRouter();

  const predefinedTopics = [
    "Education", "Public Schools", "Cell Phone Policy", "Curriculum", "Book Policy",
    "Renewable Energy", "Solar Development", "Transit", "Housing", "Zoning"
  ];

  const states = ["Kansas", "Missouri", "Iowa", "Nebraska", "Oklahoma", "Colorado"];

  useEffect(() => {
    try {
      const userData = localStorage.getItem('civicpulse_user');
      if (userData) {
      const parsedUser = JSON.parse(userData);
      // Add some additional account info for John
      const enhancedUser = {
        ...parsedUser,
        accountCreated: '2024-08-15T10:30:00Z',
        lastActive: new Date().toISOString()
      };
      setUser(enhancedUser);
      setEditedUser(enhancedUser);
    } else {
      // Create a default John Reporter user if none exists
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
        accountCreated: '2024-08-15T10:30:00Z',
        lastActive: new Date().toISOString(),
        savedItems: [] // Initialize empty saved items
      };
      
        // Save to localStorage and set state
        localStorage.setItem('civicpulse_user', JSON.stringify(defaultUser));
        setUser(defaultUser);
        setEditedUser(defaultUser);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      // Create minimal fallback user
      const fallbackUser = {
        id: 'fallback_user',
        name: 'John Reporter',
        email: 'john@newsroom.com',
        type: 'reporter',
        preferences: { topics: [], states: [], keywords: [] },
        loginTime: new Date().toISOString(),
        accountCreated: '2024-08-15T10:30:00Z',
        lastActive: new Date().toISOString(),
        savedItems: []
      };
      setUser(fallbackUser);
      setEditedUser(fallbackUser);
    }
  }, [router]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedUser({ ...user! });
  };

  const handleSave = () => {
    if (editedUser) {
      try {
        localStorage.setItem('civicpulse_user', JSON.stringify(editedUser));
        setUser(editedUser);
        setIsEditing(false);
      } catch (error) {
        console.error('Error saving user data:', error);
        alert('Failed to save changes. Please try again.');
      }
    }
  };

  const handleCancel = () => {
    setEditedUser({ ...user! });
    setIsEditing(false);
  };

  const handleTopicChange = (topic: string, checked: boolean) => {
    if (!editedUser) return;
    
    const updatedTopics = checked 
      ? [...editedUser.preferences.topics, topic]
      : editedUser.preferences.topics.filter(t => t !== topic);
    
    setEditedUser({
      ...editedUser,
      preferences: {
        ...editedUser.preferences,
        topics: updatedTopics
      }
    });
  };

  const handleStateChange = (state: string, checked: boolean) => {
    if (!editedUser) return;
    
    const updatedStates = checked 
      ? [...editedUser.preferences.states, state]
      : editedUser.preferences.states.filter(s => s !== state);
    
    setEditedUser({
      ...editedUser,
      preferences: {
        ...editedUser.preferences,
        states: updatedStates
      }
    });
  };

  const addKeyword = () => {
    if (!editedUser || !newKeyword.trim()) return;
    
    if (!editedUser.preferences.keywords.includes(newKeyword.trim())) {
      setEditedUser({
        ...editedUser,
        preferences: {
          ...editedUser.preferences,
          keywords: [...editedUser.preferences.keywords, newKeyword.trim()]
        }
      });
      setNewKeyword("");
    }
  };

  const removeKeyword = (keyword: string) => {
    if (!editedUser) return;
    
    setEditedUser({
      ...editedUser,
      preferences: {
        ...editedUser.preferences,
        keywords: editedUser.preferences.keywords.filter(k => k !== keyword)
      }
    });
  };


  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold">CivicPulse</span>
            </Link>
            <nav className="flex items-center gap-4">
              <Link href="/dashboard" className="text-sm hover:underline">Dashboard</Link>
              <Link href="/search" className="text-sm hover:underline">Search</Link>
              <Link href="/trends" className="text-sm hover:underline">Trends</Link>
              <Link href="/account" className="text-sm font-medium">Account</Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Account Settings</h1>
          <p className="text-muted-foreground">
            Manage your profile and customize your CivicPulse experience
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl font-bold">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold">{user.name}</h3>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                  <Badge className="mt-2" variant="secondary">
                    {user.type}
                  </Badge>
                </div>
                
                <div className="space-y-3 pt-4 border-t">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Account Created:</span>
                    <span>{new Date(user.accountCreated!).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Last Active:</span>
                    <span>{new Date(user.lastActive!).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Keywords:</span>
                    <span>{user.preferences.keywords.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Saved Documents:</span>
                    <span>{user.savedItems?.length || 0}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">This Week</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-blue-500" />
                    <span className="text-sm">Alerts Received</span>
                  </div>
                  <span className="font-semibold">23</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Documents Viewed</span>
                  </div>
                  <span className="font-semibold">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Download className="w-4 h-4 text-purple-500" />
                    <span className="text-sm">Reports Exported</span>
                  </div>
                  <span className="font-semibold">3</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preferences */}
          <div className="lg:col-span-2 space-y-6">
            {/* Coverage Areas */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="w-5 h-5" />
                      Coverage Preferences
                    </CardTitle>
                    <CardDescription>
                      Customize what topics and regions you want to monitor
                    </CardDescription>
                  </div>
                  {!isEditing ? (
                    <Button variant="outline" size="sm" onClick={handleEdit}>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={handleCancel}>
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                      </Button>
                      <Button size="sm" onClick={handleSave}>
                        <Save className="w-4 h-4 mr-2" />
                        Save
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Topics */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">Coverage Areas</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {predefinedTopics.map((topic) => (
                      <div key={topic} className="flex items-center space-x-2">
                        <Checkbox
                          id={`topic-${topic}`}
                          checked={isEditing 
                            ? editedUser?.preferences.topics.includes(topic) 
                            : user.preferences.topics.includes(topic)
                          }
                          onCheckedChange={(checked) => handleTopicChange(topic, checked as boolean)}
                          disabled={!isEditing}
                        />
                        <Label htmlFor={`topic-${topic}`} className="text-sm">
                          {topic}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* States */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">Geographic Coverage</Label>
                  <div className="grid grid-cols-3 gap-3">
                    {states.map((state) => (
                      <div key={state} className="flex items-center space-x-2">
                        <Checkbox
                          id={`state-${state}`}
                          checked={isEditing 
                            ? editedUser?.preferences.states.includes(state)
                            : user.preferences.states.includes(state)
                          }
                          onCheckedChange={(checked) => handleStateChange(state, checked as boolean)}
                          disabled={!isEditing}
                        />
                        <Label htmlFor={`state-${state}`} className="text-sm">
                          {state}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Keywords */}
            <Card>
              <CardHeader>
                <CardTitle>Alert Keywords</CardTitle>
                <CardDescription>
                  Manage your custom keywords for targeted alerts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing && (
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add new keyword..."
                      value={newKeyword}
                      onChange={(e) => setNewKeyword(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addKeyword()}
                    />
                    <Button onClick={addKeyword} size="sm">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                )}
                
                <div className="flex flex-wrap gap-2">
                  {(isEditing ? editedUser?.preferences.keywords : user.preferences.keywords)?.map((keyword) => (
                    <Badge key={keyword} variant="secondary" className="gap-1">
                      {keyword}
                      {isEditing && (
                        <X 
                          className="w-3 h-3 cursor-pointer hover:text-red-500" 
                          onClick={() => removeKeyword(keyword)}
                        />
                      )}
                    </Badge>
                  ))}
                </div>

                {!isEditing && user.preferences.keywords.length === 0 && (
                  <p className="text-sm text-muted-foreground italic">
                    No keywords set. Click Edit to add some.
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notification Settings
                </CardTitle>
                <CardDescription>
                  Control how and when you receive alerts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Email Alerts</Label>
                    <p className="text-xs text-muted-foreground">Receive alerts via email</p>
                  </div>
                  <Checkbox defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">High Priority Only</Label>
                    <p className="text-xs text-muted-foreground">Only send high-confidence matches</p>
                  </div>
                  <Checkbox defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Weekly Digest</Label>
                    <p className="text-xs text-muted-foreground">Summary of weekly activity</p>
                  </div>
                  <Checkbox defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Breaking News</Label>
                    <p className="text-xs text-muted-foreground">Immediate alerts for urgent items</p>
                  </div>
                  <Checkbox defaultChecked />
                </div>
              </CardContent>
            </Card>

            {/* Saved Items */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bookmark className="w-5 h-5" />
                  Saved Documents
                </CardTitle>
                <CardDescription>
                  Documents you&apos;ve bookmarked for later reference
                </CardDescription>
              </CardHeader>
              <CardContent>
                {user?.savedItems && user.savedItems.length > 0 ? (
                  <div className="space-y-3">
                    {user.savedItems.map((docId) => {
                      const doc = mockDocuments.find(d => d.id === docId);
                      if (!doc) return null;
                      
                      const county = mockCounties.find(c => c.id === doc.countyId);
                      
                      return (
                        <div key={doc.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                          <Link href={`/document/${doc.id}`}>
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-medium hover:text-blue-600 cursor-pointer">
                                {doc.title}
                              </h4>
                              <Badge variant="outline" className="text-xs">
                                {doc.type}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {county?.name} County
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {new Date(doc.date).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground line-clamp-2">
                              {doc.extractedText.substring(0, 150)}...
                            </p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {doc.keywords.slice(0, 3).map((keyword, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {keyword}
                                </Badge>
                              ))}
                            </div>
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Bookmark className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No saved documents</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Documents you bookmark will appear here for easy access
                    </p>
                    <Link href="/search">
                      <Button variant="outline" size="sm">
                        <Search className="w-4 h-4 mr-2" />
                        Browse Documents
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
