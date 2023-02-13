import styled from '@emotion/styled'
import Link, { LinkProps } from 'next/link'
import { montserrat } from '../../styles/fonts'
import {
  Accent20,
  Accent40,
  Accent90,
  Neutral90,
  Neutral99,
  OnAccent20,
  OnAccent40,
} from '../../styles/global'

export type ButtonLinkProps = {
  primary?: boolean
}

export const ButtonLink = styled(Link, {
  shouldForwardProp: (prop) => prop !== 'primary',
})<LinkProps & ButtonLinkProps>`
  display: inline-block;
  padding: 1.1rem 2.4rem;

  background-color: ${(props) => (props.primary ? Accent40 : undefined)};
  border-width: 1px;
  border-style: solid;
  border-color: ${(props) => (props.primary ? Accent40 : 'none')};
  color: ${(props) => (props.primary ? OnAccent40 : undefined)};

  font-size: 1.6rem;
  font-family: ${montserrat[300].style.fontFamily};

  &:disabled {
    background-color: ${Neutral90};

    &:hover {
      cursor: default;
    }
  }

  &:active {
    background-color: ${(props) => (props.primary ? Accent20 : Neutral99)};
  }
  &:hover {
    background-color: ${(props) => (props.primary ? Accent90 : Accent20)};
    color: ${(props) => (props.primary ? OnAccent20 : OnAccent20)};
  }
`
