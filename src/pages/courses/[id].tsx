import axios from 'axios'
import { GetStaticPropsContext } from 'next/types'
import CardList from '../../components/CardList/CardList'
import LearningMaterial from '../../components/LearningMaterial'
import LearningMaterialBadge from '../../components/LearningMaterial/LearningMaterialBadge/LearningMaterialBadge'
import MetadataContainer from '../../components/MetadataContainer/MetadataContainer'
import { ResponseArray } from '../../shared/requests/types'
import { filterOutOnlyPublishedEntriesOnCourse } from '../../shared/requests/utils/publishedEntriesFilter'
import {
  BlockContentWrapper,
  LearningMaterialOverview,
  LearningMaterialCourseHeading,
  PageContainer,
} from '../../styles/global'
import { Course, CourseThreeLevelsDeep, Data } from '../../types'
import { handleCourseDocxDownload } from '../../utils/downloadAsDocx/downloadAsDocx'
import downloadCoursePptx from '../../utils/downloadAsPptx/downloadCourseAsPptx'
import { summarizeDurations } from '../../utils/utils'

type Props = { course: Data<CourseThreeLevelsDeep> }

export default function CoursePage({ course }: Props) {
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
        />
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
          downloadAsDocx={() => handleCourseDocxDownload(course)}
          downloadAsPptx={() => downloadCoursePptx(course)}
        />
        <BlockContentWrapper>
          <LearningMaterialCourseHeading>
            Course Content
          </LearningMaterialCourseHeading>
          <CardList
            cards={course.attributes.Lectures.data.map((lecture) => ({
              id: lecture.id.toString(),
              title: lecture.attributes.Title,
              text: lecture.attributes.Abstract,
              href: `/lectures/${lecture.id}`,
              subTitle: <LearningMaterialBadge type={'LECTURE'} />,
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

  const courses: ResponseArray<Course> = await axios.get(
    `${process.env.STRAPI_API_URL}/courses`
  )

  const paths = courses.data.data.map((course) => {
    return {
      params: { id: `${course.id}` },
    }
  })

  console.log(paths)

  return { paths, fallback: false }
}

export async function getStaticProps(ctx: GetStaticPropsContext) {
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

  const res = await axios.get(
    `${process.env.STRAPI_API_URL}/courses/${ctx.params?.id}?${populateBlocks}&${populateCourseCreators}&${populateLectureCreators}&${populateLearningOutcomes}&${populateBlockAuthors}&${populateBlockSlides}&${populateLevel}&${populateLectureLevel}`
  )
  const course: Data<CourseThreeLevelsDeep> = res.data.data

  return {
    props: { course: filterOutOnlyPublishedEntriesOnCourse(course) },
  }
}
