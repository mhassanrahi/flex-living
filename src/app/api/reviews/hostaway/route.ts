import { NextResponse } from "next/server";
import { mockHostawayReviews } from "@/constants/api";

export async function GET() {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));

    return NextResponse.json({
      status: "success",
      result: mockHostawayReviews,
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      { status: "error", message: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}
