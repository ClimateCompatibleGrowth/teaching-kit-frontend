import styled from '@emotion/styled'
import {
  Accent40,
  ButtonWithoutDefaultStyle,
  mq,
  Neutral40,
  OnAccent40,
  UlWithoutDefaultStyle,
} from '../../styles/global'

type ButtonProps = {
  isActive: boolean
}

type ChevronButtonProps = {
  isVisible: boolean
}

export const PaginationController = styled(UlWithoutDefaultStyle)`
  display: flex;
  gap: 0.25rem;
  margin: 0 auto;
  overflow-x: auto;

  ${mq.md} {
    gap: 1rem;
  }
`

export const PaginationWrapper = styled.div`
  max-width: 100%;
  display: flex;
`

export const PaginationPageButton = styled.li``

export const Button = styled(ButtonWithoutDefaultStyle)<ButtonProps>`
  color: ${(props) => (props.isActive ? OnAccent40 : Neutral40)};
  background-color: ${(props) => (props.isActive ? Accent40 : undefined)};
  border-radius: ${(props) => (props.isActive ? '100%' : 'none')};
  min-height: 32px;
  min-width: 32px;
`

const ChevronButton = styled(ButtonWithoutDefaultStyle)<ChevronButtonProps>`
  display: ${(props) => (props.isVisible ? 'block' : 'none')};
`

export const PreviousButton = styled(ChevronButton)`
  transform: rotate(-90deg);
`

export const NextButton = styled(ChevronButton)`
  transform: rotate(90deg);
`
