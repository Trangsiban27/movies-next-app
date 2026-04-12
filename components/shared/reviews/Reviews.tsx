import React from 'react'
import ReviewItem from './ReviewItem'
import { Pagination } from '@/components/ui/pagination'
import PaginationCustom from '../Pagination'

const Reviews = ({ reviews, totalPages, totalElements }: { reviews?: any[], totalPages?: number, totalElements?: number }) => {
    return (
        <div className='mt-16 flex flex-col gap-8'>
            <h3 className="text-white font-bold text-xl mb-3">Reviews ({totalElements})</h3>

            <div className='flex flex-col gap-6'>
                {reviews?.map((review) => (
                    <ReviewItem key={review?.id} review={review} />
                ))}
            </div>

            <PaginationCustom totalPages={totalPages} />
        </div>
    )
}

export default Reviews