import { API_BASE_URL } from "@/constants/apiBaseUrl";
import apiClient from "@/lib/axios.config";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const tmdbToken = process.env.TMDB_READ_ACCESS_TOKEN;
  
  // Lấy các tham số từ URL
  const { searchParams } = new URL(request.url);
  const period = searchParams.get('period') || 'day';
  const page = searchParams.get('page') || '1';

  try {
    const response = await apiClient.get(`${API_BASE_URL}/trending/person/${period}`, {
      params: {
        page: page,
        language: 'vi-VN',
      },
      headers: {
        Authorization: `Bearer ${tmdbToken}`,
        accept: 'application/json',
      },
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error('TMDB People Proxy Error:', error.response?.data || error.message);
    return NextResponse.json(
      { error: 'Failed to fetch trending people' },
      { status: error.response?.status || 500 }
    );
  }
}