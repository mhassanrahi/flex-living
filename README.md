# FlexLiving Reviews Dashboard

A comprehensive reviews management system for FlexLiving properties, built with Next.js 15 and Tailwind CSS v4.

## Features

### Implemented Features

1. **Hostaway Integration (Mocked)**
   - API endpoint at `/api/reviews/hostaway`
   - Realistic mock data based on requirements
   - Proper error handling and response structure

2. **Manager Dashboard**
   - Comprehensive analytics and statistics
   - Advanced filtering and sorting capabilities
   - Review approval/rejection system
   - Performance insights and trend analysis
   - Top issues identification

3. **Review Display Page**
   - Public-facing property reviews
   - Property-specific filtering
   - Only approved reviews are displayed
   - Responsive design for all devices

4. **Google Reviews Exploration**
   - Detailed analysis of integration options
   - Implementation roadmap
   - Challenges and recommendations

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS v4
- **Build Tool**: Vite (via Next.js)
- **API**: Next.js API Routes
- **State Management**: React Hooks (useState, useEffect)
- **Linting**: ESLint with TypeScript and Accessibility rules
- **Formatting**: Prettier with consistent code style

## Installation & Setup

### Prerequisites

- Node.js 18+
- npm or yarn

### Quick Start

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd flex-living
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Development Tools

### Code Quality

- **Linting**: `npm run lint` - Check for code quality issues
- **Lint Fix**: `npm run lint:fix` - Automatically fix linting issues
- **Formatting**: `npm run format` - Format code with Prettier
- **Format Check**: `npm run format:check` - Check if code is properly formatted
- **Type Check**: `npm run type-check` - Run TypeScript type checking

### VS Code Setup

The project includes VS Code settings for:

- Automatic formatting on save
- ESLint integration
- TypeScript support
- Tailwind CSS IntelliSense

## Project Structure

```
src/
├── app/
│   ├── api/reviews/hostaway/route.ts  # Hostaway API endpoint
│   ├── dashboard/page.tsx             # Manager dashboard
│   ├── properties/page.tsx            # Public reviews page
│   ├── globals.css                    # Global styles
│   ├── layout.tsx                     # Root layout
│   └── page.tsx                       # Home page
├── components/ui/
│   ├── ReviewCard.tsx                 # Individual review component
│   ├── StatsCard.tsx                  # Statistics display
│   ├── ReviewFilters.tsx              # Filtering interface
│   └── GoogleReviewsExploration.tsx   # Google integration exploration
├── lib/
│   └── reviews.ts                     # Review utilities and API functions
└── types/
    └── reviews.ts                     # TypeScript type definitions
```

## API Documentation

### GET /api/reviews/hostaway

Returns mock review data in the Hostaway format.

**Response Format:**

```json
{
  "status": "success",
  "result": [
    {
      "id": 7453,
      "type": "host-to-guest",
      "status": "published",
      "rating": null,
      "publicReview": "Review text...",
      "reviewCategory": [{ "category": "cleanliness", "rating": 10 }],
      "submittedAt": "2020-08-21 22:45:14",
      "guestName": "Guest Name",
      "listingName": "Property Name"
    }
  ]
}
```

## Key Design Decisions

### 1. **Component Architecture**

- Modular, reusable components for maintainability
- Separation of concerns between UI and business logic
- TypeScript for type safety and better developer experience

### 2. **State Management**

- React hooks for local state management
- No external state management library needed for current scope
- Efficient re-rendering with proper dependency arrays

### 3. **API Design**

- RESTful API endpoints following Next.js conventions
- Proper error handling and status codes
- Mock data that closely resembles real Hostaway responses

### 4. **User Experience**

- Responsive design that works on all devices
- Loading states and error handling
- Intuitive filtering and navigation
- Clear visual hierarchy and modern UI

### 5. **Performance**

- Client-side filtering for instant results
- Optimized re-renders with React best practices
- Efficient data processing with utility functions

## Features in Detail

### Manager Dashboard

- **Statistics Overview**: Total reviews, average rating, rating distribution
- **Advanced Filtering**: By rating, category, property, date range, review type
- **Review Management**: Approve/reject reviews with visual feedback
- **Issue Tracking**: Automatic identification of low-rated reviews
- **Real-time Updates**: Immediate reflection of approval changes

### Public Properties Page

- **Property Selection**: Easy switching between properties
- **Approved Reviews Only**: Ensures quality control
- **Property Statistics**: Individual property performance metrics
- **Responsive Design**: Optimized for mobile and desktop

### Google Reviews Integration

- **Comprehensive Analysis**: Detailed exploration of integration options
- **Implementation Roadmap**: Step-by-step guide for future development
- **Risk Assessment**: Identified challenges and mitigation strategies

## Deployment

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

### Environment Variables

No environment variables are required for the current implementation as it uses mock data.

## Future Enhancements

1. **Real Hostaway Integration**
   - Replace mock data with actual API calls
   - Implement authentication and rate limiting
   - Add real-time data synchronization

2. **Google Reviews Integration**
   - Implement Google Places API integration
   - Add review aggregation from multiple sources
   - Create unified review management system

3. **Advanced Analytics**
   - Trend analysis and forecasting
   - Sentiment analysis of reviews
   - Automated reporting and alerts

4. **Enhanced Features**
   - Review response management
   - Automated review moderation
   - Integration with property management systems
