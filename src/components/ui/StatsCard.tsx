"use client";

import { ReviewStats } from "@/types/reviews";

interface StatsCardProps {
  stats: ReviewStats;
}

export default function StatsCard({ stats }: StatsCardProps) {
  const renderRatingDistribution = () => {
    const maxCount = Math.max(...Object.values(stats.ratingDistribution));

    return Object.entries(stats.ratingDistribution).map(([rating, count]) => {
      const percentage = maxCount > 0 ? (count / maxCount) * 100 : 0;

      return (
        <div key={rating} className='flex items-center gap-2'>
          <span className='text-sm text-gray-600 w-4'>{rating}★</span>
          <div className='flex-1 bg-gray-200 rounded-full h-2'>
            <div
              className='bg-yellow-400 h-2 rounded-full'
              style={{ width: `${percentage}%` }}
            />
          </div>
          <span className='text-sm text-gray-600 w-8 text-right'>{count}</span>
        </div>
      );
    });
  };

  const renderCategoryAverages = () => {
    return Object.entries(stats.categoryAverages)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([category, average]) => (
        <div key={category} className='flex justify-between items-center'>
          <span className='text-sm text-gray-600 capitalize'>
            {category.replace("_", " ")}
          </span>
          <div className='flex items-center gap-1'>
            {[1, 2, 3, 4, 5].map(star => (
              <svg
                key={star}
                className={`w-3 h-3 ${
                  star <= average
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }`}
                viewBox='0 0 20 20'
              >
                <path d='M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z' />
              </svg>
            ))}
            <span className='text-sm text-gray-600 ml-1'>
              ({average.toFixed(1)})
            </span>
          </div>
        </div>
      ));
  };

  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
      {/* Overall Stats */}
      <div className='bg-white rounded-lg shadow-md border border-gray-200 p-6'>
        <h3 className='text-lg font-semibold text-gray-900 mb-4'>
          Overall Performance
        </h3>
        <div className='space-y-4'>
          <div className='text-center'>
            <div className='text-3xl font-bold text-blue-600'>
              {stats.averageRating}
            </div>
            <div className='text-sm text-gray-600'>Average Rating</div>
          </div>
          <div className='text-center'>
            <div className='text-3xl font-bold text-green-600'>
              {stats.totalReviews}
            </div>
            <div className='text-sm text-gray-600'>Total Reviews</div>
          </div>
        </div>
      </div>

      {/* Rating Distribution */}
      <div className='bg-white rounded-lg shadow-md border border-gray-200 p-6'>
        <h3 className='text-lg font-semibold text-gray-900 mb-4'>
          Rating Distribution
        </h3>
        <div className='space-y-2'>{renderRatingDistribution()}</div>
      </div>

      {/* Category Averages */}
      <div className='bg-white rounded-lg shadow-md border border-gray-200 p-6'>
        <h3 className='text-lg font-semibold text-gray-900 mb-4'>
          Top Categories
        </h3>
        <div className='space-y-3'>{renderCategoryAverages()}</div>
      </div>
    </div>
  );
}
