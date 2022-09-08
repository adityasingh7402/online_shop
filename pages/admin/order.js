import { React, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import Order from "../../modal/Order";
import mongoose from "mongoose";

const order = ({ orders }) => {
  return (
    <>
      <div className="shop-title w-max shadow-md shopCat text-center px-8 py-3 m-auto background text-white text-3xl rounded-sm">
        Orders - Admin Panel
      </div>
      <div className="box p-5">
        {orders.map((item) => {
          return (<div key={item._id} className="userOrderss border-2 border-gray-200 mt-2 w-full flex flex-col overflow-x-scroll p-5">
            <p className="font-medium">Order Id : <span className="font-normal">{item.orderId}</span></p>
            <p className="font-medium">Name : <span className="font-normal">{item.name}</span></p>
            <p className="font-medium">Email : <span className="font-normal">{item.email}</span></p>
            <p className="font-medium">Mobile : <span className="font-normal">{item.phone}</span></p>
            <p className="font-medium">Address : <span className="font-normal">{item.address}</span></p>
            <p className="font-medium">Pincode : <span className="font-normal">{item.pincode}</span></p>
            <p className="font-medium">State : <span className="font-normal">{item.state} {item.city}</span></p>
            <p className="font-medium">Amount : <span className="font-normal">{item.amount}</span></p>
            {Object.keys(item.products).map((key) => {
              return <p key={key} className="font-medium">Product : <span className="font-normal">{`${item.products[key].name} - ${item.products[key].qty} - ${item.products[key].price}`}</span></p>
            })}
            <p className="font-medium">Payment Info : <span className="font-normal">{item.paymentInfo}</span></p>
            <p className="font-medium">Transaction Id : <span className="font-normal">{item.transactionId}</span></p>
            <p className="font-medium">Status : <span className="font-normal">{item.status}</span></p>
            <p className="font-medium">Date on Buy : <span className="font-normal">{item.createdAt}</span></p>
          </div>)
        })}
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let orders = await Order.find();
  return {
    props: { orders: JSON.parse(JSON.stringify(orders)) },
  };
}

export default order;
