import { React, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import Orderr from "../../modal/Order";
import mongoose from "mongoose";
import * as XLSX from "xlsx";
import { motion, AnimatePresence } from "framer-motion";
import { FileDown, ArrowLeft, Search, Filter } from "lucide-react";

const Order = ({ orders }) => {
  const [isHidden, setIsHidden] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(10);
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

    if (!myuser || !allowedEmails?.includes(myuser.email)) {
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

  // Filter orders based on search term
  const filteredOrders = orders.filter(order =>
    (typeof order.orderId === 'string' || typeof order.orderId === 'number') && order.orderId.toString().includes(searchTerm) ||
    (typeof order.name === 'string' && order.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (typeof order.email === 'string' && order.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (typeof order.phone === 'string' || typeof order.phone === 'number') && order.phone.toString().includes(searchTerm) ||
    (typeof order.cardno === 'string' || typeof order.cardno === 'number') && order.cardno.toString().includes(searchTerm)
  );


  // Get current orders for pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredOrders.length / ordersPerPage); i++) {
    pageNumbers.push(i);
  }

  const tableContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const tableRow = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-10">
      <Head>
        <title>Orders - Patti Circle Admin</title>
        <meta name="description" content="Orders management for Patti Circle" />
      </Head>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-6"
      >

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="bg-red-800 text-white text-center py-4 rounded-lg shadow-lg mb-6"
        >
          <h1 className="text-2xl md:text-3xl font-bold">Orders - Admin Panel</h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-white rounded-lg shadow-md p-6 mb-6"
        >
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <div className="relative w-full md:w-64 mb-4 md:mb-0">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownload}
              className="flex items-center bg-red-800 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
            >
              <FileDown size={18} className="mr-2" />
              <span>Download Excel</span>
            </motion.button>
          </div>

          <div className="overflow-x-auto">
            <motion.table
              variants={tableContainer}
              initial="hidden"
              animate="show"
              className="min-w-full divide-y divide-gray-200"
            >
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 tracking-wider">Order Id</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 tracking-wider">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 tracking-wider">Email</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 tracking-wider">Mobile</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 tracking-wider">Amount</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 tracking-wider">Card</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 tracking-wider">Date on Buy</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <AnimatePresence>
                  {currentOrders.length > 0 ? (
                    currentOrders.map((item) => (
                      <motion.tr
                        key={item._id}
                        variants={tableRow}
                        exit={{ opacity: 0, y: -10 }}
                        className="hover:bg-gray-50"
                      >
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">#{item.orderId}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{item.name}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{item.email}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{item.phone}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{item.amount}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{`C - ${item.cardno}`}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${item.winning === "Winning"
                              ? "bg-green-100 text-green-800"
                              : item.winning === "Pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}>
                            {item.winning}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{formatDate(item.createdAt)}</td>
                      </motion.tr>
                    ))
                  ) : (
                    <motion.tr
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <td colSpan="8" className="px-4 py-8 text-center text-gray-500">
                        No orders found matching your search.
                      </td>
                    </motion.tr>
                  )}
                </AnimatePresence>
              </tbody>
            </motion.table>
          </div>

          {/* Pagination */}
          {pageNumbers.length > 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex justify-center items-center space-x-1 mt-6"
            >
              <button
                onClick={() => paginate(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded-md ${currentPage === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
              >
                Prev
              </button>

              {pageNumbers.map(number => (
                <motion.button
                  key={number}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => paginate(number)}
                  className={`px-3 py-1 rounded-md ${currentPage === number
                      ? "bg-red-800 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                >
                  {number}
                </motion.button>
              ))}

              <button
                onClick={() => paginate(Math.min(pageNumbers.length, currentPage + 1))}
                disabled={currentPage === pageNumbers.length}
                className={`px-3 py-1 rounded-md ${currentPage === pageNumbers.length
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
              >
                Next
              </button>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  const orders = await Orderr.find({}).sort({ createdAt: -1 });
  return {
    props: { orders: JSON.parse(JSON.stringify(orders)) },
  };
}

export default Order;