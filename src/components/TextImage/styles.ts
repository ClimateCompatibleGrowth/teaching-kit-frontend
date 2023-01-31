import styled from '@emotion/styled'
import NextImage from 'next/image'
import { mq, Neutral99, OnNeutral99 } from '../../styles/global'

export const Wrapper = styled.div`
  display: flex;
  background-color: ${Neutral99};
  color: ${OnNeutral99};
  flex-wrap: wrap;

  ${mq.sm} {
    flex-wrap: nowrap;
  }
`

export const Portion = styled.div`
  flex: 0 0 100%;
  ${mq.sm} {
    flex: 0 1 50%;
    width: 50%;
  }
`

export const TextContainer = styled.div`
  padding: 5.4rem 2.4rem;
  word-break: break-word;
`

export const Image = styled(NextImage)`
  height: 100%;
  width: 100%;
  // max-width: 100%;
  object-fit: cover;
`
