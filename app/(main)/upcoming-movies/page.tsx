import { Suspense } from "react"
import UpcomingMoviesContent from "./UpcomingMoviesContent"
import Loading from "@/components/shared/Loading"

const UpcomingMoviesPage = () => {
    return (
        <Suspense fallback={<Loading />}>
            <UpcomingMoviesContent />
        </Suspense>
    )
}

export default UpcomingMoviesPage