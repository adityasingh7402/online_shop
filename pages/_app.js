import '../styles/globals.css'
import Navbar from './componenat/Navbar'
import Footer from './componenat/Footer'
import Header from './componenat/Header'

function MyApp({ Component, pageProps }) {
  return<> 
  <Header />
  <Component {...pageProps} />
  <Footer />
</>}

export default MyApp
