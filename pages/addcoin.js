import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import Head from "next/head";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import QRCode from "react-qr-code";
import { motion, AnimatePresence } from "framer-motion";
import { Coins, ArrowLeft, X, CreditCard, Calendar, RefreshCw, Clock, CheckCircle, AlertCircle } from "lucide-react";

const Addcoin = () => {
    const [wallet, setWallet] = useState(0);
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    const [token, setToken] = useState("");
    const [name, setName] = useState("");
    const [oid, setOid] = useState("");
    const [amount, setAmount] = useState('');
    const [transId, setTransId] = useState('');
    const [curdate, setCurdate] = useState('');
    const [userInfo, setUserInfo] = useState({});
    const [paymentVer, setPaymentVer] = useState(true);
    const [qrVisible, setQrVisible] = useState(false);
    const [qrUrl, setQrUrl] = useState("");
    const [timer, setTimer] = useState(null);
    const [activeTab, setActiveTab] = useState("addCoins");

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { 
                duration: 0.5,
                when: "beforeChildren",
                staggerChildren: 0.2
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

    const buttonVariants = {
        rest: { scale: 1 },
        hover: { scale: 1.05 },
        tap: { scale: 0.95 }
    };

    useEffect(() => {
        const myuser = JSON.parse(localStorage.getItem("myuser"));
        if (myuser && myuser.token) {
            fetchData(myuser.token);
            setToken(myuser.token);
        }
        const fetchOrders = async () => {
            setLoading(false);
            let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getaddcoin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token: JSON.parse(localStorage.getItem('myuser')).token }),
            });
            let res = await a.json();
            setOrders(res.addcoins);
            setLoading(true);
        };
        
        if (!localStorage.getItem('myuser')) {
            router.push('/');
        }
        else {
            fetchOrders();
        }
        
        setOid(Math.floor(Math.random() * Date.now()));

        const options = { day: '2-digit', month: '2-digit', year: '2-digit' };
        const currentDate = new Date().toLocaleDateString('en-US', options);
        setCurdate(currentDate);
    }, [router]);

    const fetchData = async (token) => {
        let data = { token: token, wallet };
        let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        let res = await a.json();
        setWallet(res.wallet);
        setName(res.name);
        setUserInfo(res);
    };

    const handleChange = async (e) => {
        const { name, value } = e.target;

        if (name === 'amount') {
            setAmount(value);
            // Update payment verification based on both conditions
            if (value >= 100 && transId.trim() !== '') {
                setPaymentVer(false); // Allow payment verification
            } else {
                setPaymentVer(true); // Block payment verification
            }
        } else if (name === 'transId') {
            setTransId(value);
            // Update payment verification based on both conditions
            if (value.trim() !== '' && amount >= 100) {
                setPaymentVer(false); // Allow payment verification
            } else {
                setPaymentVer(true); // Block payment verification
            }
        }
    };

    const generateQR = () => {
        if (!amount || amount < 1) {
            toast.error("Please enter a valid amount!", {
                position: "top-center",
                autoClose: 3000,
            });
            return;
        }

        // Generate UPI payment URL
        const upiId = process.env.NEXT_PUBLIC_UPI_ID;
        const url = `upi://pay?pa=${upiId}&pn=YourName&am=${amount}&cu=INR`;
        setQrUrl(url);
        setQrVisible(true);

        // Set a timeout of 10 minutes for QR code visibility
        if (timer) clearTimeout(timer);
        const newTimer = setTimeout(() => {
            setQrVisible(false);
            toast.warning("QR code expired. Please generate a new one.", {
                position: "top-center",
                autoClose: 3000,
            });
        }, 600000); // 10 minutes in milliseconds
        setTimer(newTimer);
    };

    const clearFields = () => {
        setAmount("");
        setTransId("");
        setQrVisible(false);
        if (timer) clearTimeout(timer);
    };

    const initiatePaymentDemo = async () => {
        setLoading(false);
        const data = { email: userInfo.email, name: userInfo.name, phone: userInfo.phone, amount, oid, transId };
        let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/addCoin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        let txnRes = await a.json();
        setLoading(true);
        if (txnRes.success) {
            toast.success(txnRes.success, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            clearFields();
        } else {
            clearFields();
        }
    };

    const updatedOrders = orders.map((item) => {
        const date = new Date(item.createdAt);
        const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        return {
            ...item,
            time: time
        };
    });

    const getStatusColor = (status) => {
        switch(status.toLowerCase()) {
            case 'completed':
                return 'text-green-600';
            case 'pending':
                return 'text-yellow-600';
            case 'failed':
                return 'text-red-600';
            default:
                return 'text-gray-600';
        }
    };

    const getStatusIcon = (status) => {
        switch(status.toLowerCase()) {
            case 'completed':
                return <CheckCircle className="inline-block mr-1" size={16} />;
            case 'pending':
                return <Clock className="inline-block mr-1" size={16} />;
            case 'failed':
                return <AlertCircle className="inline-block mr-1" size={16} />;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
            <Head>
                <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
                <title>Patti Circle - Purchase Coin</title>
                <meta
                    name="description"
                    content="Patti Circle win win Game - Purchase coins to play more games"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            
            {!loading && (
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
                        <RefreshCw className="text-blue-600 animate-spin mb-4" size={36} />
                        <p className="text-lg font-medium text-gray-700">Processing your request...</p>
                    </motion.div>
                </motion.div>
            )}
            
            <motion.div 
                className="max-w-4xl mx-auto"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div variants={itemVariants} className="mb-6">
                    <Link href="./">
                        <motion.a 
                            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                            whileHover={{ x: -5 }}
                        >
                            <ArrowLeft size={20} className="mr-2" />
                            <span className="text-lg cursor-pointer font-medium">Back to Home</span>
                        </motion.a>
                    </Link>
                </motion.div>
                
                <motion.div 
                    variants={itemVariants}
                    className="bg-white rounded-xl shadow-xl overflow-hidden"
                >
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
                        <h1 className="text-3xl font-bold text-white text-center">Coin Management</h1>
                    </div>
                    
                    <motion.div 
                        className="p-6 md:p-8 flex items-center justify-between bg-gradient-to-r from-blue-50 to-purple-50 border-b"
                        variants={itemVariants}
                    >
                        <div className="flex items-center">
                            <Coins className="text-yellow-500 mr-3" size={28} />
                            <div>
                                <p className="text-gray-600 text-lg">Your Wallet</p>
                                <p className="text-3xl font-bold text-gray-800">{wallet} <span className="text-sm font-normal text-gray-500">coins</span></p>
                            </div>
                        </div>
                        <div className="hidden md:block">
                            <div className="bg-gray-100 px-4 py-2 rounded-lg text-sm">
                                <span className="text-gray-600">Reference Number: </span>
                                <span className="text-gray-900 font-medium">{oid}</span>
                            </div>
                        </div>
                    </motion.div>
                    
                    <div className="px-6 py-4 border-b">
                        <div className="flex space-x-2">
                            <motion.button
                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === "addCoins" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                                onClick={() => setActiveTab("addCoins")}
                                whileHover={{ y: -2 }}
                                whileTap={{ y: 0 }}
                            >
                                Add Coins
                            </motion.button>
                            <motion.button
                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === "history" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                                onClick={() => setActiveTab("history")}
                                whileHover={{ y: -2 }}
                                whileTap={{ y: 0 }}
                            >
                                Coin History
                            </motion.button>
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        {activeTab === "addCoins" && (
                            <motion.div
                                key="addCoins"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="p-6"
                            >
                                <div className="md:hidden mb-4">
                                    <div className="bg-gray-100 px-4 py-2 rounded-lg text-sm">
                                        <span className="text-gray-600">Reference Number: </span>
                                        <span className="text-gray-900 font-medium">{oid}</span>
                                    </div>
                                </div>
                                
                                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="flex flex-col items-center justify-center">
                                            <AnimatePresence mode="wait">
                                                {!qrVisible ? (
                                                    <motion.div 
                                                        key="placeholderQR"
                                                        className="w-full max-w-xs flex flex-col items-center justify-center relative"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        exit={{ opacity: 0 }}
                                                    >
                                                        <div className="border border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm mb-4 p-4 w-48 h-48 flex items-center justify-center">
                                                            <CreditCard className="text-gray-400" size={64} />
                                                        </div>
                                                        <p className="text-sm text-gray-600 text-center">
                                                            Enter an amount and click "Generate QR Code" to proceed with payment
                                                        </p>
                                                    </motion.div>
                                                ) : (
                                                    <motion.div 
                                                        key="actualQR"
                                                        className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center"
                                                        initial={{ opacity: 0, scale: 0.9 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        exit={{ opacity: 0, scale: 0.9 }}
                                                    >
                                                        <QRCode value={qrUrl} size={180} />
                                                        <p className="text-gray-700 text-lg mt-4 font-medium">Scan to pay ₹{amount}</p>
                                                        <motion.button
                                                            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg flex items-center"
                                                            onClick={clearFields}
                                                            whileHover={{ scale: 1.05 }}
                                                            whileTap={{ scale: 0.95 }}
                                                        >
                                                            <X size={16} className="mr-2" />
                                                            Clear QR
                                                        </motion.button>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                        
                                        <div className="flex flex-col">
                                            <div className="mb-4">
                                                <label htmlFor="amount" className="block text-gray-700 font-medium mb-2">Enter Coins Amount</label>
                                                <input 
                                                    value={amount} 
                                                    onChange={handleChange} 
                                                    autoComplete="off" 
                                                    type="number" 
                                                    id="amount" 
                                                    placeholder="100 or above" 
                                                    name="amount" 
                                                    required 
                                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
                                                />
                                            </div>
                                            
                                            {!qrVisible && (
                                                <motion.button
                                                    onClick={generateQR}
                                                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium mb-4 flex items-center justify-center"
                                                    variants={buttonVariants}
                                                    whileHover="hover"
                                                    whileTap="tap"
                                                    disabled={!amount || amount < 1}
                                                >
                                                    Generate QR Code
                                                </motion.button>
                                            )}
                                            
                                            {qrVisible && (
                                                <div className="mb-4">
                                                    <label htmlFor="transId" className="block text-gray-700 font-medium mb-2">Enter Transaction ID</label>
                                                    <input 
                                                        value={transId} 
                                                        onChange={handleChange} 
                                                        autoComplete="off" 
                                                        type="text" 
                                                        id="transId" 
                                                        name="transId" 
                                                        required 
                                                        placeholder="Enter your payment reference ID"
                                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
                                                    />
                                                </div>
                                            )}
                                            
                                            <div className="mb-6 flex items-center">
                                                <Calendar size={20} className="text-gray-600 mr-2" />
                                                <p className="text-gray-700">Date: {curdate}</p>
                                            </div>
                                            
                                            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                                                <Link href="./">
                                                    <motion.a 
                                                        className="w-full sm:w-auto px-6 py-3 bg-gray-100 text-gray-800 rounded-lg font-medium flex items-center justify-center hover:bg-gray-200 transition-colors"
                                                        variants={buttonVariants}
                                                        whileHover="hover"
                                                        whileTap="tap"
                                                    >
                                                        <ArrowLeft size={18} className="mr-2" />
                                                        Go Back
                                                    </motion.a>
                                                </Link>
                                                
                                                <motion.button 
                                                    disabled={paymentVer} 
                                                    onClick={initiatePaymentDemo}
                                                    className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg font-medium disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                                                    variants={buttonVariants}
                                                    whileHover={!paymentVer ? "hover" : {}}
                                                    whileTap={!paymentVer ? "tap" : {}}
                                                >
                                                    <Coins className="mr-2" size={18} />
                                                    Purchase Now
                                                </motion.button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <motion.div 
                                    className="mt-8 bg-white border border-gray-200 rounded-lg p-6"
                                    variants={itemVariants}
                                >
                                    <h3 className="text-xl font-bold text-gray-800 mb-4">Important Notes:</h3>
                                    <ul className="space-y-2 text-gray-700">
                                        <li className="flex items-start">
                                            <span className="inline-block w-6 text-blue-600 font-bold mr-2">1.</span>
                                            Scan the QR code to make payment.
                                        </li>
                                        <li className="flex items-start">
                                            <span className="inline-block w-6 text-blue-600 font-bold mr-2">2.</span>
                                            Fill in the transaction ID received after payment.
                                        </li>
                                        <li className="flex items-start">
                                            <span className="inline-block w-6 text-blue-600 font-bold mr-2">3.</span>
                                            Submit your purchase by clicking the "Purchase Now" button.
                                        </li>
                                        <li className="flex items-start">
                                            <span className="inline-block w-6 text-blue-600 font-bold mr-2">4.</span>
                                            Coins will be added to your wallet within one working day.
                                        </li>
                                    </ul>
                                </motion.div>
                            </motion.div>
                        )}
                        
                        {activeTab === "history" && (
                            <motion.div
                                key="history"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="p-6"
                            >
                                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Coin Transaction History</h2>
                                
                                {updatedOrders.length === 0 ? (
                                    <motion.div 
                                        className="bg-gray-50 rounded-lg p-10 text-center"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                    >
                                        <Coins className="mx-auto text-gray-400 mb-4" size={48} />
                                        <p className="text-xl text-gray-600">No transactions yet</p>
                                        <p className="text-gray-500 mt-2">Your coin purchase history will appear here</p>
                                    </motion.div>
                                ) : (
                                    <motion.div 
                                        className="overflow-x-auto bg-white rounded-lg border border-gray-200"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                    >
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 md:uppercase tracking-wider">Date & Time</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 md:uppercase tracking-wider">Reference No.</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 md:uppercase tracking-wider">Coins</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 md:uppercase tracking-wider">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {updatedOrders.map((item) => (
                                                    <motion.tr 
                                                        key={item._id}
                                                        whileHover={{ backgroundColor: "#f9fafb" }}
                                                    >
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                                            {item.createdAt.substring(0, 10)}, {item.time}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                            #{item.orderId}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                                            <span className="inline-flex items-center">
                                                                <Coins size={16} className="text-yellow-500 mr-1" />
                                                                {item.amount}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                            <span className={`inline-flex items-center ${getStatusColor(item.status)}`}>
                                                                {getStatusIcon(item.status)}
                                                                {item.status}
                                                            </span>
                                                        </td>
                                                    </motion.tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </motion.div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Addcoin;