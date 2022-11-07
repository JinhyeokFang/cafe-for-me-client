import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Script from 'next/script'
import { AuthProvider } from '../auth.context'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <div id="container">
        <Script src="//dapi.kakao.com/v2/maps/sdk.js?appkey=57aebb7ee95cf403b9cba5d22f019a6c&libraries=services,clusterer&autoload=false" strategy="beforeInteractive"/>
        <Component {...pageProps} />
      </div>
    </AuthProvider>
  )
}

export default MyApp
