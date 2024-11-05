import { AnchorHTMLAttributes, PropsWithChildren } from 'react'
import * as Styled from './styles'

export default function ButtonLink({
  children,
  href = "", // href cannot be undefined for next/link props
  ...props
}: PropsWithChildren<AnchorHTMLAttributes<HTMLAnchorElement> & Styled.ButtonLinkProps>) {
  if (href?.startsWith("/")) {
    return <Styled.InternalLink {...{ href, ...props }}>{children}</Styled.InternalLink>
  }
  return <Styled.ExternalLink {...{ href, ...props }}>{children}</Styled.ExternalLink>
}
