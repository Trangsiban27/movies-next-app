'use client'
import { Button } from '@/components/ui/button'
import { useTVSeriesStore } from '@/hooks/useTVSeriesStore'
import { ChevronLeft } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const TvSeriesVideosPage = () => {
    const router = useRouter()
    const { tvSeriesVideos, fetchTVSeriesVideos } = useTVSeriesStore()

    const params = useParams()
    const id = params?.id

    const handleBack = () => {
        router.push(`/tv-series/${id}`)
    }

    useEffect(() => {
        fetchTVSeriesVideos(Number(id))
    }, [])

    return (
        <div>
            <h3 className='font-bold text-2xl gap-4 flex'>
                <Button className='cursor-pointer' onClick={handleBack}>
                    <ChevronLeft />
                </Button>
                Videos
            </h3>

            <div className='grid md:grid-cols-2 gap-6 mt-6'>
                {tvSeriesVideos?.map((video: any) => (
                    <div key={video?.id} className='h-60 rounded-lg overflow-hidden'>
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
        </div>
    )
}

export default TvSeriesVideosPage