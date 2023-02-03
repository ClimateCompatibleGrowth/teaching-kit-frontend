import styled from '@emotion/styled'
import {
  Accent40,
  Background,
  ButtonWithoutDefaultStyle,
  mq,
  UlWithoutDefaultStyle,
} from '../../styles/global'

type IconButtonProps = {
  isPointingDown: boolean
}

type DropdownInputProps = {
  searchIsEnabled: boolean
}

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  ${mq.sm} {
    flex-direction: column;
  }
`

export const DropdownWrapper = styled.div`
  flex: 0 0 100%;
  position: relative;
  ${mq.sm} {
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

export const Label = styled.label`
  margin-bottom: 0.2rem;
`

export const DropdownInput = styled.input<DropdownInputProps>`
  flex: 0 0 100%;
  padding: 1.1rem;
  font-size: 1.5rem;
  border: 1px solid ${Accent40};

  &:hover {
    ${(props) => (!props.searchIsEnabled ? 'cursor: pointer;' : null)}
  }

  ${mq.sm} {
    flex: 0 0 auto;
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
