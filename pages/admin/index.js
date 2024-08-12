import Head from "next/head";
import Link from "next/link";
import RandomNSchema from "../../modal/randomCard";
import { HiChartPie } from 'react-icons/hi';
import { RiSendPlane2Fill } from 'react-icons/ri';
import ChangeNum from "./changeNum";
import QueryCo from "./query"
import Orderr from './order'
import OrderrWi from "../../modal/Withdrawal";
import Usersss from "../../modal/User";
import addCoin from "../../modal/Addcoin";
import Query from "../../modal/Query";
import WinnerSelect from "./winnerSelect";
import { useState } from "react";
import Order from "../../modal/Order";
import { AiOutlineClose } from "react-icons/ai";
import React, { useEffect } from "react";
import mongoose from "mongoose";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home({ orders, randomNum, selectUser, selectUsers, winnOrder, withdrawals, addcoins, userss, Querys }) {
  const [isHidden, setIsHidden] = useState(true);
  const router = useRouter()
  useEffect(() => {
    const myuser = JSON.parse(localStorage.getItem("myuser"));
    const allowedEmails = process.env.NEXT_PUBLIC_ALLOWED_EMAILS?.split(',');
    if (!myuser || !allowedEmails.includes(myuser.email)) {
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
    <div className="overflow-hidden h-screen containerr">
      <Head>
        <title>Patti Winner- Win Win Game</title>
        <meta
          name="description"
          content="Patti Winner win win Game"
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
      <Link href={'/'}><div className="gotoHome right-10 top-10 fixed cursor-pointer text-white p-2 bg-red-900 font-bold text-4xl"><AiOutlineClose /></div></Link>
      <div className="my-8 px-5 w-full flex flex-row">
        <div className=" bg-red-800 w-56 border border-gray-200 rounded-sm py-8 px-5 shadow-sm h-min">
          <ul className="flex flex-col">
            <li className="text-xl pb-5 font-medium text-white flex items-center"><span className="text-2xl pr-5"><HiChartPie /></span> Inventory</li>
            {/* <li onClick={() => setActive("Users")} className="text-base pb-5 font-medium cursor-pointer hover:text-red-200 text-white flex items-center"><span className="text-xl pr-5"><RiSendPlane2Fill /></span> Users</li> */}
            <Link href={"/admin/Users"}><li className="text-base pb-5 font-medium cursor-pointer hover:text-red-200 text-white flex items-center"><span className="text-xl pr-5"><RiSendPlane2Fill /></span> Users</li></Link>
            <li onClick={() => setActive("Order")} className="text-base pb-5 font-medium cursor-pointer hover:text-red-200 text-white flex items-center"><span className="text-xl pr-5"><RiSendPlane2Fill /></span> Orders</li>
            <li onClick={() => setActive("ChangeNum")} className="text-base pb-5 font-medium cursor-pointer hover:text-red-200 text-white flex items-center"><span className="text-xl pr-5"><RiSendPlane2Fill /></span> Change Card No</li>
            <li onClick={() => setActive("WinnerSelect")} className="text-base pb-5 font-medium cursor-pointer hover:text-red-200 text-white flex items-center"><span className="text-xl pr-5"><RiSendPlane2Fill /></span> Winner Select</li>
            {/* <li onClick={() => setActive("Withdrawal")} className="text-base pb-5 font-medium cursor-pointer hover:text-red-200 text-white flex items-center"><span className="text-xl pr-5"><RiSendPlane2Fill /></span> Withdrawal Coins</li> */}
            <Link href={"/admin/Withdrawal"}><li className="text-base pb-5 font-medium cursor-pointer hover:text-red-200 text-white flex items-center"><span className="text-xl pr-5"><RiSendPlane2Fill /></span> Withdrawal Coins</li></Link>
            <Link href={"/admin/AddCoin"}><li className="text-base pb-5 font-medium cursor-pointer hover:text-red-200 text-white flex items-center"><span className="text-xl pr-5"><RiSendPlane2Fill /></span> Adding Coins</li></Link>
            <li onClick={() => setActive("Queryy")} className="text-base pb-5 font-medium cursor-pointer hover:text-red-200 text-white flex items-center"><span className="text-xl pr-5"><RiSendPlane2Fill /></span>Query</li>
          </ul>
          <ul className="flex flex-col mt-2">
            <Link href={'/'}><li className="text-base pb-4 cursor-pointer hover:text-red-200 text-white flex items-center"><button className="px-5 py-2 border broder-white w-full rounded-full hover:bg-red-900"><p>Logout</p></button></li></Link>
          </ul>
        </div>
        <div className=" bg-white w-5/6 text-sm text-gray-800 ml-5 border border-gray-200 rounded-sm py-3 px-2 shadow-sm overflow-scroll h-screen">
          {/* {active === "Users" && <Userss userss={userss} />} */}
          {active === "Order" && <Orderr orders={orders} />}
          {/* {active === "Withdrawal" && <Withdrawal withdrawals={withdrawals} />} */}
          {/* {active === "AddCoin" && <AddCoin addcoins={addcoins} />} */}
          {active === "ChangeNum" && <ChangeNum randomNum={randomNum} />}
          {active === "Queryy" && <QueryCo Querys={Querys} />}
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

  const orders = await Order.find();
  const withdrawals = await OrderrWi.find();
  const addcoins = await addCoin.find();
  const userss = await Usersss.find();
  const Querys = await Query.find();
  const winnOrder = await Order.find({
    winning: "Pending"
  });
  let randomNum = await RandomNSchema.findOne();
  return {
    props: { orders: JSON.parse(JSON.stringify(orders)), randomNum: JSON.parse(JSON.stringify(randomNum)), winnOrder: JSON.parse(JSON.stringify(winnOrder)), withdrawals: JSON.parse(JSON.stringify(withdrawals)), addcoins: JSON.parse(JSON.stringify(addcoins)), userss: JSON.parse(JSON.stringify(userss)), Querys: JSON.parse(JSON.stringify(Querys)) },
  };
}