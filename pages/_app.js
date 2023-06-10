import "../styles/globals.css";
import "../styles/responsive.css";
import { useState, useEffect } from "react";
import { useRef } from "react";
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
  const [selectUserss, setselectUserss] = useState({});
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
      if (localStorage.getItem("selectUserss")) {
        setselectUserss(JSON.parse(localStorage.getItem("selectUserss")));
        saveselectUser(JSON.parse(localStorage.getItem("selectUserss")));
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
    router.reload();
    router.push('/')
  }

  const saveCart = (myCart) => {
    localStorage.setItem("cart", JSON.stringify(myCart));
    let subt = 0;
    let keys = Object.keys(myCart);
    for (let i = 0; i < keys.length; i++) {
      subt += myCart[keys[i]].price * myCart[keys[i]].qty;
    }
  };
  const saveselectUser = (selectUserss) => {
    localStorage.setItem("selectUserss", JSON.stringify(selectUserss));
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



  const buyNow = (randomNum, cardno) => {
    let newCart = {}
    newCart = { randomNum, cardno }
    setCart(newCart)
    saveCart(newCart)
  }
  const selectUser = (randomNum, cardno) => {
    let selectUsers = {}
    selectUsers = { randomNum, cardno }
    setselectUserss(selectUsers);
    saveselectUser(selectUsers)
  }

  return (
    <>
      <Component
        cart={cart}
        buyNow={buyNow}
        logout={logout}
        user={user}
        selectUser={selectUser}
        selectUsers={selectUserss}
        clearCart={clearCart}
        toggleCart={toggleCart}
        {...pageProps}
      />
    </>
  );
}

export default MyApp;
