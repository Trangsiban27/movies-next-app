import { getTrendingTVSeries } from "@/services/tmdb";
import { create } from "zustand";

interface TVSeriesStore {
    trendingTVSeries?: any[];
    isLoading: boolean;
    fetchTVSeriesByPeriod: (period: string) => Promise<void>
}

export const useTVSeriesStore = create<TVSeriesStore>((set) => ({
    trendingTVSeries: [],
    isLoading: false,
    fetchTVSeriesByPeriod: async(period: string) => {
        set({isLoading: true})
        
        try {
            const res = await getTrendingTVSeries(period)
            set({trendingTVSeries: res, isLoading: false})
        } catch(err) {
            console.log('err: ', err)
        }
    }
}))