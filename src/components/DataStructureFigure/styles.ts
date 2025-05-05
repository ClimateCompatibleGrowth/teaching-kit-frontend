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
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4rem;

  ${mq.sm} {
    margin-bottom: 8rem;
  }
`

export const DesktopImageWrapper = styled.div`
  display: none;
  width: 100%;
  min-height: 400px;
  position: relative;
  margin-bottom: 4rem;

  ${mq.sm} {
    display: block;
  }
`

export const MobileImageWrapper = styled.div`
  display: block;
  width: 100%;
  max-width: 400px;
  position: relative;
  aspect-ratio: 2/3;

  ${mq.sm} {
    display: none;
  }
`
