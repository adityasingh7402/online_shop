import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import mongoose from "mongoose";
import addCoin from "../../modal/Addcoin";
import * as XLSX from "xlsx";
import { motion } from "framer-motion";
import { X, Download, Check, AlertTriangle, FileDown } from "lucide-react";

const AddCoin = ({ addcoins }) => {
  const [isHidden, setIsHidden] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCoins, setFilteredCoins] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const myuser = JSON.parse(localStorage.getItem("myuser"));
    const allowedEmails = process.env.NEXT_PUBLIC_ALLOWED_EMAILS?.split(',');

    if (!myuser || !allowedEmails.includes(myuser.email)) {
      router.push('/');
    } else {
      setIsHidden(false);
    }
    
    setFilteredCoins(addcoins);
  }, [addcoins, router]);

  useEffect(() => {
    if (addcoins) {
      setFilteredCoins(
        addcoins.filter((item) => {
          return (
            (typeof item.name === 'string' && item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (typeof item.email === 'string' && item.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (typeof item.orderId === 'string' && item.orderId.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (typeof item.transId === 'string' && item.transId.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (typeof item.phone === 'string' && item.phone.includes(searchTerm))
          );
        })
      );
    }
  }, [searchTerm, addcoins]);

  if (isHidden || !mounted) {
    return null;
  }

  const handlePaidButtonClick = async (item) => {
    const confirmation = window.confirm(
      `Are you sure you want to update the following details?\n\nOrder ID: ${item.orderId}\nAmount: ${item.amount}\nEmail: ${item.email}`
    );

    if (!confirmation) {
      return;
    }

    setIsProcessing(true);
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
        setTimeout(() => {
          router.reload();
        }, 2000);
      } else {
        toast.error(res.error, { position: "top-center", autoClose: 2000 });
        setIsProcessing(false);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.", { position: "top-center", autoClose: 2000 });
      console.error("Error:", error);
      setIsProcessing(false);
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
    
    toast.success("File downloaded successfully!", { position: "top-center", autoClose: 2000 });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  const tableRowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({ 
      opacity: 1, 
      x: 0,
      transition: { 
        delay: i * 0.05,
        duration: 0.3 
      }
    })
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: { 
      scale: 1.05, 
      boxShadow: "0px 5px 10px rgba(220, 38, 38, 0.2)",
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.95 }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      
      <motion.div 
        className="fixed top-6 right-6 z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Link href={'/admin'}>
          <motion.div 
            className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg cursor-pointer text-red-700 hover:bg-red-50 transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X size={24} />
          </motion.div>
        </Link>
      </motion.div>
      
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div 
          className="text-center mb-8"
          variants={itemVariants}
        >
          <motion.h1 
            className="text-3xl font-bold text-red-700 bg-white inline-block px-8 py-3 rounded-lg shadow-md"
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
          >
            Add Coins - Admin Panel
          </motion.h1>
        </motion.div>
        
        <motion.div 
          className="mb-6 flex flex-col md:flex-row justify-between items-center gap-4"
          variants={itemVariants}
        >
          <motion.div 
            className="relative w-full md:w-64"
            variants={itemVariants}
          >
            <input
              type="text"
              placeholder="Search by name, email, ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </motion.div>
          
          <motion.button
            onClick={downloadCSV}
            className="flex items-center gap-2 bg-red-700 text-white px-6 py-2 rounded-md shadow-sm hover:bg-red-800 transition-all"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <FileDown size={18} />
            <span>Download Excel</span>
          </motion.button>
        </motion.div>
        
        <motion.div 
          className="bg-white rounded-lg shadow-xl overflow-hidden"
          variants={itemVariants}
        >
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-red-700 text-white">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium tracking-wider">Order ID</th>
                  <th className="px-4 py-3 text-left text-sm font-medium tracking-wider">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-medium tracking-wider">Email</th>
                  <th className="px-4 py-3 text-left text-sm font-medium tracking-wider">Mobile</th>
                  <th className="px-4 py-3 text-left text-sm font-medium tracking-wider">Amount</th>
                  <th className="px-4 py-3 text-left text-sm font-medium tracking-wider">Transaction ID</th>
                  <th className="px-4 py-3 text-left text-sm font-medium tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-medium tracking-wider">Date on Buy</th>
                  <th className="px-4 py-3 text-left text-sm font-medium tracking-wider">Update Date</th>
                  <th className="px-4 py-3 text-left text-sm font-medium tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCoins.length > 0 ? (
                  filteredCoins.map((item, index) => (
                    <motion.tr 
                      key={item._id}
                      custom={index}
                      variants={tableRowVariants}
                      initial="hidden"
                      animate="visible"
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                      whileHover={{ backgroundColor: "rgba(254, 226, 226, 0.5)" }}
                    >
                      <td className="px-4 py-3 text-sm text-gray-900">{item.orderId}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{item.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{item.email}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{item.phone}</td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">₹{item.amount}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{item.transId}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          item.status === "Initiated" 
                            ? "bg-yellow-100 text-yellow-800" 
                            : "bg-green-100 text-green-800"
                        }`}>
                          {item.status === "Initiated" ? (
                            <><AlertTriangle size={12} className="mr-1" /> {item.status}</>
                          ) : (
                            <><Check size={12} className="mr-1" /> {item.status}</>
                          )}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {new Date(item.createdAt).toLocaleString('en-GB', {
                          day: '2-digit',
                          month: '2-digit',
                          year: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {new Date(item.updatedAt).toLocaleString('en-GB', {
                          day: '2-digit',
                          month: '2-digit',
                          year: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {item.status === "Initiated" && (
                          <motion.button
                            onClick={() => handlePaidButtonClick(item)}
                            className={`inline-flex items-center px-3 py-1 border border-red-700 text-sm font-medium rounded-md 
                              ${isProcessing ? 'bg-gray-300 text-gray-600' : 'bg-red-700 text-white hover:bg-white hover:text-red-700'} 
                              transition-colors duration-200`}
                            variants={buttonVariants}
                            whileHover={!isProcessing && "hover"}
                            whileTap={!isProcessing && "tap"}
                            disabled={isProcessing}
                          >
                            <Check size={16} className="mr-1" />
                            {isProcessing ? "Processing..." : "Mark Paid"}
                          </motion.button>
                        )}
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="10" className="px-4 py-8 text-center text-gray-500">
                      No records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
        
        <motion.div 
          className="mt-6 text-center text-sm text-gray-500"
          variants={itemVariants}
        >
          Showing {filteredCoins.length} of {addcoins.length} records
        </motion.div>
      </motion.div>
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