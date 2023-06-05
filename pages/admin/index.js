import Head from "next/head";
import Link from "next/link";
import RandomNSchema from "../../modal/randomCard";
import { HiChartPie } from 'react-icons/hi';
import { RiSendPlane2Fill } from 'react-icons/ri';
import ChangeNum from "./changeNum";
import Orderr from './order'
import OrderrWi from "../../modal/Withdrawal";
import Withdrawal from "./Withdrawal";
import WinnerSelect from "./winnerSelect";
import { useState } from "react";
import Order from "../../modal/Order";
import { AiOutlineClose } from "react-icons/ai";
import React, { useEffect } from "react";
import mongoose from "mongoose";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home({ orders, randomNum, selectUser, selectUsers, winnOrder, withdrawals }) {
  const [isHidden, setIsHidden] = useState(true);
  const router = useRouter()
  useEffect(() => {
    const myuser = JSON.parse(localStorage.getItem("myuser"));
    if (!myuser || myuser.email !== "kingkong1738aj@gmail.com") {
      router.push('/');
    } else {
      setIsHidden(false);
    }
  }, []);
  const [active, setActive] = useState("orders");
  if (isHidden) {
    return null;
  }
  return (
    <div className="overflow-hidden h-screen">
      <Head>
        <title>Patti Circle- Win Win Game</title>
        <meta
          name="description"
          content="Patti Circle win win Game"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Link href={'/'}><div className="gotoHome right-10 top-10 fixed cursor-pointer text-white p-2 bg-green-900 font-bold text-4xl"><AiOutlineClose /></div></Link>
      <div className="my-8 px-5 w-full flex flex-row">
        <div className=" bg-green-800 w-56 border border-gray-200 rounded-sm py-8 px-5 shadow-sm h-min">
          <ul className="flex flex-col">
            <li className="text-xl pb-5 font-medium text-white flex items-center"><span className="text-2xl pr-5"><HiChartPie /></span> Inventory</li>
            <li onClick={() => setActive("Order")} className="text-base pb-5 font-medium cursor-pointer hover:text-green-200 text-white flex items-center"><span className="text-xl pr-5"><RiSendPlane2Fill /></span> Order</li>
            <li onClick={() => setActive("ChangeNum")} className="text-base pb-5 font-medium cursor-pointer hover:text-green-200 text-white flex items-center"><span className="text-xl pr-5"><RiSendPlane2Fill /></span> Change Card No</li>
            <li onClick={() => setActive("WinnerSelect")} className="text-base pb-5 font-medium cursor-pointer hover:text-green-200 text-white flex items-center"><span className="text-xl pr-5"><RiSendPlane2Fill /></span> Winner Select</li>
            <li onClick={() => setActive("Withdrawal")} className="text-base pb-5 font-medium cursor-pointer hover:text-green-200 text-white flex items-center"><span className="text-xl pr-5"><RiSendPlane2Fill /></span> Withdrawal</li>
          </ul>
          <ul className="flex flex-col mt-2">
            <Link href={'/'}><li className="text-base pb-4 cursor-pointer hover:text-green-200 text-white flex items-center"><button className="px-5 py-2 border broder-white w-full rounded-full hover:bg-green-900"><p>Logout</p></button></li></Link>
          </ul>
        </div>
        <div className=" bg-white w-5/6 text-sm text-gray-800 ml-5 border border-gray-200 rounded-sm py-3 px-2 shadow-sm overflow-scroll h-screen">
          {active === "Order" && <Orderr orders={orders} />}
          {active === "Withdrawal" && <Withdrawal withdrawals={withdrawals} />}
          {active === "ChangeNum" && <ChangeNum randomNum={randomNum} />}
          {active === "WinnerSelect" && <WinnerSelect winnOrder={winnOrder} randomNum={randomNum} selectUser={selectUser} selectUsers={selectUsers} />}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  const yesterdayStart = new Date();
  yesterdayStart.setDate(yesterdayStart.getDate() - 1);
  yesterdayStart.setHours(0, 0, 0, 0);

  const yesterdayEnd = new Date();
  yesterdayEnd.setDate(yesterdayEnd.getDate() - 1);
  yesterdayEnd.setHours(23, 59, 59, 999);

  const orders = await Order.find();
  const withdrawals = await OrderrWi.find();
  const winnOrder = await Order.find({
    createdAt: {
      $gte: yesterdayStart,
      $lt: yesterdayEnd
    }, winning: "Pending"
  });
  let randomNum = await RandomNSchema.findOne();
  return {
    props: { orders: JSON.parse(JSON.stringify(orders)), randomNum: JSON.parse(JSON.stringify(randomNum)), winnOrder: JSON.parse(JSON.stringify(winnOrder)), withdrawals: JSON.parse(JSON.stringify(withdrawals)) },
  };
}