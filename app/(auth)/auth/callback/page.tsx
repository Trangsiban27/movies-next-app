import LoadingSpinner from '@/components/common/Loading'
import Logo from '@/components/common/Logo'
import { Suspense } from 'react'
import AuthCallbackClient from './AuthCallbackClient';

function AuthCallbackLoading() {
    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-black/90">
            <div className='absolute top-5 left-5'>
                <Logo />
            </div>

            <h2 className="text-white text-xl">Đang xác thực tài khoản...</h2>
            <LoadingSpinner />
        </div>
    );
}

const AuthCallBackPage = () => {
    return (
        <Suspense fallback={<AuthCallbackLoading />}>
            <AuthCallbackClient />
        </Suspense>
    );
}

export default AuthCallBackPage