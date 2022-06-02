import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { RiAccountCircleLine } from 'react-icons/ri';
import { AiOutlineSearch } from 'react-icons/ai';



const navbar = () => {
  return (
    <div>
      <div className="background flex justify-between items-center shadow-sm shadow-gray-300 ... z-40 ...">
        <div className="nav flex justify-center items-center">
          <div className="logo mx-6"><Image src="/logo.png" width={100} height={70}/></div>
          <ul className="flex justify-center">
            <li className="mx-6 text-lg font-normal tracking-widest text-slate-50 hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r from-green-200 to-green-300 transition-all"><Link href="/"><a>Home</a></Link></li>
            <li className="mx-6 text-lg font-normal tracking-widest text-slate-50 hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r from-green-200 to-green-300 transition-all"><Link href="/about"><a>About</a></Link></li>
            <li className="mx-6 text-lg font-normal tracking-widest text-slate-50 hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r from-green-200 to-green-300 transition-all"><Link href="/shop"><a>Shop</a></Link></li>
            <li className="mx-6 text-lg font-normal tracking-widest text-slate-50 hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r from-green-200 to-green-300 transition-all"><Link href="/Vegitables"><a>Vegitables</a></Link></li>
            <li className="mx-6 text-lg font-normal tracking-widest text-slate-50 hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r from-green-200 to-green-300 transition-all"><Link href="/contact"><a>Contact</a></Link></li>
          </ul>
        </div>
        <div className="impLink flex justify-center items-center">
        <div className="cart mx-4 text-2xl cursor-pointer font-medium text-slate-50 hover:text-green-200 transition-all"><AiOutlineSearch/></div>
        <div className="cart mx-4 text-2xl cursor-pointer font-medium text-slate-50 hover:text-green-200 transition-all"><RiAccountCircleLine/></div>
        <div className="cart mx-4 text-2xl cursor-pointer font-medium text-slate-50 hover:text-green-200 transition-all"><AiOutlineShoppingCart/></div>
        </div>
      </div>
    </div>
  )
}

export default navbar