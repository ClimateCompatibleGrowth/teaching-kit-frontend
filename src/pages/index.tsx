import Head from 'next/head'
import PosterList from '../components/PosterList/PosterList'
import Hero from '../components/Hero/Hero'
import hero from '/public/images/hero.png'
import handsTogether from '/public/images/hands-together.png'
import DocumentIcon from '/public/icons/document.svg'
import ReuseIcon from '/public/icons/reuse.svg'
import GroupIcon from '/public/icons/group.svg'
import RecentUpdates from '../components/RecentUpdates/RecentUpdates'
import TextImage from '../components/TextImage/TextImage'
import ContentColumns from '../components/ContentColumns/ContentColumns'

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
      <TextImage {...textImageProps} />
      <RecentUpdates />
      <ContentColumns {...contentColumnsProps} />
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

const textImageProps = {
  image: {
    alt: 'Overhead view of hands from various people coming in from a circle towards the center',
    src: handsTogether,
  },
  title: 'Want to develop learning material or provide feedback?',
  body: 'Global collaboration on course material means that it is always up to date – especially important in cutting edge fields of research such as energy.\n\nTo enquire about access to the teaching kit website to develop and share your own material, please e-mail [teaching@climatecompatiblegrowth.com](mailto:teaching@climatecompatiblegrowth.com)\n\nTo provide feedback on the teaching kit website, please e-mail [platform@climatecompatiblegrowth.com](mailto:platform@climatecompatiblegrowth.com)',
}

const contentColumnsProps = {
  columns: [
    {
      content:
        'The teaching kit website was developed by KTH Royal Institute of Technology and implemented by Frank Digital within the Climate Compatible Growth Program, funded by the UK Foreign Commonwealth and Development Office.\n\n Original prototypes were developed at KTH Royal Institute of Technology and the early concept was explored in a Masters thesis by Saga Kubulenso.',
    },
    {
      content:
        'Many individuals have offered their time and expertise during the conceptualisation and implementation of the teaching kit website and to you we offer our thanks.',
    },
  ],
}
