import { Flame } from 'lucide-react'
import React from 'react'

const PopularityBlock = ({ popularity }: { popularity: number }) => {
    return (<div className="flex items-center gap-1 bg-orange-500/20 text-orange-500 px-4 py-1 rounded-md w-fit">
        <Flame size={14} fill="currentColor" />
        <span className="text-lg font-bold">
            {Math.round(popularity).toLocaleString()}
        </span>
    </div>
    )
}

export default PopularityBlock