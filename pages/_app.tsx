import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '../layouts/header'
import Footer from '../layouts/footer'
import Script from 'next/script'

function MyApp({ Component, pageProps }: AppProps) {
  return <div id="container">
    <Script src="//dapi.kakao.com/v2/maps/sdk.js?appkey=57aebb7ee95cf403b9cba5d22f019a6c&libraries=services,clusterer&autoload=false" strategy="beforeInteractive"/>
    <Header />
    <Component {...pageProps} />
    <Footer />
  </div>
}

export default MyApp
