import styled from '@emotion/styled'
import { Background, OlWithoutDefaultStyle } from '../../../styles/global'

export const DropdownList = styled(OlWithoutDefaultStyle)`
  max-height: 16.6rem;
  width: 100%;

  position: absolute;

  display: flex;
  flex-direction: column;

  overflow: scroll;
  border: 1px solid gray;
  border-radius: 2px;
  z-index: 10;

  background-color: ${Background};
`

export const MoreResultsInformation = styled.li`
  padding: 5px 0 5px 10px;
`
