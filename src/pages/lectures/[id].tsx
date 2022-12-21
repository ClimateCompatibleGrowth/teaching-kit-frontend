import axios from 'axios'
import { Lecture } from '../../components/Lecture'
import MetaDataContainer from '../../components/MetaDataContainer'
import { getLectures } from '../../shared/requests/lectures/lectures'
import { LearningMaterialContainer } from '../../styles/global'
import { Data, DeepLecture } from '../../types'

type props = { lecture: Data<DeepLecture> }
export default function LecturePage({ lecture }: props) {
  return (
    <LearningMaterialContainer>
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
    </LearningMaterialContainer>
  )
}

export async function getStaticPaths() {
  if (process.env.SKIP_BUILD_STATIC_GENERATION) {
    return {
      paths: [],
      fallback: 'blocking',
    }
  }

  const lectures = await getLectures()

  const paths = lectures.map((lecture) => ({
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
