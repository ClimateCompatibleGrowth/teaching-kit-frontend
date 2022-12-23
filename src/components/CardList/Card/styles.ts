import styled from '@emotion/styled'
import { montserrat } from '../../../styles/fonts'
import { OnPrimary40, Primary40 } from '../../../styles/global'

export const Card = styled.div`
  width: 100%;

  padding: 0.3rem 3rem 1rem 3rem;

  background-color: ${Primary40};
  color: ${OnPrimary40};

  border-radius: 5px;
`

export const MetaData = styled.p`
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
    strong {
      font-family: ${montserrat['500'].style.fontFamily};
    }
  }
`
