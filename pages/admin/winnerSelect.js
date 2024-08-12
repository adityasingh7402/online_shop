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
    const myuser = JSON.parse(localStorage.getItem("myuser"));
    
    if (myuser && myuser.token) {
      setusers(myuser.email);
    }

    const allowedEmails = process.env.NEXT_PUBLIC_ALLOWED_EMAILS?.split(',');

    if (!myuser || !allowedEmails.includes(myuser.email)) {
      router.push('/');
    } else {
      setIsHidden(false);
    }
  }, []);

  let amountFfitst = 0;
  let amountSfitst = 0;
  let amountTfitst = 0;
  winnOrder.forEach((obj) => {
    const objj = obj.cardDetails;
    const amounts = obj.amount;
    console.log(amounts + "amount")
    const randomNumValue = objj.randomNum;
    if (randomNumValue == randomNum.card1) {
      firstCf++;
      amountFfitst = amountFfitst + amounts;
    }
    if (randomNumValue == randomNum.card2) {
      secondCf++;
      amountSfitst = amountSfitst + amounts;
    }
    if (randomNumValue == randomNum.card3) {
      thirdCf++;
      amountTfitst = amountTfitst + amounts;
    }
  });
  const handleUserSubmit = async () => {
    let data = { randomNum: selectUsers.randomNum, cardno: selectUsers.cardno }
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
    if (res.success) {
      let randomNo1 = 0, randomNo2 = 0, randomNo3 = 0;
      while (randomNo1 === 0 || randomNo2 === 0 || randomNo3 === 0) {
        let randoRand = Math.floor(Math.random() * 13) + 1;

        if (randomNo1 === 0 && randoRand !== randomNum.card1) {
          randomNo1 = randoRand;
        } else if (randomNo2 === 0 && randoRand !== randomNum.card2 && randoRand !== randomNo1) {
          randomNo2 = randoRand;
        } else if (randomNo3 === 0 && randoRand !== randomNum.card3 && randoRand !== randomNo1 && randoRand !== randomNo2) {
          randomNo3 = randoRand;
        }
      }
      let data2 = { randomNum: selectUsers.randomNum, first_no: randomNo1, second_no: randomNo2, third_no: randomNo3,}
      let a2 = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateCardN`, {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data2),
      })
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
        <div className="grid_random flex flex-row justify-around items-center">
          <div className="fircol flex justify-between items-center mt-8">
            <div onClick={() => { selectUser(randomNum.card1, 1); }} className="card_box flex cursor-pointer text-lg hover:bg-gray-200 active:bg-gray-200 justify-center items-center flex-col border border-gray-300 p-10">
              {/* <div className="cardno">Card no- 1,  Random No- {randomNum.card1}</div> */}
              <div className="cardno">Card no- {randomNum.card1}</div>
              <div className="noOfCard">Total Users: {firstCf}</div>
              <div className="noOfCard">Total Bit Amount:  ₹{amountFfitst}</div>
            </div>
          </div>
          <div className="fircol flex justify-between items-center mt-8">
            <div onClick={() => { selectUser(randomNum.card2, 2); }} className="card_box flex cursor-pointer text-lg hover:bg-gray-200 active:bg-gray-200 justify-center items-center flex-col border border-gray-300 p-10">
              {/* <div className="cardno">Card no- 2,  Random No- {randomNum.card1}</div> */}
              <div className="cardno">Card no- {randomNum.card2}</div>
              <div className="noOfCard">Total Users: {secondCf}</div>
              <div className="noOfCard">Total Bit Amount: ₹{amountSfitst}</div>
            </div>
          </div>
          <div className="fircol flex justify-between items-center mt-8">
            <div onClick={() => { selectUser(randomNum.card3, 3); }} className="card_box flex cursor-pointer text-lg hover:bg-gray-200 active:bg-gray-200 justify-center items-center flex-col border border-gray-300 p-10">
              {/* <div className="cardno">Card no- 3,  Random No- {randomNum.card1}</div> */}
              <div className="cardno">Card no- {randomNum.card3}</div>
              <div className="noOfCard">Total Users: {thirdCf}</div>
              <div className="noOfCard">Total Bit Amount:  ₹{amountTfitst}</div>
            </div>
          </div>
        </div>
        <div className="btnn flex justify-center items-center pt-10">
          <div className="fircol flex justify-between items-center mt-8">
            <div className="card_box flex cursor-pointer text-lg hover:bg-gray-200 active:bg-gray-200 justify-center items-center flex-col border border-gray-300 p-10">
              {/* <div className="cardno">Card no- {selectUsers.cardno},  Random No- {selectUsers.randomNum}</div> */}
              <div className="cardno">Card no- {selectUsers.cardno}</div>
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

  const winnOrder = await Order.find({
    winning: "Pending"
  });
  let randomNum = await RandomNSchema.findOne();
  return {
    props: { winnOrder: JSON.parse(JSON.stringify(winnOrder)), randomNum: JSON.parse(JSON.stringify(randomNum)) },
  }; s
}

export default WinnerSelect