import styled from "@emotion/styled";
import { ButtonWithoutDefaultStyle } from "../../../styles/global";

export const ListItem = styled.li`
  width: 100%;
`

export const ClickableListItem = styled(ButtonWithoutDefaultStyle)`
  width: 100%;

  padding: 10px;

  text-align: left;
  border-radius: 3px;

  &:hover {
    background-color: darkgray;
  }
`