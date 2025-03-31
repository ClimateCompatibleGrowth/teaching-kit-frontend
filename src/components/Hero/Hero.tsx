import { StaticImageData } from 'next/image'
import { PageContainer } from '../../styles/global'
import ButtonLink from '../ButtonLink/ButtonLink'
import * as Styled from './styles'

interface Props {
  image: {
    alternativeText: string
    source: StaticImageData
  }
  title: string
  body: string
  action?: {
    href: string
    label: string
  }
}

export default function Hero({ image, title, body, action }: Props) {
  if (process.env.NEXT_PUBLIC_ENVIRONMENT === 'development') {
    image.source.src = `https://${process.env.NEXT_PUBLIC_S3_HOST}/campus_students_6b3f510781.jpeg?updated_at=2023-03-08T14:05:20.823Z`
  }
  return (
    <>
      <Styled.Image
        alt={image.alternativeText}
        src={image.source}
        width={1440}
      />
      <PageContainer hasBottomPadding>
        <Styled.Wrapper>
          <h1>{title}</h1>
          <Styled.Paragraph>{body}</Styled.Paragraph>
          {action && (
            <ButtonLink primary href={action.href}>
              {action.label}
            </ButtonLink>
          )}
        </Styled.Wrapper>
      </PageContainer>
    </>
  )
}
