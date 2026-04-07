'use client'
import React, { useEffect, useState } from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select'
import MovieCard from '../shared/MovieCard'
import { useMoviesStore } from '@/hooks/useMoviesStore'
import { ChevronDown, ChevronsDown } from 'lucide-react'
import { useRouter } from 'next/navigation'

const TrendingMovies = () => {
    const router = useRouter()

    const { trendingMoviesByPeriod, fetchTrendingMoviesByPeriod, isLoading } = useMoviesStore()
    const [period, setPeriod] = useState<string>('day')

    useEffect(() => {
        fetchTrendingMoviesByPeriod?.(period)
    }, [period])

    const handleChangePeriod = (period: string) => {
        setPeriod(period)
    }

    const handleSeeMore = () => {
        router.push('/trending-movies')
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
                <span className='font-bold text-3xl'>Trending Movies</span>

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

            <div className='grid grid-cols-4 grid-rows-2 gap-8 mt-12'>
                {trendingMoviesByPeriod?.slice(0, 8)?.map((movie) => (
                    <MovieCard key={movie?.id} movie={movie} />
                ))}
            </div>

            <div className='w-full flex flex-col items-center justify-center mt-6 cursor-pointer group text-sm hover:text-red-500' onClick={handleSeeMore}>
                <span className='font-semibold '>
                    See more
                </span>
                <ChevronDown size={16} className='' />
            </div>
        </div>
    )
}

export default TrendingMovies