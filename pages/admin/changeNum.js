import { React, useEffect, useState } from "react";
import { useRouter } from "next/router";
import mongoose from "mongoose";
import RandomNSchema from "../../modal/randomCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const ChangeNum = ({randomNum}) => {
  const [isHidden, setIsHidden] = useState(true);
  const router = useRouter()
  useEffect(() => {
    const myuser = JSON.parse(localStorage.getItem("myuser"));
    if (!myuser || myuser.email !== "kingkong1738aj@gmail.com") {
      router.push('/');
    } else {
      setIsHidden(false);
    }
  }, []);

    const [first_no, setfirst_no] = useState()
    const [second_no, setsecond_no] = useState()
    const [third_no, setthird_no] = useState()

   
    const handleChange = async (e) => {
        if (e.target.name == 'first_no') {
          setfirst_no(e.target.value)
        }
        else if (e.target.name == 'second_no') {
          setsecond_no(e.target.value)
        }
        else if (e.target.name == 'third_no') {
          setthird_no(e.target.value)
        }
      }
   
   
   
    const handleUserSubmit = async () => {
        let data = { first_no, second_no, third_no}
        let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateCardN`, {
          method: 'POST', // or 'PUT'
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
        let res = await a.json()
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
      }else{
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
      if (isHidden) {
        return null;
      }
    return (
        <>
            <div className="shop-title w-max shadow-md shopCat text-center px-8 py-3 m-auto background text-white text-3xl rounded-sm">
                Orders - Admin Panel
            </div>
            <div className="box p-5">
                <div className="grid_random flex flex-row justify-around items-center">
                    <div className="flex flex-col relative p-5">
                        <label htmlFor="accno" className="text-base font-normal pl-1">First Number</label>
                        <input value={first_no} onChange={handleChange} type="number" name='first_no' id='first_no' required placeholder={randomNum.card1} className="p-2 input-bck text-gray-600 text-base border outline-none focus:border-green-700 border-green-700" />
                    </div>
                    <div className="flex flex-col relative p-5">
                        <label htmlFor="accno" className="text-base font-normal pl-1">Second Number</label>
                        <input value={second_no} onChange={handleChange} type="number" name='second_no' id='second_no' required placeholder={randomNum.card2} className="p-2 input-bck text-gray-600 text-base border outline-none focus:border-green-700 border-green-700" />
                    </div>
                    <div className="flex flex-col relative p-5">
                        <label htmlFor="accno" className="text-base font-normal pl-1">Third Number</label>
                        <input value={third_no} onChange={handleChange} type="number" name='third_no' id='third_no' required placeholder={randomNum.card3} className="p-2 input-bck text-gray-600 text-base border outline-none focus:border-green-700 border-green-700" />
                    </div>
                </div>
                <div className="btnn flex justify-center items-center pt-10">
                <button onClick={handleUserSubmit} className='rounded-full bg-green-700 text-lg px-8 mt-10 py-2 hover:bg-white text-white hover:text-gray-800 border transition-all border-green-700'><p>Update Number</p></button>
                </div>
            </div>
        </>
    );
};

export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState) {
      await mongoose.connect(process.env.MONGO_URI);
    }
    let randomNum = await RandomNSchema.findOne();
    return {
      props: { randomNum: JSON.parse(JSON.stringify(randomNum)) },
    };
  }
  

export default ChangeNum;
