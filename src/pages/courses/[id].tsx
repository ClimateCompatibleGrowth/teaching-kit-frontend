import axios from 'axios'
import { useState } from 'react'
import LearningMaterial from '../../components/LearningMaterial'
import LearningMaterialEnding from '../../components/LearningMaterialEnding'
import MetaDataContainer from '../../components/MetaDataContainer'
import { getCourses } from '../../shared/requests/courses/courses'
import {
  LearningMaterialContainer,
  LearningMaterialOverview,
} from '../../styles/global'
import { TwoLevelsDeepCourse, Data } from '../../types'

type Props = { course: Data<TwoLevelsDeepCourse> }

export default function CoursePage({ course }: Props) {
  const [showLectures, setShowLectures] = useState(false)

  return (
    <LearningMaterialContainer>
      <LearningMaterialOverview id="source-html">
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
        typeOfLearningMaterial="COURSE"
        level={course.attributes.Level}
        duration={'5 h'}
        authors={course.attributes.CourseCreator}
        docxDownloadParameters={{
          title: course.attributes.Title,
          courseId: course.id,
        }}
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
