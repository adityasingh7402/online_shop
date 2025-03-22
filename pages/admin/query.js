import { React, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import Queryss from "../../modal/Query";
import mongoose from "mongoose";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  Search, 
  User, 
  Mail, 
  Phone, 
  MessageSquare,
  Calendar,
  Trash2,
  ExternalLink
} from "lucide-react";

const Query = ({ Querys }) => {
  const [isHidden, setIsHidden] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [queriesPerPage] = useState(5);
  const [expandedQuery, setExpandedQuery] = useState(null);
  const [localQueries, setLocalQueries] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const myuser = JSON.parse(localStorage.getItem("myuser"));
    
    const allowedEmails = process.env.NEXT_PUBLIC_ALLOWED_EMAILS?.split(',');

    if (!myuser || !allowedEmails?.includes(myuser.email)) {
      router.push('/');
    } else {
      setIsHidden(false);
    }
  }, []);

  useEffect(() => {
    // Initialize local queries state from props
    setLocalQueries(Querys);
  }, [Querys]);

  if (isHidden) {
    return null;
  }

  // Delete query function
  const deleteQuery = async (id) => {
    if (confirm("Are you sure you want to delete this query?")) {
      try {
        const res = await fetch('/api/deleteQuery', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id }),
        });
        
        const data = await res.json();
        
        if (data.success) {
          // Update local state to remove the deleted query
          setLocalQueries(localQueries.filter(query => query._id !== id));
          alert("Query deleted successfully");
        } else {
          alert("Error deleting query");
        }
      } catch (error) {
        console.error("Error deleting query:", error);
        alert("Error deleting query");
      }
    }
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
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

  // Filter queries based on search term
  const filteredQueries = localQueries.filter(
    (query) =>
      query.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      query.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      query.phone?.toString().includes(searchTerm) ||
      query.message?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get current queries for pagination
  const indexOfLastQuery = currentPage * queriesPerPage;
  const indexOfFirstQuery = indexOfLastQuery - queriesPerPage;
  const currentQueries = filteredQueries.slice(indexOfFirstQuery, indexOfLastQuery);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredQueries.length / queriesPerPage); i++) {
    pageNumbers.push(i);
  }

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100 }
    },
    hover: {
      y: -5,
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
      transition: { type: "spring", stiffness: 400, damping: 10 }
    }
  };

  // Calculate display range for pagination
  const getPageRange = () => {
    const totalPages = pageNumbers.length;
    if (totalPages <= 5) return pageNumbers;
    
    if (currentPage <= 3) {
      return [...pageNumbers.slice(0, 5), "...", totalPages];
    } else if (currentPage >= totalPages - 2) {
      return [1, "...", ...pageNumbers.slice(totalPages - 5)];
    } else {
      return [
        1, 
        "...", 
        currentPage - 1, 
        currentPage, 
        currentPage + 1, 
        "...", 
        totalPages
      ];
    }
  };

  // Toggle expand query
  const toggleExpandQuery = (id) => {
    if (expandedQuery === id) {
      setExpandedQuery(null);
    } else {
      setExpandedQuery(id);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-10">
      <Head>
        <title>Customer Queries - Admin Panel</title>
        <meta name="description" content="Manage customer queries and messages" />
      </Head>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 py-6"
      >
        <motion.div 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <Link href="/admin">
            <div className="inline-flex items-center text-red-800 hover:text-red-700 transition-colors duration-200">
              <ArrowLeft size={20} className="mr-2" />
              <span className="font-medium">Back to Dashboard</span>
            </div>
          </Link>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-6"
        >
          <motion.div
            variants={item}
            className="bg-gradient-to-r from-red-800 to-red-700 text-white rounded-lg shadow-lg p-6 mb-6"
          >
            <div className="flex flex-col md:flex-row justify-between items-center">
              <h1 className="text-2xl md:text-3xl font-bold mb-2 md:mb-0">Customer Queries</h1>
              <div className="text-sm md:text-base bg-white/20 px-3 py-1 rounded-full">
                <span className="font-medium">{filteredQueries.length}</span> messages found
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={item}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <div className="mb-6">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search queries..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>

            <motion.div
              variants={container}
              className="space-y-4"
            >
              <AnimatePresence>
                {currentQueries.length > 0 ? (
                  currentQueries.map((item) => (
                    <motion.div
                      key={item._id}
                      variants={cardVariants}
                      whileHover="hover"
                      exit={{ opacity: 0, y: -10 }}
                      layout
                      className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm"
                    >
                      <div className="p-4 md:p-5">
                        <div className="flex flex-col md:flex-row justify-between">
                          <div className="flex-1">
                            <div className="flex items-center mb-3">
                              <User size={16} className="text-gray-400 mr-2" />
                              <h3 className="font-medium text-gray-900">{item.name}</h3>
                              {item.createdAt && (
                                <div className="ml-4 flex items-center text-xs text-gray-500">
                                  <Calendar size={12} className="mr-1" />
                                  {formatDate(item.createdAt)}
                                </div>
                              )}
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                              <div className="flex items-center text-sm text-gray-600">
                                <Mail size={14} className="text-gray-400 mr-2" />
                                <span className="truncate">{item.email}</span>
                              </div>
                              
                              <div className="flex items-center text-sm text-gray-600">
                                <Phone size={14} className="text-gray-400 mr-2" />
                                <span>{item.phone || "N/A"}</span>
                              </div>
                            </div>
                            
                            <div className="flex items-start mt-3">
                              <MessageSquare size={16} className="text-gray-400 mr-2 mt-1 flex-shrink-0" />
                              <div className="text-sm text-gray-700">
                                {expandedQuery === item._id ? (
                                  <p>{item.message}</p>
                                ) : (
                                  <p className="line-clamp-2">{item.message}</p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex justify-end mt-4 space-x-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => toggleExpandQuery(item._id)}
                            className="text-xs flex items-center text-red-800 hover:text-red-700 px-3 py-1 border border-red-100 rounded-md bg-red-50 hover:bg-red-100 transition-colors duration-200"
                          >
                            {expandedQuery === item._id ? "Show Less" : "Read More"}
                          </motion.button>
                          
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => deleteQuery(item._id)}
                            className="text-xs flex items-center text-gray-600 hover:text-gray-700 px-3 py-1 border border-gray-100 rounded-md bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                          >
                            <Trash2 size={12} className="mr-1" />
                            Delete
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <motion.div
                    variants={item}
                    className="bg-white rounded-lg border border-gray-200 p-8 text-center"
                  >
                    <div className="flex flex-col items-center justify-center">
                      <MessageSquare size={40} className="text-gray-300 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-1">No queries found</h3>
                      <p className="text-gray-500 mb-4">No customer queries match your search criteria.</p>
                      {searchTerm && (
                        <button 
                          onClick={() => setSearchTerm("")}
                          className="text-red-800 hover:text-red-700 font-medium"
                        >
                          Clear search
                        </button>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Pagination */}
            {pageNumbers.length > 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex justify-center items-center mt-6"
              >
                <div className="flex space-x-1">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => paginate(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className={`px-3 py-1 rounded-md ${
                      currentPage === 1
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    Prev
                  </motion.button>
                  
                  {getPageRange().map((number, index) => (
                    typeof number === "number" ? (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => paginate(number)}
                        className={`px-3 py-1 rounded-md ${
                          currentPage === number
                            ? "bg-red-800 text-white"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                      >
                        {number}
                      </motion.button>
                    ) : (
                      <span key={index} className="text-gray-400 mx-1 self-center">...</span>
                    )
                  ))}
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => paginate(Math.min(pageNumbers.length, currentPage + 1))}
                    disabled={currentPage === pageNumbers.length}
                    className={`px-3 py-1 rounded-md ${
                      currentPage === pageNumbers.length
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    Next
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Summary Stats */}
            {localQueries.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                <motion.div
                  whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                  className="bg-red-50 rounded-lg border border-red-100 p-4"
                >
                  <h3 className="text-lg font-medium text-red-800 mb-1">Total Queries</h3>
                  <p className="text-2xl font-bold text-gray-900">{localQueries.length}</p>
                </motion.div>
                
                <motion.div
                  whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                  className="bg-blue-50 rounded-lg border border-blue-100 p-4"
                >
                  <h3 className="text-lg font-medium text-blue-800 mb-1">New Today</h3>
                  <p className="text-2xl font-bold text-gray-900">
                    {localQueries.filter(q => {
                      if (!q.createdAt) return false;
                      const today = new Date();
                      const queryDate = new Date(q.createdAt);
                      return queryDate.toDateString() === today.toDateString();
                    }).length}
                  </p>
                </motion.div>
                
                <motion.div
                  whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                  className="bg-green-50 rounded-lg border border-green-100 p-4"
                >
                  <h3 className="text-lg font-medium text-green-800 mb-1">Average Length</h3>
                  <p className="text-2xl font-bold text-gray-900">
                    {Math.round(localQueries.reduce((sum, query) => sum + (query.message?.length || 0), 0) / localQueries.length)} chars
                  </p>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  const Querys = await Queryss.find().sort({ createdAt: -1 });
  return {
    props: { Querys: JSON.parse(JSON.stringify(Querys)) },
  };
}

export default Query;