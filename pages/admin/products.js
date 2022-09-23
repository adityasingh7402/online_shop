import React from "react";
import Product from "../../modal/Product";
import mongoose from "mongoose";

const products = ({ products }) => {
  return (
    <>
      <div className="shop-title w-max shadow-md shopCat mb-4 text-center px-8 py-3 m-auto background text-white text-3xl rounded-sm">
        Products - Admin Panel
      </div>
      <div className="text-gray-600 body-font relative">
        <section className="flex flex-row">
          {/* <div className="filter-side w-1/5 bg-white m-1">Hello</div> */}
          <div className="product-side w-90 mx-auto">
            {Object.keys(products).length == 0 && (
              <div className="flex justify-center items-center text-xl text-gray-700 font-medium">
                Sorry, all the item are currently out of stock. New stock coming
                soon. Stay Tuned!
              </div>
            )}
            <div className="product-item grid grid-cols-5  productsIt gap-3 my-5 justify-center items-center">
              {products.map((item) => {
                return (
                  <div
                    key={item._id}
                    className="product-box relative h-72 productSize hover:bg-gray-50 bg-white flex flex-col items-center justify-center border-2 rounded-sm tranAnimaS shadow-sm hover:shadow-xl hover:border-gray-200 border-gray-100 cursor-pointer"
                  >
                    <div className="product-image w-36 h-40 overflow-hidden flex items-center justify-center">
                      <img
                        className="scale"
                        src={`/${item.img}`}
                        alt={item.title}
                      />
                    </div>
                    <div className="product-text text-left self-start w-full pl-3">
                      <h2 className="text-base">{item.category}</h2>
                      <div className="product-price flex justify-between items-center">
                        <div className="div">
                          <h1 className="text-xl text-gray-900 font-medium">
                            {item.title}
                          </h1>
                          <p className="text-sm text-gray-900">{item.size}</p>
                          <p className="text-base text-gray-900 font-medium pb-1">
                            ₹{item.price}
                          </p>
                          {item.availableQty == 0 && (
                            <p className="text-base text-red-500 font-medium pb-1">
                              Out of Stock!
                            </p>
                          )}
                        </div>
                        <div className="shop spin text-gray-600 text-2xl pr-3"></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let products = await Product.find();
  return {
    props: { products: JSON.parse(JSON.stringify(products)) },
  };
}

export default products;
