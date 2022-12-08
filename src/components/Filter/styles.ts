import styled from "@emotion/styled";
import { ButtonWithoutDefaultStyle, UlWithoutDefaultStyle } from "../../styles/global";

type IconButtonProps = {
  isPointingDown: boolean
}

export const FilterWrapper = styled.div`
  width: 14rem;
`

export const SelectedKeywordWrapper = styled(UlWithoutDefaultStyle)`
  width: 30rem;
  min-height: 2rem;

  margin: 1rem 0;

  display: flex;
  flex-wrap: wrap;

  gap: 1rem;
`

export const SelectedKeyword = styled.li``

export const InputWrapper = styled.div`
  position: relative;
`

export const FilterInput = styled.input`
  width: 100%;
  height: 2.5rem;

  padding-left: 0.5rem;

  font-size: inherit;
`

export const IconButton = styled(ButtonWithoutDefaultStyle) <IconButtonProps>`
  position: absolute;

  right: 10px;
  top: 8px;

  transform: rotate(${props => props.isPointingDown ? "180deg" : "0deg"})
`

export const FilterDropdownList = styled(UlWithoutDefaultStyle)`
  height: 150px;
  width: 100%;

  display: flex;
  flex-direction: column;

  overflow: scroll;
`

export const MoreResultsInformation = styled.li`
  padding: 5px 0 5px 10px;
`