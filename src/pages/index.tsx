import Head from 'next/head'
import Link from 'next/link'
import Footer from '../components/Footer/Footer'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Teaching kit</title>
        <meta
          name="description"
          content="KTH dESA Teaching kit Platform, view courses online and download them as a powerpoint"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <Footer /> */}
    </div>
  )
}
