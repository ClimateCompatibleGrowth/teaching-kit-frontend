import styled from '@emotion/styled'
import { mq, Neutral40 } from '../../styles/global'

export const Wrapper = styled.div`
  flex: 0 0 100%;
  ${mq.sm} {
    flex: 0 1 calc(74% - 4.6rem);
  }
`

export const H1 = styled.h1`
  font-size: 2.4rem;
  margin-top: 2.4rem;
  margin-bottom: 3.2rem;
  ${mq.sm} {
    font-size: 3.2rem;
    margin-top: 2.4rem;
    margin-bottom: 3.2rem;
  }
`

export const H2 = styled.h2`
  font-size: 1.6rem;
  ${mq.sm} {
    font-size: 1.8rem;
  }
`

export const H4 = styled.h4`
  margin: 0;

  font-size: 2.4rem;
  color: ${Neutral40};
`

export const DateInformation = styled.div`
  color: ${Neutral40};
  font-size: 1.4rem;
`
