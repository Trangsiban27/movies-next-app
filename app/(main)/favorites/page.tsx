'use client'
import LoadingSpinner from '@/components/common/Loading'
import MovieCard from '@/components/shared/MovieCard'
import PaginationCustom from '@/components/shared/Pagination'
import { useFavoritesStore } from '@/hooks/useFavoritesStore'
import { useUserStore } from '@/hooks/useUserStore'
import { useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'

const FavoritesPage = () => {
    const { user } = useUserStore()
    const {
        isLoading,
        movies,
        fetchFavoriteMovies,
        totalPages
    } = useFavoritesStore()

    const searchParams = useSearchParams()
    const page = searchParams.get('page') || '0'

    useEffect(() => {
        if (user?.id) {
            fetchFavoriteMovies(Number(user?.id), Number(page))
        }
    }, [user?.id])

    console.log('movies: ', movies)

    if (isLoading) {
        return (
            <div className='h-screen w-full flex items-center justify-center'>
                <LoadingSpinner />
            </div>
        )
    }

    return (
        <div>
            <h1 className='font-bold text-2xl'>Favorites Movie List</h1>

            <div className='grid md:grid-cols-4 gap-4 mt-6'>
                {movies?.map((movie) => (
                    <MovieCard key={movie?.id} movie={movie} />
                ))}
            </div>

            {totalPages && totalPages > 0 && <PaginationCustom totalPages={totalPages} />}
        </div>
    )
}

export default FavoritesPage