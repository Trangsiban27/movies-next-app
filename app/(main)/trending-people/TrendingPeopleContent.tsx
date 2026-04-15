'use client'
import MovieCard from '@/components/shared/MovieCard'
import { useMoviesStore } from '@/hooks/useMoviesStore'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../../../components/ui/select'
import React, { useEffect, useState } from 'react'
import PaginationCustom from '@/components/shared/Pagination'
import { useRouter, useSearchParams } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { usePeopleStore } from '@/hooks/usePeopleStore'
import PeopleCard from '@/components/shared/PeopleCard'

const TrendingPeopleContent = () => {
    const router = useRouter()
    const { trendingPeoples, fetchTrendingPeoplesByPeriod, isLoading, totalPages } = usePeopleStore()
    const [period, setPeriod] = useState<string>('day')

    const searchParams = useSearchParams()
    const currentPage = Number(searchParams.get('page')) || 1

    useEffect(() => {
        fetchTrendingPeoplesByPeriod?.(period, currentPage)
    }, [period])

    const handleChangePeriod = (period: string) => {
        setPeriod(period)
    }

    const handleBack = () => {
        router.push('/')
    }

    if (isLoading) {
        return (
            <div className='w-full h-48 flex items-center justify-center'>
                <span className='text-lg font-semibold'>Loading...</span>
            </div>
        )
    }

    return (
        <div className='my-6 px-6 md:px-0 lg:px-0'>
            <div className='w-full flex flex-col md:flex-row lg:flex-row items-start md:items-center lg:items-center gap-y-4 justify-between'>
                <div className='flex items-center gap-x-2'>
                    <Button variant={'ghost'} className='cursor-pointer' onClick={handleBack}>
                        <ChevronLeft />
                    </Button>
                    <span className='font-bold text-3xl'>Trending People</span>
                </div>

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

            <div className='grid gird-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-8 mt-8'>
                {trendingPeoples?.map((people) => (
                    <PeopleCard key={people?.id} people={people} />
                ))}
            </div>

            <div className='w-full flex items-center justify-center'>
                <PaginationCustom totalPages={totalPages} />
            </div>
        </div>
    )
}

export default TrendingPeopleContent