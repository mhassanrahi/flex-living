import { NextRequest, NextResponse } from "next/server";
import { mockGoogleReviews } from "@/constants/api";

export async function GET(_request: NextRequest) {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

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
