import styled from '@emotion/styled'
import axios from 'axios'
import CardList from '../../components/CardList/CardList'
import LearningMaterial from '../../components/LearningMaterial'
import MetadataContainer from '../../components/MetadataContainer/MetadataContainer'
import { getLectures } from '../../shared/requests/lectures/lectures'
import {
  LearningMaterialContainer,
  LearningMaterialOverview,
} from '../../styles/global'
import { Data, LectureTwoLevelsDeep } from '../../types'
import { handleLectureDocxDownload } from '../../utils/downloadAsDocx/downloadAsDocx'
import { handleLecturePptxDownload } from '../../utils/downloadAsPptx/handlePptxDownloads'
import { summarizeDurations } from '../../utils/utils'

const LectureContentWrapper = styled.div`
  margin-top: 5rem;
`

const Styled = { LectureContentWrapper }

type Props = { lecture: Data<LectureTwoLevelsDeep> }

export default function LecturePage({ lecture }: Props) {
  return (
    <LearningMaterialContainer>
      <LearningMaterialOverview>
        <LearningMaterial
          type='LECTURE'
          title={lecture.attributes.Title}
          abstract={lecture.attributes.Abstract}
          learningOutcomes={lecture.attributes.LearningOutcomes}
          acknowledgement={lecture.attributes.Acknowledgement}
          citeAs={lecture.attributes.CiteAs}
        />
        <Styled.LectureContentWrapper>
          <h2>Lecture Content</h2>
          <CardList
            cards={lecture.attributes.Blocks.data.map((block, index) => ({
              id: block.id.toString(),
              title: block.attributes.Title,
              text: block.attributes.Abstract,
              subTitle: `Lecture block ${index + 1}`,
            }))}
          />
        </Styled.LectureContentWrapper>
      </LearningMaterialOverview>
      <MetadataContainer
        level={lecture.attributes.Level}
        duration={summarizeDurations(lecture.attributes.Blocks.data)}
        authors={lecture.attributes.LectureCreator}
        downloadAsPptx={() => handleLecturePptxDownload(lecture)}
        downloadAsDocx={() => handleLectureDocxDownload(lecture)}
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

  const lectures = await getLectures()

  const paths = lectures.map((lecture) => ({
    params: { id: `${lecture.id}` },
  }))

  return { paths, fallback: false }
}

export async function getStaticProps(ctx: any) {
  const res = await axios.get(
    `${process.env.STRAPI_API_URL}/lectures/${ctx.params.id}?populate[Blocks][populate][Slides]=*`
  )
  const lecture = res.data.data

  return {
    props: { lecture },
  }
}
