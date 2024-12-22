import { React, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { AiOutlineClose } from "react-icons/ai";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import mongoose from "mongoose";
import addCoin from "../../modal/Addcoin";
import * as XLSX from "xlsx";

const AddCoin = ({ addcoins }) => {
  const [isHidden, setIsHidden] = useState(true);
  const router = useRouter();

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
      return;
    }

    const data = { Orderid: item.orderId, Orderamount: item.amount, Orderemail: item.email };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateAdd`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const res = await response.json();

      if (res.success) {
        toast.success(res.success, { position: "top-center", autoClose: 2000 });
        router.reload();
      } else {
        toast.error(res.error, { position: "top-center", autoClose: 2000 });
        router.reload();
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.", { position: "top-center", autoClose: 2000 });
      console.error("Error:", error);
    }
  };

  const downloadCSV = () => {
    const formattedData = addcoins.map((item) => ({
      "Order ID": item.orderId,
      Name: item.name,
      Email: item.email,
      Mobile: item.phone,
      Amount: item.amount,
      "Transaction ID": item.transId,
      Status: item.status,
      "Date on Buy": new Date(item.createdAt).toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }),
      "Update Date": new Date(item.updatedAt).toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }),
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "AddCoins");
    XLSX.writeFile(workbook, "AddCoins.xlsx");
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Link href={'/admin'}>
        <div className="gotoHome right-10 top-10 fixed cursor-pointer text-red-900 p-2 bg-white font-bold text-4xl">
          <AiOutlineClose />
        </div>
      </Link>
      <div className="containerr p-10 overflow-hidden">
        <div className="shop-title w-max shadow-md shopCat text-center px-8 py-3 m-auto background text-white text-3xl rounded-sm">
          Withdrawal Coins - Admin Panel
        </div>
        <div className="download-button flex justify-end w-full">
            <button
              onClick={downloadCSV}
              className="rounded-full bg-blue-700 px-6 py-2 text-white hover:bg-blue-500 transition-all">
              Download CSV
            </button>
          </div>
        <div className="tables p-5 w-full min-h-screen containerr">
          <table className="mx-auto bg-white p-5">
            <thead>
              <tr>
                <th className="text-left border p-2 border-slate-600">Order ID</th>
                <th className="text-left border p-2 border-slate-600">Name</th>
                <th className="text-left border p-2 border-slate-600">Email</th>
                <th className="text-left border p-2 border-slate-600">Mobile</th>
                <th className="text-left border p-2 border-slate-600">Amount</th>
                <th className="text-left border p-2 border-slate-600">Transaction ID</th>
                <th className="text-left border p-2 border-slate-600">Status</th>
                <th className="text-left border p-2 border-slate-600">Date on Buy</th>
                <th className="text-left border p-2 border-slate-600">Update Date</th>
                <th className="text-left border p-2 border-slate-600">Paid</th>
              </tr>
            </thead>
            <tbody>
              {addcoins.map((item) => (
                <tr key={item._id}>
                  <td className="text-left border p-2 border-slate-600">{item.orderId}</td>
                  <td className="text-left border p-2 border-slate-600">{item.name}</td>
                  <td className="text-left border p-2 border-slate-600">{item.email}</td>
                  <td className="text-left border p-2 border-slate-600">{item.phone}</td>
                  <td className="text-left border p-2 border-slate-600">{item.amount}</td>
                  <td className="text-left border p-2 border-slate-600">{item.transId}</td>
                  <td className="text-left border p-2 border-slate-600">{item.status}</td>
                  <td className="text-left border p-2 border-slate-600">
                    {new Date(item.createdAt).toLocaleString('en-GB', {
                      day: '2-digit',
                      month: '2-digit',
                      year: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </td>
                  <td className="text-left border p-2 border-slate-600">
                    {new Date(item.updatedAt).toLocaleString('en-GB', {
                      day: '2-digit',
                      month: '2-digit',
                      year: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </td>
                  <td className="text-left border p-2 border-slate-600">
                    {item.status === "Initiated" && (
                      <button
                        onClick={() => handlePaidButtonClick(item)}
                        className="rounded-full bg-red-700 text-sm px-4 py-1 hover:bg-white text-white hover:text-gray-800 border transition-all border-red-700"
                      >
                        Paid
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
  const addcoins = await addCoin.find();
  return {
    props: { addcoins: JSON.parse(JSON.stringify(addcoins)) },
  };
}

export default AddCoin;
