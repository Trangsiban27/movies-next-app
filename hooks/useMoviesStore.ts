import { getTrendingMovies, getTrendingMoviesByPeriod } from "@/services/tmdb";
import { create } from "zustand";

interface MoviesStore {
    trendingMovies: any[];
    trendingMoviesByPeriod?: any[];
    isLoading: boolean;
    fetchTrendingMovies: () => Promise<void>;
    fetchTrendingMoviesByPeriod?: (period: string) => Promise<void>;
}

export const useMoviesStore = create<MoviesStore>((set) => ({
    trendingMovies: [],
    isLoading: true,
    fetchTrendingMovies: async () => {
        set({isLoading: true})

        try {
            const res = await getTrendingMovies()
            console.log('resss: ', res)
            set({trendingMovies: res, isLoading: false})
        } catch (err) {
            console.log('err: ', err)
        }
    },
    fetchTrendingMoviesByPeriod: async (period: string) => {
        set({isLoading: true})

        try {
            const res = await getTrendingMoviesByPeriod(period)

            set({trendingMoviesByPeriod: res, isLoading: false})
        } catch(err) {
            console.log('err: ', err)
        }
    }
}))