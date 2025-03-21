import { React, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import Head from "next/head";
import { motion, AnimatePresence } from 'framer-motion';
import { Coins, X, ArrowLeft, AlertTriangle } from 'lucide-react';

const YourOrder = () => {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wallet, setWallet] = useState(0);
  const [token, setToken] = useState("");
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        let response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/myorders`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token: JSON.parse(localStorage.getItem('myuser')).token }),
        });
        let res = await response.json();
        setOrders(res.orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    if (!localStorage.getItem('myuser')) {
      router.push('/');
    } else {
      fetchOrders();
    }

    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [router]);

  useEffect(() => {
    const myuser = JSON.parse(localStorage.getItem("myuser"));
    if (myuser && myuser.token) {
      fetchData(myuser.token);
      setToken(myuser.token);
    }
  }, []);

  const updatedOrders = orders.map((item) => {
    const date = new Date(item.createdAt);
    const formattedDate = date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
    const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return {
      ...item,
      formattedDate,
      time
    };
  });

  const fetchData = async (token) => {
    try {
      let data = { token: token, wallet };
      let response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      let res = await response.json();
      setWallet(res.wallet);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100 }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: { duration: 0.2 }
    }
  };

  const tableRowVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: i => ({ 
      opacity: 1, 
      x: 0,
      transition: { 
        delay: i * 0.05,
        duration: 0.3
      }
    }),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 to-red-800 text-white">
      <Head>
        <title>Patti Circle - Game History</title>
        <meta
          name="description"
          content="View your game history and transactions at Patti Circle"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <motion.div 
        className="fixed top-6 right-6 z-10"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Link href="/">
          <motion.a 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center ${isSmallScreen ? 'p-3' : 'px-6 py-3'} rounded-full cursor-pointer bg-white text-red-800 hover:bg-gray-100 shadow-lg transition-all`}
          >
            {isSmallScreen ? (
              <X size={24} />
            ) : (
              <>
                <ArrowLeft size={18} className="mr-2" />
                <span>Go Back</span>
              </>
            )}
          </motion.a>
        </Link>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4"
        >
          <h1 className="text-3xl font-bold text-white">Your Game History</h1>
          
          <motion.div 
            className="flex items-center bg-yellow-600/30 px-5 py-3 rounded-lg border border-yellow-500/50"
            whileHover={{ scale: 1.02 }}
          >
            <span className="mr-2 text-yellow-300">Wallet Balance:</span>
            <Coins className="h-5 w-5 text-yellow-300 mr-1" />
            <span className="text-xl font-bold text-yellow-300">{wallet}</span>
          </motion.div>
        </motion.div>

        {loading ? (
          <motion.div 
            className="flex justify-center items-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Image src="/loader.gif" width={80} height={80} alt="Loading..." />
          </motion.div>
        ) : (
          <AnimatePresence>
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white/10 rounded-xl overflow-hidden border border-white/20 shadow-xl"
            >
              {orders.length === 0 ? (
                <motion.div 
                  className="flex flex-col items-center justify-center py-16 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: 0.1 } }}
                >
                  <AlertTriangle size={48} className="text-yellow-400 mb-4" />
                  <h2 className="text-2xl font-semibold text-yellow-300 mb-2">No History Found</h2>
                  <p className="text-gray-200 max-w-md">Your game history is empty. Start playing to see your transactions here!</p>
                </motion.div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-red-950/70 text-gray-200 text-sm">
                        <th className="px-4 py-3 text-left">Date & Time</th>
                        <th className="px-4 py-3 text-left">Reference</th>
                        <th className="px-4 py-3 text-left">Card No</th>
                        <th className="px-4 py-3 text-left">Coins</th>
                        <th className="px-4 py-3 text-left">Status</th>
                        <th className="px-4 py-3 text-left">Result</th>
                      </tr>
                    </thead>
                    <tbody>
                      {updatedOrders.map((item, index) => (
                        <motion.tr 
                          key={item._id}
                          custom={index}
                          variants={tableRowVariants}
                          initial="hidden"
                          animate="visible"
                          className="border-t border-red-800/30 hover:bg-red-900/30 transition-colors"
                        >
                          <td className="px-4 py-4 whitespace-nowrap text-sm">
                            <div className="font-medium">{item.formattedDate}</div>
                            <div className="text-sm text-gray-300">{item.time}</div>
                          </td>
                          <td className="px-4 py-4">
                            <span className="text-gray-200 font-mono">#{item.orderId}</span>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-950/50 text-red-200 border border-red-700/30">
                              Card #{item.randomNum}
                            </span>
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex items-center">
                              <Coins className="h-4 w-4 text-yellow-300 mr-1" />
                              <span>{item.amount}</span>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            {item.winning === "Pending" && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-600/20 text-yellow-300 border border-yellow-500/30">
                                Pending
                              </span>
                            )}
                            {item.winning === "Win" && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-600/20 text-green-300 border border-green-500/30">
                                Win
                              </span>
                            )}
                            {item.winning === "Loss" && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-600/20 text-red-300 border border-red-500/30">
                                Loss
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-4">
                            {item.winning === "Pending" && (
                              <div className="flex items-center text-yellow-300">
                                <span>{parseInt(item.amount)}</span>
                                <Coins className="h-4 w-4 ml-1" />
                              </div>
                            )}
                            {item.winning === "Win" && (
                              <div className="flex items-center text-green-300">
                                <span>+{parseInt(item.amount * 2 - 0.2 * item.amount)}</span>
                                <Coins className="h-4 w-4 ml-1" />
                              </div>
                            )}
                            {item.winning === "Loss" && (
                              <div className="flex items-center text-red-300">
                                <span>-{parseInt(item.amount)}</span>
                                <Coins className="h-4 w-4 ml-1" />
                              </div>
                            )}
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default YourOrder;