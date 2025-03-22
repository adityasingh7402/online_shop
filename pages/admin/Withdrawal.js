import { React, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import withdrawal from "../../modal/Withdrawal";
import mongoose from "mongoose";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from "framer-motion";
import { X, Download, DollarSign, AlertTriangle, CheckCircle, Clock } from "lucide-react";

const Withdrawal = ({ withdrawals }) => {
  const [isHidden, setIsHidden] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredWithdrawals, setFilteredWithdrawals] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const myuser = JSON.parse(localStorage.getItem("myuser"));
    const allowedEmails = process.env.NEXT_PUBLIC_ALLOWED_EMAILS?.split(',');

    if (!myuser || !allowedEmails?.includes(myuser?.email)) {
      router.push('/');
    } else {
      setIsHidden(false);
    }
  }, [router]);

  useEffect(() => {
    setFilteredWithdrawals(withdrawals || []);
  }, [withdrawals]);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredWithdrawals(withdrawals || []);
      return;
    }
  
    const filtered = (withdrawals || []).filter(item =>
      (typeof item.orderId === 'string' || typeof item.orderId === 'number') && item.orderId.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      (typeof item.name === 'string' && item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (typeof item.email === 'string' && item.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (typeof item.phone === 'string' || typeof item.phone === 'number') && item.phone.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    setFilteredWithdrawals(filtered);
  }, [searchTerm, withdrawals]);
  

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
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
      console.error("Error updating withdrawal status:", error);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.05,
        duration: 0.3 
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100,
        damping: 15
      }
    }
  };

  if (isHidden) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <Clock className="text-red-600 w-12 h-12 mb-4" />
        <h2 className="text-2xl font-bold text-red-600">Access Restricted</h2>
        <p className="text-gray-600 mt-2">You need admin permissions to view this page.</p>
      </div>
    );
  }

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gray-50 pb-10"
    >
      <ToastContainer position="top-right" autoClose={3000} />
      
      <div className="sticky top-0 z-10 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <motion.div variants={itemVariants} className="flex items-center">
            <DollarSign className="h-8 w-8 text-red-600 mr-2" />
            <h1 className="text-2xl font-bold text-red-600">Withdrawal Management</h1>
          </motion.div>
          
          <div className="flex items-center space-x-4">
            <motion.div variants={itemVariants}>
              <Link href={'/admin'}>
                <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all">
                  <X className="h-6 w-6 text-red-600" />
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <motion.div variants={itemVariants} className="mb-6 bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="w-full md:w-1/2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by order ID, name, email, or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-3 pl-4 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                />
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={downloadCSV}
              className="flex items-center justify-center bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-all shadow-md"
            >
              <Download className="h-5 w-5 mr-2" />
              Download CSV
            </motion.button>
          </div>
          
          <div className="mt-4 bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">
                  Once you mark a withdrawal as paid, this action cannot be undone. Please verify all details before proceeding.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          variants={itemVariants}
          className="bg-white rounded-lg shadow-md overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-500 tracking-wider">Order ID</th>
                  <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-500 tracking-wider">User Details</th>
                  <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-500 tracking-wider">Amount</th>
                  <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-500 tracking-wider">Bank Details</th>
                  <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-500 tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-500 tracking-wider">Dates</th>
                  <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-500 tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredWithdrawals.length > 0 ? (
                  filteredWithdrawals.map((item) => (
                    <motion.tr 
                      key={item._id}
                      whileHover={{ backgroundColor: "#f9fafb" }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <td className="px-6 text-sm py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">#{item.orderId}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{item.name}</div>
                        <div className="text-sm text-gray-500">{item.email}</div>
                        <div className="text-sm text-gray-500">{item.phone}</div>
                      </td>
                      <td className="px-6 text-sm py-4 whitespace-nowrap">
                        <div className="text-sm font-bold text-gray-900">₹{item.amount}</div>
                      </td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          <span className="font-medium">Account:</span> {item.accno}
                        </div>
                        {item.bankName && (
                          <div className="text-sm text-gray-500">
                            <span className="font-medium">Bank:</span> {item.bankName}
                          </div>
                        )}
                        {item.ifsc && (
                          <div className="text-sm text-gray-500">
                            <span className="font-medium">IFSC:</span> {item.ifsc}
                          </div>
                        )}
                        {item.upino && (
                          <div className="text-sm text-gray-500">
                            <span className="font-medium">UPI:</span> {item.upino}
                          </div>
                        )}
                      </td>
                      <td className="px-6 text-sm py-4 whitespace-nowrap">
                        {item.status === "Pending" ? (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                            Pending
                          </span>
                        ) : (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Completed
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          <div><span className="font-medium">Created:</span> {formatDate(item.createdAt)}</div>
                          <div><span className="font-medium">Updated:</span> {formatDate(item.updatedAt)}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {item.status === "Pending" ? (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handlePaidButtonClick(item)}
                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Mark Paid
                          </motion.button>
                        ) : (
                          <span className="text-green-600 inline-flex items-center">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Completed
                          </span>
                        )}
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                      No withdrawal requests match your search criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export async function getServerSideProps(context) {
  try {
    if (!mongoose.connections[0].readyState) {
      await mongoose.connect(process.env.MONGO_URI);
    }
    const withdrawals = await withdrawal.find().sort({ createdAt: -1 });
    return {
      props: { withdrawals: JSON.parse(JSON.stringify(withdrawals)) },
    };
  } catch (error) {
    console.error("Database connection error:", error);
    return {
      props: { withdrawals: [] },
    };
  }
}

export default Withdrawal;