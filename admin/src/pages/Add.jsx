import React, { useEffect, useState } from 'react'
import { assets, categoryList } from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Add = ({token}) => {

  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [main_category, setMainCategory] = useState('Unknown');
  const [categories, setCategories] = useState([]);
  const [features, setFeatures] = useState('');
  const [details, setDetails] = useState('');
  const [store, setStore] = useState('');
  const [parent_asin, setParentAsin] = useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      formData.append("parent_asin", parent_asin);
      formData.append("title", title);
      formData.append("price", price);
      formData.append("main_category", main_category);
      formData.append("store", store);
      formData.append("categories", categories);
      formData.append("description", description);
      formData.append("features", features);
      formData.append("details", details);
      // formData.append("description", JSON.stringify(description));
      // formData.append("features", JSON.stringify(features));
      // formData.append("details", JSON.stringify(details));

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(backendUrl + "/api/product/add", formData, { headers: { token } });

      if (response.data.success) {
          toast.success(response.data.message);
          setImage1(null);
          setImage2(null);
          setImage3(null);
          setImage4(null);
          setTitle('');
          setDescription('');
          setPrice('');
          setMainCategory('Unknown');
          setCategories([]);
          setFeatures('');
          setDetails('');
          setStore('');
          setParentAsin('');
      } else {
          toast.error(response.data.message);
      }
    } catch (error) {
        console.log(error);
        toast.error(error.message);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>

      <div>
        <p className='mb-2'>Upload Image</p>
        <div className='flex gap-2'>
          <label htmlFor="image1">
            <img className='w-20' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
            <input onChange={(e)=>setImage1(e.target.files[0])} type="file" id='image1' hidden/>
          </label>
          <label htmlFor="image2">
            <img className='w-20' src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" />
            <input onChange={(e)=>setImage2(e.target.files[0])} type="file" id='image2' hidden/>
          </label>
          <label htmlFor="image3">
            <img className='w-20' src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" />
            <input onChange={(e)=>setImage3(e.target.files[0])} type="file" id='image3' hidden/>
          </label>
          <label htmlFor="image4">
            <img className='w-20' src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" />
            <input onChange={(e)=>setImage4(e.target.files[0])} type="file" id='image4' hidden/>
          </label>
        </div>
      </div>

      <div className='flex flex-col sm:flex-row gap-2 w-ful sm:gap-8'>

        <div className='w-full'>
          <p className='mb-2'>Product parent asin</p>
          <input onChange={(e)=>setParentAsin(e.target.value)} value={parent_asin} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Type here' required/>
        </div>

        <div className='w-full'>
          <p className='mb-2'>Product store</p>
          <input onChange={(e)=>setStore(e.target.value)} value={store} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Type here' required/>
        </div>

      </div>

      <div className='w-full'>
        <p className='mb-2'>Product title</p>
        <input onChange={(e)=>setTitle(e.target.value)} value={title} className='w-full max-w-[500px] px-3 py-2' type="text" 
        placeholder='Type here' required/>
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product description</p>
        <textarea onChange={(e)=>setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2' type="text" 
        placeholder='["description 1", "description 2"]' required/>
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product features</p>
        <textarea onChange={(e)=>setFeatures(e.target.value)} value={features} className='w-full max-w-[500px] px-3 py-2' type="text" 
        placeholder='["features 1", "features 2"]' required/>
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product details</p>
        <textarea onChange={(e)=>setDetails(e.target.value)} value={details} className='w-full max-w-[500px] px-3 py-2' type="text" 
        rows={7}
        placeholder='{
  "manufacturer": "Sony",
  "specifications": {
      "dimensions": "10 x 5 x 3 cm",
      "color": "black"
    }
}' 
          required/>
      </div>

      <div className='flex flex-col sm:flex-row gap-2 w-ful sm:gap-8'>

        <div>
          <p className='mb-2'>Main category</p>
          <select onChange={(e)=>setMainCategory(e.target.value)} value={main_category} className='w-full px-3 py-2'>
            {
              categoryList.map((category, index) => {
                return <option key={index} value={category}>{category}</option>
              })
            }
          </select>
        </div>

        <div>
          <p className='mb-2'>Categories</p>
          <select onChange={(e)=>setCategories(e.target.value)} value={categories} className='w-full px-3 py-2'>
          {
              categoryList.map((category, index) => {
                return <option key={index} value={category}>{category}</option>
              })
            }
          </select>
        </div>
      </div>

      <div>
        <p className='mb-2'>Product price</p>
        <input onChange={(e)=>setPrice(e.target.value)} value={price} className='w-full px-3 py-2 sm:w-[120px]' type="Number" placeholder='25'/>
      </div>

      <button type='submit' className='w-28 py-3 mt-4 bg-black text-white'>ADD</button>

    </form>
  )
}

export default Add