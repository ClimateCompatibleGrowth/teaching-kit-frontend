import axios from 'axios'
import Blocks from '../../components/Blocks'
import LearningMaterial from '../../components/LearningMaterial'
import LearningMaterialEnding from '../../components/LearningMaterialEnding'
import MetaDataContainer from '../../components/MetaDataContainer'
import { getLectures } from '../../shared/requests/lectures/lectures'
import {
  LearningMaterialContainer,
  LearningMaterialOverview,
} from '../../styles/global'
import { Data, Lecture as LectureType } from '../../types'

type props = { lecture: Data<LectureType> }
export default function Lecture({ lecture }: props) {
  return (
    <LearningMaterialContainer>
      <LearningMaterialOverview>
        <LearningMaterial
          Title={lecture.attributes.Title}
          Abstract={lecture.attributes.Abstract}
          LearningOutcomes={lecture.attributes.LearningOutcomes}
        />
        <h2>Lecture content</h2>
        {lecture.attributes.Blocks && (
          <Blocks blocks={lecture.attributes.Blocks.data} />
        )}
        <LearningMaterialEnding
          Acknowledgment={lecture.attributes.Acknowledgement}
          CiteAs={lecture.attributes.CiteAs}
        />
      </LearningMaterialOverview>
      <MetaDataContainer
        typeOfLearningMaterial="Lecture"
        level={lecture.attributes.Level}
        duration={'2 h'}
        authors={lecture.attributes.LectureCreator}
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
