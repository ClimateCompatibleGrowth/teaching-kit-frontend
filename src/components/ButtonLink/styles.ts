import styled from '@emotion/styled'
import Link, { LinkProps } from 'next/link'
import { montserrat } from '../../styles/fonts'
import { Accent40, Neutral90, OnAccent40 } from '../../styles/global'

export type ButtonLinkProps = {
  primary?: boolean
}

export const ButtonLink = styled(Link)<LinkProps & ButtonLinkProps>`
  display: inline-block;
  padding: 7px 24px;

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
`
