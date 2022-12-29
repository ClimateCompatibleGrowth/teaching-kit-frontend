import styled from '@emotion/styled'
import { BorderRadius, Primary90 } from '../../styles/global'

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

export const Ul = styled.ul`
  padding-left: 16px;
`

export const Li = styled.li`
  a {
    color: #0070f3;
    text-decoration: underline;

    &:hover {
      color: white;
    }
  }
`

export const DownloadContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
`
export const HeadingSet = styled.div``
