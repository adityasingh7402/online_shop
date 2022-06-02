import '../styles/globals.css'
import Navbar from './componenat/Navbar'
import Footer from './componenat/Footer'

function MyApp({ Component, pageProps }) {
  return<> 
  <Navbar />
  <Component {...pageProps} />
  <Footer />
</>}

export default MyApp
