import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Userss from "../../modal/User";
import mongoose from "mongoose";
import Link from "next/link";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Trash2, Users as UsersIcon } from "lucide-react";
import * as XLSX from "xlsx";

const Users = ({ userss }) => {
  const [isHidden, setIsHidden] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
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

    if (!myuser || !allowedEmails?.includes(myuser.email)) {
      router.push('/');
    } else {
      setIsHidden(false);
    }
  }, [router]);

  useEffect(() => {
    if (userss) {
      setFilteredUsers(
        userss.filter(user =>
          user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.phone?.includes(searchTerm)
        )
      );
    }
  }, [searchTerm, userss]);

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
      <ToastContainer />
      <div className="min-h-screen bg-gray-50">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 py-8"
        >
          {/* Header with back button */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex items-center"
            >
              <Link href={'/admin'}>
                <div className="p-2 bg-white shadow-md rounded-full cursor-pointer text-red-800 hover:bg-red-600 hover:text-white transition-all duration-300">
                  <X size={24} />
                </div>
              </Link>
            </motion.div>

            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center space-x-2 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg"
            >
              <UsersIcon size={24} />
              <h1 className="text-xl md:text-2xl font-bold">Users Management</h1>
            </motion.div>

            <motion.button
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              onClick={handleDownload}
              className="flex items-center space-x-2 bg-white border border-red-600 text-red-600 px-4 py-2 rounded-lg shadow hover:bg-red-600 hover:text-white transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download size={18} />
              <span>Export Excel</span>
            </motion.button>
          </div>

          {/* Search bar */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-6"
          >
            <input
              type="text"
              placeholder="Search by name, email or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-1/3 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </motion.div>

          {/* Table container with responsiveness */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-red-600 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium">Name</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Email</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Mobile</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Wallet</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">IFSC</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Bank Name</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Branch</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Account No</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">UPI</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Age Verified</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Created At</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <AnimatePresence>
                    {filteredUsers.map((item, index) => (
                      <motion.tr
                        key={item._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="hover:bg-gray-50"
                      >
                        <td className="px-4 py-3 whitespace-nowrap text-sm">{item.name}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">{item.email}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">{item.phone}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">{item.wallet}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">{item.ifsc}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">{item.bankName}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">{item.branch}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">{item.accno}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">{item.UPINo}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                          {item.ageVerified ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Verified
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              Not Verified
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">{formatDate(item.createdAt)}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                          {item.email && (
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handlePaidButtonClick(item)}
                              className="inline-flex items-center p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-600 hover:text-white transition-all duration-300"
                            >
                              <Trash2 size={16} />
                            </motion.button>
                          )}
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>

                  {filteredUsers.length === 0 && (
                    <motion.tr
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <td colSpan="12" className="px-4 py-8 text-center text-gray-500">
                        No users found matching your search criteria.
                      </td>
                    </motion.tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Pagination could be added here if needed */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-6 text-center text-gray-600 text-sm"
          >
            Showing {filteredUsers.length} of {userss.length} users
          </motion.div>
        </motion.div>
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