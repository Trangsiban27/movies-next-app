import { getTrendingMovies } from "@/services/tmdb";
import { create } from "zustand";

interface MoviesStore {
    trendingMovies: any[];
    isLoading: boolean;
    fetchTrendingMovies: () => Promise<void>
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
    }
}))