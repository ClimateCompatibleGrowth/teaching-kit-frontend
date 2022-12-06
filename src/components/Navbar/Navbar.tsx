import Link from 'next/link'

export default function Navbar() {
  return (
    <nav>
      <ul>
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
      </ul>
    </nav>
  )
}
