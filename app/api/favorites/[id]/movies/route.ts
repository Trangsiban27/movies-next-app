import { API_BASE_URL } from "@/constants/apiBaseUrl";
import axios from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

interface RouteParams {
  id: string;
}

export const GET = async (request: NextRequest, {params}: {params: Promise<RouteParams>}) => {
    const cookiesStore = await cookies()
    const sessionId = cookiesStore.get('tmdb_session_id')?.value

    if (!sessionId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const {id} = await params

        const {searchParams} = new URL(request.url)
        const page = searchParams?.get('page')

        const res = await axios.get(`${API_BASE_URL}/account/${Number(id)}/favorite/movies`, {
            params: {
                session_id: sessionId,
                page: Number(page) + 1,
            },
            headers: {
                Authorization: `Bearer ${process.env.TMDB_READ_ACCESS_TOKEN}`,
                accept: 'application/json',
            }
        })

        return NextResponse.json(res?.data)

    } catch (err: any) {
        console.error('Error fetching account state:', err.response?.data || err.message);

        return NextResponse.json(
            { 
                error: 'Failed to fetch favorites', 
                message: err.response?.data?.status_message || err.message 
            }, 
            { status: err.response?.status || 500 }
        );
    }
}