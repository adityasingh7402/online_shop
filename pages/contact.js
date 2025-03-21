import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from "framer-motion";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  ArrowLeft, 
  Send, 
  Loader2, 
  Mail, 
  Phone, 
  MapPin, 
  User, 
  MessageSquare,
  MailCheck
} from "lucide-react";
import Image from "next/image";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  // Form validation
  useEffect(() => {
    if (name && email && message && phone) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [name, email, message, phone]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') setName(value);
    else if (name === 'email') setEmail(value);
    else if (name === 'phone') setPhone(value);
    else if (name === 'message') setMessage(value);
  };

  const submitQuery = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      let data = { name, email, message, phone };
      let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/addquery`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      let res = await a.json();
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
      
      toast.success('Message sent successfully!', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      toast.error('Something went wrong. Please try again.', {
        position: "top-center",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        duration: 0.5 
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const buttonVariants = {
    hover: { 
      scale: 1.05,
      boxShadow: "0px 5px 15px rgba(220, 38, 38, 0.3)",
      transition: { type: "spring", stiffness: 400, damping: 10 }
    },
    tap: { scale: 0.95 }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Head>
        <title>Patti Circle - Contact Us</title>
        <meta
          name="description"
          content="Contact Patti Circle for any questions or support - win win Game"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Red top banner */}
      <div className="bg-red-800 h-16 md:h-20 w-full absolute top-0 left-0"></div>

      {/* Back button */}
      <div className="fixed right-4 md:right-10 top-6 z-10">
        <Link href="/">
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 hover:bg-red-700 text-red-800 hover:text-white border border-red-600 transition-all shadow-md"
          >
            <ArrowLeft size={18} />
            <span className="font-medium">Go Back</span>
          </motion.a>
        </Link>
      </div>

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

      {/* Loading spinner */}
      {loading && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-white bg-opacity-75 flex justify-center items-center z-50"
        >
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          >
            <Loader2 size={50} className="text-red-800" />
          </motion.div>
        </motion.div>
      )}

      <div className="container mx-auto px-4 md:px-6 pt-28 pb-20">
        <div className="flex flex-col lg:flex-row gap-12 items-center justify-between">
          
          {/* Left side - Contact form */}
          <motion.div 
            className="w-full lg:w-1/2"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div
              className="flex items-center gap-3 mb-8"
              variants={itemVariants}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-red-800">Contact Us</h1>
            </motion.div>
            
            <motion.form 
              onSubmit={submitQuery}
              className="space-y-5"
              variants={containerVariants}
            >
              <motion.div variants={itemVariants} className="relative">
                <div className="absolute left-4 top-4 text-red-800">
                  <User size={20} />
                </div>
                <input 
                  value={name} 
                  onChange={handleChange} 
                  type="text" 
                  id="name" 
                  name="name" 
                  placeholder="Your Name / User Name" 
                  required 
                  className="w-full p-4 pl-12 outline-none focus:ring-2 focus:ring-red-600 rounded-lg bg-white text-gray-800 border border-gray-300 transition-all"
                />
              </motion.div>
              
              <motion.div variants={itemVariants} className="relative">
                <div className="absolute left-4 top-4 text-red-800">
                  <Phone size={20} />
                </div>
                <input 
                  value={phone} 
                  onChange={handleChange} 
                  type="number" 
                  id="phone" 
                  name="phone" 
                  placeholder="Mobile No" 
                  required 
                  className="w-full p-4 pl-12 outline-none focus:ring-2 focus:ring-red-600 rounded-lg bg-white text-gray-800 border border-gray-300 transition-all" 
                />
              </motion.div>
              
              <motion.div variants={itemVariants} className="relative">
                <div className="absolute left-4 top-4 text-red-800">
                  <Mail size={20} />
                </div>
                <input 
                  value={email} 
                  onChange={handleChange} 
                  type="email" 
                  id="email" 
                  name="email" 
                  placeholder="Your Email" 
                  required 
                  className="w-full p-4 pl-12 outline-none focus:ring-2 focus:ring-red-600 rounded-lg bg-white text-gray-800 border border-gray-300 transition-all" 
                />
              </motion.div>
              
              <motion.div variants={itemVariants} className="relative">
                <div className="absolute left-4 top-4 text-red-800">
                  <MessageSquare size={20} />
                </div>
                <textarea 
                  value={message} 
                  onChange={handleChange} 
                  id="message" 
                  name="message" 
                  placeholder="Message" 
                  required 
                  rows="4" 
                  className="w-full p-4 pl-12 resize-none outline-none focus:ring-2 focus:ring-red-600 rounded-lg bg-white text-gray-800 border border-gray-300 transition-all"
                />
              </motion.div>
              
              <motion.div
                variants={itemVariants}
                className="flex justify-start"
              >
                <motion.button 
                  type="submit"
                  disabled={disabled}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="flex items-center gap-2 font-medium rounded-full disabled:bg-red-300 disabled:cursor-not-allowed bg-red-600 px-8 py-4 hover:bg-red-700 text-white border-none transition-all shadow-lg"
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>SENDING...</span>
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      <span>SEND MESSAGE</span>
                    </>
                  )}
                </motion.button>
              </motion.div>
            </motion.form>
          </motion.div>
          
          {/* Right side - Info */}
          <motion.div 
            className="w-full lg:w-2/5"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="bg-red-800 p-8 rounded-xl border border-red-800 text-white shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <MailCheck size={24} />
                <h2 className="text-2xl font-bold">Get In Touch</h2>
              </div>
              
              <div className="space-y-6">
                <motion.div 
                  className="flex items-start gap-4"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <MapPin size={22} className="mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Our Address</h3>
                    <p className="text-white text-opacity-90">123 Gaming Street, Digital City, PC 12345</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-start gap-4"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Mail size={22} className="mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Email Us</h3>
                    <p className="text-white text-opacity-90">support@patticircle.com</p>
                    <p className="text-white text-opacity-90">info@patticircle.com</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-start gap-4"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Phone size={22} className="mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Call Us</h3>
                    <p className="text-white text-opacity-90">+1 (555) 123-4567</p>
                    <p className="text-white text-opacity-90">+1 (555) 987-6543</p>
                  </div>
                </motion.div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
                  <div className="flex gap-5 mt-2">
                    <motion.a 
                      href="#" 
                      whileHover={{ scale: 1.2, y: -5 }}
                      className="bg-white text-red-800 p-2 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <Facebook size={22} />
                    </motion.a>
                    <motion.a 
                      href="#" 
                      whileHover={{ scale: 1.2, y: -5 }}
                      className="bg-white text-red-800 p-2 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <Twitter size={22} />
                    </motion.a>
                    <motion.a 
                      href="#" 
                      whileHover={{ scale: 1.2, y: -5 }}
                      className="bg-white text-red-800 p-2 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <Instagram size={22} />
                    </motion.a>
                  </div>
                </div>
              </div>
              
              <motion.div 
                className="mt-8 p-4 bg-white bg-opacity-10 rounded-lg border border-white border-opacity-20"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <p className="text-white text-opacity-90 text-sm">
                  We value your feedback and are here to help! Our support team is available 24/7 to answer any questions you may have about Patti Circle.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;