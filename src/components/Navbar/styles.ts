import styled from '@emotion/styled'
import {
  breakpoints,
  PageContainerPaddings,
  Primary40,
} from '../../styles/global'

const navHeight = '10rem'

export const ColorBar = styled.div`
  background-color: ${Primary40};
`

export const Navbar = styled.nav`
  display: flex;
  height: ${navHeight};
  max-width: ${breakpoints.lg};
  margin: 0 auto;
  padding: 0 ${PageContainerPaddings.horizontal};
  justify-content: space-between;

  font-size: 1.7rem;
`

export const LogoWrapper = styled.div`
  height: ${navHeight};

  img {
    height: 100%;
    width: auto;
  }
`

export const Ul = styled.ul`
  width: 40rem;

  padding: 0;
  margin: 0;

  display: flex;
  list-style: none;
  justify-content: center;

  gap: 15rem;
`

export const Li = styled.li`
  height: max-content;

  margin: auto 0;

  font-size: 1.8rem;

  a:hover {
    color: #0070f3;
  }
`
