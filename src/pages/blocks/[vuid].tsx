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
  PaginationControls,
  ButtonWithoutDefaultStyle,
  Accent40,
} from '../../styles/global'
import MetadataContainer from '../../components/MetadataContainer/MetadataContainer'
import { summarizeDurations } from '../../utils/utils'
import LearningMaterial from '../../components/LearningMaterial'
import { handleDocxDownload } from '../../utils/downloadAsDocx/downloadAsDocx'
import { Response, ResponseArray } from '../../shared/requests/types'
import {
  filterOutOnlyPublishedEntriesOnBlock,
  filterOutOnlyPublishedEntriesOnLecture,
} from '../../shared/requests/utils/publishedEntriesFilter'
import { GetStaticPropsContext } from 'next/types'
import Markdown from '../../components/Markdown/Markdown'
import { useDocxFileSize } from '../../utils/downloadAsDocx/useDocxFileSize'
import { handlePptxDownload } from '../../utils/downloadAsPptx/downloadAsPptx'
import { usePptxFileSize } from '../../utils/downloadAsPptx/usePptxFileSize'
import { useWindowSize } from '../../utils/useWindowSize'
import { useEffect, useState } from 'react'
import CardList from '../../components/CardList/CardList'
import LearningMaterialBadge from '../../components/LearningMaterial/LearningMaterialBadge/LearningMaterialBadge'
import { useRouter } from 'next/router'

type Props = {
  block: Data<BlockOneLevelDeep>
  landingPageCopy: LandingPageCopy
  generalCopy: Data<GeneralCopy>
  lectureBlocks: any
}

export default function BlockPage({
  block,
  landingPageCopy,
  generalCopy,
  lectureBlocks,
}: Props) {
  // Using setHasMounted to address a hydration error caused by the discrepancy between server (where window is undefined and width is initialized to 0) and client-side rendering (where window is available and width is set based on the actual window size). This ensures components dependent on window size are only rendered client-side. Note: There might be more optimal solutions to handle this issue.
  const [hasMounted, setHasMounted] = useState(false)
  const [hideNextBtn, setHideNextBtn] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(() =>
    lectureBlocks.findIndex((b: typeof block) => b.id === block.id)
  )

  useEffect(() => {
    setHasMounted(true)
  }, [])
  useEffect(() => {
    if (currentIndex === lectureBlocks.length - 1) {
      setHideNextBtn(true)
    } else {
      setHideNextBtn(false)
    }
  }, [currentIndex, lectureBlocks.length])

  const blockHasSlides = block.attributes.Slides.length > 0
  const { width } = useWindowSize()
  const breakpoint = Number(customBreakPoint)
  const docxFileSize = useDocxFileSize(block)
  const pptxFileSize = usePptxFileSize(block)
  const router = useRouter()

  const handleNextLectureBlockBtn = () => {
    const nextIndex = currentIndex + 1

    if (nextIndex < lectureBlocks.length) {
      setCurrentIndex(nextIndex)

      const nextBlock = lectureBlocks[nextIndex]
      router.push(`/blocks/${nextBlock.attributes.vuid}`)
    }
    if (currentIndex === lectureBlocks.length - 2) {
      setHideNextBtn(true)
    }
  }

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

          {hasMounted && width <= breakpoint && (
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
          <PaginationControls>
            <h2>Episodes in this lecture</h2>
            <ButtonWithoutDefaultStyle
              onClick={() => handleNextLectureBlockBtn()}
              style={{
                color: `${Accent40}`,
                fontSize: '1.6rem',
                fontWeight: 400,
                display: `${hideNextBtn ? 'none' : 'block'}`,
                textDecoration: 'underline',
              }}
            >
              Next Lecture Block
            </ButtonWithoutDefaultStyle>
          </PaginationControls>
          <CardList
            cards={lectureBlocks.map((block: any, index: number) => ({
              id: block.id.toString(),
              title: block.attributes.Title,
              text: block.attributes.Abstract,
              href: `/blocks/${block.attributes.vuid}`,
              subTitle: <LearningMaterialBadge type='BLOCK' />,
              translationDoesNotExistCopy:
                generalCopy.attributes.TranslationDoesNotExist,
              index: index,
            }))}
            setCurrentIndex={setCurrentIndex}
            currentIndex={currentIndex}
          />
        </LearningMaterialOverview>
        {hasMounted && width > breakpoint && (
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

    const [blockResponse] = await Promise.all([blockRequest])

    const block = blockResponse.data.data

    if (!block) {
      return { notFound: true }
    }

    // Hämta alla block inom den aktuella föreläsningen
    const lectureId = block.attributes.Lectures.data[0].id
    const lectureBlocksResponse = await axios.get(
      `${process.env.STRAPI_API_URL}/lectures/${lectureId}?populate[Blocks]=*`
    )
    const lectureBlocks = lectureBlocksResponse.data.data.attributes.Blocks.data

    // Fortsätt att hämta övriga data
    const copyRequest = axios.get(
      `${process.env.STRAPI_API_URL}/copy-block-pages?locale=${
        ctx.locale ?? ctx.defaultLocale
      }`
    )
    const generalCopyRequest = axios.get(
      `${process.env.STRAPI_API_URL}/copy-generals?locale=${
        ctx.locale ?? ctx.defaultLocale
      }`
    )

    const [copyResponse, generalCopyResponse] = await Promise.all([
      copyRequest,
      generalCopyRequest,
    ])
    const landingPageCopy = copyResponse.data.data[0].attributes
    const generalCopy = generalCopyResponse.data.data[0]

    return {
      props: {
        block: filterOutOnlyPublishedEntriesOnBlock(block),
        lectureBlocks: lectureBlocks, // Alla block inom föreläsningen
        landingPageCopy,
        generalCopy,
      },
      revalidate: 60,
    }
  } catch (error) {
    return { notFound: true }
  }
}
