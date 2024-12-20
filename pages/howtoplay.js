import React from 'react'
import { AiOutlineClose } from "react-icons/ai";
import Link from 'next/link';

const Howtoplay = () => {
    return (
        <div className='containerr w-full phonesers h-full relative'>
            <div className="gotoHome right-10 btphonre top-10 fixed cursor-pointer font-bold text-4xl">
                <Link href={'/'}><a><div className="flex cursor-pointer justify-center items-center"><button className='rounded-full sversti bg-red-900 text-lg px-12 mt-8 py-3 hover:bg-white text-white hover:text-gray-800 border transition-all border-red-800'>Go Back</button></div></a></Link>
            </div>
            <div className="containerterm text-white p-20 w-3/4 witchsev mx-auto">
                    <div className="headingss pb-10">
                        <h1 className='text-3xl font-medium pb-2'>How to Play Pattiwinner.Com</h1>
                    </div>
                <ul className='list-disc'>
                    <li className="pointss pb-6">
                        <h1 className='text-xl font-medium pb-2'>The Objective:</h1>
                        <ul className='list-disc pl-10 paddisp'>
                            <li className='text-base'>Patti Circle is once in a day Bet game. The Bet starts daily from 6am early in the morning to 11pm Midnight. The bet result will be shown in your account after one hour from the Bet time closed.</li>
                            <li className='text-base'>To start the Bet, Player has to invest their Coins in Bet. Players can take coins as much as they want from Patti Circle by making request of it on. The coins are safe and may be redeemed any time by giving request to Patti Circle.</li>
                            <li className='text-base'>In Patti Circle game, the objective has to guess which one is lucky card with the best 3 cards given by Patti Circle. Players bet on the strength of their mind/experience/luck and skill. The player with hit lucky card wins the game.</li>
                        </ul>
                    </li>
                    <li className="pointss pb-6">
                        <h1 className='text-xl font-medium pb-2'>Choose Your Lucky Card Number:</h1>
                        <p className='text-base pl-5 paddisp'>Select lucky card from the given three cards. The player click with lucky number becomes winner.</p>
                    </li>
                    <li className="pointss pb-6">
                        <h1 className='text-xl font-medium pb-2'>Place the Bet Amount:</h1>
                        <p className='text-base pl-5 paddisp'>Before the bet start, each player contributes a predetermined number of coins to the pot. The pot is the central area where all wagers are placed.</p>
                    </li>
                    <li className="pointss pb-6">
                        <h1 className='text-xl font-medium pb-2'>Guess the Card:</h1>
                        <p className='text-base pl-5 paddisp'>The player has to guess the lucky card from the given three cards. </p>
                    </li>
                    <li className="pointss pb-6">
                        <h1 className='text-xl font-medium pb-2'>Winner:</h1>
                        <p className='text-base pl-5 paddisp'>After winning the game, coins will be credited their Patti Circle’s account.</p>
                    </li>
                    <li className="pointss pb-6">
                        <h1 className='text-xl font-medium pb-2'>Cancellation:</h1>
                        <p className='text-base pl-5 paddisp'>Once Bet done, cancellation will not do in any condition.</p>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Howtoplay