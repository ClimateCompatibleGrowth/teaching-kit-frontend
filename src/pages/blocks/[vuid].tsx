import axios from 'axios'
import {
  Block,
  BlockOneLevelDeep,
  LandingPageCopy,
  Data,
  GeneralCopy,
} from '../../types'
import {
  BlockContentWrapper,
  FlexContainer,
  LearningMaterialCourseHeading,
  LearningMaterialOverview,
  PageContainer,
  customBreakPoint,
} from '../../styles/global'
import MetadataContainer from '../../components/MetadataContainer/MetadataContainer'
import { summarizeDurations } from '../../utils/utils'
import LearningMaterial from '../../components/LearningMaterial'
import { handleDocxDownload } from '../../utils/downloadAsDocx/downloadAsDocx'
import { Response, ResponseArray } from '../../shared/requests/types'
import { filterOutOnlyPublishedEntriesOnBlock } from '../../shared/requests/utils/publishedEntriesFilter'
import { GetStaticPropsContext } from 'next/types'
import Markdown from '../../components/Markdown/Markdown'
import { useDocxFileSize } from '../../utils/downloadAsDocx/useDocxFileSize'
import { handlePptxDownload } from '../../utils/downloadAsPptx/downloadAsPptx'
import { usePptxFileSize } from '../../utils/downloadAsPptx/usePptxFileSize'
import { useWindowSize } from '../../utils/useGetScreenSize'

type Props = {
  block: Data<BlockOneLevelDeep>
  landingPageCopy: LandingPageCopy
  generalCopy: Data<GeneralCopy>
}

export default function BlockPage({
  block,
  landingPageCopy,
  generalCopy,
}: Props) {
  // Using setHasMounted to address a hydration error caused by the discrepancy between server (where window is undefined and width is initialized to 0) and client-side rendering (where window is available and width is set based on the actual window size). This ensures components dependent on window size are only rendered client-side. Note: There might be more optimal solutions to handle this issue.
  const [hasMounted, setHasMounted] = useState(false)
  useEffect(() => {
    setHasMounted(true)
  }, [])
  const blockHasSlides = block.attributes.Slides.length > 0
  const { width } = useWindowSize()
  const breakpoint = Number(customBreakPoint)
  const docxFileSize = useDocxFileSize(block)
  const pptxFileSize = usePptxFileSize(block)

  return (
    <PageContainer hasTopPadding hasBottomPadding>
      <FlexContainer>
        <LearningMaterialOverview>
          <LearningMaterial
            type='BLOCK'
            title={block.attributes.Title}
            abstract={block.attributes.Abstract}
            learningOutcomes={block.attributes.LearningOutcomes}
            publishedAt={block.attributes.publishedAt}
            updatedAt={block.attributes.updatedAt}
            locale={block.attributes.locale}
            landingPageCopy={landingPageCopy}
            translationDoesNotExistCopy={
              generalCopy.attributes.TranslationDoesNotExist
            }
          />

          {width <= breakpoint && (
            <MetadataContainer
              duration={summarizeDurations([block])}
              authors={block.attributes.Authors}
              docxFileSize={docxFileSize}
              pptxFileSize={pptxFileSize}
              downloadAsDocx={() => handleDocxDownload(block)}
              downloadAsPptx={
                blockHasSlides ? () => handlePptxDownload(block) : undefined
              }
              parentRelations={{
                type: 'lectures',
                parents: block.attributes.Lectures.data,
              }}
              type='BLOCK'
              landingPageCopy={landingPageCopy}
            />
          )}

          <BlockContentWrapper>
            <LearningMaterialCourseHeading>
              {landingPageCopy.DescriptionHeader}
            </LearningMaterialCourseHeading>
            <Markdown>{block.attributes.Document}</Markdown>
          </BlockContentWrapper>
        </LearningMaterialOverview>
        {width > breakpoint && (
          <MetadataContainer
            duration={summarizeDurations([block])}
            authors={block.attributes.Authors}
            docxFileSize={docxFileSize}
            pptxFileSize={pptxFileSize}
            downloadAsDocx={() => handleDocxDownload(block)}
            downloadAsPptx={
              blockHasSlides ? () => handlePptxDownload(block) : undefined
            }
            parentRelations={{
              type: 'lectures',
              parents: block.attributes.Lectures.data,
            }}
            type='BLOCK'
            landingPageCopy={landingPageCopy}
          />
        )}
      </FlexContainer>
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
  const frenchBlocks: ResponseArray<Block> = await axios.get(
    `${process.env.STRAPI_API_URL}/blocks?locale=fr-FR`
  )

  const allBlocks = [
    ...englishBlocks.data.data,
    ...spanishBlocks.data.data,
    ...frenchBlocks.data.data,
  ]

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
      }&fallbackToDefaultLocale=true`
    )

    const blockRequest: Promise<Response<BlockOneLevelDeep>> = axios.get(
      `${process.env.STRAPI_API_URL}/blocks/${blockVuid.data?.id}?populate=*`
    )

    const copyRequest: Promise<ResponseArray<LandingPageCopy>> = axios.get(
      `${process.env.STRAPI_API_URL}/copy-block-pages?locale=${
        ctx.locale ?? ctx.defaultLocale
      }`
    )

    const generalCopyRequest: Promise<ResponseArray<GeneralCopy>> = axios.get(
      `${process.env.STRAPI_API_URL}/copy-generals?locale=${
        ctx.locale ?? ctx.defaultLocale
      }`
    )

    const [blockResponse, copyResponse, generalCopyResponse] =
      await Promise.all([blockRequest, copyRequest, generalCopyRequest])

    const block = blockResponse.data.data
    const landingPageCopy = copyResponse.data.data[0].attributes
    const generalCopy = generalCopyResponse.data.data[0]

    if (!block) {
      return {
        notFound: true,
      }
    }

    return {
      props: {
        block: filterOutOnlyPublishedEntriesOnBlock(block),
        landingPageCopy,
        generalCopy,
      },
      revalidate: 60,
    }
  } catch (error) {
    return {
      notFound: true,
    }
  }
}
