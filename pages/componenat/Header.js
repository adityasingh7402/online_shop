import React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { RiAccountCircleLine } from "react-icons/ri";
import { AiOutlineSearch } from "react-icons/ai";
import { TbPhoneCall } from "react-icons/tb";
import { BiRupee } from "react-icons/bi";
import { MdSupervisorAccount } from "react-icons/md";
import { BsTruck } from "react-icons/bs";

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`${isScrolled && "tranAnima fixed z-50 top-0 right-0 left-0"}`}
    >
      <div className="menuBar">
        <div className="offer-menu bg-green-700 flex flex-row justify-end p-1">
          <div className="cart border-r-2 border-gray-200 mx-1 text-2xl cursor-pointer font-medium text-slate-50 hover:text-green-200 transition-all flex flex-row items-center">
            <TbPhoneCall className="pr-1" />
            <span className="text-sm pr-2">+91 9999557786</span>
          </div>
          <div className="cart border-r-2 border-gray-200 mx-1 text-2xl cursor-pointer font-medium text-slate-50 hover:text-green-200 transition-all flex flex-row items-center">
            <BiRupee className="pr-1" />
            <span className="text-sm pr-2">Sell on Brownbag</span>
          </div>
          <div className="cart border-r-2 border-gray-200 mx-1 text-2xl cursor-pointer font-medium text-slate-50 hover:text-green-200 transition-all flex flex-row items-center">
            <MdSupervisorAccount className="pr-1" />
            <span className="text-sm pr-2">+91 Franchise</span>
          </div>
          <div className="cart mx-1 text-2xl cursor-pointer font-medium text-slate-50 hover:text-green-200 transition-all flex flex-row items-center">
            <BsTruck className="pr-1" />
            <span className="text-sm pr-2">Need Delivery Partner</span>
          </div>
        </div>
        <div className="background flex justify-between items-center shadow-sm shadow-gray-300 ... z-40 ...">
          <div className="nav flex justify-center items-center">
            <div className="logo mx-6">
              <Image src="/logo.png" width={100} height={70} />
            </div>
            <ul className="flex justify-center">
              <li className="mx-6 text-lg font-normal tracking-widest text-slate-50 hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r from-green-200 to-green-300 transition-all">
                <Link href="/">
                  <a>Home</a>
                </Link>
              </li>
              <li className="mx-6 text-lg font-normal tracking-widest text-slate-50 hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r from-green-200 to-green-300 transition-all">
                <Link href="/about">
                  <a>About</a>
                </Link>
              </li>
              <li className="mx-6 text-lg font-normal tracking-widest text-slate-50 hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r from-green-200 to-green-300 transition-all">
                <Link href="/shop">
                  <a>Shop</a>
                </Link>
              </li>
              <li className="mx-6 text-lg font-normal tracking-widest text-slate-50 hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r from-green-200 to-green-300 transition-all">
                <Link href="/Vegitables">
                  <a>Vegitables</a>
                </Link>
              </li>
              <li className="mx-6 text-lg font-normal tracking-widest text-slate-50 hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r from-green-200 to-green-300 transition-all">
                <Link href="/contact">
                  <a>Contact</a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="impLink flex justify-center items-center">
            <input
              type="text"
              className="p-2 -mr-10 w-80 rounded-md text-gray-600"
              placeholder="Search"
            />
            <div className="cart mr-4 text-2xl p-2 rounded-l-none rounded-md bg-green-900 cursor-pointer font-medium text-slate-50 hover:text-green-200 transition-all">
              <AiOutlineSearch />
            </div>
            <div className="cart mx-4 text-2xl cursor-pointer font-medium text-slate-50 hover:text-green-200 transition-all">
              <RiAccountCircleLine />
            </div>
            <div className="cart mx-4 text-2xl cursor-pointer font-medium text-slate-50 hover:text-green-200 transition-all">
              <AiOutlineShoppingCart />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
