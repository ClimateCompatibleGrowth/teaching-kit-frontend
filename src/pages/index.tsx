import Head from 'next/head'
import PosterList from '../components/PosterList/PosterList'
import Hero from '../components/Hero/Hero'
import DocumentIcon from '/public/icons/document.svg'
import ReuseIcon from '/public/icons/reuse.svg'
import GroupIcon from '/public/icons/group.svg'
import RecentUpdates from '../components/RecentUpdates/RecentUpdates'
import TextImage from '../components/TextImage/TextImage'
import ContentColumns from '../components/ContentColumns/ContentColumns'
import axios from 'axios'
import { GetStaticPropsContext } from 'next'
import { StartPageCopy, Data } from '../types'
import { ResponseArray } from '../shared/requests/types'

export default function Home(props: Data<StartPageCopy>) {
  const {
    BottomTextColumn1,
    BottomTextColumn2,
    DynamicContentButtonLabel1,
    DynamicContentButtonLabel2,
    DynamicContentHeader,
    Header,
    HeaderParagraph,
    HeroImage,
    InfoCardHeader,
    InfoCards,
    InfoCardsLarge,
  } = props.attributes

  const getIcon = (id: number) => {
    if (id === 0) return <DocumentIcon />
    if (id === 1) return <ReuseIcon />
    if (id === 2) return <GroupIcon />
    return null
  }

  return (
    <main>
      <Head>
        <title>Climate compatible curriculum</title>
        <meta
          name='description'
          content="Climate compatible growth's Curriculum platform, view courses online and download them as a powerpoint/docx"
        />
        <link rel='icon' href='/favicon.ico' />
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon-16x16.png'
        />
        <link rel='manifest' href='/site.webmanifest' />
      </Head>
      <Hero
        image={{
          alternativeText: HeroImage.data.attributes.alternativeText,
          source: {
            src: HeroImage.data.attributes.url,
            width: HeroImage.data.attributes.width,
            height: HeroImage.data.attributes.height,
          },
        }}
        title={Header}
        body={HeaderParagraph}
      />
      {InfoCardHeader !== undefined && InfoCards !== undefined ? (
        <PosterList
          title={InfoCardHeader}
          posters={InfoCards.map((infoCard, index) => ({
            text: infoCard.Content,
            title: infoCard.Header,
            id: infoCard.id.toString(),
            subTitle: getIcon(index),
          }))}
        />
      ) : null}
      {InfoCardsLarge !== undefined
        ? InfoCardsLarge.map((infoCardLarge) => (
            <TextImage
              title={infoCardLarge.Header}
              body={infoCardLarge.Content}
              image={{
                alt: infoCardLarge.Image.data.attributes.alternativeText,
                src: {
                  src: infoCardLarge.Image.data.attributes.url,
                  width: infoCardLarge.Image.data.attributes.width,
                  height: infoCardLarge.Image.data.attributes.height,
                },
              }}
              key={infoCardLarge.id}
            />
          ))
        : null}
      <RecentUpdates
        title={DynamicContentHeader}
        loadMoreButtonLabel={DynamicContentButtonLabel1}
        goToFilterPageButtonLabel={DynamicContentButtonLabel2}
      />
      <ContentColumns
        columns={[BottomTextColumn1, BottomTextColumn2].map(
          (bottomTextColumn) => ({ content: bottomTextColumn })
        )}
      />
    </main>
  )
}

export async function getStaticProps(ctx: GetStaticPropsContext) {
  try {
    const populateHeroImage = 'populate[HeroImage][populate]=*'
    const populateInfoCard = 'populate[InfoCards][populate]=*'
    const populateInfoCardLarge = 'populate[InfoCardsLarge][populate]=*'
    const populate = `${populateHeroImage}&${populateInfoCard}&${populateInfoCardLarge}`

    const copyResponse: ResponseArray<StartPageCopy> = await axios.get(
      `${process.env.STRAPI_API_URL}/site-copies?locale=${
        ctx.locale ?? ctx.defaultLocale
      }&${populate}`
    )

    if (!copyResponse || copyResponse.data.data.length < 1) {
      return {
        notFound: true,
      }
    }

    return {
      props: copyResponse.data.data[0],
      revalidate: 60,
    }
  } catch (error) {
    return {
      notFound: true,
    }
  }
}
