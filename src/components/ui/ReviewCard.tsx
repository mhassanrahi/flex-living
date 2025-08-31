"use client";

import { Review } from "@/types/reviews";
import { useState } from "react";

interface ReviewCardProps {
  review: Review;
  onApprove?: (id: number, approved: boolean) => void;
  showApprovalControls?: boolean;
}

export default function ReviewCard({
  review,
  onApprove,
  showApprovalControls = false,
}: ReviewCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const renderStars = (rating: number | null) => {
    if (rating === null)
      return <span className='text-gray-500'>No rating</span>;

    return (
      <div className='flex items-center gap-1'>
        {[1, 2, 3, 4, 5].map(star => (
          <svg
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
            }`}
            viewBox='0 0 20 20'
          >
            <path d='M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z' />
          </svg>
        ))}
        <span className='ml-2 text-sm text-gray-600'>({rating})</span>
      </div>
    );
  };

  return (
    <div className='bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow'>
      <div className='flex justify-between items-start mb-4'>
        <div>
          <h3 className='font-semibold text-lg text-gray-900'>
            {review.guestName}
          </h3>
          <p className='text-sm text-gray-600'>{review.listingName}</p>
          <p className='text-xs text-gray-500'>
            {formatDate(review.submittedAt)}
          </p>
        </div>
        <div className='flex items-center gap-2'>
          <span
            className={`px-2 py-1 text-xs rounded-full ${
              review.type === "guest-to-host"
                ? "bg-blue-100 text-blue-800"
                : "bg-green-100 text-green-800"
            }`}
          >
            {review.type === "guest-to-host" ? "Guest Review" : "Host Review"}
          </span>
          {showApprovalControls && (
            <span
              className={`px-2 py-1 text-xs rounded-full ${
                review.approved
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {review.approved ? "Approved" : "Pending"}
            </span>
          )}
        </div>
      </div>

      {review.rating !== null && (
        <div className='mb-3'>{renderStars(review.rating)}</div>
      )}

      <div className='mb-4'>
        <p className={`text-gray-700 ${!isExpanded ? "line-clamp-3" : ""}`}>
          {review.publicReview}
        </p>
        {review.publicReview.length > 150 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className='text-blue-600 hover:text-blue-800 text-sm mt-1'
          >
            {isExpanded ? "Show less" : "Read more"}
          </button>
        )}
      </div>

      {review.reviewCategory.length > 0 && (
        <div className='mb-4'>
          <h4 className='text-sm font-medium text-gray-900 mb-2'>
            Category Ratings:
          </h4>
          <div className='grid grid-cols-2 gap-2'>
            {review.reviewCategory.map(category => (
              <div
                key={category.category}
                className='flex justify-between items-center'
              >
                <span className='text-sm text-gray-600 capitalize'>
                  {category.category.replace("_", " ")}
                </span>
                <div className='flex items-center gap-1'>
                  {[1, 2, 3, 4, 5].map(star => (
                    <svg
                      key={star}
                      className={`w-3 h-3 ${
                        star <= category.rating
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                      viewBox='0 0 20 20'
                    >
                      <path d='M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z' />
                    </svg>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {showApprovalControls && onApprove && (
        <div className='flex gap-2 pt-4 border-t border-gray-200'>
          <button
            onClick={() => onApprove(review.id, true)}
            disabled={review.approved}
            className={`px-3 py-1 text-sm rounded ${
              review.approved
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-green-600 text-white hover:bg-green-700"
            }`}
          >
            Approve
          </button>
          <button
            onClick={() => onApprove(review.id, false)}
            disabled={review.approved === false}
            className={`px-3 py-1 text-sm rounded ${
              review.approved === false
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-red-600 text-white hover:bg-red-700"
            }`}
          >
            Reject
          </button>
        </div>
      )}
    </div>
  );
}
