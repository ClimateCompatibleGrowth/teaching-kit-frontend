import styled from '@emotion/styled'
import {
  BorderRadius,
  Primary90,
  UlWithoutDefaultStyle,
} from '../../styles/global'

export const MetadataContainer = styled.div`
  height: max-content;
  width: 30rem;
  min-width: 30rem;

  margin-left: 2rem;

  padding: 3.2rem 2.6rem;

  display: flex;
  flex-wrap: wrap;

  background: ${Primary90};
  overflow: auto;

  border-radius: ${BorderRadius};

  gap: 2rem;

  * {
    width: 100%;
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
export const HeadingSet = styled.div``