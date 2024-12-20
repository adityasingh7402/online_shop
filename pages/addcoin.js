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
import QRCode from "react-qr-code";

const Addcoin = () => {
    const [wallet, setwallet] = useState(0)
    const router = useRouter()
    const [lodingS, setlodingS] = useState(true)
    const [orders, setorders] = useState([])
    const [token, settoken] = useState("")
    const [name, setname] = useState("")
    const [oid, setoid] = useState("")
    const [amount, setamount] = useState('')
    const [transId, settransId] = useState('')
    const [curdate, setcurdate] = useState('')
    const [userInfi, setuserInfi] = useState({})
    const [paymentVer, setpaymentVer] = useState(true)
    const [qrVisible, setQrVisible] = useState(false);
    const [qrUrl, setQrUrl] = useState("");
    const [timer, setTimer] = useState(null);

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
        setoid(Math.floor(Math.random() * Date.now()));

        const options = { day: '2-digit', month: '2-digit', year: '2-digit' };
        const currentDate = new Date().toLocaleDateString(options);
        setcurdate(currentDate)
        console.log(currentDate, curdate)
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
        const { name, value } = e.target;

        if (name === 'amount') {
            setamount(value);

            // Update payment verification based on both conditions
            if (value >= 500 && transId.trim() !== '') {
                setpaymentVer(false); // Allow payment verification
            } else {
                setpaymentVer(true); // Block payment verification
            }
        } else if (name === 'transId') {
            settransId(value);

            // Update payment verification based on both conditions
            if (value.trim() !== '' && amount >= 100) {
                setpaymentVer(false); // Allow payment verification
            } else {
                setpaymentVer(true); // Block payment verification
            }
        }
    };
    useEffect(() => {
        const options = { day: "2-digit", month: "2-digit", year: "2-digit" };
        const currentDate = new Date().toLocaleDateString("en-US", options);
        setcurdate(currentDate);
    }, []);

    const handleAmountChange = (e) => {
        setamount(e.target.value);
        setQrVisible(false); // Hide QR when amount changes
    };

    const generateQR = () => {
        if (!amount || amount < 1) {
            toast.error("Please enter a valid amount!", {
                position: "top-left",
                autoClose: 3000,
            });
            return;
        }

        // Generate UPI payment URL
        const upiId = process.env.NEXT_PUBLIC_UPI_ID;
        const url = `upi://pay?pa=${upiId}&pn=YourName&am=${amount}&cu=INR`;
        setQrUrl(url);
        setQrVisible(true);

        // Set a timeout of 10 minutes for QR code visibility
        if (timer) clearTimeout(timer);
        const newTimer = setTimeout(() => {
            setQrVisible(false);
            toast.warning("QR code expired. Please generate a new one.", {
                position: "top-left",
                autoClose: 3000,
            });
        }, 600000); // 10 minutes in milliseconds
        setTimer(newTimer);
    };

    const clearFields = () => {
        setamount("");
        settransId("");
        setQrVisible(false);
        if (timer) clearTimeout(timer);
    };





    // const initiatePayment = async () => {
    //     setlodingS(false)
    //     let oid = Math.floor(Math.random() * Date.now());
    //     const data = { email: userInfi.email, name: userInfi.name, phone: userInfi.phone, amount, oid, };
    //     let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/addCoin`, {
    //         method: 'POST', // or 'PUT'
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(data),
    //     })
    //     let txnRes = await a.json()
    //     if (txnRes.success) {
    //         let txnToken = txnRes.txnToken
    //         var config = {
    //             "root": "",
    //             "flow": "DEFAULT",
    //             "data": {
    //                 "orderId": oid, /* update order id */
    //                 "token": txnToken, /* update token value */
    //                 "tokenType": "TXN_TOKEN",
    //                 "amount": amount /* update amount */
    //             },
    //             "handler": {
    //                 "notifyMerchant": function (eventName, data) {
    //                     console.log("notifyMerchant handler function called");
    //                     console.log("eventName => ", eventName);
    //                     console.log("data => ", data);
    //                 }
    //             }
    //         };
    //         window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
    //             // after successfully updating configuration, invoke JS Checkout
    //             window.Paytm.CheckoutJS.invoke();
    //         }).catch(function onError(error) {
    //             console.log("error => ", error);
    //         });
    //     }
    //     else {
    //         if (txnRes.cardClear) {
    //             clearCart()
    //         }
    //         toast.error(txnRes.error, {
    //             position: "top-left",
    //             autoClose: 3000,
    //             hideProgressBar: false,
    //             closeOnClick: true,
    //             pauseOnHover: true,
    //             draggable: true,
    //             progress: undefined,
    //         });
    //     }
    //     setlodingS(true)
    // }
    const initiatePaymentdemo = async () => {
        setlodingS(false)
        const data = { email: userInfi.email, name: userInfi.name, phone: userInfi.phone, amount, oid, transId };
        let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/addCoin`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        let txnRes = await a.json()
        setlodingS(true)
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
            setamount('');
            settransId('');
            clearFields()
        } else {
            setamount('');
            settransId('');
            clearFields()
        }
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
            <div className="gotoHome right-10 top-10 fixed cursor-pointer font-bold text-4xl">
            </div>
            <Head>
                <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
                <title>Patti Circle - Purchase Coin</title>
                <meta
                    name="description"
                    content="Patti Circle win win Game"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {/* <Script type="application/javascript" crossorigin="anonymous" src={`${process.env.NEXT_PUBLIC_PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_PAYTM_MID}.js`} /> */}
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
            {lodingS === false && <span className="fixed flex justify-center items-center text-red-900 text-lg top-1/2 w-full"><Image src={"/loader.gif"} width={50} height={50} /></span>}
            <div className="checkout-title my-4 mx-5 ninersti w-full flex flex-row">
                {/* <div className='left-side bg-white w-1/5 mr-5 border border-gray-200 rounded-sm py-5 px-5 shadow-sm h-72'>
            <div className="subtotal text-3xl text-gray-800 flex justify-start pb-2">Filters</div>
          </div> */}
                <div className='right-side nivpad mx-auto justify-center bg-white yourOrderW text-3xl text-gray-800 border border-gray-200 rounded-sm py-3 px-20 shadow-sm'>
                    <p className='flex justify-center items-center text-4xl py-2 text-gray-700'>Add Coins</p>
                    <div className="coin flex text-2xl poostioncet cursor-pointer text-yellow-700 pb-4 mt-3"><span className='mr-5'> Your Wallet : </span>  <RiCoinsLine className="mr-1 text-3xl" />  <span className="text-3xl">{wallet}</span></div>
                    <div className="collection_with nivpad coin_with product flex yourOrderCol justify-center items-center flex-col w-full mb-5 mt-5 border-2  border-gray-300 py-3 px-10">
                        <div className="refrenceno text-xl mb-2">Ref. Number: <span className='text-2xl font-medium'>{oid}</span></div>
                        <div className="box_bank flex flex-row nincol items-start">
                            {!qrVisible && (<div className="qrcode w-full relative">
                                <div className="payment-box w-52 border">
                                    <img src="./payment.jpg" alt="" />
                                </div>
                                <div className="click-gene absolute bottom-20">
                                    <div
                                        className="w-full bg-white text-base text-center text-black py-2 px-2"
                                    >
                                         Click on Generate QR Code
                                    </div>
                                </div>
                            </div>)}
                            {qrVisible && (
                                <div className="payment-box w-full flex justify-center items-center flex-col">
                                    <div className="boc-forqr flex justify-center items-center">
                                        <QRCode value={qrUrl} size={180} />
                                    </div>
                                    <p className="text-gray-600 text-lg mt-2">Scan the QR to pay</p>
                                    <button
                                        className="bg-red-500 text-white py-1 px-2 text-lg mx-auto rounded hover:bg-red-600"
                                        onClick={clearFields}
                                    >
                                        Clear
                                    </button>
                                </div>
                            )}
                            <div className="divider w-20"></div>
                            <div className="detailss w-full flex justify-start items-start flex-col mt-3">
                                <div className="box_bank w-full flex justify-center flex-col items-start">
                                    <p className='text-base'>Enter Coins</p>
                                    <input value={amount} onChange={handleChange} autoComplete="off" type="number" id="amount" placeholder='100 or Above' name='amount' required className="p-2 outline-none w-full border-red-700 mb-3 text-gray-600 text-base border" />
                                </div>
                                {!qrVisible && (<button
                                    onClick={generateQR}
                                    className="w-full bg-blue-500 text-lg text-white py-2 px-2 rounded mb-4 hover:bg-blue-600"
                                >
                                    Generate QR Code
                                </button>)}
                                {qrVisible && (<div className="box_bank w-full flex justify-center flex-col items-start">
                                    <p className='text-base'>Enter Transaction ID</p>
                                    <input value={transId} onChange={handleChange} autoComplete="off" type="number" id="transId" name='transId' required className="p-2 outline-none w-full border-red-700 mb-3 text-gray-600 text-base border" />
                                </div>)}
                                <div className="box_bank flex justify-center flex-col items-start">
                                    <p className='text-base'>Date : {curdate}</p>
                                </div>
                            </div>
                        </div>
                        <div className="box_button flex justify-around flex-row items-center w-full mt-7">
                            <div className="botton_bit btnwithf flex justify-between items-center w-1/2">
                                {/* <button onClick={initiatePayment} className='font-medium text-lg rounded-full disabled:bg-red-500 hover:disabled:text-white disabled:cursor-default bg-red-700 w-52 px-4 py-3 hover:bg-white text-white hover:text-gray-800 border transition-all border-red-700'><h6>Purchase Now</h6></button> */}
                                <Link href={'./'}><button className='font-medium text-base rounded-full  hover:bg-red-700 w-40 px-2 py-3 bg-white hover:text-white text-gray-800 border transition-all border-red-700'><h6>Go Back</h6></button></Link>
                                <button disabled={paymentVer} onClick={initiatePaymentdemo} className='font-medium text-base rounded-full disabled:bg-red-500 hover:disabled:text-white disabled:cursor-default bg-red-700 w-40 px-2 py-3 hover:bg-white text-white hover:text-gray-800 border transition-all border-red-700'><h6>Purchase Now</h6></button>
                            </div>
                        </div>
                    </div>
                    <div className="notes">
                        <p className='text-lg font-medium'>Note:</p>
                        <p className='text-base'>1. Scan bar code to Purchase Coins.</p>
                        <p className='text-base'>2. Fill Transaction ID.</p>
                        <p className='text-base'>3. Send to us by clicking Purchase Now button.</p>
                        <p className='text-base'>4. Coins will be added within one working day.</p>
                    </div>
                    <div className="products flex flex-col overflow-scroll w-full text-sm mt-8">
                        <p className='flex justify-center items-center text-4xl py-8 text-gray-700'>Coin History</p>
                        {/* {orders.length == 0 && <div className="flex justify-center text-4xl text-red-700 py-20 items-center border-t border-b border-gray-200">
                            Your Order List is Empty....
                        </div>} */}
                        <table className=" bg-white p-5">
                            <thead>
                                <tr>
                                    <th className='text-left border p-3 border-slate-600'><div className="Date text-base font-medium">Date</div></th>
                                    <th className='text-left border p-3 border-slate-600'><div className="Refrence text-base font-medium">Refrence No</div></th>
                                    <th className='text-left border p-3 border-slate-600'><div className="Coin text-base font-medium">Coin</div></th>
                                    <th className='text-left border p-3 border-slate-600'><div className="Status text-base font-medium">Status</div></th>
                                </tr>
                            </thead>
                            <tbody>
                                {updatedOrders.map((item, index) => (
                                    <tr key={item._id}>
                                        <td className='text-left border p-3 border-slate-600'><div className="Date">{item.createdAt.substring(0, 10)}, {item.time}</div></td>
                                        <td className='text-left border p-3 border-slate-600'><div className="Refrence">#{item.orderId}</div></td>
                                        <td className='text-left border p-3 border-slate-600'><div className="Coin">{item.amount}</div></td>
                                        <td className='text-left border p-3 border-slate-600'><div className="Status">{item.status}</div></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Addcoin