import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Fresh Frveg- Shop Online Fruits and vegetables</title>
        <meta name="description" content="Shop fresh Fruits and vegetables online" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Splide className="maxH overflow-hidden">
        <SplideSlide>
        <div className="w-auto blurC"><Image src="/V1.jpg" width={1600} height={860}/></div>
        </SplideSlide>
        <SplideSlide>
        <div className="w-auto blurC"><Image src="/F3.jpg" width={1600} height={860}/></div>
        </SplideSlide>
        <SplideSlide>
        <div className="w-auto blurC"><Image src="/V3.jpg" width={1600} height={860}/></div>
        </SplideSlide>
        <SplideSlide>
        <div className="w-auto blurC"><Image src="/V2.jpg" width={1600} height={860}/></div>
        </SplideSlide>
        <SplideSlide>
        <div className="w-auto blurC"><Image src="/F2.jpg" width={1600} height={860}/></div>
        </SplideSlide>
        <SplideSlide>
        <div className="w-auto"><Image src="/F1.jpg" width={1600} height={860}/></div>
        </SplideSlide>
      </Splide>
      <div className="services flex items-center bg-gray-200 p-2 justify-center">
        <div className="service flex justify-center items-center flex-col mx-16">
          <Image src="/5 (3).png" width="50px" height="50px"/>
          <h2 className="text-lg font-normal tracking-wider text-gray-700">Freshest Produce</h2>
        </div>
        
        <div className="service flex justify-center items-center flex-col mx-16">
          <Image src="/5 (4).png" width="50px" height="50px"/>
          <h2 className="text-lg font-normal tracking-wider text-gray-700">Freshest Produce</h2>
        </div>
        <div className="service flex justify-center items-center flex-col mx-16">
          <Image src="/5 (1).png" width="50px" height="50px"/>
          <h2 className="text-lg font-normal tracking-wider text-gray-700">Freshest Produce</h2>
        </div>
        <div className="service flex justify-center items-center flex-col mx-16">
          <Image src="/5 (2).png" width="50px" height="50px"/>
          <h2 className="text-lg font-normal tracking-wider text-gray-700">Freshest Produce</h2>
        </div>

      </div>
    </div>
  )
}
