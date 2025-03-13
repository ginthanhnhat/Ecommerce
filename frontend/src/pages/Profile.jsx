import React, { useEffect, useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

const Profile = () => {

  const { backendUrl, token } = useContext(ShopContext)

  const [ name, setName ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ customUserId, setCustomUserId ] = useState('')

  let user = {
    name,
    email,
    customUserId
  }

  const fetchUser = async () => {
    try {
      const response = await axios.get(
        backendUrl + '/api/user/profile',
        { headers: { token } },
      );
  
      setName(response.data.user.name);
      setEmail(response.data.user.email);
      setCustomUserId(response.data.user.customUserId);
  
      console.log("Fetched User:", response.data.user)

    } catch (error) {
      console.error("Error fetching user:", error)
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    const updatedUser = {
      name,
      email,
      customUserId,
    };

    try {
      
      console.log("userId: ", updatedUser.customUserId)

      const response = await axios.put(backendUrl + '/api/user/update', updatedUser, {headers: {token}})

      if(response.data.success) {
        fetchUser()
        toast.success(response.data.message)
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error)
    }
  }

  useEffect(() => {

    fetchUser()

  }, [token])

  return (
    <div className="border-t pt-16">
      <div className="text-2xl w-full text-center  mb-10">
          <Title text1={'MY'} text2={'PROFILE'} />
      </div>

      {user && (
        <form onSubmit={onSubmitHandler}>

          <div className='w-full flex flex-col sm:flex-row items-center justify-center mb-4 gap-4'>
            <p className='min-w-[120px]'>Your Name</p>
            <input onChange={(e)=>setName(e.target.value)} value={user.name} className='w-full max-w-[500px] px-3 py-2 border' type="text" placeholder='Enter your name' required/>
          </div>

          <div className='w-full flex flex-col sm:flex-row items-center justify-center mb-4 gap-4'>
            <p className='min-w-[120px]'>Your Email</p>
            <input onChange={(e)=>setEmail(e.target.value)} value={user.email} className='w-full max-w-[500px] px-3 py-2 border' type="text" placeholder='Enter your email' required/>
          </div>

          <div className='w-full flex flex-col sm:flex-row items-center justify-center mb-4 gap-4'>
            <p className='min-w-[120px]'>Custom UserId</p>
            <input onChange={(e)=>setCustomUserId(e.target.value)} value={user.customUserId} className='w-full max-w-[500px] px-3 py-2 border' type="text" placeholder='Enter User ID for recommendation' required/>
          </div>
          
          <div className='w-full flex flex-col sm:flex-row items-center justify-center mb-4 gap-4'>
            <button type='submit' className='w-28 py-3 mt-4 bg-black text-white'>UPDATE</button>
          </div>
        </form>
      )}
            
    </div>
  )
}

export default Profile