import styled from '@emotion/styled'
import NextImage from 'next/image'
import { breakpoints, mq } from '../../styles/global'

export const Wrapper = styled.div`
  max-width: 834px;
  margin: 0 auto;
  text-align: center;
`

export const Paragraph = styled.p`
  text-align: left;
  margin-bottom: 3.2rem;
  margin: 0 0.8rem 3.2rem;
`

export const Image = styled(NextImage)`
  display: block;
  height: 240px;
  width: 100%;
  max-width: ${breakpoints.lg};
  margin: 0 auto 4rem;
  object-fit: cover;

  ${mq.sm} {
    height: 480px;
    margin: 0 auto 6.4rem;
  }
`
