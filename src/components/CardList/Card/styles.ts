import styled from '@emotion/styled'
import Link from 'next/link'
import { montserrat, ubuntu } from '../../../styles/fonts'
import {
  AccentPink,
  AccentPinkLighter,
  Background,
  BorderRadius,
  mq,
  Neutral90,
  OnPrimary90,
  Surface,
} from '../../../styles/global'
import { css } from '@emotion/react'
import ButtonLink from '../../ButtonLink/ButtonLink'

type CardProps = {
  isInteractive?: boolean
  currentIndex?: number
  index?: number
  youAreHere?: boolean
}

export const NextLink = styled(Link)`
  width: 100%;
`

export const Card = styled.div<CardProps>`
  width: 100%;
  padding: 2.4rem;
  border: 1px solid ${Neutral90};
  border-radius: ${BorderRadius};

  background-color: ${(props) => props.youAreHere && AccentPinkLighter};
  color: ${OnPrimary90};

  &:hover {
    background-color: ${(props) =>
    props.isInteractive || props.youAreHere ? AccentPinkLighter : Background};
  }
`

export const MetaData = styled.p`
  display: flex;
  margin-top: 2rem;
  align-items: center;
  font-size: 1.4rem;

  & + & {
    margin-left: 1.6rem;
  }
`

export const Markdown = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box !important;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  white-space: normal;


  p {
    margin-bottom: 0;

    display: inline;

    strong {
      font-family: ${montserrat[500].style.fontFamily};
    }
  }
`

export const Title = styled.h4`
  font-family: ${ubuntu[700].style.fontFamily};
  font-size: 1.8rem;
`

export const SubTitle = styled.h5`
  margin-top: 0;

  font-family: ${montserrat[400].style.fontFamily};
  font-size: 1.8rem;
  color: ${OnPrimary90};
`

export const SubTitleNode = styled.div<CardProps>`
  margin-bottom: 2.4rem;
  
  ${(CardProps) =>
    CardProps.youAreHere
      ? css`
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        `
      : css``}
`
export const FilesTitle = styled.h5`
  margin: 2.4rem 0 1rem;
  font-family: ${montserrat[400].style.fontFamily};
  font-size: 1.8rem;
  color: ${OnPrimary90};

`


export const FilesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
`

export const LectureFile = styled(ButtonLink)`
 
`
export const MetaInformation = styled.div`
  display: flex;
  align-items: center;

`
export const SubComponentWrapper = styled.div`
  width: 95%;
  margin-top: 2rem;
`

export const YouAreHereWrapper = styled.div`
  display: flex;
`
export const Indicator = styled.p<CardProps>`
  display: ${(CardProps) => (CardProps.youAreHere ? 'block' : 'none')};
`
