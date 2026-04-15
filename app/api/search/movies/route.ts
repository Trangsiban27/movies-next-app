import { API_BASE_URL } from "@/constants/apiBaseUrl";
import apiClient from "@/lib/axios.config";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const tmdbToken = process.env.TMDB_READ_ACCESS_TOKEN;
  
  // Lấy các tham số từ URL query string
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');
  const page = searchParams.get('page') || '1';

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
  }

  try {
    const response = await apiClient.get(`${API_BASE_URL}/search/movie`, {
      params: {
        query: query,
        page: page,
      },
      headers: {
        Authorization: `Bearer ${tmdbToken}`,
        accept: 'application/json',
      },
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error('Search Movie Proxy Error:', error.response?.data || error.message);
    return NextResponse.json(
      { error: 'Failed to search movies' },
      { status: error.response?.status || 500 }
    );
  }
}