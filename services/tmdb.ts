import apiClient from "@/lib/axios.config";

const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = process.env.TMDB_BASE_URL;

export const getTrendingMovies = async () => {
    try {
        const res = await apiClient.get('/trending/movie/day')
        
        return res?.data?.results
    } catch (err) {
        console.log('err: ', err)
    }
}