interface SortControlsProps {
  sortBy: "date" | "rating" | "property";
  sortOrder: "asc" | "desc";
  onSortByChange: (sortBy: "date" | "rating" | "property") => void;
  onSortOrderChange: (sortOrder: "asc" | "desc") => void;
}

export default function SortControls({
  sortBy,
  sortOrder,
  onSortByChange,
  onSortOrderChange,
}: SortControlsProps) {
  return (
    <div className='flex items-center gap-2'>
      <select
        value={sortBy}
        onChange={e =>
          onSortByChange(e.target.value as "date" | "rating" | "property")
        }
        className='px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm'
      >
        <option value='date'>Date</option>
        <option value='rating'>Rating</option>
        <option value='property'>Property</option>
      </select>
      <button
        onClick={() => onSortOrderChange(sortOrder === "asc" ? "desc" : "asc")}
        className='p-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors'
      >
        {sortOrder === "asc" ? "↑" : "↓"}
      </button>
    </div>
  );
}
