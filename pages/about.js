import React from "react";
import Head from "next/head";
import Image from "next/image";

const about = () => {
  return (
    <div>
      <Head>
        <title>Fresh Frveg- About</title>
        <meta
          name="description"
          content="Shop fresh Fruits and vegetables online"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="maxH overflow-hidden relative">
        <div className="w-auto blurC">
          <Image src="/V3.jpg" width={1520} height={860} />
        </div>
        <p className="text-9xl drop-shadow-md text-white pr-2 indexZ absolute bottom-2/4 left-1/3">About Us</p>
      </div>
    </div>
  );
};

export default about;
