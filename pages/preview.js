import React from "react";
import Image from "next/image";
import Link from "next/link";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { AiOutlineMinusCircle } from "react-icons/ai";

const preview = ({ cart, addToCart, removeFromCart, clearCart, subTotal }) => {
    return (
        <>
            <div className="catoBack flex">
                <div className="checkout-title my-8 mx-5 w-full flex flex-row">
                    <div className="left-side bg-white w-4/5 text-3xl text-gray-800 border border-gray-200 rounded-sm py-8 px-10 shadow-sm">
                        <p className="border-b pb-2 border-gray-200">DELIVERY ADDRESS</p>
                        <div className="delivery-detail pl-16 w-3/5 py-8">
                            <div className="personal-d grid grid-cols-2 gap-4">
                                <div className="flex flex-col">
                                    <label htmlFor="client-n" className="text-base font-normal pl-1">Name</label>
                                    <input type="text" id="client-n" className="p-2 input-bck text-gray-600 text-base border outline-none focus:border-green-700 border-gray-200" />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="client-m" className="text-base font-normal pl-1">10-digit mobile number</label>
                                    <input type="text" id="client-m" className="p-2 input-bck text-gray-600 text-base border outline-none focus:border-green-700 border-gray-200" />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="client-p" className="text-base font-normal pl-1">Pincode</label>
                                    <input type="text" id="client-p" className="p-2 input-bck text-gray-600 text-base border outline-none focus:border-green-700 border-gray-200" />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="client-l" className="text-base font-normal pl-1">Locality</label>
                                    <input type="text" id="client-l" className="p-2 input-bck text-gray-600 text-base border outline-none focus:border-green-700 border-gray-200" />
                                </div>
                            </div>
                            <label htmlFor="client-address" className="text-base font-normal pl-1">Address (Area and Street)</label>
                            <textarea name="address" id="client-address" cols="57" rows="3" className="p-3 w-full focus:border-green-700 resize-none border outline-none input-bck text-gray-600 text-base border-gray-200" />
                            <div className="personal-d grid grid-cols-2 gap-3">
                                <div className="flex flex-col">
                                    <label htmlFor="client-c" className="text-base font-normal pl-1">City/District/Town</label>
                                    <input type="text" id="client-c" className="p-2 input-bck text-gray-600 text-base border outline-none focus:border-green-700 border-gray-200" />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="client-s" className="text-base font-normal pl-1">State</label>
                                    <input type="text" id="client-s" className="p-2 input-bck text-gray-600 text-base border outline-none focus:border-green-700 border-gray-200" />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="client-lm" className="text-base font-normal pl-1">Landmark</label>
                                    <input type="text" id="client-lm" className="p-2 input-bck text-gray-600 text-base border outline-none focus:border-green-700 border-gray-200" />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="client-am" className="text-base font-normal pl-1">Alternate Phone (Optional)</label>
                                    <input type="text" id="client-am" className="p-2 input-bck text-gray-600 text-base border outline-none focus:border-green-700 border-gray-200" />
                                </div>
                            </div>
                        </div>
                        <p>ORDER SUMMARY</p>
                        <div className="products flex flex-col w-full text-sm mt-8">
                            <div className="price-text flex justify-end px-4 text-base">
                                Price
                            </div>
                            {Object.keys(cart).length == 0 && (
                                <div className="flex justify-center text-4xl text-green-700 py-10 items-center border-t border-b border-gray-200">
                                    Your cart is Empty...!
                                </div>
                            )}
                            {Object.keys(cart).map((k) => {
                                return (
                                    <div
                                        key={k}
                                        className="product flex flex-row w-full border-t-2 border-b-2 border-gray-200 p-3"
                                    >
                                        <div className="product-image w-1/6 flex justify-center">
                                            <Image
                                                alt="ecommerce"
                                                className="block"
                                                src={cart[k].image}
                                                width={150}
                                                height={150}
                                            />
                                        </div>
                                        <div className="product-text w-2/3 flex justify-start flex-col">
                                            <h1 className="text-2xl font-medium">{cart[k].name}</h1>
                                            <p className="text-lg">{cart[k].variant}</p>
                                            <p className="text-sm text-green-700 font-medium">
                                                In stock
                                            </p>
                                            <div className="impTool mt-4 flex flex-row">
                                                <div className="qytselet relative flex border-r border-gray-200 px-3 items-center">
                                                    <AiOutlineMinusCircle
                                                        onClick={() => {
                                                            removeFromCart(
                                                                k,
                                                                1,
                                                                cart[k].price,
                                                                cart[k].name,
                                                                cart[k].variant,
                                                                cart[k].image
                                                            );
                                                        }}
                                                        className="text-3xl font-normal cursor-pointer mr-2"
                                                    />
                                                    <div className="qyantity w-11 rounded-sm text-center text-base h-7 border border-gray-600">
                                                        {cart[k].qty}
                                                    </div>
                                                    <AiOutlinePlusCircle
                                                        onClick={() => {
                                                            addToCart(
                                                                k,
                                                                1,
                                                                cart[k].price,
                                                                cart[k].name,
                                                                cart[k].variant,
                                                                cart[k].image
                                                            );
                                                        }}
                                                        className="text-3xl font-normal cursor-pointer ml-2"
                                                    />
                                                </div>
                                                <div className="qytselet relative flex border-r border-gray-200 text-green-700 cursor-pointer hover:bg-gray-100 font-medium px-3 items-center">
                                                    <p>Delete</p>
                                                </div>
                                                <div className="qytselet relative flex border-r border-gray-200 text-green-700 cursor-pointer hover:bg-gray-100 font-medium px-3 items-center">
                                                    <p>See more like this</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="product-price w-1/6 flex justify-end">
                                            <span className="text-2xl">₹{cart[k].price}</span>
                                        </div>
                                    </div>
                                );
                            })}
                            <div className="flex justify-end">
                                <button
                                    onClick={clearCart}
                                    className="flex text-white font-medium text-sm rounded-full bg-red-700 justify-center w-28 mt-5  py-2 hover:text-gray-800 hover:bg-white border transition-all border-red-700"
                                >
                                    <p>Clear Cart</p>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="right-side bg-white w-1/5 ml-5 border border-gray-200 rounded-sm py-8 px-5 shadow-sm h-72">
                        <div className="subtotal text-3xl text-gray-800 flex justify-end pb-2">
                            Subtotal : &nbsp; <span>(1 Item)</span>
                        </div>
                        <div className="subtotal text-xl text-gray-800 flex justify-end pt-3  border-b-2 border-gray-200">
                            Delivery Charge : ₹40
                        </div>
                        <div className="subtotal text-3xl text-gray-800 flex justify-end pt-10">
                            ₹{subTotal === 0 ? subTotal : subTotal + 40}
                        </div>
                        <div className="subtotal text-3xl text-gray-800 flex justify-end pt-3">
                            <button className="flex text-white font-medium text-sm rounded-full bg-green-700 w-full justify-center  py-2 hover:text-gray-800 hover:bg-white border transition-all border-green-700">
                                <p>Proceed to Buy</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default preview;
