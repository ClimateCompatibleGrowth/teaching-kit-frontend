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
} from '../../styles/global'
import {
  Data,
  GeneralCopy,
  LandingPageCopy,
  Lecture,
  LectureTwoLevelsDeep,
} from '../../types'
import { handlePptxDownload } from '../../utils/downloadAsPptx/downloadAsPptx'
import { handleDocxDownload } from '../../utils/downloadAsDocx/downloadAsDocx'
import { useDocxFileSize } from '../../utils/downloadAsDocx/useDocxFileSize'
import { usePptxFileSize } from '../../utils/downloadAsPptx/usePptxFileSize'
import { summarizeDurations } from '../../utils/utils'

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
  const hasSomePptxSlides = lecture.attributes.Blocks.data.some(
    (block) => block.attributes.Slides.length > 0
  )
  return (
    <PageContainer hasTopPadding hasBottomPadding>
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
        <MetadataContainer
          level={lecture.attributes.Level}
          duration={summarizeDurations(lecture.attributes.Blocks.data)}
          authors={lecture.attributes.LectureCreators}
          docxFileSize={useDocxFileSize(lecture)}
          pptxFileSize={usePptxFileSize(lecture)}
          downloadAsDocx={() => handleDocxDownload(lecture)}
          downloadAsPptx={
            hasSomePptxSlides ? () => handlePptxDownload(lecture) : undefined
          }
          parentRelations={{
            type: 'courses',
            parents: lecture.attributes.Courses.data,
          }}
          type='LECTURE'
          landingPageCopy={landingPageCopy}
        />
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
            }))}
          />
        </BlockContentWrapper>
      </LearningMaterialOverview>
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

  const allLectures = [
    ...englishLectures.data.data,
    ...spanishLectures.data.data,
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
      `${process.env.STRAPI_API_URL}/lectureByVuid/${ctx.params?.vuid}?locale=${
        ctx.locale ?? ctx.defaultLocale
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
      `${process.env.STRAPI_API_URL}/copy-lecture-pages?locale=${
        ctx.locale ?? ctx.defaultLocale
      }`
    )

    const generalCopyRequest: Promise<ResponseArray<GeneralCopy>> = axios.get(
      `${process.env.STRAPI_API_URL}/copy-generals?locale=${
        ctx.locale ?? ctx.defaultLocale
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
