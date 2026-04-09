import { getMovie, getMovieCast, getMovieReviews, getMovieVideo, getTrendingMovies, getTrendingMoviesByPeriod, getUpcomingMovies } from "@/services/tmdb";
import { create } from "zustand";

interface MoviesStore {
    trendingMovies: any[];
    trendingMoviesByPeriod?: any[];
    upcomingMovies?: any[];
    movie: any;
    movieCasts?: any[];
    movieVideoTrailer?: any[];
    movieReviews?: any[];
    isLoading: boolean;
    totalPages?: number;
    fetchTrendingMovies: () => Promise<void>;
    fetchTrendingMoviesByPeriod?: (period: string, currentPage?: number) => Promise<void>;
    fetchUpcomingMovies: (page?: number) => Promise<void>;
    fetchMovie: (id: number) => Promise<void>;
    fetchMovieCasts: (id: number) => Promise<void>;
    fetchMovieVideos: (id: number) => Promise<void>;
    fetchMovieReviews: (id: number, page?: number) => Promise<void>
}

export const useMoviesStore = create<MoviesStore>((set) => ({
    trendingMovies: [],
    trendingMoviesByPeriod: [],
    upcomingMovies: [],
    movie: {},
    isLoading: true,
    totalPages: 0,
    fetchTrendingMovies: async () => {
        set({isLoading: true})

        try {
            const res = await getTrendingMovies()
            console.log('resss: ', res)
            set({trendingMovies: res?.results, totalPages: res?.total_pages, isLoading: false})
        } catch (err) {
            console.log('err: ', err)
        }
    },
    fetchTrendingMoviesByPeriod: async (period: string, currentPage?: number) => {
        set({isLoading: true})

        try {
            const res = await getTrendingMoviesByPeriod(period, currentPage)

            set({trendingMoviesByPeriod: res?.results, totalPages: res?.total_pages, isLoading: false})
        } catch(err) {
            console.log('err: ', err)
        }
    },
    fetchUpcomingMovies: async (page?: number) => {
        set({isLoading: true})

        try {
            const res = await getUpcomingMovies(page )

            set({upcomingMovies: res?.results, totalPages: res?.total_pages, isLoading: false})
        } catch(err) {
            console.log('err: ', err)
        }
    },
    fetchMovie: async (id: number) => {
        set({isLoading: true})

        try {
            const res = await getMovie(id)

            set({movie: res?.data, isLoading: false})
        } catch(err) {
            console.log('err: ', err)
        }
    },
    fetchMovieCasts: async (id: number) => {
        set({isLoading: true})

        try {
            const res = await getMovieCast(id)

            set({movieCasts: res?.cast, isLoading: false})
        } catch(err) {
            console.log('err: ', err)
        }
    },
    fetchMovieVideos: async (id: number) => {
        set({isLoading: true})

        try {
            const res = await getMovieVideo(id)

            const trailers = res?.filter((video: any) => video?.type === 'Trailer')
            set({movieVideoTrailer: trailers, isLoading: false})
        } catch (err) {
            console.log('err: ', err)
        }
    },
    fetchMovieReviews: async (id: number, page?: number) => {
        set({isLoading: true})

        try {
            const res = await getMovieReviews(id, page)

            set({movieReviews: res?.results, totalPages: res?.total_pages, isLoading: false})
        } catch(err) {
            console.log('err: ', err)
        }
    }
}))