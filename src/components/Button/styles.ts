import styled from '@emotion/styled'
import {
  Accent40,
  Background,
  ButtonWithoutDefaultStyle,
} from '../../styles/global'

export const Button = styled(ButtonWithoutDefaultStyle)`
  width: 11rem;
  height: 5rem;

  background-color: ${Background};
  border: 1px solid ${Accent40};

  font-size: 1.6rem;
`
