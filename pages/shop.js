import React from "react";
import Image from "next/image";
import Link from "next/link";
import Product from "../modal/Product";
import { AiOutlineShoppingCart } from "react-icons/ai";
import mongoose from "mongoose";

const Shop = ({ products }) => {
  console.log(products);
  return (
    <div className="text-gray-600 body-font catoBack relative">
      <section className="flex flex-row">
        <div className="filter-side w-1/5 bg-white m-1">Hello</div>
        <div className="product-side w-4/5">
          <div className="shop-title w-96 my-5 text-center p-3 m-auto background text-white text-3xl rounded-sm">
            Shop by Chatogary
          </div>
          <div className="product-item grid grid-cols-6 gap-1 pr-1 my-5">
            {products.map((item) => {
              return (
                <Link
                  passHref={true}
                  key={item._id}
                  href={`/products/${item.slug}`}
                >
                  <div className="product-box hover:bg-gray-50 bg-white flex flex-col items-center justify-center border rounded-sm tranAnimaS shadow-sm hover:shadow-xl hover:border-gray-200 border-gray-100 cursor-pointer">
                    <div className="product-image w-40 h-40 overflow-hidden flex items-center justify-center">
                      <img src={`/${item.img}`} alt={item.category} />
                    </div>
                    <div className="product-text text-left self-start w-full pl-3">
                      <h2 className="text-base">{item.category}</h2>
                      <div className="product-price flex justify-between items-center">
                        <div className="div">
                          <h1 className="text-xl text-gray-900 font-medium">
                            {item.title}
                          </h1>
                          <p className="text-base text-gray-900">
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
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let products = await Product.find();
  return {
    props: { products: JSON.parse(JSON.stringify(products)) },
  };
}

export default Shop;
