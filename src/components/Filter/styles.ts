import styled from "styled-components";
import { UlWithoutDefaultStyle } from "../../styles/global";

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

export const FilterInput = styled.input`
  width: 100%;
  height: 2.5rem;

  padding-left: 0.5rem;

  font-size: inherit;
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