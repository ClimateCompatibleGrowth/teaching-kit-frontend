import styled from '@emotion/styled'
import axios from 'axios'
import CardList from '../../components/CardList/CardList'
import LearningMaterial from '../../components/LearningMaterial'
import MetadataContainer from '../../components/MetadataContainer/MetadataContainer'
import { getCourses } from '../../shared/requests/courses/courses'
import {
  LearningMaterialContainer,
  LearningMaterialOverview,
} from '../../styles/global'
import { CourseThreeLevelsDeep, Data } from '../../types'
import { handleCourseDocxDownload } from '../../utils/downloadAsDocx/downloadAsDocx'
import { summarizeDurations } from '../../utils/utils'

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
        level={course.attributes.Level}
        duration={summarizeDurations(
          course.attributes.Lectures.data
            .map((lecture) =>
              lecture.attributes.Blocks.data.map((block) => block)
            )
            .flat()
        )}
        authors={course.attributes.CourseCreator}
        downloadAsDocx={() => handleCourseDocxDownload(course)}
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

  const courses = await getCourses()

  const paths = courses.map((course) => {
    return {
      params: { id: `${course.id}` },
    }
  })
  return { paths, fallback: false }
}

export async function getStaticProps(ctx: any) {
  const res = await axios.get(
    `${process.env.STRAPI_API_URL}/courses/${ctx.params.id}?populate[Lectures][populate][0]=Blocks&populate=CourseCreator`
  )
  const course = res.data.data

  return {
    props: { course },
  }
}
