import Head from "next/head";
import { useEffect, useState } from "react";
import Image from 'next/image';
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion, AnimatePresence } from "framer-motion";
import { User, Coins, LogOut, Menu, X, RefreshCw, Download } from "lucide-react";
import mongoose from "mongoose";
import RandomNSchema from "../modal/randomCard";
import Orderr from "../modal/Order";
import { useRouter } from 'next/router';
import moment from 'moment';
// import Preloader from '../pages/componenat/Preloader';

export default function Home({ logout, user, buyNow, randomNum, cart, clearCart, orders }) {
  const router = useRouter()
  const [dropdown, setdropdown] = useState(false)
  const [name, setname] = useState("")
  const [email, setemail] = useState("")
  const [phone, setphone] = useState("")
  const [amount, setamount] = useState()
  const [timeBit, settimeBit] = useState(true)
  const [lodingS, setlodingS] = useState(true)
  const [paymentVer, setpaymentVer] = useState(true)
  const [imageload, setimageload] = useState(false)
  const [token, settoken] = useState("")
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isLaptop, setIsLaptop] = useState(false);
  var [closeScr, setcloseScr] = useState(false)
  var [loginout, setloginout] = useState(false)
  const [wallet, setwallet] = useState(0)
  const [users, setusers] = useState({ value: null })
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  // const [isLoading, setIsLoading] = useState(true);
  const [ordersIn, setordersIn] = useState([])

  const [time, setTime] = useState(calculateRemainingTime());

  function calculateRemainingTime() {
    const now = new Date();
    const secondsUntilNextDay = 24 * 60 * 60 - (now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds());
    return secondsUntilNextDay;
  }

  // useEffect(() => {
  //   const hasVisitedInSession = sessionStorage.getItem('hasVisitedInSession');

  //   if (hasVisitedInSession) {
  //     setIsLoading(false);
  //   } else {
  //     setTimeout(() => {
  //       setIsLoading(false);
  //       sessionStorage.setItem('hasVisitedInSession', 'true');
  //     }, 6000);
  //   }
  //   const interval = setInterval(() => {
  //     setTime(calculateRemainingTime());
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, []);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  useEffect(() => {
    const fetchOrders = async () => {
      let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getwinnerinfo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: JSON.parse(localStorage.getItem('myuser')).token }),
      })
      let res = await a.json()

      res.OrdersInfo.forEach(item => {
        if (item.winning === 'Win') {
          toast.success(`You Win ${2 * item.amount - 0.2 * item.amount} Coins`, {
            position: "top-right",
            autoClose: false,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }

        if (item.winning === 'Loss') {
          toast.error(`You Loss ${item.amount} Coins`, {
            position: "top-right",
            autoClose: false,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      });
    }
    if (!localStorage.getItem('myuser')) {
      router.push('/')
    }
    else {
      fetchOrders()
    }

  }, [])

  const interval = setInterval(() => {
    setTime(calculateRemainingTime());
  }, 1000);

  useEffect(() => {
    const myuser = JSON.parse(localStorage.getItem("myuser"))
    if (myuser && myuser.token) {
      setloginout(true);
      setusers(myuser)
      fetchdata(myuser.token)
      settoken(myuser.token)
      setimageload(true);
    }
    const now = new Date();
    const hours = now.getHours();


    if (hours >= 6 && hours <= 23) {
      settimeBit(false);
    } else {
      settimeBit(true);
    }

    // Enhanced responsive handling
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 640);
      setIsTablet(width >= 640 && width < 1024);
      setIsLaptop(width >= 1024);
      setIsSmallScreen(width <= 600);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call once on mount

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [])

  const handleChange = async (e) => {
    if (e.target.name == 'amount') {
      setamount(e.target.value)
      if (e.target.value >= 50) {
        setpaymentVer(false)
      }
      else {
        setpaymentVer(true)
      }
    }
  }

  const handleDownload = () => {
    window.open('/PattiCircle.apk');
  };
  const fetchdata = async (token) => {
    setlodingS(false);

    try {
      let data = { token };
      let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      let res = await a.json();

      if (res.success) {
        // Update state with user data
        setwallet(res.wallet);
        setname(res.name);
        setemail(res.email);
        setphone(res.phone);
      } else {
        // If user is not found, clear local storage and reload the page
        console.error(res.error);
        localStorage.removeItem("myuser");
        setloginout(false);
        setusers(null);
        alert("Session expired or user does not exist. Please log in again.");
        window.location.reload();
      }
    } catch (err) {
      console.error("Error fetching user data:", err);
      localStorage.removeItem("myuser");
      setloginout(false);
      setusers(null);
      alert("An error occurred. Please log in again.");
      window.location.reload();
    }

    setlodingS(true);
  };


  const initiatePayment = async () => {
    if (loginout) {
      setpaymentVer(true);
      let oid = Math.floor(Math.random() * Date.now());
      const data = {
        cart, oid, amount, email, name, phone, wallet, randomNum: cart.randomNum,
        cardno: cart.cardno,
      };
      let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pretransaction`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      let txnRes = await a.json()
      if (txnRes.success) {
        toast.success(txnRes.success, {
          position: "top-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        let walletUp = wallet - amount;
        let data2 = { token: token, email, walletUp }
        let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateWallet`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data2),
        })
        setwallet(wallet - amount)
        setcloseScr(false)
        setamount();
      }
      else {
        toast.error(txnRes.error, {
          position: "top-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setcloseScr(false)
        setamount();
      }
      setpaymentVer(false)
    }
    else {
      router.push('/login');
    }
  }

  // Framer Motion variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  };

  const slideUp = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  };

  const popIn = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 200 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (<>
    {/* {isLoading && <Preloader />} */}
    {!imageload && !isSmallScreen && (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="imageloadd containerr"
      >
        <Head>
          <title>Patti Circle- Win Win Game</title>
          <meta
            name="description"
            content="Patti Circle win win Game"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="imagess h-screen w-full overflow-hidden relative">
          <motion.div
            className="logo w-40 absolute left-36 top-7"
            variants={slideUp}
          >
            <img src="/logopn.png" alt="" />
          </motion.div>
          <motion.div
            onClick={() => setimageload(true)}
            className="title-logo absolute flex w-full h-full mt-7 pl-8 cursor-pointer justify-center items-start"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img src="StartGame.png" alt="" />
          </motion.div>
          <motion.div
            onClick={handleDownload}
            className="downloadapk absolute z-50 w-40 cursor-pointer top-10 right-10"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img src="downloadmo.png" alt="" />
          </motion.div>
          <motion.div
            className="imgphoto w-full h-full overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <img src="./frontpage1.jpg" alt="" />
          </motion.div>
        </div>
      </motion.div>
    )}

    {!imageload && isSmallScreen && (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="imageloadd"
      >
        <div className="imagess hightspage w-full overflow-hidden relative">
          <motion.div
            onClick={() => setimageload(true)}
            className="title-logo absolute flex w-full h-full mt-14 pl-10 cursor-pointer justify-center items-start"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
          </motion.div>
          <motion.div
            className="imgphoto w-full h-full overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <img src="./homemo.jpg" alt="" />
          </motion.div>
        </div>
      </motion.div>
    )}

    {imageload && (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="min-h-screen flex flex-col"
      >
        <Head>
          <title>Patti Circle- Win Win Game</title>
          <meta
            name="description"
            content="Patti Circle win win Game"
          />
          <link rel="icon" href="/favicon.ico" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>
        <ToastContainer
          position="top-right"
          autoClose={false}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <div className="containerr h-screen relative w-full screnfulln overflow-hidden">
          {!lodingS && (
            <motion.div
              className="fixed inset-0 flex justify-center items-center bg-black/30 backdrop-blur-sm z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="bg-white rounded-xl p-8 flex flex-col items-center"
              >
                <RefreshCw className="text-red-600 animate-spin mb-4" size={36} />
                <p className="text-lg font-medium text-gray-700">Processing wait...</p>
              </motion.div>
            </motion.div>
          )}

          <AnimatePresence>
            {closeScr === true && (
              <motion.div
                className="betting-popup fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-40 p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="betting-card w-full max-w-md bg-gradient-to-br from-red-800 to-red-950 rounded-3xl overflow-hidden shadow-2xl"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <div className="card-header bg-red-900 p-4 text-white">
                    <div className="flex justify-between items-center">
                      <h2 className="text-2xl font-bold tracking-wide">PLACE YOUR BET</h2>
                      <div className="relative">
                        <motion.span
                          className="absolute -top-1 -left-2 w-6 h-6 bg-yellow-400 rounded-full"
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                        ></motion.span>
                        <span className="relative text-3xl font-extrabold">{cart.cardno}</span>
                      </div>
                    </div>
                  </div>

                  <div className="card-body p-6">
                    <motion.div
                      className="card-decoration flex justify-center -mt-2 mb-4"
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <img width={'100px'} src={`/card/card-${cart.randomNum}.png`} alt="" />
                    </motion.div>

                    <motion.div
                      className="amount-section mb-6"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <label htmlFor="amount" className="block text-white text-lg font-medium mb-2">Enter Coins</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-yellow-500 text-xl">₹</span>
                        <input
                          value={amount}
                          onChange={handleChange}
                          type="number"
                          id="amount"
                          name="amount"
                          autoComplete="off"
                          required
                          className="p-4 pl-10 outline-none rounded-full w-full border-2 border-yellow-500 bg-red-900/50 text-white text-xl placeholder-red-300 focus:ring-2 focus:ring-yellow-400 transition-all"
                          placeholder="Minimum 50"
                        />
                      </div>
                    </motion.div>

                    <motion.div
                      className="button-group flex flex-col sm:flex-row justify-between gap-4"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <motion.button
                        onClick={() => { 
                          clearCart(); 
                          setcloseScr(false); 
                          
                          // Multiple approaches to dismiss toasts
                          toast.dismiss();
                          
                          // Use setTimeout to ensure it runs after current event loop
                          setTimeout(() => {
                            toast.dismiss();
                            // Force dismiss all active toasts with different selectors
                            const selectors = [
                              '.Toastify__toast',
                              '.Toastify__toast-container',
                              '[class*="Toastify__toast"]'
                            ];
                            
                            selectors.forEach(selector => {
                              const elements = document.querySelectorAll(selector);
                              elements.forEach(el => {
                                try {
                                  el.remove();
                                } catch (e) {
                                  // Ignore errors
                                }
                              });
                            });
                          }, 100);
                        }}
                        className="order-2 sm:order-1 rounded-full bg-white/10 border-2 border-white text-white hover:bg-white hover:text-red-900 font-bold py-3 w-full sm:w-1/2 transition-all duration-300"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        CANCEL
                      </motion.button>

                      <motion.button
                        onClick={initiatePayment}
                        disabled={paymentVer}
                        className="order-1 sm:order-2 rounded-full bg-yellow-500 text-red-900 hover:bg-yellow-400 font-bold py-3 w-full sm:w-1/2 disabled:bg-gray-500 disabled:text-gray-300 disabled:cursor-not-allowed transition-all duration-300 shadow-lg"
                        whileHover={{ scale: 1.05, boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.2)" }}
                        whileTap={{ scale: 0.97 }}
                      >
                        PLACE BET
                      </motion.button>
                    </motion.div>
                  </div>

                  <motion.div
                    className="card-footer p-3 bg-red-950/50 text-center text-xs text-yellow-200"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    Good luck! May the cards be in your favor
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            className="navbar flex justify-between items-center pr-20 pl-20 pt-4"
            variants={fadeIn}
          >
            <motion.div
              className="logo w-28"
              variants={slideUp}
            >
              <img src="/logopn.png" alt="" />
            </motion.div>
            <motion.div
              className="uppercase text-5xl font-semibold margingr displayno text-white py-5 px-20"
              variants={slideUp}
            >
              <div className="clasimg font-serif animate-charcter m-auto">
                Choose Your Card
              </div>
            </motion.div>
            <motion.div
              className="user_name absluser relative flex justify-between items-center text-white z-20 bg-red-900 p-4 px-7 rounded-lg"
              variants={popIn}
            >
              {user && user.value && (
                <motion.div
                  onClick={() => setdropdown(!dropdown)}
                  className="name pr-5 paddingph cursor-pointer hover:text-red-100 flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="mr-2">{name}</span>
                </motion.div>
              )}

              <AnimatePresence>
                {dropdown && (
                  <motion.div
                    className="dropdown absolute right-0 top-14 w-64 rounded-xl bg-white z-50 shadow-xl overflow-hidden border border-red-900"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <div className="dropdown-header bg-gradient-to-r from-red-700 to-red-900 p-3">
                      <div className="text-white text-center font-bold">PLAYER MENU</div>
                    </div>

                    <motion.ul
                      className="py-2"
                      variants={staggerContainer}
                      initial="hidden"
                      animate="visible"
                    >
                      <Link href={'/account'}>
                        <motion.a variants={slideUp}>
                          <motion.li
                            className="flex cursor-pointer items-center px-4 py-3 hover:bg-red-50 transition-all group"
                            whileHover={{ x: 5 }}
                          >
                            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center group-hover:bg-red-200 mr-3">
                              <User className="text-red-700 group-hover:text-red-600" size={20} />
                            </div>
                            <span className="text-gray-800 font-medium group-hover:text-red-700">My Profile</span>
                          </motion.li>
                        </motion.a>
                      </Link>

                      <Link href={'/yourorder'}>
                        <motion.a variants={slideUp}>
                          <motion.li
                            className="flex cursor-pointer items-center px-4 py-3 hover:bg-red-50 transition-all group"
                            whileHover={{ x: 5 }}
                          >
                            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center group-hover:bg-red-200 mr-3">
                              <Coins className="text-red-700 group-hover:text-red-600" size={20} />
                            </div>
                            <span className="text-gray-800 font-medium group-hover:text-red-700">Game History</span>
                          </motion.li>
                        </motion.a>
                      </Link>

                      <Link href={'/addcoin'}>
                        <motion.a variants={slideUp}>
                          <motion.li
                            className="flex cursor-pointer items-center px-4 py-3 hover:bg-red-50 transition-all group"
                            whileHover={{ x: 5 }}
                          >
                            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center group-hover:bg-red-200 mr-3">
                              <Coins className="text-red-700 group-hover:text-red-600" size={20} />
                            </div>
                            <span className="text-gray-800 font-medium group-hover:text-red-700">Add Coins</span>
                          </motion.li>
                        </motion.a>
                      </Link>

                      <Link href={'/withdrawal'}>
                        <motion.a variants={slideUp}>
                          <motion.li
                            className="flex cursor-pointer items-center px-4 py-3 hover:bg-red-50 transition-all group"
                            whileHover={{ x: 5 }}
                          >
                            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center group-hover:bg-red-200 mr-3">
                              <Coins className="text-red-700 group-hover:text-red-600" size={20} />
                            </div>
                            <span className="text-gray-800 font-medium group-hover:text-red-700">Withdraw Coins</span>
                          </motion.li>
                        </motion.a>
                      </Link>

                      <motion.li
                        onClick={handleDownload}
                        className="flex items-center px-4 py-3 hover:bg-red-50 transition-all group cursor-pointer"
                        variants={slideUp}
                        whileHover={{ x: 5 }}
                      >
                        <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center group-hover:bg-red-200 mr-3">
                          <Download className="text-red-700 group-hover:text-red-600" size={20} />
                        </div>
                        <span className="text-gray-800 font-medium group-hover:text-red-700">Download App</span>
                      </motion.li>

                      <motion.li
                        onClick={logout}
                        className="flex items-center px-4 py-3 hover:bg-red-50 transition-all group cursor-pointer mt-2 border-t border-red-100"
                        variants={slideUp}
                        whileHover={{ x: 5 }}
                      >
                        <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center group-hover:bg-red-200 mr-3">
                          <LogOut className="text-red-700 group-hover:text-red-600" size={20} />
                        </div>
                        <span className="text-gray-800 font-medium group-hover:text-red-700">Logout</span>
                      </motion.li>
                    </motion.ul>
                  </motion.div>
                )}
              </AnimatePresence>

              {user && !user.value && (
                <Link href={"/login"}>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <button className="text-xl btn-login flex items-center px-4 rounded-md bg-red-900 cursor-pointer text-slate-50 hover:text-red-200 transition-all">Login</button>
                  </motion.a>
                </Link>
              )}

              {user && user.value && (
                <motion.div
                  onClick={() => setdropdown(!dropdown)}
                  className="pr-4 paddingph text-lg cursor-pointer hover:text-red-100"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {dropdown ? <X size={24} /> : <Menu size={24} />}
                </motion.div>
              )}

              {user && user.value && <div className="saprator"></div>}

              {user && user.value && (
                <Link href={'./addcoin'}>
                  <motion.div
                    className="coin flex justify-center items-center text-lg cursor-pointer text-yellow-200 hover:text-yellow-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Coins size={20} className="mr-1" /> <span className="text-2xl">{wallet}</span>
                  </motion.div>
                </Link>
              )}
            </motion.div>
          </motion.div>

          <motion.div
            className="uppercasem text-3xl hidden displaout font-semibold text-white py-5 px-20"
            variants={slideUp}
          >
            <div className="clasimg font-serif flex justify-center animate-charcter">
              Choose Your Card
            </div>
          </motion.div>

          <motion.div
            className="welc flex flexdis paddisp justify-between items-center text-white px-14 mt-10"
            variants={fadeIn}
          >
          </motion.div>

          <motion.div
            className="card hidexontet relative cardmrhon text-red-900 flex justify-center items-center p-5 text-lg mt-9"
            variants={staggerContainer}
          >
            <div className="card_no flex justify-around items-center w-4/6 flexcolh">
              <motion.div
                onClick={() => { buyNow(randomNum.card1, 1); setcloseScr(true) }}
                disabled={timeBit}
                className="cursor-pointer paddispace card card_first h-min"
                variants={popIn}
                whileHover={{ scale: 1.05, y: -10 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="upperBody overflow-hidden relative">
                  <img src={`/card/card-${randomNum.card1}.png`} alt="" />
                </div>
                <div className="lowerBody flex justify-around mt-3 items-center font-bold">
                  <motion.button
                    onClick={() => { buyNow(randomNum.card1, 1); setcloseScr(true) }}
                    disabled={timeBit}
                    className="card_no_det border rounded-3xl h-9 flex justify-center items-center p-5 text-lg bg-white border-red-900 hover:bg-red-200 cursor-pointer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    Select
                  </motion.button>
                </div>
              </motion.div>

              <motion.div
                onClick={() => { buyNow(randomNum.card2, 2); setcloseScr(true) }}
                disabled={timeBit}
                className="cursor-pointer paddispace card card_second h-min"
                variants={popIn}
                whileHover={{ scale: 1.05, y: -10 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="upperBody overflow-hidden relative">
                  <img src={`/card/card-${randomNum.card2}.png`} alt="" />
                </div>
                <div className="lowerBody flex justify-around mt-3 items-center font-bold">
                  <motion.button
                    onClick={() => { buyNow(randomNum.card2, 2); setcloseScr(true) }}
                    disabled={timeBit}
                    className="card_no_det border rounded-3xl h-9 flex justify-center items-center p-5 text-lg bg-white border-red-900 hover:bg-red-200 cursor-pointer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    Select
                  </motion.button>
                </div>
              </motion.div>

              <motion.div
                onClick={() => { buyNow(randomNum.card3, 3); setcloseScr(true) }}
                disabled={timeBit}
                className="cursor-pointer paddispace card card_third h-min"
                variants={popIn}
                whileHover={{ scale: 1.05, y: -10 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="upperBody overflow-hidden relative">
                  <img src={`/card/card-${randomNum.card3}.png`} alt="" />
                </div>
                <div className="lowerBody flex justify-around mt-3 items-center font-bold">
                  <motion.button
                    onClick={() => { buyNow(randomNum.card3, 3); setcloseScr(true) }}
                    disabled={timeBit}
                    className="card_no_det border rounded-3xl h-9 flex justify-center items-center p-5 text-lg bg-white border-red-900 hover:bg-red-200 cursor-pointer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    Select
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <div className="grab-winner flex justify-between items-center px-28 mb-40 md:mb-10">
            <div className=" md:w-1/2 flex ">
              <motion.div
                className="remaining-time flexdia text-center text-white"
                variants={slideUp}
              >
                <motion.div
                  className="time-container flex items-center flex-col h-full w-48 p-4 border border-red-700 rounded-lg bg-red-900/50 shadow-lg"
                  whileHover={{ scale: 1.02 }}
                >
                  <p className="text-white text-xl font-serif">Last Bet</p>
                  <p className="text-white text-xl font-serif">Winning Card</p>
                  <div className="resImg w-24">
                    <img src={`/card/card-${randomNum.wiinerCard}.png`} alt="" />
                  </div>
                </motion.div>
              </motion.div>
            </div>
            <div className="wiiner w-full mx-auto md:w-1/2 flex justify-end">
              <motion.div
                className="remaining-time flexdia text-center text-white"
                variants={slideUp}
              >
                <motion.div
                  className="time-container p-4 border border-red-700 rounded-lg bg-red-900/50 shadow-lg w-full max-w-sm"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="time-label mb-1 text-yellow-300 font-medium">Winner Announced In</div>
                  <div className="time-display text-3xl font-bold">{formatTime(time)}</div>
                </motion.div>
              </motion.div>
            </div>
          </div>

          <footer className="footer text-center py-3 text-white w-full bg-red-950/50 relative md:absolute md:bottom-0">
            <div className="foooter w-full flex flex-col absolute bottom-0 left-0 justify-between">
              <div className="ending uppercase text-lg mt-5 flex flexdis justify-end px-10 items-center bg-white text-red-900 font-bold p-2 text-center">
                <marquee direction="left" scrollamount="10">
                  <ol className="flex flex-row">
                    {orders
                      .filter((order) => order.winning === 'Win')
                      .map((order, index) => (
                        <motion.li
                          className="mr-40 text-base font-serif"
                          key={index}
                          initial="hidden"
                          animate="visible"
                          variants={slideUp}
                          custom={index} // This allows for staggered animations
                          transition={{ delay: index * 0.1 }}
                        >
                          {order.name} - ₹{order.amount * 2 - 0.2 * order.amount}
                        </motion.li>
                      ))}
                  </ol>
                </marquee>
              </div>
              <div className="footer w-full flex didgrid justify-between items-center bg-red-900 text-white font-bold p-3 text-center pl-12 pr-12">
                <motion.div
                  className="webname"
                  initial="hidden"
                  animate="visible"
                  variants={slideUp}
                >
                  patticircle.com &#169;
                </motion.div>

                <Link href={'./howtoplay'}>
                  <motion.div
                    className="term cursor-pointer"
                    initial="hidden"
                    animate="visible"
                    variants={slideUp}
                  >
                    How to Play
                  </motion.div>
                </Link>

                <Link href={'./terms'}>
                  <motion.div
                    className="term cursor-pointer"
                    initial="hidden"
                    animate="visible"
                    variants={slideUp}
                  >
                    Terms & Conditions
                  </motion.div>
                </Link>

                <Link href={'./faq'}>
                  <motion.div
                    className="term cursor-pointer"
                    initial="hidden"
                    animate="visible"
                    variants={slideUp}
                  >
                    FAQ
                  </motion.div>
                </Link>

                <Link href={'./contact'}>
                  <motion.div
                    className="term cursor-pointer"
                    initial="hidden"
                    animate="visible"
                    variants={slideUp}
                  >
                    Contact us
                  </motion.div>
                </Link>
              </div>
            </div>
          </footer>
        </div>
      </motion.div >
    )
    }
  </>);
}

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  let randomNum = await RandomNSchema.findOne();
  let orders = await Orderr.find({});

  return {
    props: {
      randomNum: JSON.parse(JSON.stringify(randomNum)),
      orders: JSON.parse(JSON.stringify(orders)),
    },
  };
}