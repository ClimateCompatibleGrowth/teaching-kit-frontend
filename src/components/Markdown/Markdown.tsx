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
          <img
            crossOrigin='anonymous'
            alt={props.alt}
            {...props}
            style={{ marginTop: '45px' }}
          /> //https://stackoverflow.com/a/47359958/5837635
        ),
        table: ({ node, ...props }) => (
          <table {...props} style={{ margin: '60px 0' }}>
            {props.children}
          </table>
        ),
        h1: ({ node, ...props }) => (
          <h1 {...props} style={{ margin: '26.8px 0 15px 0' }}>
            {props.children}
          </h1>
        ),
        h2: ({ node, ...props }) => (
          <h2 {...props} style={{ marginTop: '35px' }}>
            {props.children}
          </h2>
        ),
      }}
      remarkPlugins={[remarkGfm]}
      {...props}
    />
  )
}

export default Markdown
