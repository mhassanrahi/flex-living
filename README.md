# FlexLiving Reviews Dashboard

A comprehensive reviews management system for FlexLiving properties, built with Next.js 15 and Tailwind CSS v4.

## Demo

You can try out the live version here: [https://flex-living-germany.vercel.app/](https://flex-living-germany.vercel.app/).

## Features

### Implemented Features

1. **Hostaway Integration (Mocked)**
   - API endpoints at `/api/reviews/hostaway` and `/api/reviews/google`
   - Realistic mock data based on requirements
   - Proper error handling and response structure

2. **Manager Dashboard**
   - Comprehensive analytics and statistics
   - Advanced filtering and sorting capabilities
   - Review approval/rejection system
   - Performance insights and trend analysis
   - Top issues identification
   - **Pagination** with smart page navigation
   - **Sorting** by date, rating, and property
   - **Responsive design** optimized for all devices

3. **Public Properties Page**
   - Public-facing property reviews with professional layout
   - Property-specific filtering and selection
   - Only approved reviews are displayed
   - **Pagination** for better performance and UX
   - **Sorting capabilities** for easy review browsing
   - **Property statistics** with detailed metrics
   - Responsive design for all devices

4. **Google Reviews Integration**
   - Unified review system combining Hostaway and Google reviews
   - API endpoint at `/api/reviews/google`
   - Source-based filtering and management
   - Visual indicators for review sources

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
│   ├── api/reviews/
│   │   ├── hostaway/route.ts    # Hostaway API endpoint
│   │   └── google/route.ts      # Google Reviews API endpoint
│   ├── dashboard/page.tsx       # Manager dashboard
│   ├── properties/page.tsx      # Public reviews page
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home page
├── components/
│   ├── layouts/
│   │   ├── PublicLayout.tsx     # Layout for public pages
│   │   └── AdminLayout.tsx      # Layout for admin pages
│   ├── PublicHeader.tsx         # Header for public pages
│   ├── AdminHeader.tsx          # Header for admin pages
│   ├── Footer.tsx               # Footer component
│   └── ui/
│       ├── ReviewCard.tsx       # Individual review component
│       ├── ReviewsSection.tsx   # Complete reviews display with pagination
│       ├── SortControls.tsx     # Sorting interface component
│       ├── Pagination.tsx       # Pagination component
│       ├── StatsCard.tsx        # Statistics display
│       ├── ReviewFilters.tsx    # Filtering interface
│       └── GoogleReviewsExploration.tsx # Google integration exploration
├── lib/
│   └── reviews.ts               # Review utilities and API functions
└── types/
    └── reviews.ts               # TypeScript type definitions
```

## Key Design Decisions

### 1. **Modular Component Architecture**

- **Reusable Components**: `ReviewsSection`, `SortControls`, `Pagination` for consistent functionality
- **Layout System**: Separate `PublicLayout` and `AdminLayout` for different user contexts
- **Header Components**: Specialized headers for public and admin pages
- **Separation of Concerns**: Clear distinction between UI components and business logic

### 2. **Enhanced State Management**

- React hooks for local state management
- Efficient pagination state handling
- Smart sorting and filtering with proper state updates
- Optimized re-rendering with proper dependency arrays

### 3. **Improved User Experience**

- **Pagination**: 5 reviews per page for better performance and navigation
- **Sorting**: By date, rating, and property with ascending/descending options
- **Responsive Design**: Optimized for mobile, tablet, and desktop

### 4. **Performance Optimizations**

- **Client-side filtering** for instant results
- **Efficient pagination** reducing DOM elements
- **Optimized re-renders** with React best practices
- **Smart component composition** for better maintainability

### 5. **Code Quality & Maintainability**

- **DRY Principle**: Eliminated duplicate code through reusable components
- **TypeScript**: Full type safety across all components
- **Consistent Styling**: Unified design system with Tailwind CSS
- **Modular Structure**: Easy to extend and maintain

## Features in Detail

### Manager Dashboard

- **Statistics Overview**: Total reviews, average rating, rating distribution
- **Advanced Filtering**: By rating, category, property, date range, review type
- **Review Management**: Approve/reject reviews with visual feedback
- **Issue Tracking**: Automatic identification of low-rated reviews
- **Pagination**: Smart navigation through large review sets
- **Sorting**: Multiple sorting options for efficient review management

### Public Properties Page

- **Property Selection**: Easy switching between properties with visual feedback
- **Approved Reviews Only**: Ensures quality control and brand protection
- **Property Statistics**: Individual property performance metrics
- **Pagination**: Smooth browsing experience for large review sets
- **Sorting**: User-friendly sorting options for review discovery
- **Responsive Design**: Optimized for mobile and desktop viewing

### Layout System

- **PublicLayout**: Header + Footer + Content for customer-facing pages
- **AdminLayout**: Header + Content for administrative pages
- **Consistent Navigation**: Unified header design with proper branding

### Component Library

- **ReviewsSection**: Complete review display with built-in pagination and sorting
- **SortControls**: Reusable sorting interface with dropdown and order toggle
- **Pagination**: Smart pagination with ellipsis and mobile-friendly controls
- **ReviewCard**: Individual review display with approval controls
- **StatsCard**: Statistics display with visual indicators

## API Endpoints

### Hostaway Reviews

**Endpoint**: `GET /api/reviews/hostaway`

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

### Google Reviews

**Endpoint**: `GET /api/reviews/google`

Returns mock Google reviews data for integration testing.

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

1. **Real Hostaway and Google Reviews Integration**
   - Replace mock data with actual API calls
   - Implement authentication and rate limiting
   - Add real-time data synchronization

2. **Advanced Analytics**
   - Trend analysis and forecasting
   - Sentiment analysis of reviews
   - Automated reporting and alerts

3. **Enhanced Features**
   - Review response management
   - Automated review moderation
   - Integration with property management systems
   - Export functionality for reports
   - Email notifications for new reviews
