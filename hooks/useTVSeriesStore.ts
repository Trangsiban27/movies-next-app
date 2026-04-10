import { getTrendingTVSeries, getTVSerie, getTVSeriesCredits, getTVSeriesImages, getTVSeriesReviews, getTVSeriesSimilar, getTVSeriesVideos } from "@/services/tmdb";
import { create } from "zustand";

interface TVSeriesStore {
    trendingTVSeries?: any[];
    tvSeries?: any;
    tvSeriesCasts?: any;
    tvSeriesVideos?: any;
    tvSeriesImages?: any;
    tvSeriesAllImages?: any;
    tvSeriesTrailer?: any;
    tvSeriesSimilar?: any;
    tvSeriesReviews?: any;
    isLoading: boolean;
    totalPages?: number;
    totalElements?: number;
    fetchTVSeriesByPeriod: (period: string, page?: number) => Promise<void>;
    fetchTVSeries: (id: number) => Promise<void>;
    fetchTVSeriesCasts: (id: number) => Promise<void>;
    fetchTVSeriesVideos: (id: number) => Promise<void>;
    fetchTVSeriesImages: (id: number) => Promise<void>;
    fetchTVSeriesSimilar: (id: number, page: number) => Promise<void>;
    fetchTVSeriesReviews: (id: number, page: number) => Promise<void>;
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
    },
    fetchTVSeriesCasts: async (id: number) => {
        set({isLoading: true})

        try {
            const res = await getTVSeriesCredits(id)

            set({tvSeriesCasts: res?.cast, isLoading: false})
        } catch (err) {
            console.log('err: ', err)
        }
    },
    fetchTVSeriesVideos: async (id: number) => {
        set({isLoading: true})

        try {
            const res = await getTVSeriesVideos(id)

            const trailers = res?.filter((i: any) => i?.type === 'Trailer')

            set({tvSeriesVideos: res, tvSeriesTrailer: trailers, isLoading: false})
        } catch (err) {
            console.log('err: ', err)
        }
    },
    fetchTVSeriesImages: async (id: number) => {
        set({isLoading: true})

        try {
            const res = await getTVSeriesImages(id)

            set({tvSeriesImages: res?.backdrops, tvSeriesAllImages: res, isLoading: false})
        } catch (err) {
            console.log('err: ', err)
        }
    },
    fetchTVSeriesSimilar: async (id: number, page: number) => {
        set({isLoading: true})

        try {
            const res = await getTVSeriesSimilar(id, page)

            set({tvSeriesSimilar: res?.results, totalPages: res?.total_pages, isLoading: false})
        } catch (err) {
            console.log('err: ', err)
        }
    },
    fetchTVSeriesReviews: async (id: number, page: number) => {
        set({isLoading: true})

        try {
            const res = await getTVSeriesReviews(id, page)

            set({tvSeriesReviews: res?.results, totalPages: res?.total_pages, totalElements: res?.total_results, isLoading: false})
        } catch (err) {
            console.log('err: ', err)
        }
    },

}))