import Head from "next/head";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import { RiAccountCircleLine, RiCoinsLine } from "react-icons/ri";
import "react-toastify/dist/ReactToastify.css";
import { CgLogOff, CgClose } from "react-icons/cg";
import { BsCashCoin } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import mongoose from "mongoose";
import RandomNSchema from "../modal/randomCard";
import { useRouter } from 'next/router';

export default function Home({ logout, user, buyNow, randomNum, cart, clearCart }) {
  const [dropdown, setdropdown] = useState(false)
  const [name, setname] = useState("")
  const [email, setemail] = useState("")
  const [phone, setphone] = useState("")
  const [amount, setamount] = useState()
  const [timeBit, settimeBit] = useState(true)
  const [paymentVer, setpaymentVer] = useState(true)
  const [imageload, setimageload] = useState(false)
  const [token, settoken] = useState("")
  var [closeScr, setcloseScr] = useState(false)
  const [wallet, setwallet] = useState(0)
  const [users, setusers] = useState({ value: null })

  useEffect(() => {
    const myuser = JSON.parse(localStorage.getItem("myuser"))
    if (myuser && myuser.token) {
      setusers(myuser)
      fetchdata(myuser.token)
      settoken(myuser.token)
      setimageload(true);
    }
    const now = new Date();
    const hours = now.getHours();

    if (hours >= 9 && hours <= 23) {
      settimeBit(false);
    } else {
      settimeBit(true);
    }
  }, [])

  const handleChange = async (e) => {
    if (e.target.name == 'amount') {
      setamount(e.target.value)
      if (e.target.value > 0) {
        setpaymentVer(false)
      }
      else {
        setpaymentVer(true)
      }
    }
  }

  const fetchdata = async (token) => {
    let data = { token: token, email, wallet }
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    let res = await a.json()
    setwallet(res.wallet)
    setname(res.name)
    setemail(res.email)
    setphone(res.phone)
  }


  const initiatePayment = async () => {
    setpaymentVer(true);
    let oid = Math.floor(Math.random() * Date.now());
    const data = {
      cart, oid, amount, email, name, phone, wallet, randomNum: cart.randomNum,
      cardno: cart.cardno,
    };
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pretransaction`, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    let txnRes = await a.json()
    if (txnRes.success) {
      toast.success(txnRes.success, {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      let walletUp = wallet - amount;
      let data2 = { token: token, email, walletUp }
      let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateWallet`, {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data2),
      })
      setwallet(wallet - amount)
      setcloseScr(false)
      setamount();
    }
    else {
      toast.error(txnRes.error, {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setcloseScr(false)
      setamount();
    }
    setpaymentVer(false)
  }

  return (<>
    {!imageload && <div className="imageloadd">
      <div className="imagess h-screen w-full overflow-hidden relative">
          <div className="logo w-40 absolute left-36 top-7">
            <img src="/logo.gif" alt="" />
          </div>
          <div onClick={()=> setimageload(true)} className="title-logo absolute flex w-full h-full mt-14 pl-10 cursor-pointer justify-center items-start"><img src="start.png" alt="" /></div>
          <div className="imgphoto w-full h-full overflow-hidden">
            <img src="./frontpage.jpg" alt="" />
          </div>
      </div>
    </div>}
    {imageload && <div>
      <Head>
        <title>Patti Circle- Win Win Game</title>
        <meta
          name="description"
          content="Patti Circle win win Game"
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
      <div className="containerr relative w-full h-screen screnfulln overflow-hidden">
        {closeScr == true && <div className="bittingPop w-full absolute h-screen z-40">
          <div className="batInfo bg-white h-72 rounded-sm top-1/4 mx-auto mt-16 shadow-md">
            <div className="information_bit p-8">
              <div className="top_bit flex justify-between items-center w-full text-lg pb-8">
                <div className="left_bit uppercase text-2xl">Start bit</div>
                <div className="right_bit">You&rsquo;re Card is- <span className="text-3xl">{cart.cardno}</span>  & Number- <span className="text-3xl">{cart.randomNum}</span> </div>
              </div>
              <div className="bottom_pay_bit">
                <div className="head_bit text-lg pb-2">Enter Coin of Bit</div>
                <div className="amount_bit">
                  <input value={amount} onChange={handleChange} type="Number" id="amount" autoComplete="off" name='amount' required className="p-3 outline-none w-full border-red-700 mb-5  text-gray-600 text-base border " />
                </div>
              </div>
              <div className="botton_bit flex justify-between items-center">
                <button onClick={() => { clearCart; setcloseScr(false) }} className='font-medium mr-10 rounded-full disabled:bg-red-500 hover:disabled:text-white disabled:cursor-default bg-red-700 w-52 px-5 py-3 hover:bg-white text-white hover:text-gray-800 border transition-all border-red-700'><h6>Cancel</h6></button>
                <button onClick={initiatePayment} disabled={paymentVer} className='font-medium rounded-full disabled:bg-red-500 hover:disabled:text-white disabled:cursor-default bg-red-700 w-52 px-5 py-3 hover:bg-white text-white hover:text-gray-800 border transition-all border-red-700'><h6>Bit</h6></button>
              </div>
            </div>
          </div>
        </div>}
        {/* <div className="cooming text-6xl h-28 bg-red-900 border absolute bottom-48 left-0 right-0 flex justify-center items-center text-white z-10 menuBar shadow-lg border-b border-red-800">Coming soon...</div> */}
        <div className="navbar flex justify-between items-center pr-20 pl-20 pt-4">
          <div className="logo w-32 ">
            <img src="/logo.gif" alt="" />
          </div>
          <div className="uppercase text-4xl text-white py-5 px-20">
            <div className="clasimg">
              Choose Your Lucky Card
            </div>
          </div>
          <div className="user_name relative flex justify-between items-center text-white z-20 bg-red-900 p-4 px-7 rounded-lg">
            {user && user.value && <div onMouseOver={() => { setdropdown(true) }} onMouseLeave={() => { setdropdown(false) }} className="name pr-5 cursor-pointer hover:text-red-100">{name}</div>}
            {dropdown && <div className="dropdown absolute -left-10 top-11 w-44 px-3 rounded-sm bg-white z-50 shadow-lg" onMouseOver={() => { setdropdown(true) }} onMouseLeave={() => { setdropdown(false) }}>
              <ul>
                <Link href={'/account'}><a><li className="text-base flex flex-row items-center border-red-300 text-red-700 py-2 hover:text-red-500"><RiAccountCircleLine className="mx-2 text-lg" /><span>My Profile</span></li></a></Link>
                <Link href={'/yourorder'}><a><li className="text-base flex flex-row items-center border-t border-red-300 text-red-700 py-2 hover:text-red-500"><RiCoinsLine className="mx-2 text-lg" /><span>Bitting Details</span></li></a></Link>
                <Link href={'/addcoin'}><a><li className="text-base flex flex-row items-center border-t border-red-300 text-red-700 py-2 hover:text-red-500"><RiCoinsLine className="mx-2 text-lg" /><span>Add Coin</span></li></a></Link>
                <Link href={'/withdrawal'}><a><li className="text-base flex flex-row items-center border-t border-red-300 text-red-700 py-2 hover:text-red-500"><BsCashCoin className="mx-2 text-lg" /><span>Withdrawal Coin</span></li></a></Link>
                <li onClick={logout} className="text-base border-t flex flex-row items-center cursor-pointer border-red-300 text-red-700 py-2 hover:text-red-500"><CgLogOff className="mx-2 text-lg" /><span>Logout</span></li>
              </ul>
            </div>}
            {user && !user.value && <Link href={"/login"}><a>
              <button className="text-xl flex items-center px-4 rounded-md bg-red-900 cursor-pointer text-slate-50 hover:text-red-200 transition-all">Login</button>
            </a></Link>}
            {user && user.value && <div className="saprator"></div>}
            {user && user.value && <Link href={'./addcoin'}><div className="coin flex justify-center items-center text-lg cursor-pointer text-yellow-200 hover:text-yellow-300"><RiCoinsLine className="mr-1" /> <span className="text-2xl">{wallet}</span> <AiOutlinePlus className="ml-1 text-white" /></div></Link>}
          </div>
        </div>
        <div className="welc flex justify-between items-center text-white px-14 mt-5">
          <div className="welc_text text-xl flex justify-center items-center flex-row">
            Today&rsquo;s Lucky Number :
            <div className="card_no_det ml-2  border font-bold rounded-full w-9 h-9 flex justify-center text-red-800 items-center p-5 mr-1 text-lg bg-white border-red-900 hover:bg-red-200 cursor-pointer">
              {randomNum.card1}
            </div>
          </div>
          <div className="random_no flex justify-between items-center text-xl">
            <div className="text pr-2">Today Numbers :  </div>
            <div className="R_number">
              <div className="lowerBody flex justify-around mt-3 items-center font-bold">
                <div className="card_no_det border rounded-full w-9 h-9 flex justify-center text-red-800 items-center p-5 mr-1 text-lg bg-white border-red-900 hover:bg-red-200 cursor-pointer">
                  {randomNum.card1}
                </div>
                <div className="card_no_det border rounded-full w-9 h-9 flex justify-center text-red-800 items-center p-5 mr-1 text-lg bg-white border-red-900 hover:bg-red-200 cursor-pointer">
                  {randomNum.card2}
                </div>
                <div className="card_no_det border rounded-full w-9 h-9 flex justify-center text-red-800 items-center p-5 mr-1 text-lg bg-white border-red-900 hover:bg-red-200 cursor-pointer">
                  {randomNum.card3}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card text-red-900 flex justify-center items-center p-5 text-lg mt-6">
          <div className="card_no flex justify-around items-center w-4/6 flexcolh">
            <div className="card card_first h-min">
              <div className="upperBody border border-white overflow-hidden relative">
                <div className="cardNo absolute text-7xl left-11 top-12 text-white">
                  1
                </div>
                <img src="/card1.png" alt="" />
              </div>
              <div className="lowerBody flex justify-around mt-3 items-center font-bold">
                <button onClick={() => { buyNow(randomNum.card1, 1); setcloseScr(true) }} disabled={timeBit} className="card_no_det border rounded-full w-9 h-9 flex justify-center items-center p-5 text-lg bg-white border-red-900 hover:bg-red-200 cursor-pointer">
                  {randomNum.card1}
                </button>
              </div>
            </div>
            <div className="card card_second h-min">
              <div className="upperBody border border-white overflow-hidden relative">
                <div className="cardNo absolute text-7xl left-11 top-12 text-white">
                  2
                </div>
                <img src="/card1.png" alt="" />
              </div>
              <div className="lowerBody flex justify-around mt-3 items-center font-bold">
                <button onClick={() => { buyNow(randomNum.card1, 2); setcloseScr(true) }} disabled={timeBit} className="card_no_det border rounded-full w-9 h-9 flex justify-center items-center p-5 text-lg bg-white border-red-900 hover:bg-red-200 cursor-pointer">
                  {randomNum.card1}
                </button>
              </div>
            </div>
            <div className="card card_third h-min">
              <div className="upperBody border border-white overflow-hidden relative">
                <div className="cardNo absolute text-7xl left-11 top-12 text-white">
                  3
                </div>
                <img src="/card1.png" alt="" />
              </div>
              <div className="lowerBody flex justify-around mt-3 items-center font-bold">
                <button onClick={() => { buyNow(randomNum.card1, 3); setcloseScr(true) }} disabled={timeBit} className="card_no_det border rounded-full w-9 h-9 flex justify-center items-center p-5 text-lg bg-white border-red-900 hover:bg-red-200 cursor-pointer">
                  {randomNum.card1}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="foooter w-full flex flex-col absolute bottom-0 left-0 justify-between">
          <div className="ending uppercase text-lg mt-5 flex justify-between px-40 items-center bg-white text-red-900 font-bold p-2 text-center ">
            <p> Batting Start at - 9 AM </p>
            <p> Batting End at - 11 PM </p>
          </div>
          <div className="footer w-full flex justify-between items-center bg-red-900 text-white font-bold p-3 text-center pl-12 pr-12">
            <div className="webname">patticircle.com &#169;</div>
            <Link href={'./howtoplay'}><div className="term cursor-pointer">How to Play</div></Link>
            <Link href={'./terms'}><div className="term cursor-pointer">Terms & Conditions</div></Link>
            <Link href={'./faq'}><div className="term cursor-pointer">FAQ</div></Link>
            <Link href={'./contact'}><div className="term cursor-pointer">Contact us</div></Link>
          </div>
        </div>
      </div>
    </div>}
  </>
  );
}

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let randomNum = await RandomNSchema.findOne();
  return {
    props: { randomNum: JSON.parse(JSON.stringify(randomNum)) },
  };
}
