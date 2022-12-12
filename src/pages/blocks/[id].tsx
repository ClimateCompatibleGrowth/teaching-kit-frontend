import axios from 'axios'
import LearningMaterial from '../../components/LearningMaterial'
import LearningMaterialEnding from '../../components/LearningMaterialEnding'
import MetaDataContainer from '../../components/MetaDataContainer'
import { Block as BlockType, Data } from '../../types'
import { getBlocks } from '../../shared/requests/blocks/blocks'
import {
  LearningMaterialContainer,
  LearningMaterialOverview,
} from '../../styles/global'

type props = { block: Data<BlockType> }

export default function Block({ block }: props) {
  return (
    <LearningMaterialContainer>
      <LearningMaterialOverview>
        <LearningMaterial
          Title={block.attributes.Title}
          Abstract={block.attributes.Abstract}
          LearningOutcomes={block.attributes.LearningOutcomes}
        />
        <LearningMaterialEnding References={block.attributes.References} />
      </LearningMaterialOverview>

      <MetaDataContainer
        typeOfLearningMaterial="Block"
        duration={`${block.attributes.DurationInMinutes} min`}
        authors={block.attributes.Authors}
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

  const blocks = await getBlocks()

  const paths = blocks.map((block) => ({
    params: { id: `${block.id}` },
  }))

  return { paths, fallback: false }
}

export async function getStaticProps(ctx: any) {
  const res = await axios.get(
    `${process.env.STRAPI_API_URL}/blocks/${ctx.params.id}?populate=*`
  )
  const block = res.data.data

  return {
    props: { block },
  }
}
