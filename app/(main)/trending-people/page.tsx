'use client'
import MovieCard from '@/components/shared/MovieCard'
import { useMoviesStore } from '@/hooks/useMoviesStore'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../../../components/ui/select'
import React, { Suspense, useEffect, useState } from 'react'
import PaginationCustom from '@/components/shared/Pagination'
import { useRouter, useSearchParams } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { usePeopleStore } from '@/hooks/usePeopleStore'
import PeopleCard from '@/components/shared/PeopleCard'
import TrendingPeopleContent from './TrendingPeopleContent'
import Loading from '@/components/shared/Loading'

const TrendingPeoplePage = () => {
    return (
        <Suspense fallback={<Loading />}>
            <TrendingPeopleContent />
        </Suspense>
    )
}

export default TrendingPeoplePage