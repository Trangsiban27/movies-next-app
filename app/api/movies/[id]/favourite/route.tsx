import apiClient from "@/lib/axios.config";
import axios from "axios";
import { cookies } from "next/headers"
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
    const cookiesStore = cookies()
    const sessionId = (await cookiesStore).get('tmdb_session_id')?.value

    if (!sessionId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { media_id, favorite, accountId } = await request.json();

        const res = await axios.post(
            `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/account/${accountId}/favorite`,
            {
                media_type: "movie",
                media_id: media_id,
                favorite: favorite // true để thêm, false để xóa
            },
            {
                params: { session_id: sessionId },
                headers: { Authorization: `Bearer ${process.env.TMDB_READ_ACCESS_TOKEN}` }
            }
        );

        return NextResponse.json(res.data);
    } catch (err) {
        console.log('err: ', err)
    }
}

export const GET = async (request: Request, { params }: { params: Promise<{ id: number }> }) => {
    const cookiesStore = await cookies()
    const sessionId = cookiesStore.get('tmdb_session_id')?.value

    if (!sessionId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { id } = await params;
        const res = await axios.get(
            `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/movie/${id}/account_states`,
            {
                params: {
                    session_id: sessionId
                },
                headers: {
                    Authorization: `Bearer ${process.env.TMDB_READ_ACCESS_TOKEN}`,
                    accept: 'application/json',
                }
            }
        );

        return NextResponse.json(res.data);
    } catch (err: any) {
        console.error('Error fetching account state:', err.response?.data || err.message);
        return NextResponse.json(
            { error: 'Failed to fetch account state' },
            { status: err.response?.status || 500 }
        );
    }
}