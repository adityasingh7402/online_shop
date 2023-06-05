import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ToastContainer, toast } from 'react-toastify';
import { BsCashCoin} from "react-icons/bs";
import { AiOutlineLock } from "react-icons/ai";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router";
import Head from "next/head"

const Account = () => {
  const [name, setname] = useState("")
  const [phone, setphone] = useState("")
  const [accountHN, setaccountHN] = useState("")
  const [accno, setaccno] = useState("")
  const [email, setemail] = useState("")
  const [bankName, setbankName] = useState("")
  const [branch, setbranch] = useState("")
  const [upiId, setupiId] = useState("")
  const [ifsc, setifsc] = useState("")
  const [user, setuser] = useState({ value: null })
  const [mobilevalid, setmobilevalid] = useState(true)
  const [currentPass, setcurrentPass] = useState("")
  const [newPass, setnewPass] = useState("")
  const [ReEnter, setReEnter] = useState("")
  const [dispayName, setdispayName] = useState("")
  const [lodingS, setlodingS] = useState(true)
  const [lodingSS, setlodingSS] = useState(true)
  const [updated, setupdated] = useState(false)

  const [isHidden, setIsHidden] = useState(true);
  const router = useRouter()
  useEffect(() => {
    const myuser = JSON.parse(localStorage.getItem("myuser"));
    if (!myuser) {
      router.push('/');
    } else {
      setIsHidden(false);
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
    setphone(res.phone)
    setaccountHN(res.accountHN)
    setbranch(res.branch)
    setbankName(res.bankName)
    setupiId(res.UPINo)
    setname(res.name)
    setifsc(res.ifsc)
    setupdated(res.updated)
    setaccno(res.accno)
    setlodingS(true)
  }

  const handleUserSubmit = async () => {
    setlodingS(false)
    let data = { token: user.token, accountHN, phone, name, accno, ifsc, email, bankName, branch, upiId }
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateuser`, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    let res = await a.json()
    setlodingS(true)
    if(res.success){
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
  else{
    toast.error(res.error, {
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
      }, 2000);
    }
    else if (e.target.name == 'accountHN') {
      setaccountHN(e.target.value)
    }
    else if (e.target.name == 'ifsc') {
      setifsc(e.target.value)
    }
    else if (e.target.name == 'bankName') {
      setbankName(e.target.value)
    }
    else if (e.target.name == 'accno') {
      setaccno(e.target.value)
    }
    else if (e.target.name == 'upiId') {
      setupiId(e.target.value)
    }
    else if (e.target.name == 'branch') {
      setbranch(e.target.value)
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
  if (isHidden) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Patti Circle- Account</title>
        <meta
          name="description"
          content="Patti Circle win win Game"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="catoBack flex containerr">
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
          {lodingS === false && <span className="fixed flex justify-center z-10 items-center text-red-900 text-lg top-1/2 w-full"><Image src={"/loader.gif"} width={50} height={50} /></span>}
        <div className="account-title accFlexCo my-5 mx-20 w-full flex flex-row relative">
          <div className="right-side w-1/4 mr-5 leftSideAccW">
            <div className="flex accLeftSideN accLeftSideNMB flex-row bg-white justify-start border border-gray-200 rounded-sm py-5 px-5 shadow-sm h-min">
              <div className="image bg-red-500 rounded-full w-16 h-16 overflow-hidden mr-5"><div className="pt-1"><Image src={"/person.png"} width={60} height={60} /></div></div>
              <div className="Account">
                <div className="text-base text-gray-800 flex">Hello,</div>
                <div className="text-xl text-gray-800 flex">{dispayName}</div>
              </div>
            </div>
            <div className="flex accLeftSideN flex-row bg-white justify-start border border-gray-200 rounded-sm mt-5 py-5 px-5 shadow-sm h-min">
              <div className="Account">
                <ul>
                  <Link href={'/yourorder'}><a><li className="text-xl flex flex-row items-center pb-3"><BsCashCoin className="ml-2 mr-4 text-xl" /><span>Withdrawal Coin</span></li></a></Link>
                  <Link href={'#changepassword'}><a><li className="text-xl flex cursor-pointer flex-row items-center"><AiOutlineLock className="ml-2 mr-4 text-xl" /><span>Change Password</span></li></a></Link>
                  <Link href={'/'}><a><li className="flex cursor-pointer flex-row items-center"><button className='rounded-full bg-blue-700 text-lg px-12 mt-8 py-2 hover:bg-white text-white hover:text-gray-800 border transition-all border-red-700'>Home Page</button></li></a></Link>                  
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
                    <input value={name} onChange={handleChange} type="text" name='name' id="name" required className="p-2 input-bck text-gray-600 text-base border outline-none focus:border-red-700 border-gray-200" />
                  </div>
                  <div className="flex flex-col relative">
                    <label htmlFor="phone" className="text-base font-normal pl-1">10-digit Mobile Number</label>
                    <input value={phone} onChange={handleChange} type="number" name='phone' id="phone" required className="p-2 input-bck text-gray-600 text-base border outline-none focus:border-red-700 border-gray-200" />
                    {mobilevalid === false && <span className="text-red-700 text-sm absolute -bottom-5 right-0">Enter a valid Mobile number</span>}
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="email" className="text-base font-normal pl-1">Email</label>
                    {user && user.token ? <input value={user.email} readOnly type="email" name='email' id="email" className="p-2 input-bck text-gray-600 text-base border outline-none focus:border-red-700 border-gray-200" /> :
                      <input value={email} onChange={handleChange} type="email" name='email' id="email" className="p-2 input-bck text-gray-600 text-base border outline-none focus:border-red-700 border-gray-200" />}
                  </div>
                  <div className="flex flex-col relative">
                    <label htmlFor="bankName" className="text-base font-normal pl-1">Bank Name</label>
                    <input value={bankName} onChange={handleChange} type="text" name='bankName' id='bankName' required className="p-2 input-bck text-gray-600 text-base border outline-none focus:border-red-700 border-gray-200" />
                  </div>
                  <div className="flex flex-col relative">
                    <label htmlFor="accountHN" className="text-base font-normal pl-1">Account Holder Name</label>
                    <input value={accountHN} onChange={handleChange} type="text" name='accountHN' id='accountHN' required className="p-2 input-bck text-gray-600 text-base border outline-none focus:border-red-700 border-gray-200" />
                  </div>
                  <div className="flex flex-col relative">
                    <label htmlFor="accno" className="text-base font-normal pl-1">Account Number</label>
                    <input value={accno} onChange={handleChange} type="Number" name='accno' id='accno' required className="p-2 input-bck text-gray-600 text-base border outline-none focus:border-red-700 border-gray-200" />
                  </div>
                  {/* <div className="flex flex-col relative">
                    <label htmlFor="accountHN" className="text-base font-normal pl-1">Confirm Account Number</label>
                    <input value={Re_accno} onChange={handleChange} type="number" name='Re_accno' id="Re_accno" required className="p-2 input-bck text-gray-600 text-base border outline-none focus:border-red-700 border-gray-200" />
                  </div> */}
                  <div className="flex flex-col relative">
                    <label htmlFor="ifsc" className="text-base font-normal pl-1">Bank IFSC Code Number</label>
                    <input value={ifsc} onChange={handleChange} type="text" name='ifsc' id="ifsc" required className="p-2 input-bck text-gray-600 text-base border outline-none focus:border-red-700 border-gray-200" />
                  </div>
                  <div className="flex flex-col relative">
                    <label htmlFor="branch" className="text-base font-normal pl-1">Bank Branch Name</label>
                    <input value={branch} onChange={handleChange} type="text" name='branch' id="branch" required className="p-2 input-bck text-gray-600 text-base border outline-none focus:border-red-700 border-gray-200" />
                  </div>
                  <div className="flex flex-col relative">
                    <label htmlFor="upiId" className="text-base font-normal pl-1">{`UPI ID (Optional)`}</label>
                    <input value={upiId} onChange={handleChange} type="text" name='upiId' id="upiId" required className="p-2 input-bck text-gray-600 text-base border outline-none focus:border-red-700 border-gray-200" />
                  </div>
                </div>
                {!updated && <button onClick={handleUserSubmit} disabled={!mobilevalid} className='rounded-full disabled:bg-red-500 bg-red-700 text-lg px-12 mt-8 py-2 hover:bg-white text-white hover:text-gray-800 border transition-all border-red-700'>{lodingS === false ? <p>Updating</p> : <p>Update</p>}</button>}
                {updated && <Link href={'./contact'}><button className='rounded-full bg-red-700 text-lg px-12 mt-8 py-2 hover:bg-white text-white hover:text-gray-800 border transition-all border-red-700'><p>For Updating</p></button></Link>}
              </div>
            </div>
            <div className="passwordChng flex flex-col bg-white justify-start border mt-5 border-gray-200 rounded-sm py-5 px-10 shadow-sm h-min">
              <p className="border-b pb-2 border-gray-200 text-3xl">Change Password</p>
              <div className="accountInpuW pl-6 py-8">
                <div className="personal-d grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label htmlFor="currentPass" className="text-base font-normal pl-1">Type Current Password</label>
                    <input value={currentPass} onChange={handleChange} type="password" name='currentPass' id="currentPass" required className="p-2 input-bck text-gray-600 text-base border outline-none focus:border-red-700 border-gray-200" />
                  </div>
                  <div className="div"></div>
                  <div className="flex flex-col">
                    <label htmlFor="newPass" className="text-base font-normal pl-1">Type New Password</label>
                    <input value={newPass} onChange={handleChange} type="password" name='newPass' id="newPass" required className="p-2 input-bck text-gray-600 text-base border outline-none focus:border-red-700 border-gray-200" />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="ReEnter" className="text-base font-normal pl-1">Re-type New Password</label>
                    <input type="password" onChange={handleChange} value={ReEnter} name='ReEnter' id="ReEnter" required className="p-2 input-bck text-gray-600 text-base border outline-none focus:border-red-700 border-gray-200" />
                  </div>
                </div>
                <button onClick={handlePasswordSubmit} className='rounded-full bg-red-700 text-lg px-8 mt-10 py-2 hover:bg-white text-white hover:text-gray-800 border transition-all border-red-700'>{lodingSS === false ? <p>Changing Password</p> : <p>Change Password</p>}</button>
              </div>
              <Link href={'/'}><a><div className="flex cursor-pointer justify-center items-center"><button className='rounded-full bg-blue-700 text-lg px-12 mt-8 py-2 hover:bg-white text-white hover:text-gray-800 border transition-all border-red-700'>Home Page</button></div></a></Link>     
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Account