import { React, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Userss from "../../modal/User";
import mongoose from "mongoose";
import Link from "next/link";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineClose } from "react-icons/ai";


const Users = ({ userss }) => {
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
    let data = { email: item.email }
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/removeuser`, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    let res = await a.json()
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
  }

  return (
    <>
      <Link href={'/admin'}><div className="gotoHome right-10 top-10 fixed cursor-pointer text-red-900 p-2 bg-white font-bold text-4xl"><AiOutlineClose /></div></Link>
      <div className="containerr p-10 h-full">
        <div className="shop-title w-max shadow-md shopCat text-center px-8 py-3 m-auto background text-white text-3xl rounded-sm">
          Users - Admin Panel
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
        <div className="tables p-5 w-full containerr min-h-screen">
          <table className="mx-auto bg-white p-10">
            <thead>
              <tr>
                <th className='text-left border p-2 border-slate-600'><div className="Refrence text-base font-medium">Name</div></th>
                <th className='text-left border p-2 border-slate-600'><div className="card text-base font-medium">Email</div></th>
                <th className='text-left border p-2 border-slate-600'><div className="Coin text-base font-medium">Mobile</div></th>
                <th className='text-left border p-2 border-slate-600'><div className="Amount text-base font-medium">Wallet</div></th>
                <th className='text-left border p-2 border-slate-600'><div className="ifsc text-base font-medium">IFSC</div></th>
                <th className='text-left border p-2 border-slate-600'><div className="bankName text-base font-medium">B Name</div></th>
                <th className='text-left border p-2 border-slate-600'><div className="bankName text-base font-medium">B Branch</div></th>
                <th className='text-left border p-2 border-slate-600'><div className="bankName text-base font-medium">Acc No</div></th>
                <th className='text-left border p-2 border-slate-600'><div className="bankName text-base font-medium">UPI</div></th>
                <th className='text-left border p-2 border-slate-600'><div className="Win text-base font-medium">Age</div></th>
                <th className='text-left border p-2 border-slate-600'><div className="Loss text-base font-medium">Date on Create</div></th>
                <th className='text-left border p-2 border-slate-600'><div className="Loss text-sm font-medium">Remove</div></th>
              </tr>
            </thead>
            <tbody>
              {userss.map((item) => {
                return <tr key={item._id}>
                  <td className='text-left border p-2 border-slate-600'><div className="Refrence">{item.name}</div></td>
                  <td className='text-left border p-2 border-slate-600'><div className="Refrence">{item.email}</div></td>
                  <td className='text-left border p-2 border-slate-600'><div className="Refrence">{item.phone}</div></td>
                  <td className='text-left border p-2 border-slate-600'><div className="Refrence">{item.wallet}</div></td>
                  <td className='text-left border p-2 border-slate-600'><div className="Refrence">{item.ifsc}</div></td>
                  <td className='text-left border p-2 border-slate-600'><div className="Refrence">{item.bankName}</div></td>
                  <td className='text-left border p-2 border-slate-600'><div className="Refrence">{item.branch}</div></td>
                  <td className='text-left border p-2 border-slate-600'><div className="Refrence">{item.accno}</div></td>
                  <td className='text-left border p-2 border-slate-600'><div className="Refrence">{item.UPINo}</div></td>
                  <td className='text-left border p-2 border-slate-600'><div className="Refrence">{item.ageVerified && <p>True</p>}</div></td>
                  <td className='text-left border p-2 border-slate-600'><div className="Refrence">{item.createdAt}</div></td>
                  <td className='text-left border p-2 border-slate-600'>{item.email && <button onClick={() => handlePaidButtonClick(item)} className='rounded-full bg-red-700 text-sm px-4 py-1 hover:bg-white text-white hover:text-gray-800 border transition-all border-red-700'><p>Del</p></button>}</td>
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
  const userss = await Userss.find();
  return {
    props: { userss: JSON.parse(JSON.stringify(userss)) },
  };
}

export default Users;
