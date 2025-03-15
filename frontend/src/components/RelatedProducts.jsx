import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const RelatedProducts = ({ main_category, categories, parent_asin }) => {
    const { products } = useContext(ShopContext);
    const [related, setRelated] = useState([]);

    useEffect(() => {

        if (products.length > 0) {

            let productsCopy = products.slice();

            productsCopy = productsCopy.filter(
                (item) => (item.parent_asin !== parent_asin)
            );

            productsCopy = productsCopy.filter(
                (item) => (
                    item.main_category === main_category ||
                    item.categories.some((category) => categories.includes(category))
                )
            );
            
            setRelated(productsCopy.slice(0, 5));
        }

    }, [products, main_category, categories, parent_asin]);

    return (
        <div className="my-24">
            <div className="text-center text-3xl py-2">
                <Title text1={'RELATED'} text2={'PRODUCTS'} />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
                {related.map((item, index) => (
                    <ProductItem
                        key={index}
                        parent_asin={item.parent_asin}
                        title={item.title}
                        price={item.price}
                        images={item.images}
                        average_rating={item.average_rating}
                        rating_number={item.rating_number}
                    />
                ))}
            </div>
        </div>
    );
};

export default RelatedProducts;
