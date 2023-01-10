import axios from 'axios'
import { BlockOneLevelDeep, Data } from '../../types'
import { getBlocks } from '../../shared/requests/blocks/blocks'
import {
  LearningMaterialContainer,
  LearningMaterialOverview,
} from '../../styles/global'
import MetadataContainer from '../../components/MetadataContainer'
import { summarizeDurations } from '../../utils/utils'
import styled from '@emotion/styled'
import LearningMaterial from '../../components/LearningMaterial'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'

const BlockContentWrapper = styled.div`
  margin-top: 5rem;
`

const Styled = { BlockContentWrapper }

type Props = { block: Data<BlockOneLevelDeep> }

export default function BlockPage({ block }: Props) {
  return (
    <LearningMaterialContainer>
      <LearningMaterialOverview>
        <LearningMaterial
          type='BLOCK'
          title={block.attributes.Title}
          abstract={block.attributes.Abstract}
          learningOutcomes={block.attributes.LearningOutcomes}
        />
        <Styled.BlockContentWrapper>
          <ReactMarkdown>{block.attributes.Document}</ReactMarkdown>
        </Styled.BlockContentWrapper>
      </LearningMaterialOverview>
      <MetadataContainer
        duration={summarizeDurations([block])}
        authors={block.attributes.Authors}
        docxDownloadParameters={{ title: block.attributes.Title }}
        pptxDownloadParameters={{ data: block }}
      />
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
