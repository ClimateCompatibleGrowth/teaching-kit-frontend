import Link from 'next/link'
import Image from 'next/image'
import * as Styled from './styles'

import logo from '../../../public/logo.png'
import { useRouter } from 'next/router'

export default function Navbar() {
  const { pathname } = useRouter()
  return (
    <Styled.ColorBar>
      <Styled.Navbar>
        <Styled.LogoWrapper>
          <Image src={logo} alt='Climate Compatible Growth logotype' />
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
      </Styled.Navbar>
    </Styled.ColorBar>
  )
}
