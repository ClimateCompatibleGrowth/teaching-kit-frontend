import styled from '@emotion/styled'
import Link, { LinkProps } from 'next/link'
import { montserrat } from '../../styles/fonts'
import { Neutral90 } from '../../styles/global'

export type ButtonLinkProps = {
  backgroundColor?: string
  borderColor?: string
  color?: string
}

export const ButtonLink = styled(Link)<LinkProps & ButtonLinkProps>`
  display: inline-block;
  padding: 7px 24px;

  background-color: ${(props) => props.backgroundColor || undefined};
  border-width: 1px;
  border-style: solid;
  border-color: ${(props) => props.borderColor || 'none'};
  color: ${(props) => props.color || undefined};

  font-size: 1.8rem;
  font-family: ${montserrat[300].style.fontFamily};

  &:disabled {
    background-color: ${Neutral90};

    &:hover {
      cursor: default;
    }
  }
`
