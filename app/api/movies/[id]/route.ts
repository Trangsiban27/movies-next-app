import { API_BASE_URL } from "@/constants/apiBaseUrl";
import apiClient from "@/lib/axios.config";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const tmdbToken = process.env.TMDB_READ_ACCESS_TOKEN;
  const { id } = await params;

  try {
    const response = await apiClient.get(`${API_BASE_URL}/movie/${id}`, {
      headers: {
        Authorization: `Bearer ${tmdbToken}`,
        accept: 'application/json',
      },
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error(`Proxy Error (Movie Detail ${id}):`, error.response?.data || error.message);
    return NextResponse.json(
      { error: 'Failed to fetch movie details' },
      { status: error.response?.status || 500 }
    );
  }
}