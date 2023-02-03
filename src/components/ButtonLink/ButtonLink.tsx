import { LinkProps } from 'next/link'
import { PropsWithChildren } from 'react'
import * as Styled from './styles'

export default function ButtonLink({
  children,
  ...props
}: PropsWithChildren<LinkProps & Styled.ButtonLinkProps>) {
  return (
    <Styled.ButtonLink primary {...props}>
      {children}
    </Styled.ButtonLink>
  )
}
