import styled from '@emotion/styled'
import Link from 'next/link'
import { montserrat, ubuntu } from '../../../styles/fonts'
import { mq, Neutral90, OnPrimary90 } from '../../../styles/global'

export const Card = styled(Link)`
  flex: 0 1 100%;
  padding: 2.4rem 2.4rem 3.6rem;
  border: 1px solid ${Neutral90};
  border-radius: 5px;
  position: relative;

  ${mq.sm} {
    flex: 0 1 48%;
  }
  ${mq.md} {
    flex: 0 1 calc(33.33% - 1.1rem);
  }
`

export const Markdown = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box !important;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
  white-space: normal;
  margin-bottom: 1.6rem;
  p {
    strong {
      font-family: ${montserrat[500].style.fontFamily};
    }
  }
`

export const Title = styled.h3`
  margin-top: 2.6rem;
  font-family: ${ubuntu[700].style.fontFamily};
  font-size: 1.8rem;
`

export const MetaWrapper = styled.div`
  position: absolute;
  bottom: 1.6rem;
`

export const MetaInformation = styled.span`
  display: inline-flex;
  align-items: center;
  column-gap: 0.6rem;
  font-size: 1.4rem;
  & + & {
    margin-left: 1.6rem;
  }
`
