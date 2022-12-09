import axios from 'axios'
import { Lecture } from '../../components/Lecture'
import MetaDataContainer from '../../components/MetaDataContainer'

import styles from '../../styles/LearningMaterial.module.css'
import { Lecture as LectureType } from '../../types'

type props = { lecture: LectureType }
export default function LecturePage({ lecture }: props) {
  return (
    <div className={styles.learningMaterialContainer}>
      <Lecture lecture={lecture} />
      <MetaDataContainer
        typeOfLearningMaterial="LECTURE"
        level={lecture.attributes.Level}
        duration={'2 h'}
        authors={lecture.attributes.LectureCreator}
        docxDownloadParameters={{
          title: lecture.attributes.Title,
          blocks: lecture.attributes.Blocks.data,
        }}
      ></MetaDataContainer>
    </div>
  )
}

export async function getStaticPaths() {
  if (process.env.SKIP_BUILD_STATIC_GENERATION) {
    return {
      paths: [],
      fallback: 'blocking',
    }
  }

  const res = await axios.get(`${process.env.STRAPI_API_URL}/lectures`)
  const lectures = res.data.data

  const paths = lectures.map((lecture: LectureType) => ({
    params: { id: `${lecture.id}` },
  }))

  return { paths, fallback: false }
}

export async function getStaticProps(ctx: any) {
  const res = await axios.get(
    `${process.env.STRAPI_API_URL}/lectures/${ctx.params.id}?populate=*`
  )
  const lecture = res.data.data

  return {
    props: { lecture },
  }
}
