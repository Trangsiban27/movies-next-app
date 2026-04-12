import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const GET = async () => {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get('tmdb_session_id')?.value;

    if (!sessionId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/account`, {
        params: { session_id: sessionId },
        headers: {
            Authorization: `Bearer ${process.env.TMDB_READ_ACCESS_TOKEN}`
        }
        });
        return NextResponse.json(res.data);
    } catch (error) {
        return NextResponse.json({ error: 'Fetch failed' }, { status: 500 });
    }
}