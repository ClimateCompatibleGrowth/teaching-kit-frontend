import Link from 'next/link'
import { Navbar as StyledNavbar, NavbarUl } from './styles'

export default function Navbar() {
  return (
    <StyledNavbar>
      <NavbarUl>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/discover">Discover</Link>
        </li>
        <li>
          <Link href="/courses">Courses</Link>
        </li>
        <li>
          <Link href="/lectures">Lectures</Link>
        </li>
        <li>
          <Link href="/blocks">Blocks</Link>
        </li>
      </NavbarUl>
    </StyledNavbar>
  )
}
