import "../styles/globals.css";
import "../styles/responsive.css";
import Footer from "./componenat/Footer";
import Header from "./componenat/Header";
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



  const buyNow = (itemCode, qty, price, name, variant, image) => {
    let newCart = {}
    newCart[itemCode] = { qty: 1, price, name, variant, image }

    setCart(newCart)
    saveCart(newCart)
    router.push('/checkout')
  }

  return (
    <>
      {key && <Header
        logout={logout}
        key={key}
        user={user}
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        subTotal={subTotal}
        toggleCart={toggleCart}
      />}
      <div
        ref={ref}
        className={`cart-sideBar shadow-2xl overflow-y-scroll fixed top-0 bottom-0 right-0 w-2/5 cardWidth catoBack indexZMax transform transition-transform ${Object.keys(cart).length !== 0 ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div
          onClick={toggleCart}
          className="close absolute top-3 right-3 cursor-pointer text-3xl text-gray-600"
        >
          <CgClose />
        </div>
        <div className="products flex flex-col w-full bg-white text-sm pt-8">
          {Object.keys(cart).length == 0 && (
            <div className="flex justify-center text-4xl text-green-700 py-10 items-center border-t border-b border-gray-200">
              Your cart is Empty...!
            </div>
          )}
          <p className="text-2xl font-normal text-gray-800 border-b border-gray-200 rounded-sm py-2 px-5 shadow-sm">
            Your Item
          </p>
          {Object.keys(cart).map((k) => {
            return (
              <div
                key={k}
                className="product flex flex-row w-full border-b-2 border-gray-300 p-3"
              >
                <div className="product-image w-1/5 imageWidt flex justify-center overflow-hidden">
                  <Image
                    alt="ecommerce"
                    className="block"
                    src={cart[k].image}
                    width={200}
                    height={150}
                  />
                </div>
                <div className="product-text flex pl-5 flex-col">
                  <h1 className="text-xl font-medium">{cart[k].name}</h1>
                  <p className="text-lg">{cart[k].variant}</p>
                  <div className="impTool mt-4 flex flex-row">
                    <div className="qytselet relative flex border-r border-gray-200 px-3 items-center">
                      <AiOutlineMinusCircle
                        onClick={() => {
                          removeFromCart(
                            k,
                            1,
                            cart[k].price,
                            cart[k].name,
                            cart[k].variant,
                            cart[k].image
                          );
                        }}
                        className="text-3xl font-normal cursor-pointer mr-2"
                      />
                      <div className="qyantity w-11 rounded-sm text-center text-base h-7 border border-gray-600">
                        {cart[k].qty}
                      </div>
                      <AiOutlinePlusCircle
                        onClick={() => {
                          addToCart(
                            k,
                            1,
                            cart[k].price,
                            cart[k].name,
                            cart[k].variant,
                            cart[k].image
                          );
                        }}
                        className="text-3xl font-normal cursor-pointer ml-2"
                      />
                    </div>
                    <div className="qytselet relative flex border-r border-gray-200 text-green-700 cursor-pointer hover:bg-gray-100 font-medium px-3 items-center">
                      <p>Delete</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="flex items-center justify-between px-5">
            <button
              onClick={clearCart}
              className="flex text-white font-medium text-sm rounded-full bg-red-700 justify-center w-28 my-2  py-2 hover:text-gray-800 hover:bg-white border transition-all border-red-700"
            >
              <p>Clear Cart</p>
            </button>
            <div className="subtotal text-2xl text-gray-700 font-medium">
              Subtotal : ₹{subTotal}
            </div>
          </div>
          <div className="flex justify-end">
            <Link href={"../checkout"}>
              <button
                onClick={toggleCart}
                className="flex text-white font-medium text-sm rounded-full bg-green-700 justify-center px-5 mb-4 mr-3 items-center py-2 hover:text-gray-800 hover:bg-white border transition-all border-green-700"
              >
                <p>Go to Cart </p>
                <span className="text-lg pl-2 font-medium">
                  <AiOutlineShoppingCart />
                </span>
              </button>
            </Link>
          </div>
        </div>
      </div>
      <LoadingBar
        color='#045c15'
        progress={progress}
        waitingTime={400}
        onLoaderFinished={() => setProgress(0)}
      />
      <Component
        cart={cart}
        buyNow={buyNow}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        subTotal={subTotal}
        toggleCart={toggleCart}
        {...pageProps}
      />
      <Footer />
    </>
  );
}

export default MyApp;
