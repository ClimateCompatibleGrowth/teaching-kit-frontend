import axios from 'axios'
import Link from 'next/link'
import { Course, Data } from '../../types'
import {
  LearningMaterialList,
  LearningMaterialListItem,
  PageContainer,
} from '../../styles/global'

type props = { courses: Data<Course>[] }

export default function Courses({ courses }: props) {
  return (
    <PageContainer>
      <h1>Courses</h1>
      <LearningMaterialList>
        {courses.map((course) => (
          <LearningMaterialListItem key={course.id}>
            <Link href={`/courses/${encodeURIComponent(course.id)}`}>
              <h2>{course.attributes.Title}</h2>
            </Link>
          </LearningMaterialListItem>
        ))}
      </LearningMaterialList>
    </PageContainer>
  )
}

export async function getStaticProps() {
  const res = await axios.get(`${process.env.STRAPI_API_URL}/courses`)
  const courses = res.data.data

  return {
    props: { courses },
  }
}
