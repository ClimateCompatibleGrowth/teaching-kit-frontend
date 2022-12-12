import axios from 'axios'
import { useState } from 'react'
import LearningMaterial from '../../components/LearningMaterial'
import LearningMaterialEnding from '../../components/LearningMaterialEnding'
import MetaDataContainer from '../../components/MetaDataContainer'
import { Course as CourseType, Data } from '../../types'
import { getCourses } from '../../shared/requests/courses/courses'
import {
  LearningMaterialContainer,
  LearningMaterialOverview,
} from '../../styles/global'

type props = { course: Data<CourseType> }

export default function Course({ course }: props) {
  const [showLectures, setShowLectures] = useState(false)

  return (
    <LearningMaterialContainer>
      <LearningMaterialOverview>
        <LearningMaterial
          Title={course.attributes.Title}
          Abstract={course.attributes.Abstract}
          LearningOutcomes={course.attributes.LearningOutcomes}
          Prerequisites={course.attributes.Prerequisites}
        />
        <h2 className="title" onClick={() => setShowLectures(!showLectures)}>
          Course Content
        </h2>
        {showLectures && (
          <ul>
            {course.attributes.Lectures?.data.map((lecture) => (
              <li key={lecture.id}>{lecture.attributes.Title}</li>
            ))}
          </ul>
        )}
        <LearningMaterialEnding
          Acknowledgment={course.attributes.Acknowledgement}
          CiteAs={course.attributes.CiteAs}
        />
      </LearningMaterialOverview>
      <MetaDataContainer
        typeOfLearningMaterial="Course"
        level={course.attributes.Level}
        duration={'5 h'}
        authors={course.attributes.CourseCreator}
      ></MetaDataContainer>
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
    `${process.env.STRAPI_API_URL}/courses/${ctx.params.id}?populate=*`
  )
  const course = res.data.data

  return {
    props: { course },
  }
}
