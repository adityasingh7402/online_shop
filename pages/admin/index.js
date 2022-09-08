import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/Home.module.css";
import { HiChartPie } from 'react-icons/hi';
import { RiSendPlane2Fill } from 'react-icons/ri';
import Addproduct from './addproduct'
import Addcoupon from './addcoupon'
import Coupons from './coupons'
import Orderr from './order'
import Products from './products'
import Updateproduct from './updateproduct'
import { useState } from "react";
import Order from "../../modal/Order";
import Product from "../../modal/Product";
import mongoose from "mongoose";

export default function Home({orders, products}) {
  const [active, setActive] = useState("orders");
  return (
    <div>
      <Head>
        <title>Fresh Frveg- Shop Online Fruits and vegetables</title>
        <meta
          name="description"
          content="Shop fresh Fruits and vegetables online"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="my-8 px-5 w-full flex flex-row">
        <div className=" bg-green-800 w-2/12 border border-gray-200 rounded-sm py-8 px-5 shadow-sm h-min">
          <ul className="flex flex-col">
            <li className="text-xl pb-5 font-medium text-white flex items-center"><span className="text-2xl pr-5"><HiChartPie /></span> Inventory</li>
            <li onClick={() => setActive("Order")} className="text-base pb-5 font-medium cursor-pointer hover:text-green-200 text-white flex items-center"><span className="text-xl pr-5"><RiSendPlane2Fill /></span> Order</li>
            <li onClick={() => setActive("Products")} className="text-base pb-5 font-medium cursor-pointer hover:text-green-200 text-white flex items-center"><span className="text-xl pr-5"><RiSendPlane2Fill /></span> Products</li>
            <li onClick={() => setActive("Coupons")} className="text-base pb-5 font-medium cursor-pointer hover:text-green-200 text-white flex items-center"><span className="text-xl pr-5"><RiSendPlane2Fill /></span> Coupons</li>
          </ul>
          <ul className="flex flex-col mt-2">
            <li onClick={() => setActive("Addproduct")} className="text-base pb-4 cursor-pointer hover:text-green-200 text-white flex items-center"><button className="px-5 py-2 border broder-white w-full rounded-full hover:bg-green-900"><p>Add Product</p></button></li>
            <li onClick={() => setActive("Updateproduct")} className="text-base pb-4 cursor-pointer hover:text-green-200 text-white flex items-center"><button className="px-5 py-2 border broder-white w-full rounded-full hover:bg-green-900"><p>Update Product</p></button></li>
            <li onClick={() => setActive("Addcoupon")} className="text-base pb-4 cursor-pointer hover:text-green-200 text-white flex items-center"><button className="px-5 py-2 border broder-white w-full rounded-full hover:bg-green-900"><p>Add Coupons</p></button></li>
            <Link href={'/admin/'}><li className="text-base pb-4 cursor-pointer hover:text-green-200 text-white flex items-center"><button className="px-5 py-2 border broder-white w-full rounded-full hover:bg-green-900"><p>Logout</p></button></li></Link>
          </ul>
        </div>
        <div className=" bg-white w-5/6 text-sm text-gray-800 ml-5 border border-gray-200 rounded-sm py-3 px-2 shadow-sm">
        {active === "Order" && <Orderr orders={orders} />}
        {active === "Products" && <Products products={products} />}
        {active === "Coupons" && <Coupons/>}
        {active === "Addproduct" && <Addproduct/>}
        {active === "Updateproduct" && <Updateproduct/>}
        {active === "Addcoupon" && <Addcoupon/>}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let orders = await Order.find();
  let products = await Product.find();
  return {
    props: { orders: JSON.parse(JSON.stringify(orders)), products: JSON.parse(JSON.stringify(products)) },
  };

}