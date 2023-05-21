import React from 'react'
import { AiOutlineClose } from "react-icons/ai";
import Link from 'next/link';

const Howtoplay = () => {
    return (
        <div className='containerr w-full h-full relative'>
            <Link href={'/'}><div className="gotoHome right-10 top-10 fixed cursor-pointer text-red-900 p-2 bg-white font-bold text-4xl"><AiOutlineClose /></div></Link>
            <div className="containerterm text-white p-20 w-3/4">
                <div className="headingss pb-10">
                    <h1 className='text-5xl font-medium pb-2'>How to Play PattiCircle.Com</h1>
                </div>
                <div className="pointss pb-6">
                    <h1 className='text-xl font-medium pb-2'>What is Patti Circle Game?</h1>
                    <p>Patti Circle is probably one of the easiest and most entertaining card game. Patti Circle is known for its simple and easy-to-understand rules. The Patti Circle online game, also known as Indian flush, is one of the popular card games in India. It is played using standard 3-card without jokers by yourself only. This is totally base on one lucky card which you have to choose from given 3 cards.</p>
                </div>
                <div className="pointss pb-6">
                    <h1 className='text-xl font-medium pb-2'>Patti Circle Game for Real Cash Online</h1>
                    <p>In Patti Circle, the player with the lucky card number wins the pot. Remember that Patti Circle is a game of skill, experience & luck. These basic Patti Circle rules can help you understand the game but it will take a lot of practice and skills to win. Therefore, it is recommended that you play responsibly and within your limits.</p>
                </div>
                <div className="pointss pb-6">
                    <h1 className='text-xl font-medium pb-2'>Why Patti Circle is Better than Others Games</h1>
                    <p>Games have their own unique features and appeal to different audiences. Reasons why some people prefer Patti Circle over all:</p>
                </div>
                <ul className="points w-3/4 list-disc ml-5 pb-6">
                    <li className="pointlis pb-4">
                        <span className='font-medium pr-2 text-lg'>Skill-based: </span>Patti Circle is considered to be a more skill-based game than others. Patti Circle provides players with a platform to understand strategy well and make decisions based on the cards they are dealt.
                    </li>
                    <li className="pointlis pb-4">
                        <span className='font-medium pr-2 text-lg'>More Widely Played: </span>Patti Circle is a more widely played game than others, particularly in India because of it simple & easy given task. Everybody can play easily this and no need of any kind of special tricks.
                    </li>
                </ul>
                <div className="pointss pb-6">
                    <h1 className='text-xl font-medium pb-2'>The Objective:</h1>
                    <p>Patti Circle is a once in a day bet game. The bet starts daily from 12pm midnight to 11pm Midnight. The bet result will be shown in your account after one hour from the bet time closed.<br /> To start the bet, Player has to purchase Coins. One Coin cost is Re.1/-. Players can purchase as much as they want from Patti Circle. The coins are safe and may be redeemed any time from Patti Circle to Players bank account by given request to Patti Circle and within 24 Hours the Coins will be credited in their given bank account.
                        In Patti Circle game, the objective has to guess which one is lucky card with the best 3 cards given by Patti Circle. Players bet on the strength of their mind/experience/luck and skill. The player with hit lucky card wins the game.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Howtoplay