'use client'
import React from 'react'
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import { Heart } from 'lucide-react'

const imageBaseUrl = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p/w500'

const MovieCard = ({ movie }: { movie: any }) => {
    const router = useRouter()

    const handleCardClick = () => {
        router.push(`/movie/${movie?.id}`)
    }

    return (
        <Card
            className="relative mx-auto w-full max-w-sm pt-0 bg-black text-white max-h-87.5 cursor-pointer"
            onClick={handleCardClick}
        >
            <img
                src={`${imageBaseUrl}${movie?.poster_path}`}
                alt="Event cover"
                className="relative z-20 aspect-video w-full object-cover h-50 min-h-50"
            />
            <CardHeader className="flex flex-col">
                <CardTitle className='font-bold line-clamp-1'>{movie?.title}</CardTitle>
                <CardDescription className='line-clamp-2 overflow-hidden flex-1'>
                    {movie?.overview}
                </CardDescription>
            </CardHeader>

            <CardFooter className='bg-black border-none flex items-center justify-between pb-10'>
                <div className="flex items-center gap-2 py-0.5 rounded mt-auto">
                    <span className="font-black text-[10px] bg-yellow-500 text-black px-1">IMDb</span>
                    <span className='font-semibold'>{movie?.vote_average?.toFixed(1)}</span>
                </div>
            </CardFooter>
        </Card>
    )
}

export default MovieCard