import React from 'react'
import { BsFacebook } from "react-icons/bs";
import { AiOutlineTwitter } from "react-icons/ai";
import { AiOutlineInstagram } from "react-icons/ai";

const contact = () => {
  return (
    <div>
      <div className="flex justify-around py-20 relative">
        <div className="left">
          <p className='text-5xl text-gray-900 pb-16'>WE&rsquo;RE READY, LET&rsquo;S TALK.</p>
          <div className="contact flex flex-col">
            <input type="text" id="client-n" placeholder="Your Name" className="p-3 mb-5 input-bck text-gray-600 text-base border border-gray-200" />
            <input type="email" id="client-e" placeholder="Your Name" className="p-3 mb-5 input-bck text-gray-600 text-base border border-gray-200"  />
            <textarea name="comment" id="client-m" placeholder="Message" cols="57" rows="5" className="p-3 mb-5 input-bck text-gray-600 border text-base border-gray-200" />
            <button className='font-medium rounded-full bg-green-700 w-52 px-10 py-4 hover:bg-white text-white hover:text-gray-800 border transition-all border-green-700'><h6>SEND MESSAGE</h6></button>
          </div>
        </div>
        <div className="right">
        <p className='text-5xl text-gray-900 pb-16'>CONTACT INFO</p>
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
              <div className='px-2 cursor-pointer'><BsFacebook /></div>
              <div className='px-2 cursor-pointer'><AiOutlineTwitter /></div>
              <div className='px-2 cursor-pointer'><AiOutlineInstagram /></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default contact