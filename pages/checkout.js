import React from 'react'
import Image from 'next/image'
import { RiArrowDownSLine } from "react-icons/ri";

const checkout = () => {
  return (<>
    <div className='catoBack flex'>
      <div className="checkout-title my-8 mx-5 w-full flex flex-row">
        <div className='left-side bg-white w-4/5 text-3xl text-gray-800 border border-gray-200 rounded-sm py-8 px-5 shadow-sm'>
          <p>Shopping List</p>
          <div className="products flex flex-col w-full text-sm mt-8">
            <div className="price-text flex justify-end px-4 text-base">Price</div>
            <div className="product flex flex-row w-full border-t-2 border-b-2 border-gray-200 p-3">
              <div className="product-image w-1/6 flex justify-center">
                <Image alt="ecommerce" className="block" src="/apple.png" width={150} height={150} />
              </div>
              <div className="product-text w-2/3 flex justify-start flex-col">
                <h1 className='text-2xl font-medium'>Fresh Red Apple (500gm)</h1>
                <p className='text-lg'>Fruit</p>
                <p className='text-sm text-green-700 font-medium'>In stock</p>
                <div className="impTool mt-4 flex flex-row">
                  <div className="qytselet relative flex border-r border-gray-200 px-3">
                    <select className="rounded border appearance-none cursor-pointer hover:bg-gray-100 border-gray-300 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-greenbg-green-700 text-base pl-5 pr-4">
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                      <option>6</option>
                      <option>7</option>
                      <option>8</option>
                      <option>9</option>
                      <option>10</option>
                    </select>
                    {/* <div className="downArrow absolute top-3 -mt-px text-gray-500 left-7 text-2xl">
                      <RiArrowDownSLine />
                    </div> */}
                  </div>
                  <div className="qytselet relative flex border-r border-gray-200 text-green-700 cursor-pointer hover:bg-gray-100 font-medium px-3 items-center">
                    <p>Delete</p>
                  </div>
                  <div className="qytselet relative flex border-r border-gray-200 text-green-700 cursor-pointer hover:bg-gray-100 font-medium px-3 items-center">
                    <p>See more like this</p>
                  </div>
                </div>
              </div>
              <div className="product-price w-1/6 flex justify-end">
                <span className='text-2xl'>₹ 400.00</span>
              </div>
            </div>
          </div>
        </div>
        <div className='right-side bg-white w-1/5 ml-5 border border-gray-200 rounded-sm py-8 px-5 shadow-sm h-72'>
          <div className="subtotal text-3xl text-gray-800 flex justify-end pb-2">Subtotal : &nbsp; <span>(1 Item)</span></div>
          <div className="subtotal text-xl text-gray-800 flex justify-end pt-3  border-b-2 border-gray-200">Delivery Charge : ₹40.00</div>
          <div className="subtotal text-3xl text-gray-800 flex justify-end pt-10">₹ 440.00</div>
          <div className="subtotal text-3xl text-gray-800 flex justify-end pt-3"><button className="flex text-white font-medium text-sm rounded-full bg-green-700 w-full justify-center  py-2 hover:text-gray-800 hover:bg-white border transition-all border-green-700"><p>Proceed to Buy</p></button></div>

        </div>
      </div>
    </div>
  </>
  )
}

export default checkout