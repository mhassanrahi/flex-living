import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-blue-600">FlexLiving</div>
            </div>
            <nav className="flex space-x-8">
              <Link 
                href="/dashboard" 
                className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Dashboard
              </Link>
              <Link 
                href="/properties" 
                className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Properties
              </Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Welcome to FlexLiving Reviews
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Manage and analyze guest reviews across all your properties. 
            Get insights into performance, spot trends, and ensure guest satisfaction.
          </p>
          
          <div className="flex justify-center gap-4 mb-12">
            <Link
              href="/dashboard"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Go to Dashboard
            </Link>
            <Link
              href="/properties"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium border border-blue-600 hover:bg-blue-50 transition-colors"
            >
              View Properties
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-blue-600 text-3xl mb-4">📊</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Analytics Dashboard</h3>
            <p className="text-gray-600">
              Comprehensive analytics and insights to track property performance and guest satisfaction.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-blue-600 text-3xl mb-4">🔍</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Filtering</h3>
            <p className="text-gray-600">
              Filter reviews by rating, category, property, date range, and more to find exactly what you need.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-blue-600 text-3xl mb-4">✅</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Review Management</h3>
            <p className="text-gray-600">
              Approve or reject reviews before they appear on your public property pages.
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-16 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">System Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">5</div>
              <div className="text-sm text-gray-600">Total Reviews</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">3</div>
              <div className="text-sm text-gray-600">Properties</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600">4.1</div>
              <div className="text-sm text-gray-600">Avg Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">80%</div>
              <div className="text-sm text-gray-600">Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
