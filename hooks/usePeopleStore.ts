import { getTrendingPeople } from "@/services/tmdb";
import { create } from "zustand";

interface PeopleStore {
    trendingPeoples?: any[];
    isLoading: boolean,
    totalPages?: number,
    fetchTrendingPeoplesByPeriod: (period: string, page?: number) => Promise<void>
}

export const usePeopleStore = create<PeopleStore>((set) => ({
    trendingPeoples: [],
    isLoading: false,
    fetchTrendingPeoplesByPeriod: async (period: string, page?: number) => {
        set({isLoading: true})

        try {
            const res = await getTrendingPeople(period, page)

            set({trendingPeoples: res?.results, totalPages: res?.total_pages, isLoading: false})
        } catch(err) {
            console.log('err: ', err)
        }
    }
}))