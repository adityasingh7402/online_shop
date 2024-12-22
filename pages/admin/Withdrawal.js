import { React, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import withdrawal from "../../modal/Withdrawal";
import mongoose from "mongoose";
import { AiOutlineClose } from "react-icons/ai";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Withdrawal = ({ withdrawals }) => {
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

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(new Date(date));
  };

  const downloadCSV = () => {
    const headers = ["Order Id", "Name", "Email", "Mobile", "Amount", "IFSC", "Bank Name", "Bank Branch", "Account No", "UPI", "Status", "Created At", "Updated At"];
    const rows = withdrawals.map(item => [
      item.orderId,
      item.name,
      item.email,
      item.phone,
      item.amount,
      item.ifsc,
      item.bankName,
      item.bankBranch,
      item.accno,
      item.upino,
      item.status,
      formatDate(item.createdAt),
      formatDate(item.updatedAt),
    ]);
    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "withdrawals.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePaidButtonClick = async (item) => {
    const confirmation = window.confirm(
      `Are you sure you want to update the order with ID: ${item.orderId}?`
    );

    if (!confirmation) return;

    try {
      let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updatewith`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Orderid: item.orderId }),
      });
      const data = await res.json();

      if (data.success) {
        toast.success(data.success, { position: "top-center" });
        router.reload();
      } else {
        toast.error(data.error, { position: "top-center" });
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.", { position: "top-center" });
    }
  };

  if (isHidden) return null;

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Link href={'/admin'}>
        <div className="gotoHome fixed right-10 top-10 cursor-pointer text-red-900 p-2 bg-white font-bold text-4xl">
          <AiOutlineClose />
        </div>
      </Link>
      <div className="containerr p-10 h-full">
        <div className="containerr p-10 h-full">
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
        </div>
        <div className="tables p-5 w-full min-h-screen containerr">
          <table className="bg-white p-5 mx-auto">
            <thead>
              <tr>
                <th className='text-left border p-2 text-sm border-slate-600'>Order Id</th>
                <th className='text-left border p-2 text-sm border-slate-600'>Name</th>
                <th className='text-left border p-2 text-sm border-slate-600'>Email</th>
                <th className='text-left border p-2 text-sm border-slate-600'>Mobile</th>
                <th className='text-left border p-2 text-sm border-slate-600'>Amount</th>
                <th className='text-left border p-2 text-sm border-slate-600'>IFSC</th>
                <th className='text-left border p-2 text-sm border-slate-600'>Bank Name</th>
                <th className='text-left border p-2 text-sm border-slate-600'>Bank Branch</th>
                <th className='text-left border p-2 text-sm border-slate-600'>Account No</th>
                <th className='text-left border p-2 text-sm border-slate-600'>UPI</th>
                <th className='text-left border p-2 text-sm border-slate-600'>Status</th>
                <th className='text-left border p-2 text-sm border-slate-600'>Created At</th>
                <th className='text-left border p-2 text-sm border-slate-600'>Updated At</th>
                <th className='text-left border p-2 text-sm border-slate-600'>Paid</th>
              </tr>
            </thead>
            <tbody>
              {withdrawals.map((item) => (
                <tr key={item._id}>
                  <td className='text-left border p-2 text-sm border-slate-600'>#{item.orderId}</td>
                  <td className='text-left border p-2 text-sm border-slate-600'>{item.name}</td>
                  <td className='text-left border p-2 text-sm border-slate-600'>{item.email}</td>
                  <td className='text-left border p-2 text-sm border-slate-600'>{item.phone}</td>
                  <td className='text-left border p-2 text-sm border-slate-600'>{item.amount}</td>
                  <td className='text-left border p-2 text-sm border-slate-600'>{item.ifsc}</td>
                  <td className='text-left border p-2 text-sm border-slate-600'>{item.bankName}</td>
                  <td className='text-left border p-2 text-sm border-slate-600'>{item.bankBranch}</td>
                  <td className='text-left border p-2 text-sm border-slate-600'>{item.accno}</td>
                  <td className='text-left border p-2 text-sm border-slate-600'>{item.upino}</td>
                  <td className='text-left border p-2 text-sm border-slate-600'>{item.status}</td>
                  <td className='text-left border p-2 text-sm border-slate-600'>{formatDate(item.createdAt)}</td>
                  <td className='text-left border p-2 text-sm border-slate-600'>{formatDate(item.updatedAt)}</td>
                  <td className='text-left border p-2 text-sm border-slate-600'>
                    {item.status === "Pending" &&
                      <button
                        onClick={() => handlePaidButtonClick(item)}
                        className='rounded-full bg-red-700 px-4 py-1 text-white hover:bg-white hover:text-gray-800 border transition-all'>
                        Paid
                      </button>
                    }
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
  const withdrawals = await withdrawal.find();
  return {
    props: { withdrawals: JSON.parse(JSON.stringify(withdrawals)) },
  };
}

export default Withdrawal;
