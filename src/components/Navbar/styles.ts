import styled from '@emotion/styled'
import { PageContainerPaddings, Primary40 } from '../../styles/global'

const navHeight = '10rem'

export const Navbar = styled.nav`
  width: 100%;
  height: ${navHeight};

  padding: 0 ${PageContainerPaddings.horizontal};

  top: 0;
  left: 0;

  display: flex;
  justify-content: space-between;

  font-size: 1.7rem;

  background-color: ${Primary40};
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
