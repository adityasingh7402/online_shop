import React from 'react'
import { AiOutlineClose } from "react-icons/ai";
import Link from 'next/link';

const faq = () => {
    return (
        <div className='containerr w-full h-screen relative'>
            <Link href={'/'}><div className="gotoHome right-10 top-10 fixed cursor-pointer text-red-900 p-2 bg-white font-bold text-4xl"><AiOutlineClose /></div></Link>
            <div className="containerterm text-white p-20 w-3/4">
                <div className="headingss pb-10">
                    <h1 className='text-5xl font-medium pb-2'>FAQ About Patti Circle Game</h1>
                </div>
                <div className="pointss pb-6">
                    <h1 className='text-xl font-medium pb-2'>Can I play Patti Circle for real cash?</h1>
                    <p>Yes, you can play Patti Circle for real cash online by purchasing its coins. You should learn the game rules well and practice a lot before you start playing for real cash. Learn all the tricks of the game to excel in Patti Circle online.</p>
                </div>
                <div className="pointss pb-6">
                    <h1 className='text-xl font-medium pb-2'>Which card is the highest in the Patti Circle game?</h1>
                    <p>One lucky card number already given from 3 cards, choose at which number the lucky card is.</p>
                </div>
                <div className="pointss pb-6">
                    <h1 className='text-xl font-medium pb-2'>How do you play Patti Circle game online?</h1>
                    <p>You can play Patti Circle game online with a Patti Circle mobile app and on your laptop also. The game begins with three cards. You have to choose your lucky card. Once you choose your number, Waite for the result from Patti Circle. If you win, the winning coins will be credited in your Patti Circle’s account.</p>
                </div>
            </div>
        </div>
    )
}

export default faq