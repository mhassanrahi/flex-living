"use client";

import { useState } from "react";

export default function GoogleReviewsExploration() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className='bg-white rounded-lg shadow-md border border-gray-200 p-6'>
      <div className='flex justify-between items-center mb-4'>
        <h3 className='text-lg font-semibold text-gray-900'>
          Google Reviews Integration
        </h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className='px-3 py-1 text-sm text-blue-600 hover:text-blue-800 border border-blue-300 rounded hover:bg-blue-50'
        >
          {isExpanded ? "Hide" : "Show"} Details
        </button>
      </div>

      {isExpanded && (
        <div className='space-y-4'>
          <div className='bg-green-50 border border-green-200 rounded-lg p-4'>
            <h4 className='font-semibold text-green-900 mb-2'>
              Integration Status: ✅ Complete
            </h4>
            <p className='text-green-800 text-sm'>
              Google Reviews integration has been successfully implemented!
              Google reviews are now available in the dashboard alongside
              Hostaway reviews.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='border border-gray-200 rounded-lg p-4'>
              <h5 className='font-semibold text-gray-900 mb-2'>
                ✅ Feasible Options
              </h5>
              <ul className='text-sm text-gray-600 space-y-1'>
                <li>• Google Places API (Places API)</li>
                <li>• Google My Business API</li>
                <li>• Third-party review aggregation services</li>
                <li>• Manual import via CSV/JSON</li>
              </ul>
            </div>

            <div className='border border-gray-200 rounded-lg p-4'>
              <h5 className='font-semibold text-gray-900 mb-2'>
                ⚠️ Challenges
              </h5>
              <ul className='text-sm text-gray-600 space-y-1'>
                <li>• API rate limits and quotas</li>
                <li>• Requires Google Cloud account</li>
                <li>• Business verification needed</li>
                <li>• Limited historical data access</li>
              </ul>
            </div>
          </div>

          <div className='border border-gray-200 rounded-lg p-4'>
            <h5 className='font-semibold text-gray-900 mb-2'>
              🔧 Implementation Steps
            </h5>
            <ol className='text-sm text-gray-600 space-y-2'>
              <li>1. Set up Google Cloud Project and enable Places API</li>
              <li>2. Create API credentials and manage quotas</li>
              <li>3. Implement review fetching logic</li>
              <li>4. Add review approval workflow</li>
              <li>5. Integrate with existing dashboard</li>
            </ol>
          </div>

          <div className='bg-yellow-50 border border-yellow-200 rounded-lg p-4'>
            <h5 className='font-semibold text-yellow-900 mb-2'>
              💡 Recommendation
            </h5>
            <p className='text-yellow-800 text-sm'>
              For the initial implementation, focus on the Hostaway integration.
              Google Reviews can be added as a future enhancement once the core
              system is stable and user feedback is gathered.
            </p>
          </div>

          <div className='flex gap-2'>
            <button className='px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm'>
              ✅ Integration Complete
            </button>
            <button className='px-4 py-2 bg-blue-200 text-blue-700 rounded hover:bg-blue-300 text-sm'>
              View Google Reviews
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
