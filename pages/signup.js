import React, { useState, useEffect } from 'react';
import { Home, Lock, Mail } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Image from 'next/image';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';

const Signup = () => {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [state, setState] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loadingS, setLoadingS] = useState(true);
  const [ageVerified, setAgeVerified] = useState(false);
  const [ageFalse, setAgeFalse] = useState(true);
  const [mobileValid, setMobileValid] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      router.push('/');
    }
  }, []);

  const handleCheckboxChange = (e) => {
    setAgeVerified(e.target.checked);
  };

  const handleChange = (e) => {
    if (e.target.name === 'name') {
      setName(e.target.value);
    }
    if (e.target.name === 'email') {
      setEmail(e.target.value.toLowerCase());
    }
    if (e.target.name === 'state') {
      setState(e.target.value);
    }
    if (e.target.name === 'phone') {
      setPhone(e.target.value);
      setTimeout(() => {
        if (e.target.value.length <= 9 || e.target.value.length >= 11) {
          setMobileValid(true);
        } else {
          setMobileValid(false);
        }
      }, 2000);
    }
    if (e.target.name === 'password') {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAgeFalse(false);
    if (ageVerified) {
      setLoadingS(false);
      const data = { name, email, phone, password, ageVerified, state };
      try {
        let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        let response = await res.json();

        if (response.success) {
          toast.success('Your account has been created', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setTimeout(() => {
            router.push('/login');
          }, 2000);
          setName('');
          setEmail('');
          setState('');
          setPhone('');
          setPassword('');
          setLoadingS(true);
        } else {
          toast.error(response.error, {
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
        setLoadingS(true);
        toast.error("An error occurred", {
          position: "top-center",
          autoClose: 2000,
        });
      }
    }
  };

  // Animation variants like login page
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
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <Head>
        <title>Patti Circle - Signup</title>
        <meta
          name="description"
          content="Patti Circle win win Game"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {/* Navigation button */}
      <motion.div
        className="fixed top-4 left-4 md:top-8 md:left-8 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Link href="/">
          <a className="group flex items-center gap-2 bg-red-900 hover:bg-white text-white hover:text-red-900 px-4 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-red-500/20">
            <Home size={20} className="transition-transform group-hover:scale-110" />
            <span className="font-medium hidden md:inline">Home</span>
          </a>
        </Link>
      </motion.div>

      {/* Loading indicator */}
      {loadingS === false && (
        <div className="fixed inset-0 bg-white/70 flex justify-center items-center z-40">
          <div className="text-red-900">
            <Image src="/loader.gif" width={50} height={50} alt="Loading..." />
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-0 flex justify-center items-center">
        {/* Main Card */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-md w-full"
        >
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-lg shadow-xl overflow-hidden"
          >
            {/* Adding the red background header like the login page */}
            <div className="bg-red-700 py-6">
              <motion.h2
                className="text-center text-3xl font-extrabold text-white"
                variants={itemVariants}
              >
                Create Account
              </motion.h2>
            </div>

            <div className="px-8 py-8">
              <form onSubmit={handleSubmit} method="POST">
                <motion.div
                  className="space-y-4"
                  variants={itemVariants}
                >
                  <div className="flex flex-col">
                    <label htmlFor="name" className="text-sm font-medium text-gray-700 mb-1">
                      Your name
                    </label>
                    <input
                      value={name}
                      onChange={handleChange}
                      type="text"
                      name="name"
                      id="name"
                      required
                      autoComplete="name"
                      placeholder="First and last name"
                      className="p-2.5 shadow-sm text-gray-600 text-base border rounded-md outline-none focus:ring-2 focus:ring-red-600 focus:border-red-700 border-gray-300"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        value={email}
                        onChange={handleChange}
                        type="email"
                        name="email"
                        id="email"
                        required
                        autoComplete="email"
                        placeholder="Email"
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-red-600 focus:border-red-700"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col relative">
                    <label htmlFor="phone" className="text-sm font-medium text-gray-700 mb-1">
                      Mobile phone
                    </label>
                    <input
                      value={phone}
                      onChange={handleChange}
                      type="number"
                      name="phone"
                      id="phone"
                      required
                      autoComplete="phone"
                      placeholder="Mobile phone"
                      className="p-2.5 shadow-sm text-gray-600 text-base border rounded-md outline-none focus:ring-2 focus:ring-red-600 focus:border-red-700 border-gray-300"
                    />
                    {mobileValid && (
                      <span className="text-red-700 text-sm absolute -bottom-5 right-0">
                        Enter a valid Mobile number
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col pt-2">
                    <label htmlFor="state" className="text-sm font-medium text-gray-700 mb-1">
                      State
                    </label>
                    <input
                      value={state}
                      onChange={handleChange}
                      type="text"
                      name="state"
                      id="state"
                      required
                      autoComplete="state"
                      placeholder="State"
                      className="p-2.5 shadow-sm text-gray-600 text-base border rounded-md outline-none focus:ring-2 focus:ring-red-600 focus:border-red-700 border-gray-300"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="password" className="text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        value={password}
                        onChange={handleChange}
                        type="password"
                        name="password"
                        id="password"
                        required
                        autoComplete="new-password"
                        placeholder="At least 6 characters"
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-red-600 focus:border-red-700"
                      />
                    </div>
                  </div>

                  <div className="flex items-center pt-2">
                    <input
                      type="checkbox"
                      name="ageVerification"
                      className="w-4 h-4 border-gray-300 rounded text-red-700 focus:ring-red-600"
                      id="ageVerification"
                      checked={ageVerified}
                      onChange={handleCheckboxChange}
                    />
                    <label
                      htmlFor="ageVerification"
                      className={`${!ageFalse ? 'font-bold text-red-700' : 'font-normal text-gray-700'} pl-2 text-sm`}
                    >
                      Please confirm that you are 21+ years old
                    </label>
                  </div>
                </motion.div>

                <motion.div
                  className="mt-6"
                  variants={itemVariants}
                >
                  <button
                    type="submit"
                    disabled={mobileValid}
                    className="group relative w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-300 disabled:bg-red-500 disabled:hover:text-white disabled:hover:bg-red-500"
                  >
                    {loadingS === false ? 'WAIT' : 'CONTINUE'}
                    <span className="absolute left-4 flex items-center">
                      <Lock size={18} />
                    </span>
                  </button>
                </motion.div>
              </form>

              <motion.div
                className="mt-6 text-center"
                variants={itemVariants}
              >
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">
                      Already have an account?
                    </span>
                  </div>
                </div>

                <div className="mt-4">
                  <Link href="/login">
                    <a className="text-red-700 hover:text-red-800 font-medium transition-colors">
                      Sign in
                    </a>
                  </Link>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        className="text-center text-sm text-gray-400 py-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <p>Play responsibly. Terms and conditions apply.</p>
      </motion.div>
    </div>
  );
};

export default Signup;