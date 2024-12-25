import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className=''>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-[5rem] pt-[5rem] border-t-2 text-sm'>

            <div>
                <a href="" className="h-20 w-50 overflow-hidden items-center flex">
                    <img className='w-60' src={assets.logo} alt=''/>
                </a>
                <p className="w-full md:w-2/3 text-gray-600 lg:ml-[26px]">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut obcaecati error amet. Ad, illo dolorum nam blanditiis quis quisquam culpa perferendis repudiandae dolorem veritatis minus cumque impedit soluta? Harum, tempora?
                </p>
            </div>

            <div>
                <p className="text-xl font-medium mb-5">COMPANY</p>
                <ul className="flex flex-col gap-1 text-gray-600">
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy policy</li>
                </ul>
            </div>

            <div>
                <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
                <ul className="flex flex-col gap-1 text-gray-600">
                    <li>+1-000-000-0000</li>
                    <li>ginthanhnhat@gmail.com</li>
                    <li>
                        <a href="https://www.facebook.com/ginthanhnhat/">Facebook</a>
                    </li>
                </ul>
            </div>
        </div>

        <div>
            <hr />
            <p className="py-5 text-sm text-center">
                Copyright 2024@ ThanhNhat.dev - All Right Reserved.
            </p>
        </div>
    </div>
  )
}

export default Footer