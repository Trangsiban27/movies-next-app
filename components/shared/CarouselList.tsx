import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Image from 'next/image'

const imageBaseUrl = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p/w500'

const CarouselList = ({ list, type = 'people' }: { list?: any[], type: string }) => {
    return (
        <Carousel
            opts={{
                align: "start",
                loop: true,
            }}
            className="w-full"
        >
            <CarouselContent className="w-full">
                {list?.map((item: any) => (
                    <CarouselItem key={item.id} className={'pl-4 basis-1/2 md:basis-1/4 lg:basis-1/8'}>
                        {type === 'people' && (
                            <div className='flex flex-col'>
                                <img
                                    src={`${imageBaseUrl}${item?.profile_path}`}
                                    alt="Event cover"
                                    className="relative z-20 w-50 object-cover h-50 rounded-md"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.src = "/avatar-default.svg";
                                    }}
                                />

                                <span className='font-bold text-xs mt-4'>{item?.name}</span>
                                <span className='font-semibold text-xs text-gray-500'>{item?.character}</span>
                            </div>
                        )}
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="-left-4 top-1/3 text-black cursor-pointer" />
            <CarouselNext className="-right-4 top-1/3 text-black cursor-pointer" />
        </Carousel>
    )
}

export default CarouselList