import React from 'react'
import remarkGfm from 'remark-gfm'
import ReactMarkdown from 'react-markdown'
import { ReactMarkdownOptions } from 'react-markdown/lib/react-markdown'

const Markdown = (props: ReactMarkdownOptions) => {
  return <ReactMarkdown remarkPlugins={[remarkGfm]} {...props} />
}

export default Markdown
