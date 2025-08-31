import {
  Review,
  ReviewsResponse,
  ReviewFilters,
  ReviewStats,
} from "@/types/reviews";

export async function fetchReviews(): Promise<Review[]> {
  try {
    // Fetch from both sources
    const [hostawayResponse, googleResponse] = await Promise.allSettled([
      fetch("/api/reviews/hostaway"),
      fetch("/api/reviews/google"),
    ]);

    const reviews: Review[] = [];

    // Process Hostaway reviews
    if (hostawayResponse.status === "fulfilled" && hostawayResponse.value.ok) {
      const hostawayData: ReviewsResponse = await hostawayResponse.value.json();
      if (hostawayData.status === "success") {
        const hostawayReviews = (hostawayData.result || []).map(review => ({
          ...review,
          source: "hostaway" as const,
        }));
        reviews.push(...hostawayReviews);
      }
    }

    // Process Google reviews
    if (googleResponse.status === "fulfilled" && googleResponse.value.ok) {
      const googleData: ReviewsResponse = await googleResponse.value.json();
      if (googleData.status === "success") {
        const googleReviews = (googleData.result || []).map(review => ({
          ...review,
          source: "google" as const,
        }));
        reviews.push(...googleReviews);
      }
    }

    return reviews;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }
}

export function filterReviews(
  reviews: Review[],
  filters: ReviewFilters
): Review[] {
  return reviews.filter(review => {
    // Filter by rating
    if (filters.rating && review.rating !== null) {
      if (review.rating < filters.rating) return false;
    }

    // Filter by category
    if (filters.category) {
      const hasCategory = review.reviewCategory.some(cat =>
        cat.category.toLowerCase().includes(filters.category!.toLowerCase())
      );
      if (!hasCategory) return false;
    }

    // Filter by listing name
    if (filters.listingName) {
      if (
        !review.listingName
          .toLowerCase()
          .includes(filters.listingName.toLowerCase())
      ) {
        return false;
      }
    }

    // Filter by date range
    if (filters.dateRange) {
      const reviewDate = new Date(review.submittedAt);
      const startDate = new Date(filters.dateRange.start);
      const endDate = new Date(filters.dateRange.end);

      if (reviewDate < startDate || reviewDate > endDate) {
        return false;
      }
    }

    // Filter by type
    if (filters.type && review.type !== filters.type) {
      return false;
    }

    // Filter by approval status
    if (
      filters.approved !== undefined &&
      review.approved !== filters.approved
    ) {
      return false;
    }

    // Filter by source
    if (filters.source && filters.source !== "all") {
      if (review.source !== filters.source) {
        return false;
      }
    }

    return true;
  });
}

export function calculateStats(reviews: Review[]): ReviewStats {
  const validReviews = reviews.filter(review => review.rating !== null);

  const totalReviews = reviews.length;
  const averageRating =
    validReviews.length > 0
      ? validReviews.reduce((sum, review) => sum + review.rating!, 0) /
        validReviews.length
      : 0;

  // Rating distribution
  const ratingDistribution: Record<number, number> = {};
  for (let i = 1; i <= 5; i++) {
    ratingDistribution[i] = validReviews.filter(
      review => Math.floor(review.rating!) === i
    ).length;
  }

  // Category averages
  const categoryTotals: Record<string, { sum: number; count: number }> = {};
  reviews.forEach(review => {
    review.reviewCategory.forEach(cat => {
      if (!categoryTotals[cat.category]) {
        categoryTotals[cat.category] = { sum: 0, count: 0 };
      }
      categoryTotals[cat.category].sum += cat.rating;
      categoryTotals[cat.category].count += 1;
    });
  });

  const categoryAverages: Record<string, number> = {};
  Object.entries(categoryTotals).forEach(([category, { sum, count }]) => {
    categoryAverages[category] = sum / count;
  });

  // Top issues (reviews with ratings <= 3)
  const lowRatedReviews = validReviews.filter(review => review.rating! <= 3);
  const topIssues = lowRatedReviews
    .map(review => review.publicReview)
    .slice(0, 5);

  return {
    totalReviews,
    averageRating: Math.round(averageRating * 10) / 10,
    ratingDistribution,
    categoryAverages,
    topIssues,
  };
}

export function getUniqueListings(reviews: Review[]): string[] {
  const listings = new Set(reviews.map(review => review.listingName));
  return Array.from(listings).sort();
}

export function getUniqueCategories(reviews: Review[]): string[] {
  const categories = new Set();
  reviews.forEach(review => {
    review.reviewCategory.forEach(cat => categories.add(cat.category));
  });
  return Array.from(categories).sort() as string[];
}
