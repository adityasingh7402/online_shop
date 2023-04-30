import { React, useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import {  RiCoinsLine } from "react-icons/ri";
import Image from 'next/image'
import Link from 'next/link';
import { AiOutlineClose } from "react-icons/ai";
import Head from "next/head"


const YourOrder = () => {
  const router = useRouter()
  const [orders, setorders] = useState([])
  const [lodingS, setlodingS] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      setlodingS(false)
      let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/myorders`, {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: JSON.parse(localStorage.getItem('myuser')).token }),
      })
      let res = await a.json()
      setorders(res.orders)
      setlodingS(true)
    }
    if (!localStorage.getItem('myuser')) {
      router.push('/')
    }
    else {
      fetchOrders()
    }

  }, [])
  const updatedOrders = orders.map((item) => {
    const date = new Date(item.createdAt);
    const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return {
      ...item,
      time: time
    }
  });

  return (
    <div className='containerr catoBack flex relative'>
      <Head>
        <title>Patti Circle- Your Orders</title>
        <meta
          name="description"
          content="Patti Circle win win Game"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Link href={'/'}><div className="gotoHome right-10 top-10 fixed cursor-pointer text-green-900 p-2 bg-white font-bold text-4xl"><AiOutlineClose /></div></Link>
      {lodingS === false && <span className="fixed flex justify-center items-center text-green-900 text-lg top-1/2 w-full"><Image src={"/loader.gif"} width={50} height={50} /></span>}
      <div className="checkout-title my-8 mx-5 w-full flex flex-row h-screen">
        {/* <div className='left-side bg-white w-1/5 mr-5 border border-gray-200 rounded-sm py-5 px-5 shadow-sm h-72'>
          <div className="subtotal text-3xl text-gray-800 flex justify-start pb-2">Filters</div>
        </div> */}
        <div className='right-side mx-auto bg-white yourOrderW text-3xl text-gray-800 border border-gray-200 rounded-sm py-8 px-5 shadow-sm'>
          <p>Your Order List</p>
          <div className="products flex flex-col w-full text-sm mt-8">
            {orders.length == 0 && <div className="flex justify-center text-4xl text-green-700 py-20 items-center border-t border-b border-gray-200">
              Your Order List is Empty....
            </div>}
            {updatedOrders.map((item, index) => {
              return <div key={item._id} className="product flex yourOrderCol justify-center flex-row w-full mb-5 border-t-2 border-b-2 border-gray-300 p-9 hover:bg-gray-100">
                <div className="product-text yourOrderWT flex justify-start flex-col">
                  <h1 className='text-2xl pb-1 font-medium'>{item.createdAt.substring(0, 10)}, {item.time}
                  </h1>
                  <p className='text-lg pb-1'>Order id :  <span>#{item.orderId}</span></p>
                  <p className="font-medium py-3">Card : <span className="font-normal">{` Card No - ${item.cardno} , Random No ${item.randomNum}`}</span></p>
                  <p className='text-lg pb-1'>Winning Status : &nbsp;
                    {item.winning == "Pending" && <span className='font-medium text-yellow-500'>{item.winning}</span>}
                    {item.winning == "Win" && <span className='font-medium text-green-700'>{item.winning}</span>}
                    {item.winning == "Loss" && <span className='font-medium text-red-700'>{item.winning}</span>}

                  </p>
                </div>
                <div className="product-price w-1/6 flex justify-start">
                  {item.winning == "Pending" && <span className='font-medium flex flex-row items-center text-2xl text-yellow-500'>{parseInt(item.amount)}<RiCoinsLine className="ml-1" /></span>}
                  {item.winning == "Win" && <span className='font-medium flex flex-row items-center text-2xl text-green-700'>+{parseInt(item.amount  *2 - 0.1 * item.amount)}<RiCoinsLine className="ml-1" /></span>}
                  {item.winning == "Loss" && <span className='font-medium flex flex-row items-center text-2xl text-red-700'>-{parseInt(item.amount)}<RiCoinsLine className="ml-1" /></span>}
                </div>
              </div>
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default YourOrder