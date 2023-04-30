import React, { useEffect, useState } from 'react'
import { useRouter } from "next/router";
import Order from "../../modal/Order";
import mongoose from "mongoose";
import RandomNSchema from '../../modal/randomCard';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WinnerSelect = ({ winnOrder, randomNum, selectUsers, selectUser }) => {
  const router = useRouter()

  let firstCf = 0;
  let firstCs = 0;
  let firstCt = 0;
  let secondCf = 0;
  let secondCs = 0;
  let secondCt = 0;
  let thirdCf = 0;
  let thirdCs = 0;
  let thirdCt = 0;
  const [users, setusers] = useState("")
  const [isHidden, setIsHidden] = useState(true);
  useEffect(() => {
    const myuser = JSON.parse(localStorage.getItem("myuser"))
    if (myuser && myuser.token) {
      setusers(myuser.email)
    }
    if (!myuser || myuser.email !== "kingkong1738aj@gmail.com") {
      router.push('/');
    } else {
      setIsHidden(false);
    }
    
  }, [])
  winnOrder.forEach((obj) => {
      const objj = obj.cardDetails;
      const randomNumValue = objj.randomNum;
      const cardnoValue = objj.cardno;
      if (randomNumValue == randomNum.card1 && cardnoValue == 1) {
        firstCf++;
      }
      if (randomNumValue == randomNum.card2 && cardnoValue == 1) {
        firstCs++;
      }
      if (randomNumValue == randomNum.card3 && cardnoValue == 1) {
        firstCt++;
      }
      if (randomNumValue == randomNum.card1 && cardnoValue == 2) {
        secondCf++;
      }
      if (randomNumValue == randomNum.card2 && cardnoValue == 2) {
        secondCs++;
      }
      if (randomNumValue == randomNum.card3 && cardnoValue == 2) {
        secondCt++;
      }
      if (randomNumValue == randomNum.card1 && cardnoValue == 3) {
        thirdCf++;
      }
      if (randomNumValue == randomNum.card2 && cardnoValue == 3) {
        thirdCs++;
      }
      if (randomNumValue == randomNum.card3 && cardnoValue == 3) {
        thirdCt++;
      }
    });
  const handleUserSubmit = async () => {
    let data = { randomNum: selectUsers.randomNum, cardno: selectUsers.cardno}
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updatestatus`, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    let res = await a.json()
    if (res.success) {
      toast.success("Successfully Updated Details", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
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
    <div>
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
      <div className="box p-5">
        <div className="grid_random flex flex-col justify-around items-center">
          <div className="fircol flex justify-between items-center">
            <div onClick={() => { selectUser(randomNum.card1, 1); }} className="card_box flex cursor-pointer hover:bg-gray-200 justify-center items-center flex-col border border-gray-300 p-5 mr-10">
              <div className="cardno">Card no- 1,  Random No- {randomNum.card1}</div>
              <div className="noOfCard">{firstCf}</div>
            </div>
            <div onClick={() => { selectUser(randomNum.card2, 1); }} className="card_box flex cursor-pointer hover:bg-gray-200 justify-center items-center flex-col border border-gray-300 p-5 mr-10">
              <div className="cardno">Card no- 1,  Random No- {randomNum.card2}</div>
              <div className="noOfCard">{firstCs}</div>
            </div>
            <div onClick={() => { selectUser(randomNum.card3, 1); }} className="card_box flex cursor-pointer hover:bg-gray-200 justify-center items-center flex-col border border-gray-300 p-5 mr-10">
              <div className="cardno">Card no- 1,  Random No- {randomNum.card3}</div>
              <div className="noOfCard">{firstCt}</div>
            </div>
          </div>
          <div className="fircol flex justify-between items-center mt-8">
            <div onClick={() => { selectUser(randomNum.card1, 2); }} className="card_box flex cursor-pointer hover:bg-gray-200 justify-center items-center flex-col border border-gray-300 p-5 mr-10">
              <div className="cardno">Card no- 2,  Random No- {randomNum.card1}</div>
              <div className="noOfCard">{secondCf}</div>
            </div>
            <div onClick={() => { selectUser(randomNum.card2, 2); }} className="card_box flex cursor-pointer hover:bg-gray-200 justify-center items-center flex-col border border-gray-300 p-5 mr-10">
              <div className="cardno">Card no- 2,  Random No- {randomNum.card2}</div>
              <div className="noOfCard">{secondCs}</div>
            </div>
            <div onClick={() => { selectUser(randomNum.card3, 2); }} className="card_box flex cursor-pointer hover:bg-gray-200 justify-center items-center flex-col border border-gray-300 p-5 mr-10">
              <div className="cardno">Card no- 2,  Random No- {randomNum.card3}</div>
              <div className="noOfCard">{secondCt}</div>
            </div>
          </div>
          <div className="fircol flex justify-between items-center mt-8">
            <div onClick={() => { selectUser(randomNum.card1, 3); }} className="card_box flex cursor-pointer hover:bg-gray-200 justify-center items-center flex-col border border-gray-300 p-5 mr-10">
              <div className="cardno">Card no- 3,  Random No- {randomNum.card1}</div>
              <div className="noOfCard">{thirdCf}</div>
            </div>
            <div onClick={() => { selectUser(randomNum.card2, 3); }} className="card_box flex cursor-pointer hover:bg-gray-200 justify-center items-center flex-col border border-gray-300 p-5 mr-10">
              <div className="cardno">Card no- 3,  Random No- {randomNum.card2}</div>
              <div className="noOfCard">{thirdCs}</div>
            </div>
            <div onClick={() => { selectUser(randomNum.card3, 3); }} className="card_box flex cursor-pointer hover:bg-gray-200 justify-center items-center flex-col border border-gray-300 p-5 mr-10">
              <div className="cardno">Card no- 3,  Random No- {randomNum.card3}</div>
              <div className="noOfCard">{thirdCt}</div>
            </div>
          </div>
        </div>
        <div className="btnn flex justify-center items-center pt-10">
          <button onClick={handleUserSubmit} className='rounded-full bg-green-700 text-lg px-8 mt-10 py-2 hover:bg-white text-white hover:text-gray-800 border transition-all border-green-700'><p>Update Number</p></button>
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  const yesterdayStart = new Date();
  yesterdayStart.setDate(yesterdayStart.getDate() - 1);
  yesterdayStart.setHours(0, 0, 0, 0);

  const yesterdayEnd = new Date();
  yesterdayEnd.setDate(yesterdayEnd.getDate() - 1);
  yesterdayEnd.setHours(23, 59, 59, 999);

  const winnOrder = await Order.find({
    createdAt: {
      $gte: yesterdayStart,
      $lt: yesterdayEnd
    },winning: "Pending"
  });
  let randomNum = await RandomNSchema.findOne();
  return {
    props: { winnOrder: JSON.parse(JSON.stringify(winnOrder)), randomNum: JSON.parse(JSON.stringify(randomNum)) },
  };
}

export default WinnerSelect