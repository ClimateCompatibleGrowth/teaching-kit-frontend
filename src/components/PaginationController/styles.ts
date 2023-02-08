import styled from '@emotion/styled'
import {
  Accent40,
  ButtonWithoutDefaultStyle,
  Neutral40,
  OnAccent40,
  OnNeutral40,
  UlWithoutDefaultStyle,
} from '../../styles/global'

type ButtonProps = {
  isActive: boolean
}

type ChevronButtonProps = {
  isVisible: boolean
}

export const PaginationController = styled(UlWithoutDefaultStyle)`
  width: 100%;

  display: flex;
  justify-content: center;

  gap: 1rem;
`

export const PaginationPageButton = styled.li``

export const Button = styled(ButtonWithoutDefaultStyle)<ButtonProps>`
  color: ${(props) => (props.isActive ? OnAccent40 : Neutral40)};
  background-color: ${(props) => (props.isActive ? Accent40 : undefined)};
  border-radius: ${(props) => (props.isActive ? '100%' : 'none')};
  min-height: 26px;
  min-width: 26px;
`

const ChevronButton = styled(ButtonWithoutDefaultStyle)<ChevronButtonProps>`
  visibility: ${(props) => (props.isVisible ? 'visible' : 'hidden')};
`

export const PreviousButton = styled(ChevronButton)`
  transform: rotate(-90deg);
`

export const NextButton = styled(ChevronButton)`
  transform: rotate(90deg);
`
