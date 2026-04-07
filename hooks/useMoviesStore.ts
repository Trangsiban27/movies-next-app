import { getTrendingMovies, getTrendingMoviesByPeriod, getUpcomingMovies } from "@/services/tmdb";
import { create } from "zustand";

interface MoviesStore {
    trendingMovies: any[];
    trendingMoviesByPeriod?: any[];
    upcomingMovies?: any[];
    isLoading: boolean;
    totalPages?: number;
    fetchTrendingMovies: () => Promise<void>;
    fetchTrendingMoviesByPeriod?: (period: string, currentPage?: number) => Promise<void>;
    fetchUpcomingMovies: () => Promise<void>;
}

export const useMoviesStore = create<MoviesStore>((set) => ({
    trendingMovies: [],
    trendingMoviesByPeriod: [],
    upcomingMovies: [],
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
    fetchUpcomingMovies: async () => {
        set({isLoading: true})

        try {
            const res = await getUpcomingMovies()

            set({upcomingMovies: res, isLoading: false})
        } catch(err) {
            console.log('err: ', err)
        }
    }
}))