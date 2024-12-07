import React from 'react'
import { AiOutlineClose } from "react-icons/ai";
import Link from 'next/link';

const faq = () => {
    return (
        <div className='containerr w-full phonesers h-full relative'>
            <div className="gotoHome right-10  btphonre top-10 fixed cursor-pointer font-bold text-4xl">
                <Link href={'/'}><a><div className="flex cursor-pointer justify-center items-center"><button className='rounded-full sversti bg-red-900 text-lg px-12 mt-8 py-3 hover:bg-white text-white hover:text-gray-800 border transition-all border-red-800'>Go Back</button></div></a></Link>
            </div>
            <div className="containerterm text-white p-20 w-3/4 witchsev mx-auto">
                <div className="headingss pb-10">
                    <h1 className='text-4xl font-medium pb-2'>FAQ About Patti Circle Game</h1>
                </div>
                <div className="pointss pb-6">
                    <h1 className='text-xl font-medium pb-2'>What is Patti Circle Game?</h1>
                    <p className='pl-2 paddisp text-base'>Patti Circle is probably one of the easiest and most entertaining card game. Patti Circle is known for its simple and easy-to-understand rules. It is played using standard 3-card without jokers by yourself only. This is totally base on one lucky card which you have to choose from given 3 cards.</p>
                </div>
                <div className="pointss pb-6">
                    <h1 className='text-xl font-medium pb-2'>Patti Circle Game Online</h1>
                    <p className='pl-2 paddisp text-base'>In Patti Circle, the player with the lucky card number wins the pot. Remember that Patti Circle is a game of skill, experience & luck. These basic Patti Circle rules can help you understand the game but it will take a lot of practice and skills to win. Therefore, it is recommended that you play responsibly and within your limits.</p>
                </div>
                <div className="pointss pb-6">
                    <h1 className='text-xl font-medium pb-2'>Why Patti Circle is Better than Others Games</h1>
                    <p className='pl-2 paddisp text-base'>Games have their own unique features and appeal to different audiences. Reasons why some people prefer Patti Circle over all:</p>
                    <ul className='list-disc pl-10 paddisp'>
                        <li className='text-base'><span>Skill-based:</span>Patti Circle is considered to be a more skill-based game than others. Patti Circle provides players with a platform to understand strategy well and make decisions based on the cards they are dealt.</li>
                        <li className='text-base'><span>More Widely Played:</span>Patti Circle is a more widely played game than others, particularly in India because of it simple & easy given task. Everybody can play easily this and no need of any kind of special tricks.</li>
                        <li className='text-base'><span>How do you play Patti Circle game online?</span>You can play Patti Circle game online with a Patti Circle mobile app and on your laptop also. The game begins with three cards. You have to choose your lucky card. Once you choose your number, Waite for the result from Patti Circle. If you win, the winning coins will be credited in your Patti Circle’s account.</li>
                        <li className='text-base'><span>Can I play Patti Circle for real cash?</span>Yes, you can play Patti Circle for real cash online by purchasing its coins. You should learn the game rules well before playing for cash. Learn all the tricks of the game to excel in Patti Circle online.</li>
                        <li className='text-base'><span>Which card is the highest in the Patti Circle game?</span>One lucky card number already will be given on website. Choose/guess one lucky card from given 3 cards on website at which number the lucky card number is.</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default faq