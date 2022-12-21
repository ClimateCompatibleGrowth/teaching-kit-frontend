import styled from '@emotion/styled'
import {
  ButtonWithoutDefaultStyle,
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

  gap: 1.5rem;
`

export const PaginationPageButton = styled.li``

export const Button = styled(ButtonWithoutDefaultStyle)<ButtonProps>`
  text-decoration: ${(props) => (props.isActive ? 'underline' : 'none')};
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
