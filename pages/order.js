import React from 'react'
import Image from 'next/image'

const order = ({ cart, addToCart, removeFromCart, clearCart, subTotal }) => {
  return (
    <>
      <div className="text-gray-700 body-font catoBack relative flex">
        <div className="order-page w-9/12 bg-white mx-auto my-8 py-8 px-10 flex flex-col">
          <div className="order-detail w-full">
            <div className='pb-16'><p className='text-3xl font-medium'>Hii Aditya</p></div>
            <div className="order-d flex">
              <div className="left w-3/6 border-r-2 border-gray-200">
                <p className='text-2xl pb-4 font-medium text-green-700'>Order successfully placed.</p>
                <p className='text-base pb-16'>Your order will be delivered by Sat 6, May 2017</p>
                <p className='text-base pb-1'>We are pleased to confirm your order no</p>
                <p className='text-base pb-1 font-medium'>#order372823</p>
                <p className='text-base pb-1'>Thank you for shopping with FreshFrveg</p>
                <button className='font-medium rounded-full bg-green-700 w-48 px-8 mt-10 py-2 hover:bg-white text-white hover:text-gray-800 border transition-all border-green-700'><h6>Track Order</h6></button>
              </div>
              <div className="right w-3/6 pl-10">
                <p className='text-2xl pb-4 font-medium'>Delivery Address</p>
                <p className='text-base pb-1'>Name</p>
                <p className='text-base pb-1 '>Swaroop Nagar</p>
                <p className='text-base pb-1'>Delhi - 110042</p>
                <p className='text-base pb-1 '>Delhi</p>
                <p className='text-base pb-1'>Mob. +919995554477</p>
              </div>
            </div>
          </div>
          <div className="order-product pt-20">
            {Object.keys(cart).map((k) => {
              return <div key={k} className="product flex flex-row w-4/5  p-3">
                <div className="product-image w-1/6 flex justify-center">
                  <Image alt="ecommerce" className="block" src={cart[k].image} width={150} height={150} />
                </div>
                <div className="product-text w-2/3 flex justify-start flex-col">
                  <h1 className='text-2xl font-medium'>{cart[k].name}</h1>
                  <p className='text-lg'>{cart[k].variant}</p>
                  <div className="impTool mt-4 flex flex-row">
                    <div className="qytselet relative flex px-3 items-center">
                      <div className="qyantity text-base ">Qty: {cart[k].qty}</div>
                    </div>
                  </div>
                </div>
                <div className="product-price w-1/6 flex justify-end">
                  <span className='text-2xl'>₹{cart[k].price}</span>
                </div>
              </div>
            })}
          </div>
          <div className="order-payment flex border-t pt-3 border-gray-200">
            <div className="left w-3/6">
              <p className='text-2xl font-medium'>Payment Details</p>
              <p className='pt-4 text-lg'>Cash on Delivery</p>
            </div>
            <div className="right w-3/6  flex justify-end pt-10">
              <div className="w-2/5 grid grid-cols-2 pr-3">
                <p>Items :</p>
                <p>₹{subTotal}</p>
                <p>Delivery :</p>
                <p>₹40</p>
                <p>Total :</p>
                <p>₹{subTotal + 40}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default order