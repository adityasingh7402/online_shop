import Link from "next/link";
import Head from 'next/head'
import React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { VscLock } from "react-icons/vsc";

const Signup = () => {
  const router = useRouter()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (localStorage.getItem('token')) {
      router.push('/')
    }
  }, [])

  const handleChange = (e) => {
    if (e.target.name == 'name') {
      setName(e.target.value)
    }
    if (e.target.name == 'email') {
      setEmail(e.target.value)
    }
    if (e.target.name == 'phone') {
      setPhone(e.target.value)
    }
    if (e.target.name == 'password') {
      setPassword(e.target.value)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = { name, email, phone, password }
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/signup`, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    let response = await res.json()

    setName('')
    setEmail('')
    setPhone('')
    setPassword('')

    if (response.success) {
      toast.success('Your account have been created', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
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
    <div>
      <Head>
        <title>Fresh Frveg - Signup</title>
        <meta
          name="description"
          content="Shop fresh Fruits and vegetables online"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
      <div className='flex'>
        <div className="login flex justify-center border-2 bg-white border-gray-300 shadow-md rounded-sm my-9 mx-auto">
          <div className="client-data flex flex-col w-full px-6 py-4">
            <p className="text-3xl pb-3 font-normal">Create Account</p>
            <form onSubmit={handleSubmit} method="POST">
              <div className="flex flex-col pb-5">
                <label htmlFor="name" className="text-base font-normal pl-1 pb-1">Your name</label>
                <input value={name} onChange={handleChange} type="text" name='name' id="name" required autoComplete="name" placeholder='First and last name' className="p-1 shadow-inner text-gray-600 text-base border outline-none focus:border-green-700 border-gray-300" />
              </div>
              <div className="flex flex-col pb-5">
                <label htmlFor="email" className="text-base font-normal pl-1 pb-1">Email</label>
                <input value={email} onChange={handleChange} type="email" name='email' id="email" required autoComplete="email" placeholder='Email' className="p-1 shadow-inner text-gray-600 text-base border outline-none focus:border-green-700 border-gray-300" />
              </div>
              <div className="flex flex-col pb-5">
                <label htmlFor="phone" className="text-base font-normal pl-1 pb-1">Mobile phone</label>
                <input value={phone} onChange={handleChange} type="number" name='phone' id="phone" required autoComplete="phone" placeholder='Mobile phone' className="p-1 shadow-inner text-gray-600 text-base border outline-none focus:border-green-700 border-gray-300" />
              </div>
              <div className="flex flex-col pb-5">
                <label htmlFor="password" className="text-base font-normal pl-1 pb-1">Password</label>
                <input value={password} onChange={handleChange} type="password" name='password' id="password" required autoComplete="password" placeholder='At least 6 characters' className="p-1 shadow-inner text-gray-600 text-base border outline-none focus:border-green-700 border-gray-300" />
              </div>
              <p className='text-gray-500 pt-4 text-xs'>We will send you a text to verify your phone.
                Message and Data rates may apply</p>
              <div className="text-3xl text-gray-800 flex justify-end border-b pb-2 border-gray-300 pt-3"><button type="submit" className=" relative flex text-white font-medium text-sm rounded-full bg-green-700 w-full justify-center  py-2 hover:text-gray-800 hover:bg-white border transition-all border-green-700"><p>CONTINUE</p>
                <span className="lock absolute flex justify-start text-lg pl-6 items-center w-full"><VscLock /></span>
              </button></div>
            </form>
            <p className='text-gray-500 pt-2 text-sm'>Already have an account? <span className='text-green-700 font-medium'><Link href={"/login"}>Sign in</Link></span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
