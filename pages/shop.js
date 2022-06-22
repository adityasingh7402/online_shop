import React from 'react'
import Image from 'next/image'
import Link from "next/link";

const Shop = () => {
  return (
    <div className='text-gray-600 body-font catoBack relative'>
      <section className="flex flex-row">
        <div className="filter-side w-1/5 bg-white m-1">Hello</div>
        <div className="product-side w-4/5">
          <div className="shop-title w-96 my-5 text-center p-3 m-auto background text-white text-3xl rounded-sm">
            Shop by Chatogary
          </div>
          <div className="product-item grid grid-cols-4 gap-1 my-5">
            <Link href={"./products/shop"}>
              <div className="product-box bg-white flex flex-col items-center justify-center border rounded-sm tranAnimaS shadow-sm hover:shadow-xl hover:border-gray-200 border-gray-100 cursor-pointer">
                <div className="product-image w-48 h-auto flex items-center justify-center">
                  <Image alt="ecommerce" className="block" src="/mango1.png" width={380} height={280} />
                </div>
                <div className="product-text text-left self-start pl-3">
                  <h2 className='text-base'>Fruits</h2>
                  <div className="product-price">
                    <h1 className='text-xl text-gray-900 font-medium'>Mango</h1>
                    <p className='text-base text-gray-900'>₹90</p>
                  </div>
                </div>
              </div>
            </Link>
            <Link href={"./products/shop"}>
              <div className="product-box bg-white flex flex-col items-center justify-center border rounded-sm tranAnimaS shadow-sm hover:shadow-xl hover:border-gray-200 border-gray-100 cursor-pointer">
                <div className="product-image w-48 h-auto flex items-center justify-center">
                  <Image alt="ecommerce" className="block" src="/banana.png" width={380} height={280} />
                </div>
                <div className="product-text text-left self-start pl-3">
                  <h2 className='text-base'>Fruits</h2>
                  <div className="product-price">
                    <h1 className='text-xl text-gray-900 font-medium'>Banana</h1>
                    <p className='text-base text-gray-900'>₹90</p>
                  </div>
                </div>
              </div>
            </Link>
            <Link href={"./products/shop"}>
              <div className="product-box bg-white flex flex-col items-center justify-center border rounded-sm tranAnimaS shadow-sm hover:shadow-xl hover:border-gray-200 border-gray-100 cursor-pointer">
                <div className="product-image w-48 h-auto flex items-center justify-center">
                  <Image alt="ecommerce" className="block" src="/apple.png" width={380} height={280} />
                </div>
                <div className="product-text text-left self-start pl-3">
                  <h2 className='text-base'>Fruits</h2>
                  <div className="product-price">
                    <h1 className='text-xl text-gray-900 font-medium'>Apple</h1>
                    <p className='text-base text-gray-900'>₹90</p>
                  </div>
                </div>
              </div>
            </Link>
            <Link href={"./products/shop"}>
              <div className="product-box bg-white flex flex-col items-center justify-center border rounded-sm tranAnimaS shadow-sm hover:shadow-xl hover:border-gray-200 border-gray-100 cursor-pointer">
                <div className="product-image w-48 h-auto flex items-center justify-center">
                  <Image alt="ecommerce" className="block" src="/mango1.png" width={380} height={280} />
                </div>
                <div className="product-text text-left self-start pl-3">
                  <h2 className='text-base'>Fruits</h2>
                  <div className="product-price">
                    <h1 className='text-xl text-gray-900 font-medium'>Mango</h1>
                    <p className='text-base text-gray-900'>₹90</p>
                  </div>
                </div>
              </div>
            </Link>
            <Link href={"./products/shop"}>
              <div className="product-box bg-white flex flex-col items-center justify-center border rounded-sm tranAnimaS shadow-sm hover:shadow-xl hover:border-gray-200 border-gray-100 cursor-pointer">
                <div className="product-image w-48 h-auto flex items-center justify-center">
                  <Image alt="ecommerce" className="block" src="/mango1.png" width={380} height={280} />
                </div>
                <div className="product-text text-left self-start pl-3">
                  <h2 className='text-base'>Fruits</h2>
                  <div className="product-price">
                    <h1 className='text-xl text-gray-900 font-medium'>Mango</h1>
                    <p className='text-base text-gray-900'>₹90</p>
                  </div>
                </div>
              </div>
            </Link>
            <Link href={"./products/shop"}>
              <div className="product-box bg-white flex flex-col items-center justify-center border rounded-sm tranAnimaS shadow-sm hover:shadow-xl hover:border-gray-200 border-gray-100 cursor-pointer">
                <div className="product-image w-48 h-auto flex items-center justify-center">
                  <Image alt="ecommerce" className="block" src="/mango1.png" width={380} height={280} />
                </div>
                <div className="product-text text-left self-start pl-3">
                  <h2 className='text-base'>Fruits</h2>
                  <div className="product-price">
                    <h1 className='text-xl text-gray-900 font-medium'>Mango</h1>
                    <p className='text-base text-gray-900'>₹90</p>
                  </div>
                </div>
              </div>
            </Link>
            <Link href={"./products/shop"}>
              <div className="product-box bg-white flex flex-col items-center justify-center border rounded-sm tranAnimaS shadow-sm hover:shadow-xl hover:border-gray-200 border-gray-100 cursor-pointer">
                <div className="product-image w-48 h-auto flex items-center justify-center">
                  <Image alt="ecommerce" className="block" src="/mango1.png" width={380} height={280} />
                </div>
                <div className="product-text text-left self-start pl-3">
                  <h2 className='text-base'>Fruits</h2>
                  <div className="product-price">
                    <h1 className='text-xl text-gray-900 font-medium'>Mango</h1>
                    <p className='text-base text-gray-900'>₹90</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Shop