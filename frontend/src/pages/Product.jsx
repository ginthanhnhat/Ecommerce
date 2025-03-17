import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';
import { FaCircle, FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import RatingStars from '../components/RatingStars';
import axios from 'axios';
import { toast } from 'react-toastify';

const Product = () => {
    const { parent_asin } = useParams();
    const { products, currency, addToCart, backendUrl } = useContext(ShopContext);
    const [productData, setProductData] = useState(false);
    const [images, setImages] = useState('');

    const [showMore, setShowMore] = useState(false);

    const fetchProductData = async () => {
        try {

            const response = await axios.post(backendUrl + '/api/product/single', {parent_asin})

            if(response.data.success) {
                setProductData(response.data.product);
                if(response.data.product.images) {
                    setImages(response.data.product.images[0].hi_res || response.data.product.images[0].large || response.data.product.images[0].thumb);
                } else {
                    setImages(assets.no_img);
                }
            } else {
                console.log(response.data.message)
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    };

    useEffect(() => {
        fetchProductData();
    }, [parent_asin, products]);

    return productData ? (
        <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
            {/* ------------ Product Data ------------ */}
            <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
                {/* ------------ Product Image ------------ */}
                <div className="flex flex-1 flex-col-reverse gap-3 sm:flex-row">
                    <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll sm:max-h-[468px] justify-between sm:justify-normal sm:w-[18.7%] w-full scrollbar-hide">
                        {productData.images.map((item, index) => (
                            <img
                                src={item.hi_res}
                                key={index}
                                onClick={() => setImages(item.hi_res)}
                                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                                alt=""
                            />
                        ))}

                        {/* {productData.videos.map((item, index) => (
                            <img
                                src={item.url}
                                key={index}
                                onClick={() => setImages(item.url)}
                                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                                alt=""
                            />
                        ))} */}
                    </div>

                    <div className="w-full sm:w-[80%]">
                        <img className="w-full h-auto " src={images} alt="" />
                    </div>
                </div>

                {/* ------------ Product Info ------------ */}
                <div className="flex-1 sm:overflow-y-scroll sm:max-h-[468px] scrollbar-hide">
                    <h1 className="font-medium text-2xl mt-2">
                        {productData.title}
                    </h1>
                    <p className='text-base text-blue-600'>Store: {productData.store}</p>
                    
                    <RatingStars average_rating={productData.average_rating} rating_number={productData.rating_number} />

                    <p className="my-5 text-3xl font-medium">
                        {currency}
                        {productData.price.toFixed(2)}
                    </p>

                    <button
                        onClick={() => addToCart(productData.parent_asin)}
                        className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
                    >
                        ADD TO CARD
                    </button>
                    <hr className="mt-8 sm:w-4/5" />

                    {/* --------- Details --------- */}
                    <div className='mt-5'>
                        <h2 className="text-lg font-semibold mb-3">Product details</h2>
                        <div className="grid grid-cols-1 gap-4 text-gray-700">
                            {Object.entries(productData.details).map(([key, value], index) => (
                                <div key={index} className="flex flex-col sm:flex-row gap-2">
                                    <span className="font-semibold">{key}:</span>
                                    {typeof value === "object" && value !== null ? (
                                        <div className="flex flex-col">
                                            {Object.entries(value).map(([subKey, subValue]) => (
                                                <div key={subKey} className="ml-4">
                                                    <span className="font-semibold">{subKey}:</span> {subValue}
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <span>{value}</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>

            <hr className="mt-20 sm:w-full" />

            {/* --------- Features & Description --------- */}
            <div className="mt-8">
                {/* --------- Features --------- */}
                <div className='mt-5'>
                    <h2 className="text-xl font-semibold mb-3">About this item</h2>
                    <ul className="flex flex-col gap-2">
                        {productData.features.map((feature, index) => {
                            return (
                                <li key={index} className="flex gap-2 items-start">
                                    <div className="w-3 h-3 flex items-center justify-center mt-[6px] flex-shrink-0">
                                        <FaCircle  className="w-full h-full text-black" />
                                    </div>
                                    <div>
                                        <p className="text-gray-500"> {feature}</p>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                <hr className="my-8 sm:w-full" />

                {/* --------- Description --------- */}
                <div>
                    <h2 className="text-xl font-semibold mb-3">Product Description</h2>
                    <div className={showMore ? 'flex flex-col gap-2' : 'line-clamp-2'}>
                        {
                            productData.description.map((desc, index) => (
                                <p className="text-gray-500 " key={index}>{desc}</p>
                            ))
                        }
                    </div>
                    
                    {productData.description[0]?.length > 350 && (
                        <button
                            className="text-blue-500 hover:underline mt-2"
                            onClick={() => setShowMore(!showMore)}
                        >
                            {showMore ? "show less" : "show more"}
                        </button>
                    )}
                </div>
            </div>
            
            <hr className="mt-20 sm:w-full" />

            {/* ---------- Display Related Products ---------- */}
            <RelatedProducts
                main_category={productData.main_category}
                categories={productData.categories}
                parent_asin = {parent_asin}
            />

            <hr className="my-10 sm:w-full" />

            {/* ---------- Product Reviews ---------- */}
            <div>
                <h2 className="text-xl font-semibold mb-3">Customer reviews</h2>

            </div>
        </div>
    ) : (
        <div className="opacity-0"></div>
    );
};

export default Product;
