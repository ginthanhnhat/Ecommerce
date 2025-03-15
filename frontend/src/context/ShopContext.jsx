import { createContext, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { productsData, categoryList } from '../assets/assets'

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = '$';
    const delivery_fee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    // const products = productsData
    const [token, setToken] = useState('');
    const navigate = useNavigate();
    const categories = categoryList

    const addToCart = async (itemId) => {
        
        console.log(itemId)

        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            cartData[itemId] += 1;
        } else {
            cartData[itemId] = 1;
        }

        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(
                    backendUrl + '/api/cart/add',
                    { itemId },
                    { headers: { token } },
                );
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    };

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            try {
                if (cartItems[items] > 0) {
                    totalCount += cartItems[items];
                }
            } catch (error) {
                console.log(error);
            }
        }

        return totalCount;
    };

    const updateQuantity = async (itemId, quantity) => {
        let cartData = structuredClone(cartItems);

        cartData[itemId] = quantity;

        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(
                    backendUrl + '/api/cart/update',
                    { itemId, quantity },
                    { headers: { token } },
                );
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    };

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product.parent_asin === items);
            try {
                if (cartItems[items] > 0) {
                    totalAmount += itemInfo.price * cartItems[items];
                }
            } catch (error) {
                console.log(error);
            }
        }

        return totalAmount;
    };

    const getProductsData = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/product/list');

            if (response.data.success) {
                setProducts(response.data.products);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    const getUserCart = async (token) => {
        try {
            const response = await axios.post(
                backendUrl + '/api/cart/get',
                {},
                { headers: { token } },
            );
            if (response.data.success) {
                setCartItems(response.data.cartData);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        getProductsData();
    }, []);

    useEffect(() => {
        if (!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'));
            getUserCart(localStorage.getItem('token'));
        }
    }, []);

    const values = {
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        setCartItems,
        addToCart,
        getUserCart,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate,
        token,
        setToken,
        backendUrl,
        categories,
    };

    return (
        <ShopContext.Provider value={values}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
