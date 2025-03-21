import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import { Coins, X, ArrowLeft, RefreshCw, CreditCard, CheckCircle, Clock, XCircle } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Withdrawal = () => {
    const [wallet, setWallet] = useState(0);
    const router = useRouter();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState("");
    const [updated, setUpdated] = useState(false);
    const [name, setName] = useState("");
    const [amount, setAmount] = useState('');
    const [userInfo, setUserInfo] = useState({});
    const [paymentVer, setPaymentVer] = useState(true);
    const [activeSection, setActiveSection] = useState('withdraw'); // 'withdraw' or 'history'

    useEffect(() => {
        const myuser = JSON.parse(localStorage.getItem("myuser"));
        if (myuser && myuser.token) {
            fetchdata(myuser.token);
            setToken(myuser.token);
        } else {
            router.push('/');
        }
    }, []);

    const fetchdata = async (token) => {
        try {
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
            setUpdated(res.updated);
        } catch (error) {
            toast.error("Failed to fetch user data", {
                position: "top-right",
                autoClose: 3000,
            });
        }
    };

    const handleChange = (e) => {
        if (e.target.name === 'amount') {
            setAmount(e.target.value);
            
            // Check if amount is >= 500 and accno is not empty
            if (e.target.value >= 500 && userInfo.accno && userInfo.accno.trim() !== '') {
                setPaymentVer(false); // Allow payment verification if both conditions are met
            } else {
                setPaymentVer(true); // Block payment verification if either condition fails
            }
        }
    };
    
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                const myuser = JSON.parse(localStorage.getItem('myuser'));
                if (!myuser) {
                    router.push('/');
                    return;
                }

                let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getwithdrawD`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ token: myuser.token }),
                });
                let res = await a.json();
                setOrders(res.withdrawals);
                setLoading(false);
            } catch (error) {
                toast.error("Failed to fetch withdrawal history", {
                    position: "top-right",
                    autoClose: 3000,
                });
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    const initiatePayment = async () => {
        try {
            let oid = Math.floor(Math.random() * Date.now());
            const data = {
                email: userInfo.email, 
                name: userInfo.name, 
                phone: userInfo.phone, 
                amount, 
                accno: userInfo.accno,
                branch: userInfo.branch, 
                bankName: userInfo.bankName, 
                UPINo: userInfo.UPINo, 
                ifsc: userInfo.ifsc, 
                oid, 
                wallet: userInfo.wallet
            };
            
            setLoading(true);
            let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/addWithdrawal`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            let txnRes = await a.json();
            
            if (txnRes.success) {
                toast.success(txnRes.success, {
                    position: "top-right",
                    autoClose: 3000,
                });
                setAmount('');
                let walletUp = wallet - parseInt(amount);
                let data2 = { token: token, email: userInfo.email, walletUp };
                
                await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateWallet`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data2),
                });
                
                setWallet(walletUp);
                // Refresh orders list
                const myuser = JSON.parse(localStorage.getItem('myuser'));
                let ordersResponse = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getwithdrawD`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ token: myuser.token }),
                });
                let ordersData = await ordersResponse.json();
                setOrders(ordersData.withdrawals);
            } else {
                toast.error(txnRes.error || "Withdrawal failed", {
                    position: "top-right",
                    autoClose: 3000,
                });
                setAmount('');
            }
            setLoading(false);
        } catch (error) {
            toast.error("An error occurred during withdrawal", {
                position: "top-right",
                autoClose: 3000,
            });
            setLoading(false);
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

    const getStatusIcon = (status) => {
        switch(status) {
            case 'Pending':
                return <Clock className="inline-block ml-2 text-yellow-500" size={18} />;
            case 'Transferred':
                return <CheckCircle className="inline-block ml-2 text-green-700" size={18} />;
            case 'Loss':
                return <XCircle className="inline-block ml-2 text-red-700" size={18} />;
            default:
                return null;
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 relative"
        >
            <Head>
                <title>Patti Circle - Withdrawal</title>
                <meta
                    name="description"
                    content="Patti Circle - Withdraw your coins safely and easily"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            
            {/* Back button */}
            <motion.div 
                className="fixed top-4 left-4 z-10"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <Link href={'/'}>
                    <motion.button 
                        className="flex items-center gap-2 rounded-full bg-red-700 px-5 py-2 text-white shadow-lg hover:bg-red-800 transition-all duration-300"
                    >
                        <ArrowLeft size={18} />
                        <span>Back</span>
                    </motion.button>
                </Link>
            </motion.div>
            
            {/* Loading overlay */}
            <AnimatePresence>
                {loading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                    >
                        <motion.div 
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        >
                            <RefreshCw size={48} className="text-white" />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            
            {/* Main content container */}
            <motion.div 
                className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden mt-16"
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* Page title */}
                <div className="bg-gradient-to-r from-red-700 to-red-800 py-6 px-8">
                    <h1 className="text-3xl font-bold text-white text-center">Withdrawal Portal</h1>
                </div>
                
                {/* Tab navigation */}
                <div className="flex border-b border-gray-200">
                    <motion.button
                        className={`flex-1 py-4 font-medium text-center ${activeSection === 'withdraw' ? 'text-red-700 border-b-2 border-red-700' : 'text-gray-600 hover:text-red-600'}`}
                        onClick={() => setActiveSection('withdraw')}
                        whileHover={{ backgroundColor: 'rgba(239, 68, 68, 0.05)' }}
                    >
                        Withdraw Coins
                    </motion.button>
                    <motion.button
                        className={`flex-1 py-4 font-medium text-center ${activeSection === 'history' ? 'text-red-700 border-b-2 border-red-700' : 'text-gray-600 hover:text-red-600'}`}
                        onClick={() => setActiveSection('history')}
                        whileHover={{ backgroundColor: 'rgba(239, 68, 68, 0.05)' }}
                    >
                        Withdrawal History
                    </motion.button>
                </div>
                
                {/* Tab content */}
                <AnimatePresence mode="wait">
                    {activeSection === 'withdraw' ? (
                        <motion.div
                            key="withdraw"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="p-6"
                        >
                            {/* Wallet balance card */}
                            <motion.div 
                                className="mb-8 p-6 bg-gradient-to-r from-red-700 to-red-800 rounded-xl shadow-md"
                                whileHover={{ y: -5 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-gray-100 text-sm mb-1">Available Balance</p>
                                        <h2 className="text-white text-3xl font-bold flex items-center">
                                            <Coins className="mr-2" size={28} />
                                            {wallet}
                                        </h2>
                                    </div>
                                    <CreditCard size={48} className="text-white opacity-50" />
                                </div>
                            </motion.div>
                            
                            <div className="grid md:grid-cols-2 gap-8">
                                {/* Left column - Amount input */}
                                <motion.div 
                                    className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <h3 className="text-xl font-semibold text-gray-800 mb-6">Withdrawal Amount</h3>
                                    
                                    <div className="space-y-4">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Enter Coins to Withdraw
                                        </label>
                                        <motion.div
                                            whileFocus={{ scale: 1.02 }}
                                            className="relative"
                                        >
                                            <Coins className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500" size={20} />
                                            <input
                                                value={amount}
                                                onChange={handleChange}
                                                type="text"
                                                id="amount"
                                                name="amount"
                                                placeholder="Minimum 500 coins required"
                                                className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                                            />
                                        </motion.div>
                                        
                                        {amount && parseInt(amount) < 500 && (
                                            <motion.p 
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="text-red-500 text-sm mt-1"
                                            >
                                                Minimum withdrawal amount is 500 coins
                                            </motion.p>
                                        )}
                                        
                                        <motion.button
                                            disabled={paymentVer}
                                            onClick={initiatePayment}
                                            className={`w-full py-3 px-4 rounded-lg shadow-sm text-white font-medium flex justify-center items-center gap-2 ${paymentVer ? 'bg-red-400 cursor-not-allowed' : 'bg-red-700 hover:bg-red-800'} transition-all duration-300`}
                                            whileHover={!paymentVer ? { scale: 1.02 } : {}}
                                            whileTap={!paymentVer ? { scale: 0.98 } : {}}
                                        >
                                            <Coins size={20} />
                                            Withdraw Coins
                                        </motion.button>
                                        
                                        {paymentVer && userInfo.accno && (
                                            <p className="text-gray-600 text-sm text-center mt-2">
                                                {amount ? "Minimum withdrawal amount is 500 coins" : "Please enter withdrawal amount"}
                                            </p>
                                        )}
                                        
                                        {!userInfo.accno && (
                                            <p className="text-yellow-600 text-sm text-center mt-2">
                                                You need to update your bank details first
                                            </p>
                                        )}
                                    </div>
                                </motion.div>
                                
                                {/* Right column - Bank details */}
                                <motion.div 
                                    className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                                    initial={{ x: 20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="text-xl font-semibold text-gray-800">Bank Details</h3>
                                        
                                        <motion.div
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <Link href={updated ? './contact' : './account'}>
                                                <button className="text-sm py-2 px-4 rounded-full bg-red-700 text-white hover:bg-red-800 shadow-sm transition-all">
                                                    Update Details
                                                </button>
                                            </Link>
                                        </motion.div>
                                    </div>
                                    
                                    {userInfo.accno ? (
                                        <div className="space-y-3 text-sm">
                                            <div className="flex justify-between border-b border-gray-100 pb-2">
                                                <span className="font-medium text-gray-600">Holder Name:</span>
                                                <span className="text-gray-800">{userInfo.accountHN || "Not provided"}</span>
                                            </div>
                                            <div className="flex justify-between border-b border-gray-100 pb-2">
                                                <span className="font-medium text-gray-600">Account Number:</span>
                                                <span className="text-gray-800">{userInfo.accno}</span>
                                            </div>
                                            <div className="flex justify-between border-b border-gray-100 pb-2">
                                                <span className="font-medium text-gray-600">IFSC Code:</span>
                                                <span className="text-gray-800">{userInfo.ifsc || "Not provided"}</span>
                                            </div>
                                            <div className="flex justify-between border-b border-gray-100 pb-2">
                                                <span className="font-medium text-gray-600">Branch:</span>
                                                <span className="text-gray-800">{userInfo.branch || "Not provided"}</span>
                                            </div>
                                            <div className="flex justify-between border-b border-gray-100 pb-2">
                                                <span className="font-medium text-gray-600">Mobile Number:</span>
                                                <span className="text-gray-800">{userInfo.phone || "Not provided"}</span>
                                            </div>
                                            <div className="flex justify-between pb-2">
                                                <span className="font-medium text-gray-600">UPI Number:</span>
                                                <span className="text-gray-800">{userInfo.UPINo || "Not provided"}</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <motion.div 
                                            className="flex flex-col items-center justify-center h-48"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.5 }}
                                        >
                                            <CreditCard size={48} className="text-red-200 mb-4" />
                                            <p className="text-gray-500 text-center mb-4">No bank details found. Please update your details to withdraw coins.</p>
                                            <motion.div
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <Link href={updated ? './contact' : './account'}>
                                                    <button className="py-2 px-6 rounded-full bg-red-700 text-white hover:bg-red-800 shadow-sm transition-all">
                                                        Add Bank Details
                                                    </button>
                                                </Link>
                                            </motion.div>
                                        </motion.div>
                                    )}
                                </motion.div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="history"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="p-6"
                        >
                            <h3 className="text-xl font-semibold text-gray-800 mb-6">Withdrawal History</h3>
                            
                            {updatedOrders.length === 0 ? (
                                <motion.div 
                                    className="flex flex-col items-center justify-center py-16 text-center"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <RefreshCw size={48} className="text-red-200 mb-4" />
                                    <p className="text-gray-500">Your withdrawal history is empty</p>
                                </motion.div>
                            ) : (
                                <motion.div 
                                    className="overflow-x-auto"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <table className="min-w-full bg-white">
                                        <thead>
                                            <tr className="bg-gray-50 border-b">
                                                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 tracking-wider">
                                                    Date & Time
                                                </th>
                                                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 tracking-wider">
                                                    Reference No
                                                </th>
                                                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 tracking-wider">
                                                    Coins
                                                </th>
                                                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 tracking-wider">
                                                    Status
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {updatedOrders.map((item, index) => (
                                                <motion.tr 
                                                    key={item._id}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.1 + index * 0.05 }}
                                                    className="hover:bg-gray-50"
                                                >
                                                    <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-700">
                                                        {item.createdAt.substring(0, 10)}, {item.time}
                                                    </td>
                                                    <td className="py-3 px-4 text-sm text-gray-700">
                                                        #{item.orderId}
                                                    </td>
                                                    <td className="py-3 px-4 text-sm text-gray-700">
                                                        <span className="font-medium flex items-center">
                                                            <Coins size={16} className="mr-1 text-red-500" />
                                                            {item.amount}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-4 text-sm">
                                                        {item.status === "Pending" && (
                                                            <span className="font-medium text-yellow-500 flex items-center">
                                                                {item.status}
                                                                {getStatusIcon(item.status)}
                                                            </span>
                                                        )}
                                                        {item.status === "Transferred" && (
                                                            <span className="font-medium text-green-700 flex items-center">
                                                                {item.status}
                                                                {getStatusIcon(item.status)}
                                                            </span>
                                                        )}
                                                        {item.status === "Loss" && (
                                                            <span className="font-medium text-red-700 flex items-center">
                                                                {item.status}
                                                                {getStatusIcon(item.status)}
                                                            </span>
                                                        )}
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
            
            {/* Footer note */}
            <motion.div 
                className="mt-8 text-center text-sm text-gray-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
            >
                Minimum withdrawal: 500 coins. Processing time: 24-48 hours.
            </motion.div>
        </motion.div>
    );
};

export default Withdrawal;