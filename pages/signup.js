import Link from "next/link";
import Head from 'next/head'
import React from "react";
import Image from "next/image";
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
  const [state, setState] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [lodingS, setlodingS] = useState(true)
  const [ageVerified, setAgeVerified] = useState(false);
  const [agefalse, setagefalse] = useState(true);
  const [mobilevalid, setmobilevalid] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('token')) {
      router.push('/')
    }
  }, [])
  const handleCheckboxChange = (e) => {
    setAgeVerified(e.target.checked);
  };

  const handleChange = (e) => {
    if (e.target.name == 'name') {
      setName(e.target.value)
    }
    if (e.target.name == 'email') {
      setEmail(e.target.value.toLowerCase())
    }
    if (e.target.name == 'state') {
      setState(e.target.value)
    }
    if (e.target.name == 'phone') {
      setPhone(e.target.value)
      setTimeout(() => {
        if (e.target.value.length <= 9 || e.target.value.length >= 11) {
          setmobilevalid(true)
        }
        else {
          setmobilevalid(false)
        }
      }, 2000);
    }
    if (e.target.name == 'password') {
      setPassword(e.target.value)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setagefalse(false)
    if(ageVerified){
    setlodingS(false)
    const data = { name, email, phone, password, ageVerified, state }
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
    setState('')
    setPhone('')
    setPassword('')
    setlodingS(true)
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
      setTimeout(() => {
        router.push('/login')
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
    }else{
      return 0;
    }
  }
  return (
    <div>
      <Head>
        <title>Patti Winner- Signup</title>
        <meta
          name="description"
          content="Patti Winner win win Game"
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
      <div className='flex relative containerr h-screen sabmainbs'>
        {lodingS === false && <span className="fixed flex justify-center items-center z-40 text-red-900 text-lg top-1/2 w-full"><Image src={"/loader.gif"} width={50} height={50} /></span>}
        <div className="login flex justify-center border-2 bg-white border-gray-300 shadow-md rounded-sm my-9 mx-auto">
          <div className="client-datas flex flex-col w-full px-6 py-4">
            <p className="text-3xl pb-3 font-normal">Create Account</p>
            <form onSubmit={handleSubmit} method="POST">
              <div className="flex flex-col pb-3">
                <label htmlFor="name" className="text-base font-normal pl-1 pb-1">Your name</label>
                <input value={name} onChange={handleChange} type="text" name='name' id="name" required autoComplete="name" placeholder='First and last name' className="p-1 shadow-inner text-gray-600 text-base border outline-none focus:border-red-700 border-gray-300" />
              </div>
              <div className="flex flex-col pb-3">
                <label htmlFor="email" className="text-base font-normal pl-1 pb-1">Email</label>
                <input value={email} onChange={handleChange} type="email" name='email' id="email" required autoComplete="email" placeholder='Email' className="p-1 shadow-inner text-gray-600 text-base border outline-none focus:border-red-700 border-gray-300" />
              </div>
              <div className="flex flex-col relative pb-3">
                <label htmlFor="phone" className="text-base font-normal pl-1 pb-1">Mobile phone</label>
                <input value={phone} onChange={handleChange} type="number" name='phone' id="phone" required autoComplete="phone" placeholder='Mobile phone' className="p-1 shadow-inner text-gray-600 text-base border outline-none focus:border-red-700 border-gray-300" />
                {mobilevalid === true && <span className="text-red-700 text-sm absolute -bottom-2 right-0">Enter a valid Mobile number</span>}
              </div>
              <div className="flex flex-col pb-3">
                <label htmlFor="v" className="text-base font-normal pl-1 pb-1">State</label>
                <input value={state} onChange={handleChange} type="text" name='state' id="state" required autoComplete="state" placeholder='State' className="p-1 shadow-inner text-gray-600 text-base border outline-none focus:border-red-700 border-gray-300" />
              </div>
              <div className="flex flex-col pb-3">
                <label htmlFor="password" className="text-base font-normal pl-1 pb-1">Password</label>
                <input value={password} onChange={handleChange} type="password" name='password' id="password" required autoComplete="password" placeholder='At least 6 characters' className="p-1 shadow-inner text-gray-600 text-base border outline-none focus:border-red-700 border-gray-300" />
              </div>
              {agefalse && <div className="flex flex-row pb-2 items-center">
                <input type="checkbox" name="ageVerification" className="w-4 h-4" id="ageVerification" checked={ageVerified} onChange={handleCheckboxChange}/>
                <label htmlFor="ageVerification" className="font-normal pl-2 text-xs">
                Please confirm that you are 21+ years old
                </label>
              </div>}
              {!agefalse && <div className="flex flex-row pb-2 items-center">
                <input type="checkbox" name="ageVerification" className="w-4 h-4" id="ageVerification" checked={ageVerified} onChange={handleCheckboxChange}/>
                <label htmlFor="ageVerification" className="font-bold pl-2 text-xs text-red-700">
                Please confirm that you are 21+ years old
                </label>
              </div>}
              <div className="text-3xl text-gray-800 flex justify-end border-b pb-2 border-gray-300 pt-3"><button type="submit" disabled={mobilevalid} className=" relative disabled:bg-red-500 flex text-white font-medium text-sm rounded-full bg-red-700 w-full justify-center  py-2 hover:text-gray-800 hover:bg-white border transition-all border-red-700">
                {lodingS === false ? <p>WAIT</p> : <p>CONTINUE</p>}
                <span className="lock absolute flex justify-start text-lg pl-6 items-center w-full"><VscLock /></span>
              </button></div>
            </form>
            <p className='text-gray-500 pt-2 text-sm'>Already have an account? <span className='text-red-700 font-medium'><Link href={"/login"}>Sign in</Link></span></p>
            <Link href={'/'}><a><li className="cursor-pointer flex justify-center flex-row items-center"><button className='rounded-full bg-blue-700 text-lg px-12 mt-8 py-2 hover:bg-white text-white hover:text-gray-800 border transition-all border-red-700'>Home Page</button></li></a></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
