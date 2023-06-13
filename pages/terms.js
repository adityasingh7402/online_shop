import React from 'react'
import { AiOutlineClose } from "react-icons/ai";
import Link from 'next/link';

const terms = () => {
    return (
        <div className='containerr w-full phonesers h-screen relative'>
            <div className="gotoHome right-10 btphonre top-10 fixed cursor-pointer font-bold text-4xl">
                <Link href={'/'}><a><div className="flex cursor-pointer btphonre justify-center items-center"><button className='rounded-full sversti bg-red-900 text-lg px-12 mt-8 py-3 hover:bg-white text-white hover:text-gray-800 border transition-all border-red-800'>Go To Back</button></div></a></Link>
            </div>
            <div className="containerterm text-white w-3/4 mx-auto pt-20">
                <div className="headingss pb-10">
                    <h1 className='text-5xl font-medium pb-3'>Terms & Conditions:</h1>
                    <p className='text-lg'>Here are Patti Winner rules and a step-by-step guide on how to play Patti Winner game:</p>
                </div>
                <ul className="points list-disc">
                    <li className="pointlis pb-4">
                        <span className='font-medium pr-2 text-lg'>Choose your lucky card number:</span>Select lucky card from the given three cards. The player click with lucky number becomes winner.
                    </li>
                    <li className="pointlis pb-4">
                        <span className='font-medium pr-2 text-lg'>Place the Bet Amount:</span>Before the bet start, each player contributes a predetermined number of coins to the pot. The pot is the central area where all wagers are placed.
                    </li>
                    <li className="pointlis pb-4">
                        <span className='font-medium pr-2 text-lg'>Guess the Card:</span>For the game to begin, the player has to guess the lucky card from the given three cards.
                    </li>
                    <li className="pointlis pb-4">
                        <span className='font-medium pr-2 text-lg'>Winner:</span>After winning the game player will be credited winning amount in their Patti Winner’s account. 10% service charge will be debited from the winning amount.
                    </li>
                    <li className="pointlis pb-4">
                        <span className='font-medium pr-2 text-lg'>Transfers:</span>Players can cash anytime their coins by giving request to Patti Winner. Within 24 Hours their coins in cash will be credited in their given account to Patti Winner. Request minimum of 500 Coins or more will be acceptable and not less than 500 coins.
                    </li>
                    <li className="pointlis pb-4">
                        <span className='font-medium pr-2 text-lg'>Refund:</span>One bet started no refund will be entertained.
                    </li>
                    <li className="pointlis pb-4">
                        <span className='font-medium pr-2 text-lg'>Contact:</span>Objectives may contact by sent mail if any quarry they have in Contact us link.
                    </li>
                    <li className="pointlis font-medium pb-4">
                        <span className='font-medium pr-2 text-lg'>Age Factor:</span>Strictly not for under age of 21 Years....
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default terms