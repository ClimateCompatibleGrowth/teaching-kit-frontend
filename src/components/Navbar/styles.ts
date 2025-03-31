import styled from '@emotion/styled'
import { montserrat } from '../../styles/fonts'
import { Accent40, breakpoints, mq, Primary40 } from '../../styles/global'

export const ColorBar = styled.nav`
  background-color: ${Primary40};
`

export const Wrapper = styled.div`
  display: flex;
  max-width: ${breakpoints.lg};
  margin: 0 auto;
  padding: 0 1.6rem;
  justify-content: space-between;
  font-size: 1.7rem;

  ${mq.md} {
    padding: 0 8rem;
  }
`

export const LogoWrapper = styled.div`
  height: 6rem;

  ${mq.sm} {
    height: 10rem;
  }

  svg {
    height: 100%;
    width: auto;

    ${mq.sm} {
      height: 140px;
      position: absolute;
    }
  }
`

export const Ul = styled.ul`
  margin: 0;
  padding: 1rem 0;

  display: flex;
  list-style: none;
  justify-content: center;
  flex-wrap: wrap;

  ${mq.sm} {
    padding: 0;
  }
`

export const Li = styled.li`
  height: max-content;

  margin: auto 0;
  padding: 1rem 0;

  color: ${Accent40};
  font-size: 1.2rem;

  ${mq.sm} {
    font-size: 1.8rem;
    padding: 0;
  }

  ${mq.md} {
    padding: 0;
  }

  a {
    padding: 1rem;
    ${mq.sm} {
      padding: 0;
    }
  }

  a[aria-current='page'] {
    font-family: ${montserrat[600].style.fontFamily};
  }

  a:hover {
    color: #0070f3;
  }

  & + & {
    margin-left: 0rem;

    ${mq.sm} {
      margin-left: 2.4rem;
    }
  }
`

export const LanguageSelector = styled.div`
  margin: auto 0;
`
