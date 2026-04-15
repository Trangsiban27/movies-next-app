'use client'
import React, { useEffect, useState } from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select'
import { usePeopleStore } from '@/hooks/usePeopleStore'
import { ChevronDown } from 'lucide-react'
import PeopleCard from '../shared/PeopleCard'
import { useRouter } from 'next/navigation'

const TrendingPeople = () => {
    const router = useRouter()
    const [period, setPeriod] = useState<string>('day')
    const { fetchTrendingPeoplesByPeriod, trendingPeoples, isLoading } = usePeopleStore()

    const handleChangePeriod = (period: string) => {
        setPeriod(period)
    }

    const handleSeeMore = () => {
        router.push('trending-people')
    }

    useEffect(() => {
        fetchTrendingPeoplesByPeriod(period)
    }, [period])

    if (isLoading) {
        return (
            <div className='w-full h-48 flex items-center justify-center'>
                <span className='text-lg font-semibold'>Loading...</span>
            </div>
        )
    }

    return (
        <div className="mt-12">
            <div className='w-full flex items-start lg:items-center justify-between flex-col lg:flex-row gap-y-6 px-6 lg:px-0'>
                <span className='font-bold text-3xl'>Trending People</span>

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

            <div className='grid grid-cols-1 lg:grid-cols-4 grid-rows-1 gap-8 mt-12 px-6 lg:px-0'>
                {trendingPeoples?.slice(0, 4)?.map((people) => (
                    <PeopleCard key={people?.id} people={people} />
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

export default TrendingPeople