import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect } from 'react';
import { useRouter } from "next/router";
import { VscLock } from "react-icons/vsc";

const Forget = () => {
  const router = useRouter()
  useEffect(() => {
    if (localStorage.getItem('token')) {
      router.push('/')
    }
  }, [])
  return (
    <div>
      <Head>
        <title>Fresh Frveg - Forget</title>
        <meta
          name="description"
          content="Shop fresh Fruits and vegetables online"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='flex'>
        <div className="login flex justify-center border-2 bg-white border-gray-200 shadow-md rounded-sm my-9 mx-auto">
          <div className="client-data flex flex-col w-full px-6 py-4">
            <p className="text-3xl pb-8 font-normal">Forgot Password</p>
            <div className="flex flex-col pb-3">
              <label htmlFor="client-p" className="text-base font-normal pl-1 pb-1">Email</label>
              <input type="text" id="client-p" className="p-1 shadow-inner text-gray-600 text-base border outline-none focus:border-green-700 border-gray-300" />
            </div>
            <p className='text-gray-500 pt-4 text-xs'>We will send you a text to your phone.</p>
            <div className="text-3xl text-gray-800 flex justify-end border-b pb-2 border-gray-300 pt-3">
              <Link href={'/preview'}>
                <button className="flex relative text-white font-medium text-sm rounded-full bg-green-700 w-full justify-center  py-2 hover:text-gray-800 hover:bg-white border transition-all border-green-700"><p>CONTINUE</p>
                  <span className="lock absolute flex justify-start text-lg pl-6 items-center w-full"><VscLock /></span>
                </button></Link></div>
            <p className='text-green-700 font-medium'><Link href={"/login"}>Sign-In</Link></p>
            <Link href={'/'}><a><li className="cursor-pointer flex justify-center flex-row items-center"><button className='rounded-full bg-blue-700 text-lg px-12 mt-8 py-2 hover:bg-white text-white hover:text-gray-800 border transition-all border-green-700'>Home Page</button></li></a></Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Forget