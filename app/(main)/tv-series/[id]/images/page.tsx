'use client'
import { Button } from '@/components/ui/button'
import { useTVSeriesStore } from '@/hooks/useTVSeriesStore'
import { ChevronLeft } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const imageBaseUrl = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p/w500'

const TvSeriesImagesPage = () => {
    const router = useRouter()
    const { tvSeriesAllImages, fetchTVSeriesImages } = useTVSeriesStore()

    const params = useParams()
    const id = params?.id

    useEffect(() => {
        fetchTVSeriesImages(Number(id))
    }, [])

    const handleBack = () => {
        router.push(`/tv-series/${id}`)
    }

    return (
        <div className='px-6 md:px-0 lg:px-0'>
            <h3 className='font-bold text-2xl gap-4 flex'>
                <Button className='cursor-pointer' onClick={handleBack}>
                    <ChevronLeft />
                </Button>
                Images
            </h3>

            <div className='flex flex-col mt-6'>
                {Object.entries(tvSeriesAllImages || {}).map(([category, images]: [string, any]) => (
                    images.length > 0 && (
                        <div key={category} className="mb-12">
                            <h4 className='text-xl font-semibold capitalize mb-6 text-gray-200'>
                                {category} ({images?.length})
                            </h4>

                            <div className='grid md:grid-cols-4 gap-6'>
                                {images.map((image: any, index: number) => (
                                    <div
                                        key={image?.file_path || index}
                                        className='w-full aspect-video rounded-xl overflow-hidden bg-[#1a1a1a] border border-white/5 hover:border-white/20 transition-all'
                                    >
                                        <img
                                            className='w-full h-full object-cover hover:scale-105 transition-transform duration-500'
                                            src={`${imageBaseUrl}${image?.file_path}`}
                                            alt={`${category} image`}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                ))}
            </div>
        </div>
    )
}

export default TvSeriesImagesPage