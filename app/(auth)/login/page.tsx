'use client'
import Logo from '@/components/common/Logo'
import { Button } from '@/components/ui/button'
import { loginWithTMDB } from '@/services/authService'
import React, { useEffect } from 'react'

const LoginPage = () => {

    const handleLogin = () => {
        try {
            loginWithTMDB().then(res => {
                if (res?.request_token) {
                    const token = res?.request_token
                    const urlCallback = `${window.location.origin}/auth/callback`

                    window.location.href = `https://www.themoviedb.org/authenticate/${token}?redirect_to=${urlCallback}`
                }
            })
        } catch (err) {
            console.log('err: ', err)
        }
    }

    return (
        <div className='relative flex flex-col items-center justify-center h-screen bg-black/90'>
            <div className='absolute top-5 left-5'>
                <Logo />
            </div>

            <h1 className='text-6xl font-extrabold text-white'>Login</h1>
            <Button
                className='cursor-pointer font-bold mt-12 py-6 px-12 bg-linear-to-br from-indigo-600 via-blue-700 to-cyan-400 hover:hue-rotate-15 text-white transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] border-none'
                onClick={handleLogin}
            >
                Login with TMDB account
            </Button>
        </div>
    )
}

export default LoginPage