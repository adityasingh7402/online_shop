import Head from "next/head";
import "@splidejs/react-splide/css";
import { useEffect, useState } from "react";
import User from "../modal/User";
import mongoose from "mongoose";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import { RiAccountCircleLine, RiCoinsLine } from "react-icons/ri";
import "react-toastify/dist/ReactToastify.css";
import { CgLogOff, CgClose } from "react-icons/cg";
import { BsCashCoin} from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";

export default function Home({ logout, user,  userr, myuser}) {
  useEffect(() => {
    const myuser = JSON.parse(localStorage.getItem("myuser"))
  }, [])
  const [dropdown, setdropdown] = useState(false)
  const [menudrop, setmenudrop] = useState(false)
  const [minute, setminute] = useState("")
  const [hour, sethour] = useState("")
  const [date, setdate] = useState()
  const options = { month: 'long', day: 'numeric'};
  useEffect(() => {
    const d = new Date()
    setdate(d)
  }, [])
  function time() {
    var d = new Date();
    var m = d.getMinutes();
    var h = d.getHours();
     setminute(m);
     sethour(h);
     
  }
  setInterval(time, 1000);
  return (
    <div>
      <Head>
        <title>Fresh Frveg- Shop Online Fruits and vegetables</title>
        <meta
          name="description"
          content="Shop fresh Fruits and vegetables online"
        />
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
      <div className="container overflow-hidden relative">
        <div className="cooming text-6xl h-28 bg-green-900 border absolute bottom-48 left-0 right-0 flex justify-center items-center text-white z-10 menuBar shadow-lg border-b border-green-800">Comming soon...</div>
        <div className="navbar flex justify-between items-center pr-20 pl-20 pt-4">
          <div className="logo w-24">
            <img src="/logo.png" alt="" />
          </div>
          <div className="user_name relative flex justify-between items-center text-white z-20 bg-green-900 p-4 px-7 rounded-lg">
            {user && user.value && <div onMouseOver={() => { setdropdown(true) }} onMouseLeave={() => { setdropdown(false) }} className="name pr-5 cursor-pointer hover:text-green-100">{userr.name}</div>}
            {dropdown && <div className="dropdown absolute -left-10 top-11 w-44 px-3 rounded-sm bg-white z-50 shadow-lg" onMouseOver={() => { setdropdown(true) }} onMouseLeave={() => { setdropdown(false) }}>
              <ul>
                <Link href={'/account'}><a><li className="text-base flex flex-row items-center border-green-300 text-green-700 py-2 hover:text-green-500"><RiAccountCircleLine className="mx-2 text-lg" /><span>My Profile</span></li></a></Link>
                <Link href={'/yourorder'}><a><li className="text-base flex flex-row items-center border-t border-green-300 text-green-700 py-2 hover:text-green-500"><BsCashCoin className="mx-2 text-lg" /><span>Withdrawal Coin</span></li></a></Link>
                <li onClick={logout} className="text-base border-t flex flex-row items-center cursor-pointer border-green-300 text-green-700 py-2 hover:text-green-500"><CgLogOff className="mx-2 text-lg" /><span>Logout</span></li>
              </ul>
            </div>}
            {user && !user.value && <Link href={"/login"}><a>
              <button className="text-xl flex items-center px-4 rounded-md bg-green-900 cursor-pointer text-slate-50 hover:text-green-200 transition-all">Login</button>
            </a></Link>}
            {user && user.value && <div className="saprator"></div>}
            {user && user.value && <div className="coin flex justify-center items-center text-lg cursor-pointer text-yellow-200 hover:text-yellow-300"><RiCoinsLine className="mr-1"/> <span className="text-2xl">{userr.wallet}</span> <AiOutlinePlus className="ml-1 text-white"/></div>}
          </div>
        </div>
        <div className="welc flex justify-between items-center text-white pr-14 mt-14">
          <div className="welc_text uppercase text-4xl bg-green-900 p-5 pl-32">
            Start Betting - {date && date.toLocaleDateString("en-IN", options)} - {hour}:{minute && minute <= 9 ? '0'+minute : minute} 
          </div>
          <div className="random_no flex justify-between items-center text-2xl">
            <div className="text pr-2">Today Numbers :  </div>
            <div className="R_number">
            <div className="lowerBody flex justify-around mt-3 items-center font-bold">
                <div className="card_no_det border rounded-full w-9 h-9 flex justify-center text-green-800 items-center p-5 mr-1 text-lg bg-white border-green-900 hover:bg-green-200 cursor-pointer">
                  4
                </div>
                <div className="card_no_det border rounded-full w-9 h-9 flex justify-center text-green-800 items-center p-5 mr-1 text-lg bg-white border-green-900 hover:bg-green-200 cursor-pointer">
                  5
                </div>
                <div className="card_no_det border rounded-full w-9 h-9 flex justify-center text-green-800 items-center p-5 mr-1 text-lg bg-white border-green-900 hover:bg-green-200 cursor-pointer">
                  7
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-200 shadow-md">
        <div className="services grid lg:grid-cols-4 gap-y-10 md:grid-cols-2 md:w-full items-center bg-gray-200 p-2 lg:w-4/5 mx-auto justify-center">
          <div className="service flex justify-center items-center flex-col mx-16">
            <Image src="/5 (3).png" width="55px" height="50px" />
            <h2 className="text-lg font-normal tracking-wider text-center text-gray-700">
              Freshest Produce
            </h2>
          </div>

          <div className="service flex justify-center items-center flex-col mx-16">
            <Image src="/okk.jpg" width="45px" height="50px" />
            <h2 className="text-lg font-normal tracking-wider text-center text-gray-700">
              Good Quality
            </h2>
          </div>
          <div className="service flex justify-center items-center flex-col mx-16">
            <Image src="/5 (1).png" width="50px" height="50px" />
            <h2 className="text-lg font-normal tracking-wider text-center text-gray-700">
              Fast Delivery
            </h2>
          </div>
          <div className="service flex justify-center items-center flex-col mx-16">
            <Image src="/5 (2).png" width="40px" height="50px" />
            <h2 className="text-lg font-normal tracking-wider text-center text-gray-700">
              Customer Service
            </h2>
          </div>
        </div>
      </div>
      <div className="catoBack pb-1">
        <hr className="mt-12 drop-shadow-2xl ..." />
        <div className="shop-title w-96 text-center shadow-md p-3 m-auto background text-white text-3xl rounded-sm">
          Shop by Chatogary
        </div>
        <div className="catogaryes drop-shadow-sm bg-white maginIt lg:mx-16 sm:mx-5 my-6 rounded-sm relative h-72">
          <div className="element absolute text-2xl font-semibold top-5 text-gray-800 left-5 tracking-wide">
            Fresh Fruits
          </div>
          <div className="slider absolute bottom-4 left-0 right-0">
            <Splide
              options={{
                perPage: 6,
                perMove: 1,
                gap: "-2rem",
                breakpoints: {
                  1212: {
                    perPage: 4,

                  },
                  930: {
                    perPage: 3,

                  },
                  717: {
                    perPage: 2,

                  },
                  550: {
                    perPage: 1,
                    rewind: true,
                    autoplay: true,
                    speed: 800,

                  },
                },
              }}
            >
              {fruits.map((item) => {
                return (
                  <Link passHref={true}
                    key={item._id}
                    href={`/products/${item.slug}`}>
                    <SplideSlide>
                      <div className="imagePro flex items-center flex-col cursor-pointer pb-7 mt-2">
                        <p className="text-gray-700 text-lg pb-6">{item.title}</p>
                        <img src={`/${item.img}`} className="productImgS" alt={item.title} />
                      </div>
                    </SplideSlide>
                  </Link>
                );
              })}
            </Splide>
          </div>
        </div>
        <div className="catogaryes drop-shadow-sm bg-white maginIt lg:mx-16 sm:mx-5 my-6 rounded-sm relative h-72">
          <div className="element absolute text-2xl font-semibold top-5 text-gray-800 left-5 tracking-wide">
            Fresh Vegitables
          </div>
          <div className="slider absolute bottom-4 left-0 right-0">
            <Splide
              options={{
                perPage: 6,
                perMove: 1,
                gap: "-2rem",
                breakpoints: {
                  1212: {
                    perPage: 4,

                  },
                  930: {
                    perPage: 3,

                  },
                  717: {
                    perPage: 2,

                  },
                  550: {
                    perPage: 1,
                    rewind: true,
                    autoplay: true,
                    speed: 800,

                  },
                },
              }}
            >
              {vegitables.map((item) => {
                return (
                  <Link passHref={true}
                    key={item._id}
                    href={`/products/${item.slug}`}>
                    <SplideSlide>
                      <div className="imagePro flex items-center flex-col cursor-pointer pb-7 mt-2">
                        <p className="text-gray-700 text-lg pb-6">{item.title}</p>
                        <img src={`/${item.img}`} className="productImgS" alt={item.title} />
                      </div>
                    </SplideSlide>
                  </Link>
                );
              })}
            </Splide>
          </div>
        </div>
        <div className="ending uppercase text-lg mt-5 flex justify-center items-center bg-white text-green-900 font-bold p-3 text-center ">
          Batting start at - 9 AM
        </div>
        <div className="footer absolute bottom-0 right-0 left-0 flex justify-between items-center bg-green-900 text-white font-bold p-4 text-center pl-12 pr-12">
          <div className="webname">patticircle.com &#169;</div>
          <div className="term">Terms & Conditions</div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let userr = await User.findOne(context.myuser);
  return {
    props: { userr: JSON.parse(JSON.stringify(userr)) }
  };
}
