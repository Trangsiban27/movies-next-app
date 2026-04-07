'use client'
import Hero from '@/components/movie/Hero'
import TrendingMovies from '@/components/movie/TrendingMovies'
import TrendingPeople from '@/components/movie/TrendingPeople'
import { useMoviesStore } from '@/hooks/useMoviesStore'
import React, { useEffect } from 'react'

const page = () => {
    const { trendingMovies, fetchTrendingMovies } = useMoviesStore()

    useEffect(() => {
        fetchTrendingMovies()
    }, [fetchTrendingMovies])

    return (
        <div>
            <Hero movies={trendingMovies?.slice(0, 5)} />

            <TrendingMovies />

            <TrendingPeople />
        </div>
    )
}

export default page