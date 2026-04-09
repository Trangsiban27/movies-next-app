'use client'
import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';
import React, { useState } from 'react'

interface RatingProps {
    maxStars?: number;
    initialRating?: number;
    onRatingChange?: (rating: number) => void;
    readonly?: boolean;
    size?: number;
    className?: string;
}

const Ratings = ({
    maxStars = 5,
    initialRating = 0,
    onRatingChange,
    readonly = false,
    size = 24,
    className
}: RatingProps) => {
    const [rating, setRating] = useState(initialRating);
    const [hover, setHover] = useState(0);

    const handleClick = (value: number) => {
        if (readonly) return;
        setRating(value);
        if (onRatingChange) onRatingChange(value);
    };
    return (
        <div className={cn("flex items-center gap-1", className)}>
            {[...Array(maxStars)].map((_, index) => {
                const starValue = index + 1;
                const isFilled = starValue <= (hover || rating);

                return (
                    <button
                        key={index}
                        type="button"
                        className={cn(
                            "transition-all duration-150 outline-none",
                            readonly ? "cursor-default" : "cursor-pointer hover:scale-110 active:scale-95"
                        )}
                        onClick={() => handleClick(starValue)}
                        onMouseEnter={() => !readonly && setHover(starValue)}
                        onMouseLeave={() => !readonly && setHover(0)}
                    >
                        <Star
                            size={size}
                            className={cn(
                                "transition-colors",
                                isFilled
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-400 fill-transparent"
                            )}
                        />
                    </button>
                );
            })}

            {/* Hiển thị con số rating nếu muốn */}
            {!readonly && rating > 0 && (
                <span className="ml-2 text-sm font-medium text-gray-400">{rating}/{maxStars}</span>
            )}
        </div>
    )
}

export default Ratings