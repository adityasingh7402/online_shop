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
import { CgLogOff, CgClose } from "react-icons/cg";
import { BsHandbag, BsTruck } from "react-icons/bs";
import { BiMenuAltLeft } from "react-icons/bi";

function Header({ logout, user, cart, addToCart, removeFromCart, clearCart, subTotal }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropdown, setdropdown] = useState(false)
  const [menudrop, setmenudrop] = useState(false)

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

  const toggleMenu = () => {
    setmenudrop(!menudrop)
  }



  return (
    <header
      className={`${isScrolled && "tranAnima fixed z-50 top-0 right-0 left-0"}`}
    >
      <div className="menuBar shadow-lg border-b border-green-800">
        <div className="offer-menu bg-green-700 flex flex-row justify-end p-1 disNone">
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
        <div className={menudrop ? "background relative flex justify-between  hightNav shadow-sm transitionn shadow-gray-300 ... z-40 ..." : "background  transitionn impLink relative flex justify-between shadow-sm shadow-gray-300 ... z-40 ..."}>
          {/* <div className="cart mx-2 text-2xl absolute top-3 left-3 hidden cursor-pointer font-medium text-slate-50 hover:text-green-200 transition-all">
            <CgClose />
          </div> */}
          <div className="nav flex justify-center items-center navbar">
            <div className={menudrop ? "mx-6 cursor-pointer logo top-0" : "mx-6 cursor-pointer logo top-0"}>
              <Link href={"/"}>
                <Image src="/logo.png" width={100} height={70} />
              </Link>
            </div>
            <ul className={menudrop ? "flex justify-center menubar mt-20 overflow-hidden py-2 menuRs w-full" : "flex justify-center menubar overflow-hidden menuR"}>
              <li className="mx-6 text-lg font-normal paddingM tracking-widest text-slate-50 hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r from-green-200 to-green-300 transition-all">
                <Link href="/">
                  <a>Home</a>
                </Link>
              </li>
              <li className="mx-6 text-lg font-normal paddingM tracking-widest text-slate-50 hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r from-green-200 to-green-300 transition-all">
                <Link href="/about">
                  <a>About</a>
                </Link>
              </li>
              <li className="mx-6 text-lg font-normal paddingM tracking-widest text-slate-50 hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r from-green-200 to-green-300 transition-all">
                <Link href="/shop">
                  <a>Shop</a>
                </Link>
              </li>
              <li className="mx-6 text-lg font-normal paddingM tracking-widest text-slate-50 hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r from-green-200 to-green-300 transition-all">
                <Link href="/Vegitables">
                  <a>Vegitables</a>
                </Link>
              </li>
              <li className="mx-6 text-lg font-normal paddingM tracking-widest text-slate-50 hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r from-green-200 to-green-300 transition-all">
                <Link href="/Fruits">
                  <a>Fruits</a>
                </Link>
              </li>
              <li className="mx-6 text-lg font-normal paddingM tracking-widest text-slate-50 hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r from-green-200 to-green-300 transition-all">
                <Link href="/contact">
                  <a>Contact</a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="impLink flex justify-center my-auto h-min marginZH">
            <div className="flex items-center">
              <Link href={"../preview"}>
                <div className="cart mx-2 text-2xl cursor-pointer font-medium text-slate-50 hover:text-green-200 transition-all">
                  <AiOutlineShoppingCart />
                </div>
              </Link>
              <div className="cart mx-4 text-2xl cursor-pointer relative text-slate-50">
                {user && user.value && <RiAccountCircleLine onMouseOver={() => { setdropdown(true) }} onMouseLeave={() => { setdropdown(false) }} />}
                {dropdown && <div className="dropdown absolute -right-2 top-8 w-44 px-2  rounded-sm bg-white z-50 shadow-lg" onMouseOver={() => { setdropdown(true) }} onMouseLeave={() => { setdropdown(false) }}>
                  <ul>
                    <Link href={'/account'}><a><li className="text-base flex flex-row items-center border-green-300 text-green-700 py-2 hover:text-green-500"><RiAccountCircleLine className="mx-2 text-lg" /><span>My Profile</span></li></a></Link>
                    <Link href={'/yourorder'}><a><li className="text-base flex flex-row items-center border-t border-green-300 text-green-700 py-2 hover:text-green-500"><BsHandbag className="mx-2 text-lg" /><span>Orders</span></li></a></Link>
                    <li onClick={logout} className="text-base border-t flex flex-row items-center  border-green-300 text-green-700 py-2 hover:text-green-500"><CgLogOff className="mx-2 text-lg" /><span>Logout</span></li>
                  </ul>
                </div>}
                {user && !user.value && <Link href={"/login"}><a>
                  <button className="text-base flex items-center p-2 px-4 rounded-md bg-green-900 cursor-pointer text-slate-50 hover:text-green-200 transition-all">Login</button>
                </a></Link>}
              </div>
              <Link href={'/search'}><input
                type="text"
                readOnly
                className="p-2 lg:w-40 widthIn -mr-10 xl:w-80 rounded-md text-gray-600 outline-none"
                placeholder="Search"
              />
              </Link>
              <div className="cart mr-4 sertchB text-2xl p-2 rounded-l-none rounded-md bg-green-900 cursor-pointer font-medium text-slate-50 hover:text-green-200 transition-all">
                <Link href={'/search'}><AiOutlineSearch /></Link>
              </div>
              <div className="hidden Nblock">
                <div className="cart mx-2 text-3xl cursor-pointer font-medium text-slate-50 transitionn hover:text-green-200 transition-all">
                  <a onClick={toggleMenu}>{menudrop ? <CgClose /> : <BiMenuAltLeft />}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </header >
  );
}

export default Header;
