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
AGENDA ITEM 4.2: Cell Phone Policy Revision ...`,
    topics: ['education', 'technology', 'student_policy'],
    keywords: ['cell phone', 'ban', 'restriction', 'student policy', 'education'],
    processingStatus: 'completed',
    ocrQuality: 95
  },
  {
    id: '2',
    meetingId: '1',
    countyId: '1',
    title: 'After-School Tutoring Expansion',
    type: 'minutes',
    date: '2024-09-25T19:00:00Z',
    content: 'Board discussion of expanding after-school tutoring programs...',
    extractedText: `MINUTES: Johnson County School Board ...`,
    topics: ['education', 'academic_support'],
    keywords: ['tutoring', 'after school', 'ESSER funds', 'test scores'],
    processingStatus: 'completed',
    ocrQuality: 90
  },
  {
    id: '3',
    meetingId: '2',
    countyId: '2',
    title: 'Teacher Retention Incentives',
    type: 'resolution',
    date: '2024-09-23T09:00:00Z',
    content: 'Resolution 2024-090: Establishing county-level incentives for teacher recruitment and retention...',
    extractedText: `SEDGWICK COUNTY COMMISSION
RESOLUTION 2024-090: Teacher Retention Incentives ...`,
    topics: ['education', 'workforce', 'teacher_recruitment'],
    keywords: ['teacher retention', 'housing stipend', 'incentives'],
    processingStatus: 'completed',
    ocrQuality: 93
  },
  {
    id: '4',
    meetingId: '3',
    countyId: '1',
    title: 'STEM Curriculum Enhancement Proposal',
    type: 'agenda',
    date: '2024-09-20T19:30:00Z',
    content: 'Agenda Item: Proposal to adopt new STEM-focused curriculum modules...',
    extractedText: `OVERLAND PARK CITY COUNCIL ...`,
    topics: ['education', 'STEM', 'curriculum'],
    keywords: ['STEM', 'robotics', 'curriculum', 'coding'],
    processingStatus: 'completed',
    ocrQuality: 92
  },
  {
    id: '5',
    meetingId: '1',
    countyId: '1',
    title: 'Student Mental Health Services Report',
    type: 'minutes',
    date: '2024-09-25T19:00:00Z',
    content: 'Report presented on district mental health initiatives...',
    extractedText: `MINUTES: Johnson County School Board ...`,
    topics: ['education', 'mental_health'],
    keywords: ['mental health', 'counseling', 'telehealth'],
    processingStatus: 'completed',
    ocrQuality: 95
  },

  // --- Environment & Infrastructure ---
  {
    id: '6',
    meetingId: '2',
    countyId: '2',
    title: 'Renewable Energy Zoning Amendment',
    type: 'resolution',
    date: '2024-09-23T09:00:00Z',
    content: 'Resolution 2024-089: Amending zoning regulations for solar energy installations...',
    extractedText: `SEDGWICK COUNTY COMMISSION ...`,
    topics: ['renewable_energy', 'zoning', 'solar'],
    keywords: ['solar', 'renewable energy', 'zoning'],
    processingStatus: 'completed',
    ocrQuality: 92
  },
  {
    id: '7',
    meetingId: '3',
    countyId: '1',
    title: 'Transit Development District Proposal',
    type: 'minutes',
    date: '2024-09-20T19:30:00Z',
    content: 'Discussion of proposed Bus Rapid Transit corridor along Metcalf Avenue...',
    extractedText: `OVERLAND PARK CITY COUNCIL MINUTES ...`,
    topics: ['transit', 'development', 'infrastructure'],
    keywords: ['bus rapid transit', 'transit', 'development district'],
    processingStatus: 'completed',
    ocrQuality: 88
  },
  {
    id: '8',
    meetingId: '2',
    countyId: '2',
    title: 'School Bus Fleet Electrification',
    type: 'agenda',
    date: '2024-09-23T09:00:00Z',
    content: 'Proposal to purchase 10 electric school buses with federal grant support...',
    extractedText: `SEDGWICK COUNTY COMMISSION ...`,
    topics: ['education', 'transportation', 'sustainability'],
    keywords: ['electric buses', 'school transportation'],
    processingStatus: 'completed',
    ocrQuality: 91
  },
  {
    id: '9',
    meetingId: '2',
    countyId: '2',
    title: 'County Road Repair Bond Issue',
    type: 'ordinance',
    date: '2024-09-23T09:00:00Z',
    content: 'Bond proposal for $25M to repair and repave county roads...',
    extractedText: `SEDGWICK COUNTY COMMISSION
ORDINANCE 2024-11: Road Repair Bond ...`,
    topics: ['infrastructure', 'transportation', 'funding'],
    keywords: ['road repair', 'bond', 'infrastructure'],
    processingStatus: 'completed',
    ocrQuality: 89
  },

  // --- Housing & Development ---
  {
    id: '10',
    meetingId: '3',
    countyId: '1',
    title: 'Affordable Housing Incentive Program',
    type: 'resolution',
    date: '2024-09-20T19:30:00Z',
    content: 'Resolution to expand property tax abatements for affordable housing developments...',
    extractedText: `OVERLAND PARK CITY COUNCIL
RESOLUTION 2024-15: Affordable Housing Incentives ...`,
    topics: ['housing', 'development'],
    keywords: ['affordable housing', 'incentives', 'property tax'],
    processingStatus: 'completed',
    ocrQuality: 90
  },
  {
    id: '11',
    meetingId: '2',
    countyId: '2',
    title: 'Downtown Redevelopment Master Plan',
    type: 'agenda',
    date: '2024-09-23T09:00:00Z',
    content: 'Presentation of proposed redevelopment plan for downtown Wichita...',
    extractedText: `SEDGWICK COUNTY COMMISSION
AGENDA ITEM: Redevelopment Master Plan ...`,
    topics: ['development', 'urban_planning'],
    keywords: ['redevelopment', 'master plan', 'downtown'],
    processingStatus: 'completed',
    ocrQuality: 92
  },

  // --- Public Health ---
  {
    id: '12',
    meetingId: '1',
    countyId: '1',
    title: 'Community Health Needs Assessment',
    type: 'minutes',
    date: '2024-09-25T19:00:00Z',
    content: 'Report on Johnson County health priorities for 2025...',
    extractedText: `JOHNSON COUNTY HEALTH DEPARTMENT ...`,
    topics: ['public_health', 'community_wellness'],
    keywords: ['health assessment', 'community health', 'priorities'],
    processingStatus: 'completed',
    ocrQuality: 91
  },
  {
    id: '13',
    meetingId: '3',
    countyId: '1',
    title: 'Opioid Settlement Fund Allocation',
    type: 'resolution',
    date: '2024-09-20T19:30:00Z',
    content: 'Resolution to allocate $4M in opioid settlement funds toward treatment and prevention...',
    extractedText: `OVERLAND PARK CITY COUNCIL
RESOLUTION 2024-22: Opioid Settlement Allocation ...`,
    topics: ['public_health', 'funding', 'substance_abuse'],
    keywords: ['opioid', 'settlement funds', 'treatment'],
    processingStatus: 'completed',
    ocrQuality: 94
  },

  // --- Governance & Finance ---
  {
    id: '14',
    meetingId: '2',
    countyId: '2',
    title: '2025 County Budget Adoption',
    type: 'ordinance',
    date: '2024-09-23T09:00:00Z',
    content: 'Ordinance adopting the FY2025 budget with adjustments for public safety and health...',
    extractedText: `SEDGWICK COUNTY COMMISSION
ORDINANCE 2024-12: 2025 Budget Adoption ...`,
    topics: ['budget', 'finance', 'governance'],
    keywords: ['budget', 'ordinance', 'finance'],
    processingStatus: 'completed',
    ocrQuality: 95
  },
  {
    id: '15',
    meetingId: '3',
    countyId: '1',
    title: 'Open Data Transparency Initiative',
    type: 'agenda',
    date: '2024-09-20T19:30:00Z',
    content: 'Proposal to launch a public open data portal for county records...',
    extractedText: `OVERLAND PARK CITY COUNCIL
AGENDA ITEM: Open Data Portal ...`,
    topics: ['governance', 'transparency', 'technology'],
    keywords: ['open data', 'transparency', 'portal'],
    processingStatus: 'completed',
    ocrQuality: 93
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
