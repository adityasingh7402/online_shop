import React from 'react'
import Image from "next/image";
import Link from "next/link";
import Product from "../modal/Product";
import { AiOutlineShoppingCart } from "react-icons/ai";
import mongoose from "mongoose";

const Fruits = ({products}) => {
  return (
    <div className="text-gray-600 body-font catoBack relative">
      <section className="flex flex-row">
        <div className="filter-side w-1/5 bg-white m-1">Hello</div>
        <div className="product-side w-4/5">
          <div className="shop-title w-96 my-5 text-center p-3 m-auto background text-white text-3xl rounded-sm">
            Shop Fruits
          </div>
          {Object.keys(products).length == 0 && <div className="flex justify-center items-center text-xl text-gray-700 font-medium">Sorry, all the item are currently out of stock. New stock coming soon. Stay Tuned!</div>}
          <div className="product-item grid grid-cols-6 gap-1 pr-1 my-5">
            {products.map((item) => {
              return (
                <Link
                  passHref={true}
                  key={item._id}
                  href={`/products/${item.slug}`}
                >
                  <div className="product-box relative hover:bg-gray-50 bg-white flex flex-col items-center justify-center border rounded-sm tranAnimaS shadow-sm hover:shadow-xl hover:border-gray-200 border-gray-100 cursor-pointer">
                  {item.availableQty == 0 && <div className="absolute flex justify-center items-center w-full py-2 text-gray-700 font-medium tranbackgr z-10 text-2xl mt-6">Out of Stock!</div>}
                    <div className="product-image w-36 h-40 overflow-hidden flex items-center justify-center">
                      <img className="scale" src={`/${item.img}`} alt={item.title} />
                    </div>
                    <div className="product-text text-left self-start w-full pl-3">
                      <h2 className="text-base">{item.category}</h2>
                      <div className="product-price flex justify-between items-center">
                        <div className="div">
                          <h1 className="text-xl text-gray-900 font-medium">
                            {item.title}
                          </h1>
                          <p className="text-sm text-gray-900">
                            {item.size}
                          </p>
                          <p className="text-base text-gray-900 font-medium pb-1">
                            ₹{item.price}
                          </p>
                        </div>
                        <div className="shop spin text-gray-600 text-2xl pr-3">
                          <AiOutlineShoppingCart />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  )
}

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let products = await Product.find({category: 'Fruits'});
  return {
    props: { products: JSON.parse(JSON.stringify(products)) },
  };
}


export default Fruits