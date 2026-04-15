
import LoadingSpinner from '@/components/common/Loading'
import { Suspense } from 'react'
import { FavoritesContent } from './FavoritesContent'

function FavoritesLoading() {
    return (
        <div className='h-screen w-full flex items-center justify-center'>
            <LoadingSpinner />
        </div>
    )
}

const FavoritesPage = () => {
    return (
        <Suspense fallback={<FavoritesLoading />}>
            <FavoritesContent />
        </Suspense>
    )
}

export default FavoritesPage