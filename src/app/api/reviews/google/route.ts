import { NextRequest, NextResponse } from "next/server";

// Mock Google Places API response for development
const mockGoogleReviews = [
  {
    id: "google_1",
    type: "guest-to-host",
    status: "published",
    rating: 5,
    publicReview:
      "Amazing stay! The property was exactly as described and the location was perfect for exploring the city. Highly recommend!",
    reviewCategory: [
      { category: "cleanliness", rating: 5 },
      { category: "communication", rating: 5 },
      { category: "check_in", rating: 5 },
      { category: "accuracy", rating: 5 },
      { category: "location", rating: 5 },
      { category: "value", rating: 4 },
    ],
    submittedAt: "2024-01-15 14:30:00",
    guestName: "Sarah Johnson",
    listingName: "2B N1 A - 29 Shoreditch Heights",
    source: "google",
    approved: true,
  },
  {
    id: "google_2",
    type: "guest-to-host",
    status: "published",
    rating: 4,
    publicReview:
      "Great location and clean apartment. The check-in process was smooth. Would stay again!",
    reviewCategory: [
      { category: "cleanliness", rating: 4 },
      { category: "communication", rating: 5 },
      { category: "check_in", rating: 5 },
      { category: "accuracy", rating: 4 },
      { category: "location", rating: 5 },
      { category: "value", rating: 4 },
    ],
    submittedAt: "2024-01-10 09:15:00",
    guestName: "Michael Chen",
    listingName: "1B N2 B - 15 Brick Lane",
    source: "google",
    approved: true,
  },
  {
    id: "google_3",
    type: "guest-to-host",
    status: "published",
    rating: 3,
    publicReview:
      "The apartment was okay but could use some updates. Location was convenient though.",
    reviewCategory: [
      { category: "cleanliness", rating: 3 },
      { category: "communication", rating: 4 },
      { category: "check_in", rating: 4 },
      { category: "accuracy", rating: 3 },
      { category: "location", rating: 4 },
      { category: "value", rating: 3 },
    ],
    submittedAt: "2024-01-05 16:45:00",
    guestName: "Emma Wilson",
    listingName: "3B N3 C - 42 Spitalfields",
    source: "google",
    approved: false,
  },
];

export async function GET(_request: NextRequest) {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // In production, this would make a real API call to Google Places API
    // const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    // const placeId = process.env.GOOGLE_PLACE_ID;

    // const response = await fetch(
    //   `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${apiKey}`
    // );

    // const data = await response.json();
    // const reviews = data.result.reviews || [];

    return NextResponse.json({
      status: "success",
      result: mockGoogleReviews,
      source: "google",
      total: mockGoogleReviews.length,
    });
  } catch (error) {
    console.error("Error fetching Google reviews:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to fetch Google reviews",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
