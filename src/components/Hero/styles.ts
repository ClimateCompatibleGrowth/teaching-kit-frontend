import styled from '@emotion/styled'
import Image from 'next/image'
import Link from 'next/link'
import { montserrat } from '../../styles/fonts'
import {
  Accent40,
  breakpoints,
  Neutral90,
  OnAccent40,
} from '../../styles/global'

export const StyledWrapper = styled.div`
  max-width: 834px;
  margin: 0 auto;
  text-align: center;
`

export const StyledParagraph = styled.p`
  text-align: left;
  margin-bottom: 3.2rem;
`

export const StyledImage = styled(Image)`
  display: block;
  height: 480px;
  max-width: ${breakpoints.lg};
  margin: 0 auto;
  object-fit: cover;
`

export const StyledButtonLink = styled(Link)`
  display: inline-block;
  padding: 12px 24px;

  background-color: ${Accent40};
  color: ${OnAccent40};

  font-size: 1.8rem;
  font-family: ${montserrat[300].style.fontFamily};

  &:disabled {
    background-color: ${Neutral90};

    &:hover {
      cursor: default;
    }
  }
`
