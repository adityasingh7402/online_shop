import { useRouter } from "next/router";
import Image from "next/image";
import { useState } from "react";
import Product from "../../modal/Product";
import Error from "next/error";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { AiOutlineMinusCircle } from "react-icons/ai";
import mongoose from "mongoose";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Post = ({ cart, addToCart, toggleCart, product, buyNow, error }) => {
  const router = useRouter();
  const { slug } = router.query;
  const [pin, setPin] = useState();
  const [service, setService] = useState();
  const checkServiceablity = async () => {
    let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
    let pinJson = await pins.json();
    if (Object.keys(pinJson).includes(pin)) {
      setService(true);
      toast.success('Delivery is available in your area', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      setService(false);
      toast.error('Sorry..! delivery is not available in your area!', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  const onChangePin = (e) => {
    setPin(e.target.value);
  };
  if (error == 404) {
    return <Error statusCode={404} />
  }

  return (
    <>
      <section className="text-gray-600 body-font overflow-hidden">
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
        <div className="px-5 py-20 productTP mx-auto">
          <div className="mx-auto flex justify-center items-center productFle">
            <div className="image w-1/2 pr-10 propad h-96 flex justify-end items-center">
              <img className="w-96" src={`/${product.img}`} alt={product.title} />
            </div>
            <div className="pl-10 w-1/2 flex justify-start producDetail flex-col py-6 propad mt-0 relative">
              <h2 className="text-base title-font text-gray-500 tracking-widest">
                {product.category}
              </h2>
              <h1 className="text-gray-900 text-4xl title-font font-medium pb-5 border-gray-200">
                {product.title}-{product.size}
              </h1>
              <p className="leading-relaxed w-3/5 py-2 mb-3 border-b border-t border-gray-200">
                {product.desc}
              </p>
              <p className="leading-relaxed py-2">
                {product.availableQty == 0 ? <span className="font-medium text-xl">Out of stock!</span> : <span>Total Stock: {product.availableQty}</span>}
              </p>
              <div className="flex flexButton">
                <span className="title-font flex flexButtonBP items-center font-medium text-3xl text-gray-900 mr-10">
                  ₹{product.price}
                </span>
                <div className="flex flex-row justify-start">
                <button disabled={product.availableQty == 0}
                  onClick={() => {
                    toast.success('Item added in cart', {
                      position: "top-left",
                      autoClose: 1000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                    });
                    addToCart(
                      slug,
                      1,
                      product.price,
                      product.title,
                      product.category,
                      `/${product.img}`
                    );
                    toggleCart();
                  }}
                  className="flex disabled:bg-green-500 buttonHi hover:disabled:text-white disabled:cursor-default text-white font-medium text-base rounded-full mx-2 bg-green-700 px-5 py-3 hover:text-gray-800 hover:bg-white border transition-all border-green-700"
                >
                  <p>Add to cart</p>
                </button>
                <button disabled={product.availableQty == 0} onClick={() => {
                  buyNow(
                    slug,
                    1,
                    product.price,
                    product.title,
                    product.category,
                    `/${product.img}`
                  );
                }} className="flex disabled:bg-green-500 buttonHi hover:disabled:text-white disabled:cursor-default text-white font-medium text-base rounded-full mx-2 bg-green-700 px-5 py-3 hover:text-gray-800 hover:bg-white border transition-all border-green-700">
                  <p>Buy Now</p>
                </button>
                </div>
              </div>
              <div className=" flex justify-start mt-8">
                <input
                  onChange={onChangePin}
                  type="text"
                  className="p-2 w-52 outline-none rounded-sm border text-gray-600 border-green-700"
                  placeholder="Enter Your Pincode"
                />
                <button
                  onClick={checkServiceablity}
                  className="font-medium text-base  ml-1 rounded-md px-5 bg-green-700 text-white hover:text-gray-800 hover:bg-white border transition-all border-green-700"
                >
                  <p>Check</p>
                </button>
              </div>
              <div className="flex justify-start absolute -bottom-3 serviceP">
                {service && service != null && (
                  <div className="text text-sm text-green-600">
                    Delivery is available in your area
                  </div>
                )}
                {!service && service != null && (
                  <div className="text text-sm text-red-600">
                    Sorry..! delivery is not available in your area
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export async function getServerSideProps(context) {
  let error = null;
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let product = await Product.findOne({ slug: context.query.slug });
  if (product == null) {
    return {
      props: { error: 404 }
    };
  }
  return {
    props: { error: error, product: JSON.parse(JSON.stringify(product)) }
  };
}

export default Post;
