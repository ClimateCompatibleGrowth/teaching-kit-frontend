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
} from '../../styles/global'
import {
  Course,
  LandingPageCopy,
  CourseThreeLevelsDeep,
  Data,
  GeneralCopy,
} from '../../types'
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

  return (
    <PageContainer hasTopPadding hasBottomPadding>
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
        <MetadataContainer
          acknowledgment={course.attributes.Acknowledgement}
          citeAs={course.attributes.CiteAs}
          logo={course.attributes.Logo}
          files={course.attributes.Files}
          authors={course.attributes.CourseCreators}
          landingPageCopy={landingPageCopy}
        />
        <BlockContentWrapper>
          <LearningMaterialCourseHeading>
            {landingPageCopy.DescriptionHeader}
          </LearningMaterialCourseHeading>
          <CardList
            cards={course.attributes.Lectures.data.map((lecture) => ({
              id: lecture.id.toString(),
              title: lecture.attributes.Title,
              text: lecture.attributes.Abstract,
              files: lecture.attributes.Files,
              subTitle: <LearningMaterialBadge type={'LECTURE'} />,
              translationDoesNotExistCopy:
                generalCopy.attributes.TranslationDoesNotExist,
            }))}
          />
        </BlockContentWrapper>
      </LearningMaterialOverview>
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
      `${process.env.STRAPI_API_URL}/courseByVuid/${ctx.params?.vuid}?locale=${ctx.locale ?? ctx.defaultLocale
      }&fallbackToDefaultLocale=true`
    )

    const populateCourseCreators = 'populate=CourseCreators'
    const populateCourseFiles =
      'populate[Files]=*'
    const populateCourseLogo =
      'populate[Logo]=*'
    const populateLectureCreators =
      'populate[Lectures][populate][LectureCreators]=*'
    const populateLearningOutcomes =
      'populate[Lectures][populate][LearningOutcomes]=*'
    const populateLectureFiles =
      'populate[Lectures][populate][Files]=*'

    const courseRequest: Promise<Response<CourseThreeLevelsDeep>> = axios.get(
      `${process.env.STRAPI_API_URL}/courses/${courseVuid.data?.id}?${populateCourseCreators}&${populateCourseFiles}&${populateCourseLogo}&${populateLectureCreators}&${populateLearningOutcomes}&${populateLectureFiles}`
    )

    const copyRequest: Promise<ResponseArray<LandingPageCopy>> = axios.get(
      `${process.env.STRAPI_API_URL}/copy-course-pages?locale=${ctx.locale ?? ctx.defaultLocale
      }`
    )

    const generalCopyRequest: Promise<ResponseArray<GeneralCopy>> = axios.get(
      `${process.env.STRAPI_API_URL}/copy-generals?locale=${ctx.locale ?? ctx.defaultLocale
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
