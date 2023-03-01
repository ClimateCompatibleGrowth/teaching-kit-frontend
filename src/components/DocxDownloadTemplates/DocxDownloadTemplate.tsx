import React from 'react'
import { Data, DownloadableContent } from '../../types'
import {
  isBlockOneLevelDeep,
  isLectureTwoLevelsDeep,
  isCourseThreeLevelsDeep,
} from '../../types/checkers'
import Markdown from '../Markdown/Markdown'
import Abstract from './Abstract'
import Authors from './Authors'
import CiteAs from './CiteAs'
import Duration from './Duration'
import Heading from './Heading'
import LearningOutcomes from './LearningOutcomes'
import Level from './Level'
import References from './References'

export type Props = {
  data: Data<DownloadableContent>
}

const DocxDownload = ({ data }: Props): JSX.Element => {
  if (isBlockOneLevelDeep(data)) {
    return (
      <div key={data.attributes.Title}>
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
      <div key={data.attributes.Title}>
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
        {data.attributes.Blocks.data.map((block) => (
          <DocxDownload key={block.attributes.Title} data={block} />
        ))}
      </div>
    )
  }
  if (isCourseThreeLevelsDeep(data)) {
    return (
      <>
        {data.attributes.Lectures.data.map((lecture) => (
          <DocxDownload key={lecture.attributes.Title} data={lecture} />
        ))}
      </>
    )
  }
  return <></>
}

export default DocxDownload
