import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {
    const { products } = useContext(ShopContext);
    const [bestSeller, setBestSeller] = useState([]);

    useEffect(() => {
        
        const bestProduct = products
        .filter((item) => item.average_rating >= 4.5)
        .sort((a, b) => b.rating_number - a.rating_number)

        setBestSeller(bestProduct.slice(0, 5));
    }, [products]);

    return (
        <div className="my-10">
            <div className="text-center text-3xl py-8">
                <Title text1={'BEST'} text2={'SELLER'} />
                <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
                    Shop our best sellers—top-rated and most-loved by customers.
                </p>
            </div>

            {/* Rending Products */}
            <div className="grid grid-cols-2 sm:grid-cols-3  md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
                {bestSeller.map((item, index) => (
                    <ProductItem
                        key={index}
                        parent_asin={item.parent_asin}
                        title={item.title}
                        images={item.images}
                        price={item.price}
                        average_rating={item.average_rating}
                        rating_number={item.rating_number}
                    />
                ))}
            </div>
        </div>
    );
};

export default BestSeller;
