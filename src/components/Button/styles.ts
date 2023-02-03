import styled from '@emotion/styled'
import { montserrat } from '../../styles/fonts'
import {
  Accent40,
  Background,
  ButtonWithoutDefaultStyle,
  Neutral90,
  OnAccent40,
  OnPrimary40,
} from '../../styles/global'

export type Props = {
  primary?: boolean
}

export const Button = styled(ButtonWithoutDefaultStyle)<Props>`
  padding: 0.8rem 1.6rem;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${(props) => (props.primary ? Accent40 : Background)};
  border: 1px solid ${(props) => (props.primary ? Accent40 : Accent40)};
  color: ${(props) => (props.primary ? OnAccent40 : OnPrimary40)};
  font-size: 1.6rem;
  font-family: ${montserrat[400].style.fontFamily};

  &:disabled {
    background-color: ${Neutral90};

    &:hover {
      cursor: default;
    }
  }
`
