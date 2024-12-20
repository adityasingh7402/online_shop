import { React, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { AiOutlineClose } from "react-icons/ai";
import addCoin from "../../modal/Addcoin";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import mongoose from "mongoose";


const AddCoin = ({ addcoins }) => {
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
  if (isHidden) {
    return null;
  }
  const handlePaidButtonClick = async (item) => {
    const confirmation = window.confirm(
      `Are you sure you want to update the following details?\n\nOrder ID: ${item.orderId}\nAmount: ${item.amount}\nEmail: ${item.email}`
    );
  
    if (!confirmation) {
      return; // If the user cancels, exit the function
    }
  
    let data = { Orderid: item.orderId, Orderamount: item.amount, Orderemail: item.email };
  
    try {
      let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateAdd`, {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      let res = await a.json();
  
      if (res.success) {
        toast.success(res.success, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        router.reload();
      } else {
        toast.error(res.error, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        router.reload();
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.error("Error:", error);
    }
  };
  

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Link href={'/admin'}><div className="gotoHome right-10 top-10 fixed cursor-pointer text-red-900 p-2 bg-white font-bold text-4xl"><AiOutlineClose /></div></Link>
      <div className="containerr p-10 overflow-hidden">
        <div className="shop-title w-max shadow-md shopCat text-center px-8 py-3 m-auto background text-white text-3xl rounded-sm">
          Adding Coins - Admin Panel
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
        <div className="tables p-5 w-full min-h-screen containerr">
          <table className="mx-auto bg-white p-5">
            <thead>
              <tr>
                <th className='text-left border p-2 border-slate-600'><div className="Date text-sm font-medium">Order Id</div></th>
                <th className='text-left border p-2 border-slate-600'><div className="Refrence text-sm font-medium">Name</div></th>
                <th className='text-left border p-2 border-slate-600'><div className="card text-sm font-medium">Email</div></th>
                <th className='text-left border p-2 border-slate-600'><div className="Coin text-sm font-medium">Mobile</div></th>
                <th className='text-left border p-2 border-slate-600'><div className="Amount text-sm font-medium">Amount</div></th>
                <th className='text-left border p-2 border-slate-600'><div className="ifsc text-sm font-medium">Transaction ID</div></th>
                {/* <th className='text-left border p-2 border-slate-600'><div className="bankName text-sm font-medium">Payment Info</div></th>
                <th className='text-left border p-2 border-slate-600'><div className="bankName text-sm font-medium">Pay Trans ID</div></th> */}
                <th className='text-left border p-2 border-slate-600'><div className="Win text-sm font-medium">Status</div></th>
                <th className='text-left border p-2 border-slate-600'><div className="Loss text-sm font-medium">Date on Buy</div></th>
                <th className='text-left border p-2 border-slate-600'><div className="Loss text-sm font-medium">Paid</div></th>
              </tr>
            </thead>
            <tbody>
              {addcoins.map((item) => {
                return <tr key={item._id}>
                  <td className='text-left border p-2 border-slate-600'><div className="Refrence text-xs">#{item.orderId}</div></td>
                  <td className='text-left border p-2 border-slate-600'><div className="Refrence text-xs">{item.name}</div></td>
                  <td className='text-left border p-2 border-slate-600'><div className="Refrence text-xs">{item.email}</div></td>
                  <td className='text-left border p-2 border-slate-600'><div className="Refrence text-xs
            ">{item.phone}</div></td>
                  <td className='text-left border p-2 border-slate-600'><div className="Refrence text-xs">{item.amount}</div></td>
                  <td className='text-left border p-2 border-slate-600'><div className="Refrence text-xs">{item.transId}</div></td>
                  {/* <td className='text-left border p-2 border-slate-600'><div className="Refrence text-xs">{item.paymentInfo}</div></td>
                  <td className='text-left border p-2 border-slate-600'><div className="Refrence text-xs">{item.transactionId}</div></td> */}
                  <td className='text-left border p-2 border-slate-600'><div className="Refrence text-xs">{item.status}</div></td>
                  <td className='text-left border p-2 border-slate-600'><div className="Refrence text-xs">{item.createdAt}</div></td>
                  <td className='text-left border p-2 border-slate-600'>{item.status == "Initiated" && <button onClick={() => handlePaidButtonClick(item)} className='rounded-full bg-red-700 text-sm px-4 py-1 hover:bg-white text-white hover:text-gray-800 border transition-all border-red-700'><p>Paid</p></button>}</td>
                </tr>
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  const addcoins = await addCoin.find();
  return {
    props: { addcoins: JSON.parse(JSON.stringify(addcoins)) },
  };
}

export default AddCoin;
