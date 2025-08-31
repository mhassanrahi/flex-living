"use client";

import { ReviewFilters as ReviewFiltersType } from "@/types/reviews";
import { useState } from "react";

interface ReviewFiltersProps {
  filters: ReviewFiltersType;
  onFiltersChange: (filters: ReviewFiltersType) => void;
  listings: string[];
  categories: string[];
}

// Type for filter values based on the ReviewFilters interface
type FilterValue =
  | number
  | string
  | { start?: string; end?: string }
  | boolean
  | undefined;

export default function ReviewFilters({
  filters,
  onFiltersChange,
  listings,
  categories,
}: ReviewFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleFilterChange = (
    key: keyof ReviewFiltersType,
    value: FilterValue
  ) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const clearFilters = () => {
    onFiltersChange({});
  };

  const hasActiveFilters = Object.keys(filters).length > 0;

  return (
    <div className='bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6'>
      <div className='flex justify-between items-center mb-4'>
        <h3 className='text-lg font-semibold text-gray-900'>Filters</h3>
        <div className='flex gap-2'>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className='px-3 py-1 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded hover:bg-gray-50'
            >
              Clear All
            </button>
          )}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className='px-3 py-1 text-sm text-blue-600 hover:text-blue-800 border border-blue-300 rounded hover:bg-blue-50 cursor-pointer '
          >
            {isExpanded ? "Hide" : "Show"} Filters
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
          {/* Rating Filter */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Minimum Rating
            </label>
            <select
              value={filters.rating || ""}
              onChange={e =>
                handleFilterChange(
                  "rating",
                  e.target.value ? Number(e.target.value) : undefined
                )
              }
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              <option value=''>Any Rating</option>
              <option value='5'>5+ Stars</option>
              <option value='4'>4+ Stars</option>
              <option value='3'>3+ Stars</option>
              <option value='2'>2+ Stars</option>
              <option value='1'>1+ Star</option>
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Category
            </label>
            <select
              value={filters.category || ""}
              onChange={e =>
                handleFilterChange("category", e.target.value || undefined)
              }
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              <option value=''>All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category
                    .replace("_", " ")
                    .replace(/\b\w/g, l => l.toUpperCase())}
                </option>
              ))}
            </select>
          </div>

          {/* Listing Filter */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Property
            </label>
            <select
              value={filters.listingName || ""}
              onChange={e =>
                handleFilterChange("listingName", e.target.value || undefined)
              }
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              <option value=''>All Properties</option>
              {listings.map(listing => (
                <option key={listing} value={listing}>
                  {listing}
                </option>
              ))}
            </select>
          </div>

          {/* Review Type Filter */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Review Type
            </label>
            <select
              value={filters.type || ""}
              onChange={e =>
                handleFilterChange("type", e.target.value || undefined)
              }
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              <option value=''>All Types</option>
              <option value='guest-to-host'>Guest Reviews</option>
              <option value='host-to-guest'>Host Reviews</option>
            </select>
          </div>

          {/* Date Range Filters */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Start Date
            </label>
            <input
              type='date'
              value={filters.dateRange?.start || ""}
              onChange={e =>
                handleFilterChange("dateRange", {
                  ...filters.dateRange,
                  start: e.target.value,
                })
              }
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              End Date
            </label>
            <input
              type='date'
              value={filters.dateRange?.end || ""}
              onChange={e =>
                handleFilterChange("dateRange", {
                  ...filters.dateRange,
                  end: e.target.value,
                })
              }
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          {/* Approval Status Filter */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Approval Status
            </label>
            <select
              value={
                filters.approved === undefined
                  ? ""
                  : filters.approved.toString()
              }
              onChange={e =>
                handleFilterChange(
                  "approved",
                  e.target.value === "" ? undefined : e.target.value === "true"
                )
              }
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              <option value=''>All Status</option>
              <option value='true'>Approved</option>
              <option value='false'>Pending/Rejected</option>
            </select>
          </div>
        </div>
      )}

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className='mt-4 pt-4 border-t border-gray-200'>
          <h4 className='text-sm font-medium text-gray-700 mb-2'>
            Active Filters:
          </h4>
          <div className='flex flex-wrap gap-2'>
            {filters.rating && (
              <span className='px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full'>
                {filters.rating}+ Stars
              </span>
            )}
            {filters.category && (
              <span className='px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full'>
                {filters.category.replace("_", " ")}
              </span>
            )}
            {filters.listingName && (
              <span className='px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full'>
                {filters.listingName}
              </span>
            )}
            {filters.type && (
              <span className='px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full'>
                {filters.type === "guest-to-host"
                  ? "Guest Reviews"
                  : "Host Reviews"}
              </span>
            )}
            {filters.approved !== undefined && (
              <span className='px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full'>
                {filters.approved ? "Approved" : "Pending/Rejected"}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
