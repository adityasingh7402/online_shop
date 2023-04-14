import "../styles/globals.css";
import "../styles/responsive.css";
import LoadingBar from 'react-top-loading-bar'
import { useState, useEffect } from "react";
import { useRef } from "react";
import { CgClose } from "react-icons/cg";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const toggleCart = () => {
    if (ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-full");
      ref.current.classList.add("translate-x-0");
      document.body.style.overflowY = 'hidden';
    } else if (!ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-0");
      ref.current.classList.add("translate-x-full");
      document.body.style.overflowY = 'scroll';
    }
  };
  const ref = useRef();

  const [cart, setCart] = useState({});
  const [subTotal, setSubTotal] = useState(0);
  const [user, setuser] = useState({ value: null })
  const [key, setKey] = useState()
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      setProgress(40)
    })
    router.events.on('routeChangeComplete', () => {
      setProgress(100)
    })
    try {
      if (localStorage.getItem("cart")) {
        setCart(JSON.parse(localStorage.getItem("cart")));
        saveCart(JSON.parse(localStorage.getItem("cart")));
      }
    } catch (error) {
      console.error(error);
      localStorage.clear();
    }
    const myuser = JSON.parse(localStorage.getItem("myuser"))
    if (myuser) {
      setuser({ value: myuser.token, email: myuser.email })
    }
    setKey(Math.random())
  }, [router.query]);

  const logout = () => {
    localStorage.removeItem('myuser')
    setuser({ value: null })
    setKey(Math.random())
    router.push('/')
  }

  const saveCart = (myCart) => {
    localStorage.setItem("cart", JSON.stringify(myCart));
    let subt = 0;
    let keys = Object.keys(myCart);
    for (let i = 0; i < keys.length; i++) {
      subt += myCart[keys[i]].price * myCart[keys[i]].qty;
    }
    setSubTotal(subt);
  };
  const addToCart = (itemCode, qty, price, name, variant, image) => {
    let newCart = cart;
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty + qty
    } else {
      newCart[itemCode] = { qty: 1, price, name, variant, image };
    }
    setCart(newCart);
    saveCart(newCart);
  };
  const clearCart = () => {
    document.body.style.overflowY = 'scroll';
    toast.success('Your cart is cleared', {
      position: "top-left",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setCart({});
    saveCart({});
  };
  const removeFromCart = (itemCode, qty, price, name, variant, image) => {
    let newCart = cart;
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty - qty;
    }
    if (newCart[itemCode]["qty"] <= 0) {
      delete newCart[itemCode];
    }
    setCart(newCart);
    saveCart(newCart);
  };

  const deleteFromCart = (itemCode, qty, price, name, variant, image) => {
    let newCart = cart;
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty - cart[itemCode].qty;
    }
    if (newCart[itemCode]["qty"] <= 0) {
      delete newCart[itemCode];
    }
    setCart(newCart);
    saveCart(newCart);
  };



  const buyNow = (itemCode, qty, price, name, variant, image) => {
    let newCart = {}
    newCart[itemCode] = { qty: 1, price, name, variant, image }

    setCart(newCart)
    saveCart(newCart)
    router.push('/checkout')
  }

  return (
    <>
      <Component
        cart={cart}
        buyNow={buyNow}
        logout={logout}
        user={user}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        deleteFromCart={deleteFromCart}
        clearCart={clearCart}
        subTotal={subTotal}
        toggleCart={toggleCart}
        {...pageProps}
      />
    </>
  );
}

export default MyApp;
