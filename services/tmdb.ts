import { useUserStore } from "@/hooks/useUserStore";
import apiClient from "@/lib/axios.config";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;

export const getTrendingMovies = async () => {
    try {
        const res = await axios.get(`/api/movies/trending`)
        
        return res?.data
    } catch (err) {
        console.log('err: ', err)
    }
}

export const getTrendingMoviesByPeriod = async (period: string, currentPage?: number) => {
    try {
        const res = await axios.get(`/api/movies/trending`, {
            params: {
                period: period,
                page: currentPage
            }
        })

        return res?.data
    } catch (err) {
        console.log('err: ', err)
    }
}

export const getTrendingPeople = async (period: string, page?: number) => {
    try {
        const res = await axios.get('/api/people/trending', {
            params: {
                period: period,
                page: page
            }
        });

        return res?.data
    } catch(err) {
        console.log('err: ', err)
    }
}

export const getTrendingTVSeries = async (period: string, page?: number) => {
    try {
        const res = await axios.get('/api/tv-series/trending', {
            params: {
                period: period,
                page: page
            }
        });

        return res?.data
    } catch(err) {
        console.log('err: ', err)
    }
}

export const getUpcomingMovies = async (page?: number) => {
    try {
        const res = await axios.get('/api/movies/upcoming', {
            params: {
                page: page
            }
        });

        return res?.data
    } catch(err) {
        console.log('err: ', err)
    }
}

export const getMovie = async (id: number) => {
    try {
        const res = await axios.get(`/api/movies/${id}`);

        return res
    } catch (err) {
        console.log('err: ', err)
    }
}

export const getMovieCast = async (id: number) => {
    try {
        const res = await axios.get(`/api/movie/${id}/cast`);

        return res?.data
    } catch(err) {
        console.log('err: ', err)
    }
}

export const getMovieVideo = async (id: number) => {
    try {
        const res = await axios.get(`/api/movie/${id}/videos`);

        return res?.data?.results
    } catch (err) {
        console.log('err: ', err)
    }
}

export const getMovieReviews = async (id: number, page?: number) => {
    try {
        const res = await axios.get(`/api/movie/${id}/reviews`, {
            params: {
                page: page
            }
        });

        return res?.data
    } catch(err) {
        console.log('err: ', err)
    }
}

export const addMovieFavourite = async (accountId: number, media_id: number, favorite: boolean) => {

    try {
        const res = await axios.post(`/api/movie/${accountId}/favorite`, {
            media_id, 
            favorite
        });

        return res
    } catch(err) {
        console.log('err: ', err)
    }
}

export const getMovieFavourite = async (movieId: number) => {
    try {
        const res = await axios.get(`/api/movie/${movieId}/favorite`);

        return res?.data
    } catch (err) {
        console.log('err: ', err)
    }
}

export const getFavoriteMovies = async (id: number, page: number) => {
    try {
        const res = await axios.get(`/api/favorites/${id}/movies`, {
            params: {
                page,
            }
        })

        return res
    } catch (err) {
        console.log('err: ', err)
    }
}

//Tv series
export const getTVSerie = async (id: number) => {
    try {
        const res = await axios.get(`/api/tv-series/${id}`);

        return res?.data
    } catch (err) {
        console.log('err: ', err)
    }
}

export const getTVSeriesCredits = async (id: number) => {
    try {
        const res = await axios.get(`/api/tv-series/${id}/credits`);

        return res?.data
    } catch (err) {
        console.log('err: ', err)
    }
}

export const getTVSeriesVideos = async (id: number) => {
    try {
        const res = await axios.get(`/api/tv-series/${id}/videos`);

        return res?.data?.results
    } catch (err) {
        console.log('err: ', err)
    }
}

export const getTVSeriesImages = async (id: number) => {
    try {
        const res = await axios.get(`/api/tv-series/${id}/images`);

        return res?.data
    } catch (err) {
        console.log('err: ', err)
    }
}

export const getTVSeriesSimilar = async (id: number, page: number) => {
    try {
        const res = await axios.get(`/api/tv-series/${id}/similar`, {
            params: {
                page: page
            }
        });

        return res?.data
    } catch (err) {
        console.log('err: ', err)
    }
}

export const getTVSeriesReviews = async (id: number, page: number) => {
    try {
        const res = await axios.get(`/api/tv-series/${id}/reviews`, {
            params: {
                page: page
            }
        });

        return res?.data
    } catch (err) {
        console.log('err: ', err)
    }
}

//search
export const searchKeyword = async (query: string, page: number) => {
    try {
        const res = await axios.get('/api/search/keyword', {
            params: {
                query,
                // Giữ nguyên logic tăng trang của bạn
                page: Number(page) + 1
            }
        });

        return res?.data
    } catch (err) {
        console.log('err: ', err)
    }
}

export const searchMovies = async (query: string, page: number) => {
    try {
        const res = await axios.get('/api/search/movies', {
            params: {
                query,
                page: Number(page) + 1
            }
        });

        return res?.data
    } catch (err) {
        console.log('err: ', err)
    }
}

export const searchTvSeries = async (query: string, page: number) => {
    try {
        const res = await axios.get('/api/search/tv', {
            params: {
                query,
                page: Number(page) + 1
            }
        });

        return res?.data
    } catch (err) {
        console.log('err: ', err)
    }
}