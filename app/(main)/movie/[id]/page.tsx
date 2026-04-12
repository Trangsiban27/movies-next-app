'use client'
import TrendingMovies from '@/components/movie/TrendingMovies'
import CarouselList from '@/components/shared/CarouselList'
import Reviews from '@/components/shared/reviews/Reviews'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { useMoviesStore } from '@/hooks/useMoviesStore'
import { useUserStore } from '@/hooks/useUserStore'
import { addMovieFavourite } from '@/services/tmdb'
import { ArrowLeft, Heart, ListPlus, Play } from 'lucide-react'
import Image from 'next/image'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'

const imageBaseUrl = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p/w500'

const MovieDetailPage = () => {
    const router = useRouter()
    const {
        movie,
        movieCasts,
        movieVideoTrailer,
        movieReviews,
        totalPages,
        totalElements,
        fetchMovie,
        fetchMovieCasts,
        fetchMovieVideos,
        fetchMovieReviews,
        fetchMovieFavourite,
        addFavourite,
        isLoading
    } = useMoviesStore()
    const { user } = useUserStore()

    const params = useParams()
    const id = params?.id

    useEffect(() => {
        if (id) {
            fetchMovie(Number(id)).then((res) => {
                fetchMovieFavourite(Number(id))
                fetchMovieCasts(Number(id))
                fetchMovieVideos(Number(id))
                fetchMovieReviews(Number(id))
            })
        }
    }, [id])

    const handleBack = () => {
        router.push('/')
    }

    const handleFavourite = () => {
        addFavourite(Number(user?.id), Number(id))
    }

    if (isLoading) {
        <div className='w-full h-screen flex items-center justify-center'>
            <span>...Loading</span>
        </div>
    }

    return (
        <div className=''>
            <div className='relative -mx-4 sm:-mx-6 lg:-mx-8 h-125 overflow-hidden'>
                <Image
                    src={`${imageBaseUrl}${movie.backdrop_path}`}
                    alt="backdrop"
                    fill
                    className="object-cover"
                    priority
                />

                <div className="absolute inset-0 bg-linear-to-t from-[#0D0D0D] via-[#0D0D0D]/40 to-transparent" />
                <div className="absolute inset-0 bg-linear-to-r from-[#0D0D0D]/80 via-transparent to-transparent" />

                <div className="absolute top-10 left-10 cursor-pointer p-2 bg-black/20 rounded-full hover:bg-black/40" onClick={handleBack}>
                    <ArrowLeft className="text-white" />
                </div>
            </div>

            <div className='relative max-w-7xl mx-auto px-4 -mt-40 z-10 flex flex-col md:flex-row gap-10 items-end'>

                <div className='shrink-0 w-64 h-96 relative rounded-xl overflow-hidden shadow-2xl border border-white/10'>
                    <Image
                        src={`${imageBaseUrl}${movie.poster_path}`}
                        alt="poster"
                        fill
                        className="object-cover"
                    />
                </div>

                <div className='flex flex-col flex-1 pb-4'>
                    <h1 className='text-5xl text-white font-bold mb-2'>
                        {movie?.title} ({movie?.release_date?.split('-')[0]})
                    </h1>

                    <p className='text-xl text-gray-300 font-medium italic mb-6'>{movie?.tagline}</p>

                    <div className='flex flex-wrap items-center gap-3'>
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-sm font-medium text-white">
                            {Math.floor(movie?.runtime / 60)}h {movie?.runtime % 60}min
                        </div>

                        <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-sm font-medium text-white">
                            {movie?.release_date?.split('-')[0]}
                        </div>

                        <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-sm font-medium text-white uppercase">
                            {movie?.original_language}
                        </div>
                    </div>

                    <div className='flex items-center gap-x-6 flex-1 pb-4 mt-6'>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button size={'lg'} className='w-fit bg-red-600/60 font-bold flex items-center gap-x-2 cursor-pointer py-6 px-10'>
                                    <Play />
                                    Watch Trailer
                                </Button>
                            </DialogTrigger>

                            <DialogContent className="sm:max-w-md lg:min-w-6xl h-[80%] bg-black/60">
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src={`https://www.youtube.com/embed/${movieVideoTrailer?.[0]?.key}?autoplay=1`}
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </DialogContent>
                        </Dialog>

                        <button
                            onClick={handleFavourite}
                            className={`focus:outline-none cursor-pointer ${movie?.favorite ? 'bg-transparent' : ''}`}
                        >
                            <Heart
                                className={`w-7 h-7 ${movie?.favorite ? 'animate-heart-pop fill-red-600 text-red-600' : 'text-white'}`}
                            />
                        </button>
                    </div>
                </div>

            </div>

            <div className='mt-16 flex flex-col gap-8'>
                <div className="max-w-4xl">
                    <h3 className="text-white font-bold text-xl mb-3">Overview</h3>
                    <p className='text-gray-400 leading-relaxed'>{movie?.overview}</p>
                </div>

                <div className='flex flex-col gap-y-4'>
                    <span className='text-white font-bold text-xl'>Cast</span>
                    <CarouselList list={movieCasts} type='people' />
                </div>
            </div>

            <div className='mt-16 flex flex-col gap-8'>
                <h3 className="text-white font-bold text-xl mb-3">Trailer</h3>

                {movieVideoTrailer?.map((video) => (
                    <div className="aspect-video w-full">
                        <iframe
                            width="100%"
                            height="100%"
                            src={`https://www.youtube.com/embed/${video?.key}?autoplay=1`}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                ))}


            </div>

            <div className='flex flex-col gap-8'>
                <TrendingMovies />
            </div>

            <Reviews reviews={movieReviews} totalPages={totalPages} totalElements={totalElements} />
        </div>
    )
}

export default MovieDetailPage