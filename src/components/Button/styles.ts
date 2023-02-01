import styled from '@emotion/styled'
import {
  Accent40,
  Background,
  ButtonWithoutDefaultStyle,
  Neutral90,
} from '../../styles/global'

export const Button = styled(ButtonWithoutDefaultStyle)`
  padding: 0.8rem 1.6rem;

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
