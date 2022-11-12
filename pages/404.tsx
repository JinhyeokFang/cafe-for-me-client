import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/pages/Home.module.css'
import Header from '../layouts/header'
import Footer from '../layouts/footer'
import { FindNearCafe } from '../components/sections/find-near-cafe'
import TitleText from '../components/common/title_text'
import ParagraphText from '../components/common/paragraph'
import DetailText from '../components/common/detail_text'

const IndexPage: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Cafe4Me - Page Not Found</title>
        <meta name="description" content="Cafe Suggestion Site For Me" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
  
      <Header />

      <main className={styles.main}>
        <TitleText content='404 - Page Not Found' />
        <ParagraphText content='페이지를 찾을 수 없습니다 :(' />
        <DetailText content='주소를 올바르게 입력했는지 확인해주세요' />
      </main>
      <Footer />
    </div>
  )
}

export default IndexPage
