import { React, useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import Image from 'next/image'
import Link from 'next/link';
import Head from "next/head"


const YourOrder = () => {
  const router = useRouter()
  const [orders, setorders] = useState([])

  useEffect(() => {
    const fetchOrders = async () => {
      let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/myorders`, {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: JSON.parse(localStorage.getItem('myuser')).token }),
      })
      let res = await a.json()
      setorders(res.orders)
    }
    if (!localStorage.getItem('myuser')) {
      router.push('/')
    }
    else {
      fetchOrders()
    }

  }, [])

  return (
    <div className='catoBack flex'>
      <Head>
        <title>Fresh Frveg - Orders</title>
        <meta
          name="description"
          content="Shop fresh Fruits and vegetables online"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="checkout-title my-8 mx-5 w-full flex flex-row">
        {/* <div className='left-side bg-white w-1/5 mr-5 border border-gray-200 rounded-sm py-5 px-5 shadow-sm h-72'>
          <div className="subtotal text-3xl text-gray-800 flex justify-start pb-2">Filters</div>
        </div> */}
        <div className='right-side mx-auto bg-white w-4/5 text-3xl text-gray-800 border border-gray-200 rounded-sm py-8 px-5 shadow-sm'>
          <p>Your Order List</p>
          <div className="products flex flex-col w-full text-sm mt-8">
            {orders.length == 0 && <div className="flex justify-center text-4xl text-green-700 py-20 items-center border-t border-b border-gray-200">
              Your Order List is Empty....
            </div>}
            {orders.map((item) => {
              return <div key={item._id} className="product flex flex-row w-full border-t-2 border-b-2 border-gray-200 p-3 hover:bg-gray-100">
                <div className="product-image w-1/4 flex justify-center items-center">
                  <Image alt="ecommerce" className="block" src={'/basket.png'} width={200} height={150} />
                </div>
                <div className="product-text w-2/6 flex justify-start flex-col">
                  <h1 className='text-2xl pb-1 font-medium'>{item.name}</h1>
                  <p className='text-lg pb-1'>Order id :  <span>#{item.orderId}</span></p>
                  <p className='text-lg pb-1'>{item.createdAt.substring(0, 10)}</p>
                  <p className='text-lg pb-1'>Payment Status: <span className='font-medium'>{item.status}</span></p>
                </div>
                <div className="product-price w-1/6 flex justify-start">
                  <span className='text-2xl'>₹{parseInt(item.amount) + 40}</span>
                </div>
                <div className="product-price w-3/12">
                  <Link href={'/order?id=' + item._id}><button className='font-medium rounded-full bg-green-700 w-40 text-lg px-8 mt-10 py-2 hover:bg-white text-white hover:text-gray-800 border transition-all border-green-700'><h6>Details</h6></button></Link>
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