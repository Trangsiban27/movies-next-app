import React from 'react'
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Star } from 'lucide-react'

const imageBaseUrl = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p/w500'

const PeopleCard = ({ people }: { people: any }) => {

    return (
        <Card className="relative mx-auto w-full max-w-sm pt-0 bg-black text-white max-h-87.5 cursor-pointer">

            <div className='p-6 flex items-center justify-center'>
                <img
                    src={`${imageBaseUrl}${people?.profile_path}`}
                    alt="Event cover"
                    className="relative z-20 w-50 object-cover h-50 rounded-full"
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/avatar-default.svg";
                    }}
                />
            </div>

            <CardHeader className="flex flex-col">
                <CardTitle className='font-bold'>{people?.name}</CardTitle>
                <CardDescription className='flex items-center gap-x-2'>
                    <Star size={12} /> {people?.popularity}
                </CardDescription>
            </CardHeader>
        </Card>
    )
}

export default PeopleCard