import type { NextPage } from 'next'
import Head from 'next/head'
import Box from '../../../components/common/box'
import styles from '../../styles/pages/AddCafe.module.css'
import Header from '../../../layouts/header'
import Footer from '../../../layouts/footer'

const EditReviewPage: NextPage = () => {
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
        </Box>
      </main>

      <Footer />
    </div>
  )
}

export default EditReviewPage
