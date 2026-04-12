import { searchKeyword, searchMovies, searchTvSeries } from "@/services/tmdb";
import { create } from "zustand";

interface SearchStore {
    isLoading: boolean,
    keywords: any[],
    movies: any[],
    tvs: any[],
    totalPages: number,
    fetchKeywords: (query: string, page: number) => Promise<void>
    fetchMovies: (query: string, page: number) => Promise<void>
    fetchTvs: (query: string, page: number) => Promise<void>
}

export const useSearchStore = create<SearchStore>((set) => ({
    isLoading: true,
    keywords: [],
    movies: [],
    tvs: [],
    totalPages: 0,
    fetchKeywords: async (query: string, page: number) => {
        set({isLoading: true})

        try {
            const res = await searchKeyword(query, page)

            set({isLoading: false, keywords: res?.results, totalPages: res?.total_pages})
        } catch (err) {
            console.log('err: ', err)
        }
    },
    fetchMovies: async (query: string, page: number) => {
        set({isLoading: true})

        try {
            const res = await searchMovies(query, page)

            set({isLoading: false, movies: res?.results, totalPages: res?.total_pages})
        } catch (err) {
            console.log('err: ', err)
        }
    },
    fetchTvs: async (query: string, page: number) => {
        set({isLoading: true})

        try {
            const res = await searchTvSeries(query, page)

            set({isLoading: false, tvs: res?.results, totalPages: res?.total_pages})
        } catch (err) {
            console.log('err: ', err)
        }
    },
}))