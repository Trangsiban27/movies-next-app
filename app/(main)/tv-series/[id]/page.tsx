'use client'
import { useTVSeriesStore } from '@/hooks/useTVSeriesStore'
import { ArrowLeft, Flame, ListPlus, Play } from 'lucide-react'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import IMDbBlock from '@/components/common/IMDbBlock'
import PopularityBlock from '@/components/common/PopularityBlock'

const imageBaseUrl = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p/w500'

const TvSerieDetailPage = () => {
    const router = useRouter()
    const { tvSeries, fetchTVSeries, isLoading } = useTVSeriesStore()

    const params = useParams()
    const id = params?.id

    useEffect(() => {
        if (id) {
            fetchTVSeries(Number(id))
        }
    }, [id])

    const handleBack = () => {
        router.push('/')
    }

    const handleClickLink = () => { }

    if (isLoading) {
        <div className='w-full h-screen flex items-center justify-center'>
            <span>...Loading</span>
        </div>
    }

    return (
        <div className=''>
            <div className='relative -mx-4 sm:-mx-6 lg:-mx-8 h-125 overflow-hidden'>
                <Image
                    src={`${imageBaseUrl}${tvSeries?.backdrop_path}`}
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
                        src={`${imageBaseUrl}${tvSeries?.poster_path}`}
                        alt="poster"
                        fill
                        className="object-cover"
                    />
                </div>

                <div className='flex flex-col flex-1 pb-4'>
                    <h1 className='text-5xl text-white font-bold mb-2'>
                        {tvSeries?.original_name} ({tvSeries?.first_air_date?.split('-')[0]})
                    </h1>

                    <p className='text-xl text-gray-300 font-medium italic mb-6'>{tvSeries?.tagline}</p>

                    <div className='flex flex-wrap items-center gap-3'>
                        {tvSeries?.episode_run_time?.length > 0 && <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-sm font-medium text-white">
                            {Math.floor(tvSeries?.episode_run_time[0] / 60)}h {tvSeries?.episode_run_time[0] % 60}min / episode
                        </div>}

                        <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-sm font-medium text-white">
                            {tvSeries?.first_air_date?.split('-')[0]}
                        </div>

                        <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-sm font-medium text-white uppercase">
                            {tvSeries?.original_language}
                        </div>
                    </div>

                    <div className='flex items-center gap-x-6 flex-1 pb-4 mt-6'>
                        {/* <Dialog>
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
                        </Dialog> */}

                        <Button className='w-fit bg-red-600/60 font-bold flex items-center gap-x-2 cursor-pointer'>
                            <ListPlus />
                        </Button>
                    </div>
                </div>
            </div>

            <div className='mt-16 flex gap-8'>
                <div className='flex items-center gap-4'>
                    <IMDbBlock />
                    <span className='font-bold text-lg'>{tvSeries?.vote_average}</span>
                </div>

                <PopularityBlock popularity={tvSeries?.popularity} />
            </div>

            <div className='mt-12 flex flex-col gap-8'>
                <div className="max-w-4xl">
                    <h3 className="text-white font-bold text-xl mb-3">Overview</h3>
                    <p className='text-gray-400 leading-relaxed'>{tvSeries?.overview}</p>
                </div>
            </div>

            <div className='mt-6 flex flex-col gap-4'>
                <div className='flex items-center gap-x-2'>
                    <span className='text-gray-500 font-bold'>Creators: </span>
                    <div className=''>
                        {tvSeries?.created_by?.map((item: any) => (
                            <span key={item?.id} className='font-semibold'>{item?.original_name}</span>
                        ))}
                    </div>
                </div>

                <div className='flex items-center gap-x-2'>
                    <span className='text-gray-500 font-bold'>First air date: </span>
                    <span className='font-semibold'>{tvSeries?.first_air_date}</span>
                </div>

                <div className='flex items-center gap-x-2'>
                    <span className='text-gray-500 font-bold'>Homepage: </span>
                    <span
                        className='font-semibold hover:underline cursor-pointer'
                        onClick={() => {
                            const url = tvSeries?.homepage;

                            if (url && url.startsWith('http')) {
                                window.open(url, '_blank', 'noopener,noreferrer');
                            } else {
                                console.warn("Homepage URL is invalid or missing");
                            }
                        }}
                    >
                        {tvSeries?.homepage}
                    </span>
                </div>

                <div className='flex items-center gap-x-2'>
                    <span className='text-gray-500 font-bold'>Genres: </span>
                    <div className='flex gap-4'>
                        {tvSeries?.genres?.map((ge: any) => (
                            <span key={ge?.id} className='px-4 border rounded-2xl py-1'>{ge?.name}</span>
                        ))}
                    </div>
                </div>
            </div>

            {tvSeries?.seasons?.length > 0 && <div className='mt-12 flex flex-col gap-8'>
                <h3 className="text-white font-bold text-xl mb-3">Seasons ({tvSeries?.seasons?.length})</h3>

                <div className='grid grid-cols-3 gap-8 row-auto'>
                    {tvSeries?.seasons?.map((sea: any, index: number) => (
                        <div key={sea?.id} className='flex flex-col cursor-pointer' onClick={() => {
                            // router.push(`/tv-series/${sea?.id}`)
                        }}>
                            <div className='flex flex-col mb-4'>
                                <h3 className='font-bold'>{sea?.name}</h3>
                                <span>{sea?.episode_count} episode</span>
                            </div>

                            <img
                                src={`${imageBaseUrl}${sea?.poster_path}`}
                                alt="season poster"
                                className='w-full rounded-md overflow-hidden'
                            />
                        </div>
                    ))}
                </div>
            </div>}
        </div>
    )
}

export default TvSerieDetailPage