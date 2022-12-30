import axios from 'axios'
import Link from 'next/link'
import { Data, Lecture } from '../../types'
import {
  LearningMaterialList,
  LearningMaterialListItem,
  PageContainer,
} from '../../styles/global'

type props = { lectures: Data<Lecture>[] }

export default function Lectures({ lectures }: props) {
  return (
    <PageContainer>
      <h1>Lectures</h1>
      <LearningMaterialList>
        {lectures.map((lecture) => (
          <LearningMaterialListItem key={lecture.id}>
            <Link href={`/lectures/${encodeURIComponent(lecture.id)}`}>
              <h2>{lecture.attributes.Title}</h2>
            </Link>
          </LearningMaterialListItem>
        ))}
      </LearningMaterialList>
    </PageContainer>
  )
}

export async function getStaticProps() {
  const resLectures = await axios.get(
    `${process.env.STRAPI_API_URL}/lectures?populate=*`
  )
  const lectures = resLectures.data.data

  return {
    props: { lectures },
  }
}
