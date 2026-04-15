'use client'
import { useTVSeriesStore } from '@/hooks/useTVSeriesStore'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import TVSeriesCard from '../shared/TVSeriesCard'

const Similar = () => {
    const router = useRouter()
    const { tvSeriesSimilar, fetchTVSeriesSimilar } = useTVSeriesStore()

    const params = useParams()
    const id = params?.id

    const searchParams = useSearchParams()
    const page = searchParams.get('page')

    useEffect(() => {
        fetchTVSeriesSimilar(Number(id), Number(page))
    }, [id])

    return (
        <div>
            <h3 className='font-bold text-2xl mt-12 px-6 md:px-0 lg:px-0'>Similar Series</h3>

            <div className='grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4 mt-6 px-6 md:px-0 lg:px-0'>
                {tvSeriesSimilar?.slice(0, 8)?.map((tv: any) => (
                    <TVSeriesCard key={tv?.id} tv={tv} />
                ))}
            </div>
        </div>
    )
}

export default Similar