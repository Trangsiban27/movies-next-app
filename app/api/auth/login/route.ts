import { API_BASE_URL } from "@/constants/apiBaseUrl";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
  // 1. Lấy Token bảo mật từ biến môi trường của Server (Vercel)
  const tmdbToken = process.env.TMDB_READ_ACCESS_TOKEN;

  if (!tmdbToken) {
    console.error('Missing TMDB_READ_ACCESS_TOKEN in environment variables!');
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }

  try {
    // 2. Gọi TMDB API TỪ SERVER (An toàn, không bị CORS, không lộ Key)
    const response = await axios.get(`${API_BASE_URL}/authentication/token/new`, {
      headers: {
        Authorization: `Bearer ${tmdbToken}`,
        accept: 'application/json',
      },
    });

    // 3. Trả lại dữ liệu (chứa request_token) cho Client của bạn
    return NextResponse.json(response.data);

  } catch (error: any) {
    console.error('Error fetching request token from TMDB:', error.response?.data || error.message);

    // Chuyển tiếp mã lỗi từ TMDB (ví dụ: 401 nếu Token sai) hoặc trả về 500
    return NextResponse.json(
      { 
        error: 'Failed to fetch request token', 
        message: error.response?.data?.status_message || error.message 
      },
      { status: error.response?.status || 500 }
    );
  }
}