import { StaticImageData } from 'next/image'
import { Accent40, OnAccent40, PageContainer } from '../../styles/global'
import ButtonLink from '../ButtonLink/ButtonLink'
import * as Styled from './styles'

interface Props {
  image: {
    alt: string
    src: StaticImageData
  }
  title: string
  body: string
  action?: {
    href: string
    label: string
  }
}

export default function Hero({ image, title, body, action }: Props) {
  return (
    <>
      <Styled.Image alt={image.alt} src={image.src} />
      <PageContainer>
        <Styled.Wrapper>
          <h1>{title}</h1>
          <Styled.Paragraph>{body}</Styled.Paragraph>
          {action && (
            <ButtonLink primary={false} href={action.href}>
              {action.label}
            </ButtonLink>
          )}
        </Styled.Wrapper>
      </PageContainer>
    </>
  )
}
