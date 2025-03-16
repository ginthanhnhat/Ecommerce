import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaChevronLeft, FaChevronRight,FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";

const Collection = () => {

    // const { products, search, showSearch, categories } = useContext(ShopContext);
    const { backendUrl, search, showSearch, categories } = useContext(ShopContext);
    const [showFilter, setShowFilter] = useState(false);
    const [filterProducts, setFilterProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [sortType, setSortType] = useState('relavent');

    const [ products, setProducts ] = useState([]);
    const [ page, setPage ] = useState(1);
    const [ total, setTotal ] = useState(0)
    const [ totalPages, setTotalPages ] = useState(0)


    const limit = 20 // set limit of products in one page 

    const fetchProducts = async (req, res) => {
        try {
            
            const response = await axios.get(backendUrl + `/api/product/list?page=${page}&limit=${limit}`)

            if (response.data.success) {
                setProducts(response.data.products);
                setTotal(response.data.total);
                setTotalPages(response.data.totalPages)
            } else {
                console.log(response.data.message);
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
        
    }

    useEffect(() => {
        fetchProducts()
    }, [page, limit]);

    const toggleCategory = (e) => {
        if (category.includes(e.target.value)) {
            setCategory((prev) =>
                prev.filter((item) => item !== e.target.value),
            );
        } else {
            setCategory((prev) => [...prev, e.target.value]);
        }
    };

    const applyFilter = () => {
        let productsCopy = products.slice();

        if (showSearch && search) {
            productsCopy = productsCopy.filter((item) =>
                item.title.toLowerCase().includes(search.toLowerCase()),
            );
        }

        if (category.length > 0) {
            productsCopy = productsCopy.filter((item) =>
                category.includes(item.main_category) || item.categories.some((cat) => category.includes(cat))
            );
        }

        setFilterProducts(productsCopy);
    };

    const sortProduct = () => {
        let fpCopy = filterProducts.slice();

        switch (sortType) {
            case 'low-high':
                setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
                break;
            case 'high-low':
                setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
                break;
            default:
                applyFilter();
                break;
        }
    };

    useEffect(() => {
        applyFilter();
    }, [category, sortType, search, showSearch, products]);

    useEffect(() => {
        sortProduct();
    }, [category, sortType]);

    return (
        <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
            {/* Filter Options */}
            <div className="min-w-60">
                <p
                    className="my-2 text-sl flex items-center cursor-pointer gap-2"
                    onClick={() => setShowFilter(!showFilter)}
                >
                    FILTERS
                    <img
                        className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`}
                        src={assets.dropdown_icon}
                        alt=""
                    />
                </p>
                {/* Category Filter */}
                <div
                    className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}
                >
                    <p className="mb-3 text-sm font-medium">CATEGORIES</p>
                    <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                        {
                            categories.map((category) => (
                                <p
                                    className="flex gap-2"
                                    key={category}
                                >
                                    <input
                                        className="w-3"
                                        type="checkbox"
                                        value={category}
                                        onChange={toggleCategory}
                                    />
                                    {category}
                                </p>
                            ))
                        }
                    </div>
                </div>
            </div>

            {/* Right Side */}
            <div className="flex-1">
                <div className="flex justify-between text-base sm:text-2xl mb-4">
                    <Title text1={'ALL'} text2={'COLLECTION'} />
                    {/* Products Sort */}
                    <select
                        onChange={(e) => setSortType(e.target.value)}
                        name=""
                        id=""
                        className="border-2 border-gray-300 text-sm px-2"
                    >
                        <option value="relavent">Sort by: Relavent</option>
                        <option value="low-high">Sort by: Low to High</option>
                        <option value="high-low">Sort by: High to Low</option>
                    </select>
                </div>

                {/* Map Products */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
                    {filterProducts.map((item, index) => (
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

                <div className='flex items-center justify-center gap-5 mt-10'>
                    <a className={`text-blue-600 ${page > 1 ? '' : 'pointer-events-none opacity-50'}`} onClick={() => {setPage(1); window.scrollTo({ top: 0, behavior: "smooth" })}}><FaAngleDoubleLeft /></a>
                    <a className={`text-blue-600 ${page > 1 ? '' : 'pointer-events-none opacity-50'}`} onClick={() => {setPage(prev => prev - 1); window.scrollTo({ top: 0, behavior: "smooth" })}}><FaChevronLeft /></a>
                    <input className={`text-center focus:border-sky-500 focus:outline focus:outline-sky-500`} 
                        type='text'
                        value={page} 
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                const newPage = Number(e.target.value);
                                if (!isNaN(newPage) && newPage >= 1 && newPage <= totalPages) {
                                    setPage(newPage);
                                    window.scrollTo({ top: 0, behavior: "smooth" });
                                }
                            }
                        }}
                        />
                    <a className={`text-blue-600 ${page === totalPages ? 'pointer-events-none opacity-50' : ''}`} onClick={() => {setPage(prev => prev + 1); window.scrollTo({ top: 0, behavior: "smooth" })}}><FaChevronRight /></a>
                    <a className={`text-blue-600 ${page === totalPages ? 'pointer-events-none opacity-50' : ''}`} onClick={() => {setPage(totalPages); window.scrollTo({ top: 0, behavior: "smooth" })}}><FaAngleDoubleRight /></a>
                </div>
            </div>
        </div>
    );
};

export default Collection;
