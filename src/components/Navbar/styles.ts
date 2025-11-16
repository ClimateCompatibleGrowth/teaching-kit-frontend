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
  display: flex;
  align-items: center;
  position: relative;

  ${mq.sm} {
    height: 10rem;
    padding-left: 14rem;
  }

  svg {
    height: 100%;
    width: auto;
    display: block !important;
    flex-shrink: 0;
    min-width: 6rem;

    ${mq.sm} {
      height: 140px;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
`

export const ReintegrateLogoWrapper = styled.div`
  margin-left: 1.6rem;

  img {
    height: 4rem;
    width: auto;

    ${mq.sm} {
      height: 6rem;
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
