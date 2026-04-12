'use client'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight, Wifi } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'
import IMDbBlock from '../common/IMDbBlock'
import PopularityBlock from '../common/PopularityBlock'

const imageBaseUrl = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p/w500'

const Hero = ({ movies }: { movies: any }) => {
    const router = useRouter()
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 30 })
    const [selectedIndex, setSelectedIndex] = useState(0)

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi])

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi])

    const onSelect = useCallback(() => {
        if (!emblaApi) return

        setSelectedIndex(emblaApi.selectedScrollSnap())
    }, [emblaApi])

    const handleWatchBtn = (id: number) => {
        router.push(`movie/${id}`)
    }

    useEffect(() => {
        if (!emblaApi) return
        onSelect()
        emblaApi.on('select', onSelect)
    }, [emblaApi, onSelect])

    return (
        <div className="relative h-150 w-full  overflow-hidden group">
            {/* --- PHẦN CAROUSEL CHÍNH --- */}
            <div className="overflow-hidden h-full" ref={emblaRef}>
                <div className="flex h-full">
                    {movies?.map((movie: any) => (
                        <div key={movie.id} className="relative flex-[0_0_100%] min-w-0 h-full">
                            {/* Background */}
                            <Image
                                src={`${imageBaseUrl}${movie.backdrop_path || movie.poster_path}`}
                                alt={movie.title || movie.name || 'Movie poster'}
                                fill
                                className="object-cover"
                                priority
                            />
                            <div className="absolute inset-0 bg-linear-to-r from-[#0D0D0D] via-[#0D0D0D]/40 to-transparent" />

                            {/* Content Layer */}
                            <div className="relative z-10 flex flex-col justify-center h-full px-12 space-y-24">
                                <div className="flex items-center gap-2 bg-red-600/90 text-white px-3 py-1 rounded-full w-fit text-xs font-bold">
                                    <Wifi size={14} /> Live
                                </div>

                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <h2 className="text-4xl tracking-[0.2em] uppercase font-extrabold">Netflix</h2>

                                        <h1 className="text-3xl font-semibold max-w-lg leading-tight">
                                            {movie?.title || movie?.name}
                                        </h1>
                                    </div>

                                    <div className="flex items-center gap-4 text-sm font-medium">
                                        <div className="flex items-center gap-2 px-2 py-0.5 rounded">
                                            <span className="font-black text-[10px] bg-yellow-500 text-black px-1">IMDb</span>
                                            <span className='font-semibold'>{movie?.vote_average?.toFixed(1)}</span>
                                        </div>

                                        <PopularityBlock popularity={movie?.popularity} />
                                    </div>
                                </div>

                                <button className="bg-[#E50914] hover:bg-red-700 text-white w-48 py-4 rounded-2xl font-bold text-lg transition-all active:scale-95 shadow-xl shadow-red-600/20 cursor-pointer" onClick={() => handleWatchBtn(movie?.id)}>
                                    Watch
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* --- THUMBNAIL & CONTROLS (Góc phải dưới) --- */}
            <div className="absolute bottom-10 right-10 flex items-center gap-6 z-20">
                {/* Thumbnails */}
                <div className="hidden md:flex gap-3">
                    {movies?.slice(0, 5).map((movie: any, index: any) => (
                        <div
                            key={movie.id}
                            onClick={() => scrollTo(index)}
                            className={`w-24 h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer hover:scale-105 
                                ${selectedIndex === index ? "border-red-600 shadow-lg shadow-red-600/40" : "border-white/20 opacity-60"}`}
                        >
                            <img
                                src={`${imageBaseUrl}${movie.backdrop_path || movie.poster_path}`}
                                className="object-cover w-full h-full"
                                alt="thumb"
                            />
                        </div>
                    ))}
                </div>

                {/* Navigation Buttons */}
                <div className="flex gap-2">
                    <button
                        onClick={scrollPrev}
                        className="p-3 bg-red-600 hover:bg-red-600 rounded-full text-white backdrop-blur-md transition-colors border border-white/10 cursor-pointer shadow"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button
                        onClick={scrollNext}
                        className="p-3 bg-red-600 hover:bg-red-600 rounded-full text-white backdrop-blur-md transition-colors border border-white/10 cursor-pointer shadow"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Hero