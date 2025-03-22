import { React, useEffect, useState } from "react";
import { useRouter } from "next/router";
import mongoose from "mongoose";
import RandomNSchema from "../../modal/randomCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { Settings, Save, Lock, AlertTriangle } from "lucide-react";

const ChangeNum = ({ randomNum }) => {
  const [isHidden, setIsHidden] = useState(true);
  const router = useRouter();
  const [first_no, setfirst_no] = useState("");
  const [second_no, setsecond_no] = useState("");
  const [third_no, setthird_no] = useState("");

  useEffect(() => {
    const myuser = JSON.parse(localStorage.getItem("myuser"));
    const allowedEmails = process.env.NEXT_PUBLIC_ALLOWED_EMAILS?.split(',');

    if (!myuser || !allowedEmails?.includes(myuser?.email)) {
      router.push('/');
    } else {
      setIsHidden(false);
    }
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'first_no') {
      setfirst_no(value);
    }
    else if (name === 'second_no') {
      setsecond_no(value);
    }
    else if (name === 'third_no') {
      setthird_no(value);
    }
  };

  const handleUserSubmit = async () => {
    const data = { first_no, second_no, third_no };
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateCardN`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      const res = await response.json();
      
      if (res.success) {
        toast.success("Successfully Updated Details", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error(res.error || "Update failed", {
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
      toast.error("Something went wrong. Please try again.", {
        position: "top-center",
        autoClose: 2000,
      });
      console.error("Error updating numbers:", error);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
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
        <Lock className="text-red-600 w-12 h-12 mb-4" />
        <h2 className="text-2xl font-bold text-red-600">Access Restricted</h2>
        <p className="text-gray-600 mt-2">You need admin permissions to view this page.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <ToastContainer />
      
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="space-y-6"
      >
        <motion.div 
          variants={itemVariants}
          className="flex items-center justify-center mb-8"
        >
          <div className="bg-red-600 shadow-lg rounded-lg px-8 py-4 inline-flex items-center">
            <Settings className="text-white mr-3 h-6 w-6" />
            <h1 className="text-white text-2xl font-bold">Admin Control Panel</h1>
          </div>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="bg-white rounded-lg shadow-xl p-6 mb-8"
        >
          <div className="mb-4 border-b border-gray-200 pb-4">
            <h2 className="text-xl font-semibold text-red-600 flex items-center">
              <Settings className="mr-2 h-5 w-5" />
              Number Configuration
            </h2>
            <p className="text-gray-600 text-sm mt-1">Modify the card numbers shown to users</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="flex flex-col relative p-4 bg-gray-50 rounded-lg border border-gray-200"
            >
              <label htmlFor="first_no" className="text-gray-700 font-medium mb-2">First Number</label>
              <div className="relative">
                <input 
                  value={first_no} 
                  onChange={handleChange} 
                  type="number" 
                  name="first_no" 
                  id="first_no" 
                  placeholder={randomNum?.card1 || ""} 
                  className="w-full p-3 bg-white text-gray-700 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all" 
                />
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="flex flex-col relative p-4 bg-gray-50 rounded-lg border border-gray-200"
            >
              <label htmlFor="second_no" className="text-gray-700 font-medium mb-2">Second Number</label>
              <div className="relative">
                <input 
                  value={second_no} 
                  onChange={handleChange} 
                  type="number" 
                  name="second_no" 
                  id="second_no" 
                  placeholder={randomNum?.card2 || ""} 
                  className="w-full p-3 bg-white text-gray-700 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all" 
                />
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="flex flex-col relative p-4 bg-gray-50 rounded-lg border border-gray-200"
            >
              <label htmlFor="third_no" className="text-gray-700 font-medium mb-2">Third Number</label>
              <div className="relative">
                <input 
                  value={third_no} 
                  onChange={handleChange} 
                  type="number" 
                  name="third_no" 
                  id="third_no" 
                  placeholder={randomNum?.card3 || ""} 
                  className="w-full p-3 bg-white text-gray-700 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all" 
                />
              </div>
            </motion.div>
          </div>

          <div className="flex justify-center mt-8">
            <motion.button 
              onClick={handleUserSubmit} 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-medium shadow-md transition-all"
            >
              <Save className="mr-2 h-5 w-5" />
              Update Numbers
            </motion.button>
          </div>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="bg-red-50 border-l-4 border-red-600 p-4 rounded-md flex items-start"
        >
          <AlertTriangle className="text-red-600 mr-3 h-5 w-5 mt-0.5" />
          <div>
            <h3 className="text-red-800 font-medium">Important Notice</h3>
            <p className="text-red-700 text-sm">Changes made here will directly affect what users see on the site. Please verify your entries before saving.</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export async function getServerSideProps(context) {
  try {
    if (!mongoose.connections[0].readyState) {
      await mongoose.connect(process.env.MONGO_URI);
    }
    let randomNum = await RandomNSchema.findOne();
    return {
      props: { randomNum: JSON.parse(JSON.stringify(randomNum || {})) },
    };
  } catch (error) {
    console.error("Database connection error:", error);
    return {
      props: { randomNum: {} },
    };
  }
}

export default ChangeNum;