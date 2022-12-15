import axios from 'axios'
import Link from 'next/link'
import { Block, Data, Lecture } from '../../types'
import {
  LearningMaterialList,
  LearningMaterialListItem,
} from '../../styles/global'

type props = { lectures: Data<Lecture>[]; blocks: Block }

export default function Lectures({ lectures, blocks }: props) {
  return (
    <div className="container">
      <h1>Lectures</h1>
      <LearningMaterialList>
        {lectures.map((lecture) => (
          <LearningMaterialListItem key={lecture.id}>
            <Link href={`/lectures/${encodeURIComponent(lecture.id)}`}></Link>
          </LearningMaterialListItem>
        ))}
      </LearningMaterialList>
    </div>
  )
}

export async function getStaticProps() {
  const resLectures = await axios.get(
    `${process.env.STRAPI_API_URL}/lectures?populate=*`
  )
  const resBlocks = await axios.get(
    `${process.env.STRAPI_API_URL}/blocks?populate=*`
  )
  const blocks = resBlocks.data.data
  const lectures = resLectures.data.data

  return {
    props: { lectures, blocks },
  }
}
