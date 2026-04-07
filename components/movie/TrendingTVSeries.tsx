'use client'
import { useTVSeriesStore } from '@/hooks/useTVSeriesStore'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select'
import React, { useEffect, useState } from 'react'
import MovieCard from '../shared/MovieCard'
import { ChevronDown } from 'lucide-react'
import TVSeriesCard from '../shared/TVSeriesCard'

const TrendingTVSeries = () => {
    const [period, setPeriod] = useState<string>('day')
    const { trendingTVSeries, fetchTVSeriesByPeriod, isLoading } = useTVSeriesStore()

    console.log('trendingTVSeries: ', trendingTVSeries)

    useEffect(() => {
        fetchTVSeriesByPeriod?.(period)
    }, [period])

    const handleChangePeriod = (period: string) => {
        setPeriod(period)
    }

    if (isLoading) {
        return (
            <div className='w-full h-48 flex items-center justify-center'>
                <span className='text-lg font-semibold'>Loading...</span>
            </div>
        )
    }

    return (
        <div className="mt-12">
            <div className='w-full flex items-center justify-between'>
                <span className='font-bold text-3xl'>Trending TV Series</span>

                <Select value={period} onValueChange={handleChangePeriod}>
                    <SelectTrigger className="w-full max-w-48 font-bold">
                        <SelectValue placeholder="Select a period" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Period</SelectLabel>
                            <SelectItem value="day" className='cursor-pointer font-bold'>Day</SelectItem>
                            <SelectItem value="week" className='cursor-pointer font-bold'>Week</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            <div className='flex gap-x-6 mt-12'>
                {trendingTVSeries?.slice(0, 4)?.map((tv) => (
                    <TVSeriesCard key={tv?.id} tv={tv} />
                ))}
            </div>

            <div className='w-full flex flex-col items-center justify-center mt-6 cursor-pointer group text-sm hover:text-red-500'>
                <span className='font-semibold '>
                    See more
                </span>
                <ChevronDown size={16} className='' />
            </div>
        </div>
    )
}

export default TrendingTVSeries