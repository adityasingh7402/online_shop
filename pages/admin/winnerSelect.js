import React, { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import Order from "../../modal/Order";
import mongoose from "mongoose";
import RandomNSchema from '../../modal/randomCard';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, Award, ArrowLeft, CreditCard } from "lucide-react";
import Link from "next/link";

const WinnerSelect = ({ winnOrder, randomNum, selectUsers, selectUser }) => {
  const router = useRouter();
  const [users, setUsers] = useState("");
  const [isHidden, setIsHidden] = useState(true);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const myuser = JSON.parse(localStorage.getItem("myuser"));
    
    if (myuser && myuser.token) {
      setUsers(myuser.email);
    }

    const allowedEmails = process.env.NEXT_PUBLIC_ALLOWED_EMAILS?.split(',');

    if (!myuser || !allowedEmails.includes(myuser.email)) {
      router.push('/');
    } else {
      setIsHidden(false);
    }
  }, [router]);

  // Calculate stats for each card
  const cardStats = [
    { cardNo: randomNum.card1, position: 1 },
    { cardNo: randomNum.card2, position: 2 },
    { cardNo: randomNum.card3, position: 3 }
  ].map(card => {
    const users = winnOrder.filter(
      obj => obj.cardDetails.randomNum === card.cardNo
    );
    
    const totalAmount = users.reduce(
      (sum, obj) => sum + obj.amount, 0
    );
    
    return {
      ...card,
      totalUsers: users.length,
      totalAmount: totalAmount
    };
  });

  const handleUserSubmit = async () => {
    if (!selectUsers.randomNum) {
      toast.error("Please select a card first", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }
    
    setLoading(true);
    
    try {
      let data = { randomNum: selectUsers.randomNum, cardno: selectUsers.cardno };
      let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updatestatus`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      let res = await a.json();
      
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
        
        // Generate new random numbers
        let randomNo1 = 0, randomNo2 = 0, randomNo3 = 0;
        while (randomNo1 === 0 || randomNo2 === 0 || randomNo3 === 0) {
          let randoRand = Math.floor(Math.random() * 13) + 1;

          if (randomNo1 === 0 && randoRand !== randomNum.card1) {
            randomNo1 = randoRand;
          } else if (randomNo2 === 0 && randoRand !== randomNum.card2 && randoRand !== randomNo1) {
            randomNo2 = randoRand;
          } else if (randomNo3 === 0 && randoRand !== randomNum.card3 && randoRand !== randomNo1 && randoRand !== randomNo2) {
            randomNo3 = randoRand;
          }
        }
        
        let data2 = { 
          randomNum: selectUsers.randomNum, 
          first_no: randomNo1, 
          second_no: randomNo2, 
          third_no: randomNo3 
        };
        
        await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateCardN`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data2),
        });
        
        // Refresh page after successful update
        setTimeout(() => {
          router.reload();
        }, 2000);
      } else {
        toast.error(res.error, {
          position: "top-center",
          autoClose: 2000,
        });
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.", {
        position: "top-center",
        autoClose: 2000,
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (isHidden) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ToastContainer />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8">
          
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center space-x-2 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg"
          >
            <Award size={24} />
            <h1 className="text-xl md:text-2xl font-bold">Winner Selection</h1>
          </motion.div>
          
          <div className="w-10 md:block hidden"></div> {/* Spacer for alignment */}
        </div>

        {/* Cards Container */}
        <motion.div 
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cardStats.map((card, index) => (
              <motion.div
                key={card.position}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + (index * 0.1) }}
                whileHover={{ scale: 1.02 }}
                onClick={() => selectUser(card.cardNo, card.position)}
                className="cursor-pointer"
              >
                <div className={`bg-white rounded-lg shadow-lg overflow-hidden border-2 ${
                  selectUsers.randomNum === card.cardNo ? 'border-red-600' : 'border-transparent'
                } transition-all duration-300 hover:shadow-xl`}>
                  <div className="p-4 bg-red-600 text-white text-center">
                    <h2 className="text-xl font-bold">Card {card.position}</h2>
                  </div>
                  <div className="p-6 flex flex-col items-center gap-3">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-800 font-bold text-xl">
                      {card.cardNo}
                    </div>
                    <div className="text-center mt-4 space-y-2">
                      <p className="text-gray-600">
                        <span className="font-semibold">Total Users:</span> {card.totalUsers}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-semibold">Total Amount:</span> ₹{card.totalAmount}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Selected Card */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col items-center justify-center mt-8"
        >
          <h2 className="text-lg font-medium text-gray-700 mb-4">Selected Card</h2>
          
          <motion.div 
            animate={{ 
              scale: selectUsers.cardno ? [1, 1.05, 1] : 1,
              borderColor: selectUsers.cardno ? ['#e5e7eb', '#dc2626', '#e5e7eb'] : '#e5e7eb'
            }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-md border-2 p-6 flex flex-col items-center"
          >
            {selectUsers.cardno ? (
              <>
                <CreditCard size={32} className="text-red-600 mb-2" />
                <p className="text-lg font-bold">Card {selectUsers.cardno}</p>
                <p className="text-gray-600">Card Number: {selectUsers.randomNum || '-'}</p>
              </>
            ) : (
              <p className="text-gray-500 italic">No card selected</p>
            )}
          </motion.div>
          
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.7 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleUserSubmit}
            disabled={loading || !selectUsers.randomNum}
            className={`mt-8 flex items-center gap-2 px-8 py-3 rounded-lg shadow-md text-white font-medium transition-all duration-300 ${
              loading || !selectUsers.randomNum ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'
            }`}
          >
            {loading ? (
              <RefreshCw size={20} className="animate-spin" />
            ) : (
              <Award size={20} />
            )}
            <span>{loading ? "Processing..." : "Update Winner"}</span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  const winnOrder = await Order.find({
    winning: "Pending"
  });
  let randomNum = await RandomNSchema.findOne();
  return {
    props: { 
      winnOrder: JSON.parse(JSON.stringify(winnOrder)), 
      randomNum: JSON.parse(JSON.stringify(randomNum)) 
    }
  };
}

export default WinnerSelect;