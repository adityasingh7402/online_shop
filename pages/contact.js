import React, { useState, useEffect } from "react";
import Head from "next/head"
import Link from "next/link";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router";
import { BsFacebook } from "react-icons/bs";
import { AiOutlineTwitter, AiOutlineClose } from "react-icons/ai";
import { AiOutlineInstagram } from "react-icons/ai";
import Image from "next/image";


const Contact = () => {
  const [name, setname] = useState("")
  const [email, setemail] = useState("")
  const [phone, setphone] = useState("")
  const [message, setmessage] = useState("")
  const [disabled, setdisabled] = useState(true)
  const [lodingS, setlodingS] = useState(true)

  useEffect(() => {
    if (name && email && message && phone) {
      setdisabled(false)
    }
    else {
      setdisabled(true)
    }
  }, [name, email, message, phone])

  const handleChange = async (e) => {
    e.preventDefault()
    if (e.target.name == 'name') {
      setname(e.target.value)
    }
    else if (e.target.name == 'email') {
      setemail(e.target.value)
    }
    else if (e.target.name == 'phone') {
      setphone(e.target.value)
    }
    else if (e.target.name == 'message') {
      setmessage(e.target.value)
    }
  }

  const submitQuery = async (e) => {
    setlodingS(false)
    let data = { name, email, message, phone }
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/addquery`, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    let res = await a.json()
    setname('')
    setemail('')
    setphone('')
    setmessage('')
    setlodingS(true)
    toast.success('Message send successfully', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  }

  return (
    <div>
      <Head>
        <title>Patti Circle- Contact</title>
        <meta
          name="description"
          content="Patti Circle win win Game"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="gotoHome btphonre right-10 top-10 z-10 fixed cursor-pointer  p-3  font-bold text-4xl">
      <Link href={'/'}><a><div className="flex cursor-pointer justify-center items-center"><button className='rounded-full bg-red-900 text-lg px-12 mt-8 py-3 hover:bg-white text-white hover:text-gray-800 border transition-all border-red-800'>Go Back</button></div></a></Link>
      </div>
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
      {lodingS === false && <span className="fixed flex justify-center items-center text-red-900 text-lg z-10 top-1/2 w-full"><Image src={"/loader.gif"} width={50} height={50} /></span>}
      <div className="containerr h-screen flex justify-around flex-row flexCol-con py-20 relative">
        {/* {lodingS === false && <span className="fixed flex justify-center items-center text-red-900 text-lg pl-6 top-1/2 w-full"><Image src={"/loader.gif"} width={50} height={50} /></span>} */}
        <div className="left margin-bot">
          <p className='text-5xl text-white pb-16 textSma'>Contact Us</p>
          <div className="contact flex flex-col">
            <input value={name} onChange={handleChange} type="text" id="name" name='name' placeholder="Your Name / User Name" required className="p-3 outline-none focus:border-red-700 mb-5 input-bck text-gray-600 text-base border border-gray-300" />
            <input value={phone} onChange={handleChange} type="number" id="phone" name="phone" placeholder="Mobile No" required className="p-3 outline-none focus:border-red-700 mb-5 input-bck text-gray-600 text-base border border-gray-300" />
            <input value={email} onChange={handleChange} type="text" id="email" name="email" placeholder="Your Email" required className="p-3 outline-none focus:border-red-700 mb-5 input-bck text-gray-600 text-base border border-gray-300" />
            <textarea value={message} onChange={handleChange} type="text" id="message" name="message" placeholder="Message" required cols="57" rows="5" className="p-3 resize-none outline-none focus:border-red-700 mb-5 input-bck text-gray-600 border text-base border-gray-300" />
            <button onClick={submitQuery} disabled={disabled} className='font-medium rounded-full disabled:bg-red-500 hover:disabled:text-white disabled:cursor-default bg-red-700 w-52 px-10 py-4 hover:bg-white text-white hover:text-gray-800 border transition-all border-red-700'>
              {lodingS === false ? <h6>WAIT</h6> : <h6>SEND MESSAGE</h6>}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact