import React from 'react'
import { FaCircle, FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const RatingStars = ({ average_rating, rating_number }) => {

    const maxStars = 5;
    const fullStars = Math.floor(average_rating);
    const hasHalfStar = average_rating % 1 > 0.2 && average_rating % 1 < 0.8;
    const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0);

    return (
        <div className="flex items-center gap-1">

            {[...Array(fullStars)].map((_, index) => (
                <FaStar key={index} className="text-yellow-400 w-4 h-4" />
            ))}
            
            {hasHalfStar && <FaStarHalfAlt className="text-yellow-400 w-4 h-4" />}
            
            {[...Array(emptyStars)].map((_, index) => (
                <FaRegStar key={index} className="text-gray-400 w-4 h-4" />
            ))}

            <p className="ml-2 text-sm font-medium">{average_rating.toFixed(1)}</p>
            <p className="text-sm text-gray-500">({rating_number})</p>
        </div>
    );
}

export default RatingStars