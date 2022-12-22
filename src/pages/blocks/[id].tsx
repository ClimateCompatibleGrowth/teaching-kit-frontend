import axios from 'axios'
import MetaDataContainer from '../../components/MetaDataContainer'
import { BlockOneLevelDeep, Data } from '../../types'
import { getBlocks } from '../../shared/requests/blocks/blocks'
import { LearningMaterialContainer } from '../../styles/global'
import { Block } from '../../components/Block'

type props = { block: Data<BlockOneLevelDeep> }

export default function BlockPage({ block }: props) {
  return (
    <LearningMaterialContainer>
      <Block block={block} />
      <MetaDataContainer
        typeOfLearningMaterial='BLOCK'
        duration={`${block.attributes.DurationInMinutes} min`}
        authors={block.attributes.Authors}
        docxDownloadParameters={{ title: block.attributes.Title }}
        pptxDownloadParameters={{ data: block }}
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
