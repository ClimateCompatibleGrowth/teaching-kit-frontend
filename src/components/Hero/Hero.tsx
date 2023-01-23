import { StaticImageData } from 'next/image'
import { PageContainer } from '../../styles/global'
import {
  StyledButtonLink,
  StyledImage,
  StyledParagraph,
  StyledWrapper,
} from './styles'

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
      <StyledImage alt={image.alt} src={image.src} />
      <PageContainer>
        <StyledWrapper>
          <h1>{title}</h1>
          <StyledParagraph>{body}</StyledParagraph>
          {action && (
            <StyledButtonLink href={action?.href}>
              {action.label}
            </StyledButtonLink>
          )}
        </StyledWrapper>
      </PageContainer>
    </>
  )
}
