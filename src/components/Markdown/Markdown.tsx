import React from 'react'
import remarkGfm from 'remark-gfm'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import { ReactMarkdownOptions } from 'react-markdown/lib/react-markdown'

const Markdown = (props: ReactMarkdownOptions) => {
  return (
    <ReactMarkdown
      components={{
        img: ({ node, ...props }) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img crossOrigin='anonymous' alt={props.alt} {...props} /> //https://stackoverflow.com/a/47359958/5837635
        ),
      }}
      remarkPlugins={[remarkGfm]}
      {...props}
    />
  )
}

export default Markdown
