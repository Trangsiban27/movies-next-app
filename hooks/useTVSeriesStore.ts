import { getTrendingTVSeries, getTVSerie } from "@/services/tmdb";
import { create } from "zustand";

interface TVSeriesStore {
    trendingTVSeries?: any[];
    tvSeries?: any;
    isLoading: boolean;
    totalPages?: number;
    fetchTVSeriesByPeriod: (period: string, page?: number) => Promise<void>;
    fetchTVSeries: (id: number) => Promise<void>
}

export const useTVSeriesStore = create<TVSeriesStore>((set) => ({
    trendingTVSeries: [],
    isLoading: false,
    fetchTVSeriesByPeriod: async(period: string, page?: number) => {
        set({isLoading: true})
        
        try {
            const res = await getTrendingTVSeries(period, page)
            set({trendingTVSeries: res?.results, totalPages: res?.total_pages, isLoading: false})
        } catch(err) {
            console.log('err: ', err)
        }
    },
    fetchTVSeries: async (id: number) => {
        set({isLoading: true})

        try {
            const res = await getTVSerie(id)

            set({tvSeries: res, isLoading: false})
        } catch (err) {
            console.log('err: ', err)
        }
    }
}))