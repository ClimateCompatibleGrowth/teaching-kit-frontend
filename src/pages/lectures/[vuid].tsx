import axios from 'axios'
import { GetStaticPropsContext } from 'next/types'
import CardList from '../../components/CardList/CardList'
import LearningMaterial from '../../components/LearningMaterial'
import LearningMaterialBadge from '../../components/LearningMaterial/LearningMaterialBadge/LearningMaterialBadge'
import MetadataContainer from '../../components/MetadataContainer/MetadataContainer'
import { Response, ResponseArray } from '../../shared/requests/types'
import { filterOutOnlyPublishedEntriesOnLecture } from '../../shared/requests/utils/publishedEntriesFilter'
import {
  BlockContentWrapper,
  LearningMaterialCourseHeading,
  LearningMaterialOverview,
  PageContainer,
  customBreakPoint,
  FlexContainer,
} from '../../styles/global'
import {
  Data,
  GeneralCopy,
  LandingPageCopy,
  Lecture,
  LectureTwoLevelsDeep,
} from '../../types'
import { useWindowSize } from '../../utils/useWindowSize'
import { useEffect, useState } from 'react'

type Props = {
  lecture: Data<LectureTwoLevelsDeep>
  landingPageCopy: LandingPageCopy
  generalCopy: Data<GeneralCopy>
}

export default function LecturePage({
  lecture,
  landingPageCopy,
  generalCopy,
}: Props) {
  // Using setHasMounted to address a hydration error caused by the discrepancy between server (where window is undefined and width is initialized to 0) and client-side rendering (where window is available and width is set based on the actual window size). This ensures components dependent on window size are only rendered client-side. Note: There might be more optimal solutions to handle this issue.
  const [hasMounted, setHasMounted] = useState(false)
  useEffect(() => {
    setHasMounted(true)
  }, [])

  const { width } = useWindowSize()
  const breakpoint = Number(customBreakPoint)

  return (
    <PageContainer hasTopPadding hasBottomPadding>
      <FlexContainer>
        <LearningMaterialOverview>
          <LearningMaterial
            type='LECTURE'
            title={lecture.attributes.Title}
            abstract={lecture.attributes.Abstract}
            learningOutcomes={lecture.attributes.LearningOutcomes}
            acknowledgement={lecture.attributes.Acknowledgement}
            citeAs={lecture.attributes.CiteAs}
            publishedAt={lecture.attributes.publishedAt}
            updatedAt={lecture.attributes.updatedAt}
            locale={lecture.attributes.locale}
            landingPageCopy={landingPageCopy}
            translationDoesNotExistCopy={
              generalCopy.attributes.TranslationDoesNotExist
            }
          />
          {hasMounted && width <= breakpoint && (
            <MetadataContainer
              authors={lecture.attributes.LectureCreators}
              parentRelations={{
                type: 'courses',
                parents: lecture.attributes.Courses.data,
              }}
              landingPageCopy={landingPageCopy}
            />
          )}
          <BlockContentWrapper>
            <LearningMaterialCourseHeading>
              {landingPageCopy.DescriptionHeader}
            </LearningMaterialCourseHeading>
            <CardList
              cards={lecture.attributes.Blocks.data.map((block) => ({
                id: block.id.toString(),
                title: block.attributes.Title,
                text: block.attributes.Abstract,
                href: `/blocks/${block.attributes.vuid}`,
                subTitle: <LearningMaterialBadge type='BLOCK' />,
                translationDoesNotExistCopy:
                  generalCopy.attributes.TranslationDoesNotExist,
              }))}
            />
          </BlockContentWrapper>
        </LearningMaterialOverview>
        {hasMounted && width > breakpoint && (
          <MetadataContainer
            authors={lecture.attributes.LectureCreators}
            parentRelations={{
              type: 'courses',
              parents: lecture.attributes.Courses.data,
            }}
            landingPageCopy={landingPageCopy}
          />
        )}
      </FlexContainer>
    </PageContainer>
  )
}

export async function getStaticPaths() {
  if (process.env.SKIP_BUILD_STATIC_GENERATION) {
    return {
      paths: [],
      fallback: 'blocking',
    }
  }

  const englishLectures: ResponseArray<Lecture> = await axios.get(
    `${process.env.STRAPI_API_URL}/lectures?locale=en`
  )
  const spanishLectures: ResponseArray<Lecture> = await axios.get(
    `${process.env.STRAPI_API_URL}/lectures?locale=es-ES`
  )
  const frenchLectures: ResponseArray<Lecture> = await axios.get(
    `${process.env.STRAPI_API_URL}/blocks?locale=fr-FR`
  )

  const allLectures = [
    ...englishLectures.data.data,
    ...spanishLectures.data.data,
    ...frenchLectures.data.data,
  ]

  const paths = allLectures
    .filter((lecture) => lecture.attributes.vuid !== null)
    .map((lecture) => ({
      params: { vuid: `${lecture.attributes.vuid}` },
      locale: lecture.attributes.locale,
    }))

  return { paths, fallback: 'blocking' }
}

export async function getStaticProps(ctx: GetStaticPropsContext) {
  try {
    const lectureVuid = await axios.get(
      `${process.env.STRAPI_API_URL}/lectureByVuid/${ctx.params?.vuid}?locale=${ctx.locale ?? ctx.defaultLocale
      }&fallbackToDefaultLocale=true`
    )

    const populateCourses = 'populate[Courses]=*'
    const populateBlocks = 'populate[Blocks][populate][0]=*'
    const populateLectureCreators = 'populate[LectureCreators][populate]=*'
    const populateLearningOutcomes = 'populate[LearningOutcomes][populate]=*'
    const populateBlockAuthors = 'populate[Blocks][populate][Authors]=*'
    const populateBlockSlides = 'populate[Blocks][populate][Slides]=*'
    const populateLevel = 'populate[Level]=Level'

    const lectureRequest: Promise<Response<LectureTwoLevelsDeep>> = axios.get(
      `${process.env.STRAPI_API_URL}/lectures/${lectureVuid.data?.id}?${populateCourses}&${populateBlocks}&${populateLectureCreators}&${populateLearningOutcomes}&${populateBlockAuthors}&${populateBlockSlides}&${populateLevel}`
    )

    const copyRequest: Promise<ResponseArray<LandingPageCopy>> = axios.get(
      `${process.env.STRAPI_API_URL}/copy-lecture-pages?locale=${ctx.locale ?? ctx.defaultLocale
      }`
    )

    const generalCopyRequest: Promise<ResponseArray<GeneralCopy>> = axios.get(
      `${process.env.STRAPI_API_URL}/copy-generals?locale=${ctx.locale ?? ctx.defaultLocale
      }`
    )

    const [lectureResponse, copyResponse, generalCopyResponse] =
      await Promise.all([lectureRequest, copyRequest, generalCopyRequest])

    const lecture = lectureResponse.data.data
    const landingPageCopy = copyResponse.data.data[0].attributes
    const generalCopy = generalCopyResponse.data.data[0]

    return {
      props: {
        lecture: filterOutOnlyPublishedEntriesOnLecture(lecture),
        landingPageCopy: landingPageCopy,
        generalCopy,
      },
      revalidate: 60,
    }
  } catch (error) {
    return {
      notFound: true,
    }
  }
}
