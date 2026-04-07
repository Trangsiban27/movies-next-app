import { getTrendingPeople } from "@/services/tmdb";
import { create } from "zustand";

interface PeopleStore {
    trendingPeoples?: any[];
    isLoading: boolean,
    fetchTrendingPeoplesByPeriod: (period: string) => Promise<void>
}

export const usePeopleStore = create<PeopleStore>((set) => ({
    trendingPeoples: [],
    isLoading: false,
    fetchTrendingPeoplesByPeriod: async (period: string) => {
        set({isLoading: true})

        try {
            const res = await getTrendingPeople(period)

            set({trendingPeoples: res, isLoading: false})
        } catch(err) {
            console.log('err: ', err)
        }
    }
}))