import styled from '@emotion/styled'
import { Background, mq } from '../../../styles/global'

type Props = {
  isOpen: boolean
}

export const Wrapper = styled.div`
  height: auto;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`
export const DropdownWrapper = styled.div`
  flex: 0 0 100%;
  flex-direction: column;
  cursor: pointer;

  ${mq.sm} {
    max-width: 240px;
    flex: 0 0 auto;
  }
`
export const GlobeIcon = styled.div`
  width: 3.5rem;
  height: 3.5rem;
  margin-right: 0.625rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`
export const DropdownArrow = styled.div`
  width: 3.5rem;
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

export const DropdownListContainer = styled.div<Props>`
  :focus {
    border: 3px solid red;
  }
  border: 1px solid #012169;
  width: 100%;
  min-height: 3.5rem;
  margin: 1.7rem 0;
  gap: 1.7rem;
  position: absolute;
  bottom: -100px;
  overflow: scroll;
  z-index: 10;
  background-color: ${Background};
  opacity: ${(props: Props) => (props.isOpen ? 1 : 0)};
`
export const DropdownListItem = styled.div`
  display: flex;
  margin: 1rem;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`
