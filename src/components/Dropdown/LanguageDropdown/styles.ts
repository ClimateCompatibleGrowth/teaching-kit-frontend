import styled from '@emotion/styled'
import { montserrat } from '../../../styles/fonts'
import { Accent40, mq, Primary40 } from '../../../styles/global'

export const Wrapper = styled.div`
  height: auto;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`
export const DropdownSelector = styled.select`
  padding: 0;
  cursor: pointer;
  background-color: ${Primary40};
  border: none;
  font-family: ${montserrat[400].style.fontFamily};
  color: ${Accent40};
  font-size: 1.2rem;

  ${mq.sm} {
    max-width: 240px;
    flex: 0 0 auto;
  }
`
export const GlobeIcon = styled.div`
  display: none;

  ${mq.sm} {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 3.5rem;
    height: 3.5rem;
  }
`
