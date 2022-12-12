import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Block as BlockType, Data } from '../../types'

export type Props = { block: Data<BlockType>['attributes'] }
export default function Block({ block }: Props) {
  const [showSlides, setShowSlides] = useState(false)

  return (
    <>
      <h2 className="title" onClick={() => setShowSlides(!showSlides)}>
        Block: {block.Title}
      </h2>
      {showSlides && <ReactMarkdown>{block.Document}</ReactMarkdown>}
    </>
  )
}
