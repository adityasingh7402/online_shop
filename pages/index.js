import Head from "next/head";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import { RiAccountCircleLine, RiCoinsLine } from "react-icons/ri";
import "react-toastify/dist/ReactToastify.css";
import { CgLogOff, CgClose } from "react-icons/cg";
import { BsCashCoin } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlinePlus } from "react-icons/ai";
import mongoose from "mongoose";
import RandomNSchema from "../modal/randomCard";
import Orderr from "../modal/Order";
import { useRouter } from 'next/router';
import moment from 'moment';
import Preloader from '../pages/componenat/Preloader';

export default function Home({ logout, user, buyNow, randomNum, cart, clearCart, orders }) {
  const router = useRouter()
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
  var [loginout, setloginout] = useState(false)
  const [wallet, setwallet] = useState(0)
  const [users, setusers] = useState({ value: null })
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [ordersIn, setordersIn] = useState([])

  const [time, setTime] = useState(calculateRemainingTime());

  function calculateRemainingTime() {
    const now = new Date();
    const secondsUntilNextHour = 3600 - now.getMinutes() * 60 - now.getSeconds();
    return secondsUntilNextHour;
  }

  useEffect(() => {
    const hasVisitedInSession = sessionStorage.getItem('hasVisitedInSession');

    if (hasVisitedInSession) {
      setIsLoading(false);
    } else {
      setTimeout(() => {
        setIsLoading(false);
        sessionStorage.setItem('hasVisitedInSession', 'true');
      }, 6000);
    }
    const interval = setInterval(() => {
      setTime(calculateRemainingTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  useEffect(() => {
    const fetchOrders = async () => {
      let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getwinnerinfo`, {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: JSON.parse(localStorage.getItem('myuser')).token }),
      })
      let res = await a.json()
      
      res.OrdersInfo.forEach(item => {
        console.log(item)
        if (item.winning === 'Win') {
          toast.success(`You Win ${2 * item.amount - 0.2 * item.amount} Coins `, {
            position: "top-right",
            autoClose: false,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        }
        else{
          toast.error(`You Loss ${item.amount} Coins`, {
            position: "top-right",
            autoClose: false,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        }
      });
    }
    if (!localStorage.getItem('myuser')) {
      router.push('/')
    }
    else {
      fetchOrders()
    }

  }, [])

  useEffect(() => {
    const myuser = JSON.parse(localStorage.getItem("myuser"))
    if (myuser && myuser.token) {
      setloginout(true);
      setusers(myuser)
      fetchdata(myuser.token)
      settoken(myuser.token)
      setimageload(true);
    }
    const now = new Date();
    const hours = now.getHours();


    if (hours >= 6 && hours <= 23) {
      settimeBit(false);
    } else {
      settimeBit(true);
    }
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 600);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [])

  const handleChange = async (e) => {
    if (e.target.name == 'amount') {
      setamount(e.target.value)
      if (e.target.value >= 50) {
        setpaymentVer(false)
      }
      else {
        setpaymentVer(true)
      }
    }
  }

  const handleDownload = () => {
    window.open('/PattiWinner.apk');
  };
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
    if (loginout) {
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
    else {
      router.push('/login');
    }
  }


  return (<>
    {isLoading && <Preloader />}
    {!imageload && !isSmallScreen && <div className="imageloadd containerr">
      <Head>
        <title>Patti Winner- Win Win Game</title>
        <meta
          name="description"
          content="Patti Winner win win Game"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="imagess h-screen w-full overflow-hidden relative">
        <div className="logo w-40 absolute left-36 top-7">
          <img src="/logopn.png" alt="" />
        </div>
        <div onClick={() => setimageload(true)} className="title-logo absolute flex w-full h-full mt-7 pl-8 cursor-pointer justify-center items-start"><img src="StartGame.png" alt="" /></div>
        <div onClick={handleDownload} className="downloadapk absolute z-50 w-40 cursor-pointer top-10 right-10"><img src="downloadmo.png" alt="" /></div>
        <div className="imgphoto w-full h-full overflow-hidden">
          <img src="./frontpage.png" alt="" />
        </div>
      </div>
    </div>}
    {!imageload && isSmallScreen && <div className="imageloadd">
      <div className="imagess hightspage w-full overflow-hidden relative">
        {/* <div className="logo w-40 absolute left-36 top-7">
            <img src="/logo.gif" alt="" />
          </div> */}
        <div onClick={() => setimageload(true)} className="title-logo absolute flex w-full h-full mt-14 pl-10 cursor-pointer justify-center items-start"></div>
        <div className="imgphoto w-full h-full overflow-hidden">
          <img src="./homemo.jpg" alt="" />
        </div>
        <div className="shs absolute -left-28">
          <img src="/card-ace.png" alt="" />
        </div>
        {/* <div onClick={handleDownload} className="downloadapk absolute z-50 w-28 cursor-pointer bottom-10 right-5"><img src="downloadmo.png" alt="" /></div> */}
      </div>
    </div>}
    {imageload && <div>
      <Head>
        <title>Patti Winner- Win Win Game</title>
        <meta
          name="description"
          content="Patti Winner win win Game"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ToastContainer
        position="top-right"
        autoClose={false}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="containerr relative w-full h-screen screnfulln overflow-hidden">
        {closeScr == true && <div className="bittingPop w-full absolute h-screen sabmainb z-40">
          <div className="batInfo bg-white h-72 rounded-sm top-1/4 mx-auto mt-16 shadow-md">
            <div className="information_bit p-8">
              <div className="top_bit flex justify-between items-center w-full text-lg pb-8">
                <div className="left_bit uppercase text-2xl">Start Odd</div>
                <div className="right_bit">You Choose Card - <span className="text-3xl">{cart.cardno}</span></div>
              </div>
              <div className="bottom_pay_bit">
                <div className="head_bit text-lg pb-2">Enter Coins of Odd</div>
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
          <div className="logo w-28">
            <img src="/logopn.png" alt="" />
          </div>
          <div className="uppercase text-5xl font-semibold margingr displayno text-white py-5 px-20">
            <div className="clasimg font-serif animate-charcter m-auto">
              Choose Your ODDS
            </div>
          </div>
          <div className="user_name absluser relative flex justify-between items-center text-white z-20 bg-red-900 p-4 px-7 rounded-lg">
            {user && user.value && <div onMouseOver={() => { setdropdown(true) }} onMouseLeave={() => { setdropdown(false) }} className="name pr-5 paddingph cursor-pointer hover:text-red-100">{name}</div>}
            {dropdown && <div className="dropdown absolute -left-10 top-11 w-48 px-3 rounded-sm bg-white z-50 shadow-lg" onMouseOver={() => { setdropdown(true) }} onMouseLeave={() => { setdropdown(false) }}>
              <ul>
                <Link href={'/account'}><a><li className="text-base flex flex-row items-center border-red-300 text-red-700 py-2 hover:text-red-500"><RiAccountCircleLine className="mx-2 text-lg" /><span>My Profile</span></li></a></Link>
                <Link href={'/yourorder'}><a><li className="text-base flex flex-row items-center border-t border-red-300 text-red-700 py-2 hover:text-red-500"><RiCoinsLine className="mx-2 text-lg" /><span>History</span></li></a></Link>
                <Link href={'/addcoin'}><a><li className="text-base flex flex-row items-center border-t border-red-300 text-red-700 py-2 hover:text-red-500"><RiCoinsLine className="mx-2 text-lg" /><span>Add Coins</span></li></a></Link>
                <Link href={'/withdrawal'}><a><li className="text-base flex flex-row items-center border-t border-red-300 text-red-700 py-2 hover:text-red-500"><BsCashCoin className="mx-2 text-lg" /><span>Withdraw Coins</span></li></a></Link>
                <li onClick={logout} className="text-base border-t flex flex-row items-center cursor-pointer border-red-300 text-red-700 py-2 hover:text-red-500"><CgLogOff className="mx-2 text-lg" /><span>Logout</span></li>
              </ul>
            </div>}
            {user && !user.value && <Link href={"/login"}><a>
              <button className="text-xl btn-login flex items-center px-4 rounded-md bg-red-900 cursor-pointer text-slate-50 hover:text-red-200 transition-all">Login</button>
            </a></Link>}
            {user && user.value && <div onMouseOver={() => { setdropdown(true) }} onMouseLeave={() => { setdropdown(false) }} className="pr-4 paddingph text-lg"><GiHamburgerMenu /></div>}
            {user && user.value && <div className="saprator"></div>}
            {user && user.value && <Link href={'./addcoin'}><div className="coin flex justify-center items-center text-lg cursor-pointer text-yellow-200 hover:text-yellow-300"><RiCoinsLine className="mr-1" /> <span className="text-2xl">{wallet}</span></div></Link>}
          </div>
        </div>
        <div className="uppercasem text-3xl hidden displaout font-semibold text-white py-5 px-20">
          <div className="clasimg font-serif flex justify-center animate-charcter">
            Choose Your ODDS
          </div>
        </div>
        <div className="welc flex flexdis paddisp justify-between items-center text-white px-14 mt-10">
          {/* <div className="welc_text text-xl flex padingbtn flexdis justify-center items-center flex-row">
            <p className="paditex">Today&rsquo;s Lucky Number :</p>
            <div className="card_no_det ml-2  border font-bold rounded-full w-9 h-9 flex justify-center text-red-800 items-center p-5 mr-1 text-lg bg-white border-red-900 hover:bg-red-200 cursor-pointer">
              {randomNum.card1}
            </div>
          </div> */}
          {/* <div className="random_no flex justify-between flexdis items-center text-xl">
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
          </div> */}
        </div>
        <div className="card hidexontet cardmrhon text-red-900 flex justify-center items-center p-5 text-lg mt-9">
          <div className="card_no flex justify-around items-center w-4/6 flexcolh">
            <div onClick={() => { buyNow(randomNum.card1, 1); setcloseScr(true) }} disabled={timeBit} className="cursor-pointer paddispace card card_first h-min">
              <div className="upperBody overflow-hidden relative">
                {/* <div className="cardNo absolute text-7xl left-11 top-12 text-white">
                  1
                </div> */}
                <img src="/card-1.jpg" alt="" />
              </div>
              <div className="lowerBody flex justify-around mt-3 items-center font-bold">
                <button onClick={() => { buyNow(randomNum.card1, 1); setcloseScr(true) }} disabled={timeBit} className="card_no_det border rounded-full w-9 h-9 flex justify-center items-center p-5 text-lg bg-white border-red-900 hover:bg-red-200 cursor-pointer">
                  1
                </button>
              </div>
            </div>
            <div onClick={() => { buyNow(randomNum.card1, 2); setcloseScr(true) }} disabled={timeBit} className="cursor-pointer paddispace card card_second h-min">
              <div className="upperBody overflow-hidden relative">
                {/* <div className="cardNo absolute text-7xl left-11 top-12 text-white"> /
                  2
                </div> */}
                <img src="/card-2.jpg" alt="" />
              </div>
              <div className="lowerBody flex justify-around mt-3 items-center font-bold">
                <button onClick={() => { buyNow(randomNum.card1, 2); setcloseScr(true) }} disabled={timeBit} className="card_no_det border rounded-full w-9 h-9 flex justify-center items-center p-5 text-lg bg-white border-red-900 hover:bg-red-200 cursor-pointer">
                  2
                </button>
              </div>
            </div>
            <div onClick={() => { buyNow(randomNum.card1, 3); setcloseScr(true) }} disabled={timeBit} className="cursor-pointer paddispace card card_third h-min">
              <div className="upperBody overflow-hidden relative">
                {/* <div className="cardNo absolute text-7xl left-11 top-12 text-white">
                  3
                </div> */}
                <img src="/card-3.jpg" alt="" />
              </div>
              <div className="lowerBody flex justify-around mt-3 items-center font-bold">
                <button onClick={() => { buyNow(randomNum.card1, 3); setcloseScr(true) }} disabled={timeBit} className="card_no_det border rounded-full w-9 h-9 flex justify-center items-center p-5 text-lg bg-white border-red-900 hover:bg-red-200 cursor-pointer">
                  3
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="winnershow w-full flex justify-between items-center px-4 -mt-5">
          <div className="left">
            <div className="left-item flex flex-col justify-center items-center">
              <p className="text-white pb-2 text-xl">Last hour's winning card :</p>
              <div className="resImg w-16 h-16">
                <img src={`/card-${randomNum.card2}.jpg`} alt="" />
              </div>
            </div>
          </div>
          <div className="right">
            <div className="right-items rounded-sm">
            <p className="text-xl text-white mx-4 py-3 font-medium flex justify-center items-center"> Winner Announcement - <span className="w-14">{formatTime(time)}</span></p>
            </div>
          </div>
        </div>
        <div className="foooter w-full flex  flex-col absolute bottom-0 left-0 justify-between">
          <div className="ending uppercase text-lg mt-5 flex flexdis justify-end px-10 items-center bg-white text-red-900 font-bold p-2 text-center ">
            
            <marquee direction="left" scrollamount="10">
              <ol className="flex flex-row">
                {orders.map((order, index) => (
                  <li className="mr-40" key={index}>{order.name}-₹{order.amount * 2 - 0.2 * order.amount}</li>
                ))}
              </ol>
            </marquee>
          </div>
          <div className="footer w-full flex didgrid justify-between items-center bg-red-900 text-white font-bold p-3 text-center pl-12 pr-12">
            <div className="webname">pattiwinner.com &#169;</div>
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
  const startOfToday = moment().startOf('day'); // Midnight today
  const endOfToday = moment().endOf('day');

  let randomNum = await RandomNSchema.findOne();
  const orders = await Orderr.find({
    winner: "Win", updatedAt: {
      $gte: startOfToday.toDate(),
      $lt: endOfToday.toDate()
    }
  });
  return {
    props: { randomNum: JSON.parse(JSON.stringify(randomNum)), orders: JSON.parse(JSON.stringify(orders)) },
  };
}
