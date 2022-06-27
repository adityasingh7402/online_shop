import { useRouter } from "next/router";
import Image from "next/image";
import { useState } from "react";
import Product from "../../modal/Product";
import mongoose from "mongoose";

const Post = ({ addToCart, toggleCart, product, buyNow }) => {
  const router = useRouter();
  const { slug } = router.query;
  const [pin, setPin] = useState();
  const [service, setService] = useState();
  const checkServiceablity = async () => {
    let pins = await fetch("http://localhost:3000/api/pincode");
    let pinJson = await pins.json();
    if (pinJson.includes(parseInt(pin))) {
      setService(true);
    } else {
      setService(false);
    }
  };
  const onChangePin = (e) => {
    setPin(e.target.value);
  };

  return (
    <>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-20 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <div className="image w-96 h-96 flex justify-center items-center">
              <img className="w-96" src={`/${product.img}`} alt={product.title} />
            </div>
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                {product.category}
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-10">
                {product.title}-{product.size}
              </h1>
              <p className="leading-relaxed">
                {product.desc}
              </p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                <div className="flex items-center">
                  <span className="">Qty</span>
                </div>
              </div>
              <div className="flex items-center">
                <span className="title-font font-medium text-2xl text-gray-900 mr-5">
                  ₹{product.price}
                </span>
                <button
                  onClick={() => {
                    addToCart(
                      slug,
                      1,
                      product.price,
                      product.title,
                      product.category,
                      `/${product.img}`
                    );
                    toggleCart();
                  }}
                  className="flex text-white font-medium text-base rounded-full mx-2 bg-green-700 px-5 py-3 hover:text-gray-800 hover:bg-white border transition-all border-green-700"
                >
                  <p>Add to cart</p>
                </button>
                <button onClick={() => {
                  buyNow(
                    slug,
                    1,
                    product.price,
                    product.title,
                    product.category,
                    `/${product.img}`
                  );
                }} className="flex text-white font-medium text-base rounded-full mx-2 bg-green-700 px-5 py-3 hover:text-gray-800 hover:bg-white border transition-all border-green-700">
                  <p>Buy Now</p>
                </button>
              </div>
            </div>
          </div>
          <div className=" flex justify-center -ml-10">
            <input
              onChange={onChangePin}
              type="text"
              className="p-2 w-40 rounded-sm border text-gray-600 border-green-700"
              placeholder="Enter Your Pincode"
            />
            <button
              onClick={checkServiceablity}
              className="font-medium text-base ml-1 rounded-md px-5 bg-green-700 text-white hover:text-gray-800 hover:bg-white border transition-all border-green-700"
            >
              <p>Check</p>
            </button>
          </div>
          <div className="flex justify-center">
            {service && service != null && (
              <div className="text text-sm text-green-600">
                delivery is available in your area
              </div>
            )}
            {!service && service != null && (
              <div className="text text-sm text-red-600">
                Sorry..! delivery is not available in your area
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let product = await Product.findOne({ slug: context.query.slug });
  return {
    props: { product: JSON.parse(JSON.stringify(product)) }
  };
}

export default Post;
