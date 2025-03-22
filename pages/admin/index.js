import Head from "next/head";
import Link from "next/link";
import RandomNSchema from "../../modal/randomCard";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  PieChart, 
  Send, 
  Users, 
  ClipboardList, 
  CreditCard, 
  Award, 
  Wallet, 
  PlusCircle, 
  HelpCircle, 
  LogOut, 
  X 
} from "lucide-react";
import ChangeNum from "./changeNum";
import QueryCo from "./query";
import Orderr from './order';
import OrderrWi from "../../modal/Withdrawal";
import Usersss from "../../modal/User";
import addCoin from "../../modal/Addcoin";
import Query from "../../modal/Query";
import WinnerSelect from "./winnerSelect";
import Order from "../../modal/Order";
import mongoose from "mongoose";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home({ orders, randomNum, selectUser, selectUsers, winnOrder, withdrawals, addcoins, userss, Querys }) {
  const [isHidden, setIsHidden] = useState(true);
  const [active, setActive] = useState(""); 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const myuser = JSON.parse(localStorage.getItem("myuser"));
    const allowedEmails = process.env.NEXT_PUBLIC_ALLOWED_EMAILS?.split(',');
    if (!myuser || !allowedEmails?.includes(myuser.email)) {
      router.push('/');
    } else {
      setIsHidden(false);
    }
  }, []);

  if (isHidden) {
    return null;
  }

  const menuItems = [
    { id: "users", label: "Users", icon: <Users size={20} />, link: "/admin/Users" },
    { id: "Order", label: "Orders", icon: <ClipboardList size={20} /> },
    { id: "ChangeNum", label: "Change Card No", icon: <CreditCard size={20} /> },
    { id: "WinnerSelect", label: "Winner Select", icon: <Award size={20} /> },
    { id: "withdrawal", label: "Withdrawal Coins", icon: <Wallet size={20} />, link: "/admin/Withdrawal" },
    { id: "addcoin", label: "Adding Coins", icon: <PlusCircle size={20} />, link: "/admin/AddCoin" },
    { id: "Queryy", label: "Query", icon: <HelpCircle size={20} /> },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMenuClick = (itemId) => {
    setActive(itemId);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="overflow-hidden h-screen bg-gray-50">
      <Head>
        <title>Patti Circle - Win Win Game</title>
        <meta name="description" content="Patti Circle Win Win Game" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {/* Mobile Header */}
      <div className="md:hidden bg-red-800 text-white p-4 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xl font-bold"
        >
          Patti Circle
        </motion.div>
        <div className="flex items-center space-x-4">
          <button onClick={toggleMobileMenu} className="p-1">
            {isMobileMenuOpen ? <X size={24} /> : <PieChart size={24} />}
          </button>
          <Link href={'/'}>
            <button className="p-1">
              <LogOut size={24} />
            </button>
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-red-700 text-white"
          >
            <ul className="py-2">
              {menuItems.map((item) => (
                <li key={item.id} className="px-4 py-3">
                  {item.link ? (
                    <Link href={item.link}>
                      <div className="flex items-center space-x-3">
                        {item.icon}
                        <span>{item.label}</span>
                      </div>
                    </Link>
                  ) : (
                    <div 
                      onClick={() => handleMenuClick(item.id)}
                      className="flex items-center space-x-3 cursor-pointer"
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Return Home Button */}
      <Link href={'/'}>
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="hidden md:block fixed right-10 top-10 cursor-pointer text-white p-2 bg-red-800 rounded-full shadow-lg hover:bg-red-900 z-10"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <X size={24} />
        </motion.div>
      </Link>

      <div className="flex flex-col md:flex-row md:my-8 md:px-5 w-full">
        {/* Sidebar - Hidden on mobile */}
        <motion.div 
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="hidden md:block bg-red-800 w-64 rounded-lg py-8 px-5 shadow-lg h-min"
        >
          <ul className="flex flex-col">
            <li className="text-xl pb-5 font-medium text-white flex items-center">
              <PieChart className="mr-4" size={24} /> 
              <span>Inventory</span>
            </li>
            
            {menuItems.map((item) => (
              <li key={item.id}>
                {item.link ? (
                  <Link href={item.link}>
                    <div className="text-base pb-5 font-medium cursor-pointer hover:text-red-200 text-white flex items-center transition-colors duration-200">
                      <span className="mr-4">{item.icon}</span> {item.label}
                    </div>
                  </Link>
                ) : (
                  <div 
                    onClick={() => setActive(item.id)} 
                    className={`text-base pb-5 font-medium cursor-pointer hover:text-red-200 text-white flex items-center transition-colors duration-200 ${active === item.id ? 'text-red-200' : ''}`}
                  >
                    <span className="mr-4">{item.icon}</span> {item.label}
                  </div>
                )}
              </li>
            ))}
          </ul>
          
          <div className="h-px w-full bg-red-200 rounded-full my-6"></div>
          
          <Link href={'/'}>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2 border border-white w-full rounded-full hover:bg-red-900 text-white transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </motion.button>
          </Link>
        </motion.div>

        {/* Main Content */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="bg-white w-full md:w-5/6 text-gray-800 md:ml-5 rounded-lg shadow-md overflow-auto h-[calc(100vh-120px)] md:h-screen"
        >
          <AnimatePresence mode="wait">
            {active === "" && (
              <motion.div 
                key="admin-panel"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="flex justify-center items-center h-full"
              >
                <motion.div 
                  className="font-serif text-4xl md:text-6xl font-semibold text-red-800 text-center"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  Admin Panel
                </motion.div>
              </motion.div>
            )}
            
            {active === "Order" && (
              <motion.div
                key="order"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="p-4"
              >
                <Orderr orders={orders} />
              </motion.div>
            )}
            
            {active === "ChangeNum" && (
              <motion.div
                key="change-num"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="p-4"
              >
                <ChangeNum randomNum={randomNum} />
              </motion.div>
            )}
            
            {active === "Queryy" && (
              <motion.div
                key="query"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="p-4"
              >
                <QueryCo Querys={Querys} />
              </motion.div>
            )}
            
            {active === "WinnerSelect" && (
              <motion.div
                key="winner-select"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="p-4"
              >
                <WinnerSelect 
                  winnOrder={winnOrder} 
                  randomNum={randomNum} 
                  selectUser={selectUser} 
                  selectUsers={selectUsers} 
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  const orders = await Order.find();
  const withdrawals = await OrderrWi.find();
  const addcoins = await addCoin.find();
  const userss = await Usersss.find();
  const Querys = await Query.find();
  const winnOrder = await Order.find({
    winning: "Pending"
  });
  let randomNum = await RandomNSchema.findOne();
  
  return {
    props: { 
      orders: JSON.parse(JSON.stringify(orders)), 
      randomNum: JSON.parse(JSON.stringify(randomNum)), 
      winnOrder: JSON.parse(JSON.stringify(winnOrder)), 
      withdrawals: JSON.parse(JSON.stringify(withdrawals)), 
      addcoins: JSON.parse(JSON.stringify(addcoins)), 
      userss: JSON.parse(JSON.stringify(userss)), 
      Querys: JSON.parse(JSON.stringify(Querys)) 
    },
  };
}