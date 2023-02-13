import styled from '@emotion/styled'
import { montserrat } from '../../../styles/fonts'
import { mq, Neutral99, OnNeutral99, OnPrimary90 } from '../../../styles/global'

export const Card = styled.div`
  flex: 0 1 100%;
  padding: 3.2rem 2.4rem;
  background-color: ${Neutral99};
  color: ${OnNeutral99};

  ${mq.sm} {
    flex: 0 1 48%;
    &:nth-of-type(n) {
      margin-bottom: 1.6rem;
    }
  }
  ${mq.md} {
    flex: 0 1 32%;
    &:nth-of-type(n) {
      margin-bottom: 0;
    }
  }
`

export const Metadata = styled.p`
  margin-top: 2rem;
`

export const Markdown = styled.div`
  p {
    margin-bottom: 0;

    strong {
      font-family: ${montserrat[500].style.fontFamily};
    }
  }
`

export const SubTitle = styled.h5`
  margin-top: 0;

  font-family: ${montserrat[400].style.fontFamily};
  font-size: 1.8rem;
  color: ${OnPrimary90};
`

export const SubComponentWrapper = styled.div`
  width: 95%;
  margin-top: 2rem;
`
