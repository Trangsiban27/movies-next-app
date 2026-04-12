import { getFavoriteMovies } from "@/services/tmdb";
import { create } from "zustand";

interface FavoritesProps {
    isLoading?: boolean;
    movies: any[];
    totalPages?: number;
    fetchFavoriteMovies: (id: number, page: number) => Promise<void>
}

export const useFavoritesStore = create<FavoritesProps>((set) => ({
    isLoading: true,
    movies: [],
    totalPages: 0,
    fetchFavoriteMovies: async (id: number, page: number) => {
        set({isLoading: true})

        try {
            const res = await getFavoriteMovies(id, page) as any

            set({isLoading: false, movies: res?.data?.results, totalPages: res?.total_pages})
        } catch (err) {
            console.log('err: ', err)
            set({isLoading: false})
        }
    } 
}))