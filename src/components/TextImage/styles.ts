import styled from '@emotion/styled'
import NextImage from 'next/image'
import { Accent40, mq, Neutral99, OnNeutral99 } from '../../styles/global'

type PortionProps = {
  mobileOrder?: number
}

export const Wrapper = styled.div`
  display: flex;
  background-color: ${Neutral99};
  color: ${OnNeutral99};
  flex-wrap: wrap;

  ${mq.sm} {
    flex-wrap: nowrap;
  }
`

export const Portion = styled.div<PortionProps>`
  flex: 0 0 100%;
  order: ${(props) => props.mobileOrder};
  ${mq.sm} {
    flex: 0 1 50%;
    width: 50%;
    order: 0;
  }
`

export const TextContainer = styled.div`
  padding: 5.4rem 2.4rem;
  word-break: break-word;
  a {
    color: ${Accent40};
    text-decoration: underline;
  }
`

export const Image = styled(NextImage)`
  height: 100%;
  width: 100%;
  object-fit: cover;
`
