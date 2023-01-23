import styled from '@emotion/styled'
import { montserrat, ubuntu } from '../../../styles/fonts'
import { mq, Neutral99, OnNeutral99, OnPrimary90 } from '../../../styles/global'

export const Card = styled.div`
  flex: 0 1 100%;
  padding: 3.2rem 2.4rem;
  background-color: ${Neutral99};
  color: ${OnNeutral99};
  &:nth-child(n) {
    margin-bottom: 2%;
  }

  ${mq.sm} {
    flex: 0 1 48%;
  }
  ${mq.md} {
    flex: 0 1 32%;
    &:nth-child(n) {
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

export const Title = styled.h4`
  font-family: ${ubuntu[700].style.fontFamily};
  font-size: 2.4rem;
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
