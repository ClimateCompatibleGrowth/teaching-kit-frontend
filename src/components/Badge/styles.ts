import styled from '@emotion/styled'
import { montserrat } from '../../styles/fonts'
import { OnNeutral99 } from '../../styles/global'

export const Badge = styled.div<{
  backgroundColor?: string
  borderColor?: string
}>`
  width: min-content;
  padding: 0.2em 0.8em;

  background-color: ${(props) => props.backgroundColor};
  color: ${OnNeutral99};
  border: 1px solid ${(props) => props.borderColor};

  border-radius: 100px;

  white-space: nowrap;

  font-size: 1.6rem;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;

    font-size: 1.6rem;
    font-family: ${montserrat[400].style.fontFamily};
  }
`
