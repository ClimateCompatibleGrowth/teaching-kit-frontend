import styled from '@emotion/styled'
import axios from 'axios'
import CardList from '../../components/CardList/CardList'
import LearningMaterial from '../../components/LearningMaterial'
import MetadataContainer from '../../components/MetadataContainer/MetadataContainer'
import { ResponseArray } from '../../shared/requests/types'
import { filterOutOnlyPublishedEntriesOnCourse } from '../../shared/requests/utils/publishedEntriesFilter'
import {
  LearningMaterialContainer,
  LearningMaterialOverview,
} from '../../styles/global'
import { Course, CourseThreeLevelsDeep, Data } from '../../types'
import { handleCourseDocxDownload } from '../../utils/downloadAsDocx/downloadAsDocx'
import downloadAsCoursePptx from '../../utils/downloadAsPptx/downloadCourseAsPptx'
import { levelToString, summarizeDurations } from '../../utils/utils'

const CourseContentWrapper = styled.div`
  margin-top: 5rem;
`

const Styled = { CourseContentWrapper }

type Props = { course: Data<CourseThreeLevelsDeep> }

export default function CoursePage({ course }: Props) {
  return (
    <LearningMaterialContainer>
      <LearningMaterialOverview>
        <LearningMaterial
          type='COURSE'
          title={course.attributes.Title}
          abstract={course.attributes.Abstract}
          learningOutcomes={course.attributes.LearningOutcomes}
          prerequisites={course.attributes.Prerequisites}
          acknowledgement={course.attributes.Acknowledgement}
          citeAs={course.attributes.CiteAs}
        />
        <Styled.CourseContentWrapper>
          <h2>Course Content</h2>
          <CardList
            cards={course.attributes.Lectures.data.map((lecture, index) => ({
              id: lecture.id.toString(),
              title: lecture.attributes.Title,
              text: lecture.attributes.Abstract,
              subTitle: `Lecture ${index + 1}`,
            }))}
          />
        </Styled.CourseContentWrapper>
      </LearningMaterialOverview>
      <MetadataContainer
        level={levelToString(course.attributes.Level)}
        duration={summarizeDurations(
          course.attributes.Lectures.data
            .map((lecture) =>
              lecture.attributes.Blocks.data.map((block) => block)
            )
            .flat()
        )}
        authors={course.attributes.CourseCreators}
        downloadAsDocx={() => handleCourseDocxDownload(course)}
        downloadAsPptx={() => downloadAsCoursePptx(course)}
      />
    </LearningMaterialContainer>
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
  return { paths, fallback: false }
}

export async function getStaticProps(ctx: any) {
  const populateBlocks = 'populate[Lectures][populate][0]=Blocks'
  const populateCourseCreators = 'populate=CourseCreators'
  const populateLectureCreators =
    'populate[Lectures][populate][LectureCreators]=*'
  const populateLearningOutcomes =
    'populate[Lectures][populate][LearningOutcomes]=*'
  const populateBlockAuthors =
    'populate[Lectures][populate][Blocks][populate][Authors]=*'
  const populateLevel = 'populate[Level]=Level'

  const res = await axios.get(
    `${process.env.STRAPI_API_URL}/courses/${ctx.params.id}?${populateBlocks}&${populateCourseCreators}&${populateLectureCreators}&${populateLearningOutcomes}&${populateBlockAuthors}&${populateLevel}`
  )
  const course: Data<CourseThreeLevelsDeep> = res.data.data

  return {
    props: { course: filterOutOnlyPublishedEntriesOnCourse(course) },
  }
}
