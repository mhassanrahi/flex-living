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
import ReviewCard from "@/components/ui/ReviewCard";
import Pagination from "@/components/ui/Pagination";
import StatsCard from "@/components/ui/StatsCard";
import ReviewFilters from "@/components/ui/ReviewFilters";
import AdminHeader from "@/components/AdminHeader";

export default function Dashboard() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [filteredReviews, setFilteredReviews] = useState<Review[]>([]);
  const [filters, setFilters] = useState<ReviewFiltersType>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<"date" | "rating" | "property">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const itemsPerPage = 5;

  // Fetch reviews on component mount
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

  // Sort reviews
  const sortedReviews = [...filteredReviews].sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case "date":
        comparison =
          new Date(a.submittedAt).getTime() - new Date(b.submittedAt).getTime();
        break;
      case "rating":
        comparison = (a.rating || 0) - (b.rating || 0);
        break;
      case "property":
        comparison = a.listingName.localeCompare(b.listingName);
        break;
    }

    return sortOrder === "asc" ? comparison : -comparison;
  });

  // Paginate reviews
  const totalPages = Math.ceil(sortedReviews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedReviews = sortedReviews.slice(startIndex, endIndex);

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

  if (loading) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto'></div>
          <p className='mt-4 text-gray-600'>Loading reviews...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
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
    );
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <AdminHeader />

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

        {/* Reviews Grid */}
        <div className='mb-8'>
          <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4'>
            <h2 className='text-2xl font-bold text-gray-900'>Reviews</h2>

            <div className='flex items-center gap-4'>
              {/* Sort Options */}
              <div className='flex items-center gap-2'>
                <select
                  value={sortBy}
                  onChange={e =>
                    setSortBy(e.target.value as "date" | "rating" | "property")
                  }
                  className='px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm'
                >
                  <option value='date'>Date</option>
                  <option value='rating'>Rating</option>
                  <option value='property'>Property</option>
                </select>
                <button
                  onClick={() =>
                    setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                  }
                  className='p-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors'
                >
                  {sortOrder === "asc" ? "↑" : "↓"}
                </button>
              </div>

              <span className='text-sm text-gray-500'>
                {filteredReviews.length} of {reviews.length} reviews
              </span>
            </div>
          </div>

          {filteredReviews.length === 0 ? (
            <div className='text-center py-12'>
              <div className='text-gray-400 text-6xl mb-4'>📝</div>
              <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                No reviews found
              </h3>
              <p className='text-gray-600'>
                {Object.keys(filters).length > 0
                  ? "Try adjusting your filters to see more reviews."
                  : "No reviews are available at the moment."}
              </p>
            </div>
          ) : (
            <div className='bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden'>
              <div className='p-6'>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                  {paginatedReviews.map(review => (
                    <ReviewCard
                      key={review.id}
                      review={review}
                      onApprove={handleReviewApproval}
                      showApprovalControls={true}
                    />
                  ))}
                </div>
              </div>

              {/* Pagination */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                totalItems={filteredReviews.length}
                itemsPerPage={itemsPerPage}
              />
            </div>
          )}
        </div>

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
    </div>
  );
}
