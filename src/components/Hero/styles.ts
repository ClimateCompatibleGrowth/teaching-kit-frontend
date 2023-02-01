import styled from '@emotion/styled'
import NextImage from 'next/image'
import Link from 'next/link'
import { montserrat } from '../../styles/fonts'
import {
  Accent40,
  breakpoints,
  Neutral90,
  OnAccent40,
} from '../../styles/global'

export const Wrapper = styled.div`
  max-width: 834px;
  margin: 0 auto;
  text-align: center;
  margin-bottom: 10rem;
`

export const Paragraph = styled.p`
  text-align: left;
  margin-bottom: 3.2rem;
`

export const Image = styled(NextImage)`
  display: block;
  height: 480px;
  width: 100%;
  max-width: ${breakpoints.lg};
  margin: 0 auto;
  object-fit: cover;
`
