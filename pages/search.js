import React, { useState } from "react";
import Head from 'next/head'
import Image from "next/image";
import Link from "next/link";
import Product from "../modal/Product";
import { AiOutlineShoppingCart } from "react-icons/ai";
import mongoose from "mongoose";

const Search = ({ products }) => {
    const [search, setsearch] = useState('')
    const handleChange = async (e) => {
        e.preventDefault()
        if (e.target.name == 'search') {
            setsearch(e.target.value)
        }
    }
    // console.log(products);
    return (
        <div className="text-gray-600 body-font catoBack relative">
            <Head>
                <title>Fresh Frveg - Search Products</title>
                <meta
                    name="description"
                    content="Shop fresh Fruits and vegetables online"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <section className="flex flex-row">
                {/* <div className="filter-side w-1/5 bg-white m-1">Hello</div> */}
                <div className="product-side w-90 mx-auto mt-5">
                    <input value={search} onChange={handleChange} type="text" name="search" id="search" className="p-4 w-4/5 mb-10 mx-auto shadow-md text-xl flex rounded-sm text-gray-600 outline-none" placeholder="Search" />
                    <div className="product-item grid grid-cols-6 productsIt gap-3 my-5 justify-center items-center">
                        {products.filter((val) => {
                            if (search == "") {
                                return val;
                            } else if (val.title.toLowerCase().includes(search.toLowerCase())) {
                                return val;
                            }
                        }).map((item) => {
                            return (
                                <Link
                                    passHref={true}
                                    key={item._id}
                                    href={`/products/${item.slug}`}
                                >
                                    <div className="product-box relative productSize  hover:bg-gray-50 bg-white flex flex-col items-center justify-center border rounded-sm tranAnimaS shadow-sm hover:shadow-xl hover:border-gray-200 border-gray-100 cursor-pointer">
                                        {item.availableQty == 0 && <div className="absolute font-medium text-gray-700 flex justify-center items-center w-full py-2 tranbackgr z-10 text-2xl mt-6">Out of Stock!</div>}
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

export default Search;
