import React from 'react'
import { StaticImageData } from 'next/image'
import { PageContainer } from '../../styles/global'
import * as Styled from './styles'
import Markdown from '../Markdown/Markdown'

type Props = {
  image: {
    src: StaticImageData
    alt: string
  }
  title: string
  body: string
}

const TextImage = ({ image, title, body }: Props) => {
  if (process.env.NEXT_PUBLIC_ENVIRONMENT === 'development') {
    image.src.src = `https://${process.env.NEXT_PUBLIC_S3_HOST}/lesson_students_c52080c242.jpeg?updated_at=2023-03-08T14:05:20.280Z`
  }
  return (
    <PageContainer hasBottomPadding hasSmallSidePadding>
      <Styled.Wrapper>
        <Styled.Portion mobileOrder={1}>
          <Styled.TextContainer>
            <h3>{title}</h3>
            <Markdown>{body}</Markdown>
          </Styled.TextContainer>
        </Styled.Portion>
        <Styled.Portion>
          {image.src && image.alt && (
            <Styled.Image src={image.src} alt={image.alt} width={640} />
          )}
        </Styled.Portion>
      </Styled.Wrapper>
    </PageContainer>
  )
}

export default TextImage
