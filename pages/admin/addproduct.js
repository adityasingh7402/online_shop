import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Image from "next/image";

const addproduct = () => {
  const [price, setprice] = useState("");
  const [title, settitle] = useState("");
  const [desc, setdesc] = useState("");
  const [size, setsize] = useState("");
  const [slug, setslug] = useState("");
  const [img, setimg] = useState("");
  const [category, setcategory] = useState("");
  const [availableQty, setavailableQty] = useState("");
  const [disabled, setdisabled] = useState(true);
  const [lodingS, setlodingS] = useState(true);

  useEffect(() => {
    if (price && title && desc && availableQty && size && slug && category && img) {
      setdisabled(false);
    } else {
      setdisabled(true);
    }
  }, [price, title, desc, availableQty, size, slug, category, img]);

  const handleChange = async (e) => {
    e.preventDefault();
    if (e.target.name == "price") {
      setprice(parseInt(e.target.value));
    } 
    else if (e.target.name == "title") {
      settitle(e.target.value);
    } 
    else if (e.target.name == "desc") {
      setdesc(e.target.value);
    }
    else if (e.target.name == "availableQty") {
      setavailableQty(parseInt(e.target.value));
    }
    else if (e.target.name == "size") {
      setsize(e.target.value);
    }
    else if (e.target.name == "slug") {
      setslug(e.target.value);
    }
    else if (e.target.name == "category") {
      setcategory(e.target.value);
    }
    else if (e.target.name == "img") {
      console.log(typeof e.target.files[0].name)
      setimg(e.target.files[0].name);
    }
  };

  const submitQuery = async (e) => {
    setlodingS(false);
    let data = [{ title, slug, size, desc, img, category, price, availableQty }];
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/addproducts`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let res = await a.json();
    setprice("");
    settitle("");
    setdesc("");
    setavailableQty("");
    setsize("");
    setslug("");
    setcategory("");
    setimg("");
    setlodingS(true);

    if (res.success) {
      toast.success(res.success, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    else {
      toast.error(response.error, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <>
      <div className="shop-title w-max shadow-md shopCat text-center px-8 py-3 m-auto background text-white text-3xl rounded-sm">
        Add Products - Admin Panel
      </div>
      <div>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        {lodingS === false && (
          <span className="fixed flex justify-center items-center text-green-900 text-lg z-10 top-1/2 w-full">
            <Image src={"/loader.gif"} width={50} height={50} />
          </span>
        )}
        <div className="flex py-5">
          {/* {lodingS === false && <span className="fixed flex justify-center items-center text-green-900 text-lg pl-6 top-1/2 w-full"><Image src={"/loader.gif"} width={50} height={50} /></span>} */}
          <div className="ml-5">
            <div className="grid grid-cols-2 gap-3">
              <input
                value={title}
                onChange={handleChange}
                type="text"
                id="title"
                name="title"
                placeholder="Title"
                required
                className="p-2 w-60 outline-none focus:border-green-700 mb-2 input-bck text-gray-600 text-base border border-gray-300"
              />
              <input
                value={size}
                onChange={handleChange}
                type="text"
                id="size"
                name="size"
                placeholder="Size"
                required
                className="p-2 w-60 outline-none focus:border-green-700 mb-2 input-bck text-gray-600 text-base border border-gray-300"
              />
              <input
                value={slug}
                onChange={handleChange}
                type="text"
                id="slug"
                name="slug"
                placeholder="Slug"
                required
                className="p-2 w-60 outline-none focus:border-green-700 mb-2 input-bck text-gray-600 text-base border border-gray-300"
              />
              <input
                value={category}
                onChange={handleChange}
                type="text"
                id="category"
                name="category"
                placeholder="Category"
                required
                className="p-2 w-60 outline-none focus:border-green-700 mb-2 input-bck text-gray-600 text-base border border-gray-300"
              />
              <input
                value={price}
                onChange={handleChange}
                type="Number"
                id="price"
                name="price"
                placeholder="Price"
                required
                className="p-2 w-60 outline-none focus:border-green-700 mb-2 input-bck text-gray-600 text-base border border-gray-300"
              />
              <input
                value={availableQty}
                onChange={handleChange}
                type="text"
                id="availableQty"
                name="availableQty"
                placeholder="Available Qty"
                required
                className="p-2 w-60 outline-none focus:border-green-700 mb-2 input-bck text-gray-600 text-base border border-gray-300"
              />
              <div className="p-2 w-60 text-gray-600 text-base input-bck mb-2 border border-gray-300">
                <label htmlFor="img">Select image:</label>
                <input onChange={handleChange} type="file" id="img" name="img"></input>
              </div>
            </div>
            <div className="flex flex-col mt-2">
              <textarea
                value={desc}
                onChange={handleChange}
                type="text"
                id="desc"
                name="desc"
                placeholder="Description"
                required
                cols="57"
                rows="5"
                className="p-2 w-full resize-none outline-none focus:border-green-700 mb-2 input-bck text-gray-600 border text-base border-gray-300"
              />
              <button
                onClick={submitQuery}
                disabled={disabled}
                className="font-medium mt-2 rounded-full disabled:bg-green-500 hover:disabled:text-white disabled:cursor-default bg-green-700 w-52 px-10 py-4 hover:bg-white text-white hover:text-gray-800 border transition-all border-green-700"
              >
                {lodingS === false ? <h6>WAIT</h6> : <h6>Add Product</h6>}
              </button>
            </div>
          </div>
          <div className="right mx-auto flex justify-center items-start">
            <div className="product-box relative productSize hover:bg-gray-50 bg-white flex flex-col items-center justify-center border rounded-sm tranAnimaS shadow-sm hover:shadow-xl hover:border-gray-200 border-gray-100 cursor-pointer">
              <div className="product-image w-36 h-40 overflow-hidden flex items-center justify-center">
                <img className="scale" src={`/${img}`} alt={"apple"} />
              </div>
              <div className="product-text text-left self-start w-full pl-3">
                <h2 className="text-base">{category}</h2>
                <div className="product-price flex justify-between items-center">
                  <div className="div">
                    <h1 className="text-xl text-gray-900 font-medium">
                      {title}
                    </h1>
                    <p className="text-sm text-gray-900">{size}</p>
                    <p className="text-base text-gray-900 font-medium pb-1">
                      ₹{price}
                    </p>
                  </div>
                  <div className="shop spin text-gray-600 text-2xl pr-3">
                    <AiOutlineShoppingCart />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default addproduct;
