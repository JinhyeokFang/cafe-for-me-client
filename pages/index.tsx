import type { NextPage } from 'next'
import Head from 'next/head'
import Box from '../components/box'
import styles from '../styles/pages/Home.module.css'
import { Map, MapMarker } from 'react-kakao-maps-sdk'
import { useEffect, useState } from 'react'
import Button from '../components/button'
import Input from '../components/input'
import TitleText from '../components/title_text'
import ParagraphText from '../components/paragraph'
import Header from '../layouts/header'
import Footer from '../layouts/footer'
import DetailText from '../components/detail_text'
import useLocation from '../swr/hooks/location.hook'

const Home: NextPage = () => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [query, setQuery] = useState('');
  const { data, isLoading } = useLocation(query);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>카페 추천 사이트</title>
        <meta name="description" content="Cafe Suggestion Site For Me" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
  
      <Header />

      <main className={styles.main}>
        <Box>
          <Map
            center={{ lat: latitude, lng: longitude }}
            style={{ width: "100%", height: "360px" }}
          >
            <MapMarker position={{ lat: latitude, lng: longitude }}>
              <div style={{ color: "#000", textAlign: 'center' }}>a</div>
            </MapMarker>
          </Map>
          <Button content='원하는 위치로 이동하기' width='100%' />
          <Button content='현재 위치로 이동하기' width='100%' />
          <Button content='주변 카페 검색하기' width='100%' />
          <Input type='file' />
        </Box>
      </main>
      <Footer />
    </div>
  )
}

export default Home
