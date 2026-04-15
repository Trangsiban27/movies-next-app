import { API_BASE_URL } from "@/constants/apiBaseUrl";
import apiClient from "@/lib/axios.config";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const cookiesStore = await cookies();
  const sessionId = cookiesStore.get("tmdb_session_id")?.value;

  // 1. Kiểm tra xác thực (Session ID)
  if (!sessionId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params; // id ở đây là accountId từ URL
    const body = await request.json();
    const { media_id, favorite } = body;

    // 2. Gọi API TMDB để thêm/xóa khỏi danh sách yêu thích
    // Endpoint: /account/{account_id}/favorite
    const res = await apiClient.post(`${API_BASE_URL}/account/${id}/favorite`,
      {
        media_type: "movie", 
        media_id: media_id,
        favorite: favorite,
      },
      {
        params: {
          session_id: sessionId,
        },
      }
    );

    return NextResponse.json(res?.data);
  } catch (err: any) {
    console.error("Error adding favorite:", err.response?.data || err.message);
    return NextResponse.json(
      { 
        error: "Failed to update favorite status", 
        message: err.response?.data?.status_message || err.message 
      },
      { status: err.response?.status || 500 }
    );
  }
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("tmdb_session_id")?.value;

  // 1. Kiểm tra xác thực (Bạn phải có session_id để xem trạng thái account_states)
  if (!sessionId) {
    return NextResponse.json({ favorite: false }, { status: 200 });
  }

  try {
    // 2. Gọi TMDB để lấy trạng thái tài khoản đối với phim này (account_states)
    const response = await apiClient.get(`${API_BASE_URL}/movie/${id}/account_states`, {
      params: {
        session_id: sessionId,
      },
      headers: {
        Authorization: `Bearer ${process.env.TMDB_READ_ACCESS_TOKEN}`,
        accept: 'application/json',
      },
    });

    // TMDB trả về object: { id: 123, favorite: true/false, rated: ..., watchlist: ... }
    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("TMDB Account States Error:", error.response?.data || error.message);
    return NextResponse.json(
      { error: "Failed to fetch favorite status" },
      { status: error.response?.status || 500 }
    );
  }
}