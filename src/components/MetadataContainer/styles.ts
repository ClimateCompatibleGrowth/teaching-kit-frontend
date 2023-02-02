import styled from '@emotion/styled'
import {
  BorderRadius,
  mq,
  Primary90,
  UlWithoutDefaultStyle,
} from '../../styles/global'

export const MetadataContainer = styled.div`
  flex: 0 1 100%;
  padding: 3.2rem 2.6rem;
  background: ${Primary90};
  overflow: auto;
  border-radius: ${BorderRadius};
  gap: 2rem;

  ${mq.sm} {
    flex: 0 1 22%;
  }
`

export const Ul = styled(UlWithoutDefaultStyle)``

export const Li = styled.li`
  a {
    color: #0070f3;
    text-decoration: underline;

    &:hover {
      color: white;
    }
  }
`

export const DownloadButtonsContainer = styled.div`
  margin-top: 1rem;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`

export const HeadingSet = styled.div`
  margin-bottom: 3.2rem;
`

export const Alert = styled.div`
  margin-top: 2.5rem;
`
