"use client";

import { useState, useEffect } from "react";
import { Review } from "@/types/reviews";
import { fetchReviews, getUniqueListings } from "@/lib/reviews";
import ReviewsSection from "@/components/ui/ReviewsSection";
import PublicLayout from "@/components/layouts/PublicLayout";

export default function Properties() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<"date" | "rating" | "property">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Fetch reviews on component mount
  useEffect(() => {
    const loadReviews = async () => {
      try {
        setLoading(true);
        const data = await fetchReviews();
        setReviews(data);
      } catch (err) {
        setError("Failed to load reviews");
        console.error("Error loading reviews:", err);
      } finally {
        setLoading(false);
      }
    };

    loadReviews();
  }, []);

  // Get unique properties
  const properties = getUniqueListings(reviews);

  // Filter reviews by selected property
  const filteredReviews = selectedProperty
    ? reviews.filter(review => review.listingName === selectedProperty)
    : reviews;

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProperty, sortBy, sortOrder]);

  // Calculate property stats
  const getPropertyStats = (propertyName: string) => {
    const propertyReviews = reviews.filter(
      review => review.listingName === propertyName
    );
    const validReviews = propertyReviews.filter(
      review => review.rating !== null
    );

    const averageRating =
      validReviews.length > 0
        ? validReviews.reduce((sum, review) => sum + review.rating!, 0) /
          validReviews.length
        : 0;

    return {
      totalReviews: propertyReviews.length,
      averageRating: Math.round(averageRating * 10) / 10,
      guestReviews: propertyReviews.filter(
        review => review.type === "guest-to-host"
      ).length,
      hostReviews: propertyReviews.filter(
        review => review.type === "host-to-guest"
      ).length,
    };
  };

  return (
    <PublicLayout>
      {loading ? (
        <div className='flex items-center justify-center min-h-[calc(100vh-80px)]'>
          <div className='text-center'>
            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto'></div>
            <p className='mt-4 text-gray-600'>Loading properties...</p>
          </div>
        </div>
      ) : error ? (
        <div className='flex items-center justify-center min-h-[calc(100vh-80px)]'>
          <div className='text-center'>
            <div className='text-red-600 text-6xl mb-4'>⚠️</div>
            <h2 className='text-2xl font-bold text-gray-900 mb-2'>
              Error Loading Properties
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
          {/* Page Header */}
          <div className='mb-8'>
            <h1 className='text-3xl font-bold text-gray-900 mb-2'>
              Our Properties
            </h1>
            <p className='text-gray-600'>
              Discover what our guests are saying about our properties
            </p>
          </div>

          {/* Property Selector */}
          <div className='mb-8'>
            <div className='bg-white rounded-lg shadow-md border border-gray-200 p-6'>
              <h3 className='text-lg font-semibold text-gray-900 mb-4'>
                Select a Property
              </h3>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <button
                  onClick={() => setSelectedProperty("")}
                  className={`p-4 rounded-lg border-2 text-left transition-colors ${
                    selectedProperty === ""
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <h4 className='font-semibold text-gray-900'>
                    All Properties
                  </h4>
                  <p className='text-sm text-gray-600'>
                    {reviews.length} total reviews
                  </p>
                </button>

                {properties.map(property => {
                  const stats = getPropertyStats(property);
                  return (
                    <button
                      key={property}
                      onClick={() => setSelectedProperty(property)}
                      className={`p-4 rounded-lg border-2 text-left transition-colors ${
                        selectedProperty === property
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <h4 className='font-semibold text-gray-900'>
                        {property}
                      </h4>
                      <p className='text-sm text-gray-600'>
                        {stats.totalReviews} reviews
                      </p>
                      {stats.averageRating > 0 && (
                        <p className='text-sm text-yellow-600'>
                          ★ {stats.averageRating} average
                        </p>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Selected Property Details */}
          {selectedProperty && (
            <div className='mb-8'>
              <div className='bg-white rounded-lg shadow-md border border-gray-200 p-6'>
                <h2 className='text-2xl font-bold text-gray-900 mb-4'>
                  {selectedProperty}
                </h2>
                {(() => {
                  const stats = getPropertyStats(selectedProperty);
                  return (
                    <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
                      <div className='text-center'>
                        <div className='text-2xl font-bold text-blue-600'>
                          {stats.totalReviews}
                        </div>
                        <div className='text-sm text-gray-600'>
                          Total Reviews
                        </div>
                      </div>
                      <div className='text-center'>
                        <div className='text-2xl font-bold text-yellow-600'>
                          ★ {stats.averageRating}
                        </div>
                        <div className='text-sm text-gray-600'>
                          Average Rating
                        </div>
                      </div>
                      <div className='text-center'>
                        <div className='text-2xl font-bold text-green-600'>
                          {stats.guestReviews}
                        </div>
                        <div className='text-sm text-gray-600'>
                          Guest Reviews
                        </div>
                      </div>
                      <div className='text-center'>
                        <div className='text-2xl font-bold text-purple-600'>
                          {stats.hostReviews}
                        </div>
                        <div className='text-sm text-gray-600'>
                          Host Reviews
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          )}

          {/* Reviews Section */}
          <ReviewsSection
            title={
              selectedProperty ? `${selectedProperty} Reviews` : "All Reviews"
            }
            reviews={reviews}
            filteredReviews={filteredReviews}
            currentPage={currentPage}
            sortBy={sortBy}
            sortOrder={sortOrder}
            onPageChange={setCurrentPage}
            onSortByChange={setSortBy}
            onSortOrderChange={setSortOrder}
            showApprovalControls={false}
            emptyMessage='No reviews available'
            emptySubMessage={
              selectedProperty
                ? "This property doesn't have any approved reviews yet."
                : "No approved reviews are available at the moment."
            }
          />
        </div>
      )}
    </PublicLayout>
  );
}
