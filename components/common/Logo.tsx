'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

const Logo = () => {
    const router = useRouter()

    return (
        <div className="mb-10 px-2 cursor-pointer" onClick={() => router.push('/')}>
            <h1 className="text-xl font-bold tracking-tighter flex items-center gap-2">
                <span className="bg-red-600 w-8 h-8 rounded-full flex items-center justify-center text-white text-xs">B</span>
                <span className='text-white'>Bean's.</span><span className="text-red-600 uppercase">Tub</span>
            </h1>
        </div>
    )
}

export default Logo