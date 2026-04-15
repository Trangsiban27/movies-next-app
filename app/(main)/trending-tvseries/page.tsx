import { Suspense } from "react"
import TrendingTvSeriesContent from "./TrendingTvSeriesContent"
import Loading from "@/components/shared/Loading"


const TrendingTVSeriesPage = () => {
    return (
        <Suspense fallback={<Loading />}>
            <TrendingTvSeriesContent />
        </Suspense>
    )
}

export default TrendingTVSeriesPage