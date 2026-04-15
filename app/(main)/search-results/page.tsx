'use client'
import LoadingSpinner from '@/components/common/Loading'
import React, { Suspense } from 'react'
import SearchResultsContent from './SearchResultsContent'

function SearchResultsLoading() {
    return (
        <div className='h-screen flex items-center justify-center'>
            <LoadingSpinner />
        </div>
    )
}

const SearchResultsPage = () => {


    return (
        <Suspense fallback={<SearchResultsLoading />}>
            <SearchResultsContent />
        </Suspense>
    )
}

export default SearchResultsPage