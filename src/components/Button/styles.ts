import styled from '@emotion/styled'
import {
  Accent40,
  Background,
  ButtonWithoutDefaultStyle,
  Neutral90,
} from '../../styles/global'

export const Button = styled(ButtonWithoutDefaultStyle)`
  width: 11rem;
  height: 5rem;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${Background};
  border: 1px solid ${Accent40};

  font-size: 1.6rem;

  &:disabled {
    background-color: ${Neutral90};

    &:hover {
      cursor: default;
    }
  }
`
