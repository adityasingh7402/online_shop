import { React, useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import Image from 'next/image'
import Link from 'next/link';
import Head from "next/head"
import { RiCoinsLine } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Withdrawal = () => {
    const [wallet, setwallet] = useState(0)
    const router = useRouter()
    const [orders, setorders] = useState([])
    const [lodingS, setlodingS] = useState(true)
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
    useEffect(() => {
        const fetchOrders = async () => {
            setlodingS(false)
            let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getwithdrawD`, {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token: JSON.parse(localStorage.getItem('myuser')).token }),
            })
            let res = await a.json()
            setorders(res.withdrawals)
            setlodingS(true)
        }
        if (!localStorage.getItem('myuser')) {
            router.push('/')
        }
        else {
            fetchOrders()
        }

    }, [])
    const initiatePayment = async () => {
        let oid = Math.floor(Math.random() * Date.now());
        const data = {
            email: userInfi.email, name: userInfi.name, phone: userInfi.phone, amount, accno: userInfi.accno,
            pan_no: userInfi.pan_no, ifsc: userInfi.ifsc, oid, wallet: userInfi.wallet
        };
        let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/addWithdrawal`, {
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
            let data2 = { token: token, email: userInfi.email, walletUp }
            let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateuser`, {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data2),
            })
            setwallet(wallet - amount)
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
        <div className='containerr catoBack flex relative'>
            <Head>
                <title>Patti Circle - Withdrawal</title>
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
            <Link href={'/'}><div className="gotoHome right-10 top-10 fixed cursor-pointer text-green-900 p-2 bg-white font-bold text-4xl"><AiOutlineClose /></div></Link>
            {lodingS === false && <span className="fixed flex justify-center items-center text-green-900 text-lg top-1/2 w-full"><Image src={"/loader.gif"} width={50} height={50} /></span>}
            <div className="checkout-title my-8 mx-5 w-full flex flex-row">
                {/* <div className='left-side bg-white w-1/5 mr-5 border border-gray-200 rounded-sm py-5 px-5 shadow-sm h-72'>
            <div className="subtotal text-3xl text-gray-800 flex justify-start pb-2">Filters</div>
          </div> */}
                <div className='right-side mx-auto bg-white yourOrderW text-3xl text-gray-800 border border-gray-200 rounded-sm py-8 px-5 shadow-sm'>
                    <p className='flex justify-center items-center text-4xl py-3 text-gray-700'>Withdraw Coin</p>
                    <div className="collection_with coin_with product flex yourOrderCol justify-center items-center flex-col w-full mb-5 mt-3 border-t-2 border-b-2 border-gray-300 p-9">
                        <div className="box_bank flex justify-center flex-row items-center w-full">
                            <div className="coin_with product flex yourOrderCol justify-center items-center flex-col w-full mb-5 mt-3   p-9">
                                <div className="coin flex text-2xl cursor-pointer text-yellow-700 pb-4 mt-5"><span className='mr-5'> Your Wallet </span>  <RiCoinsLine className="mr-1 text-3xl" />  <span className="text-3xl">{wallet}</span></div>
                                <div className="amount_bit py-3 w-3/4 pt-5">
                                    <p className='text-base pb-3'>Enter Coin want to Withdraw</p>
                                    <input value={amount} onChange={handleChange} autoComplete="off" type="text" id="amount" name='amount' placeholder='Enter Coins' required className="p-3 outline-none w-full border-green-700 mb-5  text-gray-600 text-base border px-2" />
                                </div>
                            </div>

                            <div className="coin_with product flex yourOrderCol justify-center items-center flex-col w-full mb-5 mt-3  p-9 pb-0 border-l-2">
                                <div className="details text-base">
                                    <div className="p font-medium text-2xl pb-2">Bank Details</div>
                                    <p className='headTitle p-1 font-medium'>Name :  <span className='font-normal'>{userInfi.name}</span></p>
                                    <p className='headTitle p-1 font-medium'>Email :  <span className='font-normal'>{userInfi.email}</span></p>
                                    <p className='headTitle p-1 font-medium'>Mobile Number :  <span className='font-normal'>{userInfi.phone}</span></p>
                                    <p className='headTitle p-1 font-medium'>Pan Number :  <span className='font-normal'>{userInfi.pan_no}</span></p>
                                    <p className='headTitle p-1 font-medium'>Bank IFSC :  <span className='font-normal'>{userInfi.ifsc}</span></p>
                                    <p className='headTitle p-1 font-medium'>Bank Account Number :  <span className='font-normal'>{userInfi.accno}</span></p>
                                </div>
                            </div>
                        </div>
                        <div className="box_button flex justify-around flex-row items-center w-full">
                            <div className="botton_bit flex justify-between items-center">
                                <button onClick={initiatePayment} className='font-medium text-lg rounded-full disabled:bg-green-500 hover:disabled:text-white disabled:cursor-default bg-green-700 w-52 px-4 py-3 hover:bg-white text-white hover:text-gray-800 border transition-all border-green-700'><h6>Withdraw</h6></button>
                            </div>
                            <div className="botton_bit flex justify-between items-center">
                                <Link href={'/account'}><button onClick={initiatePayment} className='font-medium text-lg rounded-full disabled:bg-green-500 hover:disabled:text-white disabled:cursor-default bg-green-700 w-52 px-4 py-3 hover:bg-white text-white hover:text-gray-800 border transition-all border-green-700'><h6>Update</h6></button></Link>
                            </div>
                        </div>
                    </div>

                    <div className="products flex flex-col w-full text-sm mt-8">
                        <p className='flex justify-center items-center text-4xl py-8 text-gray-700'>Withdrawal List</p>
                        {orders.length == 0 && <div className="flex justify-center text-4xl text-green-700 py-20 items-center border-t border-b border-gray-200">
                            Your Order List is Empty....
                        </div>}
                        {updatedOrders.map((item, index) => {
                            return <div key={item._id} className="product flex yourOrderCol justify-center flex-row w-full mb-5 border-t-2 border-b-2 border-gray-300 p-9 hover:bg-gray-100">
                                <div className="product-text yourOrderWT flex justify-start flex-col">
                                    <h1 className='text-2xl pb-1 font-medium'>{item.createdAt.substring(0, 10)}, {item.time}
                                    </h1>
                                    <p className='text-lg pb-1'>Order id :  <span>#{item.orderId}</span></p>
                                    <p className='text-lg pb-1'>Coin : {item.amount}</p>
                                    <p className='text-lg pb-1'>Status : {item.status}</p>
                                </div>
                            </div>
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Withdrawal