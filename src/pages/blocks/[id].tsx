import axios from 'axios'
import { Block, BlockOneLevelDeep, Data } from '../../types'
import {
  BlockContentWrapper,
  LearningMaterialCourseHeading,
  LearningMaterialOverview,
  PageContainer,
} from '../../styles/global'
import MetadataContainer from '../../components/MetadataContainer/MetadataContainer'
import { summarizeDurations } from '../../utils/utils'
import LearningMaterial from '../../components/LearningMaterial'
import { handleBlockDocxDownload } from '../../utils/downloadAsDocx/downloadAsDocx'
import { ResponseArray } from '../../shared/requests/types'
import { downloadBlockPptx } from '../../utils/downloadAsPptx/downloadBlockAsPptx'
import { filterOutOnlyPublishedEntriesOnBlock } from '../../shared/requests/utils/publishedEntriesFilter'
import { GetStaticPropsContext } from 'next/types'
import Markdown from '../../components/Markdown/Markdown'

type Props = { block: Data<BlockOneLevelDeep> }

export default function BlockPage({ block }: Props) {
  return (
    <PageContainer hasTopPadding hasBottomPadding>
      <LearningMaterialOverview>
        <LearningMaterial
          type='BLOCK'
          title={block.attributes.Title}
          abstract={block.attributes.Abstract}
          learningOutcomes={block.attributes.LearningOutcomes}
          publishedAt={block.attributes.publishedAt}
          updatedAt={block.attributes.updatedAt}
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
          type='BLOCK'
        />
        <BlockContentWrapper>
          <LearningMaterialCourseHeading>
            Lecture Block Content
          </LearningMaterialCourseHeading>
          <Markdown>{block.attributes.Document}</Markdown>
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

  return {
    props: { block: filterOutOnlyPublishedEntriesOnBlock(block) },
  }
}
