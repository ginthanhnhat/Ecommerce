import React, { useContext, useEffect, useState } from 'react'
import Title from './Title'
import RatingStars from './RatingStars'
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import RatingSummary from './RatingSummary';
import { FaUserCircle, FaStar  } from "react-icons/fa";


const Review = () => {
    const { parent_asin } = useParams();
    const { products, currency, addToCart, backendUrl } = useContext(ShopContext);
    
    const [ ratings, setRatings ] = useState([])
    const [ totalRating, setTotalRating ] = useState(0)
    const [ reviews, setReviews ] = useState([])

    const fetchRatingNumber = async () => {
        try {

            const response = await axios.post(backendUrl + '/api/review/rating', {parent_asin})

            if(response.data.success) {
                setRatings(response.data.ratings)
                setTotalRating(response.data.total)
            }
            else {
                console.log(response.data.message)
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message) 
        }
    }

    const fetchReviews = async () => {
        try {

            const response = await axios.post(backendUrl + '/api/review/list', {parent_asin})

            if(response.data.success) {
                setReviews(response.data.reviews)
            }
            else {
                console.log(response.data.message)
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message) 
        }
    }

    useEffect(() => {
        fetchRatingNumber();
        fetchReviews();
    }, [parent_asin, products]);

    console.log(reviews)
  return (
    <div>
        <div className="text-center text-3xl py-2">
            <Title text1={'Customer'} text2={'Reviews'} />
        </div>

        <div className="flex flex-col sm:flex-row gap-1 sm:gap-10">
            {/* Left Side */}
            <div className="min-w-[30%]">
                <RatingSummary ratings={ratings} totalRating={totalRating} />

            </div>

            {/* Right Side */}
            <div className="flex-1">
                {
                    reviews.map((item, index)=>(
                        <div key={index} className='mt-4 py-4 border-b'>
                            <div className='flex items-center gap-2'>
                                <FaUserCircle />
                                <span>Amazon Customer</span>
                            </div>

                            <div className='flex items-center gap-2'>
                                <div className='flex items-center gap-1'>
                                    {[...Array(item.rating)].map((_, i) => (
                                        <FaStar key={i} className="text-yellow-400" />
                                    ))}
                                </div>
                                <h2 className="text-lg font-bold mb-1">{item.title}</h2>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500 mb-4">
                                    Reviewed at {new Date(item.timestamp).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric',
                                        })}
                                </p>
                            </div>

                            <div><span>{item.text}</span></div>
                            <div>
                                <p className="text-sm text-gray-500 mb-4">{item.helpful_vote} people found this helpful</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default Review