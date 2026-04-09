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

export const getUpcomingMovies = async (page?: number) => {
    try {
        const res = await apiClient.get(`${BASE_URL}/movie/upcoming${page ? `?page=${page}` : ''}`)

        return res?.data
    } catch(err) {
        console.log('err: ', err)
    }
}

export const getMovie = async (id: number) => {
    try {
        const res = await apiClient.get(`${BASE_URL}/movie/${id}`)

        return res
    } catch (err) {
        console.log('err: ', err)
    }
}

export const getMovieCast = async (id: number) => {
    try {
        const res = await apiClient.get(`${BASE_URL}/movie/${id}/credits`)

        return res?.data
    } catch(err) {
        console.log('err: ', err)
    }
}

export const getMovieVideo = async (id: number) => {
    try {
        const res = await apiClient.get(`${BASE_URL}/movie/${id}/videos`)

        return res?.data?.results
    } catch (err) {
        console.log('err: ', err)
    }
}

export const getMovieReviews = async (id: number, page?: number) => {
    try {
        const res = await apiClient.get(`${BASE_URL}/movie/${id}/reviews${page ? `?page=${page}` : ''}`)

        return res?.data
    } catch(err) {
        console.log('err: ', err)
    }
}

//Tv series
export const getTVSerie = async (id: number) => {
    try {
        const res = await apiClient.get(`${BASE_URL}/tv/${id}`)

        return res?.data
    } catch (err) {
        console.log('err: ', err)
    }
}