import React from 'react'
import Image from 'next/image'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { VscLock } from 'react-icons/vsc';

const Login = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [lodingS, setlodingS] = useState(true)

  useEffect(() => {
    if (localStorage.getItem('myuser')) {
      router.push('/')
    }
  }, [])


  const handleChange = (e) => {
    if (e.target.name == 'email') {
      setEmail(e.target.value.toLowerCase())
    }
    if (e.target.name == 'password') {
      setPassword(e.target.value)
    }
  }

  const handleSubmit = async (e) => {
    setlodingS(false)
    e.preventDefault()
    const data = { email, password }
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/login`, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    let response = await res.json()
    // console.log(response)
    setlodingS(true)
    setEmail('')
    setPassword('')
    if (response.success) {
      localStorage.setItem("myuser", JSON.stringify({ token: response.token, email: response.email, name: response.name }))
      toast.success('You are successfully logged in', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        router.push(process.env.NEXT_PUBLIC_HOST)
      }, 2000);
    }
    else {
      toast.error(response.error, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }
  return (
    <>
      <Head>
        <title>Fresh Frveg - Login</title>
        <meta
          name="description"
          content="Shop fresh Fruits and vegetables online"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='flex relative'>
        {lodingS === false && <span className="fixed z-40 flex justify-center items-center text-green-900 text-lg top-1/2 w-full"><Image src={"/loader.gif"} width={50} height={50} /></span>}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <div className="login flex justify-center border-2 bg-white border-gray-200 shadow-md rounded-sm my-9 mx-auto">
          <div className="client-data flex flex-col w-full px-6 py-4">
            <p className="text-3xl pb-3 font-normal">Sign-In</p>
            <form onSubmit={handleSubmit} method="POST">
              <div className="flex flex-col pb-3">
                <label htmlFor="email" className="text-base font-normal pl-1 pb-1">Email</label>
                <input value={email} onChange={handleChange} type="email" name='email' id="email" required autoComplete="email" placeholder='Email' className="p-1 shadow-inner text-gray-600 text-base border outline-none focus:border-green-700 border-gray-300" />
              </div>
              <div className="flex flex-col pb-1">
                <label htmlFor="password" className="text-base font-normal pl-1 pb-1">Password</label>
                <input value={password} onChange={handleChange} type="password" name='password' id="password" required autoComplete="password" placeholder='At least 6 characters' className="p-1 shadow-inner text-gray-600 text-base border outline-none focus:border-green-700 border-gray-300" />
              </div>
              <Link href={'/forget'}><a><p className='flex justify-end text-green-700 pb-2 font-medium pr-1'>Forgot Password</p></a></Link>
              <p className='text-gray-500 pt-4 text-xs'>By continuing, you agree to FreshFrveg&apos;s Conditions of Use and Privacy Notice.</p>
              <div className="text-3xl text-gray-800 flex justify-end border-b pb-2 border-gray-300 pt-3"><button type="submit" className="flex relative text-white font-medium text-sm rounded-full bg-green-700 w-full justify-center  py-2 hover:text-gray-800 hover:bg-white border transition-all border-green-700">
                {lodingS === false ? <p>WAIT</p> : <p>CONTINUE</p>}
                <span className="lock absolute flex justify-start text-lg pl-6 items-center w-full"><VscLock /></span>
              </button></div>
            </form>
            <p className='text-gray-500 pt-2 text-sm'>Don&apos;t have account? <span className='text-green-700 font-medium'><Link href={"/signup"}>Sign up</Link></span></p>
          <Link href={'/'}><a><li className="cursor-pointer flex justify-center flex-row items-center"><button className='rounded-full bg-blue-700 text-lg px-12 mt-8 py-2 hover:bg-white text-white hover:text-gray-800 border transition-all border-green-700'>Home Page</button></li></a></Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login