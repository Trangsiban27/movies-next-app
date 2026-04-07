import apiClient from "@/lib/axios.config";

const BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;

export const getTrendingMovies = async () => {
    try {
        const res = await apiClient.get(`${BASE_URL}/trending/movie/day`)
        
        return res?.data?.results
    } catch (err) {
        console.log('err: ', err)
    }
}