import {
  Data,
  BlockOneLevelDeep,
  LectureTwoLevelsDeep,
  CourseThreeLevelsDeep,
  DownloadableContent,
} from '../../types'
import Markdown from '../Markdown/Markdown'
import Abstract from './Abstract'
import Authors from './Authors'
import CiteAs from './CiteAs'
import Duration from './Duration'
import Heading from './Heading'
import LearningOutcomes from './LearningOutcomes'
import Level from './Level'
import References from './References'

export const isBlockOneLevelDeep = (
  data: Data<DownloadableContent>
): data is Data<BlockOneLevelDeep> =>
  !!(data as Data<BlockOneLevelDeep>).attributes.Document
export const isLectureTwoLevelsDeep = (
  data: Data<DownloadableContent>
): data is Data<LectureTwoLevelsDeep> =>
  !!(data as Data<LectureTwoLevelsDeep>).attributes.Blocks
export const isCourseThreeLevelsDeep = (
  data: Data<DownloadableContent>
): data is Data<CourseThreeLevelsDeep> =>
  !!(data as Data<CourseThreeLevelsDeep>).attributes.Lectures &&
  !!(data as Data<CourseThreeLevelsDeep>).attributes.CourseCreators

export type Props = {
  data: Data<DownloadableContent>
}

const DocxDownload = ({ data }: Props): JSX.Element => {
  if (isBlockOneLevelDeep(data)) {
    return (
      <div>
        <Heading downloadedAs={'BLOCK'}>{data.attributes.Title}</Heading>
        <Authors authors={data.attributes?.Authors?.data} />
        <Duration blocks={[data]} />
        <Abstract downloadedAs={'BLOCK'} markdown={data.attributes.Abstract} />
        <LearningOutcomes learningOutcomes={data.attributes.LearningOutcomes} />
        <Markdown>{data.attributes.Document}</Markdown>
        <References
          references={data.attributes.References}
          downloadedAs={'BLOCK'}
        />
      </div>
    )
  }
  if (isLectureTwoLevelsDeep(data)) {
    return (
      <div>
        <Heading downloadedAs={'LECTURE'}>{data.attributes.Title}</Heading>
        {data.attributes.Level?.data?.attributes.Level !== undefined ? (
          <Level level={data.attributes.Level.data.attributes.Level} />
        ) : null}
        <Authors authors={data.attributes.LectureCreators.data} />
        <Duration blocks={data.attributes.Blocks.data} />
        <Abstract
          downloadedAs={'LECTURE'}
          markdown={data.attributes.Abstract}
        />
        <LearningOutcomes learningOutcomes={data.attributes.LearningOutcomes} />
        <CiteAs downloadedAs={'LECTURE'} citeAs={data.attributes.CiteAs} />
        {data.attributes.Blocks.data.map((block) =>
          DocxDownload({ data: block })
        )}
      </div>
    )
  }
  if (isCourseThreeLevelsDeep(data)) {
    return (
      <>
        {data.attributes.Lectures.data.map((lecture) =>
          DocxDownload({ data: lecture })
        )}
      </>
    )
  }
  return <></>
}

export default DocxDownload
