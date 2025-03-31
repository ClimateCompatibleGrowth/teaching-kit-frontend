import React from 'react'

type Props = {
  listOfContent: Content[]
}

export type Content = {
  id: number
  listItem: string
}

const UnorderedList = ({ listOfContent }: Props) => {
  return (
    <ul>
      {listOfContent.map((content) => (
        <li key={content.id}>{content.listItem}</li>
      ))}
    </ul>
  )
}

export default UnorderedList
