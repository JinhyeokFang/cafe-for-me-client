import type { NextPage } from 'next'
import Head from 'next/head'
import Box from '../components/box'
import styles from '../styles/Home.module.css'
import { Map, MapMarker } from 'react-kakao-maps-sdk'
import { MutableRefObject, useEffect, useRef, useState } from 'react'
import Button from '../components/button'
import Input from '../components/input'
import Dialog, { DialogRef } from '../components/dialog'
import TitleText from '../components/title_text'
import ParagraphText from '../components/paragraph'
import Header from '../layouts/header'
import Footer from '../layouts/footer'
import useCafe from '../swr/hooks/cafe.hook'
import DetailText from '../components/detail_text'

const Home: NextPage = () => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [query, setQuery] = useState('');
  const { data, isLoading } = useCafe(query);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }, []);

  const dialogRef: MutableRefObject<DialogRef> = useRef<DialogRef>() as MutableRefObject<DialogRef>;

  const buttonClicked = () => {
    if (dialogRef.current !== undefined)
      dialogRef.current.show();
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>카페 추천 사이트</title>
        <meta name="description" content="Cafe Suggestion Site For Me" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
  
      <Dialog style={{ alignItems: 'center' }} ref={dialogRef}>
        <TitleText content='카페 검색' />
        <Input type='text' valueUpdateEvent={setQuery} />
        {
          isLoading ? '로딩중' : data == undefined ? '' :
          data.cafes.map((cafe: Record<string, unknown>, index: number) =>(
            <Box style={{ width: '100%' }}>
              <ParagraphText content={JSON.stringify(cafe.name)} key={index} />
              <DetailText content={JSON.stringify(cafe.address)} />
            </Box>
          ))
        }
        <Button content='button!' width='50%'/>
      </Dialog>

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
          <Button content='원하는 위치로 이동하기' width='100%' clickEvent={buttonClicked}/>
          <Button content='현재 위치로 이동하기' width='100%' />
          <Button content='주변 카페 검색하기' width='100%' />
        </Box>
        <Box>
          <Input type='text' valueUpdateEvent={() => {}}/>
          <Button content='카페 이름으로 검색하기' width='100%' />
        </Box>
        <Box>
          <Button content='주소로 카페 검색하기' width='100%' />
        </Box>
        <Box>
          <Input type='text' valueUpdateEvent={() => {}}/>
          <Button content='카페 추가하기' width='100%' />
        </Box>
      </main>
      <Footer />
    </div>
  )
}

export default Home
