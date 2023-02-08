import Link from 'next/link'
import * as Styled from './styles'

import LogoIcon from '../../../public/logo.svg'
import { useRouter } from 'next/router'

export default function Navbar() {
  const { pathname } = useRouter()
  return (
    <Styled.ColorBar>
      <Styled.Wrapper>
        <Styled.LogoWrapper>
          <LogoIcon alt='Climate Compatible Growth logotype' />
        </Styled.LogoWrapper>
        <Styled.Ul>
          <Styled.Li>
            <Link aria-current={pathname === '/' ? 'page' : undefined} href='/'>
              Home
            </Link>
          </Styled.Li>
          <Styled.Li>
            <Link
              aria-current={pathname === '/discover' ? 'page' : undefined}
              href='/discover'
            >
              Discover
            </Link>
          </Styled.Li>
        </Styled.Ul>
      </Styled.Wrapper>
    </Styled.ColorBar>
  )
}
