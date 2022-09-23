import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Head from "next/head";
import Script from "next/script"
import { useRouter } from "next/router";

const Checkout = ({ cart, addToCart, removeFromCart, clearCart, subTotal, toggleCart, deleteFromCart }) => {
    const [name, setname] = useState("")
    const [phone, setphone] = useState("")
    const [pincode, setpincode] = useState("")
    const [address, setaddress] = useState("")
    const [landmark, setlandmark] = useState("")
    const [alphone, setalphone] = useState("")
    const [email, setemail] = useState("")
    const [city, setcity] = useState("")
    const [state, setstate] = useState("")
    const [disabled, setdisabled] = useState(true)
    const [user, setuser] = useState({ value: null })
    const [mobilevalid, setmobilevalid] = useState(true)
    const [validpincode, setvalidpincode] = useState(true)
    const [lodingS, setlodingS] = useState(true)

    const router = useRouter()
    useEffect(() => {
        const myuser = JSON.parse(localStorage.getItem("myuser"))
        if (myuser && myuser.token) {
            setuser(myuser)
            setemail(myuser.email)
            fetchdata(myuser.token)
        }
    }, [])

    useEffect(() => {
        if (name && pincode.length == 6 && address && landmark && email) {
            setdisabled(false)
        }
        else {
            setdisabled(true)
        }
    }, [name, email, phone, pincode, address, landmark])

    const fetchdata = async (token) => {
        setlodingS(false)
        let data = { token: token }
        let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        let res = await a.json()
        setaddress(res.address)
        setphone(res.phone)
        setpincode(res.pincode)
        setname(res.name)
        setlandmark(res.landmark)
        getPincode(res.pincode)
        setlodingS(true)
    }

    const getPincode = async (pin) => {
        let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
        let pinJson = await pins.json();
        if (Object.keys(pinJson).includes(pin)) {
            setstate(pinJson[pin][0])
            setcity(pinJson[pin][1])
        }
        else {
            setstate('')
            setcity('')
        }
    }

    const handleChange = async (e) => {
        if (e.target.name == 'name') {
            setname(e.target.value)
        }
        else if (e.target.name == 'phone') {
            setphone(e.target.value)
            setTimeout(() => {
                if (e.target.value.length <= 9 || e.target.value.length >= 11) {
                    setmobilevalid(false)
                }
                else {
                    setmobilevalid(true)
                }
            }, 3000);
        }
        else if (e.target.name == 'pincode') {
            setpincode(e.target.value)
            if (e.target.value.length == 6) {
                getPincode(e.target.value)
            }
            else {
                setstate('')
                setcity('')
            }
            setTimeout(() => {
                if (e.target.value.length <= 5 || e.target.value.length >= 7) {
                    setvalidpincode(false)
                }
                else {
                    setvalidpincode(true)
                }
            }, 3000);
        }
        else if (e.target.name == 'address') {
            setaddress(e.target.value)
        }
        else if (e.target.name == 'landmark') {
            setlandmark(e.target.value)
        }
        else if (e.target.name == 'alphone') {
            setalphone(e.target.value)
        }
        else if (e.target.name == 'email') {
            setemail(e.target.value)
        }
        else if (e.target.name == 'city') {
            setcity(e.target.value)
        }
        else if (e.target.name == 'state') {
            setstate(e.target.value)
        }
    }
    const initiatePayment = async () => {
        setlodingS(false)
        let oid = Math.floor(Math.random() * Date.now());
        let amount = subTotal + 40;
        const data = { cart, subTotal, oid, amount, email: email, name, phone, pincode, address, state, city, landmark };
        let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pretransaction`, {
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
    return (
        <>
            <div className="catoBack flex">
                <Head>
                    <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
                    <title>Fresh Frveg - Checkout</title>
                    <meta
                        name="description"
                        content="Shop fresh Fruits and vegetables online"
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
                    {lodingS === false && <span className="fixed flex justify-center z-10 items-center text-green-900 text-lg top-1/2 w-full"><Image src={"/loader.gif"} width={50} height={50} /></span>}
                <div className="checkout-title relative my-8 mx-5 prevewCol PreBox w-full flex flex-row">
                    <div className="left-side bg-white letfWidth w-4/5 text-3xl text-gray-800 border border-gray-200 rounded-sm py-8 px-10 shadow-sm">
                        <p className="border-b headingPr pb-2 border-gray-200">DELIVERY ADDRESS</p>
                        <div className="delivery-detail pl-16 w-ThreebyF chckoutDe py-8">
                            <div className="personal-d grid grid-cols-2 userGrid gap-4">
                                <div className="flex flex-col">
                                    <label htmlFor="name" className="text-base font-normal pl-1">Name</label>
                                    <input value={name} onChange={handleChange} type="text" name='name' id="name" required className="p-2 input-bck text-gray-600 text-base border outline-none focus:border-green-700 border-gray-200" />
                                </div>
                                <div className="flex flex-col relative">
                                    <label htmlFor="phone" className="text-base font-normal pl-1">10-digit mobile number</label>
                                    <input value={phone} onChange={handleChange} type="number" name='phone' id="phone" required className="p-2 input-bck text-gray-600 text-base border outline-none focus:border-green-700 border-gray-200" />
                                    {mobilevalid === false && <span className="text-red-700 text-sm absolute -bottom-5 right-0">Enter a valid Mobile number</span>}
                                </div>
                                <div className="flex flex-col relative">
                                    <label htmlFor="pincode" className="text-base font-normal pl-1">Pincode</label>
                                    <input value={pincode} onChange={handleChange} type="number" name='pincode' id="pincode" required className="p-2 input-bck text-gray-600 text-base border outline-none focus:border-green-700 border-gray-200" />
                                    {validpincode === false && <span className="text-red-700 text-sm absolute -bottom-5 right-0">Ender a valid Pincode</span>}
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="email" className="text-base font-normal pl-1">Email</label>
                                    {user && user.token ? <input value={user.email} readOnly type="email" name='email' id="email" className="p-2 input-bck text-gray-600 text-base border outline-none focus:border-green-700 border-gray-200" /> :
                                        <input value={email} onChange={handleChange} type="email" name='email' id="email" className="p-2 input-bck text-gray-600 text-base border outline-none focus:border-green-700 border-gray-200" />}
                                </div>
                            </div>
                            <label htmlFor="address" className="text-base font-normal pl-1">Address (Area and Street)</label>
                            <textarea value={address} onChange={handleChange} type="text" name='address' id="address" cols="57" required rows="3" className="p-3 w-full focus:border-green-700 resize-none border outline-none input-bck text-gray-600 text-base border-gray-200" />
                            <div className="personal-d grid grid-cols-2 userGrid gap-4">
                                <div className="flex flex-col">
                                    <label htmlFor="city" className="text-base font-normal pl-1">City/District/Town</label>
                                    <input value={city} onChange={handleChange} type="text" name='city' id="city" className="p-2 input-bck text-gray-600 text-base border outline-none focus:border-green-700 border-gray-200" />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="state" className="text-base font-normal pl-1">State</label>
                                    <input value={state} onChange={handleChange} type="text" name='state' id="state" className="p-2 input-bck text-gray-600 text-base border outline-none focus:border-green-700 border-gray-200" />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="landmark" className="text-base font-normal pl-1">Landmark</label>
                                    <input value={landmark} onChange={handleChange} type="text" name='landmark' id="landmark" required className="p-2 input-bck text-gray-600 text-base border outline-none focus:border-green-700 border-gray-200" />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="alphone" className="text-base font-normal pl-1">Alternate Phone (Optional)</label>
                                    <input value={alphone} onChange={handleChange} type="number" name='alphone' id="alphone" className="p-2 input-bck text-gray-600 text-base border outline-none focus:border-green-700 border-gray-200" />
                                </div>
                            </div>
                        </div>
                        <p className='headingPr paddiTop mt-8'>ORDER SUMMARY</p>
                        <div className="products flex flex-col w-full text-sm mt-8">
                            <div className='flex justify-between items-center'>
                                <div className="price-text flex justify-start px-4 text-base">Item</div>
                                <div className="price-text flex justify-end px-4 text-base">Price</div>
                            </div>
                            {Object.keys(cart).length == 0 && (
                                <div className="flex justify-center text-4xl text-green-700 py-10 items-center border-t border-b border-gray-200">
                                    Your cart is Empty...!
                                </div>
                            )}
                            {Object.keys(cart).map((k) => {
                                return (
                                    <div
                                        key={k}
                                        className="product flex flex-row w-full border-t-2 border-b-2 border-gray-200 p-3"
                                    >
                                        <div className="product-image w-36 flex justify-center imageProd mr-4">
                                            <img alt={cart[k].name} src={cart[k].image} />
                                        </div>
                                        <div className="product-text w-2/4 flex justify-start flex-col">
                                            <h1 className='text-2xl headPre font-medium'>{cart[k].name}</h1>
                                            <p className='text-lg'>{cart[k].variant}</p>
                                            <p className='text-sm text-green-700 font-medium'>In stock</p>
                                            <div className="impTool mt-4 flex flex-row">
                                                <div className="qytselet relative flex border-r border-gray-200 px-3 items-center">
                                                    <AiOutlineMinusCircle onClick={() => { removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].variant, cart[k].image) }} className='text-3xl font-normal cursor-pointer mr-2' />
                                                    <div className="qyantity w-11 rounded-sm text-center text-base h-7 border border-gray-600">{cart[k].qty}</div>
                                                    <AiOutlinePlusCircle onClick={() => { addToCart(k, 1, cart[k].price, cart[k].name, cart[k].variant, cart[k].image) }} className='text-3xl font-normal cursor-pointer ml-2' />
                                                </div>
                                                <div className="qytselet relative flex border-r border-gray-200 text-green-700 cursor-pointer hover:bg-gray-100 font-medium px-3 items-center">
                                                    <p onClick={() => { deleteFromCart(k, 1, cart[k].price, cart[k].name, cart[k].variant, cart[k].image) }}>Delete</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="product-price flex justify-end">
                                            <span className='text-2xl'>₹{cart[k].price}</span>
                                        </div>
                                    </div>
                                );
                            })}
                            <div className="flex justify-end">
                                <button
                                    onClick={clearCart}
                                    className="flex text-white font-medium text-sm rounded-full bg-red-700 justify-center w-28 mt-5  py-2 hover:text-gray-800 hover:bg-white border transition-all border-red-700"
                                >
                                    <p>Clear Cart</p>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="right-side bg-white w-1/5 rightWidth ml-5 border border-gray-200 rounded-sm py-8 px-5 shadow-sm h-72">
                        <div className='flex justify-end items-center pb-2 text-3xl text-gray-800'>
                            <div className="subtotal subJus pr-7">Subtotal :</div>
                            <div className='flex justify-end'>₹{subTotal}</div>
                        </div>
                        <div className="subtotal text-xl text-gray-800 flex justify-end pt-3  border-b-2 pb-2 border-gray-200">Delivery Charge : ₹40</div>
                        <div className="subtotal text-3xl text-gray-800 flex justify-end pt-10">
                            ₹{subTotal === 0 ? subTotal : subTotal + 40}
                        </div>
                        <div className="subtotal text-3xl text-gray-800 flex justify-end pt-3">
                            <button onClick={initiatePayment} disabled={disabled} className="relative flex cursor-pointer items-center text-white font-medium text-sm rounded-full disabled:bg-green-500 hover:disabled:text-white disabled:cursor-default bg-green-700 w-full justify-center  py-2 hover:text-gray-800 hover:bg-white border transition-all border-green-700">
                                <p>Proceed to Buy</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Checkout;
