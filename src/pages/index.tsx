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
import { StartPageCopy, Data, GeneralCopy } from '../types'
import { ResponseArray } from '../shared/requests/types'


type Props = {
  siteCopy: Data<StartPageCopy>
  generalCopy?: Data<GeneralCopy>
}

export default function Home({ siteCopy, generalCopy }: Props) {
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
    PrimaryCallToActionButtonLabel,
    dataStructureDesktop,
    dataStructureMobile,
    InfoTextCourseStructure,
    HowTheTeachingMaterialIsStructured,
    InfoTextCourseLectureLectureBlock,
  } = siteCopy.attributes

  const dataStructureData = {
    dataStructureDesktop,
    dataStructureMobile,
    HowTheTeachingMaterialIsStructured,
    InfoTextCourseLectureLectureBlock,
    InfoTextCourseStructure,
  }

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
          alternativeText: HeroImage?.data?.attributes?.alternativeText ?? '',
          source: {
            src:
              HeroImage?.data?.attributes?.url ??
              'https://placehold.co/600x400',
            width: HeroImage?.data?.attributes?.width ?? 1440,
            height: HeroImage?.data?.attributes?.height ?? 800,
          },
        }}
        title={Header}
        body={HeaderParagraph}
        action={{
          href: '/teaching-material',
          label: PrimaryCallToActionButtonLabel,
        }}
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
              title={infoCardLarge?.Header ?? ''}
              body={infoCardLarge?.Content ?? ''}
              image={{
                alt:
                  infoCardLarge?.Image?.data?.attributes?.alternativeText ?? '',
                src: {
                  src:
                    infoCardLarge?.Image?.data?.attributes?.url ??
                    'https://placehold.co/600x400',
                  width: infoCardLarge?.Image?.data?.attributes?.width ?? 640,
                  height: infoCardLarge?.Image?.data?.attributes?.height ?? 480,
                },
              }}
              key={infoCardLarge?.id ?? ''}
            />
          ))
        : null}
      <RecentUpdates
        title={DynamicContentHeader}
        loadMoreButtonLabel={DynamicContentButtonLabel1}
        goToFilterPageButtonLabel={DynamicContentButtonLabel2}
        translationDoesNotExistCopy={
          generalCopy?.attributes?.TranslationDoesNotExist ?? ''
        }
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
    console.log('getStaticProps called with locale:', ctx.locale)
    console.log('STRAPI_API_URL:', process.env.STRAPI_API_URL)

    const populateHeroImage = 'populate[HeroImage][populate]=*'
    const populateDataStructureDesktop =
      'populate[dataStructureDesktop][populate]=*'
    const populateDataStructureMobile =
      'populate[dataStructureMobile][populate]=*'
    const populateInfoCard = 'populate[InfoCards][populate]=*'
    const populateInfoCardLarge = 'populate[InfoCardsLarge][populate]=*'
    const populate = `${populateHeroImage}&${populateInfoCard}&${populateInfoCardLarge}&${populateDataStructureDesktop}&${populateDataStructureMobile}`

    const apiUrl = `${process.env.STRAPI_API_URL}/site-copies?locale=${
      ctx.locale ?? ctx.defaultLocale
    }&${populate}`
    console.log('Fetching from URL:', apiUrl)

    // First try to fetch the translation for the requested language
    let copyResponse: ResponseArray<StartPageCopy> = await axios.get(apiUrl)
    console.log('Initial API response:', copyResponse.data)

    // If no content was found, fetch the English version instead
    if (!copyResponse.data.data.length) {
      console.log('No content found, fetching English version')
      const englishApiUrl = `${process.env.STRAPI_API_URL}/site-copies?locale=en&${populate}`
      console.log('Fetching English version from:', englishApiUrl)
      copyResponse = await axios.get(englishApiUrl)
      console.log('English API response:', copyResponse.data)
    }

    const generalCopyResponse: ResponseArray<GeneralCopy> = await axios.get(
      `${process.env.STRAPI_API_URL}/copy-generals?locale=${
        ctx.locale ?? ctx.defaultLocale
      }`
    )
    console.log('General copy response:', generalCopyResponse.data)

    if (!copyResponse || copyResponse.data.data.length < 1) {
      console.log('No content found in final response, returning notFound')
      return {
        notFound: true,
      }
    }
    return {
      props: {
        siteCopy: copyResponse.data.data[0],
        generalCopy: generalCopyResponse?.data.data[0],
      },
      revalidate: 60,
    }
  } catch (error) {
    console.error('Error in getStaticProps:', error)
    return {
      notFound: true,
    }
  }
}
