import Head from 'next/head'
import Link from 'next/link'
import Footer from '../components/Footer/Footer'
import Hero from '../components/Hero/Hero'
import hero from '/public/images/hero.png'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Teaching kit</title>
        <meta
          name='description'
          content='KTH dESA Teaching kit Platform, view courses online and download them as a powerpoint'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Hero {...heroProps} />
    </div>
  )
}

const heroProps = {
  image: {
    alt: 'Students sitting in chairs gathered around a table with notepads, pens, and a laptop in the middle',
    src: hero,
  },
  title: 'Let your teaching material come alive',
  body: 'Our mission is to enable teachers and trainers to use, co-create and share open-licensed teaching and learning material anywhere in the world for delivery online and in the classroom',
  action: {
    href: '/discover',
    label: 'Find teaching material',
  },
}
