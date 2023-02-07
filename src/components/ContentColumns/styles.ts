import styled from '@emotion/styled'
import { mq } from '../../styles/global'

export const Wrapper = styled.div`
  display: flex;
  column-gap: 2.4rem;
  padding-bottom: 8rem;
  flex-wrap: wrap;
  p {
    font-size: 1.4rem;
    line-height: 1.7rem;
  }

  ${mq.md} {
    flex-wrap: nowrap;
  }
`

export const Column = styled.div`
  flex: 0 0 100%;

  ${mq.md} {
    flex: 0 0 50%;
  }
`
