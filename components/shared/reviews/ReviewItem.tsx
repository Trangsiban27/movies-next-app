import Ratings from '@/components/common/Ratings'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { formatDate } from '@/lib/utils'
import { Star } from 'lucide-react'
import React from 'react'

const imageBaseUrl = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p/w500'

const ReviewItem = ({ review }: { review: any }) => {
    return (
        <div className='flex gap-4'>
            <Avatar>
                <AvatarImage
                    src={`${imageBaseUrl}${review?.author_details?.avatar_path}`}
                    alt={review?.author_details?.name}
                />
                <AvatarFallback>
                    <img src="/avatar-default.svg" alt="" />
                </AvatarFallback>
            </Avatar>

            <div className='flex flex-col gap-y-2'>
                <div className='flex items-center justify-between gap-x-4'>
                    <div className='flex flex-col'>
                        <span className='text-white font-bold'>{review?.author_details?.username}</span>
                        <span className='text-xs text-gray-300'>{formatDate(review?.created_at)}</span>
                    </div>
                </div>

                <span className='text-sm text-gray-300'>{(review?.content)}</span>
            </div>
        </div>
    )
}

export default ReviewItem