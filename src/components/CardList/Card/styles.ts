import styled from '@emotion/styled'
import Link from 'next/link'
import { montserrat, ubuntu } from '../../../styles/fonts'
import {
  Background,
  BorderRadius,
  Neutral90,
  OnPrimary90,
  Primary90,
  Surface,
} from '../../../styles/global'

type CardProps = {
  isInteractive: boolean
}

export const NextLink = styled(Link)`
  width: 100%;
`

export const Card = styled.div<CardProps>`
  width: 100%;

  padding: 3.2rem 2.4rem;

  background-color: ${(props) => (props.isInteractive ? Background : Surface)};
  color: ${OnPrimary90};

  border: ${(props) =>
    props.isInteractive ? `1px solid ${Neutral90}` : 'none'};
  border-radius: ${BorderRadius};

  &:hover {
    background-color: ${(props) => (props.isInteractive ? Primary90 : Surface)};
  }
`

export const Metadata = styled.p`
  margin-top: 2rem;
`

export const Markdown = styled.div`
  max-height: 10rem;

  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box !important;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  white-space: normal;

  p {
    margin-bottom: 0;

    strong {
      font-family: ${montserrat[500].style.fontFamily};
    }
  }
`

export const Title = styled.h4`
  font-family: ${ubuntu[700].style.fontFamily};
  font-size: 2.4rem;
`

export const SubTitle = styled.h5`
  margin-top: 0;

  font-family: ${montserrat[400].style.fontFamily};
  font-size: 1.8rem;
  color: ${OnPrimary90};
`

export const SubComponentWrapper = styled.div`
  width: 95%;
  margin-top: 2rem;
`
