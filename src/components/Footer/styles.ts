import styled from '@emotion/styled'
import {
  Accent40,
  breakpoints,
  mq,
  PageContainerPaddings,
  Primary40,
} from '../../styles/global'

export const ColorBar = styled.div`
  background-color: ${Primary40};
  padding: 6.8rem 0;
`

export const Footer = styled.footer`
  display: flex;
  max-width: ${breakpoints.lg};
  margin: 0 auto;
  padding: 0 2.4rem;
  justify-content: space-between;
  font-size: 1.8rem;
  line-height: 2.2rem;
  column-gap: 1.6rem;
  flex-wrap: wrap;
  ${mq.sm} {
    padding: 0 8rem;
    flex-wrap: nowrap;
  }
`

export const LogoWrapper = styled.div`
  flex: 0 0 100%;
  order: 1;
  text-align: center;
  img {
    height: 14.1rem;
    width: auto;
  }
  ${mq.sm} {
    flex: 0 0 50%;
    order: 0;
    text-align: left;
  }
`

export const ContactWrapper = styled.div`
  flex: 0 0 100%;
  margin-bottom: 3rem;
  p {
    margin-bottom: 1.6rem;
  }
  a {
    color: ${Accent40};
    text-decoration: underline;
  }
  ${mq.sm} {
    flex: 0 0 50%;
    margin-bottom: 0;
  }
`
