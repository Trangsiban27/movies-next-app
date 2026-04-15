import { API_BASE_URL } from "@/constants/apiBaseUrl";
import apiClient from "@/lib/axios.config";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const tmdbToken = process.env.TMDB_READ_ACCESS_TOKEN;
  const { id } = await params;

  // Lấy tham số page từ URL query string
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') || '1';

  try {
    const response = await apiClient.get(`${API_BASE_URL}/tv/${id}/similar`, {
      headers: {
        Authorization: `Bearer ${tmdbToken}`,
        accept: 'application/json',
      },
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error(`Proxy Error (TV Similar ${id}):`, error.response?.data || error.message);
    return NextResponse.json(
      { error: 'Failed to fetch similar TV series' },
      { status: error.response?.status || 500 }
    );
  }
}