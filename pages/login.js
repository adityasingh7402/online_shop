import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const login = () => {
  return (
    <>
      <div className='flex'>
        <div className="login flex justify-center border-2 bg-white border-gray-200 shadow-md rounded-sm w-1/4 my-9 mx-auto">
          <div className="client-data flex flex-col w-full px-6 py-4">
          <p className="text-3xl pb-3 font-normal">Sign-In</p>
            <div className="flex flex-col pb-3">
              <label htmlFor="client-p" className="text-base font-normal pl-1 pb-1">Email or mobile phone number</label>
              <input type="text" id="client-p" className="p-1 shadow-inner text-gray-600 text-base border outline-none focus:border-green-700 border-gray-300" />
            </div>
            <div className="flex flex-col pb-1">
              <label htmlFor="client-l" className="text-base font-normal pl-1 pb-1">Password</label>
              <input type="text" id="client-l" className="p-1 shadow-inner text-gray-600 text-base border outline-none focus:border-green-700 border-gray-300" />
            </div>
            <Link href={'/forget'}><a><p className='flex justify-end text-green-700 pb-2 font-medium pr-1'>Forgot Password</p></a></Link>
            <p className='text-gray-500 pt-4 text-xs'>By continuing, you agree to FreshFrveg&apos;s Conditions of Use and Privacy Notice.</p>
            <div className="text-3xl text-gray-800 flex justify-end border-b pb-2 border-gray-300 pt-3"><Link href={'/preview'}><button className="flex text-white font-medium text-sm rounded-full bg-green-700 w-full justify-center  py-2 hover:text-gray-800 hover:bg-white border transition-all border-green-700"><p>CONTINUE</p></button></Link></div>
            <p className='text-gray-500 pt-2 text-sm'>Don&apos;t have account? <span className='text-green-700 font-medium'><Link href={"/signup"}>Sign up</Link></span></p>
          </div>
        </div>
      </div>
    </>
  )
}

export default login