import { React, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import withdrawal from "../../modal/Withdrawal";
import mongoose from "mongoose";


const Withdrawal = ({ withdrawals }) => {
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
  if (isHidden) {
    return null;
  }

  return (
    <>
      <div className="shop-title w-max shadow-md shopCat text-center px-8 py-3 m-auto background text-white text-3xl rounded-sm">
        Orders - Admin Panel
      </div>
      {/* <div className="box p-5">
        {orders.map((item) => {
          return (<div key={item._id} className="userOrderss border-2 border-gray-200 mt-2 w-full flex flex-col overflow-x-scroll p-5">
            <p className="font-medium">Order Id : <span className="font-normal">{item.orderId}</span></p>
            <p className="font-medium">Name : <span className="font-normal">{item.name}</span></p>
            <p className="font-medium">Email : <span className="font-normal">{item.email}</span></p>
            <p className="font-medium">Mobile : <span className="font-normal">{item.phone}</span></p>
            <p className="font-medium">Amount : <span className="font-normal">{item.amount}</span></p>
            <p className="font-medium">Card : <span className="font-normal">{` Card No - ${item.cardno} , Random No ${item.randomNum}`}</span></p>
            <p className="font-medium">Status : <span className="font-normal">{item.winning}</span></p>
            <p className="font-medium">Date on Buy : <span className="font-normal">{item.createdAt}</span></p>
          </div>)
        })}
      </div> */}
      <div className="tables p-5 w-full overflow-y-scroll">
      <table className="mx-auto">
        <tr>
          <th className='text-left border p-3 border-slate-600'><div className="Date text-lg font-medium">Order Id</div></th>
          <th className='text-left border p-3 border-slate-600'><div className="Refrence text-lg font-medium">Name</div></th>
          <th className='text-left border p-3 border-slate-600'><div className="card text-lg font-medium">Email</div></th>
          <th className='text-left border p-3 border-slate-600'><div className="Coin text-lg font-medium">Mobile</div></th>
          <th className='text-left border p-3 border-slate-600'><div className="Amount text-lg font-medium">Amount</div></th>
          <th className='text-left border p-3 border-slate-600'><div className="ifsc text-lg font-medium">IFSC</div></th>
          <th className='text-left border p-3 border-slate-600'><div className="bankName text-lg font-medium">B Name</div></th>
          <th className='text-left border p-3 border-slate-600'><div className="bankName text-lg font-medium">B Branch</div></th>
          <th className='text-left border p-3 border-slate-600'><div className="bankName text-lg font-medium">Acc No</div></th>
          <th className='text-left border p-3 border-slate-600'><div className="bankName text-lg font-medium">UPI</div></th>
          <th className='text-left border p-3 border-slate-600'><div className="Win text-lg font-medium">Status</div></th>
          <th className='text-left border p-3 border-slate-600'><div className="Loss text-lg font-medium">Date on Buy</div></th>
        </tr>
        {withdrawals.map((item) => {
          return <tr key={item._id}>
            <td className='text-left border p-3 border-slate-600'><div className="Refrence">#{item.orderId}</div></td>
            <td className='text-left border p-3 border-slate-600'><div className="Refrence">{item.name}</div></td>
            <td className='text-left border p-3 border-slate-600'><div className="Refrence">{item.email}</div></td>
            <td className='text-left border p-3 border-slate-600'><div className="Refrence">{item.phone}</div></td>
            <td className='text-left border p-3 border-slate-600'><div className="Refrence">{item.amount}</div></td>
            <td className='text-left border p-3 border-slate-600'><div className="Refrence">{item.ifsc}</div></td>
            <td className='text-left border p-3 border-slate-600'><div className="Refrence">{item.bankName}</div></td>
            <td className='text-left border p-3 border-slate-600'><div className="Refrence">{item.bankBranch}</div></td>
            <td className='text-left border p-3 border-slate-600'><div className="Refrence">{item.accno}</div></td>
            <td className='text-left border p-3 border-slate-600'><div className="Refrence">{item.upino}</div></td>
            <td className='text-left border p-3 border-slate-600'><div className="Refrence">{item.status}</div></td>
            <td className='text-left border p-3 border-slate-600'><div className="Refrence">{item.createdAt}</div></td>
          </tr>
        })}
      </table>
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  const withdrawals = await withdrawal.find();
  return {
    props: { withdrawals: JSON.parse(JSON.stringify(withdrawals)) },
  };
}

export default Withdrawal;