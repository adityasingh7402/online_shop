import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import {
  CreditCard as CardIcon,
  LockKeyhole,
  Home,
  User,
  Mail,
  Phone,
  Landmark,
  Briefcase,
  CreditCard,
  Key,
} from "lucide-react";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import Head from "next/head";

const Account = () => {
  const [name, setname] = useState("");
  const [phone, setphone] = useState("");
  const [accountHN, setaccountHN] = useState("");
  const [accno, setaccno] = useState("");
  const [email, setemail] = useState("");
  const [bankName, setbankName] = useState("");
  const [branch, setbranch] = useState("");
  const [upiId, setupiId] = useState("");
  const [ifsc, setifsc] = useState("");
  const [user, setuser] = useState({ value: null });
  const [mobilevalid, setmobilevalid] = useState(true);
  const [currentPass, setcurrentPass] = useState("");
  const [newPass, setnewPass] = useState("");
  const [ReEnter, setReEnter] = useState("");
  const [dispayName, setdispayName] = useState("");
  const [lodingS, setlodingS] = useState(true);
  const [lodingSS, setlodingSS] = useState(true);
  const [updated, setupdated] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [activeTab, setActiveTab] = useState("personal");

  const router = useRouter();

  useEffect(() => {
    const myuser = JSON.parse(localStorage.getItem("myuser"));
    if (!myuser) {
      router.push("/");
    } else {
      setIsHidden(false);
    }
    if (myuser && myuser.token) {
      setuser(myuser);
      setemail(myuser.email);
      fetchdata(myuser.token);
      setdispayName(myuser.name);
    }
  }, []);

  const fetchdata = async (token) => {
    setlodingS(false);
    let data = { token: token };
    try {
      let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      let res = await a.json();
      setphone(res.phone || "");
      setaccountHN(res.accountHN || "");
      setbranch(res.branch || "");
      setbankName(res.bankName || "");
      setupiId(res.UPINo || "");
      setname(res.name || "");
      setifsc(res.ifsc || "");
      setupdated(res.updated || false);
      setaccno(res.accno || "");
    } catch (error) {
      toast.error("Failed to fetch user data", {
        position: "top-center",
        autoClose: 2000,
      });
    } finally {
      setlodingS(true);
    }
  };

  const handleUserSubmit = async () => {
    if (!mobilevalid) {
      toast.error("Please enter a valid mobile number", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }

    setlodingS(false);
    let data = {
      token: user.token,
      accountHN,
      phone,
      name,
      accno,
      ifsc,
      email,
      bankName,
      branch,
      upiId,
    };

    try {
      let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      let res = await a.json();

      if (res.success) {
        toast.success("Successfully Updated Details", {
          position: "top-center",
          autoClose: 2000,
        });
      } else {
        toast.error(res.error, {
          position: "top-center",
          autoClose: 2000,
        });
      }
    } catch (error) {
      toast.error("Failed to update details", {
        position: "top-center",
        autoClose: 2000,
      });
    } finally {
      setlodingS(true);
    }
  };

  const handlePasswordSubmit = async () => {
    if (!currentPass || !newPass || !ReEnter) {
      toast.error("Please fill all password fields", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }

    if (newPass !== ReEnter) {
      toast.error("New Password is not matching with Re-type Password", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }

    setlodingSS(false);

    try {
      let data = { token: user.token, ReEnter, newPass, currentPass };
      let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updatepassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      let res = await a.json();

      if (res.success) {
        toast.success("Successfully Updated Password", {
          position: "top-center",
          autoClose: 2000,
        });
        setnewPass("");
        setcurrentPass("");
        setReEnter("");
      } else {
        toast.error("Wrong Password", {
          position: "top-center",
          autoClose: 2000,
        });
      }
    } catch (error) {
      toast.error("Failed to update password", {
        position: "top-center",
        autoClose: 2000,
      });
    } finally {
      setlodingSS(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "name":
        setname(value);
        break;
      case "phone":
        setphone(value);
        if (value.length !== 10) {
          setmobilevalid(false);
        } else {
          setmobilevalid(true);
        }
        break;
      case "accountHN":
        setaccountHN(value);
        break;
      case "ifsc":
        setifsc(value);
        break;
      case "bankName":
        setbankName(value);
        break;
      case "accno":
        setaccno(value);
        break;
      case "upiId":
        setupiId(value);
        break;
      case "branch":
        setbranch(value);
        break;
      case "currentPass":
        setcurrentPass(value);
        break;
      case "newPass":
        setnewPass(value);
        break;
      case "ReEnter":
        setReEnter(value);
        break;
      default:
        break;
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3 },
    },
  };

  const btnHover = {
    rest: { scale: 1 },
    hover: { scale: 1.05, transition: { duration: 0.2 } },
  };

  if (isHidden) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Patti Circle - Account</title>
        <meta
          name="description"
          content="Patti Circle win win Game - Manage your account"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-10 px-4 sm:px-6 lg:px-8">
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />

        {!lodingS && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-30 z-50 flex justify-center items-center"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white p-6 rounded-lg shadow-xl flex flex-col items-center"
            >
              <Image src="/loader.gif" width={80} height={80} alt="Loading" />
              <p className="mt-4 text-lg font-medium text-gray-700">
                Loading your information...
              </p>
            </motion.div>
          </motion.div>
        )}

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="max-w-7xl mx-auto"
        >
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left sidebar */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="lg:w-1/4 bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-6 bg-gradient-to-r from-red-600 to-red-700 text-white">
                <User className="h-12 w-12 mb-3" />
                <h3 className="text-lg font-medium">Hello,</h3>
                <h2 className="text-2xl font-bold truncate">{dispayName}</h2>
              </div>

              <div className="p-4">
                <nav className="space-y-2">
                  <motion.button
                    whileHover={{ x: 5 }}
                    onClick={() => setActiveTab("personal")}
                    className={`w-full flex items-center cursor-pointer p-3 rounded-md text-left transition-colors ${activeTab === "personal"
                        ? "bg-red-50 text-red-700"
                        : "hover:bg-gray-50"
                      }`}
                  >
                    <User className="mr-3 h-5 w-5" />
                    <span className="font-medium">Personal Information</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ x: 5 }}
                    onClick={() => setActiveTab("password")}
                    className={`w-full flex items-center p-3 cursor-pointer rounded-md text-left transition-colors ${activeTab === "password"
                        ? "bg-red-50 text-red-700"
                        : "hover:bg-gray-50"
                      }`}
                  >
                    <LockKeyhole className="mr-3 h-5 w-5" />
                    <span className="font-medium">Change Password</span>
                  </motion.button>

                  <Link href="/" passHref>
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="w-full flex cursor-pointer items-center p-3 rounded-md text-left transition-colors hover:bg-gray-50"
                    >
                      <Home className="mr-3 h-5 w-5" />
                      <span className="font-medium">Home Page</span>
                    </motion.div>
                  </Link>
                </nav>
              </div>
            </motion.div>

            {/* Main content */}
            <div className="lg:w-3/4">
              <AnimatePresence mode="wait">
                {activeTab === "personal" && (
                  <motion.div
                    key="personal"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={fadeIn}
                    className="bg-white rounded-lg shadow-md overflow-hidden"
                  >
                    <div className="border-b border-gray-200">
                      <div className="px-6 py-4 flex items-center">
                        <User className="h-6 w-6 text-red-600 mr-3" />
                        <h2 className="text-2xl font-bold text-gray-800">
                          Personal Information
                        </h2>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <User className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              value={name}
                              onChange={handleChange}
                              type="text"
                              name="name"
                              id="name"
                              className="pl-10 w-full rounded-md border border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200 focus:ring-opacity-50 py-2"
                              placeholder="Enter your full name"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                            10-digit Mobile Number
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Phone className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              value={phone}
                              onChange={handleChange}
                              type="number"
                              name="phone"
                              id="phone"
                              className={`pl-10 w-full rounded-md border shadow-sm py-2 focus:ring focus:ring-opacity-50 ${!mobilevalid ? "border-red-500 focus:border-red-500 focus:ring-red-200" : "border-gray-300 focus:border-red-500 focus:ring-red-200"}`}
                              placeholder="Enter your mobile number"
                            />
                          </div>
                          {!mobilevalid && (
                            <motion.p
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="text-red-600 text-sm mt-1"
                            >
                              Please enter a valid 10-digit mobile number
                            </motion.p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Mail className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              value={email}
                              readOnly={email}
                              onChange={handleChange}
                              type="email"
                              name="email"
                              id="email"
                              className="pl-10 w-full rounded-md border border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200 focus:ring-opacity-50 py-2 bg-gray-50"
                              placeholder="Enter your email address"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="bankName" className="block text-sm font-medium text-gray-700">Bank Name</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Landmark className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              value={bankName}
                              onChange={handleChange}
                              type="text"
                              name="bankName"
                              id="bankName"
                              className="pl-10 w-full rounded-md border border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200 focus:ring-opacity-50 py-2"
                              placeholder="Enter your bank name"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="accountHN" className="block text-sm font-medium text-gray-700">Account Holder Name</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <User className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              value={accountHN}
                              onChange={handleChange}
                              type="text"
                              name="accountHN"
                              id="accountHN"
                              className="pl-10 w-full rounded-md border border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200 focus:ring-opacity-50 py-2"
                              placeholder="Enter account holder name"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="accno" className="block text-sm font-medium text-gray-700">Account Number</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <CardIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              value={accno}
                              onChange={handleChange}
                              type="number"
                              name="accno"
                              id="accno"
                              className="pl-10 w-full rounded-md border border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200 focus:ring-opacity-50 py-2"
                              placeholder="Enter your account number"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="ifsc" className="block text-sm font-medium text-gray-700">IFSC Code</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <CreditCard className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              value={ifsc}
                              onChange={handleChange}
                              type="text"
                              name="ifsc"
                              id="ifsc"
                              className="pl-10 w-full rounded-md border border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200 focus:ring-opacity-50 py-2"
                              placeholder="Enter IFSC code"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="branch" className="block text-sm font-medium text-gray-700">Branch Name</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Briefcase className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              value={branch}
                              onChange={handleChange}
                              type="text"
                              name="branch"
                              id="branch"
                              className="pl-10 w-full rounded-md border border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200 focus:ring-opacity-50 py-2"
                              placeholder="Enter branch name"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="upiId" className="block text-sm font-medium text-gray-700">UPI ID (Optional)</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <CreditCard className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              value={upiId}
                              onChange={handleChange}
                              type="text"
                              name="upiId"
                              id="upiId"
                              className="pl-10 w-full rounded-md border border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200 focus:ring-opacity-50 py-2"
                              placeholder="Enter your UPI ID (optional)"
                            />
                          </div>
                        </div> 
                      </div>

                      <div className="mt-8 flex justify-center">
                        {!updated ? (
                          <motion.button
                            whileHover="hover"
                            whileTap={{ scale: 0.95 }}
                            variants={btnHover}
                            onClick={handleUserSubmit}
                            disabled={!mobilevalid || !lodingS}
                            className="px-8 py-3 bg-gradient-to-r from-red-600 cursor-pointer to-red-700 text-white font-medium rounded-full shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed transform transition-all duration-200 flex items-center"
                          >
                            {!lodingS ? (
                              <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Updating...
                              </>
                            ) : (
                              "Update Information"
                            )}
                          </motion.button>
                        ) : (
                          <Link href="./contact">
                            <motion.a
                              whileHover="hover"
                              whileTap={{ scale: 0.95 }}
                              variants={btnHover}
                              className="px-8 py-3 bg-gradient-to-r cursor-pointer from-red-600 to-red-700 text-white font-medium rounded-full shadow-md hover:shadow-lg transform transition-all duration-200"
                            >
                              Contact For Updates
                            </motion.a>
                          </Link>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "password" && (
                  <motion.div
                    key="password"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={fadeIn}
                    className="bg-white rounded-lg shadow-md overflow-hidden"
                  >
                    <div className="border-b border-gray-200">
                      <div className="px-6 py-4 flex items-center">
                        <LockKeyhole className="h-6 w-6 text-red-600 mr-3" />
                        <h2 className="text-2xl font-bold text-gray-800">
                          Change Password
                        </h2>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2 md:col-span-2">
                          <label htmlFor="currentPass" className="block text-sm font-medium text-gray-700">Current Password</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Key className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              value={currentPass}
                              onChange={handleChange}
                              type="password"
                              name="currentPass"
                              id="currentPass"
                              className="pl-10 w-full rounded-md border border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200 focus:ring-opacity-50 py-2"
                              placeholder="Enter your current password"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="newPass" className="block text-sm font-medium text-gray-700">New Password</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Key className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              value={newPass}
                              onChange={handleChange}
                              type="password"
                              name="newPass"
                              id="newPass"
                              className="pl-10 w-full rounded-md border border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200 focus:ring-opacity-50 py-2"
                              placeholder="Enter new password"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="ReEnter" className="block text-sm font-medium text-gray-700">Re-type New Password</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Key className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              value={ReEnter}
                              onChange={handleChange}
                              type="password"
                              name="ReEnter"
                              id="ReEnter"
                              className={`pl-10 w-full rounded-md border shadow-sm focus:ring focus:ring-opacity-50 py-2 ${newPass && ReEnter && newPass !== ReEnter ? "border-red-500 focus:border-red-500 focus:ring-red-200" : "border-gray-300 focus:border-red-500 focus:ring-red-200"}`}
                              placeholder="Re-type new password"
                            />
                          </div>
                          {newPass && ReEnter && newPass !== ReEnter && (
                            <motion.p
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="text-red-600 text-sm mt-1"
                            >
                              Passwords do not match
                            </motion.p>
                          )}
                        </div>
                      </div>

                      <div className="mt-8 flex justify-center">
                        <motion.button
                          whileHover="hover"
                          whileTap={{ scale: 0.95 }}
                          variants={btnHover}
                          onClick={handlePasswordSubmit}
                          disabled={!lodingSS}
                          className="px-8 py-3 bg-gradient-to-r from-red-600 cursor-pointer to-red-700 text-white font-medium rounded-full shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed transform transition-all duration-200 flex items-center"
                        >
                          {!lodingSS ? (
                            <>
                              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Changing Password...
                            </>
                          ) : (
                            "Change Password"
                          )}
                        </motion.button>
                      </div>

                      <div className="mt-6 flex justify-center cursor-pointer">
                        <Link href="/">
                          <motion.a
                            whileHover="hover"
                            whileTap={{ scale: 0.95 }}
                            variants={btnHover}
                          >
                            Back to Home
                          </motion.a>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Account;