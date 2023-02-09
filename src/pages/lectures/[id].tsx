import axios from 'axios'
import { GetStaticPropsContext } from 'next/types'
import CardList from '../../components/CardList/CardList'
import LearningMaterial from '../../components/LearningMaterial'
import LearningMaterialBadge from '../../components/LearningMaterial/LearningMaterialBadge/LearningMaterialBadge'
import MetadataContainer from '../../components/MetadataContainer/MetadataContainer'
import { ResponseArray } from '../../shared/requests/types'
import { filterOutOnlyPublishedEntriesOnLecture } from '../../shared/requests/utils/publishedEntriesFilter'
import {
  BlockContentWrapper,
  LearningMaterialCourseHeading,
  LearningMaterialOverview,
  PageContainer,
} from '../../styles/global'
import { Data, Lecture, LectureTwoLevelsDeep } from '../../types'
import { handleLectureDocxDownload } from '../../utils/downloadAsDocx/downloadAsDocx'
import { downloadLecturePptx } from '../../utils/downloadAsPptx/downloadLectureAsPptx'
import { summarizeDurations } from '../../utils/utils'

type Props = { lecture: Data<LectureTwoLevelsDeep> }

export default function LecturePage({ lecture }: Props) {
  return (
    <PageContainer hasTopPadding hasBottomPadding>
      <LearningMaterialOverview>
        <LearningMaterial
          type='LECTURE'
          title={lecture.attributes.Title}
          abstract={lecture.attributes.Abstract}
          learningOutcomes={lecture.attributes.LearningOutcomes}
          acknowledgement={lecture.attributes.Acknowledgement}
          citeAs={lecture.attributes.CiteAs}
          publishedAt={lecture.attributes.publishedAt}
          updatedAt={lecture.attributes.updatedAt}
        />
        <MetadataContainer
          level={lecture.attributes.Level}
          duration={summarizeDurations(lecture.attributes.Blocks.data)}
          authors={lecture.attributes.LectureCreators}
          downloadAsDocx={() => handleLectureDocxDownload(lecture)}
          downloadAsPptx={() => downloadLecturePptx(lecture)}
          parentRelations={{
            type: 'courses',
            parents: lecture.attributes.Courses.data,
          }}
          type='LECTURE'
        />
        <BlockContentWrapper>
          <LearningMaterialCourseHeading>
            Lecture Content
          </LearningMaterialCourseHeading>
          <CardList
            cards={lecture.attributes.Blocks.data.map((block) => ({
              id: block.id.toString(),
              title: block.attributes.Title,
              text: block.attributes.Abstract,
              href: `/blocks/${block.id}`,
              subTitle: <LearningMaterialBadge type='BLOCK' />,
            }))}
          />
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

  const lectures: ResponseArray<Lecture> = await axios.get(
    `${process.env.STRAPI_API_URL}/lectures`
  )

  const paths = lectures.data.data.map((lecture) => ({
    params: { id: `${lecture.id}` },
  }))

  return { paths, fallback: false }
}

export async function getStaticProps(ctx: GetStaticPropsContext) {
  const populateCourses = 'populate[Courses]=*'
  const populateBlocks = 'populate[Blocks][populate][0]=*'
  const populateLectureCreators = 'populate[LectureCreators][populate]=*'
  const populateLearningOutcomes = 'populate[LearningOutcomes][populate]=*'
  const populateBlockAuthors = 'populate[Blocks][populate][Authors]=*'
  const populateBlockSlides = 'populate[Blocks][populate][Slides]=*'
  const populateLevel = 'populate[Level]=Level'

  const res = await axios.get(
    `${process.env.STRAPI_API_URL}/lectures/${ctx.params?.id}?${populateCourses}&${populateBlocks}&${populateLectureCreators}&${populateLearningOutcomes}&${populateBlockAuthors}&${populateBlockSlides}&${populateLevel}`
  )
  const lecture: Data<LectureTwoLevelsDeep> = res.data.data

  return {
    props: {
      lecture: filterOutOnlyPublishedEntriesOnLecture(lecture),
    },
  }
}
