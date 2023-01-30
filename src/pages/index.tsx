import Head from 'next/head'
import PosterList from '../components/PosterList/PosterList'
import Hero from '../components/Hero/Hero'
import hero from '/public/images/hero.png'
import DocumentIcon from '/public/icons/document.svg'
import ReuseIcon from '/public/icons/reuse.svg'
import GroupIcon from '/public/icons/group.svg'
import RecentUpdates from '../components/RecentUpdates/RecentUpdates'

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
      <PosterList {...posterProps} />
      <RecentUpdates />
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

const posterProps = {
  title: 'Benefits of the teaching kit website',
  posters: [
    {
      id: 'find',
      subTitle: <DocumentIcon />,
      title: 'Find teaching material',
      text: 'Teachers have limited resources to develop high-quality teaching materials, while their students are hungry for new knowledge and have high expectations. Using an existing course can save precious teacher time.\n\n All Courses can be translated into different languages.',
    },
    {
      id: 'customize',
      subTitle: <ReuseIcon />,
      title: 'Customize material',
      text: 'Customizing existing courses can make the material more relevant for learners increasing interest and learner motivation. To customize existing material also saves time. ',
    },
    {
      id: 'collaborate',
      subTitle: <GroupIcon />,
      title: 'Collaborate on material',
      text: 'Global collaboration on course material means that it is always up to date – especially important in cutting edge fields of research such as energy.',
    },
  ],
}
