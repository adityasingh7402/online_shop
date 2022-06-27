import { useRouter } from 'next/router'
import Image from 'next/image'
import { useState } from 'react'

const Post = ({addToCart, toggleCart}) => {
  const router = useRouter()
  const { slug } = router.query
  const [pin, setPin] = useState()
  const [service, setService] = useState()
  const checkServiceablity = async () => {
    let pins = await fetch('http://localhost:3000/api/pincode')
    let pinJson = await pins.json()
    if (pinJson.includes(parseInt(pin))) {
      setService(true)
    } else {
      setService(false)
    }
  }
  const onChangePin = (e) => {
    setPin(e.target.value)
  }
  

  return <>
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-20 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <Image alt="product" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded-sm" src="/mango1.png" width={400} height={400} />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">BRAND NAME</h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-10">The Catcher in the Rye</h1>
            <p className="leading-relaxed">Fam locavore kickstarter distillery. Mixtape chillwave tumeric sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo juiceramps cornhole raw denim forage brooklyn. Everyday carry +1 seitan poutine tumeric. Gastropub blue bottle austin listicle pour-over, neutra jean shorts keytar banjo tattooed umami cardigan.</p>
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
              <div className="flex ml-6 items-center">
                <span className="mr-3">Qty</span>
              </div>
            </div>
            <div className="flex items-center">
              <span className="title-font font-medium text-2xl text-gray-900 mr-5">$58.00</span>
              <button onClick={()=>{addToCart(slug, 1, 400, "Fresh Red Apple (500gm)", "Fruit", "/apple.png"); toggleCart()}} className="flex text-white font-medium text-base rounded-full mx-2 bg-green-700 px-5 py-3 hover:text-gray-800 hover:bg-white border transition-all border-green-700"><p>Add to cart</p></button>
              <button className="flex text-white font-medium text-base rounded-full mx-2 bg-green-700 px-5 py-3 hover:text-gray-800 hover:bg-white border transition-all border-green-700"><p>Buy Now</p></button>
            </div>

          </div>
        </div>
        <div className=' flex justify-center -ml-10'>
          <input onChange={onChangePin}
            type="text"
            className="p-2 w-40 rounded-sm border text-gray-600 border-green-700"
            placeholder="Enter Your Pincode"
          />
          <button onClick={checkServiceablity} className='font-medium text-base ml-1 rounded-md px-5 bg-green-700 text-white hover:text-gray-800 hover:bg-white border transition-all border-green-700'><p>Check</p></button>
        </div>
        <div className='flex justify-center'>
          {(service && service != null) && <div className="text text-sm text-green-600">delivery is available in your area</div>}
          {(!service && service != null) && <div className="text text-sm text-red-600">Sorry..! delivery is not available in your area</div>}
        </div>
      </div>
    </section>
  </>
}

export default Post