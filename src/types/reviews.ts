export interface ReviewCategory {
  category: string;
  rating: number;
}

export interface Review {
  id: number | string;
  type: "host-to-guest" | "guest-to-host";
  status: "published" | "pending" | "rejected";
  rating: number | null;
  publicReview: string;
  reviewCategory: ReviewCategory[];
  submittedAt: string;
  guestName: string;
  listingName: string;
  approved?: boolean;
  source?: "hostaway" | "google";
}

export interface ReviewsResponse {
  status: "success" | "error";
  result: Review[];
  message?: string;
}

export interface ReviewFilters {
  rating?: number;
  category?: string;
  listingName?: string;
  dateRange?: {
    start: string;
    end: string;
  };
  type?: "host-to-guest" | "guest-to-host";
  approved?: boolean;
  source?: "hostaway" | "google" | "all";
}

export interface ReviewStats {
  totalReviews: number;
  averageRating: number;
  ratingDistribution: Record<number, number>;
  categoryAverages: Record<string, number>;
  topIssues: string[];
}
