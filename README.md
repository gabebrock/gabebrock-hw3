# CivicPulse - Municipal Data Monitoring Platform

**GitHub Username:** gabebrock  
**Deployment URL:** [To be deployed]  
**PRD URL:** [To be added]

## Overview

CivicPulse is a comprehensive municipal data monitoring platform that helps users "Find local trends before they break nationally." The platform tracks municipal meetings, agendas, and policy discussions across Kansas counties, providing early insights into emerging policy trends.

## Key Features Implemented

### Landing Page & User Onboarding
- **Value Proposition**: "Find local trends before they break nationally"
- **User Type Selection**: Reporter, Policy Strategist, Community Advocate, Developer
- **Modern UI**: Gradient branding with CivicPulse identity
- **Responsive Design**: Mobile-first approach with Tailwind CSS

### Dashboard (Primary Hub)
- **Watchlist Feed**: Recent documents matching user interests
- **Alert Summary**: Recent notifications and flagged items
- **Upcoming Meetings**: Calendar view of scheduled meetings
- **Quick Search**: Prominent search functionality
- **Navigation**: Seamless routing between features

### Search & Discovery
- **Advanced Search**: Keywords, date ranges, jurisdiction filters
- **Results Grid**: Relevance scoring, meeting dates, document types
- **Filtering Panel**: County, topic, document type, time period
- **Interactive Results**: Click-through to document viewer

### Document Viewer
- **Split View**: Original PDF placeholder vs. extracted text
- **Keyword Highlighting**: Visual emphasis on search terms
- **Context Panel**: Document details and related items
- **Action Buttons**: Save, Follow, Export, Share (UI ready)

### Trend Analysis Tools
- **Interactive Heatmap**: County-level intensity visualization
- **Timeline View**: Issue evolution over time
- **Comparative Analysis**: Side-by-side trend comparison
- **Topic Clustering**: Related issues and emerging themes

## Mock Data Structure

### Counties Covered
- Johnson County (609K population)
- Sedgwick County (524K population)
- Shawnee County (179K population)
- Wyandotte County (165K population)
- Douglas County (119K population)
- Plus 5 additional Kansas counties

### Document Types
- **Agendas**: Meeting agendas with discussion items
- **Minutes**: Meeting minutes with decisions
- **Resolutions**: Official county resolutions
- **Ordinances**: Local ordinances and regulations

### Key Topics Tracked
- **Education**: Cell phone bans, curriculum changes
- **Renewable Energy**: Solar zoning, wind development
- **Transit**: BRT development, transportation districts
- **Housing**: Development policies, zoning changes

## User Journey Examples

### Reporter Journey (John)
1. **Onboarding**: Selects "Reporter" user type
2. **Dashboard**: Reviews education-focused watchlist
3. **Search**: Filters for "cell phone ban" + education topic
4. **Document View**: Analyzes Johnson County school board agenda
5. **Export**: Prepares research for article (UI ready)

### Strategist Journey (Maya)
1. **Onboarding**: Selects "Policy Strategist" user type
2. **Trends**: Views renewable energy heatmap
3. **Analysis**: Compares solar policies across counties
4. **Timeline**: Tracks policy evolution over time
5. **Alerts**: Sets up monitoring for policy changes (UI ready)

### Advocate Journey (Schmidt)
1. **Onboarding**: Selects "Community Advocate" user type
2. **Search**: Looks for transit-related discussions
3. **Document View**: Reviews Overland Park BRT proposal
4. **Related**: Discovers similar discussions in other counties

## Technical Implementation

### Tech Stack
- **Frontend**: Next.js 15 with App Router
- **Styling**: Tailwind CSS + shadcn/ui components
- **Icons**: Lucide React
- **Backend**: Supabase (configured)
- **Language**: TypeScript
- **Deployment**: Ready for Netlify/Vercel

### Key Components
- `UserTypeSelection`: Onboarding flow
- `Dashboard`: Main user hub
- `SearchPage`: Advanced search with filters
- `DocumentViewer`: Split-view document analysis
- `TrendsPage`: Interactive trend visualization

### Mock Data
- **10 Kansas Counties**: Realistic population data
- **Sample Documents**: Education, energy, transit topics
- **Trend Analysis**: Intensity mapping and timeline data
- **Meeting Calendar**: Upcoming and completed meetings

## Features Ready for Enhancement

### Immediate Next Steps
1. **Alert System**: Backend integration for notifications
2. **Export Tools**: PDF generation and data export
3. **Real OCR**: Actual PDF processing pipeline
4. **User Authentication**: Supabase auth integration

### Future Enhancements
1. **Real-time Updates**: WebSocket integration
2. **Machine Learning**: Automatic trend detection
3. **API Access**: Developer endpoints
4. **Mobile App**: React Native companion

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
cs1060_hw3/
├── app/
│   ├── dashboard/          # Main user dashboard
│   ├── search/            # Advanced search interface
│   ├── document/[id]/     # Document viewer
│   ├── trends/            # Trend analysis tools
│   └── page.tsx           # Landing page
├── components/
│   ├── ui/                # shadcn/ui components
│   ├── hero.tsx           # Landing page hero
│   └── user-type-selection.tsx
├── lib/
│   ├── mock-data.ts       # Sample municipal data
│   └── utils.ts           # Utility functions
└── README.md
```

This prototype demonstrates a complete user journey from discovery to analysis, with realistic municipal data and modern UI/UX patterns. The foundation is ready for backend integration and production deployment.