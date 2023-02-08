import axios from 'axios'
import Link from 'next/link'
import { Block, Data } from '../../types'
import {
  LearningMaterialList,
  LearningMaterialListItem,
  PageContainer,
} from '../../styles/global'
import Markdown from '../../components/Markdown/Markdown'

type props = { blocks: Data<Block>[] }

export default function Blocks({ blocks }: props) {
  return (
    <PageContainer>
      <h1>Blocks</h1>
      <LearningMaterialList>
        {blocks.map((block) => (
          <LearningMaterialListItem key={block.id}>
            <Link href={`/blocks/${encodeURIComponent(block.id)}`}>
              <h2>{block.attributes.Title}</h2>
              <Markdown>{block.attributes.Abstract}</Markdown>
            </Link>
          </LearningMaterialListItem>
        ))}
      </LearningMaterialList>
    </PageContainer>
  )
}

export async function getStaticProps() {
  const res = await axios.get(`${process.env.STRAPI_API_URL}/blocks`)
  const blocks = res.data.data

  return {
    props: { blocks },
  }
}
