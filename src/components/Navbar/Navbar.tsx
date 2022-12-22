import Link from 'next/link'
import { Navbar as StyledNavbar, NavbarUl } from './styles'

export default function Navbar() {
  return (
    <StyledNavbar>
      <NavbarUl>
        <li>
          <Link href='/'>Home</Link>
        </li>
        <li>
          <Link href='/discover'>Discover</Link>
        </li>
      </NavbarUl>
    </StyledNavbar>
  )
}
