import axios from 'axios'
import { useState } from 'react'
import LearningMaterial from '../../components/LearningMaterial'
import LearningMaterialEnding from '../../components/LearningMaterialEnding'
import MetaDataContainer from '../../components/MetaDataContainer'
import { Course as CourseType, Lecture } from '../../types'
import styles from '../../styles/LearningMaterial.module.css'

type props = { course: CourseType }

export default function CoursePage({ course }: props) {
  const [showLectures, setShowLectures] = useState(false)

  const handlePptxDownload = () => {}

  return (
    <div className={styles.learningMaterialContainer}>
      <div id="source-html" className={styles.learningMaterialOverview}>
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
            {course.attributes.Lectures?.data.map((lecture: Lecture) => (
              <li key={lecture.id}>{lecture.attributes.Title}</li>
            ))}
          </ul>
        )}
        <LearningMaterialEnding
          Acknowledgment={course.attributes.Acknowledgement}
          CiteAs={course.attributes.CiteAs}
        />
      </div>
      <MetaDataContainer
        typeOfLearningMaterial="Course"
        level={course.attributes.Level}
        duration={'5 h'}
        authors={course.attributes.CourseCreator}
        docxDownloadParameters={{
          title: course.attributes.Title,
          courseId: course.id
        }}
        handlePptxDownload={handlePptxDownload}
      ></MetaDataContainer>
    </div>
  )
}

export async function getStaticPaths() {
  if (process.env.SKIP_BUILD_STATIC_GENERATION === 'true') {
    return {
      paths: [],
      fallback: 'blocking',
    }
  }

  const res = await axios.get(`${process.env.STRAPI_API_URL}/courses`)
  const courses = res.data.data

  const paths = courses.map((course: CourseType) => {
    return {
      params: { id: `${course.id}` },
    }
  })
  return { paths, fallback: false }
}

export async function getStaticProps(ctx: any) {
  console.log("process.env.STRAPI_API_URL", process.env.STRAPI_API_URL);
  
  const res = await axios.get(
    `${process.env.STRAPI_API_URL}/courses/${ctx.params.id}?populate=*`
  )
  const course = res.data.data

  return {
    props: { course },
  }
}
