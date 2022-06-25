import Link from "next/link";
import React from "react";

const signup = () => {
  return (
    <div>
      <div className='flex'>
        <div className="login flex justify-center border-2 bg-white border-gray-200 shadow-md rounded-sm w-1/4 my-9 mx-auto">
          <div className="client-data flex flex-col w-full px-6 py-4">
          <p className="text-3xl pb-3 font-normal">Create Account</p>
            <div className="flex flex-col pb-5">
              <label htmlFor="client-n" className="text-base font-normal pl-1 pb-1">Your name</label>
              <input type="text" id="client-n" placeholder='First and last name' className="p-1 shadow-inner text-gray-600 text-base border outline-none focus:border-green-700 border-gray-200" />
            </div>
            <div className="flex flex-col pb-5">
              <label htmlFor="client-m" className="text-base font-normal pl-1 pb-1">Mobile number</label>
              <input type="text" id="client-m" placeholder='Mobile number' className="p-1 shadow-inner text-gray-600 text-base border outline-none focus:border-green-700 border-gray-200" />
            </div>
            <div className="flex flex-col pb-5">
              <label htmlFor="client-p" className="text-base font-normal pl-1 pb-1">Email (optional)</label>
              <input type="text" id="client-p" className="p-1 shadow-inner text-gray-600 text-base border outline-none focus:border-green-700 border-gray-200" />
            </div>
            <div className="flex flex-col pb-5">
              <label htmlFor="client-l" className="text-base font-normal pl-1 pb-1">Password</label>
              <input type="text" id="client-l" placeholder='At least 6 characters' className="p-1 shadow-inner text-gray-600 text-base border outline-none focus:border-green-700 border-gray-200" />
            </div>
            <p className='text-gray-500 pt-4 text-xs'>We will send you a text to verify your phone.
              Message and Data rates may apply</p>
            <div className="text-3xl text-gray-800 flex justify-end border-b pb-2 border-gray-300 pt-3"><Link href={'/preview'}><button className="flex text-white font-medium text-sm rounded-full bg-green-700 w-full justify-center  py-2 hover:text-gray-800 hover:bg-white border transition-all border-green-700"><p>CONTINUE</p></button></Link></div>
            <p className='text-gray-500 pt-2 text-sm'>Already have an account? <span className='text-green-700 font-medium'><Link href={"/login"}>Sign in</Link></span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default signup;
