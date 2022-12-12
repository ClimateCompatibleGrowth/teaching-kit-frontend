import styled from "@emotion/styled";
import { ButtonWithoutDefaultStyle, UlWithoutDefaultStyle } from "../../styles/global";

type IconButtonProps = {
  isPointingDown: boolean
}

export const FilterWrapper = styled.div`
  width: 20rem;
`

export const SelectedKeywordWrapper = styled(UlWithoutDefaultStyle)`
  width: 30rem;
  min-height: 3.5rem;

  margin: 1.7rem 0;

  display: flex;
  flex-wrap: wrap;

  gap: 1.7rem;
`

export const SelectedKeyword = styled.li`
  font-size: 1.5rem;
`

export const InputWrapper = styled.div`
  position: relative;
`

export const FilterInput = styled.input`
  width: 100%;
  height: 4rem;

  padding-left: 0.75rem;

  font-size: 1.5rem;
`

export const IconButton = styled(ButtonWithoutDefaultStyle) <IconButtonProps>`
  position: absolute;

  right: 12px;
  top: 12px;

  transform: rotate(${props => props.isPointingDown ? "180deg" : "0deg"})
`

export const FilterDropdownList = styled(UlWithoutDefaultStyle)`
  height: 150px;
  width: 100%;

  display: flex;
  flex-direction: column;

  overflow: scroll;
  font-size: 1.5rem;
`

export const MoreResultsInformation = styled.li`
  padding: 5px 0 5px 10px;
`