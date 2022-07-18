import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const footer = () => {
  return (
    <div>
      <footer className="text-gray-600 body-font footer-back">
        <div className="container px-5 py-14 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
          <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
            <Link href="/">
              <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
                <div className="logo mx-6"><Image src="/logo.png" width={120} height={90} /></div>
              </a>
            </Link>
            <p className="mt-2  text-sm text-gray-500">Fresh Frveg- Shop Online Fruits and vegetables</p>
          </div>
          <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">ABOUT US</h2>
              <nav className="list-none mb-10">
                <li>
                  <a className="text-gray-600 hover:text-gray-800">About us</a>
                </li>
                <li>
                  <a className="text-gray-600 hover:text-gray-800">Our Vision & Purpos</a>
                </li>
                <li>
                  <a className="text-gray-600 hover:text-gray-800">Quality standards</a>
                </li>
                <li>
                  <a className="text-gray-600 hover:text-gray-800">FAQs</a>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">OUR POLICES</h2>
              <nav className="list-none mb-10">
                <li>
                  <a className="text-gray-600 hover:text-gray-800">Privacy police</a>
                </li>
                <li>
                  <a className="text-gray-600 hover:text-gray-800">Disclaimer</a>
                </li>
                <li>
                  <a className="text-gray-600 hover:text-gray-800">Data Protection police</a>
                </li>
                <li>
                  <a className="text-gray-600 hover:text-gray-800">Information Security police</a>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">CATEGORIES</h2>
              <nav className="list-none mb-10">
                <li>
                  <a className="text-gray-600 hover:text-gray-800">Fruits & Vegetables</a>
                </li>
                <li>
                  <a className="text-gray-600 hover:text-gray-800">Eggs</a>
                </li>
                <li>
                  <a className="text-gray-600 hover:text-gray-800">Bakery</a>
                </li>
                <li>
                  <a className="text-gray-600 hover:text-gray-800">Dry Food</a>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">SIGN UP TO STAY UPDATED</h2>
              <input
                type="text"
                className="p-2  w-60 rounded-sm border outline-none focus:border-green-700 border-gray-600 text-gray-600"
                placeholder="Enter Your Email Address"
              />
              <button className='font-medium text-xs rounded-full bg-green-700 w-32 px-3 py-3 mt-2 text-white hover:text-gray-800 hover:bg-white border transition-all border-green-700'><p>SEND MESSAGE</p></button>
            </div>
          </div>
        </div>
        <div className="bg-green-700">
          <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
            <p className="text-white text-sm text-center sm:text-left">© 2022 Fresh Frveg —
              <a href="https://twitter.com/FreshFrveg" rel="noopener noreferrer" className="text-gray-300 ml-1" target="_blank">@FreshFrveg</a>
            </p>
            <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
              <a className="text-white">
                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                </svg>
              </a>
              <a className="ml-3 text-white">
                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                </svg>
              </a>
              <a className="ml-3 text-white">
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                </svg>
              </a>
            </span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default footer