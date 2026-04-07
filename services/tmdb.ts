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

export const getTrendingMoviesByPeriod = async (period: string) => {
    try {
        const res = await apiClient.get(`${BASE_URL}/trending/movie/${period}`)

        return res?.data?.results
    } catch (err) {
        console.log('err: ', err)
    }
}

export const getTrendingPeople = async (period: string) => {
    try {
        const res = await apiClient.get(`${BASE_URL}/trending/person/${period}`)

        return res?.data?.results
    } catch(err) {
        console.log('err: ', err)
    }
}