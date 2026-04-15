'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import axios from 'axios';
import { createSessionId } from '@/services/authService';
import Cookies from 'js-cookie';

const AuthCallbackClient = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

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
    }, [searchParams, router]);

    return null;
}

export default AuthCallbackClient