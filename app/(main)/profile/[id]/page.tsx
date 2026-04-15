'use client'
import { IMAGE_BASE_URL } from '@/constants/imageBaseUrl'
import { useUserStore } from '@/hooks/useUserStore'
import React from 'react'

const ProfilePage = () => {
    const { user } = useUserStore()

    return (
        <div className='h-screen flex items-start md:items-center lg:items-center md:justify-center lg:justify-center'>
            <div className='px-12 py-6 border rounded-lg bg-black/20 md:w-1/2 lg:w-1/2 w-full mx-6 md:mx-0 lg:mx-0'>
                <h3 className='text-2xl font-bold'>Profile</h3>

                <div className='w-full flex items-center justify-center mt-12'>
                    <img
                        src={`${IMAGE_BASE_URL}${user?.avatar?.tmdb?.avatar_path}`}
                        alt="User"
                        className="object-cover w-40 h-40 border border-gray-500 rounded-full"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "/avatar-default.svg";
                        }}
                    />
                </div>

                <div className='flex items-center gap-4 mt-6'>
                    <span className='text-lg font-bold'>UserName: </span>
                    <span className='text-lg'>{user?.username}</span>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage