import styled from '@emotion/styled'
import { mq } from '../../styles/global'

export const Header = styled.h2`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3.2rem;
  margin-bottom: 4.8rem;
  text-align: center;

  ${mq.sm} {
    text-align: left;
  }
`
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`
export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  ${mq.sm} {
    text-align: left;
    flex-direction: row;
    gap: 4.5rem;
    margin-bottom: 4.5rem;
  }
`

export const LeftContainer = styled.div`
  flex: 1;
`

export const LeftTitle = styled.p`
  margin-bottom: 1.5rem;
`

export const RightContainer = styled.div`
  flex: 1;
  margin-bottom: 4.2rem;
`
export const RightTitle = styled.p``

export const ImageWrapper = styled.div`
  margin-bottom: 8rem;

  ${mq.sm} {
    margin-bottom: 8rem;
  }
`

export const DesktopImage = styled.img`
  @media screen and (max-width: 768px) {
    display: none;
  }

  max-width: 100%;
  height: 100%;
  margin: 0 auto 4rem;
  object-fit: cover;
`

export const MobileImage = styled.img`
  ${mq.sm} {
    display: none;
  }
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  height: 100%;
  margin: 0 auto 4rem;
  object-fit: cover;
`
