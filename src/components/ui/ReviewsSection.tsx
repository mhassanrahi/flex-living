import { Review } from "@/types/reviews";
import ReviewCard from "@/components/ui/ReviewCard";
import Pagination from "@/components/ui/Pagination";
import SortControls from "@/components/ui/SortControls";

interface ReviewsSectionProps {
  title: string;
  reviews: Review[];
  filteredReviews: Review[];
  currentPage: number;
  sortBy: "date" | "rating" | "property";
  sortOrder: "asc" | "desc";
  itemsPerPage?: number;
  onPageChange: (page: number) => void;
  onSortByChange: (sortBy: "date" | "rating" | "property") => void;
  onSortOrderChange: (sortOrder: "asc" | "desc") => void;
  showApprovalControls?: boolean;
  onApprove?: (id: number | string, approved: boolean) => void;
  emptyMessage?: string;
  emptySubMessage?: string;
}

export default function ReviewsSection({
  title,
  reviews,
  filteredReviews,
  currentPage,
  sortBy,
  sortOrder,
  itemsPerPage = 5,
  onPageChange,
  onSortByChange,
  onSortOrderChange,
  showApprovalControls = false,
  onApprove,
  emptyMessage = "No reviews found",
  emptySubMessage = "No reviews are available at the moment.",
}: ReviewsSectionProps) {
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

  return (
    <div className='mb-8'>
      <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4'>
        <h2 className='text-2xl font-bold text-gray-900'>{title}</h2>

        <div className='flex items-center gap-4'>
          <SortControls
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSortByChange={onSortByChange}
            onSortOrderChange={onSortOrderChange}
          />

          <span className='text-sm text-gray-500'>
            {filteredReviews.length}{" "}
            {reviews.length !== filteredReviews.length
              ? `of ${reviews.length}`
              : ""}{" "}
            reviews
          </span>
        </div>
      </div>

      {filteredReviews.length === 0 ? (
        <div className='text-center py-12 bg-white rounded-lg shadow-md border border-gray-200'>
          <div className='text-gray-400 text-6xl mb-4'>📝</div>
          <h3 className='text-xl font-semibold text-gray-900 mb-2'>
            {emptyMessage}
          </h3>
          <p className='text-gray-600'>{emptySubMessage}</p>
        </div>
      ) : (
        <div className='bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden'>
          <div className='p-6'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
              {paginatedReviews.map(review => (
                <ReviewCard
                  key={review.id}
                  review={review}
                  onApprove={onApprove}
                  showApprovalControls={showApprovalControls}
                />
              ))}
            </div>
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            totalItems={filteredReviews.length}
            itemsPerPage={itemsPerPage}
          />
        </div>
      )}
    </div>
  );
}
