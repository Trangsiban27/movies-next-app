'use client'
import LoadingSpinner from '@/components/common/Loading'
import MovieCard from '@/components/shared/MovieCard'
import PaginationCustom from '@/components/shared/Pagination'
import TVSeriesCard from '@/components/shared/TVSeriesCard'
import { useSearchStore } from '@/hooks/useSearchStore'
import { useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'

const SearchResultsPage = () => {
    const {
        movies,
        tvs,
        fetchMovies,
        fetchTvs,
        isLoading,
        totalPages
    } = useSearchStore()

    const searchParams = useSearchParams()
    const query = searchParams.get('query')
    const page = searchParams.get('page')

    useEffect(() => {
        if (query) {
            fetchMovies(query, Number(page))
            fetchTvs(query, Number(page))
        }
    }, [query])

    if (isLoading) {
        <div className='h-screen flex items-center justify-center'>
            <LoadingSpinner />
        </div>
    }

    return (
        <div className='flex flex-col gap-6'>
            {movies?.length > 0 && <div>
                <h1 className='font-bold text-4xl'>Movies</h1>

                <div className='grid md:grid-cols-4 gap-4 mt-6'>
                    {movies?.map((movie) => (
                        <MovieCard movie={movie} />
                    ))}
                </div>

                {totalPages && totalPages > 0 && <PaginationCustom totalPages={totalPages} />}
            </div>}

            {tvs?.length > 0 && <div>
                <h1 className='font-bold text-4xl'>TV Series</h1>

                <div className='grid md:grid-cols-4 gap-4 mt-6'>
                    {tvs?.map((tv) => (
                        <TVSeriesCard tv={tv} />
                    ))}
                </div>

                {totalPages && totalPages > 0 && <PaginationCustom totalPages={totalPages} />}
            </div>}
        </div>
    )
}

export default SearchResultsPage