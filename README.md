<h1 align="center">CivicPulse - Municipal Data Monitoring Platform</h1>


  **Name:** Gabriel Brock  
  **GitHub Username:** gabebrock  
  **Deployment URL:** https://gabebrock-hw3.vercel.app/  
  **PRD URL:** https://drive.google.com/file/d/1ULET7aF2T_C3-sMmDHyVD2Qh03RiFXZT/view

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

**To deploy this project locally, follow these steps:**

1. **Clone the repository** to your local machine:
   - Open your terminal or command prompt.
   - Navigate to the directory where you want to clone the repository.
   - Run the following command:
     ```bash
     git clone <repository-url>
     cd cs1060_hw3
     ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   - Copy the example environment file:
     ```bash
     cp .env.example .env.local
     ```
   - Fill in your Supabase credentials and other required environment variables.

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser** and navigate to `http://localhost:3000` to view the application.

## Building for Production

To build the project for production:

```bash
npm run build
npm start
```

The application will be available at `http://localhost:3000`.
