import styled from '@emotion/styled'
import { montserrat, ubuntu } from '../../../styles/fonts'
import { BorderRadius, OnPrimary90, Primary90 } from '../../../styles/global'

export const Card = styled.div`
  width: 100%;

  padding: 3.2rem 2.4rem;

  background-color: ${Primary90};
  color: ${OnPrimary90};

  border-radius: ${BorderRadius};
`

export const Metadata = styled.p`
  margin-top: 2rem;
`

export const Markdown = styled.div`
  max-height: 10rem;

  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box !important;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  white-space: normal;

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
