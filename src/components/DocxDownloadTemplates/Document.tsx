import React from 'react'
import ReactMarkdown from 'react-markdown'

type Props = {
  markdown: string
}

const Document = ({ markdown }: Props) => {
  return <ReactMarkdown>{markdown}</ReactMarkdown>
}

export default Document
