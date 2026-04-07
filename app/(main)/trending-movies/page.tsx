'use client'
import MovieCard from '@/components/shared/MovieCard'
import { useMoviesStore } from '@/hooks/useMoviesStore'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../../../components/ui/select'
import React, { useEffect, useState } from 'react'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import PaginationCustom from '@/components/shared/Pagination'
import { useSearchParams } from 'next/navigation'

const TrendingMoviesPage = () => {
    const { trendingMoviesByPeriod, fetchTrendingMoviesByPeriod, isLoading, totalPages } = useMoviesStore()
    const [period, setPeriod] = useState<string>('day')

    const searchParams = useSearchParams()
    const currentPage = Number(searchParams.get('page')) || 1

    useEffect(() => {
        fetchTrendingMoviesByPeriod?.(period, currentPage)
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
        <div className='my-6'>
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

            <div className='grid grid-cols-4 gap-8 mt-8'>
                {trendingMoviesByPeriod?.map((movie) => (
                    <MovieCard key={movie?.id} movie={movie} />
                ))}
            </div>

            <div className='w-full flex items-center justify-center'>
                <PaginationCustom totalPages={totalPages} />
            </div>
        </div>
    )
}

export default TrendingMoviesPage
