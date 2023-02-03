import axios from 'axios'
import { Block, BlockOneLevelDeep, Data } from '../../types'
import { LearningMaterialOverview, PageContainer } from '../../styles/global'
import MetadataContainer from '../../components/MetadataContainer/MetadataContainer'
import { summarizeDurations } from '../../utils/utils'
import styled from '@emotion/styled'
import LearningMaterial from '../../components/LearningMaterial'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import { handleBlockDocxDownload } from '../../utils/downloadAsDocx/downloadAsDocx'
import { ResponseArray } from '../../shared/requests/types'
import { downloadBlockPptx } from '../../utils/downloadAsPptx/downloadBlockAsPptx'

const BlockContentWrapper = styled.div`
  img {
    max-width: 100%;
  }
`

const Styled = { BlockContentWrapper }

type Props = { block: Data<BlockOneLevelDeep> }

export default function BlockPage({ block }: Props) {
  return (
    <PageContainer>
      <LearningMaterialOverview>
        <LearningMaterial
          type='BLOCK'
          title={block.attributes.Title}
          abstract={block.attributes.Abstract}
          learningOutcomes={block.attributes.LearningOutcomes}
        />
        <MetadataContainer
          duration={summarizeDurations([block])}
          authors={block.attributes.Authors}
          downloadAsDocx={() => handleBlockDocxDownload(block)}
          downloadAsPptx={() => downloadBlockPptx(block)}
          parentRelations={block.attributes.Lectures.data}
        />
        <Styled.BlockContentWrapper>
          <ReactMarkdown>{block.attributes.Document}</ReactMarkdown>
        </Styled.BlockContentWrapper>
      </LearningMaterialOverview>
    </PageContainer>
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
  const onceEveryTwoHours = 2 * 60 * 60

  return {
    props: { block },
    revalidate: onceEveryTwoHours,
  }
}
