import { React, useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import Image from 'next/image'
import Link from 'next/link';
import Head from "next/head"
import Script from "next/script"
import { RiCoinsLine } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Addcoin = () => {
    const [wallet, setwallet] = useState(0)
    const router = useRouter()
    const [lodingS, setlodingS] = useState(true)
    const [orders, setorders] = useState([])
    const [token, settoken] = useState("")
    const [name, setname] = useState("")
    const [amount, setamount] = useState('')
    const [userInfi, setuserInfi] = useState({})

    useEffect(() => {
        const myuser = JSON.parse(localStorage.getItem("myuser"))
        if (myuser && myuser.token) {
            fetchdata(myuser.token)
            settoken(myuser.token)
        }
        const fetchOrders = async () => {
            setlodingS(false)
            let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getaddcoin`, {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token: JSON.parse(localStorage.getItem('myuser')).token }),
            })
            let res = await a.json()
            setorders(res.addcoins)
            setlodingS(true)
        }
        if (!localStorage.getItem('myuser')) {
            router.push('/')
        }
        else {
            fetchOrders()
        }
    }, [])

    const fetchdata = async (token) => {
        let data = { token: token, wallet }
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
        setuserInfi(res)
    }
    const handleChange = async (e) => {
        if (e.target.name == 'amount') {
            setamount(parseInt(e.target.value))
        }
    }



    const initiatePayment = async () => {
        setlodingS(false)
        let oid = Math.floor(Math.random() * Date.now());
        const data = { email: userInfi.email, name: userInfi.name, phone: userInfi.phone, amount, oid, };
        let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/addCoin`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        let txnRes = await a.json()
        if (txnRes.success) {
            let txnToken = txnRes.txnToken
            var config = {
                "root": "",
                "flow": "DEFAULT",
                "data": {
                    "orderId": oid, /* update order id */
                    "token": txnToken, /* update token value */
                    "tokenType": "TXN_TOKEN",
                    "amount": amount /* update amount */
                },
                "handler": {
                    "notifyMerchant": function (eventName, data) {
                        console.log("notifyMerchant handler function called");
                        console.log("eventName => ", eventName);
                        console.log("data => ", data);
                    }
                }
            };
            window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
                // after successfully updating configuration, invoke JS Checkout
                window.Paytm.CheckoutJS.invoke();
            }).catch(function onError(error) {
                console.log("error => ", error);
            });
        }
        else {
            if (txnRes.cardClear) {
                clearCart()
            }
            toast.error(txnRes.error, {
                position: "top-left",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        setlodingS(true)
    }
    const updatedOrders = orders.map((item) => {
        const date = new Date(item.createdAt);
        const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        return {
            ...item,
            time: time
        }
    });
    return (
        <div className='containerr  catoBack flex relative'>
            <Head>
                <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
                <title>Patti Circle - Purchase Coin</title>
                <meta
                    name="description"
                    content="Patti Circle win win Game"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Script type="application/javascript" crossorigin="anonymous" src={`${process.env.NEXT_PUBLIC_PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_PAYTM_MID}.js`} />
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
            <Link href={'/'}><div className="gotoHome right-10 top-10 fixed cursor-pointer text-green-900 p-2 bg-white font-bold text-4xl"><AiOutlineClose /></div></Link>
            {lodingS === false && <span className="fixed flex justify-center items-center text-green-900 text-lg top-1/2 w-full"><Image src={"/loader.gif"} width={50} height={50} /></span>}
            <div className="checkout-title my-8 mx-5 w-full flex flex-row">
                {/* <div className='left-side bg-white w-1/5 mr-5 border border-gray-200 rounded-sm py-5 px-5 shadow-sm h-72'>
            <div className="subtotal text-3xl text-gray-800 flex justify-start pb-2">Filters</div>
          </div> */}
                <div className='right-side mx-auto justify-center bg-white yourOrderW text-3xl text-gray-800 border border-gray-200 rounded-sm py-8 px-20 shadow-sm'>
                    <p className='flex justify-center items-center text-4xl py-3 text-gray-700'>Add Coin</p>
                    <div className="coin flex text-2xl cursor-pointer text-yellow-700 pb-4 mt-5"><span className='mr-5'> Your Wallet : </span>  <RiCoinsLine className="mr-1 text-3xl" />  <span className="text-3xl">{wallet}</span></div>
                    <div className="collection_with coin_with product flex yourOrderCol justify-center items-center flex-col w-full mb-5 mt-10 border-2  border-gray-300 py-20 px-20">
                        <div className="box_bank flex justify-center flex-col items-start w-1/2">
                            <p className='text-lg'>Enter Coin</p>
                            <input value={amount} onChange={handleChange} autoComplete="off" type="number" id="amount" name='amount' required className="p-3 outline-none w-full border-green-700 mb-5  text-gray-600 text-base border px-2" />
                        </div>
                        <div className="box_button flex justify-around flex-row items-center w-full">
                            <div className="botton_bit flex justify-between items-center">
                                <button onClick={initiatePayment} className='font-medium text-lg rounded-full disabled:bg-green-500 hover:disabled:text-white disabled:cursor-default bg-green-700 w-52 px-4 py-3 hover:bg-white text-white hover:text-gray-800 border transition-all border-green-700'><h6>Purchase Now</h6></button>
                            </div>
                        </div>
                    </div>
                    <div className="products flex flex-col w-full text-sm mt-8">
                        <p className='flex justify-center items-center text-4xl py-8 text-gray-700'>Coin History</p>
                        {orders.length == 0 && <div className="flex justify-center text-4xl text-green-700 py-20 items-center border-t border-b border-gray-200">
                            Your Order List is Empty....
                        </div>}
                        <table>
                            <tr>
                                <th className='text-left border p-4 border-slate-600'><div className="Date text-lg font-medium">Date</div></th>
                                <th className='text-left border p-4 border-slate-600'><div className="Refrence text-lg font-medium">Refrence No</div></th>
                                <th className='text-left border p-4 border-slate-600'><div className="Coin text-lg font-medium">Coin</div></th>
                                <th className='text-left border p-4 border-slate-600'><div className="Status text-lg font-medium">Status</div></th>
                            </tr>
                            {updatedOrders.map((item, index) => {
                                return <tr key={item._id}>
                                    <td className='text-left border p-4 border-slate-600'><div className="Date">{item.createdAt.substring(0, 10)}, {item.time}</div></td>
                                    <td className='text-left border p-4 border-slate-600'><div className="Refrence">#{item.orderId}</div></td>
                                    <td className='text-left border p-4 border-slate-600'><div className="Coin">{item.amount}</div></td>
                                    <td className='text-left border p-4 border-slate-600'><div className="Status">{item.status}</div></td>
                                </tr>
                            })}
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Addcoin