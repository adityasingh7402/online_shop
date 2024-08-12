import { React, useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { RiCoinsLine } from "react-icons/ri";
import Image from 'next/image'
import Link from 'next/link';
import { AiOutlineClose } from "react-icons/ai";
import Head from "next/head"


const YourOrder = () => {
  const router = useRouter()
  const [orders, setorders] = useState([])
  const [lodingS, setlodingS] = useState(true)
  const [wallet, setwallet] = useState(0)
  const [token, settoken] = useState("")
  const [isSmallScreen, setIsSmallScreen] = useState(false);

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
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 600);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };

  }, [])
  useEffect(() => {
    const myuser = JSON.parse(localStorage.getItem("myuser"))
    if (myuser && myuser.token) {
      fetchdata(myuser.token)
      settoken(myuser.token)
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
  const fetchdata = async (token) => {
    let data = { token: token, wallet }
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    let res = await a.json()
    setwallet(res.wallet)
  }

  return (
    <div className='containerr h-screen catoBack flex relative'>
      <Head>
        <title>Patti Winner- History</title>
        <meta
          name="description"
          content="Patti Winner win win Game"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="gotoHome right-10 sersbtn top-10 fixed cursor-pointer font-bold text-4xl">
        {!isSmallScreen && <Link href={'/'}><a><div className="flex cursor-pointer justify-center items-center"><button className='rounded-full bg-red-900 text-base px-12 mt-8 py-3 hover:bg-white text-white hover:text-gray-800 border transition-all border-red-800'>Go Back</button></div></a></Link>}
        {isSmallScreen && <Link href={'/'}><div className="gotoHome right-10 top-10 fixed cursor-pointer text-white p-2 bg-red-900 font-bold text-4xl"><AiOutlineClose /></div></Link>}
      </div>
      {lodingS === false && <span className="fixed flex justify-center items-center text-green-900 text-base top-1/2 w-full"><Image src={"/loader.gif"} width={50} height={50} /></span>}
      <div className="checkout-title sversti my-8 mx-5 w-full flex flex-row">
        {/* <div className='left-side bg-white w-1/5 mr-5 border border-gray-200 rounded-sm py-5 px-5 shadow-sm h-72'>
          <div className="subtotal text-3xl text-gray-800 flex justify-start pb-2">Filters</div>
        </div> */}
        <div className='mx-5 sversti bg-white w-full text-3xl text-gray-800 border border-gray-200 rounded-sm py-8 px-5 shadow-sm overflow-scroll'>
          <p>History</p>
          <div className="products sversti flex flex-col w-full text-sm mt-8 ">
            {orders.length == 0 && <div className="flex justify-center text-3xl text-yellow-700 py-20 items-center border-t border-b border-gray-200">
              Your History List is Empty....
            </div>}
            <div className="coin flex justify-end text-2xl cursor-pointer text-yellow-700 pb-4 mt-5"><span className='mr-5'> Your Wallet </span>  <RiCoinsLine className="mr-1 text-3xl" />  <span className="text-3xl">{wallet}</span></div>
            <table className="bg-white p-5">
              <thead>
                <tr>
                  <th className='text-left border p-3 border-slate-600'><div className="Date text-base font-medium">Date</div></th>
                  <th className='text-left border p-3 border-slate-600'><div className="Refrence text-base font-medium">Refrence No</div></th>
                  <th className='text-left border p-3 border-slate-600'><div className="card text-base font-medium">Card No</div></th>
                  <th className='text-left border p-3 border-slate-600'><div className="Coin text-base font-medium">Coins</div></th>
                  <th className='text-left border p-3 border-slate-600'><div className="Status text-base font-medium">Status</div></th>
                  <th className='text-left border p-3 border-slate-600'><div className="Pending text-base font-medium">Pending</div></th>
                  <th className='text-left border p-3 border-slate-600'><div className="Win text-base font-medium">Win</div></th>
                  <th className='text-left border p-3 border-slate-600'><div className="Loss text-base font-medium">Loss</div></th>
                </tr>
              </thead>
              <tbody>
                {updatedOrders.map((item, index) => (
                  <tr key={item._id}>
                    <td className='text-left border p-3 border-slate-600'><div className="Date">{item.createdAt.substring(0, 10)}, {item.time}</div></td>
                    <td className='text-left border p-3 border-slate-600'><div className="Refrence">#{item.orderId}</div></td>
                    <td className='text-left border p-3 border-slate-600'><div className="Card">Card No - {item.randomNum}</div></td>
                    <td className='text-left border p-3 border-slate-600'><div className="Coin">{item.amount}</div></td>
                    <td className='text-left border p-3 border-slate-600'><div className="Status">
                      {item.winning === "Pending" && <span className='font-medium text-yellow-500'>{item.winning}</span>}
                      {item.winning === "Win" && <span className='font-medium text-green-700'>{item.winning}</span>}
                      {item.winning === "Loss" && <span className='font-medium text-red-700'>{item.winning}</span>}
                    </div></td>
                    <td className='text-left border p-3 border-slate-600'><div className="Pending">
                      {item.winning === "Pending" && <span className='font-medium flex flex-row items-center text-2xl text-yellow-500'>{parseInt(item.amount)}<RiCoinsLine className="ml-1" /></span>}
                    </div></td>
                    <td className='text-left border p-3 border-slate-600'><div className="Win">
                      {item.winning === "Win" && <span className='font-medium flex flex-row items-center text-2xl text-green-700'>+{parseInt(item.amount * 2 - 0.2 * item.amount)}<RiCoinsLine className="ml-1" /></span>}
                    </div></td>
                    <td className='text-left border p-3 border-slate-600'><div className="Loss">
                      {item.winning === "Loss" && <span className='font-medium flex flex-row items-center text-2xl text-red-700'>-{parseInt(item.amount)}<RiCoinsLine className="ml-1" /></span>}
                    </div></td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* <div className="table">
              <div className="tablehead flex flex-row justify-between items-center">

                <div className="Date text-base font-medium">Date</div>
                <th><div className="Refrence text-base font-medium">Refrence No</div></th>
                <th><div className="card text-base font-medium">Card No</div></th>
                <th><div className="Coin text-base font-medium">Coin</div></th>
                <th><div className="Status text-base font-medium">Status</div></th>
                <th><div className="Win text-base font-medium">Win</div></th>
                <th><div className="Pending text-base font-medium">Pending</div></th>
                <th><div className="Loss text-base font-medium">Loss</div></th>
              </div>
              {updatedOrders.map((item, index) => {
                return <div key={item._id} className="tablebody flex flex-row justify-between items-center">
                  <td className='text-left border p-3 border-slate-600'><div className="Date">{item.createdAt.substring(0, 10)}, {item.time}</div></td>
                  <td className='text-left border p-3 border-slate-600'><div className="Refrence">#{item.orderId}</div></td>
                  <td className='text-left border p-3 border-slate-600'><div className="Card">Card No - {item.cardno}, Lucky No- {item.randomNum}</div></td>
                  <td className='text-left border p-3 border-slate-600'><div className="Coin">{item.amount}</div></td>
                  <td className='text-left border p-3 border-slate-600'><div className="Status">
                    {item.winning == "Pending" && <span className='font-medium text-yellow-500'>{item.winning}</span>}
                    {item.winning == "Win" && <span className='font-medium text-green-700'>{item.winning}</span>}
                    {item.winning == "Loss" && <span className='font-medium text-red-700'>{item.winning}</span>}
                  </div></td>
                  <td className='text-left border p-3 border-slate-600'><div className="Pending">{item.winning == "Pending" && <span className='font-medium flex flex-row items-center text-2xl text-yellow-500'>{parseInt(item.amount)}<RiCoinsLine className="ml-1" /></span>}</div></td>
                  <td className='text-left border p-3 border-slate-600'><div className="Win">{item.winning == "Win" && <span className='font-medium flex flex-row items-center text-2xl text-green-700'>+{parseInt(item.amount * 2 - 0.1 * item.amount)}<RiCoinsLine className="ml-1" /></span>}</div></td>
                  <td className='text-left border p-3 border-slate-600'><div className="Loss">{item.winning == "Loss" && <span className='font-medium flex flex-row items-center text-2xl text-red-700'>-{parseInt(item.amount)}<RiCoinsLine className="ml-1" /></span>}</div></td>
                </div>
              })}
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default YourOrder