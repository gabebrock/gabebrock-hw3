<h1 align="center">CivicPulse - Municipal Data Monitoring Platform</h1>

<p align="center">
  **Name:** Gabe Brock  
  **GitHub Username:** gabebrock  
  **Deployment URL:** https://gabebrock-hw3.vercel.app/  
  **PRD URL:** [To be added - link to your team's PRD]
</p>

## Overview

CivicPulse is a comprehensive municipal data monitoring platform that helps users "Find local trends before they break nationally." The platform tracks municipal meetings, agendas, and policy discussions across Kansas counties, providing early insights into emerging policy trends.

## Key Features Implemented

### Complete User Journeys
- **Reporter Journey**: Search education policies, analyze cell phone ban discussions
- **Policy Strategist Journey**: Track renewable energy trends across counties  
- **Community Advocate Journey**: Monitor transit and housing development policies

### Core Platform Features
- **Dashboard**: Watchlist feed, alerts, upcoming meetings, quick search
- **Advanced Search**: Real-time filtering by keywords, counties, topics, date ranges
- **Document Viewer**: Split view with PDF placeholder and extracted text, keyword highlighting
- **Trend Analysis**: Interactive heatmap, timeline view, comparative analysis
- **Responsive Design**: Works across desktop, tablet, and mobile devices

### Technical Implementation
- **Frontend**: Next.js 15 with App Router, TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Data**: Mock Kansas county municipal data (10 counties, 50+ documents)
- **Deployment**: Vercel with automatic builds

## Clone and run locally

1. You'll first need a Supabase project which can be made [via the Supabase dashboard](https://database.new)

2. Use `cd` to change into the app's directory

   ```bash
   cd with-supabase-app
   ```

3. Rename `.env.example` to `.env.local` and update the following:

   ```
   NEXT_PUBLIC_SUPABASE_URL=[INSERT SUPABASE PROJECT URL]
   NEXT_PUBLIC_SUPABASE_ANON_KEY=[INSERT SUPABASE PROJECT API ANON KEY]
   ```

   Both `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` can be found in [your Supabase project's API settings](https://supabase.com/dashboard/project/_?showConnect=true)

4. You can now run the Next.js local development server:

   ```bash
   npm run dev
   ```

   The starter kit should now be running on [localhost:3000](http://localhost:3000/).

5. This template comes with the default shadcn/ui style initialized. If you instead want other ui.shadcn styles, delete `components.json` and [re-install shadcn/ui](https://ui.shadcn.com/docs/installation/next)

> Check out [the docs for Local Development](https://supabase.com/docs/guides/getting-started/local-development) to also run Supabase locally.

## More Supabase examples

- [Next.js Subscription Payments Starter](https://github.com/vercel/nextjs-subscription-payments)
- [Cookie-based Auth and the Next.js 13 App Router (free course)](https://youtube.com/playlist?list=PL5S4mPUpp4OtMhpnp93EFSo42iQ40XjbF)
- [Supabase Auth and the Next.js App Router](https://github.com/supabase/supabase/tree/master/examples/auth/nextjs)
