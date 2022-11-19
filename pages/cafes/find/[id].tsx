import type { NextPage } from 'next'
import Head from 'next/head'
import Box from '../../../components/common/box'
import styles from '../../../styles/pages/AddCafe.module.css'
import Header from '../../../layouts/header'
import Footer from '../../../layouts/footer'
import { useRouter } from 'next/router'
import useCafe, { CafeAPIQueryType } from '../../../swr/hooks/cafe.hook'
import TitleText from '../../../components/common/title_text'
import ParagraphText from '../../../components/common/paragraph'
import DetailText from '../../../components/common/detail_text'
import { AddReview } from '../../../components/sections/add-review'
import { FindReview } from '../../../components/sections/find-review'

const FindCafePage: NextPage = () => {
  const router = useRouter()
  const { id } = router.query;

  const { data, isLoading } = useCafe(CafeAPIQueryType.CafeId, id as string);

  const zeroFill = (n: string | number) => {
      if (typeof n == 'string' && n.length < 2 || n < 10)
          return '0' + n;
      return n;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>{data ? data.cafe.name : ''}</title>
        <meta name="description" content={data ? data.cafe.name : ''} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
  
      <Header />

      <main className={styles.main}>
        <Box>
          { 
            isLoading ? '' : data ? 
            <>
              <TitleText content={data.cafe.name} />
              <div style={{ display: 'flex'}}>
                <div style={{ width: '50%' }}>
                  <ParagraphText content={'주소'} />
                  <DetailText content={data.cafe.address} />
                  <ParagraphText content={'영업 시간'} />
                  <DetailText content={`${ zeroFill(data.cafe.openHour) }:${ zeroFill(data.cafe.openMinute) }~${ zeroFill(data.cafe.closeHour) }:${ zeroFill(data.cafe.closeMinute) }`} />
                  <ParagraphText content={'휴무'} />
                  <DetailText content={data.cafe.closeDay} />
                </div>
                <div style={{ width: '50%' }}>
                  {
                    data.cafe.images.map((image: string, index: number) => (
                      <img src={image} key={index} style={{ display: 'block', width: '100%'}}/>
                    ))  
                  }
                </div>
              </div>
            </> : ''
          }
        </Box>
        {
          data ? <>
            <AddReview id={data.cafe._id}/>
            <FindReview id={data.cafe._id}/>
          </> : ''
        }
      </main>

      <Footer />
    </div>
  )
}

export default FindCafePage
