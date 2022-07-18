import React, {useEffect, useState} from 'react'
import Image from 'next/image'
import mongoose from 'mongoose'
import Order from '../modal/Order'
import { useRouter } from 'next/router'

const MyOrder = ({ order, clearCart }) => {
  const products = order.products;
  const router = useRouter()
  const [date, setdate] = useState()
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  useEffect(() => {
    const d = new Date(order.createdAt)
    setdate(d)
    if(router.query.clearCart == 1){
      clearCart()
    }
  }, [])
  
  return (
    <>
      <div className="text-gray-700 body-font catoBack relative flex">
        <div className="order-page w-9/12 bg-white mx-auto my-8 py-8 px-10 flex flex-col">
          <div className="order-detail w-full">
            <div className='pb-16'><p className='text-3xl font-medium'>Hii.. {order.name}</p></div>
            <div className="order-d flex pb-20">
              <div className="left w-3/6 border-r-2 border-gray-200">
                <p className='text-2xl pb-4 font-medium text-green-700'>Order successfully placed.</p>
                <p className='text-base pb-4'>Order placed on  {date && date.toLocaleDateString("en-US", options)} </p>
                <p className='text-base pb-16'>Your order will be delivered by Tomorrow</p>
                <p className='text-base pb-1'>We are pleased to confirm your order no</p>
                <p className='text-base pb-1 font-medium'>#{order.orderId}</p>
                <p className='text-base pb-1'>Thank you for shopping with FreshFrveg</p>
                <button className='font-medium rounded-full bg-green-700 w-48 px-8 mt-10 py-2 hover:bg-white text-white hover:text-gray-800 border transition-all border-green-700'><h6>Track Order</h6></button>
              </div>
              <div className="right w-3/6 pl-10">
                <p className='text-2xl pb-4 font-medium'>Delivery Address</p>
                <p className='text-base pb-1'>{order.name}</p>
                <p className='text-base pb-1 '>{order.address}</p>
                <p className='text-base pb-1 '>{order.landmark}</p>
                <p className='text-base pb-1'>{order.city} {order.state} - {order.pincode}</p>
                <p className='text-base pb-1'>Mob. +91{order.phone}</p>
              </div>
            </div>
          </div>
          {Object.keys(products).map((key) => {
            return <div key={key} className="order-product border-b border-gray-200">
              <div className="product flex flex-row w-4/5  p-3">
                <div className="product-image w-1/6 flex justify-center">
                  <Image src={products[key].image} width={170} height={150} />
                </div>
                <div className="product-text w-2/4 flex justify-start flex-col pl-5">
                  <h1 className='text-2xl font-medium'>{products[key].name}</h1>
                  <p className='text-lg'>{products[key].variant}</p>
                  <div className="impTool flex flex-row">
                    <div className="qytselet relative flex items-center">
                      <div className="qyantity text-xl ">Qty: {products[key].qty}</div>
                    </div>
                  </div>
                </div>
                <div className="product-price w-1/6 flex flex-col justify-between">
                  <span className='text-xl pb-4'>₹{products[key].price}</span>
                </div>
                <div className="product-price w-1/6 items-center ml-24 flex flex-col justify-between">
                  <span className='text-xl pb-4'>₹{parseInt(products[key].price)*parseInt(products[key].qty)}</span>
                </div>
              </div>
            </div>
          })}
          <div className="order-payment flex border-t pt-3 border-gray-200">
            <div className="left w-3/6">
              <p className='text-2xl font-medium'>Payment Details</p>
              <p className='pt-4 text-xl'>{order.status}</p>
            </div>
            <div className="right w-3/6  flex justify-end pt-10">
              <div className="w-2/5 grid grid-cols-2 pr-3">
                <p>Items :</p>
                <p>₹{order.amount}</p>
                <p>Delivery :</p>
                <p>₹40</p>
                <p>Total :</p>
                <p>₹{parseInt(order.amount) + 40}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let order = await Order.findById(context.query.id);
  return {
    props: { order: JSON.parse(JSON.stringify(order)) }
  };
}

export default MyOrder