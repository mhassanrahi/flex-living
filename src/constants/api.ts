// Mock Google reviews
export const mockGoogleReviews = [
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

// Mock Hostaway reviews
export const mockHostawayReviews = [
  {
    id: 7453,
    type: "host-to-guest",
    status: "published",
    rating: null,
    publicReview:
      "Shane and family are wonderful! Would definitely host again :)",
    reviewCategory: [
      { category: "cleanliness", rating: 10 },
      { category: "communication", rating: 10 },
      { category: "respect_house_rules", rating: 10 },
    ],
    submittedAt: "2020-08-21 22:45:14",
    guestName: "Shane Finkelstein",
    listingName: "2B N1 A - 29 Shoreditch Heights",
  },
  {
    id: 7454,
    type: "guest-to-host",
    status: "published",
    rating: 4.5,
    publicReview:
      "Great location and clean apartment. The check-in process was smooth.",
    reviewCategory: [
      { category: "cleanliness", rating: 5 },
      { category: "communication", rating: 4 },
      { category: "check_in", rating: 5 },
      { category: "accuracy", rating: 4 },
    ],
    submittedAt: "2020-08-22 14:30:00",
    guestName: "Sarah Johnson",
    listingName: "2B N1 A - 29 Shoreditch Heights",
  },
  {
    id: 7455,
    type: "guest-to-host",
    status: "published",
    rating: 3.0,
    publicReview:
      "The apartment was okay but could use some maintenance. The heating wasn't working properly.",
    reviewCategory: [
      { category: "cleanliness", rating: 4 },
      { category: "communication", rating: 3 },
      { category: "maintenance", rating: 2 },
      { category: "value", rating: 3 },
    ],
    submittedAt: "2020-08-23 09:15:30",
    guestName: "Michael Chen",
    listingName: "1B Studio - 15 Brick Lane",
  },
  {
    id: 7456,
    type: "guest-to-host",
    status: "published",
    rating: 5.0,
    publicReview:
      "Absolutely perfect stay! The apartment exceeded our expectations. Will definitely book again.",
    reviewCategory: [
      { category: "cleanliness", rating: 5 },
      { category: "communication", rating: 5 },
      { category: "location", rating: 5 },
      { category: "value", rating: 5 },
    ],
    submittedAt: "2020-08-24 16:45:22",
    guestName: "Emma Wilson",
    listingName: "3B Penthouse - 45 Spitalfields",
  },
  {
    id: 7457,
    type: "guest-to-host",
    status: "published",
    rating: 4.0,
    publicReview:
      "Good experience overall. The apartment was clean and well-located. Minor issues with WiFi.",
    reviewCategory: [
      { category: "cleanliness", rating: 5 },
      { category: "communication", rating: 4 },
      { category: "location", rating: 5 },
      { category: "amenities", rating: 3 },
    ],
    submittedAt: "2020-08-25 11:20:15",
    guestName: "David Brown",
    listingName: "2B N1 A - 29 Shoreditch Heights",
  },
];
