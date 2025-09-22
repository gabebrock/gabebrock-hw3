export interface County {
  id: string;
  name: string;
  state: string;
  population: number;
  coordinates: [number, number]; // [lat, lng]
}

export interface Meeting {
  id: string;
  countyId: string;
  title: string;
  date: string;
  type: 'county_commission' | 'school_board' | 'city_council' | 'planning_commission';
  status: 'upcoming' | 'completed' | 'cancelled';
  agendaUrl?: string;
  minutesUrl?: string;
}

export interface Document {
  id: string;
  meetingId: string;
  countyId: string;
  title: string;
  type: 'agenda' | 'minutes' | 'resolution' | 'ordinance';
  date: string;
  content: string;
  extractedText: string;
  topics: string[];
  keywords: string[];
  relevanceScore?: number;
  processingStatus: 'pending' | 'processing' | 'completed' | 'error';
  ocrQuality?: number;
}

export interface Alert {
  id: string;
  userId: string;
  keywords: string[];
  counties: string[];
  topics: string[];
  frequency: 'immediate' | 'daily' | 'weekly';
  isActive: boolean;
  lastTriggered?: string;
}

export interface Trend {
  id: string;
  topic: string;
  keywords: string[];
  intensity: number; // 0-100
  counties: { countyId: string; intensity: number }[];
  timeframe: string;
  documents: string[];
}

// Mock Kansas Counties
export const mockCounties: County[] = [
  { id: '1', name: 'Johnson', state: 'KS', population: 609863, coordinates: [38.8339, -94.8022] },
  { id: '2', name: 'Sedgwick', state: 'KS', population: 523824, coordinates: [37.6922, -97.3375] },
  { id: '3', name: 'Shawnee', state: 'KS', population: 178909, coordinates: [39.0473, -95.6890] },
  { id: '4', name: 'Wyandotte', state: 'KS', population: 165429, coordinates: [39.1142, -94.6275] },
  { id: '5', name: 'Douglas', state: 'KS', population: 118785, coordinates: [38.9517, -95.2353] },
  { id: '6', name: 'Leavenworth', state: 'KS', population: 81881, coordinates: [39.3111, -94.9222] },
  { id: '7', name: 'Butler', state: 'KS', population: 67380, coordinates: [37.6947, -96.8389] },
  { id: '8', name: 'Reno', state: 'KS', population: 61898, coordinates: [37.9642, -98.1292] },
  { id: '9', name: 'Saline', state: 'KS', population: 54303, coordinates: [38.8403, -97.6114] },
  { id: '10', name: 'Riley', state: 'KS', population: 71959, coordinates: [39.1836, -96.5717] }
];

// Mock Meetings
export const mockMeetings: Meeting[] = [
  {
    id: '1',
    countyId: '1',
    title: 'Johnson County School Board Regular Meeting',
    date: '2024-09-25T19:00:00Z',
    type: 'school_board',
    status: 'upcoming',
    agendaUrl: '/documents/johnson-school-board-agenda-092524.pdf'
  },
  {
    id: '2',
    countyId: '2',
    title: 'Sedgwick County Commission Meeting',
    date: '2024-09-23T09:00:00Z',
    type: 'county_commission',
    status: 'completed',
    agendaUrl: '/documents/sedgwick-commission-agenda-092324.pdf',
    minutesUrl: '/documents/sedgwick-commission-minutes-092324.pdf'
  },
  {
    id: '3',
    countyId: '1',
    title: 'Overland Park City Council Meeting',
    date: '2024-09-20T19:30:00Z',
    type: 'city_council',
    status: 'completed',
    minutesUrl: '/documents/overland-park-minutes-092024.pdf'
  }
];

// Mock Documents with realistic municipal content
export const mockDocuments: Document[] = [
  {
    id: '1',
    meetingId: '1',
    countyId: '1',
    title: 'Cell Phone Policy Discussion - Johnson County Schools',
    type: 'agenda',
    date: '2024-09-25T19:00:00Z',
    content: 'Agenda Item 4.2: Discussion of proposed cell phone restrictions during school hours...',
    extractedText: `JOHNSON COUNTY SCHOOL BOARD
    
AGENDA ITEM 4.2: Cell Phone Policy Revision

The administration recommends implementing a district-wide cell phone restriction policy during instructional hours. This policy would require students to store cell phones in designated pouches or lockers during class time.

Key considerations:
- Student safety and emergency communication
- Impact on learning environment
- Enforcement mechanisms
- Parent communication protocols
- Implementation timeline: January 2025

Similar policies have been adopted in neighboring districts with positive results in student engagement and academic performance.`,
    topics: ['education', 'technology', 'student_policy'],
    keywords: ['cell phone', 'ban', 'restriction', 'student policy', 'education'],
    processingStatus: 'completed',
    ocrQuality: 95
  },
  {
    id: '2',
    meetingId: '2',
    countyId: '2',
    title: 'Renewable Energy Zoning Amendment',
    type: 'resolution',
    date: '2024-09-23T09:00:00Z',
    content: 'Resolution 2024-089: Amending zoning regulations for solar energy installations...',
    extractedText: `SEDGWICK COUNTY COMMISSION
    
RESOLUTION 2024-089: Solar Energy Zoning Amendment

WHEREAS, the County recognizes the importance of renewable energy development;
WHEREAS, current zoning regulations do not adequately address utility-scale solar installations;

NOW THEREFORE, BE IT RESOLVED that the Sedgwick County Zoning Regulations are hereby amended to:

1. Create a new Solar Energy Overlay District
2. Establish setback requirements of 100 feet from residential properties
3. Require decommissioning bonds for utility-scale projects
4. Mandate native vegetation screening along property boundaries

The amendment addresses concerns raised by rural residents while promoting clean energy development. Staff estimates this could facilitate up to 500 MW of new solar capacity over the next five years.`,
    topics: ['renewable_energy', 'zoning', 'solar', 'development'],
    keywords: ['solar', 'renewable energy', 'zoning', 'utility scale', 'setbacks'],
    processingStatus: 'completed',
    ocrQuality: 92
  },
  {
    id: '3',
    meetingId: '3',
    countyId: '1',
    title: 'Transit Development District Proposal',
    type: 'minutes',
    date: '2024-09-20T19:30:00Z',
    content: 'Discussion of proposed Bus Rapid Transit corridor along Metcalf Avenue...',
    extractedText: `OVERLAND PARK CITY COUNCIL MINUTES
    
ITEM 7: Transit Development District - Metcalf Avenue BRT

Council Member Johnson presented the staff report on the proposed Transit Development District (TDD) for the Metcalf Avenue Bus Rapid Transit corridor.

Key points discussed:
- 12-mile corridor from downtown Kansas City to College Boulevard
- Estimated cost: $180 million
- Federal funding commitment: $90 million (50%)
- Local match requirement: $90 million over 10 years
- Projected ridership: 8,500 daily passengers by 2030

Public comments:
- Business owners expressed concerns about construction impacts
- Transit advocates emphasized regional connectivity benefits
- Residents questioned property tax implications

Motion by Council Member Smith, seconded by Council Member Davis, to approve the TDD formation and authorize staff to begin federal grant applications. Motion passed 6-2.`,
    topics: ['transit', 'development', 'funding', 'infrastructure'],
    keywords: ['bus rapid transit', 'BRT', 'transit', 'federal funding', 'development district'],
    processingStatus: 'completed',
    ocrQuality: 88
  }
];

// Mock Trends
export const mockTrends: Trend[] = [
  {
    id: '1',
    topic: 'Cell Phone Bans in Schools',
    keywords: ['cell phone', 'ban', 'restriction', 'school policy'],
    intensity: 85,
    counties: [
      { countyId: '1', intensity: 90 },
      { countyId: '3', intensity: 75 },
      { countyId: '5', intensity: 80 }
    ],
    timeframe: 'Last 30 days',
    documents: ['1']
  },
  {
    id: '2',
    topic: 'Solar Energy Development',
    keywords: ['solar', 'renewable energy', 'zoning', 'utility scale'],
    intensity: 72,
    counties: [
      { countyId: '2', intensity: 85 },
      { countyId: '8', intensity: 65 },
      { countyId: '7', intensity: 70 }
    ],
    timeframe: 'Last 60 days',
    documents: ['2']
  },
  {
    id: '3',
    topic: 'Transit Development',
    keywords: ['transit', 'BRT', 'bus rapid transit', 'development district'],
    intensity: 68,
    counties: [
      { countyId: '1', intensity: 80 },
      { countyId: '4', intensity: 60 },
      { countyId: '6', intensity: 65 }
    ],
    timeframe: 'Last 45 days',
    documents: ['3']
  }
];

// Mock Alerts
export const mockAlerts: Alert[] = [
  {
    id: '1',
    userId: 'user1',
    keywords: ['cell phone', 'ban', 'education'],
    counties: ['1', '3', '5'],
    topics: ['education'],
    frequency: 'immediate',
    isActive: true,
    lastTriggered: '2024-09-22T10:30:00Z'
  },
  {
    id: '2',
    userId: 'user2',
    keywords: ['renewable energy', 'solar', 'wind'],
    counties: ['2', '7', '8'],
    topics: ['renewable_energy'],
    frequency: 'daily',
    isActive: true,
    lastTriggered: '2024-09-21T08:00:00Z'
  }
];
