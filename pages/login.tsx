import type { NextPage } from 'next'
import Head from 'next/head'
import { LoginForm } from '../components/sections/login-form'
import Footer from '../layouts/footer'
import Header from '../layouts/header'
import styles from '../styles/pages/Home.module.css'

const LoginPage: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Login</title>
        <meta name="description" content="Cafe4Me Login Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className={styles.main}>
        <LoginForm />
      </main>
      <Footer />
    </div>
  )
}

export default LoginPage
