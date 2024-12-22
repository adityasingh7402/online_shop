import { React, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Userss from "../../modal/User";
import mongoose from "mongoose";
import Link from "next/link";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineClose } from "react-icons/ai";
import * as XLSX from "xlsx";

const Users = ({ userss }) => {
  const [isHidden, setIsHidden] = useState(true);
  const router = useRouter();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Intl.DateTimeFormat('en-GB', options).format(date);
  };

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
      `Are you sure you want to delete the user with email: ${item.email}?`
    );

    if (!confirmation) {
      return;
    }

    let data = { email: item.email };

    try {
      let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/removeuser`, {
        method: 'POST',
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

  const handleDownload = () => {
    const data = userss.map(user => ({
      Name: user.name,
      Email: user.email,
      Mobile: user.phone,
      Wallet: user.wallet,
      IFSC: user.ifsc,
      "Bank Name": user.bankName,
      "Bank Branch": user.branch,
      "Account No": user.accno,
      UPI: user.UPINo,
      Age: user.ageVerified ? "True" : "False",
      "Date Created": formatDate(user.createdAt),
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
    XLSX.writeFile(workbook, "UsersData.xlsx");
  };

  return (
    <>
      <Link href={'/admin'}>
        <div className="gotoHome right-10 top-10 fixed cursor-pointer text-red-900 p-2 bg-white font-bold text-4xl">
          <AiOutlineClose />
        </div>
      </Link>
      <div className="containerr p-10 h-full">
        <div className="shop-title w-max shadow-md shopCat text-center px-8 py-3 m-auto background text-white text-3xl rounded-sm">
          Users - Admin Panel
        </div>
        <div className="flex justify-end p-5">
          <button
            onClick={handleDownload}
            className="rounded bg-blue-500 text-white px-4 py-2 hover:bg-blue-600"
          >
            Download Excel
          </button>
        </div>
        <div className="tables p-5 w-full containerr min-h-screen">
          <table className="mx-auto bg-white p-10">
            <thead>
              <tr>
                <th className='text-left border p-2 border-slate-600'>Name</th>
                <th className='text-left border p-2 border-slate-600'>Email</th>
                <th className='text-left border p-2 border-slate-600'>Mobile</th>
                <th className='text-left border p-2 border-slate-600'>Wallet</th>
                <th className='text-left border p-2 border-slate-600'>IFSC</th>
                <th className='text-left border p-2 border-slate-600'>B Name</th>
                <th className='text-left border p-2 border-slate-600'>B Branch</th>
                <th className='text-left border p-2 border-slate-600'>Acc No</th>
                <th className='text-left border p-2 border-slate-600'>UPI</th>
                <th className='text-left border p-2 border-slate-600'>Age</th>
                <th className='text-left border p-2 border-slate-600'>Date on Create</th>
                <th className='text-left border p-2 border-slate-600'>Remove</th>
              </tr>
            </thead>
            <tbody>
              {userss.map((item) => (
                <tr key={item._id}>
                  <td className='text-left border p-2 border-slate-600'>{item.name}</td>
                  <td className='text-left border p-2 border-slate-600'>{item.email}</td>
                  <td className='text-left border p-2 border-slate-600'>{item.phone}</td>
                  <td className='text-left border p-2 border-slate-600'>{item.wallet}</td>
                  <td className='text-left border p-2 border-slate-600'>{item.ifsc}</td>
                  <td className='text-left border p-2 border-slate-600'>{item.bankName}</td>
                  <td className='text-left border p-2 border-slate-600'>{item.branch}</td>
                  <td className='text-left border p-2 border-slate-600'>{item.accno}</td>
                  <td className='text-left border p-2 border-slate-600'>{item.UPINo}</td>
                  <td className='text-left border p-2 border-slate-600'>{item.ageVerified && "True"}</td>
                  <td className='text-left border p-2 border-slate-600'>{formatDate(item.createdAt)}</td>
                  <td className='text-left border p-2 border-slate-600'>
                    {item.email && (
                      <button
                        onClick={() => handlePaidButtonClick(item)}
                        className='rounded-full bg-red-700 text-sm px-4 py-1 hover:bg-white text-white hover:text-gray-800 border transition-all border-red-700'
                      >
                        Del
                      </button>
                    )}
                  </td>
                </tr>
              ))}
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
