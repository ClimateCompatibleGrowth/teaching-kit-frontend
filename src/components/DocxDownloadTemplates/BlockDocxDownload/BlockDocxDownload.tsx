import React from 'react'
import { BlockOneLevelDeep, Data } from '../../../types'
import Markdown from '../../Markdown/Markdown'
import Abstract from '../Abstract'
import Authors from '../Authors'
import Duration from '../Duration'
import Heading from '../Heading'
import LearningOutcomes from '../LearningOutcomes'
import References from '../References'

export type Props = {
  block: Data<BlockOneLevelDeep>
}

const TYPE = 'BLOCK'

const BlockDocxDownload = ({ block }: Props) => {
  return (
    <div>
      <Heading downloadedAs={TYPE}>{block.attributes.Title}</Heading>
      <Authors authors={block.attributes.Authors.data} />
      <Duration blocks={[block]} />
      <Abstract downloadedAs={TYPE} markdown={block.attributes.Abstract} />
      <LearningOutcomes learningOutcomes={block.attributes.LearningOutcomes} />
      <Markdown>{block.attributes.Document}</Markdown>
      <References
        references={block.attributes.References}
        downloadedAs={TYPE}
      />
    </div>
  )
}

export default BlockDocxDownload
