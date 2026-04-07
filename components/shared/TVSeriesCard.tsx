'use client'
import React from 'react'
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'

const imageBaseUrl = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p/w500'


const TVSeriesCard = ({ tv }: { tv: any }) => {
    return (
        <Card className="relative mx-auto w-full max-w-sm pt-0 bg-black text-white max-h-87.5 cursor-pointer">
            <img
                src={`${imageBaseUrl}${tv?.poster_path}`}
                alt="Event cover"
                className="relative z-20 aspect-video w-full object-cover h-50 min-h-50"
            />
            <CardHeader className="flex flex-col">
                <CardTitle className='font-bold line-clamp-1'>{tv?.name}</CardTitle>
                <CardDescription className='line-clamp-2 overflow-hidden flex-1'>
                    {tv?.overview}
                </CardDescription>
            </CardHeader>

            <CardFooter className='bg-black border-none'>
                <div className="flex items-center gap-2 py-0.5 rounded mt-auto">
                    <span className="font-black text-[10px] bg-yellow-500 text-black px-1">IMDb</span>
                    <span className='font-semibold'>{tv?.vote_average?.toFixed(1)}</span>
                </div>
            </CardFooter>
        </Card>
    )
}

export default TVSeriesCard