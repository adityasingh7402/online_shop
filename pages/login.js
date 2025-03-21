import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from "next/router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';
import { Lock, Home, ArrowRight, Mail } from 'lucide-react';

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (localStorage.getItem('myuser')) {
      router.push('/');
    }
  }, [router]);

  const handleChange = (e) => {
    if (e.target.name === 'email') {
      setEmail(e.target.value.toLowerCase());
    }
    if (e.target.name === 'password') {
      setPassword(e.target.value);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const data = { email, password };
    try {
      let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      let response = await res.json();
      
      if (response.success) {
        localStorage.setItem("myuser", JSON.stringify({ 
          token: response.token, 
          email: response.email, 
          name: response.name 
        }));
        
        toast.success('You are successfully logged in', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        
        setTimeout(() => {
          router.push(process.env.NEXT_PUBLIC_HOST);
        }, 2000);
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
      toast.error("Something went wrong. Please try again.", {
        position: "top-center",
        autoClose: 2000,
      });
    } finally {
      setLoading(false);
      setEmail('');
      setPassword('');
    }
  }

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
      transition: { duration: 0.5 }
    }
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: { 
      scale: 1.05,
      boxShadow: "0px 5px 15px rgba(220, 38, 38, 0.2)",
      transition: { duration: 0.3 }
    },
    tap: { scale: 0.95 }
  };

  if (!mounted) return null;

  return (
    <>
      <Head>
        <title>Patti Circle - Login</title>
        <meta
          name="description"
          content="Patti Circle win win Game"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8 py-12">
        {loading && (
          <div className="fixed inset-0 bg-white bg-opacity-75 flex justify-center items-center z-50">
            <Image src="/loader.gif" width={80} height={80} alt="Loading" />
          </div>
        )}
        
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
        
        <motion.div
          className="max-w-md w-full"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div 
            className="bg-white rounded-lg shadow-xl overflow-hidden"
            variants={itemVariants}
          >
            <div className="bg-red-700 py-6">
              <motion.h2 
                className="text-center text-3xl font-extrabold text-white"
                variants={itemVariants}
              >
                Sign in to Patti Circle
              </motion.h2>
            </div>
            
            <div className="px-6 py-8 sm:px-10">
              <motion.form 
                className="space-y-6" 
                onSubmit={handleSubmit}
                variants={itemVariants}
              >
                <motion.div variants={itemVariants}>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 transition duration-150 ease-in-out sm:text-sm"
                      placeholder="Enter your email"
                    />
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 transition duration-150 ease-in-out sm:text-sm"
                      placeholder="At least 6 characters"
                    />
                  </div>
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <p className="text-xs text-gray-500">
                    By continuing, you agree to Patti Circle's Conditions of Use and Privacy Notice.
                  </p>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <motion.button
                    type="submit"
                    className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    disabled={loading}
                  >
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                      <Lock className="h-5 w-5 text-red-300 group-hover:text-red-200" />
                    </span>
                    {loading ? "Signing in..." : "Sign in"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </motion.button>
                </motion.div>
              </motion.form>

              <motion.div 
                className="mt-6"
                variants={itemVariants}
              >
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">
                      Don't have an account?
                    </span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-3">
                  <motion.div
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Link href="/signup">
                      <a className="w-full flex items-center justify-center px-4 py-2 border border-red-700 rounded-md shadow-sm text-sm font-medium text-red-700 bg-white hover:bg-red-50 transition-all duration-200">
                        Create an account
                      </a>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
              
              <motion.div 
                className="mt-8 flex justify-center"
                variants={itemVariants}
              >
                <motion.div
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Link href="/">
                    <a className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200">
                      <Home className="mr-2 h-5 w-5" />
                      Back to Home
                    </a>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default Login;