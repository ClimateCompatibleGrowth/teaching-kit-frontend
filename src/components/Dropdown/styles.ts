import styled from '@emotion/styled'
import { InputHTMLAttributes } from 'react'
import { ubuntu } from '../../styles/fonts'
import { Accent40, mq, UlWithoutDefaultStyle } from '../../styles/global'

type IconButtonProps = {
  isPointingDown: boolean
}

type DropdownInputProps = {
  searchIsEnabled: boolean
} & InputHTMLAttributes<HTMLInputElement>

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex: 0 1 100%;
  ${mq.sm} {
    flex: 0 1 auto;
    flex-direction: column;
  }
`

export const DropdownWrapper = styled.div`
  flex: 0 0 100%;
  position: relative;
  ${mq.sm} {
    max-width: 240px;
    flex: 0 0 auto;
  }
`

export const SelectedItemsWrapper = styled(UlWithoutDefaultStyle)`
  min-height: 3.5rem;

  margin: 1.7rem 0;

  display: flex;
  flex-wrap: wrap;

  gap: 1.7rem;
`

export const SelectedItem = styled.li`
  margin: 0;
`

export const InputWrapper = styled.div`
  display: flex;
  margin: 0.4rem 0;
  width: 100%;
  position: relative;
  ${mq.sm} {
    width: auto;
  }
`

export const Label = styled.span`
  font-size: 1.4rem;
  font-family: ${ubuntu[500].style.fontFamily};
  margin-bottom: 0.2rem;
`

export const DropdownInput = styled.input<DropdownInputProps>`
  flex: 0 0 100%;
  padding: 1.1rem;
  font-size: 1.5rem;
  border: 1px solid ${Accent40};

  caret-color: ${(props) =>
    props.searchIsEnabled ? undefined : 'transparent'};

  &:hover {
    ${(props) => (props.searchIsEnabled ? null : 'cursor: pointer;')}
  }

  ${mq.sm} {
    flex: 1 0 auto;
  }
`

export const IconButton = styled.span<IconButtonProps>`
  position: absolute;

  right: 1rem;
  top: 1rem;

  transform: rotate(${(props) => (props.isPointingDown ? '180deg' : '0deg')});
  cursor: pointer;
`

export const MoreResultsInformation = styled.li`
  padding: 5px 0 5px 10px;
`
