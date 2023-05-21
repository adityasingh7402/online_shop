import React from 'react'
import { AiOutlineClose } from "react-icons/ai";
import Link from 'next/link';

const terms = () => {
    return (
        <div className='containerr w-full h-screen relative'>
            <Link href={'/'}><div className="gotoHome right-10 top-10 fixed cursor-pointer text-red-900 p-2 bg-white font-bold text-4xl"><AiOutlineClose /></div></Link>
            <div className="containerterm text-white p-20">
                <div className="headingss pb-10">
                    <h1 className='text-5xl font-medium pb-3'>Terms & Conditions:</h1>
                    <p className='text-lg'>Here are Patti Circle rules and a step-by-step guide on how to play Patti Circle game:</p>
                </div>
                <ul className="points w-3/4 list-disc">
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
                        <span className='font-medium pr-2 text-lg'>Winner:</span>After winning the game player will be credited winning amount in their Patti Circle’s account. 10% service charge will be debited from the winning amount.
                    </li>
                    <li className="pointlis pb-4">
                        <span className='font-medium pr-2 text-lg'>Transfers:</span>Players can cash anytime their coins by giving request to Patti Circle. Within 24 Hours their coins in cash will be credited in their given account to Patti Circle. Request minimum of 500 Coins or more will be acceptable and not less than 500 coins.
                    </li>
                    <li className="pointlis pb-4">
                        <span className='font-medium pr-2 text-lg'>Refund:</span>One bet started no refund will be entertained.
                    </li>
                    <li className="pointlis pb-4">
                        <span className='font-medium pr-2 text-lg'>Contact:</span>Objectives may contact by sent mail if any quarry they have in Contact us link.
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default terms