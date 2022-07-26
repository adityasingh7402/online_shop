import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import Product from "../modal/Product";
import mongoose from "mongoose";
import Link from "next/link";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home({ fruits, vegitables }) {
  return (
    <div>
      <Head>
        <title>Fresh Frveg- Shop Online Fruits and vegetables</title>
        <meta
          name="description"
          content="Shop fresh Fruits and vegetables online"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="relative z-10">
        <Splide
          className="maxH overflow-hidden"
          options={{
            rewind: true,
            autoplay: true,
            speed: 800,
          }}
        >
          <SplideSlide>
            <div className="w-auto blurC">
              <Image src="/V1.jpg" width={1520} height={860} />
            </div>
          </SplideSlide>
          <SplideSlide>
            <div className="w-auto blurC">
              <Image src="/F3.jpg" width={1520} height={860} />
            </div>
          </SplideSlide>
          <SplideSlide>
            <div className="w-auto blurC">
              <Image src="/V3.jpg" width={1520} height={860} />
            </div>
          </SplideSlide>
          <SplideSlide>
            <div className="w-auto blurC">
              <Image src="/V2.jpg" width={1520} height={860} />
            </div>
          </SplideSlide>
          <SplideSlide>
            <div className="w-auto blurC">
              <Image src="/F2.jpg" width={1520} height={860} />
            </div>
          </SplideSlide>
          <SplideSlide>
            <div className="w-auto">
              <Image src="/F1.jpg" width={1520} height={860} />
            </div>
          </SplideSlide>
        </Splide>
        <div className="absolute px-3 top-1/4 w-full flex justify-center flex-col items-center">
          <p className="textTitle text-5xl pb-3 text-white">Here We Provide You Fresh Fruit&rsquo;s and Green Vegitable&rsquo;s </p>
          <div className="logoTitle w-40 h-40 pt-5 blurCOne">
            <img src="/favicon.png" alt="logo" />
          </div>
        </div>
      </div>
      <div className="bg-gray-200 shadow-md">
        <div className="services grid lg:grid-cols-4 gap-y-10 md:grid-cols-2 md:w-full items-center bg-gray-200 p-2 lg:w-4/5 mx-auto justify-center">
          <div className="service flex justify-center items-center flex-col mx-16">
            <Image src="/5 (3).png" width="55px" height="50px" />
            <h2 className="text-lg font-normal tracking-wider text-center text-gray-700">
              Freshest Produce
            </h2>
          </div>

          <div className="service flex justify-center items-center flex-col mx-16">
            <Image src="/okk.jpg" width="45px" height="50px" />
            <h2 className="text-lg font-normal tracking-wider text-center text-gray-700">
              Good Quality
            </h2>
          </div>
          <div className="service flex justify-center items-center flex-col mx-16">
            <Image src="/5 (1).png" width="50px" height="50px" />
            <h2 className="text-lg font-normal tracking-wider text-center text-gray-700">
              Fast Delivery
            </h2>
          </div>
          <div className="service flex justify-center items-center flex-col mx-16">
            <Image src="/5 (2).png" width="40px" height="50px" />
            <h2 className="text-lg font-normal tracking-wider text-center text-gray-700">
              Customer Service
            </h2>
          </div>
        </div>
      </div>
      <div className="catoBack pb-1">
        <hr className="mt-12 drop-shadow-2xl ..." />
        <div className="shop-title w-96 text-center shadow-md p-3 m-auto background text-white text-3xl rounded-sm">
          Shop by Chatogary
        </div>
        <div className="catogaryes drop-shadow-sm bg-white maginIt lg:mx-16 sm:mx-5 my-6 rounded-sm relative h-72">
          <div className="element absolute text-2xl font-semibold top-5 text-gray-800 left-5 tracking-wide">
            Fresh Fruits
          </div>
          <div className="slider absolute bottom-4 left-0 right-0">
            <Splide
              options={{
                perPage: 6,
                perMove: 1,
                gap: "-2rem",
                breakpoints: {
                  1212: {
                    perPage: 4,

                  },
                  930: {
                    perPage: 3,

                  },
                  717: {
                    perPage: 2,

                  },
                  550: {
                    perPage: 1,

                  },
                },
              }}
            >
              {fruits.map((item) => {
                return (
                  <Link passHref={true}
                    key={item._id}
                    href={`/products/${item.slug}`}>
                    <SplideSlide>
                      <div className="imagePro flex items-center flex-col cursor-pointer">
                        <p className="text-gray-700 text-lg pb-6">{item.title}</p>
                        <Image src={`/${item.img}`} alt={item.title} width={150} height={130} />
                      </div>
                    </SplideSlide>
                  </Link>
                );
              })}
            </Splide>
          </div>
        </div>
        <div className="catogaryes drop-shadow-sm bg-white maginIt lg:mx-16 sm:mx-5 my-6 rounded-sm relative h-72">
          <div className="element absolute text-2xl font-semibold top-5 text-gray-800 left-5 tracking-wide">
            Fresh Vegitables
          </div>
          <div className="slider absolute bottom-4 left-0 right-0">
            <Splide
              options={{
                perPage: 6,
                perMove: 1,
                gap: "-2rem",
                breakpoints: {
                  1212: {
                    perPage: 4,

                  },
                  930: {
                    perPage: 3,

                  },
                  717: {
                    perPage: 2,

                  },
                  550: {
                    perPage: 1,

                  },
                },
              }}
            >
              {vegitables.map((item) => {
                return (
                  <Link passHref={true}
                    key={item._id}
                    href={`/products/${item.slug}`}>
                    <SplideSlide>
                      <div className="imagePro flex items-center flex-col cursor-pointer">
                        <p className="text-gray-700 text-lg pb-6">{item.title}</p>
                        <Image src={`/${item.img}`} alt={item.title} width={150} height={130} />
                      </div>
                    </SplideSlide>
                  </Link>
                );
              })}
            </Splide>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let fruits = await Product.find({ category: 'Fruits' });
  let vegitables = await Product.find({ category: 'Vegitable' });
  return {
    props: { fruits: JSON.parse(JSON.stringify(fruits)), vegitables: JSON.parse(JSON.stringify(vegitables)) },
  };
}
