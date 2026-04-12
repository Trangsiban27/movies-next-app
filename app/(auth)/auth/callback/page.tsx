'use client'
import LoadingSpinner from '@/components/common/Loading'
import Logo from '@/components/common/Logo'
import { createSessionId } from '@/services/authService'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import Cookies from 'js-cookie';

const AuthCallBackPage = () => {
    const searchParams = useSearchParams()
    const router = useRouter()

    useEffect(() => {
        const approved = searchParams.get('approved')
        const requestToken = searchParams.get('request_token')

        //handle call to get session_id
        if (approved && requestToken) {
            createSessionId(requestToken).then(res => {
                console.log('res: ', res)
                if (res?.session_id) {
                    Cookies.set('tmdb_session_id', res?.session_id, {
                        expires: 7, //7 days
                        path: '/',
                        sameSite: 'lax',
                        secure: process.env.NODE_ENV === 'production'
                    })
                }

                router.push('/')
            })
        }
    }, [searchParams])

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-black/90">
            <div className='absolute top-5 left-5'>
                <Logo />
            </div>

            <h2 className="text-white text-xl">Đang xác thực tài khoản...</h2>
            <LoadingSpinner />
        </div>
    )
}

export default AuthCallBackPage