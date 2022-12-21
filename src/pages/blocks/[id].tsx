import axios from 'axios'
import MetaDataContainer from '../../components/MetaDataContainer'
import { Block as BlockType } from '../../types'
import styles from '../../styles/LearningMaterial.module.css'
import { Block } from '../../components/Block'

type props = { block: BlockType }

export default function BlockPage({ block }: props) {
  return (
    <div className={styles.learningMaterialContainer}>
      <Block block={block}></Block>
      <MetaDataContainer
        typeOfLearningMaterial="BLOCK"
        duration={`${block.attributes.DurationInMinutes} min`}
        authors={block.attributes.Authors}
        docxDownloadParameters={{ title: block.attributes.Title }}
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

  const res = await axios.get(`${process.env.STRAPI_API_URL}/blocks`)
  const blocks = res.data.data

  const paths = blocks.map((block: BlockType) => ({
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
