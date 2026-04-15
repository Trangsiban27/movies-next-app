import { API_BASE_URL } from "@/constants/apiBaseUrl";
import apiClient from "@/lib/axios.config";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const tmdbToken = process.env.TMDB_READ_ACCESS_TOKEN;
  
  // Lấy params từ URL của trình duyệt gửi lên
  const { searchParams } = new URL(request.url);
  const period = searchParams.get('period') || 'day';
  const page = searchParams.get('page') || '1';

  try {
    const response = await apiClient.get(`${API_BASE_URL}/trending/movie/${period}`, {
      params: {
        page: page,
      },
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error('TMDB Proxy Error:', error.response?.data || error.message);
    return NextResponse.json(
      { error: 'Failed to fetch trending' },
      { status: error.response?.status || 500 }
    );
  }
}