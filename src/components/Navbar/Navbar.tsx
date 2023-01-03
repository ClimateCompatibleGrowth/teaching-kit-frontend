import Link from 'next/link'
import Image from 'next/image'
import * as Styled from './styles'

import logo from '../../../public/logo.png'

export default function Navbar() {
  return (
    <Styled.Navbar>
      <Styled.LogoWrapper>
        <Image src={logo} alt='Climate Compatible Growth logotype' />
      </Styled.LogoWrapper>
      <Styled.Ul>
        <Styled.Li>
          <Link href='/'>Home</Link>
        </Styled.Li>
        <Styled.Li>
          <Link href='/discover'>Discover</Link>
        </Styled.Li>
      </Styled.Ul>
    </Styled.Navbar>
  )
}
