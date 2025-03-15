import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {
    const { products } = useContext(ShopContext);
    const [latestProducts, setLatestProducts] = useState([]);

    useEffect(() => {
        setLatestProducts(products.slice(0, 5));
    }, [products]);

    return (
        <div className="my-10">
            <div className="text-center py-8 text-3xl">
                <Title text1={'LATEST'} text2={'COLLECTION'} />
                <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
                    Discover the latest trends and must-have products, all in one place.
                </p>
            </div>

            {/* Rending products */}
            <div className="grid grid-cols-2 sm:grid-cols-3  md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
                {latestProducts.map((item, index) => (
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

export default LatestCollection;
