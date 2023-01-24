import axios from 'axios'
import { Block, BlockOneLevelDeep, Data } from '../../types'
import {
  LearningMaterialContainer,
  LearningMaterialOverview,
} from '../../styles/global'
import MetadataContainer from '../../components/MetadataContainer/MetadataContainer'
import { summarizeDurations } from '../../utils/utils'
import styled from '@emotion/styled'
import LearningMaterial from '../../components/LearningMaterial'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import { handleBlockDocxDownload } from '../../utils/downloadAsDocx/downloadAsDocx'
import { ResponseArray } from '../../shared/requests/types'

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
        downloadAsDocx={() => handleBlockDocxDownload(block)}
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

  const blocks: ResponseArray<Block> = await axios.get(
    `${process.env.STRAPI_API_URL}/blocks`
  )

  const paths = blocks.data.data.map((block) => ({
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
