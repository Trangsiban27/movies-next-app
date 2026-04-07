import apiClient from "@/lib/axios.config";

const BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;

export const getTrendingMovies = async () => {
    try {
        const res = await apiClient.get(`${BASE_URL}/trending/movie/day`)
        
        return res?.data
    } catch (err) {
        console.log('err: ', err)
    }
}

export const getTrendingMoviesByPeriod = async (period: string, currentPage?: number) => {
    try {
        const res = await apiClient.get(`${BASE_URL}/trending/movie/${period}${currentPage ? `?page=${currentPage}`: ''}`)

        return res?.data
    } catch (err) {
        console.log('err: ', err)
    }
}

export const getTrendingPeople = async (period: string, page?: number) => {
    try {
        const res = await apiClient.get(`${BASE_URL}/trending/person/${period}${page ? `?page=${page}` : ''}`)

        return res?.data
    } catch(err) {
        console.log('err: ', err)
    }
}

export const getTrendingTVSeries = async (period: string, page?: number) => {
    try {
        const res = await apiClient.get(`${BASE_URL}/trending/tv/${period}${page ? `?page=${page}` : ''}`)

        return res?.data
    } catch(err) {
        console.log('err: ', err)
    }
}

export const getUpcomingMovies = async () => {
    try {
        const res = await apiClient.get(`${BASE_URL}/movie/upcoming`)

        return res?.data?.results
    } catch(err) {
        console.log('err: ', err)
    }
}