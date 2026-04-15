'use client'

import Loading from "@/components/shared/Loading"
import { Suspense } from "react"
import SearchResultsContent from "../search-results/SearchResultsContent"
import TrendingMoviesContent from "./TrendingMoviesContent"

const TrendingMoviesPage = () => {
    return (
        <Suspense fallback={<Loading />}>
            <TrendingMoviesContent />
        </Suspense>
    )
}

export default TrendingMoviesPage
