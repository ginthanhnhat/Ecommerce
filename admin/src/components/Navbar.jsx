import React from 'react'
import { assets } from '../assets/assets.js'
import { NavLink } from 'react-router-dom'

const Navbar = ({setToken}) => {
  return (
    <div className='flex items-center py-2 px-[4%] justify-between'>
        <div className='h-20 w-50 overflow-hidden items-center flex'>
          <NavLink to="/">
            <img className='w-60' src={assets.logo} alt=""/>
          </NavLink>
        </div>
        <button onClick={()=>setToken('')} className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'>Logout</button>
    </div>
  )
}

export default Navbar