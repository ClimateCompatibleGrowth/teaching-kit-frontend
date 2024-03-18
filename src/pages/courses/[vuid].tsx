import axios from 'axios'
import { GetStaticPropsContext } from 'next/types'
import CardList from '../../components/CardList/CardList'
import LearningMaterial from '../../components/LearningMaterial'
import LearningMaterialBadge from '../../components/LearningMaterial/LearningMaterialBadge/LearningMaterialBadge'
import MetadataContainer from '../../components/MetadataContainer/MetadataContainer'
import { Response, ResponseArray } from '../../shared/requests/types'
import { filterOutOnlyPublishedEntriesOnCourse } from '../../shared/requests/utils/publishedEntriesFilter'
import {
  BlockContentWrapper,
  LearningMaterialOverview,
  LearningMaterialCourseHeading,
  PageContainer,
  customBreakPoint,
  FlexContainer,
} from '../../styles/global'
import {
  Course,
  LandingPageCopy,
  CourseThreeLevelsDeep,
  Data,
  GeneralCopy,
} from '../../types'
import { handlePptxDownload } from '../../utils/downloadAsPptx/downloadAsPptx'
import { handleDocxDownload } from '../../utils/downloadAsDocx/downloadAsDocx'
import { useDocxFileSize } from '../../utils/downloadAsDocx/useDocxFileSize'
import { usePptxFileSize } from '../../utils/downloadAsPptx/usePptxFileSize'
import { summarizeDurations } from '../../utils/utils'
import { useWindowSize } from '../../utils/useWindowSize'
import { useEffect, useState } from 'react'

type Props = {
  course: Data<CourseThreeLevelsDeep>
  landingPageCopy: LandingPageCopy
  generalCopy: Data<GeneralCopy>
}

export default function CoursePage({
  course,
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

  const docxFileSize = useDocxFileSize(course)
  const pptxFileSize = usePptxFileSize(course)

  return (
    <PageContainer hasTopPadding hasBottomPadding>
      <FlexContainer>
        <LearningMaterialOverview>
          <LearningMaterial
            type='COURSE'
            title={course.attributes.Title}
            abstract={course.attributes.Abstract}
            learningOutcomes={course.attributes.LearningOutcomes}
            prerequisites={course.attributes.Prerequisites}
            acknowledgement={course.attributes.Acknowledgement}
            citeAs={course.attributes.CiteAs}
            publishedAt={course.attributes.publishedAt}
            updatedAt={course.attributes.updatedAt}
            locale={course.attributes.locale}
            landingPageCopy={landingPageCopy}
            translationDoesNotExistCopy={
              generalCopy.attributes.TranslationDoesNotExist
            }
          />
          {hasMounted && width <= breakpoint && (
            <MetadataContainer
              level={course.attributes.Level}
              duration={summarizeDurations(
                course.attributes.Lectures.data
                  .map((lecture) =>
                    lecture.attributes.Blocks.data.map((block) => block)
                  )
                  .flat()
              )}
              authors={course.attributes.CourseCreators}
              docxFileSize={docxFileSize}
              pptxFileSize={pptxFileSize}
              downloadAsDocx={() => handleDocxDownload(course)}
              downloadAsPptx={() => handlePptxDownload(course)}
              landingPageCopy={landingPageCopy}
              type='COURSE'
            />
          )}
          <BlockContentWrapper>
            <LearningMaterialCourseHeading>
              {landingPageCopy.DescriptionHeader}
            </LearningMaterialCourseHeading>
            <CardList
              cards={course.attributes.Lectures.data.map((lecture) => ({
                id: lecture.id.toString(),
                title: lecture.attributes.Title,
                text: lecture.attributes.Abstract,
                href: `/lectures/${lecture.attributes.vuid}`,
                subTitle: <LearningMaterialBadge type={'LECTURE'} />,
                translationDoesNotExistCopy:
                  generalCopy.attributes.TranslationDoesNotExist,
              }))}
            />
          </BlockContentWrapper>
        </LearningMaterialOverview>
        {hasMounted && width > breakpoint && (
          <MetadataContainer
            level={course.attributes.Level}
            duration={summarizeDurations(
              course.attributes.Lectures.data
                .map((lecture) =>
                  lecture.attributes.Blocks.data.map((block) => block)
                )
                .flat()
            )}
            authors={course.attributes.CourseCreators}
            docxFileSize={docxFileSize}
            pptxFileSize={pptxFileSize}
            downloadAsDocx={() => handleDocxDownload(course)}
            downloadAsPptx={() => handlePptxDownload(course)}
            landingPageCopy={landingPageCopy}
            type='COURSE'
          />
        )}
      </FlexContainer>
    </PageContainer>
  )
}

export async function getStaticPaths() {
  if (process.env.SKIP_BUILD_STATIC_GENERATION === 'true') {
    return {
      paths: [],
      fallback: 'blocking',
    }
  }

  const englishCourses: ResponseArray<Course> = await axios.get(
    `${process.env.STRAPI_API_URL}/lectures?locale=en`
  )
  const spanishCourses: ResponseArray<Course> = await axios.get(
    `${process.env.STRAPI_API_URL}/lectures?locale=es-ES`
  )
  const frenchCourses: ResponseArray<Course> = await axios.get(
    `${process.env.STRAPI_API_URL}/blocks?locale=fr-FR`
  )

  const allCourses = [
    ...englishCourses.data.data,
    ...spanishCourses.data.data,
    ...frenchCourses.data.data,
  ]

  const paths = allCourses
    .filter((course) => course.attributes.vuid !== null)
    .map((course) => {
      return {
        params: { vuid: `${course.attributes.vuid}` },
        locale: course.attributes.locale,
      }
    })

  return { paths, fallback: 'blocking' }
}

export async function getStaticProps(ctx: GetStaticPropsContext) {
  try {
    const courseVuid = await axios.get(
      `${process.env.STRAPI_API_URL}/courseByVuid/${ctx.params?.vuid}?locale=${
        ctx.locale ?? ctx.defaultLocale
      }&fallbackToDefaultLocale=true`
    )

    const populateBlocks = 'populate[Lectures][populate][0]=Blocks'
    const populateCourseCreators = 'populate=CourseCreators'
    const populateLectureCreators =
      'populate[Lectures][populate][LectureCreators]=*'
    const populateLearningOutcomes =
      'populate[Lectures][populate][LearningOutcomes]=*'
    const populateBlockAuthors =
      'populate[Lectures][populate][Blocks][populate][Authors]=*'
    const populateBlockSlides =
      'populate[Lectures][populate][Blocks][populate][Slides]=*'
    const populateLevel = 'populate[Level]=*'
    const populateLectureLevel = 'populate[Lectures][populate][Level]=*'

    const courseRequest: Promise<Response<CourseThreeLevelsDeep>> = axios.get(
      `${process.env.STRAPI_API_URL}/courses/${courseVuid.data?.id}?${populateBlocks}&${populateCourseCreators}&${populateLectureCreators}&${populateLearningOutcomes}&${populateBlockAuthors}&${populateBlockSlides}&${populateLevel}&${populateLectureLevel}`
    )

    const copyRequest: Promise<ResponseArray<LandingPageCopy>> = axios.get(
      `${process.env.STRAPI_API_URL}/copy-course-pages?locale=${
        ctx.locale ?? ctx.defaultLocale
      }`
    )

    const generalCopyRequest: Promise<ResponseArray<GeneralCopy>> = axios.get(
      `${process.env.STRAPI_API_URL}/copy-generals?locale=${
        ctx.locale ?? ctx.defaultLocale
      }`
    )

    const [courseResponse, copyResponse, generalCopyResponse] =
      await Promise.all([courseRequest, copyRequest, generalCopyRequest])

    const course = courseResponse.data.data
    const landingPageCopy = copyResponse.data.data[0].attributes
    const generalCopy = generalCopyResponse.data.data[0]

    return {
      props: {
        course: filterOutOnlyPublishedEntriesOnCourse(course),
        landingPageCopy,
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
