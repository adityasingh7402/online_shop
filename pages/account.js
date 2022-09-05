import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ToastContainer, toast } from 'react-toastify';
import { BsHandbag, BsTruck } from "react-icons/bs";
import { AiOutlineLock } from "react-icons/ai";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router";
import Head from "next/head"

const Account = () => {
  const router = useRouter()

  const [name, setname] = useState("")
  const [phone, setphone] = useState("")
  const [pincode, setpincode] = useState("")
  const [address, setaddress] = useState("")
  const [landmark, setlandmark] = useState("")
  const [email, setemail] = useState("")
  const [user, setuser] = useState({ value: null })
  const [mobilevalid, setmobilevalid] = useState(true)
  const [validpincode, setvalidpincode] = useState(true)
  const [currentPass, setcurrentPass] = useState("")
  const [newPass, setnewPass] = useState("")
  const [ReEnter, setReEnter] = useState("")
  const [dispayName, setdispayName] = useState("")
  const [lodingS, setlodingS] = useState(true)
  const [lodingSS, setlodingSS] = useState(true)

  useEffect(() => {
    const myuser = JSON.parse(localStorage.getItem("myuser"))
    if (!myuser) {
      router.push('/')
    }
    if (myuser && myuser.token) {
      setuser(myuser)
      setemail(myuser.email)
      fetchdata(myuser.token)
      setdispayName(myuser.name)
    }
  }, [])

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
    setlodingS(true)
  }

  const handleUserSubmit = async () => {
    setlodingS(false)
    let data = { token: user.token, address, pincode, phone, name, landmark }
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateuser`, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    let res = await a.json()
    setlodingS(true)
    toast.success("Successfully Updated Details", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
  const handlePasswordSubmit = async () => {
    setlodingSS(false)
    if (newPass == ReEnter) {
      let res;
      if (newPass == ReEnter) {
        let data = { token: user.token, ReEnter, newPass, currentPass }
        let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updatepassword`, {
          method: 'POST', // or 'PUT'
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
        res = await a.json()
        setnewPass('')
        setcurrentPass('')
        setReEnter('')
        setlodingSS(true)
      }
      else {
        res = { success: false }
      }
      if (res.success) {
        toast.success("Successfully Updated Password", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error("Wrong Password", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } else {
      toast.error("New Password is not matching with Re-type Password", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
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
    else if (e.target.name == 'currentPass') {
      setcurrentPass(e.target.value)
    }
    else if (e.target.name == 'newPass') {
      setnewPass(e.target.value)
    }
    else if (e.target.name == 'newPass') {
      setnewPass(e.target.value)
    }
    else if (e.target.name == 'ReEnter') {
      setReEnter(e.target.value)
    }
  }

  return (
    <>
      <Head>
        <title>Fresh Frveg - Account</title>
        <meta
          name="description"
          content="Shop fresh Fruits and vegetables online"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="catoBack flex">
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
          {lodingS === false && <span className="fixed flex justify-center items-center text-green-900 text-lg top-1/2 w-full"><Image src={"/loader.gif"} width={50} height={50} /></span>}
        <div className="account-title accFlexCo my-5 mx-20 w-full flex flex-row relative">
          <div className="right-side w-1/4 mr-5 leftSideAccW">
            <div className="flex accLeftSideN accLeftSideNMB flex-row bg-white justify-start border border-gray-200 rounded-sm py-5 px-5 shadow-sm h-min">
              <div className="image bg-green-500 rounded-full w-16 h-16 overflow-hidden mr-5"><div className="pt-1"><Image src={"/person.png"} width={60} height={60} /></div></div>
              <div className="Account">
                <div className="text-base text-gray-800 flex">Hello,</div>
                <div className="text-xl text-gray-800 flex">{dispayName}</div>
              </div>
            </div>
            <div className="flex accLeftSideN flex-row bg-white justify-start border border-gray-200 rounded-sm mt-5 py-5 px-5 shadow-sm h-min">
              <div className="Account">
                <ul>
                  <Link href={'/yourorder'}><a><li className="text-xl flex flex-row items-center pb-3"><BsHandbag className="ml-2 mr-4 text-xl" /><span>My Orders</span></li></a></Link>
                  <Link href={'#changepassword'}><a><li className="text-xl flex cursor-pointer flex-row items-center"><AiOutlineLock className="ml-2 mr-4 text-xl" /><span>Change Password</span></li></a></Link>
                </ul>
              </div>
            </div>
          </div>
          <div className="left-side w-4/5 rightSideAccW">
            <div className="persnalD flex flex-col bg-white justify-start border border-gray-200 rounded-sm py-5 px-10 shadow-sm h-min">
              <p className="border-b pb-2 border-gray-200 text-3xl">Personal Information</p>
              <div className="accountInpuW personal-d pl-6 py-8">
                <div className="personal-d grid grid-cols-2 gap-4">
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
                <div className="my-4" id="changepassword">
                  <label htmlFor="address" className="text-base font-normal pl-1">Address (Area and Street)</label>
                  <textarea value={address} onChange={handleChange} type="text" name='address' id="address" cols="57" required rows="3" className="p-3 w-full focus:border-green-700 resize-none border outline-none input-bck text-gray-600 text-base border-gray-200" />
                </div>
                <div className="personal-d grid grid-cols-2 gap-3">
                  <div className="flex flex-col">
                    <label htmlFor="landmark" className="text-base font-normal pl-1">Landmark</label>
                    <input value={landmark} onChange={handleChange} type="text" name='landmark' id="landmark" required className="p-2 input-bck text-gray-600 text-base border outline-none focus:border-green-700 border-gray-200" />
                  </div>
                </div>
                <button onClick={handleUserSubmit} className='rounded-full bg-green-700 text-lg px-12 mt-8 py-2 hover:bg-white text-white hover:text-gray-800 border transition-all border-green-700'>{lodingS === false ? <p>Updating</p> : <p>Update</p>}</button>
              </div>
            </div>
            <div className="passwordChng flex flex-col bg-white justify-start border mt-5 border-gray-200 rounded-sm py-5 px-10 shadow-sm h-min">
              <p className="border-b pb-2 border-gray-200 text-3xl">Change Password</p>
              <div className="accountInpuW pl-6 py-8">
                <div className="personal-d grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label htmlFor="currentPass" className="text-base font-normal pl-1">Type Current Password</label>
                    <input value={currentPass} onChange={handleChange} type="password" name='currentPass' id="currentPass" required className="p-2 input-bck text-gray-600 text-base border outline-none focus:border-green-700 border-gray-200" />
                  </div>
                  <div className="div"></div>
                  <div className="flex flex-col">
                    <label htmlFor="newPass" className="text-base font-normal pl-1">Type New Password</label>
                    <input value={newPass} onChange={handleChange} type="password" name='newPass' id="newPass" required className="p-2 input-bck text-gray-600 text-base border outline-none focus:border-green-700 border-gray-200" />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="ReEnter" className="text-base font-normal pl-1">Re-type New Password</label>
                    <input type="password" onChange={handleChange} value={ReEnter} name='ReEnter' id="ReEnter" required className="p-2 input-bck text-gray-600 text-base border outline-none focus:border-green-700 border-gray-200" />
                  </div>
                </div>
                <button onClick={handlePasswordSubmit} className='rounded-full bg-green-700 text-lg px-8 mt-10 py-2 hover:bg-white text-white hover:text-gray-800 border transition-all border-green-700'>{lodingSS === false ? <p>Changing Password</p> : <p>Change Password</p>}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Account