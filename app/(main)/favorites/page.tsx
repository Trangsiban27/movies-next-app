'use client'
import LoadingSpinner from '@/components/common/Loading'
import MovieCard from '@/components/shared/MovieCard'
import PaginationCustom from '@/components/shared/Pagination'
import { Button } from '@/components/ui/button'
import { useFavoritesStore } from '@/hooks/useFavoritesStore'
import { useUserStore } from '@/hooks/useUserStore'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'

const FavoritesPage = () => {
    const router = useRouter()
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

    if (isLoading && user) {
        return (
            <div className='h-screen w-full flex items-center justify-center'>
                <LoadingSpinner />
            </div>
        )
    }

    if (!user && !user?.id) {
        return (
            <div className='flex items-center justify-center h-1/2 w-full'>
                <Button
                    className='cursor-pointer font-bold mt-12 py-6 px-12 bg-linear-to-br from-indigo-600 via-blue-700 to-cyan-400 hover:hue-rotate-15 text-white transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] border-none'
                    onClick={() => {
                        router.push('/login')
                    }}
                >
                    Login
                </Button>
            </div>
        )
    }

    return (
        <div className='px-6 md:px-0 lg:px-0'>
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