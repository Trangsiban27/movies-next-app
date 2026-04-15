import { API_BASE_URL } from "@/constants/apiBaseUrl";
import apiClient from "@/lib/axios.config";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const tmdbToken = process.env.TMDB_READ_ACCESS_TOKEN;
  
  // Lấy tham số page từ URL query (ví dụ: /api/movies/upcoming?page=2)
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') || '1';

  try {
    const response = await apiClient.get(`${API_BASE_URL}/movie/upcoming`, {
      params: {
        page: page,
      },
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error('Proxy Error (Upcoming):', error.response?.data || error.message);
    return NextResponse.json(
      { error: 'Failed to fetch upcoming movies' },
      { status: error.response?.status || 500 }
    );
  }
}