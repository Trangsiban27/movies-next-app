import { useMoviesStore } from '@/hooks/useMoviesStore'
import React, { useEffect } from 'react'
import MovieCard from '../shared/MovieCard'
import { ChevronDown } from 'lucide-react'

const UpcomingMovies = () => {
    const { upcomingMovies, fetchUpcomingMovies, isLoading } = useMoviesStore()

    useEffect(() => {
        fetchUpcomingMovies()
    }, [])

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
                <span className='font-bold text-3xl'>Upcoming Movies</span>
            </div>

            <div className='grid grid-cols-4 grid-rows-2 gap-8 mt-12'>
                {upcomingMovies?.slice(0, 8)?.map((movie) => (
                    <MovieCard key={movie?.id} movie={movie} />
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

export default UpcomingMovies