import React, { useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';
import RatingStars from './RatingStars';

const ProductItem = ({ parent_asin, images, title, price, average_rating, rating_number }) => {

    const { currency } = useContext(ShopContext);

    return (
        <Link className="text-gray-700 cursor-pointer" to={`/product/${parent_asin}`}>
            <div className="overflow-hidden">
                <img
                    className="hover:scale-110 transition ease-in-out w-full h-[222px]"
                    src={images[0].hi_res || images[0].large || images[0].thumb}
                />
            </div>

            <p className="pt-3 pb-1 text-sm line-clamp-2">{title}</p>

            <RatingStars average_rating={average_rating} rating_number={rating_number} />

            <p className="text-sm font-medium mt-1">
                {currency}
                {price.toFixed(2)}
            </p>
        </Link>
    );
};

export default ProductItem;
