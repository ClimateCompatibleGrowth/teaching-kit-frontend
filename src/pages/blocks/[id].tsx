import axios from 'axios'
import { Block, BlockOneLevelDeep, Data } from '../../types'
import {
  BlockContentWrapper,
  LearningMaterialOverview,
  PageContainer,
} from '../../styles/global'
import MetadataContainer from '../../components/MetadataContainer/MetadataContainer'
import { summarizeDurations } from '../../utils/utils'
import LearningMaterial from '../../components/LearningMaterial'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import { handleBlockDocxDownload } from '../../utils/downloadAsDocx/downloadAsDocx'
import { ResponseArray } from '../../shared/requests/types'
import { downloadBlockPptx } from '../../utils/downloadAsPptx/downloadBlockAsPptx'
import { filterOutOnlyPublishedEntriesOnBlock } from '../../shared/requests/utils/publishedEntriesFilter'
import { GetStaticPropsContext } from 'next/types'

type Props = { block: Data<BlockOneLevelDeep> }

export default function BlockPage({ block }: Props) {
  return (
    <PageContainer hasTopPadding>
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
          parentRelations={{
            type: 'lectures',
            parents: block.attributes.Lectures.data,
          }}
        />
        <BlockContentWrapper>
          <ReactMarkdown>{block.attributes.Document}</ReactMarkdown>
        </BlockContentWrapper>
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

export async function getStaticProps(ctx: GetStaticPropsContext) {
  const res = await axios.get(
    `${process.env.STRAPI_API_URL}/blocks/${ctx.params?.id}?populate=*`
  )
  const block = res.data.data
  const onceEveryTwoHours = 2 * 60 * 60

  return {
    props: { block: filterOutOnlyPublishedEntriesOnBlock(block) },
    revalidate: onceEveryTwoHours,
  }
}
