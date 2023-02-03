import React from 'react'
import { PageContainer } from '../../styles/global'
import Poster, { PosterType } from './Poster/Poster'
import * as Styled from './styles'

type Props = {
  posters: PosterType[]
  title?: string
}

const PosterList = ({ posters, title }: Props) => {
  return (
    <PageContainer hasBottomPadding>
      <Styled.PosterHeading>{title}</Styled.PosterHeading>
      <Styled.PosterList>
        {posters.map((poster) => (
          <Poster poster={poster} key={poster.id} />
        ))}
      </Styled.PosterList>
    </PageContainer>
  )
}

export default PosterList
