import React, { useState, useEffect } from "react";
import Head from "next/head"
import Link from "next/link";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router";
import { BsFacebook } from "react-icons/bs";
import { AiOutlineTwitter } from "react-icons/ai";
import { AiOutlineInstagram } from "react-icons/ai";
import Image from "next/image";


const Contact = () => {
  const [name, setname] = useState("")
  const [email, setemail] = useState("")
  const [message, setmessage] = useState("")
  const [disabled, setdisabled] = useState(true)
  const [lodingS, setlodingS] = useState(true)

  useEffect(() => {
    if (name && email && message) {
      setdisabled(false)
    }
    else {
      setdisabled(true)
    }
  }, [name, email, message])

  const handleChange = async (e) => {
    e.preventDefault()
    if (e.target.name == 'name') {
      setname(e.target.value)
    }
    else if (e.target.name == 'email') {
      setemail(e.target.value)
    }
    else if (e.target.name == 'message') {
      setmessage(e.target.value)
    }
  }

  const submitQuery = async (e) => {
    setlodingS(false)
    let data = { name, email, message }
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
        <title>Fresh Frveg - Contact</title>
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
      {lodingS === false && <span className="fixed flex justify-center items-center text-green-900 text-lg z-10 top-1/2 w-full"><Image src={"/loader.gif"} width={50} height={50} /></span>}
      <div className="flex justify-around flex-row flexCol-con py-20 relative">
        {/* {lodingS === false && <span className="fixed flex justify-center items-center text-green-900 text-lg pl-6 top-1/2 w-full"><Image src={"/loader.gif"} width={50} height={50} /></span>} */}
        <div className="left margin-bot">
          <p className='text-5xl text-green-700 pb-16 textSma'>WE&rsquo;RE READY, LET&rsquo;S TALK.</p>
          <div className="contact flex flex-col">
            <input value={name} onChange={handleChange} type="text" id="name" name='name' placeholder="Your Name" required className="p-3 outline-none focus:border-green-700 mb-5 input-bck text-gray-600 text-base border border-gray-300" />
            <input value={email} onChange={handleChange} type="text" id="email" name="email" placeholder="Your Email / Mobile No" required className="p-3 outline-none focus:border-green-700 mb-5 input-bck text-gray-600 text-base border border-gray-300" />
            <textarea value={message} onChange={handleChange} type="text" id="message" name="message" placeholder="Message" required cols="57" rows="5" className="p-3 resize-none outline-none focus:border-green-700 mb-5 input-bck text-gray-600 border text-base border-gray-300" />
            <button onClick={submitQuery} disabled={disabled} className='font-medium rounded-full disabled:bg-green-500 hover:disabled:text-white disabled:cursor-default bg-green-700 w-52 px-10 py-4 hover:bg-white text-white hover:text-gray-800 border transition-all border-green-700'>
              {lodingS === false ? <h6>WAIT</h6> : <h6>SEND MESSAGE</h6>}
            </button>
          </div>
        </div>
        <div className="right">
          <p className='text-5xl text-green-700 pb-16 textSma'>CONTACT INFO</p>
          <div className="contact flex flex-col">
            <div className="wrap pb-2">
              <p className='text-lg text-gray-900 font-medium'>Address</p>
              <h5 className='text-gray-600'>Swaroop Nagar, Delhi- 110042, India</h5>
            </div>
            <div className="wrap pb-2">
              <p className='text-lg text-gray-900 font-medium'>Email Us</p>
              <h5 className='text-gray-600'>Contact@freshFrveg</h5>
            </div>
            <div className="wrap pb-2">
              <p className='text-lg text-gray-900 font-medium'>Call Us</p>
              <h5 className='text-gray-600'>+91 9999557786</h5>
            </div>
            <div className="wrap flex flex-row text-2xl">
              <div className='px-2 text-green-700 cursor-pointer'><BsFacebook /></div>
              <div className='px-2 text-green-700 cursor-pointer'><AiOutlineTwitter /></div>
              <div className='px-2 text-green-700 cursor-pointer'><AiOutlineInstagram /></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact