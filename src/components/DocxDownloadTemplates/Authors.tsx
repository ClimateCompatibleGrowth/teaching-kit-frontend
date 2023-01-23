import React from 'react'
import { Author, Data } from '../../types'

type Props = {
  authors: Data<Author>[]
}

const Authors = ({ authors }: Props) => {
  return authors !== undefined && authors.length > 0 ? (
    <p>
      Author(s):{'   '}
      {authors.map((author) => author.attributes.Name).join(', ')}
    </p>
  ) : null
}

export default Authors
