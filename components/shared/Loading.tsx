import React from 'react'
import LoadingSpinner from '../common/Loading'

const Loading = () => {
    return (
        <div className='h-screen w-full flex items-center justify-center'>
            <LoadingSpinner />
        </div>
    )
}

export default Loading