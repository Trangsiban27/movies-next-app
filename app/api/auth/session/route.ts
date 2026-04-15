import { API_BASE_URL } from "@/constants/apiBaseUrl";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // 1. Lấy Token bảo mật từ biến môi trường của Server (Vercel)
  const tmdbToken = process.env.TMDB_READ_ACCESS_TOKEN;

  if (!tmdbToken) {
    console.error('Missing TMDB_READ_ACCESS_TOKEN in environment variables!');
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }

  try {
    const body = await request.json();
    const { request_token } = body;

    console.log('requestToken: ', request_token)

    if (!request_token) {
      return NextResponse.json({ error: 'Bad Request', message: 'Missing requestToken' }, { status: 400 });
    }

    const response = await axios.post(`${API_BASE_URL}/authentication/session/new`, 
      {
        request_token: request_token, 
      },
      {
        headers: {
          Authorization: `Bearer ${tmdbToken}`, 
          accept: 'application/json',
        },
      }
    );
    return NextResponse.json(response.data);

  } catch (error: any) {
    console.error('Error creating session ID from TMDB:', error.response?.data || error.message);

    return NextResponse.json(
      { 
        error: 'Failed to create session ID', 
        message: error.response?.data?.status_message || error.message 
      },
      { status: error.response?.status || 500 }
    );
  }
}