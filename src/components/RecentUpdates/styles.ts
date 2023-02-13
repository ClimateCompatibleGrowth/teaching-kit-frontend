import styled from '@emotion/styled'
import { mq } from '../../styles/global'

export const CenterWrapper = styled.div`
  display: flex;
  justify-content: center;
`

export const RecentList = styled.div`
  gap: 1.6rem;

  margin: 0.4rem 0 2rem;

  display: flex;
  flex-wrap: wrap;
  align-items: stretch;

  ${mq.sm} {
    margin: 2rem 0;
  }
`
