import styled from '@emotion/styled'
import {
  Accent40,
  Background,
  ButtonWithoutDefaultStyle,
  UlWithoutDefaultStyle,
} from '../../styles/global'

type IconButtonProps = {
  isPointingDown: boolean
}

type DropdownInputProps = {
  searchIsEnabled: boolean
}

const dropdownWrapperWidth = 20

export const DropdownWrapper = styled.div`
  width: ${dropdownWrapperWidth}rem;
`

export const SelectedItemsWrapper = styled(UlWithoutDefaultStyle)`
  width: ${dropdownWrapperWidth}rem;
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
  margin: 0.4rem 0;

  position: relative;
`

export const Label = styled.label`
  margin-bottom: 0.2rem;
`

export const DropdownInput = styled.input<DropdownInputProps>`
  width: 100%;
  height: 4rem;

  padding-left: 1.3rem;

  font-size: 1.5rem;

  border: 1px solid ${Accent40};

  &:hover {
    ${(props) => (!props.searchIsEnabled ? 'cursor: pointer;' : null)}
  }
`

export const IconButton = styled(ButtonWithoutDefaultStyle)<IconButtonProps>`
  position: absolute;

  right: 1rem;
  top: 1rem;

  transform: rotate(${(props) => (props.isPointingDown ? '180deg' : '0deg')});
`

export const DropdownList = styled(UlWithoutDefaultStyle)`
  height: 150px;
  width: inherit;

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
