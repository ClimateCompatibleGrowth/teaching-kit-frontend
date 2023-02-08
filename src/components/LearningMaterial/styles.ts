import styled from '@emotion/styled'
import { mq, Neutral40 } from '../../styles/global'

export const Wrapper = styled.div`
  flex: 0 0 100%;
  ${mq.sm} {
    flex: 0 1 calc(74% - 4.6rem);
  }
`

export const H1 = styled.h1`
  margin-top: 3.5rem;
  margin-bottom: 5rem;
`

export const H2 = styled.h2`
  font-size: 2.4rem;
`

export const H4 = styled.h4`
  margin: 0;

  font-size: 2.4rem;
  color: ${Neutral40};
`
