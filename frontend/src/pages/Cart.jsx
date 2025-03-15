import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';

const Cart = () => {
    const {
        products,
        currency,
        cartItems,
        updateQuantity,
        getCartAmount,
        navigate,
    } = useContext(ShopContext);

    const [cartData, setCartData] = useState([]);

    useEffect(() => {
        if (products.length > 0) {
            const tempData = [];
            for (const items in cartItems) {
                if (cartItems[items] > 0)
                    [
                        tempData.push({
                            parent_asin: items,
                            quantity: cartItems[items],
                        }),
                    ];
            }
            setCartData(tempData);
        }
    }, [cartItems, products]);

    console.log('cartData: ', cartData)

    return (
        <div className="border-t pt-14">
            <div className="text-2xl mb-3">
                <Title text1={'YOUR'} text2={'CART'} />
            </div>

            <div className="">
                {cartData.map((item, index) => {
                    const productData = products.find(
                        (product) => product.parent_asin === item.parent_asin,
                    );

                    return (
                        <div
                            key={index}
                            className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
                        >
                            <div className="flex items-start gap-6">
                                <img
                                    className="w-16 sm:w-20"
                                    src={productData.images[0] ? productData.images[0].hi_res || productData.images[0].large || productData.images[0].thumb : assets.no_img }
                                    alt=""
                                />
                                <div className="">
                                    <p className="text-xs sm:text-lg font-medium">
                                        {productData.title}
                                    </p>
                                    <div className="flex items-center gap-5 mt-2">
                                        <p>
                                            {currency}
                                            {productData.price.toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <input
                                onChange={(e) =>
                                    e.target.value === '' ||
                                    e.target.value === '0'
                                        ? null
                                        : updateQuantity(
                                              item.parent_asin,
                                              Number(e.target.value),
                                          )
                                }
                                type="number"
                                min={1}
                                defaultValue={item.quantity}
                                className="border max-w-12 sm:m-w-20 px-1 sm:px-2 py-1"
                            />
                            <img
                                onClick={() =>
                                    updateQuantity(item.parent_asin, 0)
                                }
                                className="w-4 mr-4 sm:w-5 cursor-pointer "
                                src={assets.bin_icon}
                                alt=""
                            />
                        </div>
                    );
                })}
            </div>

            <div className="flex justify-end my-20">
                <div className="w-full sm:w-[450px]">
                    <CartTotal />
                    <div className="w-full text-end">
                        <button
                            onClick={() => navigate('/place-order')}
                            className="bg-black text-white text-sm my-8 px-8 py-3"
                        >
                            PROCEED TO CHECKOUT
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
