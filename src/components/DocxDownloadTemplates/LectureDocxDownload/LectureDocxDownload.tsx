import React from 'react'
import { Data, LectureTwoLevelsDeep } from '../../../types'
import Abstract from '../Abstract'
import Authors from '../Authors'
import BlockDocxDownload from '../BlockDocxDownload/BlockDocxDownload'
import CiteAs from '../CiteAs'
import Duration from '../Duration'
import Heading from '../Heading'
import LearningOutcomes from '../LearningOutcomes'
import Level from '../Level'

export type Props = { lecture: Data<LectureTwoLevelsDeep> }

const TYPE = 'LECTURE'

const LectureDocxDownload = ({ lecture }: Props) => {
  return (
    <div>
      <Heading downloadedAs={TYPE}>{lecture.attributes.Title}</Heading>
      <Level level={lecture.attributes.Level} />
      <Authors authors={lecture.attributes.LectureCreator.data} />
      <Duration blocks={lecture.attributes.Blocks.data} />
      <Abstract downloadedAs={TYPE} markdown={lecture.attributes.Abstract} />
      <LearningOutcomes
        learningOutcomes={lecture.attributes.LearningOutcomes}
      />
      <CiteAs downloadedAs={TYPE} citeAs={lecture.attributes.CiteAs} />
      {lecture.attributes.Blocks.data.map((block) => (
        <BlockDocxDownload block={block} key={block.id} />
      ))}
    </div>
  )
}

export default LectureDocxDownload
