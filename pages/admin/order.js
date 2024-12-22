import { React, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import Orderr from "../../modal/Order";
import mongoose from "mongoose";
import * as XLSX from "xlsx";

const Order = ({ orders }) => {
  const [isHidden, setIsHidden] = useState(true);
  const router = useRouter();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Intl.DateTimeFormat("en-GB", options).format(date);
  };

  useEffect(() => {
    const myuser = JSON.parse(localStorage.getItem("myuser"));

    const allowedEmails = process.env.NEXT_PUBLIC_ALLOWED_EMAILS?.split(",");

    if (!myuser || !allowedEmails.includes(myuser.email)) {
      router.push("/");
    } else {
      setIsHidden(false);
    }
  }, []);

  if (isHidden) {
    return null;
  }

  const handleDownload = () => {
    const data = orders.map((order) => ({
      "Order Id": order.orderId,
      Name: order.name,
      Email: order.email,
      Mobile: order.phone,
      Amount: order.amount,
      Card: `C - ${order.cardno}`,
      Status: order.winning,
      "Date on Buy": formatDate(order.createdAt),
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");
    XLSX.writeFile(workbook, "OrdersData.xlsx");
  };

  return (
    <>
      <div className="shop-title w-max shadow-md shopCat text-center px-8 py-3 m-auto background text-white text-3xl rounded-sm">
        Orders - Admin Panel
      </div>
      <div className="flex justify-end p-5">
        <button
          onClick={handleDownload}
          className="rounded bg-blue-500 text-white px-4 py-2 hover:bg-blue-600"
        >
          Download Excel
        </button>
      </div>
      <div className="tables p-5 w-full">
        <table className="mx-auto">
          <thead>
            <tr>
              <th className="text-left border p-3 border-slate-600">Order Id</th>
              <th className="text-left border p-3 border-slate-600">Name</th>
              <th className="text-left border p-3 border-slate-600">Email</th>
              <th className="text-left border p-3 border-slate-600">Mobile</th>
              <th className="text-left border p-3 border-slate-600">Amount</th>
              <th className="text-left border p-3 border-slate-600">Card</th>
              <th className="text-left border p-3 border-slate-600">Status</th>
              <th className="text-left border p-3 border-slate-600">Date on Buy</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((item) => (
              <tr key={item._id}>
                <td className="text-left border p-3 border-slate-600">#{item.orderId}</td>
                <td className="text-left border p-3 border-slate-600">{item.name}</td>
                <td className="text-left border p-3 border-slate-600">{item.email}</td>
                <td className="text-left border p-3 border-slate-600">{item.phone}</td>
                <td className="text-left border p-3 border-slate-600">{item.amount}</td>
                <td className="text-left border p-3 border-slate-600">{`C - ${item.cardno}`}</td>
                <td className="text-left border p-3 border-slate-600">{item.winning}</td>
                <td className="text-left border p-3 border-slate-600">
                  {formatDate(item.createdAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  const orders = await Orderr.find({});
  return {
    props: { orders: JSON.parse(JSON.stringify(orders)) },
  };
}

export default Order;
