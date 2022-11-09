import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/pages/Home.module.css'
import Header from '../layouts/header'
import Footer from '../layouts/footer'
import { FindNearCafe } from '../components/sections/find-near-cafe'

const IndexPage: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Cafe4Me</title>
        <meta name="description" content="Cafe Suggestion Site For Me" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
  
      <Header />

      <main className={styles.main}>
        <FindNearCafe />
      </main>
      <Footer />
    </div>
  )
}

export default IndexPage
