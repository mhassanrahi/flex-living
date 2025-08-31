"use client";

import { useState, useEffect } from "react";
import { Review, ReviewFilters as ReviewFiltersType } from "@/types/reviews";
import {
  fetchReviews,
  filterReviews,
  calculateStats,
  getUniqueListings,
  getUniqueCategories,
} from "@/lib/reviews";
import ReviewsSection from "@/components/ui/ReviewsSection";
import StatsCard from "@/components/ui/StatsCard";
import ReviewFilters from "@/components/ui/ReviewFilters";
import AdminLayout from "@/components/layouts/AdminLayout";

export default function Dashboard() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [filteredReviews, setFilteredReviews] = useState<Review[]>([]);
  const [filters, setFilters] = useState<ReviewFiltersType>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<"date" | "rating" | "property">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    const loadReviews = async () => {
      try {
        setLoading(true);
        const data = await fetchReviews(false);
        setReviews(data);
        setFilteredReviews(data);
      } catch (err) {
        setError("Failed to load reviews");
        console.error("Error loading reviews:", err);
      } finally {
        setLoading(false);
      }
    };

    loadReviews();
  }, []);

  // Apply filters when filters change
  useEffect(() => {
    const filtered = filterReviews(reviews, filters);
    setFilteredReviews(filtered);
  }, [reviews, filters]);

  // Reset to first page when filters or sorting change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sortBy, sortOrder]);

  // Handle review approval/rejection
  const handleReviewApproval = (id: number | string, approved: boolean) => {
    setReviews(prevReviews =>
      prevReviews.map(review =>
        review.id === id ? { ...review, approved } : review
      )
    );
  };

  // Calculate stats from filtered reviews
  const stats = calculateStats(filteredReviews);
  const listings = getUniqueListings(reviews);
  const categories = getUniqueCategories(reviews);

  return (
    <AdminLayout>
      {loading ? (
        <div className='flex items-center justify-center min-h-[calc(100vh-80px)]'>
          <div className='text-center'>
            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto'></div>
            <p className='mt-4 text-gray-600'>Loading reviews...</p>
          </div>
        </div>
      ) : error ? (
        <div className='flex items-center justify-center min-h-[calc(100vh-80px)]'>
          <div className='text-center'>
            <div className='text-red-600 text-6xl mb-4'>⚠️</div>
            <h2 className='text-2xl font-bold text-gray-900 mb-2'>
              Error Loading Reviews
            </h2>
            <p className='text-gray-600 mb-4'>{error}</p>
            <button
              onClick={() => window.location.reload()}
              className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'
            >
              Try Again
            </button>
          </div>
        </div>
      ) : (
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
          {/* Stats Cards */}
          <div className='mb-8'>
            <StatsCard stats={stats} />
          </div>

          {/* Filters */}
          <ReviewFilters
            filters={filters}
            onFiltersChange={setFilters}
            listings={listings}
            categories={categories}
          />

          {/* Reviews Section */}
          <ReviewsSection
            title='Reviews'
            reviews={reviews}
            filteredReviews={filteredReviews}
            currentPage={currentPage}
            sortBy={sortBy}
            sortOrder={sortOrder}
            onPageChange={setCurrentPage}
            onSortByChange={setSortBy}
            onSortOrderChange={setSortOrder}
            showApprovalControls={true}
            onApprove={handleReviewApproval}
            emptyMessage='No reviews found'
            emptySubMessage={
              Object.keys(filters).length > 0
                ? "Try adjusting your filters to see more reviews."
                : "No reviews are available at the moment."
            }
          />

          {/* Top Issues Section */}
          {stats.topIssues.length > 0 && (
            <div className='bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-8'>
              <h3 className='text-lg font-semibold text-gray-900 mb-4'>
                Top Issues to Address
              </h3>
              <div className='space-y-3'>
                {stats.topIssues.map((issue, index) => (
                  <div
                    key={index}
                    className='flex items-start gap-3 p-3 bg-red-50 rounded-lg'
                  >
                    <span className='text-red-600 text-sm font-medium'>⚠️</span>
                    <p className='text-sm text-gray-700'>{issue}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Google Reviews Exploration */}
          {/* <GoogleReviewsExploration /> */}
        </div>
      )}
    </AdminLayout>
  );
}
