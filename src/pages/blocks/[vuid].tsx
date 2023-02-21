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
import { handleDocxDownload } from '../../utils/downloadAsDocx/downloadAsDocx'
import { ResponseArray } from '../../shared/requests/types'
import { filterOutOnlyPublishedEntriesOnBlock } from '../../shared/requests/utils/publishedEntriesFilter'
import { GetStaticPropsContext } from 'next/types'
import Markdown from '../../components/Markdown/Markdown'
import { useDocxFileSize } from '../../utils/downloadAsDocx/useDocxFileSize'
import { handlePptxDownload } from '../../utils/downloadAsPptx/downloadAsPptx'
import { usePptxFileSize } from '../../utils/downloadAsPptx/usePptxFileSize'

type Props = { block: Data<BlockOneLevelDeep> }

export default function BlockPage({ block }: Props) {
  const blockHasSlides = block.attributes.Slides.length > 0
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
          docxFileSize={useDocxFileSize(block)}
          pptxFileSize={usePptxFileSize(block)}
          downloadAsDocx={() => handleDocxDownload(block)}
          downloadAsPptx={
            blockHasSlides ? () => handlePptxDownload(block) : undefined
          }
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

  const englishBlocks: ResponseArray<Block> = await axios.get(
    `${process.env.STRAPI_API_URL}/blocks?locale=en`
  )
  const spanishBlocks: ResponseArray<Block> = await axios.get(
    `${process.env.STRAPI_API_URL}/blocks?locale=es-ES`
  )

  const allBlocks = [...englishBlocks.data.data, ...spanishBlocks.data.data]

  const paths = allBlocks
    .filter((block) => block.attributes.vuid !== null)
    .map((block) => ({
      params: { vuid: `${block.attributes.vuid}` },
      locale: block.attributes.locale,
    }))

  return { paths, fallback: 'blocking' }
}

export async function getStaticProps(ctx: GetStaticPropsContext) {
  try {
    const blockVuid = await axios.get(
      `${process.env.STRAPI_API_URL}/blockByVuid/${ctx.params?.vuid}?locale=${
        ctx.locale ?? ctx.defaultLocale
      }`
    )
    const blockResponse = await axios.get(
      `${process.env.STRAPI_API_URL}/blocks/${blockVuid.data?.id}?populate=*`
    )
    const block = blockResponse.data.data

    if (!block) {
      return {
        notFound: true,
      }
    }

    return {
      props: { block: filterOutOnlyPublishedEntriesOnBlock(block) },
    }
  } catch (error) {
    return {
      notFound: true,
    }
  }
}